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
            <span class="filter-badge" id="filter-badge">0</span>
        </div>

        <div class="toolbar-content">
            <div class="mobile-header">
                <h3>View Options</h3>
                <button type="button" class="close-drawer" id="close-drawer">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
            </div>

            <div class="search-box">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M21 21L16.65 16.65" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <input type="text" name="q" placeholder="Search products..." />
            </div>

            <div class="filter-group">
                <select name="category" id="category-filter">
                    <option value="">All categories</option>
                    <!-- Categories will be loaded via AJAX -->
                </select>
            </div>

            <div class="filter-group">
                <select name="sort" id="sort-filter">
                    <option value="newest">Newest</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                    <option value="name_asc">Name: A-Z</option>
                    <option value="name_desc">Name: Z-A</option>
                </select>
            </div>

            <div class="action-buttons">
                <button type="button" class="btn btn-outline" id="reset-filters">Reset Filters</button>
            </div>

            <div class="view-switch" id="view-switch-mobile">
                <button type="button" data-view="card" title="Card view" class="view-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2" />
                        <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2" />
                        <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2" />
                        <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2" />
                    </svg>
                </button>
                <button type="button" data-view="list" title="List view" class="view-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="3" y="4" width="18" height="4" rx="1" stroke="currentColor" stroke-width="2" />
                        <rect x="3" y="10" width="18" height="4" rx="1" stroke="currentColor" stroke-width="2" />
                        <rect x="3" y="16" width="18" height="4" rx="1" stroke="currentColor" stroke-width="2" />
                    </svg>
                </button>
            </div>
        </div>
    </div>

    <div class="view-switch" id="view-switch-desktop">
        <button type="button" data-view="card" title="Card view" class="view-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2" />
                <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2" />
                <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2" />
                <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2" />
            </svg>
        </button>
        <button type="button" data-view="list" title="List view" class="view-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="4" width="18" height="4" rx="1" stroke="currentColor" stroke-width="2" />
                <rect x="3" y="10" width="18" height="4" rx="1" stroke="currentColor" stroke-width="2" />
                <rect x="3" y="16" width="18" height="4" rx="1" stroke="currentColor" stroke-width="2" />
            </svg>
        </button>
    </div>

    <div class="toolbar-overlay" id="toolbar-overlay"></div>
</div>