// Sample Request Modal Functions
function openSampleRequestModal(productId) {
    const modal = document.getElementById('sample-request-modal');
    const productIdInput = document.getElementById('sample-product-id');
    
    if (modal && productIdInput) {
        productIdInput.value = productId;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
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
        
        // Reset form
        const form = document.getElementById('sample-request-form');
        if (form) {
            form.reset();
        }
    }
}

// Handle form submission
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('sample-request-form');
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
            submitBtn.disabled = true;
            
            try {
                const formData = new FormData(form);
                const data = Object.fromEntries(formData.entries());
                
                const response = await fetch('/api/products/request-sample.php', {
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