<?php
require_once __DIR__ . '/../config.php';

$session = requireAdmin();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJson(['success' => false, 'message' => 'Method not allowed'], 405);
}

// 1. Identify uploaded file
$file = null;
if (!empty($_FILES['file'])) {
    $file = $_FILES['file'];
} elseif (!empty($_FILES['image'])) {
    $file = $_FILES['image'];
}

if (!$file) {
    sendJson(['success' => false, 'message' => 'No image file uploaded in request.'], 400);
}

// Check PHP upload error codes
if (isset($file['error']) && $file['error'] !== UPLOAD_ERR_OK) {
    $errMsg = 'Upload error.';
    switch ($file['error']) {
        case UPLOAD_ERR_INI_SIZE:
            $errMsg = 'Image exceeds server upload_max_filesize limit in php.ini.';
            break;
        case UPLOAD_ERR_FORM_SIZE:
            $errMsg = 'Image exceeds MAX_FILE_SIZE directive in HTML form.';
            break;
        case UPLOAD_ERR_PARTIAL:
            $errMsg = 'Image was only partially uploaded.';
            break;
        case UPLOAD_ERR_NO_FILE:
            $errMsg = 'No image file was received.';
            break;
        case UPLOAD_ERR_NO_TMP_DIR:
            $errMsg = 'Missing temporary upload directory on server.';
            break;
        case UPLOAD_ERR_CANT_WRITE:
            $errMsg = 'Failed to write upload file to server disk.';
            break;
        default:
            $errMsg = 'Upload failed with PHP error code: ' . $file['error'];
            break;
    }
    sendJson(['success' => false, 'message' => $errMsg], 400);
}

if (empty($file['tmp_name']) || !file_exists($file['tmp_name'])) {
    sendJson(['success' => false, 'message' => 'Uploaded temporary file not found.'], 400);
}

// 2. Validate file type
$origName = !empty($file['name']) ? $file['name'] : 'image.webp';
$ext = strtolower(pathinfo($origName, PATHINFO_EXTENSION));
$allowed = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'];

if (!in_array($ext, $allowed)) {
    sendJson(['success' => false, 'message' => 'Invalid file type. Allowed formats: JPG, PNG, WebP, GIF, SVG.'], 400);
}

// 3. Clean filename: remove legacy prefixes and special characters
$baseName = pathinfo($origName, PATHINFO_FILENAME);
$cleanName = preg_replace('/^siddhant-blog-\d+-/i', '', $baseName);
$cleanName = preg_replace('/^siddhant-blog-/i', '', $cleanName);
$cleanName = preg_replace('/^\d+-/i', '', $cleanName);
$cleanName = strtolower(trim(preg_replace('/[^a-z0-9]+/i', '-', $cleanName), '-'));

if (empty($cleanName)) {
    $cleanName = 'blog-image-' . time();
}

$filename = $cleanName . '.' . $ext;

// 4. Determine all target image directories on Hostinger / Apache
$docRoot = !empty($_SERVER['DOCUMENT_ROOT']) ? rtrim($_SERVER['DOCUMENT_ROOT'], '/') : '';
$dirParent2 = dirname(__DIR__, 2); // public or out or public_html
$dirParent3 = dirname(__DIR__, 3); // user home e.g. /home/u280897225/

$candidateRoots = array_unique(array_filter([
    $docRoot,
    $dirParent2,
    $dirParent3 . '/public_html',
    $dirParent3 . '/domains/siddhantschoolofyoga.com/public_html',
    dirname(__DIR__)
]));

$targetDirs = [];
foreach ($candidateRoots as $cRoot) {
    if (empty($cRoot)) continue;
    $targetDirs[] = $cRoot . '/blog/images';
    $targetDirs[] = $cRoot . '/images';
    $targetDirs[] = $cRoot . '/public/blog/images';
    $targetDirs[] = $cRoot . '/public/images';
    $targetDirs[] = $cRoot . '/out/blog/images';
    $targetDirs[] = $cRoot . '/out/images';
}
$targetDirs[] = dirname(__DIR__) . '/blog/images';
$targetDirs = array_unique($targetDirs);

$savedCount = 0;
$finalFilename = $filename;

// Handle filename collision across existing folders
foreach ($targetDirs as $dir) {
    if (file_exists($dir . '/' . $finalFilename)) {
        $counter = 1;
        while (file_exists($dir . '/' . $cleanName . '-' . $counter . '.' . $ext)) {
            $counter++;
        }
        $finalFilename = $cleanName . '-' . $counter . '.' . $ext;
        break;
    }
}

// Save file to all accessible image directories
foreach ($targetDirs as $dir) {
    $parent = dirname($dir);
    if (is_dir($parent) || is_dir($dir)) {
        if (!is_dir($dir)) {
            @mkdir($dir, 0777, true);
        }
        if (is_dir($dir)) {
            $destPath = $dir . '/' . $finalFilename;
            if (@copy($file['tmp_name'], $destPath)) {
                @chmod($destPath, 0644);
                $savedCount++;
            }
        }
    }
}

// Fallback move if copy did not succeed
if ($savedCount === 0) {
    $fallbackDir = dirname(__DIR__) . '/blog/images';
    if (!is_dir($fallbackDir)) {
        @mkdir($fallbackDir, 0777, true);
    }
    $destPath = $fallbackDir . '/' . $finalFilename;
    if (@move_uploaded_file($file['tmp_name'], $destPath) || @copy($file['tmp_name'], $destPath)) {
        @chmod($destPath, 0644);
        $savedCount++;
    }
}

if ($savedCount === 0) {
    sendJson([
        'success' => false,
        'message' => 'Failed to write uploaded image to disk. Please verify server folder permissions for blog/images.'
    ], 500);
}

$publicUrl = '/blog/images/' . $finalFilename;

sendJson([
    'success'  => true,
    'message'  => 'Image uploaded successfully.',
    'url'      => $publicUrl,
    'filename' => $finalFilename,
    'fileName' => $finalFilename
]);
