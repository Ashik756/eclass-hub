-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('teacher', 'student')),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Create batches table
CREATE TABLE public.batches (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  teacher_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  subject TEXT NOT NULL,
  invite_code TEXT NOT NULL UNIQUE,
  thumbnail_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.batches ENABLE ROW LEVEL SECURITY;

-- Batch policies
CREATE POLICY "Anyone can view batches" ON public.batches FOR SELECT USING (true);
CREATE POLICY "Teachers can create batches" ON public.batches FOR INSERT WITH CHECK (
  auth.uid() = teacher_id AND 
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'teacher')
);
CREATE POLICY "Teachers can update own batches" ON public.batches FOR UPDATE USING (auth.uid() = teacher_id);
CREATE POLICY "Teachers can delete own batches" ON public.batches FOR DELETE USING (auth.uid() = teacher_id);

-- Create batch enrollments table
CREATE TABLE public.batch_enrollments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  batch_id UUID NOT NULL REFERENCES public.batches(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  enrolled_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(batch_id, student_id)
);

-- Enable RLS
ALTER TABLE public.batch_enrollments ENABLE ROW LEVEL SECURITY;

-- Enrollment policies
CREATE POLICY "Users can view enrollments" ON public.batch_enrollments FOR SELECT USING (
  auth.uid() = student_id OR 
  EXISTS (SELECT 1 FROM public.batches WHERE id = batch_id AND teacher_id = auth.uid())
);
CREATE POLICY "Students can enroll" ON public.batch_enrollments FOR INSERT WITH CHECK (
  auth.uid() = student_id AND 
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'student')
);
CREATE POLICY "Students can unenroll" ON public.batch_enrollments FOR DELETE USING (auth.uid() = student_id);

-- Create classes table
CREATE TABLE public.classes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  batch_id UUID NOT NULL REFERENCES public.batches(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  class_type TEXT NOT NULL CHECK (class_type IN ('live', 'recorded', 'notes')),
  video_url TEXT,
  live_url TEXT,
  scheduled_at TIMESTAMP WITH TIME ZONE,
  duration TEXT,
  is_live BOOLEAN DEFAULT false,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;

-- Class policies
CREATE POLICY "Users can view classes in enrolled batches" ON public.classes FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.batches WHERE id = batch_id AND teacher_id = auth.uid()) OR
  EXISTS (SELECT 1 FROM public.batch_enrollments WHERE batch_id = classes.batch_id AND student_id = auth.uid())
);
CREATE POLICY "Teachers can create classes" ON public.classes FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.batches WHERE id = batch_id AND teacher_id = auth.uid())
);
CREATE POLICY "Teachers can update classes" ON public.classes FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.batches WHERE id = batch_id AND teacher_id = auth.uid())
);
CREATE POLICY "Teachers can delete classes" ON public.classes FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.batches WHERE id = batch_id AND teacher_id = auth.uid())
);

-- Create notes table
CREATE TABLE public.notes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  class_id UUID NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT,
  pdf_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;

-- Notes policies
CREATE POLICY "Users can view notes" ON public.notes FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.classes c 
    JOIN public.batches b ON c.batch_id = b.id 
    WHERE c.id = class_id AND (
      b.teacher_id = auth.uid() OR 
      EXISTS (SELECT 1 FROM public.batch_enrollments WHERE batch_id = b.id AND student_id = auth.uid())
    )
  )
);
CREATE POLICY "Teachers can manage notes" ON public.notes FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.classes c 
    JOIN public.batches b ON c.batch_id = b.id 
    WHERE c.id = class_id AND b.teacher_id = auth.uid()
  )
);

-- Create live comments table
CREATE TABLE public.live_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  class_id UUID NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.live_comments ENABLE ROW LEVEL SECURITY;

-- Comment policies
CREATE POLICY "Users can view comments" ON public.live_comments FOR SELECT USING (true);
CREATE POLICY "Authenticated users can add comments" ON public.live_comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Teachers can delete any comment" ON public.live_comments FOR DELETE USING (
  EXISTS (
    SELECT 1 FROM public.classes c 
    JOIN public.batches b ON c.batch_id = b.id 
    WHERE c.id = class_id AND b.teacher_id = auth.uid()
  ) OR auth.uid() = user_id
);

-- Create tests table
CREATE TABLE public.tests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  batch_id UUID NOT NULL REFERENCES public.batches(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  duration INTEGER NOT NULL DEFAULT 30,
  total_marks INTEGER NOT NULL DEFAULT 10,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.tests ENABLE ROW LEVEL SECURITY;

-- Test policies
CREATE POLICY "Users can view tests" ON public.tests FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.batches WHERE id = batch_id AND teacher_id = auth.uid()) OR
  EXISTS (SELECT 1 FROM public.batch_enrollments WHERE batch_id = tests.batch_id AND student_id = auth.uid())
);
CREATE POLICY "Teachers can manage tests" ON public.tests FOR ALL USING (
  EXISTS (SELECT 1 FROM public.batches WHERE id = batch_id AND teacher_id = auth.uid())
);

-- Create test questions table
CREATE TABLE public.test_questions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  test_id UUID NOT NULL REFERENCES public.tests(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  options JSONB NOT NULL,
  correct_answer INTEGER NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0
);

-- Enable RLS
ALTER TABLE public.test_questions ENABLE ROW LEVEL SECURITY;

-- Question policies
CREATE POLICY "Users can view questions" ON public.test_questions FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.tests t 
    JOIN public.batches b ON t.batch_id = b.id 
    WHERE t.id = test_id AND (
      b.teacher_id = auth.uid() OR 
      EXISTS (SELECT 1 FROM public.batch_enrollments WHERE batch_id = b.id AND student_id = auth.uid())
    )
  )
);
CREATE POLICY "Teachers can manage questions" ON public.test_questions FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.tests t 
    JOIN public.batches b ON t.batch_id = b.id 
    WHERE t.id = test_id AND b.teacher_id = auth.uid()
  )
);

-- Create test results table
CREATE TABLE public.test_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  test_id UUID NOT NULL REFERENCES public.tests(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  answers JSONB NOT NULL,
  score INTEGER NOT NULL,
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(test_id, student_id)
);

-- Enable RLS
ALTER TABLE public.test_results ENABLE ROW LEVEL SECURITY;

-- Result policies
CREATE POLICY "Users can view own results" ON public.test_results FOR SELECT USING (
  auth.uid() = student_id OR
  EXISTS (
    SELECT 1 FROM public.tests t 
    JOIN public.batches b ON t.batch_id = b.id 
    WHERE t.id = test_id AND b.teacher_id = auth.uid()
  )
);
CREATE POLICY "Students can submit results" ON public.test_results FOR INSERT WITH CHECK (auth.uid() = student_id);

-- Enable realtime for live comments
ALTER PUBLICATION supabase_realtime ADD TABLE public.live_comments;

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_batches_updated_at BEFORE UPDATE ON public.batches FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_classes_updated_at BEFORE UPDATE ON public.classes FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_notes_updated_at BEFORE UPDATE ON public.notes FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_tests_updated_at BEFORE UPDATE ON public.tests FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'role', 'student')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger to auto-create profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();