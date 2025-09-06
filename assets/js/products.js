// assets/js/products.js
// AJAX management for loading products with pagination, filtering, sorting and view mode changes

(function () {
  const apiBase = "api/products";
  const gridEl = document.getElementById("products-grid");
  const toolbarEl = document.getElementById("products-toolbar");
  const paginationEl = document.getElementById("pagination");
  const categorySelect = document.getElementById("category-filter");
  const sortSelect = document.getElementById("sort-filter");
  const searchInput = document.querySelector("input[name=q]");
  const toolbarToggle = document.getElementById("toolbar-toggle");
  const toolbarContent = document.querySelector(".toolbar-content");
  const toolbarOverlay = document.getElementById("toolbar-overlay");
  const viewSwitchDesktop = document.getElementById("view-switch-desktop");
  const viewSwitchMobile = document.getElementById("view-switch-mobile");
  const closeDrawer = document.getElementById("close-drawer");
  const resetFilters = document.getElementById("reset-filters");

  let state = {
    page: 1,
    per_page: 12,
    sort: "newest",
    q: "",
    category: null,
    view: window.innerWidth < 768 ? "list" : "card",
  };

  let allCategories = [];

  // Save state to sessionStorage
  function saveState() {
    sessionStorage.setItem("productsState", JSON.stringify(state));
  }

  // Load state from sessionStorage
  function loadState() {
    const savedState = sessionStorage.getItem("productsState");
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      state = { ...state, ...parsedState };

      // Update UI elements with saved state
      if (searchInput) searchInput.value = state.q || "";
      if (sortSelect) sortSelect.value = state.sort;
      if (categorySelect) categorySelect.value = state.category || "";

      updateViewMode();
      updateFilterButtonState();
      updateCategorySelectionUI();
    }
  }

  // Update filter button state based on active filters
  function updateFilterButtonState() {
    if (!toolbarToggle) return;

    const hasActiveFilters =
      (searchInput && searchInput.value) ||
      (categorySelect && categorySelect.value) ||
      (sortSelect && sortSelect.value !== "newest");

    if (hasActiveFilters) {
      toolbarToggle.classList.add("active-filter");
    } else {
      toolbarToggle.classList.remove("active-filter");
    }
  }

  // Update UI to show checkmarks for selected categories
  function updateCategorySelectionUI() {
    if (!categorySelect || allCategories.length === 0) return;

    // Reset all options first
    const options = categorySelect.options;
    for (let i = 0; i < options.length; i++) {
      options[i].classList.remove("selected", "child-selected");
    }

    // If no category is selected, return
    if (!state.category) return;

    // Find the selected category
    const selectedCategoryId = parseInt(state.category);

    // Mark the selected option
    const selectedOption = categorySelect.querySelector(
      `option[value="${selectedCategoryId}"]`
    );
    if (selectedOption) {
      selectedOption.classList.add("selected");

      // If it's a parent category, mark all children as selected too
      const category = findCategoryById(selectedCategoryId);
      if (category && category.children && category.children.length > 0) {
        markAllChildrenAsSelected(category);
      }

      // Mark all parent categories as having a selected child
      markParentCategoriesAsChildSelected(selectedCategoryId);
    }
  }

  // Find a category by ID in the category tree
  function findCategoryById(id, categories = allCategories) {
    for (const category of categories) {
      if (category.id === id) return category;
      if (category.children && category.children.length > 0) {
        const found = findCategoryById(id, category.children);
        if (found) return found;
      }
    }
    return null;
  }

  // Mark all children of a category as selected
  function markAllChildrenAsSelected(category) {
    if (!category.children || category.children.length === 0) return;

    for (const child of category.children) {
      const childOption = categorySelect.querySelector(
        `option[value="${child.id}"]`
      );
      if (childOption) {
        childOption.classList.add("child-selected");
      }

      // Recursively mark grandchildren
      if (child.children && child.children.length > 0) {
        markAllChildrenAsSelected(child);
      }
    }
  }

  // Mark all parent categories as having a selected child
  function markParentCategoriesAsChildSelected(categoryId) {
    const category = findCategoryById(categoryId);
    if (!category || !category.parent_id) return;

    let currentParentId = category.parent_id;
    while (currentParentId) {
      const parentOption = categorySelect.querySelector(
        `option[value="${currentParentId}"]`
      );
      if (parentOption) {
        parentOption.classList.add("child-selected");
      }

      const parentCategory = findCategoryById(currentParentId);
      currentParentId = parentCategory ? parentCategory.parent_id : null;
    }
  }

  // Toggle view mode between card and list
  function toggleViewMode(viewType) {
    state.view = viewType;
    updateViewMode();
    saveState();
    load();
  }

  // Initialize toolbar
  function initToolbar() {
    // Set initial view mode
    updateViewMode();
    updateFilterButtonState();

    // Mobile toolbar toggle
    if (toolbarToggle && toolbarContent) {
      toolbarToggle.addEventListener("click", function () {
        toolbarContent.classList.add("active");
        if (toolbarOverlay) {
          toolbarOverlay.classList.add("active");
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

    // Close toolbar when clicking outside on mobile
    document.addEventListener("click", function (event) {
      const isClickInsideToolbar = toolbarContent.contains(event.target);
      const isClickOnToggle = toolbarToggle.contains(event.target);

      if (
        window.innerWidth < 993 &&
        toolbarContent.classList.contains("active") &&
        !isClickInsideToolbar &&
        !isClickOnToggle
      ) {
        closeToolbar();
      }
    });

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

        updateFilterButtonState();
        updateCategorySelectionUI();
        saveState();

        // Close drawer on mobile after reset
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
          const viewType = this.dataset.view;
          toggleViewMode(viewType);
        });
      });
    }

    // View mode toggle for mobile
    if (viewSwitchMobile) {
      const viewBtns = viewSwitchMobile.querySelectorAll(".view-btn");
      viewBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
          const viewType = this.dataset.view;
          toggleViewMode(viewType);

          // Close drawer on mobile after changing view
          if (window.innerWidth < 993) {
            closeToolbar();
          }
        });
      });
    }

    // Monitor filter changes
    if (categorySelect) {
      categorySelect.addEventListener("change", function () {
        state.category = this.value ? parseInt(this.value) : null;
        state.page = 1;
        updateFilterButtonState();
        updateCategorySelectionUI();
        saveState();
        load();
      });
    }

    if (sortSelect) {
      sortSelect.addEventListener("change", function () {
        state.sort = this.value;
        state.page = 1;
        updateFilterButtonState();
        saveState();
        load();
      });
    }

    if (searchInput) {
      searchInput.addEventListener("input", function () {
        updateFilterButtonState();
      });
    }

    // Handle window resize to close mobile toolbar when switching to desktop
    window.addEventListener("resize", handleResize);
  }

  // Handle window resize
  function handleResize() {
    if (window.innerWidth >= 993) {
      // Close mobile drawer when switching to desktop view
      closeToolbar();
    }
  }

  // Close toolbar function
  function closeToolbar() {
    toolbarContent.classList.remove("active");
    if (toolbarOverlay) {
      toolbarOverlay.classList.remove("active");
    }
    document.body.style.overflow = "";
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

      // Store all categories for later use
      allCategories = categories;

      // Fill category dropdown
      if (categorySelect) {
        // Clear existing options except the first one
        while (categorySelect.options.length > 1) {
          categorySelect.remove(1);
        }

        categories.forEach((cat) => {
          addCategoryOption(cat);
        });

        // Update UI to show selected category if any
        updateCategorySelectionUI();

        // Ensure the select value matches state.category
        if (state.category) {
          categorySelect.value = state.category;
        }
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
    option.className = "category-option";

    if (category.children && category.children.length > 0) {
      option.classList.add("has-children");
    }

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
      include_descendants: 1, // Always include subcategories
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
        saveState();
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
          saveState();
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
        saveState();
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
    if (searchInput) {
      let debounceTimer;
      searchInput.addEventListener("input", (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          state.q = e.target.value;
          state.page = 1;
          updateFilterButtonState();
          saveState();
          load();
        }, 400);
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

    // Load saved state first
    loadState();

    // Initialize toolbar functionality
    initToolbar();

    // Load categories
    loadCategories().then(() => {
      // Set selected category from URL (overrides saved state)
      const urlParams = new URLSearchParams(window.location.search);
      const categoryFromUrl = urlParams.get("category");

      if (categoryFromUrl && categorySelect) {
        categorySelect.value = categoryFromUrl;
        state.category = parseInt(categoryFromUrl);
        updateFilterButtonState();
        updateCategorySelectionUI();
        saveState();
      }

      bindToolbar();
      load();
    });
  });
})();
