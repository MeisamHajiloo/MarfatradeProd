<?php
ob_start();
require_once __DIR__ . '/../../includes/config/constants.php';
require_once __DIR__ . '/../../classes/Database.php';
ob_end_clean();

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

session_start();

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'User not logged in']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['product_slug']) || !isset($input['inquiry_via'])) {
    echo json_encode(['success' => false, 'message' => 'Required fields missing']);
    exit;
}

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
    
    $stmt = $pdo->prepare("INSERT INTO product_inquiries (product_id, user_id, inquiry_via) VALUES (?, ?, ?)");
    $stmt->execute([$product['id'], $_SESSION['user_id'], $input['inquiry_via']]);
    
    echo json_encode(['success' => true, 'message' => 'Inquiry recorded']);
    
} catch (Exception $e) {
    error_log('Inquiry API Error: ' . $e->getMessage());
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
exit;
?>