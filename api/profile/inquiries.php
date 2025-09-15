<?php
ob_start();
require_once __DIR__ . '/../../includes/config/constants.php';
require_once __DIR__ . '/../../includes/config/session.php';
require_once __DIR__ . '/../../classes/Database.php';
ob_end_clean();

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

initializeSession();

if (!isUserLoggedIn()) {
    echo json_encode(['success' => false, 'message' => 'User not logged in']);
    exit;
}

$user_id = getCurrentUserId();

try {
    $db = new Database(DB_HOST, DB_NAME, DB_USER, DB_PASS);
    $pdo = $db->getConnection();
    
    $stmt = $pdo->prepare("
        SELECT pi.*, p.name as product_name, p.slug as product_slug, p.thumbnail, c.name as category_name
        FROM product_inquiries pi 
        JOIN products p ON pi.product_id = p.id 
        LEFT JOIN categories c ON p.category_id = c.id
        WHERE pi.user_id = ? AND pi.is_deleted = 0
        ORDER BY pi.inquiry_date DESC
    ");
    $stmt->execute([$user_id]);
    $inquiries = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode(['success' => true, 'inquiries' => $inquiries]);
    
} catch (Exception $e) {
    error_log('Inquiries API Error: ' . $e->getMessage());
    echo json_encode(['success' => false, 'message' => 'Failed to load inquiries']);
}
exit;
?>