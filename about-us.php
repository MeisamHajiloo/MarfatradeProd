<?php
require_once __DIR__ . '/includes/config/constants.php';
require_once __DIR__ . '/classes/Database.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>About Us - Marfa Trade</title>
    <link rel="stylesheet" href="assets/css/main.css">
    <link rel="stylesheet" href="assets/css/header.css">
    <link rel="stylesheet" href="assets/css/footer.css">
    <link rel="stylesheet" href="assets/css/about-us.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
<?php include 'includes/header.php'; ?>

<main>
    <div class="page-container">
        <div class="page-header">
            <h1>About Us</h1>
            <p>Learn more about Marfa Trade and our mission</p>
        </div>

        <div class="content-section">
            <div class="about-content">
                <div class="about-text">
                    <h2>Our Story</h2>
                    <p>Marfa Trade has been a leading provider of innovative solutions for businesses worldwide. Founded with a vision to transform the trading industry, we have consistently delivered excellence and reliability to our clients.</p>

                    <h2>Our Mission</h2>
                    <p>To provide cutting-edge trading solutions that empower businesses to achieve their goals while maintaining the highest standards of quality and customer service.</p>

                    <h2>Our Values</h2>
                    <ul>
                        <li><strong>Innovation:</strong> We continuously evolve to meet changing market demands</li>
                        <li><strong>Quality:</strong> We deliver only the best products and services</li>
                        <li><strong>Reliability:</strong> Our clients can count on us for consistent performance</li>
                        <li><strong>Customer Focus:</strong> Your success is our priority</li>
                    </ul>
                </div>

                <div class="about-stats">
                    <div class="stat-item">
                        <h3>14+</h3>
                        <p>Years of Experience</p>
                    </div>
                    <div class="stat-item">
                        <h3>26+</h3>
                        <p>Happy Buyers</p>
                    </div>
                    <div class="stat-item">
                        <h3>1000+</h3>
                        <p>Delivered Items</p>
                    </div>
                    <div class="stat-item">
                        <h3>7+</h3>
                        <p>Countries</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>

<?php include 'includes/footer.php'; ?>
</body>
</html>