<?php
// Remove any previous output
ob_clean();

header('Content-Type: application/json');

// Allow from any origin
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Prevent any output before JSON
ob_start();

require_once __DIR__ . '/../../includes/config/constants.php';
require_once __DIR__ . '/../../includes/config/session.php';

// Initialize session
initializeSession();

// Clean any output before sending JSON
ob_end_clean();

if (isUserLoggedIn()) {
    echo json_encode([
        'loggedIn' => true,
        'user' => [
            'id' => $_SESSION['user_id'],
            'name' => $_SESSION['user_name'],
            'email' => $_SESSION['user_email']
        ]
    ]);
    exit;
} else {
    echo json_encode(['loggedIn' => false]);
    exit;
}
