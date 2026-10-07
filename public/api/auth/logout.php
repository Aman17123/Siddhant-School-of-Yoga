<?php
require_once __DIR__ . '/../config.php';

clearAuthCookie();

sendJson([
    'success' => true,
    'message' => 'Logged out successfully.'
]);
