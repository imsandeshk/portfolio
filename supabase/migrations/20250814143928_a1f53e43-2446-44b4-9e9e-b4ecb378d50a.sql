-- Create user roles system for proper admin authentication
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles (prevents recursive RLS issues)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create function to automatically assign 'user' role to new users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  RETURN NEW;
END;
$$;

-- Create trigger to assign role on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- RLS policies for user_roles table
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Only admins can manage roles"
ON public.user_roles
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Update existing table policies to restrict admin operations
-- Update site_profile policies
DROP POLICY IF EXISTS "Authenticated can insert site_profile" ON public.site_profile;
DROP POLICY IF EXISTS "Authenticated can update site_profile" ON public.site_profile;
DROP POLICY IF EXISTS "Authenticated can delete site_profile" ON public.site_profile;

CREATE POLICY "Only admins can insert site_profile"
ON public.site_profile
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update site_profile"
ON public.site_profile
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete site_profile"
ON public.site_profile
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Update social_links policies
DROP POLICY IF EXISTS "Authenticated can insert social_links" ON public.social_links;
DROP POLICY IF EXISTS "Authenticated can update social_links" ON public.social_links;
DROP POLICY IF EXISTS "Authenticated can delete social_links" ON public.social_links;

CREATE POLICY "Only admins can insert social_links"
ON public.social_links
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update social_links"
ON public.social_links
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete social_links"
ON public.social_links
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Update projects policies
DROP POLICY IF EXISTS "Authenticated can insert projects" ON public.projects;
DROP POLICY IF EXISTS "Authenticated can update projects" ON public.projects;
DROP POLICY IF EXISTS "Authenticated can delete projects" ON public.projects;

CREATE POLICY "Only admins can insert projects"
ON public.projects
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update projects"
ON public.projects
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete projects"
ON public.projects
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Update certificates policies
DROP POLICY IF EXISTS "Authenticated can insert certificates" ON public.certificates;
DROP POLICY IF EXISTS "Authenticated can update certificates" ON public.certificates;
DROP POLICY IF EXISTS "Authenticated can delete certificates" ON public.certificates;

CREATE POLICY "Only admins can insert certificates"
ON public.certificates
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update certificates"
ON public.certificates
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete certificates"
ON public.certificates
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Update tasks policies  
DROP POLICY IF EXISTS "Authenticated can insert tasks" ON public.tasks;
DROP POLICY IF EXISTS "Authenticated can update tasks" ON public.tasks;
DROP POLICY IF EXISTS "Authenticated can delete tasks" ON public.tasks;

CREATE POLICY "Only admins can insert tasks"
ON public.tasks
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update tasks"
ON public.tasks
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete tasks"
ON public.tasks
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Update skills policies
DROP POLICY IF EXISTS "Authenticated can insert skills" ON public.skills;
DROP POLICY IF EXISTS "Authenticated can update skills" ON public.skills;
DROP POLICY IF EXISTS "Authenticated can delete skills" ON public.skills;

CREATE POLICY "Only admins can insert skills"
ON public.skills
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update skills"
ON public.skills
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete skills"
ON public.skills
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Update education policies
DROP POLICY IF EXISTS "Authenticated can insert education" ON public.education;
DROP POLICY IF EXISTS "Authenticated can update education" ON public.education;
DROP POLICY IF EXISTS "Authenticated can delete education" ON public.education;

CREATE POLICY "Only admins can insert education"
ON public.education
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update education"
ON public.education
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete education"
ON public.education
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Update experience policies
DROP POLICY IF EXISTS "Authenticated can insert experience" ON public.experience;
DROP POLICY IF EXISTS "Authenticated can update experience" ON public.experience;
DROP POLICY IF EXISTS "Authenticated can delete experience" ON public.experience;

CREATE POLICY "Only admins can insert experience"
ON public.experience
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update experience"
ON public.experience
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete experience"
ON public.experience
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Update contact_info policies
DROP POLICY IF EXISTS "Authenticated can insert contact_info" ON public.contact_info;
DROP POLICY IF EXISTS "Authenticated can update contact_info" ON public.contact_info;
DROP POLICY IF EXISTS "Authenticated can delete contact_info" ON public.contact_info;

CREATE POLICY "Only admins can insert contact_info"
ON public.contact_info
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update contact_info"
ON public.contact_info
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete contact_info"
ON public.contact_info
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Update feedback policies - restrict reads to admins only as feedback contains personal data
DROP POLICY IF EXISTS "Public can read feedback" ON public.feedback;
DROP POLICY IF EXISTS "Authenticated can insert feedback" ON public.feedback;
DROP POLICY IF EXISTS "Authenticated can update feedback" ON public.feedback;
DROP POLICY IF EXISTS "Authenticated can delete feedback" ON public.feedback;

CREATE POLICY "Only admins can read feedback"
ON public.feedback
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can submit feedback"
ON public.feedback
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Only admins can update feedback"
ON public.feedback
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete feedback"
ON public.feedback
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));