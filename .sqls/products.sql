-- ایجاد جدول دسته‌بندی‌ها
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    parent_id INT DEFAULT NULL,
    description TEXT,
    image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- ایجاد جدول محصولات
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    short_description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    sale_price DECIMAL(10, 2) DEFAULT NULL,
    sku VARCHAR(100) UNIQUE,
    stock_quantity INT DEFAULT 0,
    category_id INT,
    image VARCHAR(255),
    gallery TEXT, -- JSON string of image paths
    featured BOOLEAN DEFAULT FALSE,
    status ENUM('published', 'draft', 'out_of_stock') DEFAULT 'published',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- داده‌های نمونه برای دسته‌بندی‌ها
INSERT INTO categories (name, slug, parent_id, description) VALUES
('الکترونیک', 'electronics', NULL, 'دسته‌بندی محصولات الکترونیکی'),
('لوازم خانگی', 'home-appliances', NULL, 'دسته‌بندی لوازم خانگی'),
('موبایل و تبلت', 'mobile-tablet', 1, 'گوشی‌های موبایل و تبلت'),
('لپ‌تاپ و کامپیوتر', 'laptop-computer', 1, 'لپ‌تاپ و کامپیوتر'),
('یخچال و فریزر', 'refrigerator-freezer', 2, 'یخچال و فریزر'),
('ماشین‌لباس‌شویی', 'washing-machine', 2, 'ماشین‌لباس‌شویی');

-- داده‌های نمونه برای محصولات
INSERT INTO products (name, slug, description, short_description, price, sale_price, sku, stock_quantity, category_id, image, featured) VALUES
('گوشی هوشمند سامسونگ گلکسی S22', 'samsung-galaxy-s22', 'گوشی هوشمند سامسونگ گلکسی S22 با پردازنده قدرتمند', 'گوشی هوشمند سامسونگ گلکسی S22', 899.99, 849.99, 'SM-S221', 50, 3, '/images/products/s22.jpg', 1),
('لپ‌تاپ اپل مک‌بوک پرو 13', 'apple-macbook-pro-13', 'لپ‌تاپ اپل مک‌بوک پرو 13 با چیپ M1', 'لپ‌تاپ اپل مک‌بوک پرو 13', 1299.99, NULL, 'MBP13-M1', 30, 4, '/images/products/mbp13.jpg', 1),
('یخچال ساید بای ساید ال جی', 'lg-side-by-side-refrigerator', 'یخچال ساید بای ساید ال جی با قابلیت ساخت یخ', 'یخچال ساید بای ساید ال جی', 1599.99, 1399.99, 'LG-SS-500', 15, 5, '/images/products/lg-ref.jpg', 0),
('ماشین لباس‌شویی سامسونگ', 'samsung-washing-machine', 'ماشین لباس‌شویی سامسونگ با ظرفیت 8 کیلوگرم', 'ماشین لباس‌شویی سامسونگ', 699.99, 649.99, 'SAM-WM8', 25, 6, '/images/products/sam-wm.jpg', 0),
('گوشی هوشمند آیفون 13', 'iphone-13', 'گوشی هوشمند آیفون 13 با دوربین پیشرفته', 'گوشی هوشمند آیفون 13', 999.99, 949.99, 'IP13-BL', 40, 3, '/images/products/iphone13.jpg', 1),
('لپ‌تاپ ایسوس ROG', 'asus-rog-laptop', 'لپ‌تاپ گیمینگ ایسوس ROG با کارت گرافیک RTX 3060', 'لپ‌تاپ گیمینگ ایسوس ROG', 1499.99, 1399.99, 'ASUS-ROG15', 20, 4, '/images/products/asus-rog.jpg', 0);