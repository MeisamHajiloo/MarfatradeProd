<ul class="nav-links" id="nav-links">
    <!-- User info for mobile -->
    <li class="mobile-user-info-item" style="display: none;">
        <div class="mobile-user-header" id="mobile-user-toggle">
            <div class="mobile-user-avatar">
                <i class="fas fa-user-circle"></i>
            </div>
            <div class="mobile-user-details">
                <div class="mobile-user-name" id="mobile-nav-user-name">Guest</div>
                <div class="mobile-user-wallet">
                    <i class="fas fa-wallet"></i>
                    <span id="mobile-nav-wallet-amount">0.00</span>
                </div>
            </div>
            <div class="mobile-user-arrow">
                <i class="fas fa-chevron-down"></i>
            </div>
        </div>
        <ul class="mobile-user-submenu" id="mobile-user-submenu" style="display: none;">
            <li>
                <a href="#">
                    <i class="fas fa-user"></i>
                    <span>Profile</span>
                </a>
            </li>
            <li>
                <a href="tickets.php">
                    <i class="fas fa-ticket-alt"></i>
                    <span>Support</span>
                </a>
            </li>
            <li class="mobile-logout-item">
                <a href="#" id="mobile-nav-logout">
                    <i class="fas fa-sign-out-alt"></i>
                    <span>Logout</span>
                </a>
            </li>
        </ul>
    </li>

    <!-- Regular navigation items -->
    <li><a href="index.php">Home</a></li>
    <li><a href="products.php">Products</a></li>
    <li><a href="#">About Us</a></li>
    <li><a href="#">Contact Us</a></li>
    <li><a href="#">FAQ</a></li>

    <!-- Auth link for non-logged in users -->
    <li><a href="#" id="auth-link">Sign in / Sign up</a></li>
</ul>