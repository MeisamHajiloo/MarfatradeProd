<div id="auth-modal" class="modal">
    <div class="modal-content">
        <span class="close">&times;</span>

        <div class="auth-tabs">
            <button class="tab-link active" data-tab="login">Sign In</button>
            <button class="tab-link" data-tab="register">Sign Up</button>
        </div>

        <div id="login" class="tab-content active">
            <form id="login-form" class="auth-form">
                <div class="form-group">
                    <label for="login-email">Email</label>
                    <input type="email" id="login-email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="login-password">Password</label>
                    <input type="password" id="login-password" name="password" required>
                </div>
                <button type="submit" class="btn-primary">Sign In</button>
            </form>
        </div>

        <div id="register" class="tab-content">
            <form id="register-form" class="auth-form">
                <div class="form-group">
                    <label for="register-name">Full Name</label>
                    <input type="text" id="register-name" name="name" required>
                </div>
                <div class="form-group">
                    <label for="register-email">Email</label>
                    <input type="email" id="register-email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="register-password">Password</label>
                    <input type="password" id="register-password" name="password" required minlength="6">
                </div>
                <div class="form-group">
                    <label for="register-confirm-password">Confirm Password</label>
                    <input type="password" id="register-confirm-password" name="confirm_password" required>
                </div>
                <button type="submit" class="btn-primary">Sign Up</button>
            </form>
        </div>
    </div>
</div>