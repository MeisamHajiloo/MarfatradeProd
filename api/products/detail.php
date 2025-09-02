<?php

/**
 * GET /api/products/detail.php?slug=...
 * دریافت جزئیات یک محصول بر اساس slug یا id
 *
 * خروجی نمونه:
 * {
 *   id: 123,
 *   slug: "iphone-14",
 *   name: "iPhone 14",
 *   price: 1200,
 *   description: "...",
 *   thumbnail: "...",
 *   gallery: ["...","..."],
 *   category: { id: 5, name: "Mobiles" },
 *   created_at: "2024-01-01 12:00:00",
 *   views: 150
 * }
 */

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');

require_once __DIR__ . '/../../classes/Database.php';

// بارگذاری ثابت‌ها (سازگار با ساختار فعلی پروژه)
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

$id   = isset($_GET['id']) ? (int)$_GET['id'] : null;
$slug = isset($_GET['slug']) ? trim((string)$_GET['slug']) : null;

if (!$id && !$slug) {
    $response(['error' => true, 'message' => 'Missing parameter: id or slug'], 400);
}

try {
    $db  = new Database(DB_HOST, DB_NAME, DB_USER, DB_PASS);
    $pdo = $db->getConnection();

    $sql = "SELECT p.id, p.slug, p.name, p.price, p.description, p.thumbnail, p.gallery, 
                   p.category_id, p.created_at, p.views, c.name AS category_name
            FROM products p
            LEFT JOIN categories c ON c.id = p.category_id
            WHERE ";
    $params = [];

    if ($id) {
        $sql .= 'p.id = :id';
        $params[':id'] = $id;
    } else {
        $sql .= 'p.slug = :slug';
        $params[':slug'] = $slug;
    }

    $stmt = $pdo->prepare($sql);
    foreach ($params as $k => $v) {
        $stmt->bindValue($k, $v);
    }
    $stmt->execute();

    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$row) {
        $response(['error' => true, 'message' => 'Product not found'], 404);
    }

    // نرمال‌سازی خروجی
    $product = [
        'id'          => (int)$row['id'],
        'slug'        => $row['slug'],
        'name'        => $row['name'],
        'price'       => isset($row['price']) ? (float)$row['price'] : null,
        'description' => $row['description'] ?? null,
        'thumbnail'   => $row['thumbnail'] ?? null,
        'gallery'     => $row['gallery'] ? explode(',', $row['gallery']) : [],
        'category'    => [
            'id'   => isset($row['category_id']) ? (int)$row['category_id'] : null,
            'name' => $row['category_name'] ?? null,
        ],
        'created_at'  => $row['created_at'] ?? null,
        'views'       => isset($row['views']) ? (int)$row['views'] : null,
    ];

    // افزایش شمارنده بازدید (اختیاری)
    try {
        $update = $pdo->prepare("UPDATE products SET views = COALESCE(views,0) + 1 WHERE id = :id");
        $update->bindValue(':id', $product['id'], PDO::PARAM_INT);
        $update->execute();
    } catch (Throwable $e) {
        // در صورت خطا نادیده گرفته شود
    }

    $response($product);
} catch (Throwable $e) {
    $response([
        'error' => true,
        'message' => 'Server error',
        'detail' => getenv('APP_DEBUG') ? $e->getMessage() : null,
    ], 500);
}
