<?php
require_once __DIR__ . '/includes/config/constants.php';
require_once __DIR__ . '/classes/Database.php';

// اتصال به دیتابیس
$db = new Database(DB_HOST, DB_NAME, DB_USER, DB_PASS);
$pdo = $db->getConnection();

// دریافت اسلایدها
$slides = [];
try {
    $stmt = $pdo->query("SELECT * FROM slides ORDER BY sort_order ASC");
    $slides = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    error_log("Database error: " . $e->getMessage());
    // اسلایدهای پیش‌فرض
    $slides = [
        [
            'title' => 'Welcome to Marfa Trade',
            'description' => 'Discover our innovative solutions for your business',
            'image_url' => 'https://placehold.co/1200x600/221C35/FFFFFF/png?text=Marfa+Trade',
            'button_text' => 'Learn More',
            'button_link' => '#'
        ],
        [
            'title' => 'Quality Products',
            'description' => 'We provide the highest quality products in the market',
            'image_url' => 'https://placehold.co/1200x600/ACA39A/221C35/png?text=Quality+Products',
            'button_text' => 'View Products',
            'button_link' => '#'
        ],
        [
            'title' => 'Customer Support',
            'description' => 'Our team is always ready to help you',
            'image_url' => 'https://placehold.co/1200x600/F1F0D8/221C35/png?text=Customer+Support',
            'button_text' => 'Contact Us',
            'button_link' => '#'
        ]
    ];
}
?>
<?php include 'includes/header.php'; ?>
<?php include 'includes/slider.php'; ?>
<?php include 'includes/counter.php'; ?>
<?php include 'includes/footer.php'; ?>
