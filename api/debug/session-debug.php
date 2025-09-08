<?php
require_once __DIR__ . '/../../includes/config/constants.php';
require_once __DIR__ . '/../../includes/config/session.php';

header('Content-Type: application/json');

// Initialize session
initializeSession();

$debug_info = [
    'session_id' => session_id(),
    'session_status' => session_status(),
    'session_data' => $_SESSION,
    'is_logged_in' => isUserLoggedIn(),
    'user_id' => getCurrentUserId(),
    'cookie_params' => session_get_cookie_params(),
    'server_info' => [
        'PHP_VERSION' => PHP_VERSION,
        'SERVER_SOFTWARE' => $_SERVER['SERVER_SOFTWARE'] ?? 'unknown',
        'HTTP_HOST' => $_SERVER['HTTP_HOST'] ?? 'unknown'
    ]
];

echo json_encode($debug_info, JSON_PRETTY_PRINT);
?>