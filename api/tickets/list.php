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

$groupBy = $_GET['group'] ?? 'status';

try {
    $database = new Database(DB_HOST, DB_NAME, DB_USER, DB_PASS);
    $conn = $database->getConnection();
    
    $stmt = $conn->prepare("SELECT *, DATE(created_at) as ticket_date FROM tickets WHERE user_id = ? ORDER BY created_at DESC");
    $stmt->execute([$user_id]);
    $allTickets = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Group tickets based on selected method
    $ticketsGrouped = [];
    foreach ($allTickets as $ticket) {
        switch ($groupBy) {
            case 'date':
                $key = $ticket['ticket_date'];
                break;
            case 'priority':
                $key = $ticket['priority'];
                break;
            case 'status':
            default:
                $key = $ticket['status'];
                break;
        }
        
        if (!isset($ticketsGrouped[$key])) {
            $ticketsGrouped[$key] = [];
        }
        $ticketsGrouped[$key][] = $ticket;
    }
    
    // Sort groups
    if ($groupBy === 'priority') {
        $priorityOrder = ['high' => 1, 'medium' => 2, 'low' => 3];
        uksort($ticketsGrouped, function($a, $b) use ($priorityOrder) {
            return ($priorityOrder[$a] ?? 4) - ($priorityOrder[$b] ?? 4);
        });
    } elseif ($groupBy === 'status') {
        $statusOrder = ['open' => 1, 'in_progress' => 2, 'closed' => 3];
        uksort($ticketsGrouped, function($a, $b) use ($statusOrder) {
            return ($statusOrder[$a] ?? 4) - ($statusOrder[$b] ?? 4);
        });
    }
    
    echo json_encode([
        'success' => true,
        'tickets' => $ticketsGrouped,
        'groupBy' => $groupBy
    ]);
    
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Database error']);
}
exit;
?>