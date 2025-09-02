// assets/js/products.js
// مدیریت AJAX برای بارگذاری محصولات با صفحه‌بندی، فیلتر، مرتب‌سازی و تغییر حالت نمایش

(function () {
  const apiBase = "api/products";
  const gridEl = document.getElementById("products-grid");
  const toolbarEl = document.getElementById("products-toolbar");
  const paginationEl = document.getElementById("pagination");

  let state = {
    page: 1,
    per_page: 12,
    sort: "newest",
    q: "",
    category: null,
    view: window.innerWidth < 768 ? "list" : "card",
  };

  // کمکی برای فراخوانی API
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

    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement("button");
      btn.textContent = i;
      btn.className = i === meta.page ? "active" : "";
      btn.addEventListener("click", () => {
        state.page = i;
        load();
      });
      paginationEl.appendChild(btn);
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

    const sortSelect = toolbarEl.querySelector("select[name=sort]");
    if (sortSelect) {
      sortSelect.addEventListener("change", (e) => {
        state.sort = e.target.value;
        state.page = 1;
        load();
      });
    }
  }

  // شروع
  document.addEventListener("DOMContentLoaded", () => {
    bindToolbar();
    load();
  });
})();
