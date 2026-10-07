<?php
require_once __DIR__ . '/../config.php';

$method = $_SERVER['REQUEST_METHOD'];
$db = getDb();

if ($method === 'GET') {
    try {
        $sql = "SELECT c.*, COUNT(b.id) AS post_count 
                FROM `categories` c 
                LEFT JOIN `blogs` b ON b.category_id = c.id AND b.status = 'published'
                GROUP BY c.id 
                ORDER BY c.name ASC";
        $stmt = $db->query($sql);
        $categories = $stmt->fetchAll();

        sendJson(['success' => true, 'categories' => $categories]);
    } catch (Exception $e) {
        sendJson(['success' => false, 'message' => 'Failed to fetch categories: ' . $e->getMessage()], 500);
    }
}

if ($method === 'POST') {
    $session = requireAdmin();
    $body = getJsonBody();

    $name = isset($body['name']) ? trim($body['name']) : '';
    if (empty($name)) {
        sendJson(['success' => false, 'message' => 'Category name is required.'], 400);
    }

    $slug = !empty($body['slug']) ? trim($body['slug']) : $name;
    $slug = strtolower(trim(preg_replace('/[^a-zA-Z0-9]+/', '-', $slug), '-'));
    $desc = !empty($body['description']) ? trim($body['description']) : null;
    $color = !empty($body['color']) ? trim($body['color']) : '#bf296a';
    $metaTitle = !empty($body['meta_title']) ? trim($body['meta_title']) : null;
    $metaDesc = !empty($body['meta_description']) ? trim($body['meta_description']) : null;

    try {
        $stmt = $db->prepare("INSERT INTO `categories` (`name`, `slug`, `description`, `color`, `meta_title`, `meta_description`) VALUES (:n, :s, :d, :c, :mt, :md)");
        $stmt->execute([
            ':n'  => $name,
            ':s'  => $slug,
            ':d'  => $desc,
            ':c'  => $color,
            ':mt' => $metaTitle,
            ':md' => $metaDesc
        ]);

        $newId = (int)$db->lastInsertId();
        $catStmt = $db->prepare("SELECT * FROM `categories` WHERE `id` = :id");
        $catStmt->execute([':id' => $newId]);
        $newCat = $catStmt->fetch();

        sendJson([
            'success'  => true,
            'message'  => 'Category added successfully!',
            'category' => $newCat
        ]);
    } catch (Exception $e) {
        sendJson(['success' => false, 'message' => 'Failed to add category: ' . $e->getMessage()], 500);
    }
}

sendJson(['success' => false, 'message' => 'Method not allowed'], 405);
