CREATE POLICY "No public read access to contact submissions"
ON public.contact_submissions
FOR SELECT
USING (false);