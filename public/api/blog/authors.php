<?php
require_once __DIR__ . '/../config.php';

$session = requireAdmin();
$db = getDb();

$authors = ['Siddhant School of Yoga'];

try {
    $sql = "SELECT DISTINCT TRIM(`author`) AS author_name 
            FROM `blog` 
            WHERE `author` IS NOT NULL AND TRIM(`author`) != ''
            UNION
            SELECT DISTINCT TRIM(`name`) AS author_name 
            FROM `users` 
            WHERE `name` IS NOT NULL AND TRIM(`name`) != ''";
    $stmt = $db->query($sql);
    $rows = $stmt->fetchAll();

    foreach ($rows as $r) {
        $n = trim($r['author_name']);
        if (!empty($n) && !in_array($n, $authors)) {
            $authors[] = $n;
        }
    }
} catch (Exception $e) {}

sendJson(['success' => true, 'authors' => $authors]);
