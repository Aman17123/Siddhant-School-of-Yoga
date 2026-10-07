<?php
require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../blog_generator.php';

$method = $_SERVER['REQUEST_METHOD'];
$db = getDb();

if ($method === 'GET') {
    $search = isset($_GET['search']) ? trim($_GET['search']) : '';
    $category = isset($_GET['category']) ? trim($_GET['category']) : '';
    $status = isset($_GET['status']) ? trim($_GET['status']) : '';

    $sql = "SELECT * FROM `blogs` WHERE 1=1";
    $params = [];

    if (!empty($status)) {
        $sql .= " AND `status` = :status";
        $params[':status'] = $status;
    }

    if (!empty($category) && $category !== 'all') {
        $sql .= " AND (`category_name` = :cat OR `category_id` = :cat_id)";
        $params[':cat'] = $category;
        $params[':cat_id'] = is_numeric($category) ? (int)$category : 0;
    }

    if (!empty($search)) {
        $sql .= " AND (`title` LIKE :s1 OR `short_description` LIKE :s2 OR `content` LIKE :s3)";
        $params[':s1'] = '%' . $search . '%';
        $params[':s2'] = '%' . $search . '%';
        $params[':s3'] = '%' . $search . '%';
    }

    $sql .= " ORDER BY `published_at` DESC, `id` DESC";

    try {
        $stmt = $db->prepare($sql);
        $stmt->execute($params);
        $rows = $stmt->fetchAll();

        // Format rows
        foreach ($rows as &$r) {
            if (!empty($r['tags'])) {
                $decoded = json_decode($r['tags'], true);
                $r['tags'] = is_array($decoded) ? $decoded : explode(',', $r['tags']);
            } else {
                $r['tags'] = [];
            }

            if (!empty($r['faqs'])) {
                $decoded = json_decode($r['faqs'], true);
                $r['faqs'] = is_array($decoded) ? $decoded : [];
            } else {
                $r['faqs'] = [];
            }
        }

        sendJson(['success' => true, 'blogs' => $rows]);
    } catch (Exception $e) {
        sendJson(['success' => false, 'message' => 'Failed to fetch blogs', 'error' => $e->getMessage()], 500);
    }
}

if ($method === 'POST') {
    $session = requireAdmin();
    $body = getJsonBody();

    $title = isset($body['title']) ? trim($body['title']) : '';
    if (empty($title)) {
        sendJson(['success' => false, 'message' => 'Blog title is required.'], 400);
    }

    $slug = !empty($body['slug']) ? trim($body['slug']) : $title;
    $slug = strtolower(trim(preg_replace('/[^a-zA-Z0-9]+/', '-', $slug), '-'));

    $categoryId = !empty($body['category_id']) ? (int)$body['category_id'] : null;
    $categoryName = !empty($body['category_name']) ? trim($body['category_name']) : 'General';
    $featuredImg = !empty($body['featured_image']) ? trim($body['featured_image']) : null;
    $featuredAlt = !empty($body['featured_image_alt']) ? trim($body['featured_image_alt']) : $title;
    $shortDesc = !empty($body['short_description']) ? trim($body['short_description']) : null;
    $content = isset($body['content']) ? $body['content'] : '';
    $author = !empty($body['author']) ? trim($body['author']) : (!empty($session['name']) ? $session['name'] : 'Siddhant School of Yoga');
    $status = !empty($body['status']) ? trim($body['status']) : 'published';
    $publishedAt = !empty($body['published_at']) ? date('Y-m-d H:i:s', strtotime($body['published_at'])) : date('Y-m-d H:i:s');
    $metaTitle = !empty($body['meta_title']) ? trim($body['meta_title']) : null;
    $metaDesc = !empty($body['meta_description']) ? trim($body['meta_description']) : null;
    $metaKeywords = !empty($body['meta_keywords']) ? trim($body['meta_keywords']) : null;
    $popular = !empty($body['popular']) ? 1 : 0;
    $seoScore = !empty($body['seo_score']) ? (int)$body['seo_score'] : 75;

    $faqs = isset($body['faqs']) ? (is_string($body['faqs']) ? $body['faqs'] : json_encode($body['faqs'])) : '[]';
    $tags = isset($body['tags']) ? (is_string($body['tags']) ? $body['tags'] : json_encode($body['tags'])) : '[]';

    $sql = "INSERT INTO `blogs` (
        `title`, `slug`, `category_id`, `category_name`, `featured_image`, `featured_image_alt`,
        `short_description`, `content`, `faqs`, `meta_title`, `meta_description`, `meta_keywords`,
        `popular`, `author`, `published_at`, `status`, `views`, `seo_score`, `tags`
    ) VALUES (
        :title, :slug, :cat_id, :cat_name, :img, :img_alt,
        :short_desc, :content, :faqs, :meta_t, :meta_d, :meta_k,
        :pop, :author, :pub_at, :status, 0, :seo, :tags
    )";

    try {
        $stmt = $db->prepare($sql);
        $stmt->execute([
            ':title'      => $title,
            ':slug'       => $slug,
            ':cat_id'     => $categoryId,
            ':cat_name'   => $categoryName,
            ':img'        => $featuredImg,
            ':img_alt'    => $featuredAlt,
            ':short_desc' => $shortDesc,
            ':content'    => $content,
            ':faqs'       => $faqs,
            ':meta_t'     => $metaTitle,
            ':meta_d'     => $metaDesc,
            ':meta_k'     => $metaKeywords,
            ':pop'        => $popular,
            ':author'     => $author,
            ':pub_at'     => $publishedAt,
            ':status'     => $status,
            ':seo'        => $seoScore,
            ':tags'       => $tags,
        ]);

        $newId = (int)$db->lastInsertId();

        // Fetch inserted blog
        $fetchStmt = $db->prepare("SELECT * FROM `blogs` WHERE `id` = :id LIMIT 1");
        $fetchStmt->execute([':id' => $newId]);
        $newBlog = $fetchStmt->fetch();

        // Generate static HTML files immediately!
        generateStaticBlogPost($newBlog);

        sendJson([
            'success' => true,
            'message' => 'Blog published successfully!',
            'blog'    => $newBlog
        ]);
    } catch (Exception $e) {
        sendJson(['success' => false, 'message' => 'Failed to create blog: ' . $e->getMessage()], 500);
    }
}

sendJson(['success' => false, 'message' => 'Method not allowed'], 405);
