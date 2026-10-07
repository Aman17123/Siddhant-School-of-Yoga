<?php
require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../blog_generator.php';

$method = $_SERVER['REQUEST_METHOD'];
$db = getDb();

$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
if (!$id) {
    sendJson(['success' => false, 'message' => 'Post ID is required.'], 400);
}

if ($method === 'GET') {
    try {
        $stmt = $db->prepare("SELECT * FROM `blog` WHERE `id` = :id LIMIT 1");
        $stmt->execute([':id' => $id]);
        $blog = $stmt->fetch();

        if (!$blog) {
            sendJson(['success' => false, 'message' => 'Post not found.'], 404);
        }

        if (!empty($blog['tags'])) {
            $decoded = json_decode($blog['tags'], true);
            $blog['tags'] = is_array($decoded) ? $decoded : explode(',', $blog['tags']);
        }
        if (!empty($blog['faqs'])) {
            $decoded = json_decode($blog['faqs'], true);
            $blog['faqs'] = is_array($decoded) ? $decoded : [];
        }

        sendJson(['success' => true, 'blog' => $blog]);
    } catch (Exception $e) {
        sendJson(['success' => false, 'message' => 'Database error: ' . $e->getMessage()], 500);
    }
}

if ($method === 'PUT') {
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
    $featuredImgTitle = !empty($body['featured_image_title']) ? trim($body['featured_image_title']) : null;
    $shortDesc = !empty($body['short_description']) ? trim($body['short_description']) : null;
    $content = isset($body['content']) ? $body['content'] : '';
    $author = !empty($body['author']) ? trim($body['author']) : (!empty($session['name']) ? $session['name'] : 'Siddhant School of Yoga');
    $status = !empty($body['status']) ? trim($body['status']) : 'published';
    $publishedAt = !empty($body['published_at']) ? date('Y-m-d H:i:s', strtotime($body['published_at'])) : date('Y-m-d H:i:s');
    $metaTitle = !empty($body['meta_title']) ? trim($body['meta_title']) : null;
    $metaDesc = !empty($body['meta_description']) ? trim($body['meta_description']) : null;
    $metaKeywords = !empty($body['meta_keywords']) ? trim($body['meta_keywords']) : null;
    $popular = !empty($body['popular']) ? 1 : 0;
    $focusKeyword = !empty($body['focus_keyword']) ? trim($body['focus_keyword']) : null;
    $tldr = !empty($body['tldr']) ? trim($body['tldr']) : null;
    $keyTakeaways = !empty($body['key_takeaways']) ? trim($body['key_takeaways']) : null;
    $canonicalUrl = !empty($body['canonical_url']) ? trim($body['canonical_url']) : null;
    $conclusion = !empty($body['conclusion']) ? trim($body['conclusion']) : null;
    $schemaType = !empty($body['schema_type']) ? trim($body['schema_type']) : 'post';

    $faqs = isset($body['faqs']) ? (is_string($body['faqs']) ? $body['faqs'] : json_encode($body['faqs'])) : '[]';
    $tags = isset($body['tags']) ? (is_string($body['tags']) ? $body['tags'] : json_encode($body['tags'])) : '[]';

    $sql = "UPDATE `blog` SET
        `title` = :title,
        `slug` = :slug,
        `category_id` = :cat_id,
        `category_name` = :cat_name,
        `featured_image` = :img,
        `featured_image_alt` = :img_alt,
        `featured_image_title` = :img_title,
        `short_description` = :short_desc,
        `content` = :content,
        `faqs` = :faqs,
        `meta_title` = :meta_t,
        `meta_description` = :meta_d,
        `meta_keywords` = :meta_k,
        `popular` = :pop,
        `author` = :author,
        `published_at` = :pub_at,
        `status` = :status,
        `tags` = :tags,
        `focus_keyword` = :focus_kw,
        `tldr` = :tldr,
        `key_takeaways` = :takeaways,
        `canonical_url` = :canon,
        `conclusion` = :concl,
        `schema_type` = :schema_t
        WHERE `id` = :id";

    try {
        $stmt = $db->prepare($sql);
        $stmt->execute([
            ':id'         => $id,
            ':title'      => $title,
            ':slug'       => $slug,
            ':cat_id'     => $categoryId,
            ':cat_name'   => $categoryName,
            ':img'        => $featuredImg,
            ':img_alt'    => $featuredAlt,
            ':img_title'  => $featuredImgTitle,
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
            ':tags'       => $tags,
            ':focus_kw'   => $focusKeyword,
            ':tldr'       => $tldr,
            ':takeaways'  => $keyTakeaways,
            ':canon'      => $canonicalUrl,
            ':concl'      => $conclusion,
            ':schema_t'   => $schemaType,
        ]);

        $fetchStmt = $db->prepare("SELECT * FROM `blog` WHERE `id` = :id LIMIT 1");
        $fetchStmt->execute([':id' => $id]);
        $updatedBlog = $fetchStmt->fetch();

        // Regenerate static HTML files if published, or clean up if draft
        if ($updatedBlog && (!isset($updatedBlog['status']) || $updatedBlog['status'] === 'published')) {
            generateStaticBlogPost($updatedBlog);
        } else if ($updatedBlog && $updatedBlog['status'] === 'draft') {
            $slugClean = $updatedBlog['slug'];
            $root = dirname(__DIR__, 2);
            $dirs = [
                $root . '/out/blog/' . $slugClean,
                $root . '/public_html/blog/' . $slugClean,
                $root . '/blog/' . $slugClean
            ];
            foreach ($dirs as $d) {
                if (is_dir($d)) {
                    @unlink($d . '/index.html');
                    @rmdir($d);
                }
            }
        }

        sendJson([
            'success'      => true,
            'message'      => 'Blog updated successfully!',
            'id'           => $id,
            'status'       => $updatedBlog['status'] ?? $status,
            'published_at' => $updatedBlog['published_at'] ?? $publishedAt,
            'blog'         => $updatedBlog
        ]);
    } catch (Exception $e) {
        sendJson(['success' => false, 'message' => 'Failed to update blog: ' . $e->getMessage()], 500);
    }
}

if ($method === 'PATCH') {
    $session = requireAdmin();
    $body = getJsonBody();

    $wantsStatus = isset($body['status']);
    $wantsPopular = isset($body['popular']);
    $wantsPublishedAt = isset($body['published_at']);

    if (!$wantsStatus && !$wantsPopular && !$wantsPublishedAt) {
        sendJson(['success' => false, 'message' => 'No updatable fields provided.'], 400);
    }

    $setParts = [];
    $params = [':id' => $id];

    if ($wantsPopular) {
        $setParts[] = "`popular` = :pop";
        $params[':pop'] = !empty($body['popular']) ? 1 : 0;
    }

    if ($wantsStatus) {
        $statusVal = trim($body['status']) === 'draft' ? 'draft' : (trim($body['status']) === 'scheduled' ? 'scheduled' : 'published');
        $setParts[] = "`status` = :status";
        $params[':status'] = $statusVal;
    }

    if ($wantsPublishedAt) {
        $setParts[] = "`published_at` = :pub_at";
        $params[':pub_at'] = date('Y-m-d H:i:s', strtotime($body['published_at']));
    }

    try {
        $sql = "UPDATE `blog` SET " . implode(', ', $setParts) . " WHERE `id` = :id";
        $stmt = $db->prepare($sql);
        $stmt->execute($params);

        $fetchStmt = $db->prepare("SELECT * FROM `blog` WHERE `id` = :id LIMIT 1");
        $fetchStmt->execute([':id' => $id]);
        $updatedBlog = $fetchStmt->fetch();

        if ($updatedBlog) {
            if ($updatedBlog['status'] === 'published') {
                generateStaticBlogPost($updatedBlog);
            } else {
                $slugClean = $updatedBlog['slug'];
                $root = dirname(__DIR__, 2);
                $dirs = [
                    $root . '/out/blog/' . $slugClean,
                    $root . '/public_html/blog/' . $slugClean,
                    $root . '/blog/' . $slugClean
                ];
                foreach ($dirs as $d) {
                    if (is_dir($d)) {
                        @unlink($d . '/index.html');
                        @rmdir($d);
                    }
                }
            }
        }

        sendJson([
            'success'      => true,
            'message'      => 'Blog updated successfully!',
            'id'           => $id,
            'status'       => $updatedBlog['status'] ?? ($statusVal ?? 'published'),
            'published_at' => $updatedBlog['published_at'] ?? null,
            'blog'         => $updatedBlog
        ]);
    } catch (Exception $e) {
        sendJson(['success' => false, 'message' => 'Failed to patch blog: ' . $e->getMessage()], 500);
    }
}

if ($method === 'DELETE') {
    $session = requireAdmin();

    try {
        $fetchStmt = $db->prepare("SELECT slug FROM `blog` WHERE `id` = :id LIMIT 1");
        $fetchStmt->execute([':id' => $id]);
        $b = $fetchStmt->fetch();

        $delStmt = $db->prepare("DELETE FROM `blog` WHERE `id` = :id");
        $delStmt->execute([':id' => $id]);

        // Remove static html directory if exists
        if ($b && !empty($b['slug'])) {
            $slug = $b['slug'];
            $root = dirname(__DIR__, 2);
            $dirs = [
                $root . '/out/blog/' . $slug,
                $root . '/out/blog/' . $slug,
                $root . '/public_html/blog/' . $slug,
                $root . '/public_html/blog/' . $slug
            ];
            foreach ($dirs as $d) {
                if (is_dir($d)) {
                    @unlink($d . '/index.html');
                    @rmdir($d);
                }
            }
        }

        sendJson(['success' => true, 'message' => 'Blog deleted successfully.']);
    } catch (Exception $e) {
        sendJson(['success' => false, 'message' => 'Failed to delete blog: ' . $e->getMessage()], 500);
    }
}

sendJson(['success' => false, 'message' => 'Method not allowed'], 405);
