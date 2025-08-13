-- Lock writes to authenticated users; keep public reads
-- Certificates
DROP POLICY IF EXISTS "Anyone can insert certificates" ON public.certificates;
DROP POLICY IF EXISTS "Anyone can update certificates" ON public.certificates;
DROP POLICY IF EXISTS "Anyone can delete certificates" ON public.certificates;
CREATE POLICY "Authenticated can insert certificates"
ON public.certificates FOR INSERT
TO authenticated
WITH CHECK (true);
CREATE POLICY "Authenticated can update certificates"
ON public.certificates FOR UPDATE
TO authenticated
USING (true);
CREATE POLICY "Authenticated can delete certificates"
ON public.certificates FOR DELETE
TO authenticated
USING (true);

-- Contact Info
DROP POLICY IF EXISTS "Anyone can insert contact_info" ON public.contact_info;
DROP POLICY IF EXISTS "Anyone can update contact_info" ON public.contact_info;
DROP POLICY IF EXISTS "Anyone can delete contact_info" ON public.contact_info;
CREATE POLICY "Authenticated can insert contact_info"
ON public.contact_info FOR INSERT
TO authenticated
WITH CHECK (true);
CREATE POLICY "Authenticated can update contact_info"
ON public.contact_info FOR UPDATE
TO authenticated
USING (true);
CREATE POLICY "Authenticated can delete contact_info"
ON public.contact_info FOR DELETE
TO authenticated
USING (true);

-- Education
DROP POLICY IF EXISTS "Anyone can insert education" ON public.education;
DROP POLICY IF EXISTS "Anyone can update education" ON public.education;
DROP POLICY IF EXISTS "Anyone can delete education" ON public.education;
CREATE POLICY "Authenticated can insert education"
ON public.education FOR INSERT
TO authenticated
WITH CHECK (true);
CREATE POLICY "Authenticated can update education"
ON public.education FOR UPDATE
TO authenticated
USING (true);
CREATE POLICY "Authenticated can delete education"
ON public.education FOR DELETE
TO authenticated
USING (true);

-- Experience
DROP POLICY IF EXISTS "Anyone can insert experience" ON public.experience;
DROP POLICY IF EXISTS "Anyone can update experience" ON public.experience;
DROP POLICY IF EXISTS "Anyone can delete experience" ON public.experience;
CREATE POLICY "Authenticated can insert experience"
ON public.experience FOR INSERT
TO authenticated
WITH CHECK (true);
CREATE POLICY "Authenticated can update experience"
ON public.experience FOR UPDATE
TO authenticated
USING (true);
CREATE POLICY "Authenticated can delete experience"
ON public.experience FOR DELETE
TO authenticated
USING (true);

-- Feedback
DROP POLICY IF EXISTS "Anyone can insert feedback" ON public.feedback;
DROP POLICY IF EXISTS "Anyone can update feedback" ON public.feedback;
DROP POLICY IF EXISTS "Anyone can delete feedback" ON public.feedback;
CREATE POLICY "Authenticated can insert feedback"
ON public.feedback FOR INSERT
TO authenticated
WITH CHECK (true);
CREATE POLICY "Authenticated can update feedback"
ON public.feedback FOR UPDATE
TO authenticated
USING (true);
CREATE POLICY "Authenticated can delete feedback"
ON public.feedback FOR DELETE
TO authenticated
USING (true);

-- Projects
DROP POLICY IF EXISTS "Anyone can insert projects" ON public.projects;
DROP POLICY IF EXISTS "Anyone can update projects" ON public.projects;
DROP POLICY IF EXISTS "Anyone can delete projects" ON public.projects;
CREATE POLICY "Authenticated can insert projects"
ON public.projects FOR INSERT
TO authenticated
WITH CHECK (true);
CREATE POLICY "Authenticated can update projects"
ON public.projects FOR UPDATE
TO authenticated
USING (true);
CREATE POLICY "Authenticated can delete projects"
ON public.projects FOR DELETE
TO authenticated
USING (true);

-- Site Profile
DROP POLICY IF EXISTS "Anyone can insert site_profile" ON public.site_profile;
DROP POLICY IF EXISTS "Anyone can update site_profile" ON public.site_profile;
DROP POLICY IF EXISTS "Anyone can delete site_profile" ON public.site_profile;
CREATE POLICY "Authenticated can insert site_profile"
ON public.site_profile FOR INSERT
TO authenticated
WITH CHECK (true);
CREATE POLICY "Authenticated can update site_profile"
ON public.site_profile FOR UPDATE
TO authenticated
USING (true);
CREATE POLICY "Authenticated can delete site_profile"
ON public.site_profile FOR DELETE
TO authenticated
USING (true);

-- Skills
DROP POLICY IF EXISTS "Anyone can insert skills" ON public.skills;
DROP POLICY IF EXISTS "Anyone can update skills" ON public.skills;
DROP POLICY IF EXISTS "Anyone can delete skills" ON public.skills;
CREATE POLICY "Authenticated can insert skills"
ON public.skills FOR INSERT
TO authenticated
WITH CHECK (true);
CREATE POLICY "Authenticated can update skills"
ON public.skills FOR UPDATE
TO authenticated
USING (true);
CREATE POLICY "Authenticated can delete skills"
ON public.skills FOR DELETE
TO authenticated
USING (true);

-- Social Links
DROP POLICY IF EXISTS "Anyone can insert social_links" ON public.social_links;
DROP POLICY IF EXISTS "Anyone can update social_links" ON public.social_links;
DROP POLICY IF EXISTS "Anyone can delete social_links" ON public.social_links;
CREATE POLICY "Authenticated can insert social_links"
ON public.social_links FOR INSERT
TO authenticated
WITH CHECK (true);
CREATE POLICY "Authenticated can update social_links"
ON public.social_links FOR UPDATE
TO authenticated
USING (true);
CREATE POLICY "Authenticated can delete social_links"
ON public.social_links FOR DELETE
TO authenticated
USING (true);

-- Tasks
DROP POLICY IF EXISTS "Anyone can insert tasks" ON public.tasks;
DROP POLICY IF EXISTS "Anyone can update tasks" ON public.tasks;
DROP POLICY IF EXISTS "Anyone can delete tasks" ON public.tasks;
CREATE POLICY "Authenticated can insert tasks"
ON public.tasks FOR INSERT
TO authenticated
WITH CHECK (true);
CREATE POLICY "Authenticated can update tasks"
ON public.tasks FOR UPDATE
TO authenticated
USING (true);
CREATE POLICY "Authenticated can delete tasks"
ON public.tasks FOR DELETE
TO authenticated
USING (true);

-- Ensure public SELECT policies remain as-is (no changes)
