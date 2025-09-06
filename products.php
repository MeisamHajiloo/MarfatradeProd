<?php
require_once __DIR__ . '/includes/header.php';

// Get category ID from URL (if exists)
$category_id = isset($_GET['category']) ? (int)$_GET['category'] : null;

// Don't load slider and counter scripts
$loadSlider = false;
$loadCounter = false;
?>

<main class="products-page">
    <?php include __DIR__ . '/includes/components/products-toolbar.php'; ?>
    <?php include __DIR__ . '/includes/components/products-grid.php'; ?>
</main>

<!-- Products script -->
<script src="assets/js/products.js"></script>

<!-- Products specific style -->
<link rel="stylesheet" href="assets/css/products.css" />
<link rel="stylesheet" href="assets/css/loading.css" />

<?php
require_once __DIR__ . '/includes/footer.php';
?>

<style>
    .products-page {
        max-width: 1200px;
        margin: 30px auto;
        padding: 1rem;
    }
</style>

<script>
    // Initialize state.category based on URL parameter
    document.addEventListener('DOMContentLoaded', function() {
        <?php if ($category_id): ?>
            // If category ID is received from URL, set it in state
            if (typeof state !== 'undefined') {
                state.category = <?php echo $category_id; ?>;

                // Also set the select value
                const categorySelect = document.querySelector('select[name=category]');
                if (categorySelect) {
                    categorySelect.value = <?php echo $category_id; ?>;
                }
            }
        <?php endif; ?>
    });
</script>