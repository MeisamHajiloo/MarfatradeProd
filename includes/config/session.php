<?php
// Session configuration for production environment
function initializeSession() {
    // Only start session if not already started
    if (session_status() === PHP_SESSION_NONE) {
        // Session security settings
        ini_set('session.cookie_httponly', 1);
        ini_set('session.use_only_cookies', 1);
        ini_set('session.cookie_secure', 0); // Set to 1 if using HTTPS
        ini_set('session.cookie_lifetime', 86400); // 24 hours
        ini_set('session.gc_maxlifetime', 86400); // 24 hours
        
        // Session name for better security
        session_name('MARFA_SESSION');
        
        // Start the session
        session_start();
        
        // Regenerate session ID periodically for security
        if (!isset($_SESSION['last_regeneration'])) {
            $_SESSION['last_regeneration'] = time();
        } elseif (time() - $_SESSION['last_regeneration'] > 300) { // 5 minutes
            session_regenerate_id(true);
            $_SESSION['last_regeneration'] = time();
        }
    }
}

// Function to check if user is logged in
function isUserLoggedIn() {
    return isset($_SESSION['logged_in']) && 
           $_SESSION['logged_in'] === true && 
           isset($_SESSION['user_id']) && 
           !empty($_SESSION['user_id']);
}

// Function to get current user ID
function getCurrentUserId() {
    if (isUserLoggedIn()) {
        return (int)$_SESSION['user_id'];
    }
    return 0;
}
?>