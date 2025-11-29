-- Create content tables for portfolio with public read access
-- NOTE: Initial setup allows public writes to enable admin panel without auth.
-- It is strongly recommended to tighten RLS after enabling Supabase Auth.

-- Helper function for updated_at
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Profiles / Site profile (single row expected)
CREATE TABLE IF NOT EXISTS public.site_profile (
  id text PRIMARY KEY,
  name text NOT NULL,
  title text NOT NULL,
  bio text,
  email text NOT NULL,
  phone text,
  location text,
  date_of_birth text,
  languages text[],
  hobbies text[],
  profile_image text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TRIGGER trg_site_profile_updated BEFORE UPDATE ON public.site_profile
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Social links
CREATE TABLE IF NOT EXISTS public.social_links (
  id text PRIMARY KEY,
  platform text NOT NULL,
  url text NOT NULL,
  icon text,
  sort_order int,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TRIGGER trg_social_links_updated BEFORE UPDATE ON public.social_links
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Projects
CREATE TABLE IF NOT EXISTS public.projects (
  id text PRIMARY KEY,
  title text NOT NULL,
  description text,
  image text,
  category text,
  tags text[],
  url text,
  github text,
  pinned boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TRIGGER trg_projects_updated BEFORE UPDATE ON public.projects
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Certificates
CREATE TABLE IF NOT EXISTS public.certificates (
  id text PRIMARY KEY,
  title text NOT NULL,
  issuer text NOT NULL,
  date date,
  url text,
  image text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TRIGGER trg_certificates_updated BEFORE UPDATE ON public.certificates
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Tasks
CREATE TABLE IF NOT EXISTS public.tasks (
  id text PRIMARY KEY,
  title text NOT NULL,
  description text,
  completed boolean NOT NULL DEFAULT false,
  due_date date,
  priority text NOT NULL DEFAULT 'medium',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TRIGGER trg_tasks_updated BEFORE UPDATE ON public.tasks
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Skills
CREATE TABLE IF NOT EXISTS public.skills (
  id text PRIMARY KEY,
  name text NOT NULL,
  level int,
  category text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TRIGGER trg_skills_updated BEFORE UPDATE ON public.skills
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Education
CREATE TABLE IF NOT EXISTS public.education (
  id text PRIMARY KEY,
  institution text NOT NULL,
  degree text NOT NULL,
  field text,
  start_date date,
  end_date date,
  description text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TRIGGER trg_education_updated BEFORE UPDATE ON public.education
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Experience
CREATE TABLE IF NOT EXISTS public.experience (
  id text PRIMARY KEY,
  company text NOT NULL,
  position text NOT NULL,
  start_date date,
  end_date date,
  description text,
  technologies text[],
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TRIGGER trg_experience_updated BEFORE UPDATE ON public.experience
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Contact info (single row expected)
CREATE TABLE IF NOT EXISTS public.contact_info (
  id text PRIMARY KEY,
  email text NOT NULL,
  phone text,
  address text,
  location text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TRIGGER trg_contact_info_updated BEFORE UPDATE ON public.contact_info
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Feedback (public can insert)
CREATE TABLE IF NOT EXISTS public.feedback (
  id text PRIMARY KEY,
  name text NOT NULL,
  email text,
  rating int CHECK (rating BETWEEN 1 AND 5),
  comment text,
  date timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TRIGGER trg_feedback_updated BEFORE UPDATE ON public.feedback
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Enable RLS on all tables
ALTER TABLE public.site_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public can read site_profile" ON public.site_profile FOR SELECT USING (true);
CREATE POLICY "Public can read social_links" ON public.social_links FOR SELECT USING (true);
CREATE POLICY "Public can read projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public can read certificates" ON public.certificates FOR SELECT USING (true);
CREATE POLICY "Public can read tasks" ON public.tasks FOR SELECT USING (true);
CREATE POLICY "Public can read skills" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Public can read education" ON public.education FOR SELECT USING (true);
CREATE POLICY "Public can read experience" ON public.experience FOR SELECT USING (true);
CREATE POLICY "Public can read contact_info" ON public.contact_info FOR SELECT USING (true);
CREATE POLICY "Public can read feedback" ON public.feedback FOR SELECT USING (true);

-- TEMPORARY: Allow all writes (insert/update/delete) until auth is added
-- WARNING: This is insecure. We will tighten these once admin auth is enabled.
CREATE POLICY "Anyone can insert site_profile" ON public.site_profile FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update site_profile" ON public.site_profile FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete site_profile" ON public.site_profile FOR DELETE USING (true);

CREATE POLICY "Anyone can insert social_links" ON public.social_links FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update social_links" ON public.social_links FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete social_links" ON public.social_links FOR DELETE USING (true);

CREATE POLICY "Anyone can insert projects" ON public.projects FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update projects" ON public.projects FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete projects" ON public.projects FOR DELETE USING (true);

CREATE POLICY "Anyone can insert certificates" ON public.certificates FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update certificates" ON public.certificates FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete certificates" ON public.certificates FOR DELETE USING (true);

CREATE POLICY "Anyone can insert tasks" ON public.tasks FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update tasks" ON public.tasks FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete tasks" ON public.tasks FOR DELETE USING (true);

CREATE POLICY "Anyone can insert skills" ON public.skills FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update skills" ON public.skills FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete skills" ON public.skills FOR DELETE USING (true);

CREATE POLICY "Anyone can insert education" ON public.education FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update education" ON public.education FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete education" ON public.education FOR DELETE USING (true);

CREATE POLICY "Anyone can insert experience" ON public.experience FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update experience" ON public.experience FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete experience" ON public.experience FOR DELETE USING (true);

CREATE POLICY "Anyone can insert contact_info" ON public.contact_info FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update contact_info" ON public.contact_info FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete contact_info" ON public.contact_info FOR DELETE USING (true);

-- Feedback: allow anyone to insert/delete for now
CREATE POLICY "Anyone can insert feedback" ON public.feedback FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update feedback" ON public.feedback FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete feedback" ON public.feedback FOR DELETE USING (true);
