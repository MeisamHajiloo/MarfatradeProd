<?php
ob_clean();
header('Content-Type: application/json');

require_once '../../includes/config/constants.php';
require_once '../../includes/config/session.php';
require_once '../../classes/Database.php';

initializeSession();

if (!isUserLoggedIn()) {
    echo json_encode(['success' => false, 'message' => 'User not logged in']);
    exit;
}

$user_id = getCurrentUserId();

$ticketId = $_GET['id'] ?? '';

if (empty($ticketId)) {
    echo json_encode(['success' => false, 'message' => 'Ticket ID is required']);
    exit;
}

try {
    $database = new Database(DB_HOST, DB_NAME, DB_USER, DB_PASS);
    $conn = $database->getConnection();
    
    $stmt = $conn->prepare("SELECT * FROM tickets WHERE id = ? AND user_id = ?");
    $stmt->execute([$ticketId, $user_id]);
    $ticket = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$ticket) {
        echo json_encode(['success' => false, 'message' => 'Ticket not found']);
        exit;
    }
    
    $stmt = $conn->prepare("SELECT tr.*, u.name as user_name, tr.is_admin FROM ticket_replies tr LEFT JOIN users u ON tr.user_id = u.id WHERE tr.ticket_id = ? ORDER BY tr.created_at ASC");
    $stmt->execute([$ticketId]);
    $replies = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode([
        'success' => true,
        'ticket' => $ticket,
        'replies' => $replies,
        'current_user_id' => $user_id
    ]);
    
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Database error']);
}
exit;
?>