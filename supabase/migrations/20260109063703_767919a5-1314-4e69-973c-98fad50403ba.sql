-- Drop the policy that exposes emails to batch members
DROP POLICY IF EXISTS "Users can view batch member profiles" ON public.profiles;

-- Create a security definer function to get safe profile info (no email)
CREATE OR REPLACE FUNCTION public.get_batch_member_profiles(batch_uuid UUID)
RETURNS TABLE (
  id UUID,
  name TEXT,
  avatar_url TEXT,
  role TEXT
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT DISTINCT p.id, p.name, p.avatar_url, p.role
  FROM profiles p
  WHERE 
    -- Teachers of the batch
    EXISTS (
      SELECT 1 FROM batches b 
      WHERE b.id = batch_uuid 
      AND b.teacher_id = p.id
    )
    OR 
    -- Students enrolled in the batch
    EXISTS (
      SELECT 1 FROM batch_enrollments e 
      WHERE e.batch_id = batch_uuid 
      AND e.student_id = p.id
    )
$$;

-- Create a function to get a single user's safe profile info
CREATE OR REPLACE FUNCTION public.get_user_display_info(user_uuid UUID)
RETURNS TABLE (
  id UUID,
  name TEXT,
  avatar_url TEXT,
  role TEXT
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT p.id, p.name, p.avatar_url, p.role
  FROM profiles p
  WHERE p.id = user_uuid
$$;