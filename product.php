<?php
require_once __DIR__ . '/includes/header.php';

// گرفتن slug از URL
$slug = isset($_GET['slug']) ? trim($_GET['slug']) : null;
?>

<main class="product-page">
    <a href="products.php" class="back-link">← بازگشت به لیست محصولات</a>
    <div id="product-detail" class="product-detail">
        <!-- جزئیات محصول با AJAX بارگذاری می‌شود -->
    </div>

    <section id="related-products" class="related-products">
        <h2>محصولات مرتبط</h2>
        <div class="products-grid"></div>
    </section>
</main>

<?php
require_once __DIR__ . '/includes/footer.php';
?>

<!-- اسکریپت بارگذاری محصول -->
<script>
    (async function() {
        const container = document.getElementById("product-detail");
        const relatedContainer = document.querySelector("#related-products .products-grid");
        const slug = "<?php echo $slug ?: ''; ?>";
        if (!slug) {
            container.innerHTML = '<div class="error">شناسه محصول یافت نشد.</div>';
            return;
        }

        container.classList.add("loading");
        try {
            const res = await fetch(`api/products/detail.php?slug=${slug}`);
            if (!res.ok) throw new Error("خطا در دریافت محصول");
            const product = await res.json();

            if (product.error) {
                container.innerHTML = `<div class="error">${product.message}</div>`;
                return;
            }

            container.innerHTML = `
      <div class="product-box">
        <div class="thumb">
          <img src="${product.thumbnail || '/assets/img/no-image.png'}" alt="${product.name}" />
        </div>
        <div class="info">
          <h1 class="name">${product.name}</h1>
          <div class="price">${product.price ? product.price + ' تومان' : ''}</div>
          <p class="desc">${product.description || ''}</p>
          ${product.gallery && product.gallery.length ? `
            <div class="gallery">
              ${product.gallery.map(img => `<img src="${img}" alt="${product.name}">`).join('')}
            </div>` : ''}
        </div>
      </div>
    `;

            // بارگذاری محصولات مرتبط
            if (product.category && product.category.id) {
                try {
                    const resRelated = await fetch(`api/products/list.php?per_page=4&category=${product.category.id}`);
                    if (resRelated.ok) {
                        const {
                            data
                        } = await resRelated.json();
                        const related = data.filter(p => p.slug !== product.slug);

                        if (related.length) {
                            relatedContainer.innerHTML = related.map(p => `
              <div class="product-card">
                <a href="product.php?slug=${p.slug}" class="inner">
                  <div class="thumb"><img src="${p.thumbnail || '/assets/img/no-image.png'}" alt="${p.name}"></div>
                  <div class="info">
                    <h3 class="name">${p.name}</h3>
                    <div class="price">${p.price ? p.price + ' تومان' : ''}</div>
                  </div>
                </a>
              </div>
            `).join("");
                        } else {
                            relatedContainer.innerHTML = '<div class="no-related">محصول مرتبطی یافت نشد</div>';
                        }
                    }
                } catch (err) {
                    console.error("خطا در بارگذاری محصولات مرتبط", err);
                }
            }
        } catch (err) {
            container.innerHTML = '<div class="error">خطا در بارگذاری محصول</div>';
            console.error(err);
        } finally {
            container.classList.remove("loading");
        }
    })();
</script>

<style>
    .product-page {
        max-width: 1200px;
        margin: 80px auto 0;
        /* فاصله از ناوبری ثابت */
        padding: 1rem;
    }

    .product-page .back-link {
        display: inline-block;
        margin-bottom: 1rem;
        color: #007bff;
        text-decoration: none;
    }

    .product-page .back-link:hover {
        text-decoration: underline;
    }

    .product-detail.loading::after {
        content: "در حال بارگذاری...";
        display: block;
        padding: 2rem;
        text-align: center;
        color: #555;
    }

    .product-box {
        display: flex;
        gap: 2rem;
        padding: 1rem;
        border: 1px solid #eee;
        border-radius: 12px;
        background: #fff;
    }

    .product-box .thumb img {
        max-width: 320px;
        border-radius: 8px;
    }

    .product-box .info {
        flex: 1;
    }

    .product-box .name {
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 1rem;
    }

    .product-box .price {
        font-size: 1.2rem;
        color: #007bff;
        margin-bottom: 1rem;
    }

    .product-box .desc {
        font-size: 1rem;
        color: #444;
    }

    .product-box .gallery {
        margin-top: 1rem;
        display: flex;
        gap: 0.5rem;
    }

    .product-box .gallery img {
        max-width: 100px;
        border-radius: 6px;
    }

    .related-products {
        margin-top: 3rem;
    }

    .related-products h2 {
        font-size: 1.25rem;
        margin-bottom: 1rem;
    }

    .related-products .products-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 1rem;
    }

    .related-products .product-card {
        border: 1px solid #eee;
        border-radius: 10px;
        overflow: hidden;
        background: #fff;
        transition: box-shadow 0.2s;
    }

    .related-products .product-card:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }

    .related-products .thumb img {
        width: 100%;
        height: 140px;
        object-fit: cover;
    }

    .related-products .info {
        padding: 0.5rem 0.75rem 1rem;
    }

    .related-products .name {
        font-size: 1rem;
        font-weight: 600;
    }

    .related-products .price {
        font-size: 0.9rem;
        color: #444;
    }
</style>