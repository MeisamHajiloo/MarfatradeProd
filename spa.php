<?php
require_once __DIR__ . '/includes/config/constants.php';
require_once __DIR__ . '/classes/Database.php';
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Marfa Trade In Future</title>
    <link rel="stylesheet" href="assets/css/main.css">
    <link rel="stylesheet" href="assets/css/fields.css">
    <link rel="stylesheet" href="assets/css/button.css">
    <link rel="stylesheet" href="assets/css/header.css">
    <link rel="stylesheet" href="assets/css/slider.css">
    <link rel="stylesheet" href="assets/css/footer.css">
    <link rel="stylesheet" href="assets/css/modal.css">
    <link rel="stylesheet" href="assets/css/loading.css">
    <link rel="stylesheet" href="assets/css/notification.css">
    <link rel="stylesheet" href="assets/css/products.css">
    <link rel="stylesheet" href="assets/css/profile.css">
    <link rel="stylesheet" href="assets/css/tickets.css">
    <link rel="stylesheet" href="assets/css/groups.css">
    <link rel="stylesheet" href="assets/css/about-us.css">
    <link rel="stylesheet" href="assets/css/contact-us.css">
    <link rel="stylesheet" href="assets/css/faq.css">
    <link rel="stylesheet" href="assets/css/spa.css">
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
                <ul class="nav-links" id="nav-links">
                    <!-- User info for mobile -->
                    <li class="mobile-user-info-item" style="display: none;">
                        <div class="mobile-user-header" id="mobile-user-toggle">
                            <div class="mobile-user-avatar">
                                <i class="fas fa-user-circle"></i>
                            </div>
                            <div class="mobile-user-details">
                                <div class="mobile-user-name" id="mobile-nav-user-name">Guest</div>
                            </div>
                            <div class="mobile-user-arrow">
                                <i class="fas fa-chevron-down"></i>
                            </div>
                        </div>
                        <ul class="mobile-user-submenu" id="mobile-user-submenu" style="display: none;">
                            <li class="auth-required">
                                <a href="/profile">
                                    <i class="fas fa-user"></i>
                                    <span>Profile</span>
                                </a>
                            </li>
                            <li class="auth-required">
                                <a href="/tickets">
                                    <i class="fas fa-ticket-alt"></i>
                                    <span>Support</span>
                                </a>
                            </li>
                            <li class="mobile-logout-item auth-required">
                                <a href="#" id="mobile-nav-logout">
                                    <i class="fas fa-sign-out-alt"></i>
                                    <span>Logout</span>
                                </a>
                            </li>
                        </ul>
                    </li>

                    <!-- Regular navigation items -->
                    <li><a href="/">Home</a></li>
                    <li><a href="/products">Products</a></li>
                    <li><a href="/about-us">About Us</a></li>
                    <li><a href="/contact-us">Contact Us</a></li>
                    <li><a href="/faq">FAQ</a></li>

                    <!-- Auth link for non-logged in users -->
                    <li><a href="#" id="auth-link">Sign in / Sign up</a></li>
                </ul>

                <!-- Desktop user menu -->
                <div class="desktop-user-menu" id="desktop-user-menu" style="display: none;">
                    <div class="user-avatar" id="user-avatar">
                        <i class="fas fa-user-circle"></i>
                    </div>
                    <div class="user-dropdown" id="user-dropdown">
                        <div class="user-info">
                            <div class="user-info-avatar" id="user-info-avatar">
                                <i class="fas fa-user-circle"></i>
                            </div>
                            <div class="user-name" id="user-display-name">Guest</div>
                        </div>
                        <div class="dropdown-divider"></div>
                        <a href="/profile" class="dropdown-item auth-required">
                            <i class="fas fa-user"></i>
                            <span>Profile</span>
                        </a>
                        <a href="/tickets" class="dropdown-item auth-required">
                            <i class="fas fa-ticket-alt"></i>
                            <span>Support</span>
                        </a>
                        <div class="dropdown-divider"></div>
                        <a href="#" class="dropdown-item auth-required" id="logout-button">
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

    <!-- Main content area -->
    <div id="main-content">
        <div class="loading-overlay">
            <div class="loading-spinner">
                <div class="loading-spinner-dot"></div>
                <div class="loading-spinner-dot"></div>
                <div class="loading-spinner-dot"></div>
                <div class="loading-spinner-dot"></div>
            </div>
        </div>
    </div>

    <script>
        // Initialize router immediately when available
        function initializeRouter() {
            if (window.router) {
                console.log('Router found, initializing...');
                // Router will handle initial route after auth check
            } else {
                // Retry if router not loaded yet
                setTimeout(initializeRouter, 50);
            }
        }
        initializeRouter();
    </script>

    <?php include 'includes/auth-modal.php'; ?>

    <!-- Privacy Policy Modal -->
    <div id="privacy-modal" class="modal" style="display: none;">
        <div class="modal-content">
            <div class="modal-header">
                <h2>Privacy Policy</h2>
                <span class="close" onclick="closePrivacyModal()">&times;</span>
            </div>
            <div class="modal-body" style="max-height: 400px; overflow-y: auto; padding: 20px;">
                <h3>Information We Collect</h3>
                <p>We collect information you provide directly to us, such as when you create an account, make inquiries, or contact us.</p>

                <h3>How We Use Your Information</h3>
                <p>We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.</p>

                <h3>Information Sharing</h3>
                <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.</p>

                <h3>Data Security</h3>
                <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>

                <h3>Contact Us</h3>
                <p>If you have any questions about this Privacy Policy, please contact us through our contact form.</p>
            </div>
        </div>
    </div>

    <!-- Terms of Service Modal -->
    <div id="terms-modal" class="modal" style="display: none;">
        <div class="modal-content">
            <div class="modal-header">
                <h2>Terms of Service</h2>
                <span class="close" onclick="closeTermsModal()">&times;</span>
            </div>
            <div class="modal-body" style="max-height: 400px; overflow-y: auto; padding: 20px;">
                <h3>Acceptance of Terms</h3>
                <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>

                <h3>Use License</h3>
                <p>Permission is granted to temporarily download one copy of the materials on our website for personal, non-commercial transitory viewing only.</p>

                <h3>Disclaimer</h3>
                <p>The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim all other warranties.</p>

                <h3>Limitations</h3>
                <p>In no event shall our company or its suppliers be liable for any damages arising out of the use or inability to use the materials on our website.</p>

                <h3>Modifications</h3>
                <p>We may revise these terms of service at any time without notice. By using this website, you are agreeing to be bound by the current version of these terms.</p>
            </div>
        </div>
    </div>

    <!-- Inquiry Modal -->
    <div id="inquiry-modal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <div class="modal-header">
                <h2>Product Inquiry</h2>
            </div>
            <div class="modal-body">
                <form id="inquiry-form">
                    <div class="form-group">
                        <label for="inquiry-product">Product</label>
                        <input type="text" id="inquiry-product" readonly>
                    </div>
                    <div class="form-group">
                        <label for="inquiry-name">Your Name</label>
                        <input type="text" id="inquiry-name" required>
                    </div>
                    <div class="form-group">
                        <label for="inquiry-email">Email</label>
                        <input type="email" id="inquiry-email" required>
                    </div>
                    <div class="form-group">
                        <label for="inquiry-message">Message</label>
                        <textarea id="inquiry-message" rows="4" required></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">Send Inquiry</button>
                </form>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <footer class="footer">
        <div class="footer-content">
            <div class="footer-column">
                <h3>Company</h3>
                <ul>
                    <li><a href="/about-us">About Us</a></li>
                    <li><a href="#">Our Team</a></li>
                    <li><a href="#">Careers</a></li>
                    <li><a href="#">Blog</a></li>
                </ul>
            </div>
            <div class="footer-column">
                <h3>Products</h3>
                <ul>
                    <li><a href="/products">Features</a></li>
                    <li><a href="#">Pricing</a></li>
                    <li><a href="#">Integrations</a></li>
                    <li><a href="#">Updates</a></li>
                </ul>
            </div>
            <div class="footer-column">
                <h3>Support</h3>
                <ul>
                    <li><a href="/contact-us">Contact Us</a></li>
                    <li><a href="/faq">FAQ</a></li>
                    <li><a href="#">Help Center</a></li>
                    <li><a href="#">Documentation</a></li>
                </ul>
            </div>
            <div class="footer-column">
                <h3>Legal</h3>
                <ul>
                    <li><a href="#" onclick="openPrivacyModal()">Privacy Policy</a></li>
                    <li><a href="#" onclick="openTermsModal()">Terms of Service</a></li>
                    <li><a href="#">Cookie Policy</a></li>
                    <li><a href="#">GDPR</a></li>
                </ul>
            </div>
            <div class="footer-column">
                <h3>Follow Us</h3>
                <div class="social-links">
                    <a href="#" class="social-link"><i class="fab fa-facebook-f"></i></a>
                    <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
                    <a href="#" class="social-link"><i class="fab fa-linkedin-in"></i></a>
                    <a href="#" class="social-link"><i class="fab fa-instagram"></i></a>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2025 Marfa Trade. All rights reserved.</p>
        </div>
    </footer>

    <!-- Scripts -->
    <script>
        // Prevent duplicate script loading
        if (!window.scriptsLoaded) {
            window.scriptsLoaded = {};
        }
    </script>
    <script src="assets/js/utils.js"></script>
    <script src="assets/js/main.js"></script>
    <script src="assets/js/slider.js"></script>
    <script src="assets/js/counter.js"></script>
    <script src="assets/js/navigation.js"></script>
    <script src="assets/js/user-menu.js"></script>
    <script src="assets/js/auth.js"></script>
    <script src="assets/js/profile-functions.js"></script>
    <script src="app.js"></script>

    <script>
        function openPrivacyModal() {
            document.getElementById('privacy-modal').style.display = 'block';
            document.body.style.overflow = 'hidden';
        }

        function closePrivacyModal() {
            document.getElementById('privacy-modal').style.display = 'none';
            document.body.style.overflow = 'auto';
        }

        function openTermsModal() {
            document.getElementById('terms-modal').style.display = 'block';
            document.body.style.overflow = 'hidden';
        }

        function closeTermsModal() {
            document.getElementById('terms-modal').style.display = 'none';
            document.body.style.overflow = 'auto';
        }

        // Close modals when clicking outside
        window.addEventListener('click', function(e) {
            const privacyModal = document.getElementById('privacy-modal');
            const termsModal = document.getElementById('terms-modal');

            if (e.target === privacyModal) {
                closePrivacyModal();
            }
            if (e.target === termsModal) {
                closeTermsModal();
            }
        });
    </script>
</body>

</html>