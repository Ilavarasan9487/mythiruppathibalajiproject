/*
# Upgrade Schema for Travel CMS

## Query Description: 
This operation adds new columns to existing tables (vehicles, destinations, packages) to match the UI requirements, and creates new tables for public enquiries and site settings. Existing data is preserved.

## Metadata:
- Schema-Category: Structural
- Impact-Level: Medium
- Requires-Backup: false
- Reversible: true

## Structure Details:
- Alter `vehicles`: add `category`, `capacity_text`, `features`, `status`.
- Alter `destinations`: add `category`, `best_time`, `duration`.
- Alter `packages`: add `inclusions`.
- Create `enquiries`: for public booking requests.
- Create `site_settings`: for global website settings.

## Security Implications:
- RLS Status: Enabled
- Policy Changes: Added public insert for enquiries, public read for settings. Admin gets full CRUD access.
*/

-- Alter vehicles
ALTER TABLE public.vehicles 
ADD COLUMN IF NOT EXISTS category text DEFAULT 'Cars',
ADD COLUMN IF NOT EXISTS capacity_text text DEFAULT '4 Seats',
ADD COLUMN IF NOT EXISTS features text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS status text DEFAULT 'available';

-- Alter destinations
ALTER TABLE public.destinations
ADD COLUMN IF NOT EXISTS category text DEFAULT 'Other',
ADD COLUMN IF NOT EXISTS best_time text,
ADD COLUMN IF NOT EXISTS duration text;

-- Alter packages
ALTER TABLE public.packages
ADD COLUMN IF NOT EXISTS inclusions text[] DEFAULT '{}';

-- Create enquiries table
CREATE TABLE IF NOT EXISTS public.enquiries (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL,
    phone text NOT NULL,
    destination text,
    date text,
    travelers text,
    vehicle text,
    status text DEFAULT 'Pending',
    created_at timestamp with time zone DEFAULT now()
);

-- Create settings table
CREATE TABLE IF NOT EXISTS public.site_settings (
    id integer PRIMARY KEY DEFAULT 1,
    phone text,
    whatsapp text,
    email text,
    address text,
    google_business_link text,
    google_maps_url text,
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT single_row CHECK (id = 1)
);

-- Insert default settings if not exists
INSERT INTO public.site_settings (id, phone, whatsapp, email, address)
VALUES (1, '+91 733 947 4561', '917339474561', 'bookings@thirupathibalajitravels.com', '123 Temple Road, Near Agni Theertham, Rameswaram, Tamil Nadu 623526')
ON CONFLICT (id) DO NOTHING;

-- RLS for enquiries
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can insert enquiries" ON public.enquiries FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Auth users can view enquiries" ON public.enquiries FOR SELECT TO authenticated USING (true);
CREATE POLICY "Auth users can update enquiries" ON public.enquiries FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth users can delete enquiries" ON public.enquiries FOR DELETE TO authenticated USING (true);

-- RLS for site_settings
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view settings" ON public.site_settings FOR SELECT TO public USING (true);
CREATE POLICY "Auth users can update settings" ON public.site_settings FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth users can insert settings" ON public.site_settings FOR INSERT TO authenticated WITH CHECK (true);

-- Update existing RLS to allow authenticated users full access to vehicles, destinations, packages
CREATE POLICY "Auth users can insert vehicles" ON public.vehicles FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth users can update vehicles" ON public.vehicles FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth users can delete vehicles" ON public.vehicles FOR DELETE TO authenticated USING (true);

CREATE POLICY "Auth users can insert destinations" ON public.destinations FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth users can update destinations" ON public.destinations FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth users can delete destinations" ON public.destinations FOR DELETE TO authenticated USING (true);

CREATE POLICY "Auth users can insert packages" ON public.packages FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth users can update packages" ON public.packages FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth users can delete packages" ON public.packages FOR DELETE TO authenticated USING (true);
