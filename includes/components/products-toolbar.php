<?php

/**
 * Products toolbar (search, sorting, view mode change, category filter)
 * Placed above the products list.
 */
?>
<div id="products-toolbar" class="products-toolbar">
    <div class="toolbar-left">
        <input type="text" name="q" placeholder="Search product..." />
        <select name="category" id="category-filter">
            <option value="">All categories</option>
            <!-- Categories will be loaded via AJAX -->
        </select>
        <select name="sort">
            <option value="newest">Newest</option>
            <option value="price_asc">Cheapest</option>
            <option value="price_desc">Most expensive</option>
            <option value="name_asc">Name (A-Z)</option>
            <option value="name_desc">Name (Z-A)</option>
        </select>
    </div>
    <div class="toolbar-right view-switch">
        <button type="button" data-view="card" title="Card view">🗂️</button>
        <button type="button" data-view="list" title="List view">📋</button>
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