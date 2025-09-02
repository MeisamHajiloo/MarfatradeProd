<?php
require_once __DIR__ . '/includes/header.php';

// دریافت شناسه دسته‌بندی از URL (اگر وجود دارد)
$category_id = isset($_GET['category']) ? (int)$_GET['category'] : null;

// عدم بارگذاری اسکریپت‌های slider و counter
$loadSlider = false;
$loadCounter = false;
?>

<main class="products-page">
    <?php include __DIR__ . '/includes/components/products-toolbar.php'; ?>
    <?php include __DIR__ . '/includes/components/products-grid.php'; ?>
</main>

<!-- اسکریپت محصولات -->
<script src="assets/js/products.js"></script>

<!-- استایل اختصاصی محصولات -->
<link rel="stylesheet" href="assets/css/products.css" />

<?php
require_once __DIR__ . '/includes/footer.php';
?>

<style>
    .products-page {
        max-width: 1200px;
        margin: 0 auto;
        padding: 1rem;
    }
</style>

<script>
    // مقداردهی اولیه state.category بر اساس پارامتر URL
    document.addEventListener('DOMContentLoaded', function() {
        <?php if ($category_id): ?>
            // اگر شناسه دسته‌بندی از URL دریافت شده، آن را در state قرار دهید
            if (typeof state !== 'undefined') {
                state.category = <?php echo $category_id; ?>;

                // همچنین مقدار select را نیز تنظیم کنید
                const categorySelect = document.querySelector('select[name=category]');
                if (categorySelect) {
                    categorySelect.value = <?php echo $category_id; ?>;
                }
            }
        <?php endif; ?>
    });
</script>