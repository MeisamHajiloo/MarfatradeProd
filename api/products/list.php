<?php

/**
 * GET /api/products/list.php
 * JSON API برای فهرست محصولات با صفحه‌بندی، جستجو، فیلتر دسته، و مرتب‌سازی
 *
 * پارامترها (GET):
 * - page: شماره صفحه (۱+)
 * - per_page: تعداد اقلام هر صفحه (پیشنهادی: 12/24/48)
 * - category: شناسه دسته (int)
 * - include_descendants: اگر 1 باشد و DB از CTE پشتیبانی کند، زیر‌دسته‌ها نیز لحاظ می‌شوند
 * - q: جست‌وجو در نام/اسلاگ/توضیح کوتاه
 * - sort: یکی از: price_asc | price_desc | newest | popular | name_asc | name_desc
 * - status: پیش‌فرض 'published'
 *
 * خروجی:
 * {
 *   "data": [ { product... }, ... ],
 *   "meta": { page, per_page, total, has_next }
 * }
 */

// هدرهای JSON
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');

// اگر نیاز دارید CORS اضافه کنید (در صورت جدا بودن دامنه فرانت)
// header('Access-Control-Allow-Origin: *');

require_once __DIR__ . '/../../classes/Database.php';
// اگر ثابت‌های مسیر/پیکربندی دارید:
// بارگذاری ثابت‌ها (سازگار با ساختار فعلی پروژه)
$constCandidates = [
    __DIR__ . '/../../includes/config/constants.php',
    __DIR__ . '/../../constants.php',
    __DIR__ . '/../../includes/config/constant.php', // در صورت وجود نسخه تک‌عدد
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

// ورودی‌ها
$page        = isset($_GET['page']) ? max(1, (int)$_GET['page']) : 1;
$perPageRaw  = isset($_GET['per_page']) ? (int)$_GET['per_page'] : 12;
// محدودیت برای جلوگیری از فشار سرور
$perPage     = in_array($perPageRaw, [12, 24, 48], true) ? $perPageRaw : 12;
$offset      = ($page - 1) * $perPage;

$categoryId  = isset($_GET['category']) ? (int)$_GET['category'] : null;
$withDesc    = isset($_GET['include_descendants']) && (int)$_GET['include_descendants'] === 1;
$q           = isset($_GET['q']) ? trim((string)$_GET['q']) : '';
$status      = isset($_GET['status']) ? trim((string)$_GET['status']) : 'published';

$allowedSort = [
    'price_asc'  => 'p.price ASC',
    'price_desc' => 'p.price DESC',
    'newest'     => 'p.created_at DESC',
    'popular'    => 'p.views DESC', // در صورت نبود ستون views می‌توانید به sold_count یا مشابه نگاشت کنید
    'name_asc'   => 'p.name ASC',
    'name_desc'  => 'p.name DESC',
];
$sortKey     = isset($_GET['sort']) ? strtolower((string)$_GET['sort']) : 'newest';
$orderBy     = $allowedSort[$sortKey] ?? $allowedSort['newest'];

try {
    $db = new Database(DB_HOST, DB_NAME, DB_USER, DB_PASS);
    $pdo = $db->getConnection(); // انتظار می‌رود PDO برگرداند

    // بررسی پشتیبانی از CTE (MySQL 8+)
    $cteSupported = true;
    try {
        $pdo->query('WITH _x AS (SELECT 1 AS id) SELECT * FROM _x LIMIT 1');
    } catch (Throwable $e) {
        $cteSupported = false;
    }

    $params = [];

    // ساخت WHERE
    $where = [];
    if ($status !== '') {
        $where[] = 'p.status = :status';
        $params[':status'] = $status;
    }

    // جستجو در چند ستون
    if ($q !== '') {
        $where[] = '(p.name LIKE :q OR p.slug LIKE :q OR p.short_desc LIKE :q)';
        $params[':q'] = '%' . $q . '%';
    }

    $categoryFilterSql = '';
    if ($categoryId) {
        if ($withDesc && $cteSupported) {
            // استفاده از CTE برای واکشی همه زیر‌دسته‌ها
            $categoryFilterSql = "WITH RECURSIVE cat_tree AS (
                SELECT id FROM categories WHERE id = :cat_id
                UNION ALL
                SELECT c.id FROM categories c
                INNER JOIN cat_tree ct ON c.parent_id = ct.id
            ) SELECT p.* FROM products p
            INNER JOIN cat_tree ct2 ON p.category_id = ct2.id";
        } else {
            // فیلتر روی همان دسته (بدون زیر‌دسته)
            $where[] = 'p.category_id = :cat_id';
            $params[':cat_id'] = $categoryId;
        }
    }

    // پایه SELECT
    $baseSelect = 'SELECT p.id, p.slug, p.name, p.price, p.thumbnail, p.short_desc, p.category_id, p.created_at, p.views';
    $baseFrom   = ' FROM products p ';

    // اگر CTE دسته‌ها فعال شد، از آن در Query اصلی استفاده می‌کنیم
    $useCteQuery = ($categoryFilterSql !== '');

    // کوئری شمارش
    if ($useCteQuery) {
        $countSql = "WITH RECURSIVE cat_tree AS (
                SELECT id FROM categories WHERE id = :cat_id
                UNION ALL
                SELECT c.id FROM categories c
                INNER JOIN cat_tree ct ON c.parent_id = ct.id
            ) SELECT COUNT(*) AS cnt FROM products p
            INNER JOIN cat_tree ct2 ON p.category_id = ct2.id";
        if (!empty($where)) {
            $countSql .= ' WHERE ' . implode(' AND ', $where);
        }
    } else {
        $countSql = 'SELECT COUNT(*) AS cnt' . $baseFrom;
        if (!empty($where)) {
            $countSql .= ' WHERE ' . implode(' AND ', $where);
        }
    }

    $stmtCount = $pdo->prepare($countSql);
    foreach ($params as $k => $v) {
        $stmtCount->bindValue($k, $v);
    }
    $stmtCount->execute();
    $total = (int)$stmtCount->fetchColumn();

    // کوئری داده‌ها
    if ($useCteQuery) {
        $dataSql = $categoryFilterSql; // شامل JOIN با cat_tree است
        if (!empty($where)) {
            $dataSql .= ' WHERE ' . implode(' AND ', $where);
        }
        $dataSql .= ' ORDER BY ' . $orderBy . ' LIMIT :limit OFFSET :offset';
    } else {
        $dataSql = $baseSelect . $baseFrom;
        if (!empty($where)) {
            $dataSql .= ' WHERE ' . implode(' AND ', $where);
        }
        $dataSql .= ' ORDER BY ' . $orderBy . ' LIMIT :limit OFFSET :offset';
    }

    $stmt = $pdo->prepare($dataSql);
    foreach ($params as $k => $v) {
        $stmt->bindValue($k, $v);
    }
    $stmt->bindValue(':limit', $perPage, PDO::PARAM_INT);
    $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
    $stmt->execute();

    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];

    // نرمال‌سازی خروجی
    $data = array_map(function ($r) {
        return [
            'id'          => (int)$r['id'],
            'slug'        => $r['slug'],
            'name'        => $r['name'],
            'price'       => isset($r['price']) ? (float)$r['price'] : null,
            'thumbnail'   => $r['thumbnail'] ?? null,
            'short_desc'  => $r['short_desc'] ?? null,
            'category_id' => isset($r['category_id']) ? (int)$r['category_id'] : null,
            'created_at'  => $r['created_at'] ?? null,
            'views'       => isset($r['views']) ? (int)$r['views'] : null,
        ];
    }, $rows);

    $hasNext = ($offset + $perPage) < $total;

    $response([
        'data' => $data,
        'meta' => [
            'page'      => $page,
            'per_page'  => $perPage,
            'total'     => $total,
            'has_next'  => $hasNext,
            'sort'      => $sortKey,
            'q'         => $q,
            'category'  => $categoryId,
            'descendants_included' => ($withDesc && $cteSupported),
        ],
    ]);
    // } catch (Throwable $e) {
    //     $response([
    //         'error' => true,
    //         'message' => 'Server error',
    //         'detail' => getenv('APP_DEBUG') ? $e->getMessage() : null,
    //     ], 500);

} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        'error' => true,
        'message' => $e->getMessage(),
        'trace' => $e->getTraceAsString()
    ]);
    exit;
}
