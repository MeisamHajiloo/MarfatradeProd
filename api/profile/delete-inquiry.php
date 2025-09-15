<?php
ob_start();
require_once __DIR__ . '/../../includes/config/constants.php';
require_once __DIR__ . '/../../includes/config/session.php';
require_once __DIR__ . '/../../classes/Database.php';
ob_end_clean();

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

initializeSession();

if (!isUserLoggedIn()) {
    echo json_encode(['success' => false, 'message' => 'User not logged in']);
    exit;
}

$user_id = getCurrentUserId();
$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['inquiry_id'])) {
    echo json_encode(['success' => false, 'message' => 'Inquiry ID required']);
    exit;
}

try {
    $db = new Database(DB_HOST, DB_NAME, DB_USER, DB_PASS);
    $pdo = $db->getConnection();
    
    $stmt = $pdo->prepare("UPDATE product_inquiries SET is_deleted = 1 WHERE id = ? AND user_id = ?");
    $stmt->execute([$input['inquiry_id'], $user_id]);
    
    if ($stmt->rowCount() > 0) {
        echo json_encode(['success' => true, 'message' => 'Inquiry deleted']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Inquiry not found']);
    }
    
} catch (Exception $e) {
    error_log('Delete Inquiry API Error: ' . $e->getMessage());
    echo json_encode(['success' => false, 'message' => 'Failed to delete inquiry']);
}
exit;
?>