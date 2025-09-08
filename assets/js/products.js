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
    document.body.style.overflow = "auto";
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
    option.textContent = " ".repeat(level) + category.name;
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
        <button class="btn btn-primary inquiry-btn" data-product="${
          p.name
        }" data-slug="${p.slug}">Inquiry</button>
        <button class="btn btn-primary">Add to Cart</button>
      </div>
    </div>
  `;
    gridEl.appendChild(card);

    // Add event listener to the new inquiry button
    const inquiryBtn = card.querySelector(".inquiry-btn");
    if (inquiryBtn) {
      inquiryBtn.addEventListener("click", function () {
        openInquiryModal(this.dataset.product, this.dataset.slug);
      });
    }
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
        <button class="btn btn-primary inquiry-btn" data-product="${
          p.name
        }" data-slug="${p.slug}">Inquiry</button>
        <button class="btn btn-primary">Add to Cart</button>
      </div>
    </div>
  `;
    gridEl.appendChild(listItem);

    // Add event listener to the new inquiry button
    const inquiryBtn = listItem.querySelector(".inquiry-btn");
    if (inquiryBtn) {
      inquiryBtn.addEventListener("click", function () {
        openInquiryModal(this.dataset.product, this.dataset.slug);
      });
    }
  }

  // Open inquiry modal
  async function openInquiryModal(productName, productSlug) {
    // Check if user is logged in
    const isLoggedIn = await checkLoginStatus();

    if (!isLoggedIn) {
      if (typeof openAuthModal === "function") {
        openAuthModal();
      } else {
        showNotification("Please login first to inquire about products.", "info");
      }
      return;
    }

    // Get WhatsApp number first
    let whatsappNumber;
    try {
      whatsappNumber = await getWhatsAppNumber();
      console.log("WhatsApp number:", whatsappNumber); // Debug log
    } catch (error) {
      console.error("Failed to get WhatsApp number:", error);
      whatsappNumber = "+989193120515"; // Fallback
    }

    // Remove existing modal if any
    const existingModal = document.getElementById("inquiry-modal");
    if (existingModal) {
      existingModal.remove();
    }

    // Create new modal
    const modal = document.createElement("div");
    modal.id = "inquiry-modal";
    modal.className = "inquiry-modal";
    modal.innerHTML = `
    <div class="inquiry-modal-content">
      <div class="inquiry-modal-header">
        <h3 class="inquiry-modal-title">Inquire about ${productName}</h3>
        <button class="inquiry-modal-close">&times;</button>
      </div>
      <div class="inquiry-options">
        <a href="#" class="inquiry-option whatsapp" target="_blank">
          <div class="inquiry-option-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.864 3.488"/>
            </svg>
          </div>
          <span class="inquiry-option-text">Contact via WhatsApp</span>
        </a>
        <a href="#" class="inquiry-option telegram" target="_blank">
          <div class="inquiry-option-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0m5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.05 5.56-5.022c.242-.213-.054-.334-.373-.121l-6.86 4.326-2.96-.924c-.64-.203-.652-.64.136-.954l11.566-4.458c.538-.196 1.006.128.832.941"/>
            </svg>
          </div>
          <span class="inquiry-option-text">Contact via Telegram</span>
        </a>
      </div>
    </div>
  `;

    document.body.appendChild(modal);

    // Add event listeners
    const closeBtn = modal.querySelector(".inquiry-modal-close");
    closeBtn.addEventListener("click", closeInquiryModal);

    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        closeInquiryModal();
      }
    });

    // Add WhatsApp link handler
    const whatsappOption = modal.querySelector(".inquiry-option.whatsapp");
    whatsappOption.addEventListener("click", async function (e) {
      e.preventDefault();

      // Record inquiry in database
      await recordInquiry(productSlug, 'whatsapp');

      // Creating a complete product link
      const productUrl = `${window.location.origin}/product.php?slug=${productSlug}`;

      const message = `*Product Inquiry*
Hello, I'm interested in your product: *${productName}*

*Product Link*: ${productUrl}
----------------------------
Please provide more information and pricing details.`;

      // Ensure the correct number format
      if (!whatsappNumber) {
        showNotification("WhatsApp number not available. Please try again later.", "warning");
        return;
      }
      const cleanNumber = whatsappNumber.replace(/\D/g, "");
      const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(
        message
      )}`;

      console.log("WhatsApp URL:", whatsappUrl); // Debug
      window.open(whatsappUrl, "_blank");
    });

    // Add Telegram link handler
    const telegramOption = modal.querySelector(".inquiry-option.telegram");
    telegramOption.addEventListener("click", async function (e) {
      e.preventDefault();

      // Record inquiry in database
      await recordInquiry(productSlug, 'telegram');

      const telegramUsername = "Meisam_Hajiloo";
      const productUrl = `${window.location.origin}/product.php?slug=${productSlug}`;
      const message = `Hello, I have a question about the product ${productName}.\nProduct Link: ${productUrl}`;
      const telegramUrl = `https://t.me/${telegramUsername}`;

      // Auto copy text to clipboard (help user)
      navigator.clipboard
        .writeText(message)
        .then(() => {
          showNotification(
            "Product information copied to clipboard. Redirecting to Telegram now.",
            "success"
          );

          setTimeout(() => {
            window.open(telegramUrl, "_blank");
          }, 3000);
        })
        .catch(() => {
          showNotification(
            "Error copying to clipboard. Redirecting to Telegram.",
            "warning"
          );
          window.open(telegramUrl, "_blank");
        });
    });

    // Show modal
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  // Close inquiry modal
  function closeInquiryModal() {
    const modal = document.getElementById("inquiry-modal");
    if (modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "auto";
    }
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
    renderLoadingState();

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

  function renderLoadingState() {
    if (!gridEl) return;

    gridEl.innerHTML = `
    <div class="loading-overlay">
      <div class="loading-spinner">
        <div class="loading-spinner-dot"></div>
        <div class="loading-spinner-dot"></div>
        <div class="loading-spinner-dot"></div>
        <div class="loading-spinner-dot"></div>
      </div>
      <div class="loading-text">Loading products...</div>
    </div>
  `;
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

// Function to show notification
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <div class="notification-icon">
        ${type === "success" ? "✓" : type === "warning" ? "⚠" : "ℹ"}
      </div>
      <div class="notification-message">${message}</div>
    </div>
  `;

  document.body.appendChild(notification);

  // Auto remove after 3 seconds
  setTimeout(() => {
    notification.classList.add('notification-exit');
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// Function to check if user is logged in
async function checkLoginStatus() {
  try {
    const response = await fetch("api/auth/check.php");
    const data = await response.json();
    return data.loggedIn;
  } catch (error) {
    console.error("Error checking login status:", error);
    return false;
  }
}

// Function to open auth modal
function openAuthModal() {
  const authModal = document.getElementById("auth-modal");
  if (authModal) {
    authModal.style.display = "block";
    document.body.style.overflow = "hidden";
  } else {
    // Fallback if auth modal doesn't exist
    window.location.href = "index.php#auth";
  }
}

// Function to get WhatsApp number from server
async function getWhatsAppNumber() {
  try {
    const response = await fetch("api/get-phone-number.php");
    const data = await response.json();

    if (data.success && data.whatsappNumber) {
      return data.whatsappNumber;
    } else {
      console.error("Invalid response format:", data);
      return "+989193120515"; // Fallback number
    }
  } catch (error) {
    console.error("Error fetching WhatsApp number:", error);
    return "+989193120515"; // Fallback number
  }
}

// Function to record inquiry in database
async function recordInquiry(productSlug, inquiryVia) {
  try {
    console.log('Sending inquiry request:', { productSlug, inquiryVia });
    
    const response = await fetch("api/products/inquiry.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        product_slug: productSlug,
        inquiry_via: inquiryVia
      })
    });
    
    console.log('Response status:', response.status);
    const responseText = await response.text();
    console.log('Response text:', responseText);
    
    // Extract JSON from response (remove any extra content)
    const jsonMatch = responseText.match(/\{[^}]*\}/s);
    if (jsonMatch) {
      try {
        const data = JSON.parse(jsonMatch[0]);
        console.log('Parsed response:', data);
        
        if (data.success) {
          console.log('Inquiry recorded successfully!');
        } else {
          console.error("Failed to record inquiry:", data.message);
        }
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        console.error('Matched JSON:', jsonMatch[0]);
      }
    } else {
      console.error('No valid JSON found in response');
      console.error('Full response:', responseText);
    }
  } catch (error) {
    console.error("Error recording inquiry:", error);
  }
}
