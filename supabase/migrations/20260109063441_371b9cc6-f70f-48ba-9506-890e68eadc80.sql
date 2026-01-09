-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Anyone can view batches" ON public.batches;

-- Create restrictive policy: only teachers and enrolled students can view batches
CREATE POLICY "Users can view own batches" 
ON public.batches 
FOR SELECT 
USING (
  auth.uid() = teacher_id 
  OR EXISTS (
    SELECT 1 FROM batch_enrollments 
    WHERE batch_enrollments.batch_id = batches.id 
    AND batch_enrollments.student_id = auth.uid()
  )
);