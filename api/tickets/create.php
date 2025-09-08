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

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    exit;
}

$subject = trim($_POST['subject'] ?? '');
$message = trim($_POST['message'] ?? '');
$priority = $_POST['priority'] ?? 'medium';

if (empty($subject) || empty($message)) {
    echo json_encode(['success' => false, 'message' => 'Subject and message are required']);
    exit;
}

if (!in_array($priority, ['low', 'medium', 'high'])) {
    $priority = 'medium';
}

try {
    $database = new Database(DB_HOST, DB_NAME, DB_USER, DB_PASS);
    $conn = $database->getConnection();
    
    $stmt = $conn->prepare("INSERT INTO tickets (user_id, subject, message, priority) VALUES (?, ?, ?, ?)");
    $result = $stmt->execute([$user_id, $subject, $message, $priority]);
    
    if ($result) {
        $ticketId = $conn->lastInsertId();
        $stmt = $conn->prepare("SELECT ticket_number FROM tickets WHERE id = ?");
        $stmt->execute([$ticketId]);
        $ticketNumber = $stmt->fetchColumn();
        
        echo json_encode([
            'success' => true, 
            'message' => 'Ticket created successfully',
            'ticket_number' => $ticketNumber
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to create ticket']);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Database error']);
}
exit;
?>