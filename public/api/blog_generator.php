<?php
// ==============================================================================
// Siddhant School of Yoga - Static Blog Page Generator for Hostinger
// Generates fast, SEO-perfect static HTML files directly upon publishing
// ==============================================================================

require_once __DIR__ . '/config.php';

function generateStaticBlogPost($post) {
    if (!$post || empty($post['slug'])) return false;

    $templatePath = __DIR__ . '/blog-template.html';
    if (!file_exists($templatePath)) {
        return false;
    }

    $template = file_get_contents($templatePath);

    $title = htmlspecialchars(!empty($post['title']) ? $post['title'] : '', ENT_QUOTES, 'UTF-8');
    $slug = trim($post['slug']);
    $metaTitle = htmlspecialchars(!empty($post['meta_title']) ? $post['meta_title'] : $post['title'] . ' | Siddhant School of Yoga', ENT_QUOTES, 'UTF-8');
    $shortDesc = !empty($post['short_description']) ? $post['short_description'] : '';
    $metaDesc = htmlspecialchars(!empty($post['meta_description']) ? $post['meta_description'] : mb_substr(strip_tags($shortDesc), 0, 160), ENT_QUOTES, 'UTF-8');
    $author = htmlspecialchars(!empty($post['author']) ? $post['author'] : 'Siddhant School of Yoga', ENT_QUOTES, 'UTF-8');
    $categoryName = htmlspecialchars(!empty($post['category_name']) ? $post['category_name'] : 'Yoga Guide', ENT_QUOTES, 'UTF-8');

    // Clean image URL
    $featuredImg = !empty($post['featured_image']) ? $post['featured_image'] : '/blog/images/warrior-1-pose-ganga-riverside-rishikesh.jpg';
    if (!preg_match('/^https?:\/\//i', $featuredImg) && !str_starts_with($featuredImg, '/')) {
        $featuredImg = '/' . $featuredImg;
    }
    $ogImg = preg_match('/^https?:\/\//i', $featuredImg) ? $featuredImg : 'https://www.siddhantschoolofyoga.com' . $featuredImg;
    $canonicalUrl = 'https://www.siddhantschoolofyoga.com/blogs/' . $slug;

    // Format publish date
    $pubDate = !empty($post['published_at']) ? strtotime($post['published_at']) : (!empty($post['created_at']) ? strtotime($post['created_at']) : time());
    $formattedDate = date('F j, Y', $pubDate);
    $isoDate = date('c', $pubDate);

    // Calculate reading time
    $wordCount = str_word_count(strip_tags(!empty($post['content']) ? $post['content'] : ''));
    $readMinutes = max(1, ceil($wordCount / 200));

    // FAQs parsing
    $faqs = [];
    if (!empty($post['faqs'])) {
        $faqs = is_string($post['faqs']) ? json_decode($post['faqs'], true) : $post['faqs'];
        if (!is_array($faqs)) $faqs = [];
    }

    // 1. Meta tags HTML
    $metaTags = <<<HTML
<title>{$metaTitle}</title>
<meta name="description" content="{$metaDesc}"/>
<meta name="author" content="{$author}"/>
<link rel="manifest" href="/favicon/manifest.json"/>
<meta name="creator" content="Siddhant School of Yoga"/>
<meta name="publisher" content="Siddhant School of Yoga"/>
<meta name="robots" content="index, follow"/>
<meta name="msapplication-TileColor" content="#1c3b2b"/>
<meta name="msapplication-config" content="/favicon/browserconfig.xml"/>
<link rel="canonical" href="{$canonicalUrl}"/>
<meta property="og:title" content="{$metaTitle}"/>
<meta property="og:description" content="{$metaDesc}"/>
<meta property="og:url" content="{$canonicalUrl}"/>
<meta property="og:site_name" content="Siddhant School of Yoga Rishikesh"/>
<meta property="og:image" content="{$ogImg}"/>
<meta property="og:image:width" content="1200"/>
<meta property="og:image:height" content="630"/>
<meta property="og:image:alt" content="{$title}"/>
<meta property="og:type" content="article"/>
<meta property="article:published_time" content="{$isoDate}"/>
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:title" content="{$metaTitle}"/>
<meta name="twitter:description" content="{$metaDesc}"/>
<meta name="twitter:image" content="{$ogImg}"/>
<link rel="icon" href="/favicon/favicon-16x16.png" sizes="16x16" type="image/png"/>
<link rel="icon" href="/favicon/favicon-32x32.png" sizes="32x32" type="image/png"/>
<link rel="icon" href="/favicon/favicon-48x48.png" sizes="48x48" type="image/png"/>
<link rel="icon" href="/favicon/favicon-96x96.png" sizes="96x96" type="image/png"/>
<link rel="icon" href="/favicon/android-icon-192x192.png" sizes="192x192" type="image/png"/>
<link rel="icon" href="/favicon/favicon.ico" sizes="any"/>
<link rel="apple-touch-icon" href="/favicon/apple-icon.png"/>
<link rel="apple-touch-icon" href="/favicon/apple-icon-180x180.png" sizes="180x180" type="image/png"/>
HTML;

    // 2. Schema JSON-LD
    $schemaJson = json_encode([
        '@context' => 'https://schema.org',
        '@type' => 'BlogPosting',
        'headline' => !empty($post['title']) ? $post['title'] : '',
        'description' => strip_tags($metaDesc),
        'image' => [$ogImg],
        'datePublished' => $isoDate,
        'dateModified' => date('c'),
        'author' => [
            '@type' => 'Person',
            'name' => $author,
            'jobTitle' => 'Yoga Master'
        ],
        'publisher' => [
            '@type' => 'Organization',
            'name' => 'Siddhant School of Yoga Rishikesh',
            'logo' => [
                '@type' => 'ImageObject',
                'url' => 'https://www.siddhantschoolofyoga.com/logo/siddhant-logo.svg'
            ]
        ],
        'mainEntityOfPage' => [
            '@type' => 'WebPage',
            '@id' => $canonicalUrl
        ]
    ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);

    // 3. Extract H2 Table of Contents from content
    $content = !empty($post['content']) ? $post['content'] : '';
    $tocHtml = '';
    if (preg_match_all('/<h2[^>]*>(.*?)<\/h2>/is', $content, $h2Matches)) {
        $tocItems = '';
        foreach ($h2Matches[1] as $idx => $headingText) {
            $h2Clean = strip_tags($headingText);
            $h2Id = 'section-' . ($idx + 1);
            // Replace first occurrence of this h2 with id
            $tocItems .= '<li class="my-1.5"><a href="#' . $h2Id . '" class="text-stone-700 hover:text-[#1c3b2b] text-sm transition-colors">' . htmlspecialchars($h2Clean, ENT_QUOTES, 'UTF-8') . '</a></li>';
        }
        if (!empty($tocItems)) {
            $tocHtml = <<<HTML
<div class="my-8 p-6 bg-[#fdfbf7] rounded-2xl border border-[#e3dac9]">
    <h3 class="font-belleza text-lg text-[#1c3b2b] mb-3 font-semibold">Table of Contents</h3>
    <ul class="list-disc list-inside space-y-1">
        {$tocItems}
    </ul>
</div>
HTML;
        }
    }

    // 4. FAQ HTML
    $faqHtml = '';
    if (!empty($faqs)) {
        $faqItems = '';
        foreach ($faqs as $f) {
            $q = htmlspecialchars(isset($f['question']) ? $f['question'] : (isset($f['q']) ? $f['q'] : ''), ENT_QUOTES, 'UTF-8');
            $a = isset($f['answer']) ? $f['answer'] : (isset($f['a']) ? $f['a'] : '');
            if ($q) {
                $faqItems .= <<<HTML
<details class="group bg-[#fdfbf7] border border-[#e3dac9] rounded-xl p-4 my-3 cursor-pointer">
    <summary class="font-semibold text-stone-800 list-none flex justify-between items-center text-base">
        <span>{$q}</span>
        <span class="transition group-open:rotate-180">▾</span>
    </summary>
    <div class="mt-3 text-stone-600 text-sm leading-relaxed border-t border-[#e3dac9]/60 pt-3">
        {$a}
    </div>
</details>
HTML;
            }
        }
        if ($faqItems) {
            $faqHtml = <<<HTML
<div class="mt-12 pt-8 border-t border-[#e3dac9]/80">
    <h3 class="font-belleza text-2xl text-[#1c3b2b] mb-4">Frequently Asked Questions</h3>
    {$faqItems}
</div>
HTML;
        }
    }

    // 5. Short Description Box
    $shortDescBox = '';
    if (!empty($shortDesc)) {
        $shortDescBox = <<<HTML
<div class="p-5 my-6 bg-[#fdfbf7] border-l-4 border-[#1c3b2b] rounded-r-xl text-stone-700 italic text-base leading-relaxed">
    {$shortDesc}
</div>
HTML;
    }

    // 6. Build Article HTML
    $articleContent = <<<HTML
<article class="bg-white text-[#1e2422] font-figtree antialiased leading-relaxed min-h-screen">
  <div class="progress" id="progress" aria-hidden="true" style="position:fixed;top:0;left:0;height:3px;width:0%;background-color:#1c3b2b;z-index:40;transition:width 0.1s ease"></div>
  <script type="application/ld+json">{$schemaJson}</script>

  <!-- Breadcrumbs & Meta Top -->
  <div class="bg-[#fdfbf7] border-b border-[#e3dac9]/60 py-4">
    <div class="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 text-xs text-stone-600 flex items-center gap-2 flex-wrap">
      <a href="/" class="hover:text-[#1c3b2b]">Home</a>
      <span>/</span>
      <a href="/blogs/" class="hover:text-[#1c3b2b]">Blogs</a>
      <span>/</span>
      <span class="text-[#1c3b2b] font-medium truncate max-w-[280px]">{$title}</span>
    </div>
  </div>

  <div class="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
    <!-- Category & Details -->
    <div class="flex items-center gap-3 text-xs sm:text-sm font-medium mb-3 flex-wrap">
      <span class="px-3 py-1 bg-[#1c3b2b] text-white rounded-full font-semibold">{$categoryName}</span>
      <span class="text-stone-500">•</span>
      <span class="text-stone-500">{$formattedDate}</span>
      <span class="text-stone-500">•</span>
      <span class="text-stone-500">{$readMinutes} min read</span>
    </div>

    <!-- H1 Title -->
    <h1 class="font-belleza text-3xl sm:text-4xl lg:text-[44px] font-normal tracking-wide text-[#1e2422] leading-[1.2] mb-6 drop-shadow-2xs">
      {$title}
    </h1>

    <!-- Author Bar -->
    <div class="flex items-center gap-3 py-3 border-y border-[#e3dac9]/60 mb-8">
      <div class="w-10 h-10 rounded-full bg-[#1c3b2b] text-white flex items-center justify-center font-bold text-sm">
        S
      </div>
      <div>
        <div class="text-sm font-semibold text-[#1e2422]">Written by {$author}</div>
        <div class="text-xs text-stone-500">Siddhant School of Yoga Rishikesh</div>
      </div>
    </div>

    <!-- Featured Image -->
    <div class="relative w-full aspect-[16/9] max-h-[580px] rounded-2xl overflow-hidden mb-8 shadow-sm border border-[#e3dac9]">
      <img src="{$featuredImg}" alt="{$title}" class="w-full h-full object-cover" loading="eager"/>
    </div>

    <!-- Two-column Grid: Content & Sidebar -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
      <div class="lg:col-span-8 blog-content-body text-[#202019] text-base leading-relaxed">
        {$shortDescBox}
        {$tocHtml}
        {$content}
        {$faqHtml}

        <!-- Author Bio Box -->
        <div class="mt-12 p-6 bg-[#fdfbf7] rounded-2xl border border-[#e3dac9] flex items-center gap-5">
          <div class="w-16 h-16 rounded-full bg-[#1c3b2b] text-white flex items-center justify-center font-bold text-xl shrink-0">
            S
          </div>
          <div>
            <h4 class="font-belleza text-lg text-[#1c3b2b] font-semibold">{$author}</h4>
            <p class="text-xs sm:text-sm text-stone-600 mt-1">Dedicated teacher and practitioner sharing authentic Yogic wisdom from Rishikesh, Uttarakhand.</p>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <aside class="lg:col-span-4 space-y-6 sticky top-20">
        <!-- Join TTC Course Banner -->
        <div class="p-6 bg-gradient-to-br from-[#1c3b2b] to-[#142b1e] rounded-2xl text-white shadow-md">
          <span class="text-[10px] uppercase font-bold tracking-widest text-[#e3dac9]">Yoga Alliance Certified</span>
          <h3 class="font-belleza text-xl font-normal mt-1 mb-3">Yoga Teacher Training in Rishikesh</h3>
          <p class="text-xs text-white/80 leading-relaxed mb-4">Transform your life with our authentic 100, 200, 300, and 500-hour residential courses by the sacred Ganga river.</p>
          <a href="/book-my-yoga-in-rishikesh-india" class="inline-block w-full py-2.5 px-4 bg-[#b85c00] hover:bg-[#96490a] text-center font-semibold text-xs rounded-full transition-colors">
            Enroll Now →
          </a>
        </div>

        <!-- Contact Asharm -->
        <div class="p-6 bg-[#fdfbf7] rounded-2xl border border-[#e3dac9]">
          <h4 class="font-belleza text-lg text-[#1c3b2b] font-semibold mb-2">Connect with Us</h4>
          <p class="text-xs text-stone-600 mb-4">Have questions about courses or retreats? Reach out to our admissions team directly.</p>
          <a href="https://wa.me/918449785755?text=Namaste!%20I%20have%20an%20inquiry%20regarding%20Siddhant%20School%20of%20Yoga." target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center gap-2 w-full py-2 px-4 bg-[#25D366] text-white rounded-full text-xs font-semibold hover:bg-[#1fb855] transition-colors">
            Chat on WhatsApp
          </a>
        </div>
      </aside>
    </div>
  </div>
</article>
HTML;

    // Replace in template
    $fullHtml = str_replace('{{META_TAGS}}', $metaTags, $template);
    $fullHtml = str_replace('{{ARTICLE_CONTENT}}', $articleContent, $fullHtml);

    // Save to blogs/{slug}/index.html and blog/{slug}/index.html
    $root = dirname(__DIR__, 2); // /Users/ankit/Desktop/All Websites/Siddhant-School-of-Yoga/public/ or out/
    if (basename($root) === 'public') {
        $rootDir = dirname($root);
    } else {
        $rootDir = $root;
    }

    // Target paths:
    // 1. in public/blogs/{slug}/ and public/blog/{slug}/
    // 2. in out/blogs/{slug}/ and out/blog/{slug}/
    // 3. in root blogs/{slug}/ and blog/{slug}/
    $targets = [
        $rootDir . '/out/blogs/' . $slug,
        $rootDir . '/out/blog/' . $slug,
        $rootDir . '/public_html/blogs/' . $slug,
        $rootDir . '/public_html/blog/' . $slug,
        dirname(__DIR__) . '/blogs/' . $slug,
        dirname(__DIR__) . '/blog/' . $slug
    ];

    foreach ($targets as $dir) {
        if (!is_dir(dirname($dir))) continue;
        if (!is_dir($dir)) {
            @mkdir($dir, 0755, true);
        }
        @file_put_contents($dir . '/index.html', $fullHtml);
    }

    return true;
}
