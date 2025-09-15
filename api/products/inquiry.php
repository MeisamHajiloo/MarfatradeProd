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

// Initialize session
initializeSession();

// Check if user is logged in
if (!isUserLoggedIn()) {
    error_log('User not logged in - Session data: ' . print_r($_SESSION, true));
    echo json_encode(['success' => false, 'message' => 'User not logged in']);
    exit;
}

$user_id = getCurrentUserId();

$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['product_slug']) || !isset($input['inquiry_via'])) {
    echo json_encode(['success' => false, 'message' => 'Required fields missing']);
    exit;
}

$situation = isset($input['situation']) ? trim($input['situation']) : null;

if (!in_array($input['inquiry_via'], ['whatsapp', 'telegram'])) {
    echo json_encode(['success' => false, 'message' => 'Invalid inquiry_via']);
    exit;
}

try {
    $db = new Database(DB_HOST, DB_NAME, DB_USER, DB_PASS);
    $pdo = $db->getConnection();
    
    $stmt = $pdo->prepare("SELECT id FROM products WHERE slug = ?");
    $stmt->execute([$input['product_slug']]);
    $product = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$product) {
        echo json_encode(['success' => false, 'message' => 'Product not found']);
        exit;
    }
    
    $stmt = $pdo->prepare("INSERT INTO product_inquiries (product_id, user_id, inquiry_via, situation) VALUES (?, ?, ?, ?)");
    $stmt->execute([$product['id'], $user_id, $input['inquiry_via'], $situation]);
    
    echo json_encode(['success' => true, 'message' => 'Inquiry recorded']);
    
} catch (Exception $e) {
    error_log('Inquiry API Error: ' . $e->getMessage());
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
exit;
?>