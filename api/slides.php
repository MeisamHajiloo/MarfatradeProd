<?php
ob_start();
require_once __DIR__ . '/../includes/config/constants.php';
require_once __DIR__ . '/../classes/Database.php';
ob_end_clean();

header('Content-Type: application/json');

try {
    $db = new Database(DB_HOST, DB_NAME, DB_USER, DB_PASS);
    $pdo = $db->getConnection();
    
    $stmt = $pdo->query("SELECT * FROM slides WHERE is_active = 1 ORDER BY sort_order ASC");
    $slides = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($slides);
    
} catch (PDOException $e) {
    echo json_encode([]);
}
exit;
?>