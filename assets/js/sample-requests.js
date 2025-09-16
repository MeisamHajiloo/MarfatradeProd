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
                // Group requests by status
                const groupedRequests = groupRequestsByStatus(result.data);
                
                Object.entries(groupedRequests).forEach(([status, requests]) => {
                    if (requests.length > 0) {
                        const groupSection = createGroupSection(status, requests);
                        container.appendChild(groupSection);
                    }
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

function groupRequestsByStatus(requests) {
    const groups = {
        'pending': [],
        'approved': [],
        'payment': [],
        'shipped': [],
        'delivered': [],
        'cancelled': []
    };
    
    requests.forEach(request => {
        if (groups[request.status]) {
            groups[request.status].push(request);
        }
    });
    
    return groups;
}

function createGroupSection(status, requests) {
    const section = document.createElement('div');
    section.className = 'group-section';
    
    const statusLabels = {
        'pending': 'Pending Requests',
        'approved': 'Approved Requests', 
        'payment': 'Payment Required',
        'shipped': 'Shipped Requests',
        'delivered': 'Delivered Requests',
        'cancelled': 'Cancelled Requests'
    };
    
    section.innerHTML = `
        <div class="group-header">
            <h3 class="group-title">${statusLabels[status]} (${requests.length})</h3>
            <i class="fas fa-chevron-up group-toggle"></i>
        </div>
        <div class="group-content">
            <div class="group-items">
                ${requests.map(request => createRequestCard(request).outerHTML).join('')}
            </div>
        </div>
    `;
    
    // Calculate and set proper height for flexible expansion
    const groupContent = section.querySelector('.group-content');
    const groupItems = section.querySelector('.group-items');
    
    if (groupContent && groupItems) {
        // Set initial height based on content
        const contentHeight = groupItems.scrollHeight;
        groupContent.style.maxHeight = contentHeight + 'px';
    }
    
    // Add click event listener to header
    const header = section.querySelector('.group-header');
    if (header) {
        header.addEventListener('click', function() {
            if (section.classList.contains('collapsed')) {
                // Expanding: set max-height to content height
                const contentHeight = groupItems.scrollHeight;
                groupContent.style.maxHeight = contentHeight + 'px';
            } else {
                // Collapsing: set max-height to 0
                groupContent.style.maxHeight = '0px';
            }
            section.classList.toggle('collapsed');
        });
    }
    
    return section;
}



function createRequestCard(request) {
    const card = document.createElement('div');
    card.className = 'sample-request-item';
    
    const statusSteps = [
        { key: 'pending', label: 'Pending', icon: 'fas fa-clock' },
        { key: 'approved', label: 'Approved', icon: 'fas fa-check' },
        { key: 'payment', label: 'Payment', icon: 'fas fa-credit-card' },
        { key: 'shipped', label: 'Shipped', icon: 'fas fa-shipping-fast' },
        { key: 'delivered', label: 'Delivered', icon: 'fas fa-box-open' }
    ];
    
    const currentStatusIndex = request.status === 'cancelled' ? -1 : statusSteps.findIndex(step => step.key === request.status);
    const isCancelled = request.status === 'cancelled';
    
    card.innerHTML = `
        <div class="sample-request-product">
            <a href="/product?slug=${request.product_slug || ''}" class="product-link">
                <img src="${request.product_image || 'assets/images/no-image.png'}" 
                     alt="${request.product_name}" class="product-image"
                     onerror="this.src='assets/images/no-image.png'">
            </a>
            <div class="sample-request-details">
                <a href="/product?slug=${request.product_slug || ''}" class="product-title-link">
                    <h3>${request.product_name || 'Unknown Product'}</h3>
                </a>
                <div class="sample-request-meta">
                    <div class="sample-request-status">${request.status}</div>
                    <div class="sample-request-date">${formatDate(request.created_at)}</div>
                </div>
                <div class="sample-request-situation">Status: ${capitalizeFirst(request.status)}</div>
            </div>
        </div>
        
        <div class="progress-container">
            <div class="progress-line ${request.status}">
                ${statusSteps.map((step, index) => {
                    let stepClass = '';
                    if (!isCancelled) {
                        if (index < currentStatusIndex) {
                            stepClass = 'completed';
                        } else if (index === currentStatusIndex) {
                            stepClass = 'active';
                        }
                    }
                    
                    return `
                        <div class="progress-step">
                            <div class="step-icon ${stepClass}">
                                <i class="${step.icon}"></i>
                            </div>
                            <div class="step-label ${stepClass}">${step.label}</div>
                            ${(!isCancelled && index === currentStatusIndex) ? `<div class="step-date">${formatDate(request.updated_at)}</div>` : ''}
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
    
    // Auto-scroll to active icon after card is rendered
    setTimeout(() => {
        const progressContainer = card.querySelector('.progress-container');
        const activeIcon = card.querySelector('.step-icon.active');
        
        if (progressContainer && activeIcon) {
            const containerRect = progressContainer.getBoundingClientRect();
            const iconRect = activeIcon.getBoundingClientRect();
            const scrollLeft = iconRect.left - containerRect.left - (containerRect.width / 2) + (iconRect.width / 2);
            
            progressContainer.scrollTo({
                left: progressContainer.scrollLeft + scrollLeft,
                behavior: 'smooth'
            });
        }
    }, 100);
    
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