<?php

/**
 * نوار ابزار محصولات (جستجو، مرتب‌سازی، تغییر حالت نمایش، فیلتر دسته‌بندی)
 * در بالای لیست محصولات قرار می‌گیرد.
 */
?>
<div id="products-toolbar" class="products-toolbar">
    <div class="toolbar-left">
        <input type="text" name="q" placeholder="جستجوی محصول..." />
        <select name="category" id="category-filter">
            <option value="">همه دسته‌بندی‌ها</option>
            <!-- دسته‌بندی‌ها با AJAX بارگذاری می‌شوند -->
        </select>
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
        flex-wrap: wrap;
    }

    .toolbar-left {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
    }

    .products-toolbar input[name=q],
    .products-toolbar select[name=category],
    .products-toolbar select[name=sort] {
        padding: 0.4rem 0.75rem;
        border: 1px solid #ccc;
        border-radius: 6px;
        min-width: 150px;
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

    @media (max-width: 768px) {
        .products-toolbar {
            flex-direction: column;
            align-items: stretch;
        }

        .toolbar-left {
            flex-direction: column;
        }

        .products-toolbar input[name=q],
        .products-toolbar select[name=category],
        .products-toolbar select[name=sort] {
            width: 100%;
            min-width: unset;
        }
    }
</style>