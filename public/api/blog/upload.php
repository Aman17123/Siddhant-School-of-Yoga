<?php
require_once __DIR__ . '/../config.php';

$session = requireAdmin();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJson(['success' => false, 'message' => 'Method not allowed'], 405);
}

$file = null;
if (!empty($_FILES['file'])) {
    $file = $_FILES['file'];
} elseif (!empty($_FILES['image'])) {
    $file = $_FILES['image'];
}

if (!$file || empty($file['tmp_name'])) {
    sendJson(['success' => false, 'message' => 'No image file uploaded.'], 400);
}

$origName = $file['name'];
$ext = strtolower(pathinfo($origName, PATHINFO_EXTENSION));
$allowed = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'];

if (!in_array($ext, $allowed)) {
    sendJson(['success' => false, 'message' => 'Invalid file type. Allowed: jpg, png, webp, gif, svg'], 400);
}

// Clean filename: remove siddhant-blog- prefix, remove timestamps, keep clean words
$baseName = pathinfo($origName, PATHINFO_FILENAME);
$cleanName = preg_replace('/^siddhant-blog-\d+-/i', '', $baseName);
$cleanName = preg_replace('/^\d+-/i', '', $cleanName);
$cleanName = strtolower(trim(preg_replace('/[^a-z0-9]+/i', '-', $cleanName), '-'));

if (empty($cleanName)) {
    $cleanName = 'blog-image-' . time();
}

$filename = $cleanName . '.' . $ext;

// Determine target image directory
$root = dirname(__DIR__, 2); // public or out or public_html
$possibleDirs = [
    $root . '/out/blog/images',
    $root . '/public/blog/images',
    $root . '/public_html/blog/images',
    dirname(__DIR__) . '/blog/images'
];

$saved = false;
$finalFilename = $filename;

foreach ($possibleDirs as $dir) {
    if (is_dir(dirname($dir))) {
        if (!is_dir($dir)) {
            @mkdir($dir, 0755, true);
        }

        // Handle collision
        $targetPath = $dir . '/' . $filename;
        $counter = 1;
        while (file_exists($targetPath)) {
            $finalFilename = $cleanName . '-' . $counter . '.' . $ext;
            $targetPath = $dir . '/' . $finalFilename;
            $counter++;
        }

        if (copy($file['tmp_name'], $targetPath)) {
            $saved = true;
        }
    }
}

if (!$saved) {
    // Fallback: save relative to current file
    $fallbackDir = dirname(__DIR__) . '/blog/images';
    if (!is_dir($fallbackDir)) {
        @mkdir($fallbackDir, 0755, true);
    }
    move_uploaded_file($file['tmp_name'], $fallbackDir . '/' . $finalFilename);
}

$publicUrl = '/blog/images/' . $finalFilename;

sendJson([
    'success'  => true,
    'message'  => 'Image uploaded successfully.',
    'url'      => $publicUrl,
    'filename' => $finalFilename
]);
