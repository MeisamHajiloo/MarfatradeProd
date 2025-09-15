<?php
ob_clean();
header('Content-Type: application/json');

ob_start();
require_once '../../includes/config/constants.php';
require_once '../../includes/config/session.php';
require_once '../../classes/Database.php';

initializeSession();
ob_end_clean();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    ob_end_clean();
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

try {
    $db = new Database(DB_HOST, DB_NAME, DB_USER, DB_PASS);
    $conn = $db->getConnection();
    
    // Get POST data
    $input = json_decode(file_get_contents('php://input'), true);
    
    // Validate required fields
    $required_fields = ['product_id', 'full_name', 'email', 'address', 'city', 'country'];
    foreach ($required_fields as $field) {
        if (empty($input[$field])) {
            ob_end_clean();
            echo json_encode(['success' => false, 'message' => "Field '$field' is required"]);
            exit;
        }
    }
    
    // Validate email format
    if (!filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
        ob_end_clean();
        echo json_encode(['success' => false, 'message' => 'Invalid email format']);
        exit;
    }
    
    // Check if product exists
    $product_check = $conn->prepare("SELECT id FROM products WHERE id = ? AND status = 'published'");
    $product_check->execute([$input['product_id']]);
    
    if ($product_check->rowCount() === 0) {
        ob_end_clean();
        echo json_encode(['success' => false, 'message' => 'Product not found']);
        exit;
    }
    
    // Get user ID if logged in
    $user_id = getCurrentUserId() ?: null;
    
    // Insert sample request
    $stmt = $conn->prepare("
        INSERT INTO request_sample 
        (user_id, product_id, full_name, email, phone, company_name, address, city, state, postal_code, country, purpose, status) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
    ");
    
    if ($stmt->execute([
        $user_id,
        $input['product_id'],
        $input['full_name'],
        $input['email'],
        $input['phone'] ?? null,
        $input['company_name'] ?? null,
        $input['address'],
        $input['city'],
        $input['state'] ?? null,
        $input['postal_code'] ?? null,
        $input['country'],
        $input['purpose'] ?? null
    ])) {
        ob_end_clean();
        echo json_encode([
            'success' => true, 
            'message' => 'Sample request submitted successfully! We will contact you soon.'
        ]);
    } else {
        ob_end_clean();
        echo json_encode(['success' => false, 'message' => 'Failed to submit request']);
    }
    
} catch (Exception $e) {
    ob_end_clean();
    echo json_encode(['success' => false, 'message' => 'An error occurred while processing your request']);
}
exit;
?>