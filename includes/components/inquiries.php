<div class="inquiries-page">
    <div class="page-header">
        <h2><i class="fas fa-question-circle"></i> My Inquiries</h2>
        <p>Track your product inquiries and their status</p>
    </div>
    
    <div class="inquiries-toolbar">
        <div class="toolbar-left">
            <!-- Toolbar content if needed -->
        </div>
        <div class="group-selector">
            <label for="inquiry-group-by">Group by:</label>
            <select id="inquiry-group-by" onchange="loadInquiries()">
                <option value="via">Inquiry Method</option>
                <option value="date">Date</option>
            </select>
        </div>
    </div>
    
    <div class="loading-overlay" id="inquiries-loading">
        <div class="loading-spinner">
            <div class="loading-spinner-dot"></div>
            <div class="loading-spinner-dot"></div>
            <div class="loading-spinner-dot"></div>
            <div class="loading-spinner-dot"></div>
        </div>
    </div>
    
    <div class="inquiries-container" id="inquiries-container">
        <!-- Inquiries will be loaded here -->
    </div>
</div>