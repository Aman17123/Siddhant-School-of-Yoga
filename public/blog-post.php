<?php
// ==============================================================================
// Siddhant School of Yoga - Dynamic Blog Post Handler / Fallback
// If a static blog HTML file is not found, this script serves and caches it
// ==============================================================================

require_once __DIR__ . '/api/config.php';
require_once __DIR__ . '/api/blog_generator.php';

$slug = isset($_GET['slug']) ? trim($_GET['slug']) : '';
if (empty($slug)) {
    http_response_code(404);
    include __DIR__ . '/404.html';
    exit;
}

$db = getDb();
try {
    $stmt = $db->prepare("SELECT * FROM `blog` WHERE `slug` = :s AND `status` = 'published' LIMIT 1");
    $stmt->execute([':s' => $slug]);
    $blog = $stmt->fetch();

    if (!$blog) {
        http_response_code(404);
        include __DIR__ . '/404.html';
        exit;
    }

    // Increment view counter
    try {
        $upStmt = $db->prepare("UPDATE `blog` SET `views` = `views` + 1 WHERE `id` = :id");
        $upStmt->execute([':id' => $blog['id']]);
    } catch (Exception $e) {}

    // Generate static file on disk so future visits are 100% static!
    generateStaticBlogPost($blog);

    // Read and output the generated HTML
    $candidates = [
        __DIR__ . '/blog/' . $slug . '/index.html'
    ];
    foreach ($candidates as $cand) {
        if (file_exists($cand)) {
            header('Content-Type: text/html; charset=utf-8');
            readfile($cand);
            exit;
        }
    }

    http_response_code(404);
    include __DIR__ . '/404.html';
    exit;

} catch (Exception $e) {
    http_response_code(500);
    echo "<h1>Error loading article</h1><p>" . htmlspecialchars($e->getMessage()) . "</p>";
    exit;
}
