<?php
// ==============================================================================
// Siddhant School of Yoga - Regenerate All Static Blog Pages
// Re-creates all blog HTML pages using the clean, zero-redirect template
// ==============================================================================

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../blog_generator.php';

$db = getDb();
try {
    $stmt = $db->query("SELECT * FROM `blog` WHERE `status` = 'published' ORDER BY `id` DESC");
    $postList = $stmt->fetchAll();

    $regenerated = [];

    foreach ($postList as $b) {
        $ok = generateStaticBlogPost($b);
        if ($ok) {
            $regenerated[] = [
                'id'    => $b['id'],
                'slug'  => $b['slug'],
                'title' => $b['title']
            ];
        }
    }

    sendJson([
        'success'     => true,
        'message'     => 'Successfully regenerated ' . count($regenerated) . ' blog posts.',
        'regenerated' => $regenerated
    ]);
} catch (Exception $e) {
    sendJson(['success' => false, 'message' => 'Regeneration failed: ' . $e->getMessage()], 500);
}
