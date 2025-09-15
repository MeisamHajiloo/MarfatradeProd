<?php
ob_clean();
header('Content-Type: application/json');

ob_start();
require_once '../../includes/config/constants.php';
require_once '../../includes/config/session.php';
require_once '../../classes/Database.php';

initializeSession();
ob_end_clean();

if (!isUserLoggedIn()) {
    echo json_encode(['success' => false, 'message' => 'Not authenticated']);
    exit;
}

try {
    $db = new Database(DB_HOST, DB_NAME, DB_USER, DB_PASS);
    $conn = $db->getConnection();
    
    $user_id = getCurrentUserId();
    
    $stmt = $conn->prepare("
        SELECT rs.*, p.name as product_name, p.thumbnail as product_image, p.slug as product_slug
        FROM request_sample rs
        LEFT JOIN products p ON rs.product_id = p.id
        WHERE rs.user_id = ?
        ORDER BY rs.created_at DESC
    ");
    
    $stmt->execute([$user_id]);
    $requests = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode(['success' => true, 'data' => $requests]);
    
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error fetching requests']);
}
exit;
?>