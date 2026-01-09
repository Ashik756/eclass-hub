-- Fix 1: Update live_comments SELECT policy to require authentication and batch membership
DROP POLICY IF EXISTS "Users can view comments" ON public.live_comments;

CREATE POLICY "Batch members can view comments" ON public.live_comments 
FOR SELECT USING (
  auth.uid() IS NOT NULL AND
  EXISTS (
    SELECT 1 FROM classes c
    JOIN batches b ON c.batch_id = b.id
    WHERE c.id = live_comments.class_id AND (
      b.teacher_id = auth.uid() OR
      EXISTS (SELECT 1 FROM batch_enrollments WHERE batch_id = b.id AND student_id = auth.uid())
    )
  )
);

-- Fix 2: Update handle_new_user function with role validation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  user_role TEXT;
BEGIN
  user_role := COALESCE(NEW.raw_user_meta_data->>'role', 'student');
  
  -- Validate role is one of allowed values, default to student if invalid
  IF user_role NOT IN ('student', 'teacher') THEN
    user_role := 'student';
  END IF;
  
  INSERT INTO public.profiles (id, email, name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    user_role
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;