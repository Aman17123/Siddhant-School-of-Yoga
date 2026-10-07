<?php
require_once __DIR__ . '/../config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJson(['success' => false, 'message' => 'Method not allowed'], 405);
}

$body = getJsonBody();
$username = trim(isset($body['username']) ? $body['username'] : '');
$password = trim(isset($body['password']) ? $body['password'] : '');

if (empty($username) || empty($password)) {
    sendJson(['success' => false, 'message' => 'Username and password are required.'], 400);
}

$db = getDb();
$validatedUser = null;

// 1. Check users table in MySQL
try {
    $stmt = $db->prepare("SELECT id, username, password, name, email, role FROM `users` WHERE (`username` = :u1 OR LOWER(`username`) = LOWER(:u2)) AND `role` = 'admin' LIMIT 1");
    $stmt->execute([':u1' => $username, ':u2' => $username]);
    $user = $stmt->fetch();

    if ($user && (password_verify($password, $user['password']) || $user['password'] === $password)) {
        $validatedUser = [
            'id'       => (int)$user['id'],
            'username' => $user['username'],
            'name'     => !empty($user['name']) ? $user['name'] : $user['username'],
            'email'    => !empty($user['email']) ? $user['email'] : '',
            'role'     => 'admin'
        ];
    }
} catch (Exception $e) {
    // If table error, fall back to master credentials
}

// 2. Fallback to admin env credentials
if (!$validatedUser) {
    if (strtolower($username) === strtolower(ADMIN_USER) && $password === ADMIN_PASS) {
        $validatedUser = [
            'id'       => 1,
            'username' => ADMIN_USER,
            'name'     => 'Administrator',
            'email'    => 'info@siddhantschoolofyoga.com',
            'role'     => 'admin'
        ];
    }
}

if (!$validatedUser) {
    sendJson(['success' => false, 'message' => 'Invalid username or password. Please try again.'], 401);
}

// Issue JWT Token and set cookie
$jwt = createJwtToken($validatedUser);
setAuthCookie($jwt['token'], $jwt['exp']);

// Log login attempt
try {
    $ip = isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : null;
    $ua = isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : null;
    $logStmt = $db->prepare("INSERT INTO `login_logs` (`username`, `name`, `role`, `ip`, `user_agent`, `status`) VALUES (:u, :n, :r, :ip, :ua, 'success')");
    $logStmt->execute([
        ':u'  => $validatedUser['username'],
        ':n'  => $validatedUser['name'],
        ':r'  => $validatedUser['role'],
        ':ip' => $ip,
        ':ua' => $ua
    ]);
} catch (Exception $e) {}

sendJson([
    'success' => true,
    'message' => 'Login successful!',
    'user'    => $validatedUser,
    'token'   => $jwt['token']
]);
