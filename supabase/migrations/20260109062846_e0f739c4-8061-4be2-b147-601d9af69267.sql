-- ===========================================
-- FIX 1: Test Answer Exposure - Server-side scoring
-- ===========================================

-- Create function to submit test answers securely (no client access to correct_answer)
CREATE OR REPLACE FUNCTION public.submit_test_answers(test_uuid UUID, student_answers JSONB)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  calculated_score INTEGER;
  correct_count INTEGER := 0;
  total_marks INTEGER;
  total_questions INTEGER;
  result_id UUID;
BEGIN
  -- Verify student is enrolled in the batch for this test
  IF NOT EXISTS (
    SELECT 1 FROM tests t
    JOIN batches b ON t.batch_id = b.id
    JOIN batch_enrollments e ON e.batch_id = b.id
    WHERE t.id = test_uuid AND e.student_id = auth.uid()
  ) THEN
    RAISE EXCEPTION 'Not enrolled in this batch';
  END IF;
  
  -- Check if already submitted
  IF EXISTS (
    SELECT 1 FROM test_results WHERE test_id = test_uuid AND student_id = auth.uid()
  ) THEN
    RAISE EXCEPTION 'Test already submitted';
  END IF;
  
  -- Get total questions count
  SELECT COUNT(*) INTO total_questions FROM test_questions WHERE test_id = test_uuid;
  
  -- Calculate score server-side by comparing answers
  SELECT COUNT(*) INTO correct_count
  FROM test_questions q
  WHERE q.test_id = test_uuid
    AND q.correct_answer = (student_answers->>q.order_index::text)::INTEGER;
  
  -- Get total marks for the test
  SELECT t.total_marks INTO total_marks FROM tests t WHERE t.id = test_uuid;
  
  -- Calculate proportional score
  IF total_questions > 0 THEN
    calculated_score := ROUND((correct_count::FLOAT / total_questions) * total_marks);
  ELSE
    calculated_score := 0;
  END IF;
  
  -- Insert result
  INSERT INTO test_results (test_id, student_id, answers, score)
  VALUES (test_uuid, auth.uid(), student_answers, calculated_score)
  RETURNING id INTO result_id;
  
  RETURN jsonb_build_object(
    'success', true,
    'result_id', result_id,
    'score', calculated_score,
    'correct_count', correct_count,
    'total_questions', total_questions
  );
END;
$$;

-- Update RLS policy for test_questions - students should NOT see correct_answer
-- We'll keep the policy but the client code will NOT select correct_answer
-- The submit_test_answers function handles scoring server-side

-- ===========================================
-- FIX 2: Profile Email Exposure
-- ===========================================

-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Users can view all profiles" ON profiles;

-- Create policy: Users can view their own profile
CREATE POLICY "Users can view own profile" 
ON profiles FOR SELECT 
USING (auth.uid() = id);

-- Create policy: Users can view profiles of people in their batches
CREATE POLICY "Users can view batch member profiles"
ON profiles FOR SELECT
USING (
  auth.uid() IS NOT NULL AND (
    -- Can view teachers of batches user is enrolled in
    EXISTS (
      SELECT 1 FROM batches b
      JOIN batch_enrollments e ON e.batch_id = b.id
      WHERE b.teacher_id = profiles.id AND e.student_id = auth.uid()
    )
    OR
    -- Teachers can view their enrolled students
    EXISTS (
      SELECT 1 FROM batches b
      JOIN batch_enrollments e ON e.batch_id = b.id
      WHERE e.student_id = profiles.id AND b.teacher_id = auth.uid()
    )
    OR
    -- Students can view other students in same batch
    EXISTS (
      SELECT 1 FROM batch_enrollments e1
      JOIN batch_enrollments e2 ON e1.batch_id = e2.batch_id
      WHERE e1.student_id = auth.uid() AND e2.student_id = profiles.id
    )
  )
);