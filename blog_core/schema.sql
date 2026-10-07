-- ===================================================
-- Siddhant School of Yoga - Local MySQL / XAMPP Schema
-- Database: siddhant_school_of_yoga
-- ===================================================

CREATE DATABASE IF NOT EXISTS `siddhant_school_of_yoga` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `siddhant_school_of_yoga`;

-- 1. Create Categories table
CREATE TABLE IF NOT EXISTS `categories` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `slug` VARCHAR(150) NOT NULL UNIQUE,
  `description` TEXT DEFAULT NULL,
  `color` VARCHAR(30) DEFAULT '#bf296a',
  `parent_id` INT DEFAULT NULL,
  `meta_title` VARCHAR(255) DEFAULT NULL,
  `meta_description` VARCHAR(500) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Create Users / Authors table
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(100) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `name` VARCHAR(150) DEFAULT 'Administrator',
  `email` VARCHAR(150) DEFAULT NULL,
  `role` VARCHAR(50) DEFAULT 'admin',
  `slug` VARCHAR(150) DEFAULT NULL,
  `photo` VARCHAR(500) DEFAULT NULL,
  `title` VARCHAR(255) DEFAULT NULL,
  `bio` TEXT DEFAULT NULL,
  `experience_years` INT DEFAULT 0,
  `instagram` VARCHAR(255) DEFAULT NULL,
  `youtube` VARCHAR(255) DEFAULT NULL,
  `yoga_alliance` VARCHAR(255) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Create blog table
CREATE TABLE IF NOT EXISTS `blog` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `category_id` INT DEFAULT NULL,
  `category_name` VARCHAR(150) DEFAULT NULL,
  `featured_image` VARCHAR(500) DEFAULT NULL,
  `featured_image_alt` VARCHAR(255) DEFAULT NULL,
  `featured_image_title` VARCHAR(255) DEFAULT NULL,
  `short_description` VARCHAR(500) DEFAULT NULL,
  `content` LONGTEXT DEFAULT NULL,
  `faqs` LONGTEXT DEFAULT NULL,
  `meta_title` VARCHAR(255) DEFAULT NULL,
  `meta_description` VARCHAR(500) DEFAULT NULL,
  `meta_keywords` VARCHAR(255) DEFAULT NULL,
  `popular` TINYINT(1) DEFAULT 0,
  `author` VARCHAR(100) DEFAULT 'Siddhant School of Yoga',
  `published_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `status` VARCHAR(50) DEFAULT 'published',
  `views` INT DEFAULT 0,
  `tags` LONGTEXT DEFAULT NULL,
  `focus_keyword` VARCHAR(255) DEFAULT NULL,
  `tldr` TEXT DEFAULT NULL,
  `key_takeaways` TEXT DEFAULT NULL,
  `canonical_url` VARCHAR(255) DEFAULT NULL,
  `conclusion` TEXT DEFAULT NULL,
  `schema_type` VARCHAR(50) DEFAULT 'post',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY `idx_category` (`category_id`),
  KEY `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Create Login Logs table
CREATE TABLE IF NOT EXISTS `login_logs` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(100) NOT NULL,
  `name` VARCHAR(150) DEFAULT NULL,
  `role` VARCHAR(50) DEFAULT NULL,
  `ip` VARCHAR(64) DEFAULT NULL,
  `user_agent` TEXT DEFAULT NULL,
  `status` VARCHAR(20) DEFAULT 'success',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Seed default admin user (login: admin / admin@123)
INSERT INTO `users` (`username`, `password`, `name`, `email`, `role`, `title`)
VALUES ('admin', 'admin@123', 'Siddhant School of Yoga Admin', 'info@siddhantschoolofyoga.com', 'admin', 'Lead Teacher & Founder')
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`);

-- 6. Seed default categories
INSERT INTO `categories` (`name`, `slug`, `color`, `description`, `meta_title`, `meta_description`)
VALUES
  ('Yoga Teacher Training', 'yoga-teacher-training', '#bf296a',
   'Everything you need to know about becoming a certified yoga teacher in Rishikesh. Explore guides on 200, 300 and 500 hour Yoga Alliance courses.',
   'Yoga Teacher Training in Rishikesh | YTTC Guides',
   'Compare 200, 300 and 500 hour Yoga Alliance teacher training courses in Rishikesh.'),
  ('Yoga Retreats & Rishikesh Travel', 'yoga-retreats-rishikesh-travel', '#5C6E4E',
   'Plan your yoga journey to Rishikesh. Find tips on retreats, ashram life and spiritual places along the Ganges.',
   'Yoga Retreats & Rishikesh Travel Guides',
   'Plan your yoga journey to the Yoga Capital of the World.'),
  ('Yoga Asanas', 'yoga-asanas', '#C9862A',
   'Step-by-step guides to yoga poses for beginners and advanced practitioners with benefits and precautions.',
   'Yoga Asanas | Step-by-Step Pose Guides',
   'Step-by-step guides to yoga poses for beginners and advanced practitioners.'),
  ('Pranayama & Meditation', 'pranayama-meditation', '#4a5fa8',
   'Discover the power of breath and stillness. Learn authentic pranayama techniques and meditation methods.',
   'Pranayama & Meditation Techniques',
   'Discover authentic pranayama breathwork and meditation techniques.'),
  ('Mudras & Bandhas', 'mudras-bandhas', '#ac1c5b',
   'Explore the subtle art of hand gestures and energy locks in yoga.',
   'Mudras & Bandhas in Yoga',
   'Explore the subtle art of hand gestures and energy locks in yoga.'),
  ('Yoga Therapy & Holistic Health', 'yoga-therapy-holistic-health', '#00897b',
   'Use yoga, Ayurveda and natural remedies to support your wellbeing and health.',
   'Yoga Therapy & Holistic Health',
   'Natural remedies, Ayurveda and yogic therapy for balanced living.'),
  ('Yoga Philosophy & Spiritual Living', 'yoga-philosophy-spiritual-living', '#951248',
   'Go beyond the mat with the timeless wisdom of yoga, the Yoga Sutras and the eight limbs.',
   'Yoga Philosophy & Spiritual Living',
   'Explore the eight limbs of yoga and practical lessons for mindful living.')
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`);
