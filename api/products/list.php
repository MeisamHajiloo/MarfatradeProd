<?php

/**
 * GET /api/products/list.php
 * JSON API for product listing with pagination, search, category filter, and sorting
 * Includes subcategories when filtering by category (works with/without CTE support)
 *
 * Parameters (GET):
 * - page: Page number (1+)
 * - per_page: Items per page (12/24/48)
 * - category: Category ID (int)
 * - include_descendants: 1 to include subcategories (default: 1)
 * - q: Search in name/slug/short description
 * - sort: price_asc | price_desc | newest | popular | name_asc | name_desc
 * - status: Default 'published'
 *
 * Output:
 * {
 *   "data": [ { product... } ],
 *   "meta": { page, per_page, total, has_next, sort, q, category, descendants_included }
 * }
 */

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');

// require classes / constants (همان منطق نسخه‌ی فعلی شما)
require_once __DIR__ . '/../../classes/Database.php';
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

// ---- Input parameters ----
$page        = isset($_GET['page']) ? max(1, (int)$_GET['page']) : 1;
$perPageRaw  = isset($_GET['per_page']) ? (int)$_GET['per_page'] : 12;
// Limit to prevent server overload
$perPage     = in_array($perPageRaw, [12, 24, 48], true) ? $perPageRaw : 12;
$offset      = ($page - 1) * $perPage;

$categoryId  = isset($_GET['category']) ? (int)$_GET['category'] : null;
// پیش‌فرض مثل قبل: اگر پارامتر نیامد، true باشد
$withDesc    = isset($_GET['include_descendants']) ? (int)$_GET['include_descendants'] === 1 : true;

$q           = isset($_GET['q']) ? trim((string)$_GET['q']) : '';
$status      = isset($_GET['status']) ? trim((string)$_GET['status']) : '';

$allowedSort = [
    'price_asc'  => 'p.price ASC',
    'price_desc' => 'p.price DESC',
    'newest'     => 'p.created_at DESC',
    'popular'    => 'p.views DESC',
    'name_asc'   => 'p.name ASC',
    'name_desc'  => 'p.name DESC',
    'discount'   => '(CASE WHEN p.status = "out_of_stock" THEN 0 WHEN p.sale_price IS NOT NULL AND p.sale_price < p.price THEN ((p.price - p.sale_price) / p.price * 100) ELSE 0 END) DESC, (CASE WHEN p.status = "out_of_stock" THEN 1 ELSE 0 END) ASC',
];
$sortKey     = isset($_GET['sort']) ? strtolower((string)$_GET['sort']) : 'newest';
$orderBy     = $allowedSort[$sortKey] ?? $allowedSort['newest'];

try {
    $db  = new Database(DB_HOST, DB_NAME, DB_USER, DB_PASS);
    $pdo = $db->getConnection();

    // ---- Detect CTE support (مثل نسخه‌ی شما) ----
    $cteSupported = true;
    try {
        $pdo->query('WITH _x AS (SELECT 1 AS id) SELECT * FROM _x LIMIT 1');
    } catch (Throwable $e) {
        $cteSupported = false;
    }

    $params = [];
    $where  = [];

    // Status filter
    if ($status !== '') {
        $where[] = 'p.status = :status';
        $params[':status'] = $status;
    }

    // Search filter
    if ($q !== '') {
        $where[] = '(p.name LIKE :q OR p.slug LIKE :q OR p.description LIKE :q)';
        $params[':q'] = '%' . $q . '%';
    }

    // Helper: get all descendant category IDs without CTE (fallback)
    $getAllDescendantIds = function (PDO $pdo, int $rootId): array {
        $ids     = [];
        $seen    = [];
        $queue   = [$rootId];

        // یک کوئری آماده برای سرعت بهتر
        $stmt = $pdo->prepare('SELECT id FROM categories WHERE parent_id = :pid');

        while (!empty($queue)) {
            $current = array_shift($queue);
            if (isset($seen[$current])) {
                continue;
            }
            $seen[$current] = true;
            $ids[] = $current;

            $stmt->execute([':pid' => $current]);
            $children = $stmt->fetchAll(PDO::FETCH_COLUMN);
            foreach ($children as $childId) {
                if (!isset($seen[$childId])) {
                    $queue[] = (int)$childId;
                }
            }
        }
        return $ids;
    };

    $categoryFilterSql = '';
    $descendantIdsForFallback = [];

    if ($categoryId) {
        if ($withDesc) {
            if ($cteSupported) {
                // مسیر CTE (بدون تغییر نسبت به نسخه‌ی قبل شما)
                $categoryFilterSql = "WITH RECURSIVE cat_tree AS (
                    SELECT id FROM categories WHERE id = :cat_id
                    UNION ALL
                    SELECT c.id FROM categories c
                    INNER JOIN cat_tree ct ON c.parent_id = ct.id
                ) ";
            } else {
                // ----- مسیر FALLBACK: بدون CTE هم زیرمجموعه‌ها را لحاظ کن -----
                $descendantIdsForFallback = $getAllDescendantIds($pdo, $categoryId);
                if (!empty($descendantIdsForFallback)) {
                    $placeholders = [];
                    foreach ($descendantIdsForFallback as $i => $cid) {
                        $ph = ":cat_$i";
                        $placeholders[] = $ph;
                        $params[$ph] = (int)$cid;
                    }
                    $where[] = 'p.category_id IN (' . implode(',', $placeholders) . ')';
                } else {
                    // اگر به هر دلیل هیچ idی برنگشت، حداقل خود category را اعمال کن
                    $where[] = 'p.category_id = :cat_id';
                    $params[':cat_id'] = $categoryId;
                }
            }
        } else {
            // فقط خود دسته
            $where[] = 'p.category_id = :cat_id';
            $params[':cat_id'] = $categoryId;
        }
    }

    // Base SELECT (مثل نسخه‌ی شما)
    $baseSelect = 'SELECT p.id, p.slug, p.name, p.price, p.sale_price, p.thumbnail, p.category_id, p.created_at, p.views, p.status';
    $baseFrom   = ' FROM products p ';

    // ---- Count query ----
    if ($categoryId && $withDesc && $cteSupported) {
        $countSql = $categoryFilterSql . "SELECT COUNT(*) AS cnt FROM products p
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
    if ($categoryId && $withDesc && $cteSupported) {
        $stmtCount->bindValue(':cat_id', $categoryId, PDO::PARAM_INT);
    }
    $stmtCount->execute();
    $total = (int)$stmtCount->fetchColumn();

    // ---- Data query ----
    if ($categoryId && $withDesc && $cteSupported) {
        $dataSql = $categoryFilterSql . $baseSelect . " FROM products p
            INNER JOIN cat_tree ct2 ON p.category_id = ct2.id";
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
        // bindValue اتوماتیک type را برمی‌دارد؛ category ها int هستند
        $stmt->bindValue($k, $v);
    }
    if ($categoryId && $withDesc && $cteSupported) {
        $stmt->bindValue(':cat_id', $categoryId, PDO::PARAM_INT);
    }
    $stmt->bindValue(':limit',  $perPage, PDO::PARAM_INT);
    $stmt->bindValue(':offset', $offset,  PDO::PARAM_INT);
    $stmt->execute();

    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];

    // ---- Normalize output (مثل نسخه‌ی شما) ----
    $data = array_map(function ($r) {
        return [
            'id'          => (int)$r['id'],
            'slug'        => $r['slug'],
            'name'        => $r['name'],
            'price'       => isset($r['price']) ? (float)$r['price'] : null,
            'sale_price'  => isset($r['sale_price']) && $r['sale_price'] !== null ? (float)$r['sale_price'] : null,
            'thumbnail'   => $r['thumbnail'] ?? null,
            'short_desc'  => null,
            'category_id' => isset($r['category_id']) ? (int)$r['category_id'] : null,
            'created_at'  => $r['created_at'] ?? null,
            'views'       => isset($r['views']) ? (int)$r['views'] : null,
            'status'      => $r['status'] ?? 'published',
        ];
    }, $rows);

    $hasNext = ($offset + $perPage) < $total;

    // اگر include_descendants درخواست شده بود، حالا واقعاً اعمال شده — چه با CTE چه با fallback
    $descendantsIncluded = (bool)($categoryId && $withDesc);

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
            'descendants_included' => $descendantsIncluded,
        ],
    ]);
} catch (Throwable $e) {
    error_log('Products API Error: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'error' => true,
        'message' => 'Database error: ' . $e->getMessage(),
        'file' => $e->getFile(),
        'line' => $e->getLine()
    ]);
    exit;
}
