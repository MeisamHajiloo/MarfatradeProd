// assets/js/products.js
// مدیریت AJAX برای بارگذاری محصولات با صفحه‌بندی، فیلتر، مرتب‌سازی و تغییر حالت نمایش

(function () {
  const apiBase = "api/products";
  const gridEl = document.getElementById("products-grid");
  const toolbarEl = document.getElementById("products-toolbar");
  const paginationEl = document.getElementById("pagination");
  const categorySelect = document.getElementById("category-filter");

  let state = {
    page: 1,
    per_page: 12,
    sort: "newest",
    q: "",
    category: null,
    view: window.innerWidth < 768 ? "list" : "card",
  };

  // بارگذاری دسته‌بندی‌ها
  async function loadCategories() {
    try {
      const res = await fetch("api/products/categories.php");
      if (!res.ok) throw new Error("Failed to load categories");
      const categories = await res.json();

      // پر کردن dropdown دسته‌بندی‌ها
      categories.forEach((cat) => {
        addCategoryOption(cat);
      });
    } catch (err) {
      console.error("Error loading categories:", err);
    }
  }

  // اضافه کردن دسته‌بندی به dropdown (بازگشتی برای زیردسته‌ها)
  function addCategoryOption(category, level = 0) {
    const option = document.createElement("option");
    option.value = category.id;
    option.textContent = " ".repeat(level) + category.name;
    categorySelect.appendChild(option);

    // اضافه کردن زیردسته‌ها
    if (category.children && category.children.length > 0) {
      category.children.forEach((child) => {
        addCategoryOption(child, level + 1);
      });
    }
  }

  // کمکی برای فراخوانی API محصولات
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
    gridEl.innerHTML = "";
    if (!data || !data.length) {
      gridEl.innerHTML = `<div class="no-results">هیچ محصولی یافت نشد</div>`;
      return;
    }
    data.forEach((p) => {
      const card = document.createElement("div");
      card.className =
        state.view === "card" ? "product-card" : "product-list-item";
      card.innerHTML = `
        <a href="product.php?slug=${p.slug}" class="inner">
          <div class="thumb"><img src="${
            p.thumbnail || "/assets/images/no-image.png"
          }" alt="${p.name}"></div>
          <div class="info">
            <h3 class="name">${p.name}</h3>
            <div class="price">${p.price ? p.price + " تومان" : ""}</div>
            ${
              state.view === "list"
                ? `<p class="desc">${p.short_desc || ""}</p>`
                : ""
            }
          </div>
        </a>
      `;
      gridEl.appendChild(card);
    });
  }

  function renderPagination(meta) {
    paginationEl.innerHTML = "";
    if (!meta || meta.total <= meta.per_page) return;
    const totalPages = Math.ceil(meta.total / meta.per_page);

    // دکمه قبلی
    if (state.page > 1) {
      const prevBtn = document.createElement("button");
      prevBtn.textContent = "قبلی";
      prevBtn.addEventListener("click", () => {
        state.page--;
        load();
      });
      paginationEl.appendChild(prevBtn);
    }

    // شماره صفحات
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

    // دکمه بعدی
    if (state.page < totalPages) {
      const nextBtn = document.createElement("button");
      nextBtn.textContent = "بعدی";
      nextBtn.addEventListener("click", () => {
        state.page++;
        load();
      });
      paginationEl.appendChild(nextBtn);
    }
  }

  async function load() {
    gridEl.classList.add("loading");
    try {
      const { data, meta } = await fetchProducts();
      renderProducts(data);
      renderPagination(meta);
    } catch (err) {
      gridEl.innerHTML = `<div class="error">خطا در بارگذاری محصولات</div>`;
      console.error(err);
    } finally {
      gridEl.classList.remove("loading");
    }
  }

  // تغییر حالت نمایش (card/list)
  function bindToolbar() {
    if (!toolbarEl) return;

    // تغییر حالت نمایش
    const viewSwitch = toolbarEl.querySelector(".view-switch");
    if (viewSwitch) {
      viewSwitch.addEventListener("click", (e) => {
        const mode = e.target.dataset.view;
        if (mode) {
          state.view = mode;
          load();
        }
      });
    }

    // جستجو
    const searchInput = toolbarEl.querySelector("input[name=q]");
    if (searchInput) {
      let debounceTimer;
      searchInput.addEventListener("input", (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          state.q = e.target.value;
          state.page = 1;
          load();
        }, 400);
      });
    }

    // مرتب‌سازی
    const sortSelect = toolbarEl.querySelector("select[name=sort]");
    if (sortSelect) {
      sortSelect.addEventListener("change", (e) => {
        state.sort = e.target.value;
        state.page = 1;
        load();
      });
    }

    // فیلتر دسته‌بندی
    if (categorySelect) {
      categorySelect.addEventListener("change", (e) => {
        state.category = e.target.value ? parseInt(e.target.value) : null;
        state.page = 1;
        load();
      });
    }
  }

  // شروع
  document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded - checking toolbar element");
    const toolbarEl = document.getElementById("products-toolbar");
    console.log("Toolbar element:", toolbarEl);

    if (!toolbarEl) {
      console.error("Toolbar element not found!");
      return;
    }

    // بارگذاری دسته‌بندی‌ها
    loadCategories().then(() => {
      // تنظیم دسته‌بندی انتخابی از URL
      const urlParams = new URLSearchParams(window.location.search);
      const categoryFromUrl = urlParams.get("category");

      if (categoryFromUrl && categorySelect) {
        categorySelect.value = categoryFromUrl;
        state.category = parseInt(categoryFromUrl);
      }

      bindToolbar();
      load();
    });
  });
})();
