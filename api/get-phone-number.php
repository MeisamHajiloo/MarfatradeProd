<?php
require_once __DIR__ . '/../includes/config/constants.php';

header('Content-Type: application/json');

// Return the WhatsApp number from constants
echo json_encode([
    'whatsappNumber' => WHATSAPP_NUMBER,
    'telegramUsername' => TELEGRAM_USERNAME,
    'success' => true
]);
exit;
