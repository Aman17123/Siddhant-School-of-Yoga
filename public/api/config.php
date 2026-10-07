<?php
// ==============================================================================
// Siddhant School of Yoga - PHP Backend Configuration for Hostinger
// ==============================================================================

// Prevent direct error leakage in JSON API mode
error_reporting(E_ALL);
ini_set('display_errors', '0');

// Automatically search and load .env files from Hostinger directories
function loadEnvFiles() {
    $possibleDirs = [
        dirname(__DIR__, 2), // public_html or document root
        dirname(__DIR__, 3), // parent folder (e.g. /home/u280897225/)
        dirname(__DIR__),    // public_html/api/
        __DIR__
    ];
    $envNames = ['.env', '.env.local', '.env.production'];

    foreach ($possibleDirs as $dir) {
        if (!is_dir($dir)) continue;
        foreach ($envNames as $name) {
            $path = $dir . '/' . $name;
            if (file_exists($path) && is_readable($path)) {
                $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
                foreach ($lines as $line) {
                    $line = trim($line);
                    if (empty($line) || str_starts_with($line, '#')) continue;
                    $eq = strpos($line, '=');
                    if ($eq !== false) {
                        $key = trim(substr($line, 0, $eq));
                        $val = trim(substr($line, $eq + 1));
                        if ((str_starts_with($val, '"') && str_ends_with($val, '"')) ||
                            (str_starts_with($val, "'") && str_ends_with($val, "'"))) {
                            $val = substr($val, 1, -1);
                        }
                        putenv("$key=$val");
                        $_ENV[$key] = $val;
                        $_SERVER[$key] = $val;
                    }
                }
            }
        }
    }
}
loadEnvFiles();

// Database Configuration - Matches Hostinger MySQL setup (auto-loaded from .env)
define('DB_HOST', getenv('MYSQL_HOST') ?: '127.0.0.1');
define('DB_PORT', getenv('MYSQL_PORT') ?: '3306');
define('DB_NAME', getenv('MYSQL_DATABASE') ?: 'u280897225_blogdatabase');
define('DB_USER', getenv('MYSQL_USER') ?: 'u280897225_blog');
define('DB_PASS', getenv('MYSQL_PASSWORD') ?: '');

define('JWT_SECRET', getenv('ADMIN_JWT_SECRET') ?: 'siddhant_school_of_yoga_jwt_secret_key_2026_xyz');
define('AUTH_COOKIE_NAME', 'blog_admin_token');

// Master admin fallback
define('ADMIN_USER', getenv('ADMIN_USERNAME') ?: 'admin');
define('ADMIN_PASS', getenv('ADMIN_PASSWORD') ?: 'admin@123');

/**
 * Returns a singleton PDO connection
 */
function getDb() {
    static $pdo = null;
    if ($pdo !== null) {
        return $pdo;
    }

    $dsn = "mysql:host=" . DB_HOST . ";port=" . DB_PORT . ";dbname=" . DB_NAME . ";charset=utf8mb4";
    try {
        $pdo = new PDO($dsn, DB_USER, DB_PASS, [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ]);
        return $pdo;
    } catch (PDOException $e) {
        sendJson([
            'success' => false,
            'message' => 'Database connection failed. Please verify DB credentials in api/config.php.',
            'error'   => $e->getMessage()
        ], 500);
    }
}

/**
 * Output JSON response and exit
 */
function sendJson($data, $statusCode = 200) {
    http_response_code($statusCode);
    header('Content-Type: application/json; charset=utf-8');
    header('Access-Control-Allow-Credentials: true');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

/**
 * Read JSON input from request body
 */
function getJsonBody() {
    $raw = file_get_contents('php://input');
    if (!$raw) return [];
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

/**
 * Base64 URL encode
 */
function base64UrlEncode($data) {
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

/**
 * Base64 URL decode
 */
function base64UrlDecode($data) {
    return base64_decode(strtr($data, '-_', '+/'));
}

/**
 * Create HMAC JWT Token
 */
function createJwtToken($user) {
    $exp = time() + (7 * 24 * 60 * 60); // 7 days
    $header = json_encode(['alg' => 'HS256', 'typ' => 'JWT']);
    $payload = json_encode([
        'username' => isset($user['username']) ? $user['username'] : (isset($user['name']) ? $user['name'] : 'admin'),
        'role'     => 'admin',
        'name'     => isset($user['name']) ? $user['name'] : 'Administrator',
        'id'       => isset($user['id']) ? (int)$user['id'] : 1,
        'exp'      => $exp
    ]);

    $b64Header = base64UrlEncode($header);
    $b64Payload = base64UrlEncode($payload);
    $signature = hash_hmac('sha256', $b64Header . '.' . $b64Payload, JWT_SECRET, true);
    $b64Sig = base64UrlEncode($signature);

    return [
        'token' => $b64Header . '.' . $b64Payload . '.' . $b64Sig,
        'exp'   => $exp
    ];
}

/**
 * Verify HMAC JWT Token
 */
function verifyJwtToken($token) {
    if (!$token || !is_string($token)) return null;
    $parts = explode('.', $token);
    if (count($parts) !== 3) return null;

    list($b64Header, $b64Payload, $b64Sig) = $parts;
    $expectedSig = base64UrlEncode(hash_hmac('sha256', $b64Header . '.' . $b64Payload, JWT_SECRET, true));

    if (!hash_equals($expectedSig, $b64Sig)) {
        return null;
    }

    $payload = json_decode(base64UrlDecode($b64Payload), true);
    if (!$payload || !isset($payload['exp']) || $payload['exp'] < time()) {
        return null;
    }

    return $payload;
}

/**
 * Get active admin session from Cookie or Bearer header
 */
function getAuthSession() {
    $token = null;

    if (!empty($_COOKIE[AUTH_COOKIE_NAME])) {
        $token = $_COOKIE[AUTH_COOKIE_NAME];
    } elseif (!empty($_SERVER['HTTP_AUTHORIZATION'])) {
        if (preg_match('/Bearer\s+(.*)$/i', $_SERVER['HTTP_AUTHORIZATION'], $matches)) {
            $token = $matches[1];
        }
    } elseif (!empty($_SERVER['REDIRECT_HTTP_AUTHORIZATION'])) {
        if (preg_match('/Bearer\s+(.*)$/i', $_SERVER['REDIRECT_HTTP_AUTHORIZATION'], $matches)) {
            $token = $matches[1];
        }
    } elseif (!empty($_SERVER['HTTP_X_AUTH_TOKEN'])) {
        $token = trim($_SERVER['HTTP_X_AUTH_TOKEN']);
    } elseif (!empty($_SERVER['HTTP_X_ADMIN_TOKEN'])) {
        $token = trim($_SERVER['HTTP_X_ADMIN_TOKEN']);
    }

    if (!$token) return null;
    return verifyJwtToken($token);
}

/**
 * Require admin authentication
 */
function requireAdmin() {
    $session = getAuthSession();
    if (!$session || empty($session['username'])) {
        sendJson(['success' => false, 'message' => 'Unauthorized. Please login.'], 401);
    }
    return $session;
}

/**
 * Set auth session cookie
 */
function setAuthCookie($token, $exp) {
    $isSecure = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || $_SERVER['SERVER_PORT'] == 443;
    setcookie(AUTH_COOKIE_NAME, $token, [
        'expires'  => $exp,
        'path'     => '/',
        'domain'   => '',
        'secure'   => $isSecure,
        'httponly' => true,
        'samesite' => 'Lax'
    ]);
}

/**
 * Clear auth session cookie
 */
function clearAuthCookie() {
    setcookie(AUTH_COOKIE_NAME, '', [
        'expires'  => time() - 3600,
        'path'     => '/',
        'domain'   => '',
        'httponly' => true,
        'samesite' => 'Lax'
    ]);
}
