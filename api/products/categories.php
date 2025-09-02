<?php

/**
 * GET /api/products/categories.php
 * Hierarchical category tree (recursive)
 * JSON output for use in product filter/navigation menu
 *
 * Example output:
 * [
 *   { id: 1, name: "Mobiles", slug: "mobiles", parent_id: null, children: [...] },
 *   ...
 */

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');

require_once __DIR__ . '/../../classes/Database.php';

// Load constants (compatible with current project structure)
$constCandidates = [
    __DIR__ . '/../../includes/config/constants.php',
    __DIR__ . '/../../constants.php',
    __DIR__ . '/../../includes/config/constant.php',
];
foreach ($constCandidates as $cp) {
    if (file_exists($cp)) {
        require_once $cp;
        break;
    }
}

$response = function ($payload, int $code = 200) {
    http_response_code($code);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
};

try {
    $db  = new Database(DB_HOST, DB_NAME, DB_USER, DB_PASS);
    $pdo = $db->getConnection();

    $stmt = $pdo->query("SELECT id, name, slug, parent_id FROM categories ORDER BY parent_id ASC, name ASC");
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Create map based on parent_id
    $map = [];
    foreach ($rows as $row) {
        $row['id']        = (int)$row['id'];
        $row['parent_id'] = $row['parent_id'] !== null ? (int)$row['parent_id'] : null;
        $row['children']  = [];
        $map[$row['id']]  = $row;
    }

    // Build tree structure
    $tree = [];
    foreach ($map as $id => &$node) {
        if ($node['parent_id'] === null) {
            $tree[] = &$node;
        } else {
            if (isset($map[$node['parent_id']])) {
                $map[$node['parent_id']]['children'][] = &$node;
            } else {
                // If parent category not found, add to root
                $tree[] = &$node;
            }
        }
    }
    unset($node);

    $response($tree);
} catch (Throwable $e) {
    $response([
        'error' => true,
        'message' => 'Server error',
        'detail' => getenv('APP_DEBUG') ? $e->getMessage() : null,
    ], 500);
}
