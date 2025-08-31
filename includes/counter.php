<?php
// دریافت داده‌های شمارنده از دیتابیس
$counters = [];
try {
    $stmt = $pdo->query("SELECT * FROM counters ORDER BY sort_order ASC");
    $counters = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    error_log("Database error in counters: " . $e->getMessage());
    // مقادیر پیش‌فرض در صورت خطا
    $counters = [
        [
            'title' => 'مشتریان',
            'count' => 5,
            'icon' => 'fas fa-users'
        ],
        [
            'title' => 'محصولات',
            'count' => 1480,
            'icon' => 'fas fa-box'
        ],
        [
            'title' => 'Inquiryها',
            'count' => 205321,
            'icon' => 'fas fa-question-circle'
        ]
    ];
}
?>

<section class="counter-section" id="counter-section">
    <div class="counter-container">
        <?php foreach ($counters as $counter): ?>
            <div class="counter-item">
                <div class="counter-icon">
                    <i class="<?= htmlspecialchars($counter['icon']) ?>"></i>
                </div>
                <div class="counter-number" data-target="<?= $counter['count'] ?>">0</div>
                <div class="counter-title"><?= htmlspecialchars($counter['title']) ?></div>
            </div>
        <?php endforeach; ?>
    </div>
</section>