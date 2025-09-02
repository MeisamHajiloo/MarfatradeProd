<?php

/**
 * Products toolbar (search, sorting, view mode change, category filter)
 * Placed above the products list.
 */
?>
<div id="products-toolbar" class="products-toolbar">
    <div class="toolbar-left">
        <div class="mobile-toggle" id="toolbar-toggle">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 12H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                <path d="M3 6H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                <path d="M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            </svg>
            <span>Filters</span>
        </div>

        <div class="toolbar-content">
            <div class="search-box">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M21 21L16.65 16.65" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <input type="text" name="q" placeholder="ُSearch..." />
            </div>

            <select name="category" id="category-filter">
                <option value="">Categories</option>
                <!-- Categories will be loaded via AJAX -->
            </select>

            <select name="sort">
                <option value="newest">Newest</option>
                <option value="price_asc">Cheapest</option>
                <option value="price_desc">Most expensive</option>
                <option value="name_asc">Name (A-Z)</option>
                <option value="name_desc">Name (Z-A)</option>
            </select>

            <div class="view-switch" id="view-switch-desktop">
                <button type="button" data-view="card" title="Card view" class="view-btn active">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2" />
                        <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2" />
                        <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2" />
                        <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2" />
                    </svg>
                </button>
            </div>
        </div>
    </div>

    <div class="toolbar-overlay" id="toolbar-overlay"></div>
</div>

<style>
    .products-toolbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        margin: 1rem 0;
        flex-wrap: wrap;
        position: relative;
    }

    .mobile-toggle {
        display: none;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        background: var(--primary-color);
        color: white;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 500;
    }

    .toolbar-content {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
        align-items: center;
        transition: all 0.3s ease;
    }

    .search-box {
        position: relative;
        display: flex;
        align-items: center;
    }

    .search-box svg {
        position: absolute;
        right: 12px;
        color: #6c757d;
        z-index: 1;
    }

    .products-toolbar input[name=q],
    .products-toolbar select[name=category],
    .products-toolbar select[name=sort] {
        padding: 0.6rem 0.75rem;
        padding-right: 2.5rem;
        border: 1px solid #ddd;
        border-radius: 6px;
        min-width: 150px;
        background: white;
        font-family: inherit;
    }

    .products-toolbar .view-switch {
        display: flex;
        gap: 0.25rem;
    }

    .products-toolbar .view-btn {
        border: 1px solid #ddd;
        background: #fff;
        border-radius: 6px;
        padding: 0.5rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
    }

    .products-toolbar .view-btn.active,
    .products-toolbar .view-btn:hover {
        background: var(--primary-color);
        color: white;
        border-color: var(--primary-color);
    }

    .toolbar-overlay {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 998;
    }

    @media (max-width: 992px) {
        .mobile-toggle {
            display: flex;
        }

        .toolbar-content {
            position: fixed;
            top: 0;
            right: -100%;
            width: 85%;
            height: 100%;
            background: white;
            z-index: 999;
            flex-direction: column;
            align-items: stretch;
            padding: 2rem 1.5rem;
            box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
            overflow-y: auto;
            transition: right 0.3s ease;
        }

        .toolbar-content.active {
            right: 0;
        }

        .products-toolbar input[name=q],
        .products-toolbar select[name=category],
        .products-toolbar select[name=sort] {
            width: 100%;
            min-width: unset;
            margin-bottom: 1rem;
        }

        #view-switch-desktop {
            display: none;
        }
    }

    @media (max-width: 768px) {
        .toolbar-content {
            width: 100%;
        }
    }
</style>