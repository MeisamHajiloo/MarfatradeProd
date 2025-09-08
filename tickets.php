<?php
require_once 'includes/config/constants.php';
require_once 'includes/config/session.php';
require_once 'classes/Database.php';

// Initialize session
initializeSession();

// Check if user is logged in
if (!isUserLoggedIn()) {
    header('Location: index.php');
    exit();
}

$database = new Database(DB_HOST, DB_NAME, DB_USER, DB_PASS);
$conn = $database->getConnection();

// Get grouping method from URL parameter
$groupBy = $_GET['group'] ?? 'status';
?>

<?php include 'includes/header.php'; ?>

<link rel="stylesheet" href="assets/css/tickets.css">
<link rel="stylesheet" href="assets/css/loading.css">

<main class="main-content">
    <div class="container">
        <div class="tickets-header">
            <h1>Support Tickets</h1>
            <div style="display: flex; align-items: center; gap: 15px;">
                <select id="group-by" onchange="changeGrouping(this.value)" style="padding: 8px 12px; border-radius: 5px; border: 1px solid #ddd;">
                    <option value="status" <?php echo $groupBy === 'status' ? 'selected' : ''; ?>>Group by Status</option>
                    <option value="priority" <?php echo $groupBy === 'priority' ? 'selected' : ''; ?>>Group by Priority</option>
                    <option value="date" <?php echo $groupBy === 'date' ? 'selected' : ''; ?>>Group by Date</option>
                </select>
                <button class="btn-primary" id="new-ticket-btn">
                    <i class="fas fa-plus"></i>
                    New Ticket
                </button>
            </div>
        </div>

        <div class="tickets-container" id="tickets-container">
        </div>
        
        <div class="loading-fullpage" id="loading" style="background: none;">
            <div class="loading-spinner">
                <div class="loading-spinner-dot"></div>
                <div class="loading-spinner-dot"></div>
                <div class="loading-spinner-dot"></div>
                <div class="loading-spinner-dot"></div>
            </div>
            <div class="loading-text">Loading tickets...</div>
        </div>
    </div>
</main>

<?php include 'includes/ticket-modals.php'; ?>

<script src="assets/js/tickets.js"></script>

<?php include 'includes/footer.php'; ?>