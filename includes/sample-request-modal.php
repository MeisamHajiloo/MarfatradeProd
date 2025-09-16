<div id="sample-request-modal" class="modal">
    <div class="modal-content step-modal">
        <span class="close" onclick="closeSampleRequestModal()">&times;</span>
        
        <!-- Progress Bar -->
        <div class="step-progress">
            <div class="step active" data-step="1">1</div>
            <div class="step" data-step="2">2</div>
            <div class="step" data-step="3">3</div>
        </div>
        
        <form id="sample-request-form" class="auth-form" novalidate>
            <input type="hidden" id="sample-product-id" name="product_id">
            
            <!-- Step 1: Personal Info -->
            <div class="step-content active" data-step="1">
                <div class="auth-header">
                    <i class="fas fa-user auth-icon"></i>
                    <h2>Personal Information</h2>
                    <p>Tell us about yourself</p>
                </div>
                
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
                        <input type="tel" id="sample-phone" name="phone" placeholder="Phone Number" required>
                    </div>
                </div>
                
                <div class="form-group">
                    <div class="input-wrapper">
                        <i class="fas fa-building input-icon"></i>
                        <input type="text" id="sample-company" name="company_name" placeholder="Company Name">
                    </div>
                </div>
            </div>
            
            <!-- Step 2: Address Info -->
            <div class="step-content" data-step="2">
                <div class="auth-header">
                    <i class="fas fa-map-marker-alt auth-icon"></i>
                    <h2>Shipping Address</h2>
                    <p>Where should we send the sample?</p>
                </div>
                
                <div class="form-group">
                    <div class="input-wrapper">
                        <i class="fas fa-map-marker-alt input-icon"></i>
                        <input type="text" id="sample-address" name="address" placeholder="Street Address" required>
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
                        <input type="text" id="sample-postal-code" name="postal_code" placeholder="Postal Code" required>
                    </div>
                </div>
                
                <div class="form-group">
                    <div class="input-wrapper">
                        <i class="fas fa-globe input-icon"></i>
                        <input type="text" id="sample-country" name="country" placeholder="Country" required>
                    </div>
                </div>
            </div>
            
            <!-- Step 3: Additional Info -->
            <div class="step-content" data-step="3">
                <div class="auth-header">
                    <i class="fas fa-clipboard auth-icon"></i>
                    <h2>Additional Information</h2>
                    <p>Tell us more about your request</p>
                </div>
                
                <div class="form-group">
                    <div class="input-wrapper">
                        <i class="fas fa-clipboard input-icon"></i>
                        <textarea id="sample-purpose" name="purpose" placeholder="Any information we need to consider before sending (optional)" rows="4"></textarea>
                    </div>
                </div>
            </div>
            
            <!-- Navigation Buttons -->
            <div class="step-navigation">
                <button type="button" id="prev-step" class="btn-primary" style="display: none;">Previous</button>
                <button type="button" id="next-step" class="btn-primary">Next</button>
                <button type="submit" id="submit-request" class="btn-primary" style="display: none;">
                    <i class="fas fa-paper-plane"></i>
                    Submit Request
                </button>
            </div>
        </form>
    </div>
</div>