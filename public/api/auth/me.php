<?php
require_once __DIR__ . '/../config.php';

$session = getAuthSession();
if (!$session || empty($session['username'])) {
    sendJson(['authenticated' => false], 401);
}

$db = getDb();
$userData = [
    'id'       => isset($session['id']) ? $session['id'] : 1,
    'username' => $session['username'],
    'name'     => isset($session['name']) ? $session['name'] : 'Administrator',
    'role'     => 'admin',
    'email'    => ''
];

try {
    $stmt = $db->prepare("SELECT id, username, name, email, role FROM `users` WHERE `username` = :u LIMIT 1");
    $stmt->execute([':u' => $session['username']]);
    $row = $stmt->fetch();
    if ($row) {
        $userData = [
            'id'       => (int)$row['id'],
            'username' => $row['username'],
            'name'     => !empty($row['name']) ? $row['name'] : $row['username'],
            'email'    => !empty($row['email']) ? $row['email'] : '',
            'role'     => !empty($row['role']) ? $row['role'] : 'admin'
        ];
    }
} catch (Exception $e) {}

sendJson([
    'authenticated' => true,
    'user'          => $userData
]);
