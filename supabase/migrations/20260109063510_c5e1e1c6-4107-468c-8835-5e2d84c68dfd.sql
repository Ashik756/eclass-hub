-- Drop existing policy
DROP POLICY IF EXISTS "Users can view own results" ON public.test_results;

-- Create explicit policies separating student and teacher access
CREATE POLICY "Students can only view own results" 
ON public.test_results 
FOR SELECT 
USING (auth.uid() = student_id);

CREATE POLICY "Teachers can view results for their batches" 
ON public.test_results 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM tests t
    JOIN batches b ON t.batch_id = b.id
    WHERE t.id = test_results.test_id 
    AND b.teacher_id = auth.uid()
  )
);