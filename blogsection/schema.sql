-- ===================================================
-- Sanskriti Yogpeeth Blog System - Supabase Schema
-- ===================================================

-- 1. Create Categories table
CREATE TABLE IF NOT EXISTS public.categories (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  slug VARCHAR(150) NOT NULL UNIQUE,
  description TEXT DEFAULT NULL,
  color VARCHAR(30) DEFAULT '#bf296a',
  parent_id BIGINT DEFAULT NULL,
  meta_title VARCHAR(255) DEFAULT NULL,
  meta_description VARCHAR(500) DEFAULT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Users / Authors table
CREATE TABLE IF NOT EXISTS public.users (
  id BIGSERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(150) DEFAULT 'Administrator',
  email VARCHAR(150) DEFAULT NULL,
  role VARCHAR(50) DEFAULT 'admin',
  slug VARCHAR(150) DEFAULT NULL,
  photo VARCHAR(500) DEFAULT NULL,
  title VARCHAR(255) DEFAULT NULL,
  bio TEXT DEFAULT NULL,
  experience_years INT DEFAULT 0,
  instagram VARCHAR(255) DEFAULT NULL,
  youtube VARCHAR(255) DEFAULT NULL,
  yoga_alliance VARCHAR(255) DEFAULT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create Blogs table
CREATE TABLE IF NOT EXISTS public.blogs (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  category_id BIGINT DEFAULT NULL,
  category_name VARCHAR(150) DEFAULT NULL,
  featured_image VARCHAR(500) DEFAULT NULL,
  featured_image_alt VARCHAR(255) DEFAULT NULL,
  featured_image_title VARCHAR(255) DEFAULT NULL,
  short_description VARCHAR(500) DEFAULT NULL,
  content TEXT DEFAULT NULL,
  faqs JSONB DEFAULT '[]'::jsonb,
  meta_title VARCHAR(255) DEFAULT NULL,
  meta_description VARCHAR(500) DEFAULT NULL,
  meta_keywords VARCHAR(255) DEFAULT NULL,
  popular BOOLEAN DEFAULT false,
  author VARCHAR(100) DEFAULT 'Sanskriti Yogpeeth',
  published_at TIMESTAMPTZ DEFAULT NOW(),
  status VARCHAR(50) DEFAULT 'published',
  views INT DEFAULT 0,
  seo_score INT DEFAULT 75,
  tags JSONB DEFAULT '[]'::jsonb,
  focus_keyword VARCHAR(255) DEFAULT NULL,
  related_keywords VARCHAR(255) DEFAULT NULL,
  tldr TEXT DEFAULT NULL,
  key_takeaways TEXT DEFAULT NULL,
  canonical_url VARCHAR(255) DEFAULT NULL,
  conclusion TEXT DEFAULT NULL,
  schema_type VARCHAR(50) DEFAULT 'post',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Enable seamless access for blog APIs
ALTER TABLE public.categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs DISABLE ROW LEVEL SECURITY;

-- 5. Seed default admin user (login: admin / admin@123)
INSERT INTO public.users (username, password, name, email, role)
VALUES ('admin', 'admin@123', 'Sanskriti Yogpeeth Admin', 'admin@sanskritiyogpeeth.org', 'admin')
ON CONFLICT (username) DO NOTHING;

-- 6. Seed default categories
-- Slugs must match blogsection/api/categories.ts slugifier
-- ([^a-z0-9]+ -> "-"), so "&" becomes "-" and never "-and-".
INSERT INTO public.categories (name, slug, description, color, meta_title, meta_description)
VALUES
  ('Yoga Teacher Training', 'yoga-teacher-training',
   'Everything you need to know about becoming a certified yoga teacher in Rishikesh. Explore guides on 200, 300 and 500 hour Yoga Alliance courses, curriculum, fees, daily schedules and practical teaching skills to help you choose the right TTC.',
   '#bf296a',
   'Yoga Teacher Training in Rishikesh | 200, 300 & 500 Hour YTTC Guides',
   'Compare 200, 300 and 500 hour Yoga Alliance teacher training courses in Rishikesh. Read honest guides on curriculum, fees, daily schedules and the teaching skills you need to confidently lead a class.'),
  ('Yoga Retreats & Rishikesh Travel', 'yoga-retreats-rishikesh-travel',
   'Plan your yoga journey to the Yoga Capital of the World. Find tips on yoga retreats in Rishikesh, the best time to visit, what to pack, ashram life and the must-see spiritual places along the Ganges.',
   '#5C6E4E',
   'Yoga Retreats & Rishikesh Travel Guides | Sanskriti Yogpeeth',
   'Plan your yoga journey to the Yoga Capital of the World. Find tips on yoga retreats in Rishikesh, the best time to visit, what to pack, ashram life and the must-see spiritual places along the Ganges.'),
  ('Yoga Asanas', 'yoga-asanas',
   'Step-by-step guides to yoga poses for beginners and advanced practitioners. Learn correct alignment, benefits, precautions and variations for each asana, taught in the traditional Rishikesh style.',
   '#C9862A',
   'Yoga Asanas | Step-by-Step Pose Guides with Benefits & Precautions',
   'Step-by-step guides to yoga poses for beginners and advanced practitioners. Learn correct alignment, benefits, precautions and variations for each asana, taught in the traditional Rishikesh style.'),
  ('Pranayama & Meditation', 'pranayama-meditation',
   'Discover the power of breath and stillness. Learn authentic pranayama techniques, meditation methods and yoga nidra practices to calm the mind, increase energy and deepen your spiritual practice.',
   '#4a5fa8',
   'Pranayama & Meditation Techniques for Calm, Energy and Depth',
   'Discover the power of breath and stillness. Learn authentic pranayama techniques, meditation methods and yoga nidra practices to calm the mind, increase energy and deepen your spiritual practice.'),
  ('Mudras & Bandhas', 'mudras-bandhas',
   'Explore the subtle art of hand gestures and energy locks in yoga. Understand how each mudra and bandha works, how to practice it correctly and the healing benefits it brings to body and mind.',
   '#ac1c5b',
   'Mudras & Bandhas | Hand Gestures and Energy Locks in Yoga',
   'Explore the subtle art of hand gestures and energy locks in yoga. Understand how each mudra and bandha works, how to practice it correctly and the healing benefits it brings to body and mind.'),
  ('Yoga Therapy & Holistic Health', 'yoga-therapy-holistic-health',
   'Use yoga, Ayurveda and natural remedies to support your wellbeing. Read about yoga for specific health conditions, immunity, healing herbs and a sattvic yogic diet for a balanced life.',
   '#00897b',
   'Yoga Therapy & Holistic Health | Ayurveda and Natural Remedies',
   'Use yoga, Ayurveda and natural remedies to support your wellbeing. Read about yoga for specific health conditions, immunity, healing herbs and a sattvic yogic diet for a balanced life.'),
  ('Yoga Philosophy & Spiritual Living', 'yoga-philosophy-spiritual-living',
   'Go beyond the mat with the timeless wisdom of yoga. Explore the Yoga Sutras, the eight limbs of yoga, chakras, ancient scriptures and practical lessons for living a peaceful, mindful life.',
   '#951248',
   'Yoga Philosophy & Spiritual Living | The Eight Limbs Explained',
   'Go beyond the mat with the timeless wisdom of yoga. Explore the Yoga Sutras, the eight limbs of yoga, chakras, ancient scriptures and practical lessons for living a peaceful, mindful life.')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  color = EXCLUDED.color,
  meta_title = EXCLUDED.meta_title,
  meta_description = EXCLUDED.meta_description;

-- 7. Create Login Activity / Audit table
--    Required by blogsection/lib/loginLogs.ts. Without it, every login-log
--    read/write fails (the login path itself stays safe because
--    safeRecordLoginLog swallows write errors).
CREATE TABLE IF NOT EXISTS public.login_logs (
  id BIGSERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  name VARCHAR(150) DEFAULT NULL,
  role VARCHAR(50) DEFAULT NULL,
  ip VARCHAR(64) DEFAULT NULL,
  user_agent TEXT DEFAULT NULL,
  status VARCHAR(20) DEFAULT 'success',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Newest-first reads are the hot path for the admin Login Activity view.
CREATE INDEX IF NOT EXISTS login_logs_created_at_idx
  ON public.login_logs (created_at DESC);

-- 8. Create Storage Bucket for blog images
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public blog images are viewable by everyone') THEN
    CREATE POLICY "Public blog images are viewable by everyone" ON storage.objects FOR SELECT USING (bucket_id = 'blog-images');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public can upload blog images') THEN
    CREATE POLICY "Public can upload blog images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'blog-images');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public can update blog images') THEN
    CREATE POLICY "Public can update blog images" ON storage.objects FOR UPDATE USING (bucket_id = 'blog-images');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public can delete blog images') THEN
    CREATE POLICY "Public can delete blog images" ON storage.objects FOR DELETE USING (bucket_id = 'blog-images');
  END IF;
END $$;
