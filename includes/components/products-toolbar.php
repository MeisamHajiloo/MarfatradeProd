<?php

/**
 * نوار ابزار محصولات (جستجو، مرتب‌سازی، تغییر حالت نمایش)
 * در بالای لیست محصولات قرار می‌گیرد.
 */
?>
<div id="products-toolbar" class="products-toolbar">
    <div class="toolbar-left">
        <input type="text" name="q" placeholder="جستجوی محصول..." />
        <select name="sort">
            <option value="newest">جدیدترین</option>
            <option value="price_asc">ارزان‌ترین</option>
            <option value="price_desc">گران‌ترین</option>
            <option value="name_asc">نام (الف-ی)</option>
            <option value="name_desc">نام (ی-الف)</option>
        </select>
    </div>
    <div class="toolbar-right view-switch">
        <button type="button" data-view="card" title="نمایش کارتی">🗂️</button>
        <button type="button" data-view="list" title="نمایش لیستی">📋</button>
    </div>
</div>

<style>
    .products-toolbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        margin: 1rem 0;
    }

    .products-toolbar input[name=q] {
        padding: 0.4rem 0.75rem;
        border: 1px solid #ccc;
        border-radius: 6px;
        min-width: 200px;
    }

    .products-toolbar select[name=sort] {
        padding: 0.4rem 0.5rem;
        border: 1px solid #ccc;
        border-radius: 6px;
    }

    .products-toolbar .view-switch button {
        border: 1px solid #ddd;
        background: #fff;
        border-radius: 6px;
        padding: 0.4rem 0.6rem;
        cursor: pointer;
    }

    .products-toolbar .view-switch button:hover {
        background: #f5f5f5;
    }
</style>