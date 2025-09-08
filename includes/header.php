<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Marfa Trade In Future</title>
    <link rel="stylesheet" href="assets/css/main.css">
    <link rel="stylesheet" href="assets/css/header.css">
    <link rel="stylesheet" href="assets/css/slider.css">
    <link rel="stylesheet" href="assets/css/footer.css">
    <link rel="stylesheet" href="assets/css/modal.css">
    <link rel="stylesheet" href="assets/css/loading.css" />
    <link rel="stylesheet" href="assets/css/notification.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>

<body>
    <header id="header">
        <div class="topbar">
            <div class="logo">
                <img src="assets/images/logo/AlmarfaLogo.png" alt="Marfa Trade" class="logo-img">
                <span class="logo-text">Marfa Trade</span>
            </div>

            <div class="nav-container">
                <?php include 'navigation.php'; ?>
                
                <!-- Desktop user menu -->
                <div class="desktop-user-menu" id="desktop-user-menu" style="display: none;">
                    <div class="user-avatar" id="user-avatar">
                        <i class="fas fa-user-circle"></i>
                    </div>
                    <div class="user-dropdown" id="user-dropdown">
                        <div class="user-info">
                            <div class="user-name" id="user-display-name">Guest</div>
                            <div class="user-wallet">
                                <i class="fas fa-wallet"></i>
                                <span id="user-wallet-amount">0.00</span>
                            </div>
                        </div>
                        <div class="dropdown-divider"></div>
                        <a href="#" class="dropdown-item">
                            <i class="fas fa-user"></i>
                            <span>Profile</span>
                        </a>
                        <a href="tickets.php" class="dropdown-item">
                            <i class="fas fa-ticket-alt"></i>
                            <span>Support</span>
                        </a>
                        <div class="dropdown-divider"></div>
                        <a href="#" class="dropdown-item" id="logout-button">
                            <i class="fas fa-sign-out-alt"></i>
                            <span>Logout</span>
                        </a>
                    </div>
                </div>
            </div>

            <button class="hamburger" id="hamburger">
                <span></span><span></span><span></span><span></span>
            </button>
        </div>
    </header>
    <?php include 'auth-modal.php'; ?>

    <script src="assets/js/navigation.js"></script>
    <script src="assets/js/auth.js"></script>
    <script src="assets/js/user-menu.js"></script>
    <script>
        // Set active navigation item
        document.addEventListener('DOMContentLoaded', function() {
            const currentPage = window.location.pathname.split('/').pop() || 'index.php';
            const navLinks = document.querySelectorAll('.nav-links a');
            
            navLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href === currentPage || (currentPage === '' && href === 'index.php')) {
                    link.parentElement.classList.add('active');
                }
            });
        });
    </script>
</body>

</html>