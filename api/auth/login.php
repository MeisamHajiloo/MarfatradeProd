<?php
// Remove any previous output
ob_clean();

header('Content-Type: application/json');

// Allow from any origin
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Prevent any output before JSON
ob_start();

session_start();

require_once __DIR__ . '/../../includes/config/constants.php';
require_once __DIR__ . '/../../classes/Database.php';

try {
    $db = new Database(DB_HOST, DB_NAME, DB_USER, DB_PASS);
    $pdo = $db->getConnection();
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database connection failed']);
    exit;
}

// Get POST data
$input = json_decode(file_get_contents('php://input'), true);

// If JSON decoding failed, try form data
if ($input === null && !empty($_POST)) {
    $input = $_POST;
}

// If still no data, return error
if ($input === null || empty($input)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'No data received']);
    exit;
}

$email = trim($input['email'] ?? '');
$password = $input['password'] ?? '';

// Get client information for logging
$ip_address = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$user_agent = $_SERVER['HTTP_USER_AGENT'] ?? 'unknown';

// Validate input
if (empty($email) || empty($password)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Email and password are required']);
    exit;
}

try {
    // Check if user exists
    $stmt = $pdo->prepare("SELECT id, name, email, password FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    $login_success = false;

    if ($user && password_verify($password, $user['password'])) {
        $login_success = true;

        // Set session variables
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['user_name'] = $user['name'];
        $_SESSION['user_email'] = $user['email'];
        $_SESSION['logged_in'] = true;

        // Log successful login
        $stmt = $pdo->prepare("INSERT INTO login_logs (user_id, ip_address, user_agent, success) VALUES (?, ?, ?, ?)");
        $stmt->execute([$user['id'], $ip_address, $user_agent, 1]);

        // Clean any output before sending JSON
        ob_end_clean();

        echo json_encode([
            'success' => true,
            'message' => 'Login successful',
            'user' => [
                'id' => $user['id'],
                'name' => $user['name'],
                'email' => $user['email']
            ]
        ]);
        exit;
    } else {
        // Log failed login attempt if user exists
        if ($user) {
            $stmt = $pdo->prepare("INSERT INTO login_logs (user_id, ip_address, user_agent, success) VALUES (?, ?, ?, ?)");
            $stmt->execute([$user['id'], $ip_address, $user_agent, 0]);
        }

        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Invalid email or password']);
        exit;
    }
} catch (PDOException $e) {
    error_log("Database error in login.php: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
    exit;
} catch (Exception $e) {
    error_log("General error in login.php: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'An error occurred']);
    exit;
}
