<?php
require_once __DIR__ . '/includes/header.php';
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