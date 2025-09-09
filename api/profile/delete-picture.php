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

try {
    $database = new Database(DB_HOST, DB_NAME, DB_USER, DB_PASS);
    $conn = $database->getConnection();
    
    // Get current profile picture path
    $stmt = $conn->prepare("SELECT profile_picture FROM users WHERE id = ?");
    $stmt->execute([$user_id]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($user && $user['profile_picture']) {
        // Delete file from server
        $file_path = '../../' . $user['profile_picture'];
        if (file_exists($file_path)) {
            unlink($file_path);
        }
    }
    
    // Update database to remove profile picture
    $stmt = $conn->prepare("UPDATE users SET profile_picture = NULL WHERE id = ?");
    $stmt->execute([$user_id]);
    
    echo json_encode(['success' => true, 'message' => 'Profile picture removed successfully']);
    
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Database error']);
}
exit;
?>