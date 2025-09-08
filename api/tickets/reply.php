<?php
session_start();
ob_clean();
header('Content-Type: application/json');

require_once '../../includes/config/constants.php';
require_once '../../classes/Database.php';

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'User not logged in']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    exit;
}

$ticketId = $_POST['ticket_id'] ?? '';
$message = trim($_POST['message'] ?? '');

if (empty($ticketId) || empty($message)) {
    echo json_encode(['success' => false, 'message' => 'Ticket ID and message are required']);
    exit;
}

try {
    $database = new Database(DB_HOST, DB_NAME, DB_USER, DB_PASS);
    $conn = $database->getConnection();
    
    $stmt = $conn->prepare("SELECT id FROM tickets WHERE id = ? AND user_id = ?");
    $stmt->execute([$ticketId, $_SESSION['user_id']]);
    $ticket = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$ticket) {
        echo json_encode(['success' => false, 'message' => 'Ticket not found']);
        exit;
    }
    
    $stmt = $conn->prepare("INSERT INTO ticket_replies (ticket_id, user_id, message, is_admin) VALUES (?, ?, ?, 0)");
    $result = $stmt->execute([$ticketId, $_SESSION['user_id'], $message]);
    
    if ($result) {
        $stmt = $conn->prepare("UPDATE tickets SET status = 'open', updated_at = CURRENT_TIMESTAMP WHERE id = ? AND status = 'closed'");
        $stmt->execute([$ticketId]);
        
        echo json_encode(['success' => true, 'message' => 'Reply sent successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to send reply']);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Database error']);
}
exit;
?>