CREATE TABLE public.admin_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  scope text NOT NULL,
  scope_id text,
  note text NOT NULL,
  author text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE INDEX idx_admin_notes_scope ON public.admin_notes(scope, scope_id);

ALTER TABLE public.admin_notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "No public access to admin notes"
ON public.admin_notes
FOR SELECT TO public
USING (false);

CREATE POLICY "No public insert to admin notes"
ON public.admin_notes
FOR INSERT TO public
WITH CHECK (false);