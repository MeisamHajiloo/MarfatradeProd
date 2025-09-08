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
                <input type="text" id="ticket-subject" name="subject" maxlength="120" required>
            </div>
            <div class="form-group">
                <label for="ticket-priority">Priority</label>
                <select id="ticket-priority" name="priority">
                    <option value="low">Low</option>
                    <option value="medium" selected>Medium</option>
                    <option value="high">High</option>
                </select>
            </div>
            <div class="form-group">
                <label for="ticket-message">Message</label>
                <textarea id="ticket-message" name="message" rows="5" maxlength="256" required></textarea>
            </div>
            <div class="form-actions">
                <button type="button" class="btn-secondary" id="cancel-ticket">Cancel</button>
                <button type="submit" class="btn-primary">Submit Ticket</button>
            </div>
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