// Sample Request Modal Functions
let currentStep = 1;
const totalSteps = 3;

function openSampleRequestModal(productId) {
    const modal = document.getElementById('sample-request-modal');
    const productIdInput = document.getElementById('sample-product-id');
    
    if (modal && productIdInput) {
        productIdInput.value = productId;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Reset to first step
        currentStep = 1;
        showStep(currentStep);
        
        // Pre-fill user data if logged in
        if (window.currentUser) {
            const nameInput = document.getElementById('sample-full-name');
            const emailInput = document.getElementById('sample-email');
            
            if (nameInput && window.currentUser.name) {
                nameInput.value = window.currentUser.name;
            }
            if (emailInput && window.currentUser.email) {
                emailInput.value = window.currentUser.email;
            }
        }
    }
}

function closeSampleRequestModal() {
    const modal = document.getElementById('sample-request-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Reset form and step
        const form = document.getElementById('sample-request-form');
        if (form) {
            form.reset();
        }
        
        // Clear error styling
        modal.querySelectorAll('.field-error').forEach(field => field.classList.remove('field-error'));
        
        currentStep = 1;
        showStep(currentStep);
    }
}

function showStep(step) {
    // Hide all steps
    document.querySelectorAll('.step-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Show current step
    const currentContent = document.querySelector(`.step-content[data-step="${step}"]`);
    if (currentContent) {
        currentContent.classList.add('active');
    }
    
    // Update progress
    document.querySelectorAll('.step-progress .step').forEach((stepEl, index) => {
        stepEl.classList.toggle('active', index + 1 <= step);
    });
    
    // Update navigation buttons
    const prevBtn = document.getElementById('prev-step');
    const nextBtn = document.getElementById('next-step');
    const submitBtn = document.getElementById('submit-request');
    
    prevBtn.style.display = step > 1 ? 'block' : 'none';
    nextBtn.style.display = step < totalSteps ? 'block' : 'none';
    submitBtn.style.display = step === totalSteps ? 'block' : 'none';
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateStep(step) {
    const stepContent = document.querySelector(`.step-content[data-step="${step}"]`);
    const requiredFields = stepContent.querySelectorAll('input[required], textarea[required]');
    let emptyFields = [];
    let invalidFields = [];
    
    // Clear previous errors
    stepContent.querySelectorAll('.field-error').forEach(field => field.classList.remove('field-error'));
    
    for (let field of requiredFields) {
        if (!field.value.trim()) {
            field.classList.add('field-error');
            emptyFields.push(field.placeholder || 'Field');
        } else if (field.type === 'email' && !isValidEmail(field.value.trim())) {
            field.classList.add('field-error');
            invalidFields.push('Valid email address');
        } else {
            field.classList.remove('field-error');
        }
    }
    
    if (emptyFields.length > 0) {
        if (window.AppUtils && window.AppUtils.showNotification) {
            window.AppUtils.showNotification(`Please fill in: ${emptyFields.join(', ')}`, 'error');
        }
        return false;
    }
    
    if (invalidFields.length > 0) {
        if (window.AppUtils && window.AppUtils.showNotification) {
            window.AppUtils.showNotification(`Please enter: ${invalidFields.join(', ')}`, 'error');
        }
        return false;
    }
    
    return true;
}

// Add real-time validation for sample request modal
function addRealTimeValidation() {
    const modal = document.getElementById('sample-request-modal');
    if (!modal) return;
    
    const requiredFields = modal.querySelectorAll('input[required], textarea[required]');
    
    requiredFields.forEach(field => {
        field.addEventListener('input', function() {
            if (this.value.trim()) {
                if (this.type === 'email') {
                    if (isValidEmail(this.value.trim())) {
                        this.classList.remove('field-error');
                    }
                } else {
                    this.classList.remove('field-error');
                }
            }
        });
        
        field.addEventListener('blur', function() {
            if (!this.value.trim()) {
                this.classList.add('field-error');
            } else if (this.type === 'email' && !isValidEmail(this.value.trim())) {
                this.classList.add('field-error');
            }
        });
    });
}

// Handle form submission and navigation
document.addEventListener('DOMContentLoaded', function() {
    // Initialize real-time validation
    addRealTimeValidation();
    const form = document.getElementById('sample-request-form');
    const prevBtn = document.getElementById('prev-step');
    const nextBtn = document.getElementById('next-step');
    const submitBtn = document.getElementById('submit-request');
    
    // Next button
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            if (validateStep(currentStep)) {
                currentStep++;
                showStep(currentStep);
            }
        });
    }
    
    // Previous button
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentStep--;
            showStep(currentStep);
        });
    }
    
    // Form submission
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            if (!validateStep(currentStep)) return;
            
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
            submitBtn.disabled = true;
            
            try {
                const formData = new FormData(form);
                const data = Object.fromEntries(formData.entries());
                
                const response = await fetch('api/products/request-sample.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });
                
                const responseText = await response.text();
                let result;
                try {
                    result = JSON.parse(responseText);
                } catch (parseError) {
                    console.error('JSON parse error:', parseError);
                    console.error('Response text:', responseText);
                    throw new Error('Invalid server response');
                }
                
                if (result.success) {
                    if (window.AppUtils && window.AppUtils.showNotification) {
                        window.AppUtils.showNotification(result.message, 'success');
                    }
                    closeSampleRequestModal();
                } else {
                    if (window.AppUtils && window.AppUtils.showNotification) {
                        window.AppUtils.showNotification(result.message, 'error');
                    }
                }
                
            } catch (error) {
                console.error('Sample request error:', error);
                if (window.AppUtils && window.AppUtils.showNotification) {
                    window.AppUtils.showNotification('An error occurred while submitting your request', 'error');
                }
            } finally {
                // Reset button state
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }
    
    // Close modal when clicking outside
    const modal = document.getElementById('sample-request-modal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeSampleRequestModal();
            }
        });
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeSampleRequestModal();
    }
});