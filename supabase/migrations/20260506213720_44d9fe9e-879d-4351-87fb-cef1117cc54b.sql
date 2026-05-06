
CREATE TABLE public.cart_removal_feedback (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_title TEXT,
  variant_id TEXT,
  quantity INTEGER,
  price_amount NUMERIC,
  reason TEXT NOT NULL,
  comment TEXT,
  is_bundle BOOLEAN NOT NULL DEFAULT false,
  bundle_name TEXT,
  user_agent TEXT,
  page_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.cart_removal_feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit cart removal feedback"
ON public.cart_removal_feedback
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "No public read access to cart removal feedback"
ON public.cart_removal_feedback
FOR SELECT
TO public
USING (false);
