<?php
require_once __DIR__ . '/includes/config/constants.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Us - Marfa Trade</title>
    <link rel="stylesheet" href="assets/css/main.css">
    <link rel="stylesheet" href="assets/css/header.css">
    <link rel="stylesheet" href="assets/css/footer.css">
    <link rel="stylesheet" href="assets/css/contact-us.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
<?php include 'includes/header.php'; ?>

<main>
    <div class="page-container">
        <div class="page-header">
            <h1>Contact Us</h1>
            <p>Get in touch with our team</p>
        </div>
        
        <div class="contact-content">
            <div class="contact-form">
                <h2>Send us a message</h2>
                <form id="contact-form">
                    <input type="text" placeholder="Your Name" required>
                    <input type="email" placeholder="Your Email" required>
                    <input type="text" placeholder="Subject" required>
                    <textarea placeholder="Your Message" rows="6" required></textarea>
                    <button type="submit">Send Message</button>
                </form>
            </div>
            
            <div class="contact-info">
                <h2>Contact Information</h2>
                <div class="info-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <p>123 Business Street, City, Country</p>
                </div>
                <div class="info-item">
                    <i class="fas fa-phone"></i>
                    <p>+1 234 567 8900</p>
                </div>
                <div class="info-item">
                    <i class="fas fa-envelope"></i>
                    <p>info@marfatrade.com</p>
                </div>
            </div>
        </div>
    </div>
</main>

<?php include 'includes/footer.php'; ?>
</body>
</html>