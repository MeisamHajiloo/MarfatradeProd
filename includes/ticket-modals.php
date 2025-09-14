<!-- New Ticket Modal -->
<div class="modal" id="new-ticket-modal">
    <div class="modal-content">
        <div class="modal-header">
            <h2>New Ticket</h2>
            <span class="close">&times;</span>
        </div>
        <form id="new-ticket-form">
            <div class="form-group">
                <label for="ticket-subject">Subject</label>
                <div class="input-wrapper">
                    <i class="fas fa-tag input-icon"></i>
                    <input type="text" id="ticket-subject" name="subject" maxlength="120" placeholder="Enter ticket subject" required>
                </div>
            </div>
            <div class="form-group">
                <label for="ticket-priority">Priority</label>
                <div class="input-wrapper">
                    <i class="fas fa-exclamation-circle input-icon"></i>
                    <select id="ticket-priority" name="priority" required>
                        <option value="low">Low</option>
                        <option value="medium" selected>Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label for="ticket-message">Message</label>
                <div class="input-wrapper">
                    <i class="fas fa-comment input-icon"></i>
                    <textarea id="ticket-message" name="message" rows="5" maxlength="2048" placeholder="Describe your issue" required></textarea>
                </div>
            </div>
            <button type="submit" class="btn-primary">
                <i class="fas fa-paper-plane"></i>
                Submit Ticket
            </button>
        </form>
    </div>
</div>

<!-- Ticket Detail Modal -->
<div class="modal" id="ticket-detail-modal">
    <div class="modal-content">
        <div class="modal-header">
            <h2 id="ticket-detail-subject"></h2>
            <span class="close">&times;</span>
        </div>
        <div id="ticket-detail-content"></div>
    </div>
</div>