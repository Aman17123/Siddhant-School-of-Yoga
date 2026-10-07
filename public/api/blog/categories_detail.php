<?php
require_once __DIR__ . '/../config.php';

$method = $_SERVER['REQUEST_METHOD'];
$db = getDb();

$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
if (!$id) {
    sendJson(['success' => false, 'message' => 'Category ID is required.'], 400);
}

if ($method === 'PUT') {
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
        $stmt = $db->prepare("UPDATE `categories` SET `name` = :n, `slug` = :s, `description` = :d, `color` = :c, `meta_title` = :mt, `meta_description` = :md WHERE `id` = :id");
        $stmt->execute([
            ':id' => $id,
            ':n'  => $name,
            ':s'  => $slug,
            ':d'  => $desc,
            ':c'  => $color,
            ':mt' => $metaTitle,
            ':md' => $metaDesc
        ]);

        $catStmt = $db->prepare("SELECT * FROM `categories` WHERE `id` = :id");
        $catStmt->execute([':id' => $id]);
        $updatedCat = $catStmt->fetch();

        sendJson([
            'success'  => true,
            'message'  => 'Category updated successfully!',
            'category' => $updatedCat
        ]);
    } catch (Exception $e) {
        sendJson(['success' => false, 'message' => 'Failed to update category: ' . $e->getMessage()], 500);
    }
}

if ($method === 'DELETE') {
    $session = requireAdmin();
    $body = getJsonBody();
    $moveToId = !empty($body['moveToCategoryId']) ? (int)$body['moveToCategoryId'] : (!empty($_GET['moveToCategoryId']) ? (int)$_GET['moveToCategoryId'] : null);

    try {
        if ($moveToId) {
            $catStmt = $db->prepare("SELECT name FROM `categories` WHERE `id` = :id");
            $catStmt->execute([':id' => $moveToId]);
            $targetCat = $catStmt->fetch();
            $targetName = $targetCat ? $targetCat['name'] : 'General';

            $upStmt = $db->prepare("UPDATE `blog` SET `category_id` = :mid, `category_name` = :mname WHERE `category_id` = :id");
            $upStmt->execute([':mid' => $moveToId, ':mname' => $targetName, ':id' => $id]);
        } else {
            $upStmt = $db->prepare("UPDATE `blog` SET `category_id` = NULL, `category_name` = 'Uncategorized' WHERE `category_id` = :id");
            $upStmt->execute([':id' => $id]);
        }

        $delStmt = $db->prepare("DELETE FROM `categories` WHERE `id` = :id");
        $delStmt->execute([':id' => $id]);

        sendJson(['success' => true, 'message' => 'Category deleted successfully.']);
    } catch (Exception $e) {
        sendJson(['success' => false, 'message' => 'Failed to delete category: ' . $e->getMessage()], 500);
    }
}

sendJson(['success' => false, 'message' => 'Method not allowed'], 405);
