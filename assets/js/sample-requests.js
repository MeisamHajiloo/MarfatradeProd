// Sample Requests Page Functions
async function loadSampleRequests() {
    const loading = document.getElementById('sample-requests-loading');
    const container = document.getElementById('sample-requests-container');
    
    if (!loading || !container) return;
    
    loading.style.display = 'flex';
    container.innerHTML = '';
    
    try {
        const response = await fetch('/api/profile/sample-requests.php');
        const result = await response.json();
        
        if (result.success) {
            if (result.data.length === 0) {
                container.innerHTML = `
                    <div class="no-requests">
                        <i class="fas fa-vial"></i>
                        <h3>No Sample Requests</h3>
                        <p>You haven't requested any samples yet.</p>
                    </div>
                `;
            } else {
                result.data.forEach(request => {
                    container.appendChild(createRequestCard(request));
                });
            }
        } else {
            container.innerHTML = `<div class="error">Error loading sample requests</div>`;
        }
    } catch (error) {
        console.error('Error loading sample requests:', error);
        container.innerHTML = `<div class="error">Error loading sample requests</div>`;
    } finally {
        loading.style.display = 'none';
    }
}

function createRequestCard(request) {
    const card = document.createElement('div');
    card.className = 'sample-request-card';
    
    const statusSteps = [
        { key: 'pending', label: 'Pending', icon: 'fas fa-clock' },
        { key: 'approved', label: 'Approved', icon: 'fas fa-check' },
        { key: 'payment', label: 'Payment', icon: 'fas fa-credit-card' },
        { key: 'shipped', label: 'Shipped', icon: 'fas fa-shipping-fast' },
        { key: 'delivered', label: 'Delivered', icon: 'fas fa-box-open' }
    ];
    
    const currentStatusIndex = statusSteps.findIndex(step => step.key === request.status);
    const isCancelled = request.status === 'cancelled';
    
    card.innerHTML = `
        <div class="request-header">
            <a href="/product?slug=${request.product_slug || ''}" class="product-link">
                <img src="${request.product_image || 'assets/images/no-image.png'}" 
                     alt="${request.product_name}" class="product-image"
                     onerror="this.src='assets/images/no-image.png'">
            </a>
            <div class="request-info">
                <a href="/product?slug=${request.product_slug || ''}" class="product-title-link">
                    <h3>${request.product_name || 'Unknown Product'}</h3>
                </a>
                <div class="request-date">Requested on ${formatDate(request.created_at)}</div>
            </div>
        </div>
        
        <div class="progress-container">
            <div class="progress-line ${request.status}">
                ${statusSteps.map((step, index) => {
                    let stepClass = '';
                    if (isCancelled) {
                        stepClass = index === 0 ? 'cancelled' : '';
                    } else if (index < currentStatusIndex) {
                        stepClass = 'completed';
                    } else if (index === currentStatusIndex) {
                        stepClass = 'active';
                    }
                    
                    return `
                        <div class="progress-step">
                            <div class="step-icon ${stepClass}">
                                <i class="${step.icon}"></i>
                            </div>
                            <div class="step-label ${stepClass}">${step.label}</div>
                            ${(index === currentStatusIndex || (isCancelled && index === 0)) ? `<div class="step-date">${formatDate(request.updated_at)}</div>` : ''}
                        </div>
                    `;
                }).join('')}
                ${isCancelled ? `
                    <div class="progress-step">
                        <div class="step-icon cancelled">
                            <i class="fas fa-times"></i>
                        </div>
                        <div class="step-label cancelled">Cancelled</div>
                        <div class="step-date">${formatDate(request.updated_at)}</div>
                    </div>
                ` : ''}
            </div>
        </div>
        
        <div class="request-details">
            <div class="detail-item">
                <div class="detail-label">Full Name</div>
                <div class="detail-value">${request.full_name}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Email</div>
                <div class="detail-value">${request.email}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Company</div>
                <div class="detail-value">${request.company_name || 'N/A'}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">City</div>
                <div class="detail-value">${request.city}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Country</div>
                <div class="detail-value">${request.country}</div>
            </div>

        </div>
    `;
    
    return card;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname === '/sample-requests') {
        loadSampleRequests();
    }
});

// Export for manual initialization
window.loadSampleRequests = loadSampleRequests;