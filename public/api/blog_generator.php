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
    $shortDesc = !empty($post['short_description']) ? trim($post['short_description']) : '';
    $metaDesc = htmlspecialchars(!empty($post['meta_description']) ? $post['meta_description'] : mb_substr(strip_tags($shortDesc), 0, 160), ENT_QUOTES, 'UTF-8');
    $author = htmlspecialchars(!empty($post['author']) ? $post['author'] : 'Siddhant School of Yoga', ENT_QUOTES, 'UTF-8');
    $authorTitle = htmlspecialchars(!empty($post['author_title']) ? $post['author_title'] : 'Yoga Master & Ashram Guide', ENT_QUOTES, 'UTF-8');
    if (!empty($post['author_credentials'])) {
        $authorTitle .= ' • ' . htmlspecialchars($post['author_credentials'], ENT_QUOTES, 'UTF-8');
    }
    $authorBio = htmlspecialchars(!empty($post['author_bio']) ? $post['author_bio'] : 'Dedicated to sharing traditional yogic sadhana, Vedic philosophy, and authentic Himalayan spiritual practices at Siddhant School of Yoga in Rishikesh, India.', ENT_QUOTES, 'UTF-8');
    $authorPhoto = !empty($post['author_photo']) ? $post['author_photo'] : '/images/acharya-siddhant.jpg';
    $categoryName = htmlspecialchars(!empty($post['category_name']) ? $post['category_name'] : 'General', ENT_QUOTES, 'UTF-8');

    // Clean image URL
    $featuredImg = !empty($post['featured_image']) ? $post['featured_image'] : '/blog/images/warrior-1-pose-ganga-riverside-rishikesh.jpg';
    if (!preg_match('/^https?:\/\//i', $featuredImg) && !str_starts_with($featuredImg, '/')) {
        $featuredImg = '/' . $featuredImg;
    }
    $ogImg = preg_match('/^https?:\/\//i', $featuredImg) ? $featuredImg : 'https://www.siddhantschoolofyoga.com' . $featuredImg;
    $canonicalUrl = 'https://www.siddhantschoolofyoga.com/blog/' . $slug;

    // Format publish date
    $pubDate = !empty($post['published_at']) ? strtotime($post['published_at']) : (!empty($post['created_at']) ? strtotime($post['created_at']) : time());
    $formattedDate = date('F j, Y', $pubDate);
    $isoDate = date('c', $pubDate);

    // Calculate reading time & views
    $content = !empty($post['content']) ? $post['content'] : '';
    $wordCount = str_word_count(strip_tags($content));
    $readMinutes = max(1, ceil($wordCount / 200));
    $views = isset($post['views']) && (int)$post['views'] > 0 ? (int)$post['views'] : 1;

    // Featured image alt & caption
    $featuredImgAlt = htmlspecialchars(!empty($post['featured_image_alt']) ? $post['featured_image_alt'] : (!empty($post['title']) ? $post['title'] : ''), ENT_QUOTES, 'UTF-8');
    $featuredImgCaption = '';
    if (!empty($post['featured_image_title'])) {
        $featuredImgCaption = '<figcaption class="text-xs font-figtree text-stone-500 text-center mt-2.5 italic">' . htmlspecialchars($post['featured_image_title'], ENT_QUOTES, 'UTF-8') . '</figcaption>';
    }

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
            'jobTitle' => $authorTitle
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

    // 3. Quick Overview (TL;DR) Card
    $quickOverview = '';
    if (!empty($shortDesc)) {
        $quickOverview = <<<HTML
<aside class="bg-[#f4efe6] border-l-4 border-[#1c3b2b] rounded-r-2xl p-5 sm:p-6 mb-8 shadow-xs">
  <span class="block text-sm font-figtree font-semibold tracking-[0.08em] uppercase text-[#b85c00] mb-1.5">
    Quick Overview
  </span>
  <p class="font-figtree text-sm sm:text-base text-stone-700 leading-relaxed text-justify font-medium">
    {$shortDesc}
  </p>
</aside>
HTML;
    }

    // 4. Extract H2 headings and inject IDs for Table of Contents
    $headings = [];
    $proseContent = preg_replace_callback('/<h2([^>]*)>(.*?)<\/h2>/is', function($matches) use (&$headings) {
        $attrs = $matches[1];
        $innerHtml = $matches[2];
        $cleanText = trim(strip_tags($innerHtml));
        if (empty($cleanText)) return $matches[0];

        if (preg_match('/id=["\']([^"\']+)["\']/i', $attrs, $idMatch)) {
            $id = $idMatch[1];
        } else {
            $slugId = preg_replace('/[^a-z0-9]+/i', '-', strtolower($cleanText));
            $slugId = trim($slugId, '-');
            if (empty($slugId)) $slugId = 'section-' . (count($headings) + 1);
            $id = $slugId;
            $attrs = ' id="' . $id . '" style="scroll-margin-top:96px;"' . $attrs;
        }

        $headings[] = [
            'id' => $id,
            'title' => htmlspecialchars($cleanText, ENT_QUOTES, 'UTF-8')
        ];

        return '<h2' . $attrs . '>' . $innerHtml . '</h2>';
    }, $content);

    // Clean image paths in prose
    $proseContent = preg_replace('/https?:\/\/[a-z0-9.-]+\/storage\/v1\/object\/public\/blog-images\/([^"\'\s>?#]+)/i', '/blog/images/$1', $proseContent);

    // If FAQs exist, add to TOC
    if (!empty($faqs)) {
        $headings[] = [
            'id' => 'faqs',
            'title' => 'Frequently Asked Questions'
        ];
    }

    // If Conclusion exists, add to TOC
    if (!empty($post['conclusion'])) {
        $headings[] = [
            'id' => 'conclusion',
            'title' => 'Final Thoughts'
        ];
    }

    // Build Table of Contents HTML (100% Original UI)
    $tocHtml = '';
    if (!empty($headings)) {
        $itemsHtml = '';
        $totalHeadings = count($headings);
        foreach ($headings as $index => $h) {
            $isActive = ($index === 0);
            $tone = $isActive ? "font-semibold text-[#1c3b2b]" : "font-medium text-[#1e2422] hover:text-[#1c3b2b]";
            $dotClass = $isActive ? "bg-[#b85c00] ring-[4px] ring-[#b85c00]/25 scale-110 shadow-xs" : "bg-[#e3dac9] group-hover:bg-[#1c3b2b]/50";
            $connectingLine = ($index !== $totalHeadings - 1)
                ? '<div class="absolute left-[5px] top-[11px] w-[2px] h-full transition-colors duration-300 bg-[#e3dac9]/60"></div>'
                : '';
            $itemsHtml .= <<<HTML
<li class="relative flex items-start pb-4 last:pb-0 group">
  {$connectingLine}
  <a href="#{$h['id']}" class="flex items-start text-left w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1c3b2b]/40 rounded-lg cursor-pointer transition-colors">
    <span aria-hidden="true" class="relative z-10 flex items-center justify-center w-3 h-3 mt-[4.5px] shrink-0">
      <span class="block rounded-full transition-all duration-300 w-2.5 h-2.5 {$dotClass}"></span>
    </span>
    <span class="leading-[22px] ml-4 transition-colors duration-200 text-sm {$tone}">
      {$h['title']}
    </span>
  </a>
</li>
HTML;
        }
        $tocHtml = <<<HTML
<section id="toc-section" class="px-5 py-6 bg-[#fdfbf7] rounded-3xl border border-[#e3dac9] transition-all">
  <h2 class="font-belleza text-xl font-normal text-[#1e2422] mb-5 tracking-wide">
    In this article
  </h2>
  <div class="relative ml-1 font-figtree">
    <ul class="flex flex-col">
      {$itemsHtml}
    </ul>
  </div>
</section>
HTML;
    }

    // 5. Conclusion Section (Original UI)
    $conclusionHtml = '';
    if (!empty($post['conclusion'])) {
        $paras = preg_split('/\n\s*\n/', trim($post['conclusion']));
        $paraHtml = '';
        foreach ($paras as $p) {
            $p = trim($p);
            if ($p) {
                $paraHtml .= '<p class="font-figtree text-base sm:text-[17px] font-medium text-justify text-stone-700 leading-[1.8] mb-6 last:mb-0 whitespace-pre-line">' . htmlspecialchars($p, ENT_QUOTES, 'UTF-8') . '</p>';
            }
        }
        if ($paraHtml) {
            $conclusionHtml = <<<HTML
<section id="conclusion" class="mt-12 pt-8 border-t border-[#e3dac9]/60">
  <h2 class="font-belleza font-normal tracking-wide text-2xl sm:text-3xl text-[#1e2422] leading-[1.2] mb-4">
    Conclusion
  </h2>
  {$paraHtml}
</section>
HTML;
        }
    }

    // 6. FAQs Section (Accordion)
    $faqsHtml = '';
    if (!empty($faqs)) {
        $faqItems = '';
        foreach ($faqs as $i => $f) {
            $q = htmlspecialchars(isset($f['question']) ? $f['question'] : (isset($f['q']) ? $f['q'] : ''), ENT_QUOTES, 'UTF-8');
            $a = isset($f['answer']) ? $f['answer'] : (isset($f['a']) ? $f['a'] : '');
            if ($q) {
                $qNum = $i + 1;
                $faqItems .= <<<HTML
<details class="group bg-[#fdfbf7] rounded-2xl border border-[#e3dac9] transition-colors duration-300">
  <summary class="w-full flex items-start gap-3 text-left cursor-pointer px-5 sm:px-6 py-4 sm:py-5 list-none select-none">
    <span class="font-figtree font-bold text-[#1c3b2b] text-base leading-[1.35] shrink-0 mt-[1px]">Q{$qNum}.</span>
    <span class="flex-1 font-figtree font-semibold text-base sm:text-[17px] leading-[1.35] text-[#1e2422]">{$q}</span>
    <span class="shrink-0 mt-[3px] text-[#1c3b2b] transition-transform duration-300 group-open:rotate-180">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
    </span>
  </summary>
  <div class="px-5 sm:px-6 pb-5 sm:pb-6 text-stone-700 font-figtree text-sm sm:text-base leading-relaxed border-t border-[#e3dac9]/40 pt-3">
    {$a}
  </div>
</details>
HTML;
            }
        }
        if ($faqItems) {
            $faqsHtml = <<<HTML
<div id="faqs" class="mt-12 pt-8 border-t border-[#e3dac9]/60" style="scroll-margin-top:96px;">
  <h2 class="font-belleza font-normal tracking-wide text-2xl sm:text-3xl text-[#1e2422] mb-6">
    Frequently Asked Questions
  </h2>
  <div class="space-y-3 font-figtree">
    {$faqItems}
  </div>
</div>
HTML;
        }
    }

    // 7. Tags Section
    $tagsHtml = '';
    $rawTags = !empty($post['tags']) ? $post['tags'] : '';
    $tagsList = [];
    if (is_array($rawTags)) {
        $tagsList = $rawTags;
    } elseif (is_string($rawTags)) {
        $decoded = json_decode($rawTags, true);
        if (is_array($decoded)) {
            $tagsList = $decoded;
        } else {
            $tagsList = explode(',', $rawTags);
        }
    }
    if (!empty($tagsList)) {
        $tagBadges = '';
        foreach ($tagsList as $t) {
            $cleanTag = htmlspecialchars(trim($t), ENT_QUOTES, 'UTF-8');
            if ($cleanTag) {
                $tagBadges .= '<a href="/blog/" class="text-xs font-figtree font-semibold px-3 py-1 rounded-full bg-[#f4efe6] text-[#1c3b2b] hover:bg-[#1c3b2b] hover:text-white border border-[#1c3b2b]/30 transition-colors">#' . $cleanTag . '</a>';
            }
        }
        if ($tagBadges) {
            $tagsHtml = <<<HTML
<div class="mt-10 pt-6 border-t border-[#e3dac9]/60 flex flex-wrap items-center gap-2">
  <b class="font-figtree text-xs font-semibold uppercase tracking-wider text-stone-500 mr-2">Related Topics:</b>
  <div class="flex flex-wrap gap-2">
    {$tagBadges}
  </div>
</div>
HTML;
        }
    }

    // 8. Social Share URLs
    $shareWhatsapp = 'https://api.whatsapp.com/send?text=' . urlencode($title . ' ' . $canonicalUrl);
    $shareFacebook = 'https://www.facebook.com/sharer/sharer.php?u=' . urlencode($canonicalUrl);
    $shareTwitter = 'https://twitter.com/intent/tweet?text=' . urlencode($title) . '&url=' . urlencode($canonicalUrl);
    $shareLinkedin = 'https://www.linkedin.com/sharing/share-offsite/?url=' . urlencode($canonicalUrl);

    // 9. Perform all replacements into the exact original template
    $replacements = [
        '{{META_TAGS}}'              => $metaTags,
        '{{SCHEMA_JSON}}'            => $schemaJson,
        '{{CATEGORY_NAME}}'          => $categoryName,
        '{{TITLE}}'                  => $title,
        '{{AUTHOR_PHOTO}}'           => $authorPhoto,
        '{{AUTHOR_NAME}}'            => $author,
        '{{AUTHOR_TITLE}}'           => $authorTitle,
        '{{AUTHOR_BIO}}'             => $authorBio,
        '{{ISO_DATE}}'               => $isoDate,
        '{{FORMATTED_DATE}}'         => $formattedDate,
        '{{VIEWS}}'                  => $views,
        '{{READ_TIME}}'              => $readMinutes,
        '{{FEATURED_IMAGE}}'         => $featuredImg,
        '{{FEATURED_IMAGE_ALT}}'     => $featuredImgAlt,
        '{{FEATURED_IMAGE_CAPTION}}' => $featuredImgCaption,
        '{{QUICK_OVERVIEW}}'         => $quickOverview,
        '{{PROSE_CONTENT}}'          => $proseContent,
        '{{CONCLUSION_SECTION}}'     => $conclusionHtml,
        '{{FAQS_SECTION}}'           => $faqsHtml,
        '{{TAGS_SECTION}}'           => $tagsHtml,
        '{{TOC_SECTION}}'            => $tocHtml,
        '{{SHARE_WHATSAPP}}'         => $shareWhatsapp,
        '{{SHARE_FACEBOOK}}'         => $shareFacebook,
        '{{SHARE_TWITTER}}'          => $shareTwitter,
        '{{SHARE_LINKEDIN}}'         => $shareLinkedin,
    ];

    $fullHtml = str_replace(array_keys($replacements), array_values($replacements), $template);

    // Auto-detect and link live _next CSS and JS assets so static files never have broken styles
    fixNextAssetsInHtml($fullHtml);

    // 10. Save to /blog/{slug}/index.html
    $root = dirname(__DIR__, 2);
    if (basename($root) === 'public') {
        $rootDir = dirname($root);
    } else {
        $rootDir = $root;
    }

    $baseDirs = array_unique([
        dirname(__DIR__) . '/blog',
        $rootDir . '/blog',
        $rootDir . '/out/blog',
        $rootDir . '/public_html/blog',
        isset($_SERVER['DOCUMENT_ROOT']) ? $_SERVER['DOCUMENT_ROOT'] . '/blog' : '',
    ]);

    $savedCount = 0;
    foreach ($baseDirs as $base) {
        if (empty($base)) continue;
        if (is_dir(dirname($base)) && !is_dir($base)) {
            @mkdir($base, 0755, true);
        }
        if (is_dir($base)) {
            $slugDir = $base . '/' . $slug;
            if (!is_dir($slugDir)) {
                @mkdir($slugDir, 0755, true);
            }
            if (is_dir($slugDir)) {
                @file_put_contents($slugDir . '/index.html', $fullHtml);
                $savedCount++;
            }
        }
    }

    return $savedCount > 0;
}

function fixNextAssetsInHtml(&$html) {
    // 1. Locate real _next/static/css directory on disk
    $candidates = [
        dirname(__DIR__, 2) . '/_next/static/css',
        dirname(__DIR__) . '/_next/static/css',
        (isset($_SERVER['DOCUMENT_ROOT']) && !empty($_SERVER['DOCUMENT_ROOT'])) ? rtrim($_SERVER['DOCUMENT_ROOT'], '/') . '/_next/static/css' : '',
        dirname(__DIR__, 2) . '/out/_next/static/css',
        dirname(__DIR__) . '/out/_next/static/css',
    ];
    foreach ($candidates as $dir) {
        if (!empty($dir) && is_dir($dir)) {
            $cssFiles = glob($dir . '/*.css');
            if (!empty($cssFiles)) {
                // Remove existing _next/static/css link tags
                $html = preg_replace('/<link[^>]*href="\/_next\/static\/css\/[^"]*"[^>]*>\s*/i', '', $html);
                // Sort by filesize ascending so font styles come before heavy Tailwind styles
                usort($cssFiles, function($a, $b) {
                    return filesize($a) <=> filesize($b);
                });
                $newLinks = [];
                foreach ($cssFiles as $f) {
                    $newLinks[] = '<link rel="stylesheet" href="/_next/static/css/' . basename($f) . '" data-precedence="next"/>';
                }
                $inject = implode("\n", $newLinks) . "\n";
                if (stripos($html, '</head>') !== false) {
                    $html = preg_replace('/<\/head>/i', $inject . '</head>', $html, 1);
                }
                break;
            }
        }
    }

    // 2. Locate dynamic slug page chunk if changed
    $slugChunkCandidates = [
        dirname(__DIR__, 2) . '/_next/static/chunks/app/blog/[slug]',
        dirname(__DIR__) . '/_next/static/chunks/app/blog/[slug]',
        (isset($_SERVER['DOCUMENT_ROOT']) && !empty($_SERVER['DOCUMENT_ROOT'])) ? rtrim($_SERVER['DOCUMENT_ROOT'], '/') . '/_next/static/chunks/app/blog/[slug]' : '',
        dirname(__DIR__, 2) . '/out/_next/static/chunks/app/blog/[slug]',
    ];
    foreach ($slugChunkCandidates as $dir) {
        if (!empty($dir) && is_dir($dir)) {
            $pageChunks = glob($dir . '/page-*.js');
            if (!empty($pageChunks)) {
                $actualChunk = basename($pageChunks[0]);
                $html = preg_replace(
                    '/<script[^>]*src="\/_next\/static\/chunks\/app\/blog\/(?:%5Bslug%5D|\[slug\])\/page-[^"]+\.js"[^>]*><\/script>/i',
                    '<script src="/_next/static/chunks/app/blog/%5Bslug%5D/' . $actualChunk . '" async=""></script>',
                    $html
                );
                break;
            }
        }
    }

    // 3. Locate 2273-*.js chunk if changed
    $chunkDirs = [
        dirname(__DIR__, 2) . '/_next/static/chunks',
        dirname(__DIR__) . '/_next/static/chunks',
        (isset($_SERVER['DOCUMENT_ROOT']) && !empty($_SERVER['DOCUMENT_ROOT'])) ? rtrim($_SERVER['DOCUMENT_ROOT'], '/') . '/_next/static/chunks' : '',
        dirname(__DIR__, 2) . '/out/_next/static/chunks',
    ];
    foreach ($chunkDirs as $dir) {
        if (!empty($dir) && is_dir($dir)) {
            $c2273 = glob($dir . '/2273-*.js');
            if (!empty($c2273)) {
                $actual2273 = basename($c2273[0]);
                $html = preg_replace(
                    '/<script[^>]*src="\/_next\/static\/chunks\/2273-[^"]+\.js"[^>]*><\/script>/i',
                    '<script src="/_next/static/chunks/' . $actual2273 . '" async=""></script>',
                    $html
                );
                break;
            }
        }
    }
}

