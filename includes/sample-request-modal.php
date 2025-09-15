<div id="sample-request-modal" class="modal">
    <div class="modal-content">
        <span class="close" onclick="closeSampleRequestModal()">&times;</span>
        <div class="auth-header">
            <i class="fas fa-vial auth-icon"></i>
            <h2>Request Sample</h2>
            <p>Fill out the form to request a product sample</p>
        </div>
        <form id="sample-request-form" class="auth-form">
            <input type="hidden" id="sample-product-id" name="product_id">
            
            <div class="form-group">
                <div class="input-wrapper">
                    <i class="fas fa-user input-icon"></i>
                    <input type="text" id="sample-full-name" name="full_name" placeholder="Full Name" required>
                </div>
            </div>
            
            <div class="form-group">
                <div class="input-wrapper">
                    <i class="fas fa-envelope input-icon"></i>
                    <input type="email" id="sample-email" name="email" placeholder="Email Address" required>
                </div>
            </div>
            
            <div class="form-group">
                <div class="input-wrapper">
                    <i class="fas fa-phone input-icon"></i>
                    <input type="tel" id="sample-phone" name="phone" placeholder="Phone Number">
                </div>
            </div>
            
            <div class="form-group">
                <div class="input-wrapper">
                    <i class="fas fa-building input-icon"></i>
                    <input type="text" id="sample-company" name="company_name" placeholder="Company Name">
                </div>
            </div>
            
            <div class="form-group">
                <div class="input-wrapper">
                    <i class="fas fa-map-marker-alt input-icon"></i>
                    <textarea id="sample-address" name="address" placeholder="Address" required></textarea>
                </div>
            </div>
            
            <div class="form-group">
                <div class="input-wrapper">
                    <i class="fas fa-city input-icon"></i>
                    <input type="text" id="sample-city" name="city" placeholder="City" required>
                </div>
            </div>
            
            <div class="form-group">
                <div class="input-wrapper">
                    <i class="fas fa-map input-icon"></i>
                    <input type="text" id="sample-state" name="state" placeholder="State/Province">
                </div>
            </div>
            
            <div class="form-group">
                <div class="input-wrapper">
                    <i class="fas fa-mail-bulk input-icon"></i>
                    <input type="text" id="sample-postal-code" name="postal_code" placeholder="Postal Code">
                </div>
            </div>
            
            <div class="form-group">
                <div class="input-wrapper">
                    <i class="fas fa-globe input-icon"></i>
                    <input type="text" id="sample-country" name="country" placeholder="Country" required>
                </div>
            </div>
            
            <div class="form-group">
                <div class="input-wrapper">
                    <i class="fas fa-clipboard input-icon"></i>
                    <textarea id="sample-purpose" name="purpose" placeholder="Purpose of sample request (optional)"></textarea>
                </div>
            </div>
            
            <button type="submit" class="btn-primary">
                <i class="fas fa-paper-plane"></i>
                Submit Request
            </button>
        </form>
    </div>
</div>