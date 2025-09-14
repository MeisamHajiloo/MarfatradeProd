<div id="auth-modal" class="modal">
    <div class="modal-content">
        <div id="login" class="tab-content active">
            <div class="auth-header">
                <i class="fas fa-sign-in-alt auth-icon"></i>
                <h2>Welcome Back</h2>
                <p>Sign in to your account</p>
            </div>
            <form id="login-form" class="auth-form">
                <div class="form-group">
                    <div class="input-wrapper">
                        <i class="fas fa-envelope input-icon"></i>
                        <input type="email" id="login-email" name="email" placeholder="Enter your email" required>
                    </div>
                </div>
                <div class="form-group">
                    <div class="input-wrapper">
                        <i class="fas fa-lock input-icon"></i>
                        <input type="password" id="login-password" name="password" placeholder="Enter your password" required>
                    </div>
                </div>
                <button type="submit" class="btn-primary">
                    <i class="fas fa-sign-in-alt"></i>
                    Sign In
                </button>
                <p class="signup-link">If you are not verified user <a href="#" id="switch-to-register">sign up</a></p>
            </form>
        </div>

        <div id="register" class="tab-content">
            <div class="auth-header">
                <i class="fas fa-user-plus auth-icon"></i>
                <h2>Create Account</h2>
                <p>Join us today</p>
            </div>
            <form id="register-form" class="auth-form">
                <div class="form-group">
                    <div class="input-wrapper">
                        <i class="fas fa-user input-icon"></i>
                        <input type="text" id="register-name" name="name" placeholder="Enter your full name" required>
                    </div>
                </div>
                <div class="form-group">
                    <div class="input-wrapper">
                        <i class="fas fa-envelope input-icon"></i>
                        <input type="email" id="register-email" name="email" placeholder="Enter your email" required>
                    </div>
                </div>
                <div class="form-group">
                    <div class="input-wrapper">
                        <i class="fas fa-lock input-icon"></i>
                        <input type="password" id="register-password" name="password" placeholder="Enter your password" required minlength="6">
                    </div>
                </div>
                <div class="form-group">
                    <div class="input-wrapper">
                        <i class="fas fa-lock input-icon"></i>
                        <input type="password" id="register-confirm-password" name="confirm_password" placeholder="Confirm your password" required>
                    </div>
                </div>
                <label class="checkbox-container">
                    I agree to the <a href="#" onclick="openTermsModal()">Terms of Service</a> and <a href="#" onclick="openPrivacyModal()">Privacy Policy</a>
                    <input type="checkbox" id="terms-acceptance" required>
                </label>
                <button type="submit" class="btn-primary">
                    <i class="fas fa-user-plus"></i>
                    Sign Up
                </button>
                <p class="signin-link">Already have an account? <a href="#" id="switch-to-login">Sign in</a></p>
            </form>
        </div>
    </div>
</div>