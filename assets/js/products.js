// assets/js/products.js
// AJAX management for loading products with pagination, filtering, sorting and view mode changes

(function () {
  const apiBase = "api/products";
  const gridEl = document.getElementById("products-grid");
  const toolbarEl = document.getElementById("products-toolbar");
  const paginationEl = document.getElementById("pagination");
  const categorySelect = document.getElementById("category-filter");
  const toolbarToggle = document.getElementById("toolbar-toggle");
  const toolbarContent = document.querySelector(".toolbar-content");
  const toolbarOverlay = document.getElementById("toolbar-overlay");
  const viewSwitchDesktop = document.getElementById("view-switch-desktop");
  const viewSwitchMobile = document.getElementById("view-switch-mobile");
  const closeDrawer = document.getElementById("close-drawer");
  const resetFilters = document.getElementById("reset-filters");
  const applyFilters = document.getElementById("apply-filters");
  const filterBadge = document.getElementById("filter-badge");

  let state = {
    page: 1,
    per_page: 12,
    sort: "newest",
    q: "",
    category: null,
    view: window.innerWidth < 768 ? "list" : "card",
  };

  let activeFilters = 0;

  // Initialize toolbar
  function initToolbar() {
    // Set initial view mode
    updateViewMode();

    // Mobile toolbar toggle
    if (toolbarToggle && toolbarContent) {
      toolbarToggle.addEventListener("click", function () {
        toolbarContent.classList.add("active");
        if (toolbarOverlay) {
          toolbarOverlay.style.display = "block";
        }
        document.body.style.overflow = "hidden";
      });
    }

    // Close drawer button
    if (closeDrawer) {
      closeDrawer.addEventListener("click", closeToolbar);
    }

    // Overlay click to close
    if (toolbarOverlay) {
      toolbarOverlay.addEventListener("click", closeToolbar);
    }

    // Reset filters button
    if (resetFilters) {
      resetFilters.addEventListener("click", function () {
        document.querySelector("input[name=q]").value = "";
        document.getElementById("category-filter").value = "";
        document.getElementById("sort-filter").value = "newest";

        state.q = "";
        state.category = null;
        state.sort = "newest";
        state.page = 1;

        activeFilters = 0;
        updateFilterBadge();

        // Close drawer on mobile after reset
        if (window.innerWidth < 993) {
          closeToolbar();
        }

        load();
      });
    }

    // Apply filters button (mobile)
    if (applyFilters) {
      applyFilters.addEventListener("click", function () {
        // Update state from form values
        state.q = document.querySelector("input[name=q]").value;
        state.category = document.getElementById("category-filter").value
          ? parseInt(document.getElementById("category-filter").value)
          : null;
        state.sort = document.getElementById("sort-filter").value;
        state.page = 1;

        // Close drawer on mobile after applying
        if (window.innerWidth < 993) {
          closeToolbar();
        }

        load();
      });
    }

    // View mode toggle for desktop
    if (viewSwitchDesktop) {
      const viewBtns = viewSwitchDesktop.querySelectorAll(".view-btn");
      viewBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
          viewBtns.forEach((b) => b.classList.remove("active"));
          this.classList.add("active");
          state.view = this.dataset.view;
          updateViewMode();
          load();
        });
      });
    }

    // View mode toggle for mobile
    if (viewSwitchMobile) {
      const viewBtns = viewSwitchMobile.querySelectorAll(".view-btn");
      viewBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
          viewBtns.forEach((b) => b.classList.remove("active"));
          this.classList.add("active");
          state.view = this.dataset.view;
          updateViewMode();
          load();
        });
      });
    }

    // Monitor filter changes for badge counter
    const categoryFilter = document.getElementById("category-filter");
    const sortFilter = document.getElementById("sort-filter");
    const searchInput = document.querySelector("input[name=q]");

    if (categoryFilter) {
      categoryFilter.addEventListener("change", function () {
        updateFilterCounter();
      });
    }

    if (sortFilter) {
      sortFilter.addEventListener("change", function () {
        updateFilterCounter();
      });
    }

    if (searchInput) {
      searchInput.addEventListener("input", function () {
        updateFilterCounter();
      });
    }
  }

  // Close toolbar function
  function closeToolbar() {
    toolbarContent.classList.remove("active");
    if (toolbarOverlay) {
      toolbarOverlay.style.display = "none";
    }
    document.body.style.overflow = "";
  }

  // Update filter badge count
  function updateFilterCounter() {
    activeFilters = 0;

    if (document.querySelector("input[name=q]").value) activeFilters++;
    if (document.getElementById("category-filter").value) activeFilters++;
    if (document.getElementById("sort-filter").value !== "newest")
      activeFilters++;

    updateFilterBadge();
  }

  function updateFilterBadge() {
    if (filterBadge) {
      filterBadge.textContent = activeFilters;
      filterBadge.style.display = activeFilters > 0 ? "flex" : "none";
    }
  }

  // Update view mode UI
  function updateViewMode() {
    // Update desktop view switch
    if (viewSwitchDesktop) {
      const viewBtns = viewSwitchDesktop.querySelectorAll(".view-btn");
      viewBtns.forEach((btn) => {
        btn.classList.remove("active");
        if (btn.dataset.view === state.view) {
          btn.classList.add("active");
        }
      });
    }

    // Update mobile view switch
    if (viewSwitchMobile) {
      const viewBtns = viewSwitchMobile.querySelectorAll(".view-btn");
      viewBtns.forEach((btn) => {
        btn.classList.remove("active");
        if (btn.dataset.view === state.view) {
          btn.classList.add("active");
        }
      });
    }
  }

  // Load categories
  async function loadCategories() {
    try {
      const res = await fetch("api/products/categories.php");
      if (!res.ok) throw new Error("Failed to load categories");
      const categories = await res.json();

      // Fill category dropdown
      if (categorySelect) {
        categories.forEach((cat) => {
          addCategoryOption(cat);
        });
      }
    } catch (err) {
      console.error("Error loading categories:", err);
    }
  }

  // Add category to dropdown (recursive for subcategories)
  function addCategoryOption(category, level = 0) {
    if (!categorySelect) return;

    const option = document.createElement("option");
    option.value = category.id;
    option.textContent = " ".repeat(level) + category.name;
    categorySelect.appendChild(option);

    // Add subcategories
    if (category.children && category.children.length > 0) {
      category.children.forEach((child) => {
        addCategoryOption(child, level + 1);
      });
    }
  }

  // Helper for calling products API
  async function fetchProducts() {
    const params = new URLSearchParams({
      page: state.page,
      per_page: state.per_page,
      sort: state.sort,
      q: state.q,
    });
    if (state.category) params.append("category", state.category);

    const url = `${apiBase}/list.php?${params.toString()}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to load products");
    return res.json();
  }

  function renderProducts(data) {
    if (!gridEl) return;

    gridEl.innerHTML = "";

    // Set grid class based on view mode
    gridEl.className = state.view === "card" ? "card-view" : "list-view";

    if (!data || !data.length) {
      gridEl.innerHTML = `<div class="no-results">No products found</div>`;
      return;
    }

    data.forEach((p) => {
      if (state.view === "card") {
        renderProductCard(p);
      } else {
        renderProductListItem(p);
      }
    });
  }

  function renderProductCard(p) {
    if (!gridEl) return;

    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <a href="product.php?slug=${p.slug}" class="thumb">
        <img src="${p.thumbnail || "/assets/images/no-image.png"}" alt="${
      p.name
    }">
      </a>
      <div class="info">
        <h3 class="name">${p.name}</h3>
        <div class="price">${
          p.price ? p.price + " $" : "Price not available"
        }</div>
        <div class="actions">
          <a href="product.php?slug=${
            p.slug
          }" class="btn btn-primary">View Details</a>
          <button class="btn btn-outline">Add to Cart</button>
        </div>
      </div>
    `;
    gridEl.appendChild(card);
  }

  function renderProductListItem(p) {
    if (!gridEl) return;

    const listItem = document.createElement("div");
    listItem.className = "product-list-item";
    listItem.innerHTML = `
      <a href="product.php?slug=${p.slug}" class="thumb">
        <img src="${p.thumbnail || "/assets/images/no-image.png"}" alt="${
      p.name
    }">
      </a>
      <div class="info">
        <h3 class="name">${p.name}</h3>
        <div class="price">${
          p.price ? p.price + " $" : "Price not available"
        }</div>
        <p class="desc">${p.short_desc || "No description available."}</p>
        <div class="actions">
          <a href="product.php?slug=${
            p.slug
          }" class="btn btn-primary">View Details</a>
          <button class="btn btn-outline">Add to Cart</button>
        </div>
      </div>
    `;
    gridEl.appendChild(listItem);
  }

  function renderPagination(meta) {
    if (!paginationEl) return;

    paginationEl.innerHTML = "";
    if (!meta || meta.total <= meta.per_page) return;
    const totalPages = Math.ceil(meta.total / meta.per_page);

    // Previous button
    if (state.page > 1) {
      const prevBtn = document.createElement("button");
      prevBtn.textContent = "Previous";
      prevBtn.addEventListener("click", () => {
        state.page--;
        load();
      });
      paginationEl.appendChild(prevBtn);
    }

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= state.page - 2 && i <= state.page + 2)
      ) {
        const btn = document.createElement("button");
        btn.textContent = i;
        btn.className = i === state.page ? "active" : "";
        btn.addEventListener("click", () => {
          state.page = i;
          load();
        });
        paginationEl.appendChild(btn);
      } else if (i === state.page - 3 || i === state.page + 3) {
        const ellipsis = document.createElement("span");
        ellipsis.textContent = "...";
        ellipsis.className = "pagination-ellipsis";
        paginationEl.appendChild(ellipsis);
      }
    }

    // Next button
    if (state.page < totalPages) {
      const nextBtn = document.createElement("button");
      nextBtn.textContent = "Next";
      nextBtn.addEventListener("click", () => {
        state.page++;
        load();
      });
      paginationEl.appendChild(nextBtn);
    }
  }

  async function load() {
    if (!gridEl) return;

    gridEl.classList.add("loading");
    try {
      const { data, meta } = await fetchProducts();
      renderProducts(data);
      renderPagination(meta);
    } catch (err) {
      gridEl.innerHTML = `<div class="error">Error loading products</div>`;
      console.error(err);
    } finally {
      gridEl.classList.remove("loading");
    }
  }

  // Change view mode (card/list)
  function bindToolbar() {
    if (!toolbarEl) return;

    // Search
    const searchInput = toolbarEl.querySelector("input[name=q]");
    if (searchInput) {
      let debounceTimer;
      searchInput.addEventListener("input", (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          state.q = e.target.value;
          state.page = 1;
          updateFilterCounter();
          load();
        }, 400);
      });
    }

    // Sorting
    const sortSelect = toolbarEl.querySelector("select[name=sort]");
    if (sortSelect) {
      sortSelect.addEventListener("change", (e) => {
        state.sort = e.target.value;
        state.page = 1;
        updateFilterCounter();
        load();
      });
    }

    // Category filter
    if (categorySelect) {
      categorySelect.addEventListener("change", (e) => {
        state.category = e.target.value ? parseInt(e.target.value) : null;
        state.page = 1;
        updateFilterCounter();
        load();
      });
    }
  }

  // Initialize
  document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded - checking toolbar element");
    const toolbarEl = document.getElementById("products-toolbar");
    console.log("Toolbar element:", toolbarEl);

    if (!toolbarEl) {
      console.error("Toolbar element not found!");
      return;
    }

    // Initialize toolbar functionality
    initToolbar();

    // Load categories
    loadCategories().then(() => {
      // Set selected category from URL
      const urlParams = new URLSearchParams(window.location.search);
      const categoryFromUrl = urlParams.get("category");

      if (categoryFromUrl && categorySelect) {
        categorySelect.value = categoryFromUrl;
        state.category = parseInt(categoryFromUrl);
        updateFilterCounter();
      }

      bindToolbar();
      load();
    });
  });
})();
