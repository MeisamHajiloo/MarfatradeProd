// Inquiries Page Functions
async function loadInquiries() {
    const loading = document.getElementById('inquiries-loading');
    const container = document.getElementById('inquiries-container');
    
    if (!loading || !container) return;
    
    loading.style.display = 'flex';
    container.innerHTML = '';
    
    try {
        const response = await fetch('/api/profile/inquiries.php');
        const result = await response.json();
        
        if (result.success) {
            if (result.inquiries.length === 0) {
                container.innerHTML = `
                    <div class="no-data">
                        <i class="fas fa-question-circle"></i>
                        <h3>No Inquiries</h3>
                        <p>You haven't made any product inquiries yet.</p>
                    </div>
                `;
            } else {
                // Group inquiries by method
                const groupedInquiries = groupInquiriesByMethod(result.inquiries);
                
                Object.entries(groupedInquiries).forEach(([method, inquiries]) => {
                    if (inquiries.length > 0) {
                        const groupSection = createInquiryGroupSection(method, inquiries);
                        container.appendChild(groupSection);
                    }
                });
            }
        } else {
            container.innerHTML = `<div class="error">Error loading inquiries</div>`;
        }
    } catch (error) {
        console.error('Error loading inquiries:', error);
        container.innerHTML = `<div class="error">Error loading inquiries</div>`;
    } finally {
        loading.style.display = 'none';
    }
}

function groupInquiriesByMethod(inquiries) {
    const groups = {
        'whatsapp': [],
        'telegram': [],
        'other': []
    };
    
    inquiries.forEach(inquiry => {
        const method = inquiry.inquiry_via || 'other';
        if (groups[method]) {
            groups[method].push(inquiry);
        } else {
            groups['other'].push(inquiry);
        }
    });
    
    return groups;
}

function createInquiryGroupSection(method, inquiries) {
    const section = document.createElement('div');
    section.className = 'group-section';
    
    const methodLabels = {
        'whatsapp': 'WhatsApp Inquiries',
        'telegram': 'Telegram Inquiries',
        'other': 'Other Inquiries'
    };
    
    section.innerHTML = `
        <div class="group-header">
            <h3 class="group-title">${methodLabels[method]} (${inquiries.length})</h3>
            <i class="fas fa-chevron-up group-toggle"></i>
        </div>
        <div class="group-content">
            <div class="group-items">
                ${inquiries.map(inquiry => createInquiryCard(inquiry).outerHTML).join('')}
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

function createInquiryCard(inquiry) {
    const card = document.createElement('div');
    card.className = 'inquiry-item';
    
    card.innerHTML = `
        <div class="inquiry-product">
            <a href="/product?slug=${inquiry.product_slug || ''}" class="product-link">
                <img src="${inquiry.thumbnail || 'assets/images/no-image.png'}" 
                     alt="${inquiry.product_name}" class="product-image"
                     onerror="this.src='assets/images/no-image.png'">
            </a>
            <div class="inquiry-details">
                <a href="/product?slug=${inquiry.product_slug || ''}" class="product-title-link">
                    <h3>${inquiry.product_name || 'Unknown Product'}</h3>
                </a>
                <div class="inquiry-meta">
                    <div class="inquiry-via">${inquiry.inquiry_via || 'Unknown'}</div>
                    <div class="inquiry-date">${formatDate(inquiry.inquiry_date)}</div>
                </div>
                <div class="inquiry-situation">Category: ${inquiry.category_name || 'Uncategorized'}</div>
            </div>
        </div>
        <div class="inquiry-actions">
            <button class="delete-inquiry-btn" onclick="deleteInquiry(${inquiry.id})" title="Delete Inquiry">
                <i class="fas fa-trash"></i>
            </button>
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

async function deleteInquiry(inquiryId) {
    if (!confirm('Are you sure you want to delete this inquiry?')) {
        return;
    }
    
    try {
        const response = await fetch('/api/profile/delete-inquiry.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ inquiry_id: inquiryId })
        });
        
        const result = await response.json();
        
        if (result.success) {
            AppUtils.showNotification('Inquiry deleted successfully', 'success');
            loadInquiries(); // Reload the list
        } else {
            AppUtils.showNotification(result.message || 'Error deleting inquiry', 'error');
        }
    } catch (error) {
        console.error('Error deleting inquiry:', error);
        AppUtils.showNotification('Error deleting inquiry', 'error');
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname === '/inquiries') {
        loadInquiries();
    }
});

// Export for manual initialization
window.loadInquiries = loadInquiries;