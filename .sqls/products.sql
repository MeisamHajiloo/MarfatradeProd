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
    thumbnail varchar(255) DEFAULT NULL,
    short_desc text DEFAULT NULL,
    views int(11) DEFAULT 0,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- داده‌های نمونه برای دسته‌بندی‌ها (20 دسته اصلی)
INSERT INTO categories (name, slug, parent_id, description) VALUES
('Electronics', 'electronics', NULL, 'Electronic products category'),
('Home Appliances', 'home-appliances', NULL, 'Home appliances category'),
('Clothing', 'clothing', NULL, 'Clothing and fashion category'),
('Sports', 'sports', NULL, 'Sports equipment category'),
('Books', 'books', NULL, 'Books and literature category'),
('Furniture', 'furniture', NULL, 'Furniture and home decor category'),
('Toys', 'toys', NULL, 'Toys and games category'),
('Beauty', 'beauty', NULL, 'Beauty and personal care category'),
('Jewelry', 'jewelry', NULL, 'Jewelry and accessories category'),
('Automotive', 'automotive', NULL, 'Automotive parts and accessories category'),
('Tools', 'tools', NULL, 'Tools and hardware category'),
('Food', 'food', NULL, 'Food and beverages category'),
('Health', 'health', NULL, 'Health and wellness category'),
('Pet Supplies', 'pet-supplies', NULL, 'Pet supplies category'),
('Office', 'office', NULL, 'Office supplies category'),
('Gardening', 'gardening', NULL, 'Gardening supplies category'),
('Art', 'art', NULL, 'Art and craft supplies category'),
('Music', 'music', NULL, 'Musical instruments category'),
('Baby', 'baby', NULL, 'Baby products category'),
('Travel', 'travel', NULL, 'Travel and luggage category');

-- داده‌های نمونه برای زیردسته‌بندی‌ها (60 زیردسته)
INSERT INTO categories (name, slug, parent_id, description) VALUES
-- زیردسته‌های Electronics
('Smartphones', 'smartphones', 1, 'Smartphones and mobile devices'),
('Laptops', 'laptops', 1, 'Laptops and notebooks'),
('Tablets', 'tablets', 1, 'Tablets and iPads'),
('Cameras', 'cameras', 1, 'Cameras and photography equipment'),
('Headphones', 'headphones', 1, 'Headphones and audio accessories'),
('Wearables', 'wearables', 1, 'Wearable technology'),

-- زیردسته‌های Home Appliances
('Refrigerators', 'refrigerators', 2, 'Refrigerators and freezers'),
('Washing Machines', 'washing-machines', 2, 'Washing machines and dryers'),
('Air Conditioners', 'air-conditioners', 2, 'Air conditioning units'),
('Vacuum Cleaners', 'vacuum-cleaners', 2, 'Vacuum cleaners'),
('Microwaves', 'microwaves', 2, 'Microwave ovens'),
('Coffee Makers', 'coffee-makers', 2, 'Coffee makers and machines'),

-- زیردسته‌های Clothing
('Men Clothing', 'men-clothing', 3, 'Men clothing and apparel'),
('Women Clothing', 'women-clothing', 3, 'Women clothing and apparel'),
('Kids Clothing', 'kids-clothing', 3, 'Kids clothing and apparel'),
('Shoes', 'shoes', 3, 'Shoes and footwear'),
('Accessories', 'accessories', 3, 'Fashion accessories'),
('Sportswear', 'sportswear', 3, 'Sports clothing and apparel'),

-- زیردسته‌های Sports
('Fitness', 'fitness', 4, 'Fitness equipment'),
('Outdoor', 'outdoor', 4, 'Outdoor sports equipment'),
('Water Sports', 'water-sports', 4, 'Water sports equipment'),
('Team Sports', 'team-sports', 4, 'Team sports equipment'),
('Cycling', 'cycling', 4, 'Cycling equipment'),
('Camping', 'camping', 4, 'Camping gear'),

-- زیردسته‌های Books
('Fiction', 'fiction', 5, 'Fiction books'),
('Non-Fiction', 'non-fiction', 5, 'Non-fiction books'),
('Children Books', 'children-books', 5, 'Children books'),
('Educational', 'educational', 5, 'Educational books'),
('Cookbooks', 'cookbooks', 5, 'Cookbooks and recipes'),
('Biographies', 'biographies', 5, 'Biographies and memoirs'),

-- زیردسته‌های Furniture
('Living Room', 'living-room', 6, 'Living room furniture'),
('Bedroom', 'bedroom', 6, 'Bedroom furniture'),
('Kitchen', 'kitchen', 6, 'Kitchen furniture'),
('Office Furniture', 'office-furniture', 6, 'Office furniture'),
('Outdoor Furniture', 'outdoor-furniture', 6, 'Outdoor furniture'),
('Storage', 'storage', 6, 'Storage solutions'),

-- زیردسته‌های Toys
('Educational Toys', 'educational-toys', 7, 'Educational toys'),
('Action Figures', 'action-figures', 7, 'Action figures'),
('Board Games', 'board-games', 7, 'Board games'),
('Puzzles', 'puzzles', 7, 'Puzzles and brain teasers'),
('Outdoor Toys', 'outdoor-toys', 7, 'Outdoor toys'),
('Dolls', 'dolls', 7, 'Dolls and accessories'),

-- زیردسته‌های Beauty
('Skincare', 'skincare', 8, 'Skincare products'),
('Makeup', 'makeup', 8, 'Makeup and cosmetics'),
('Hair Care', 'hair-care', 8, 'Hair care products'),
('Fragrances', 'fragrances', 8, 'Perfumes and fragrances'),
('Bath & Body', 'bath-body', 8, 'Bath and body products'),
('Men Grooming', 'men-grooming', 8, 'Men grooming products'),

-- زیردسته‌های Jewelry
('Rings', 'rings', 9, 'Rings and bands'),
('Necklaces', 'necklaces', 9, 'Necklaces and pendants'),
('Bracelets', 'bracelets', 9, 'Bracelets and bangles'),
('Earrings', 'earrings', 9, 'Earrings and studs'),
('Watches', 'watches', 9, 'Watches and timepieces'),
('Accessories', 'jewelry-accessories', 9, 'Jewelry accessories');

-- داده‌های نمونه برای محصولات (60 محصول)
INSERT INTO `products` (id, name, slug, description, short_description, price, sale_price, sku, stock_quantity, category_id, image, gallery, featured, status, created_at, updated_at, thumbnail, short_desc, views) VALUES
(1, 'iPhone 15 Pro', 'iphone-15-pro', 'Latest iPhone with advanced features', 'Premium smartphone', 999.99, 949.99, 'IP15-PRO', 50, 21, 'assets/images/products/s.jpg', NULL, 1, 'published', '2025-09-01 11:12:04', '2025-09-02 11:24:18', 'assets/images/products/s.jpg', NULL, 5),
(2, 'Samsung Galaxy S23', 'samsung-galaxy-s23', 'Powerful Android smartphone', 'Flagship Android device', 899.99, 849.99, 'SM-S231', 45, 21, 'assets/images/products/s.jpg', NULL, 1, 'published', '2025-09-01 11:12:04', '2025-09-02 09:59:27', 'assets/images/products/s.jpg', NULL, 0),
(3, 'Google Pixel 7', 'google-pixel-7', 'Google flagship smartphone', 'Best camera phone', 799.99, 749.99, 'GP-P7', 35, 21, 'assets/images/products/s.jpg', NULL, 0, 'published', '2025-09-01 11:12:04', '2025-09-02 09:59:27', 'assets/images/products/s.jpg', NULL, 0),
(4, 'MacBook Pro 16\"', 'macbook-pro-16', 'Professional laptop for creatives', 'Powerful creative workstation', 2399.99, 2299.99, 'MBP16-M2', 25, 22, 'assets/images/products/s.jpg', NULL, 1, 'published', '2025-09-01 11:12:04', '2025-09-02 09:59:27', 'assets/images/products/s.jpg', NULL, 0),
(5, 'Dell XPS 15', 'dell-xps-15', 'Premium Windows laptop', 'High-performance Windows laptop', 1899.99, 1799.99, 'DLL-XPS15', 30, 22, 'assets/images/products/s.jpg', NULL, 1, 'published', '2025-09-01 11:12:04', '2025-09-02 09:59:27', 'assets/images/products/s.jpg', NULL, 0),
(6, 'Lenovo ThinkPad X1', 'lenovo-thinkpad-x1', 'Business professional laptop', 'Enterprise-grade laptop', 1699.99, 1599.99, 'LNV-TPX1', 20, 22, 'assets/images/products/s.jpg', NULL, 0, 'published', '2025-09-01 11:12:04', '2025-09-02 09:59:27', 'assets/images/products/s.jpg', NULL, 0),
(7, 'iPad Pro 12.9\"', 'ipad-pro-12-9', 'Professional tablet for creatives', 'Powerful tablet device', 1099.99, 999.99, 'APP-IPDP12', 40, 23, 'assets/images/products/s.jpg', NULL, 1, 'published', '2025-09-01 11:12:04', '2025-09-02 10:12:37', 'assets/images/products/s.jpg', NULL, 1),
(8, 'Samsung Galaxy Tab S8', 'samsung-galaxy-tab-s8', 'Android tablet with S Pen', 'Premium Android tablet', 899.99, 849.99, 'SM-TABS8', 35, 23, 'assets/images/products/s.jpg', NULL, 0, 'published', '2025-09-01 11:12:04', '2025-09-02 10:12:51', 'assets/images/products/s.jpg', NULL, 1),
(9, 'Microsoft Surface Pro 9', 'microsoft-surface-pro-9', '2-in-1 tablet and laptop', 'Versatile computing device', 1299.99, 1199.99, 'MS-SP9', 25, 23, 'assets/images/products/s.jpg', NULL, 1, 'published', '2025-09-01 11:12:04', '2025-09-02 10:12:58', 'assets/images/products/s.jpg', NULL, 1),
(10, 'LG French Door Refrigerator', 'lg-french-door-refrigerator', 'Spacious French door fridge', 'Energy efficient refrigerator', 1899.99, 1799.99, 'LG-FDR500', 15, 27, 'assets/images/products/s.jpg', NULL, 1, 'published', '2025-09-01 11:12:04', '2025-09-02 10:59:30', 'assets/images/products/s.jpg', NULL, 1),
(11, 'Samsung Family Hub Refrigerator', 'samsung-family-hub-refrigerator', 'Smart refrigerator with touchscreen', 'Connected kitchen appliance', 2499.99, 2299.99, 'SM-FHUB', 10, 27, 'assets/images/products/s.jpg', NULL, 1, 'published', '2025-09-01 11:12:04', '2025-09-02 09:59:27', 'assets/images/products/s.jpg', NULL, 0),
(12, 'Whirlpool Side-by-Side Refrigerator', 'whirlpool-side-by-side-refrigerator', 'Reliable side-by-side fridge', 'Durable cooling solution', 1599.99, 1499.99, 'WH-SBS', 20, 27, 'assets/images/products/s.jpg', NULL, 0, 'published', '2025-09-01 11:12:04', '2025-09-02 09:59:27', 'assets/images/products/s.jpg', NULL, 0),
(13, 'Samsung Front Load Washer', 'samsung-front-load-washer', 'Efficient front loading washer', 'Energy saving washing machine', 899.99, 849.99, 'SM-FLW', 25, 28, 'assets/images/products/s.jpg', NULL, 1, 'published', '2025-09-01 11:12:04', '2025-09-02 09:59:27', 'assets/images/products/s.jpg', NULL, 0),
(14, 'Maytag Top Load Washer', 'maytag-top-load-washer', 'Durable top loading washer', 'Reliable laundry solution', 799.99, 749.99, 'MY-TLW', 30, 28, 'assets/images/products/s.jpg', NULL, 0, 'published', '2025-09-01 11:12:04', '2025-09-02 09:59:27', 'assets/images/products/s.jpg', NULL, 0),
(15, 'Men Casual Shirt', 'men-casual-shirt', 'Comfortable casual shirt', 'Everyday wear shirt', 49.99, 44.99, 'MCS-001', 100, 33, 'assets/images/products/s.jpg', NULL, 0, 'published', '2025-09-01 11:12:04', '2025-09-02 09:59:27', 'assets/images/products/s.jpg', NULL, 0),
(16, 'Men Formal Suit', 'men-formal-suit', 'Professional business suit', 'Premium formal wear', 299.99, 279.99, 'MFS-001', 50, 33, 'assets/images/products/s.jpg', NULL, 1, 'published', '2025-09-01 11:12:04', '2025-09-02 09:59:27', 'assets/images/products/s.jpg', NULL, 0),
(17, 'Men Jeans', 'men-jeans', 'Durable denim jeans', 'Comfortable casual pants', 79.99, 69.99, 'MJ-001', 80, 33, 'assets/images/products/s.jpg', NULL, 0, 'published', '2025-09-01 11:12:04', '2025-09-02 09:59:27', 'assets/images/products/s.jpg', NULL, 0),
(18, 'Women Summer Dress', 'women-summer-dress', 'Lightweight summer dress', 'Perfect for warm weather', 89.99, 79.99, 'WSD-001', 60, 34, 'assets/images/products/s.jpg', NULL, 1, 'published', '2025-09-01 11:12:04', '2025-09-02 09:59:27', 'assets/images/products/s.jpg', NULL, 0),
(19, 'Women Blouse', 'women-blouse', 'Elegant women blouse', 'Office and casual wear', 59.99, 49.99, 'WB-001', 70, 34, 'assets/images/products/s.jpg', NULL, 0, 'published', '2025-09-01 11:12:04', '2025-09-02 09:59:27', 'assets/images/products/s.jpg', NULL, 0),
(20, 'Women Skirt', 'women-skirt', 'Fashionable women skirt', 'Versatile bottom wear', 69.99, 59.99, 'WS-001', 65, 34, 'assets/images/products/s.jpg', NULL, 0, 'published', '2025-09-01 11:12:04', '2025-09-02 09:59:27', 'assets/images/products/s.jpg', NULL, 0),
(21, 'Yoga Mat', 'yoga-mat', 'Non-slip yoga mat', 'Comfortable exercise surface', 39.99, 34.99, 'YM-001', 120, 39, 'assets/images/products/s.jpg', NULL, 0, 'published', '2025-09-01 11:12:04', '2025-09-02 09:59:27', 'assets/images/products/s.jpg', NULL, 0),
(22, 'Dumbbell Set', 'dumbbell-set', 'Adjustable weight dumbbells', 'Home workout equipment', 129.99, 119.99, 'DS-001', 40, 39, 'assets/images/products/s.jpg', NULL, 1, 'published', '2025-09-01 11:12:04', '2025-09-02 09:59:27', 'assets/images/products/s.jpg', NULL, 0),
(23, 'Resistance Bands', 'resistance-bands', 'Set of exercise bands', 'Portable workout solution', 29.99, 24.99, 'RB-001', 150, 39, 'assets/images/products/s.jpg', NULL, 0, 'published', '2025-09-01 11:12:04', '2025-09-02 09:59:27', 'assets/images/products/s.jpg', NULL, 0),
(24, 'Camping Tent', 'camping-tent', '4-person camping tent', 'Weather-resistant shelter', 199.99, 179.99, 'CT-001', 30, 40, 'assets/images/products/s.jpg', NULL, 1, 'published', '2025-09-01 11:12:04', '2025-09-02 09:59:27', 'assets/images/products/s.jpg', NULL, 0),
(25, 'Hiking Backpack', 'hiking-backpack', '60L hiking backpack', 'Comfortable carrying solution', 149.99, 139.99, 'HB-001', 45, 40, 'assets/images/products/s.jpg', NULL, 1, 'published', '2025-09-01 11:12:04', '2025-09-02 10:15:29', 'assets/images/products/s.jpg', NULL, 1),
(26, 'Sleeping Bag', 'sleeping-bag', 'All-weather sleeping bag', 'Warm and comfortable', 89.99, 79.99, 'SB-001', 60, 40, 'assets/images/products/s.jpg', NULL, 0, 'published', '2025-09-01 11:12:04', '2025-09-02 09:59:27', 'assets/images/products/s.jpg', NULL, 0),
(27, 'The Great Gatsby', 'the-great-gatsby', 'Classic American novel', 'F. Scott Fitzgerald masterpiece', 12.99, 10.99, 'B-FIC-001', 200, 45, 'assets/images/products/s.jpg', NULL, 1, 'published', '2025-09-01 11:12:04', '2025-09-02 09:59:27', 'assets/images/products/s.jpg', NULL, 0),
(28, 'To Kill a Mockingbird', 'to-kill-a-mockingbird', 'American classic literature', 'Harper Lee novel', 14.99, 12.99, 'B-FIC-002', 180, 45, 'assets/images/products/s.jpg', NULL, 1, 'published', '2025-09-01 11:12:04', '2025-09-02 09:59:27', 'assets/images/products/s.jpg', NULL, 0),
(29, '1984', '1984-book', 'Dystopian classic novel', 'George Orwell masterpiece', 13.99, 11.99, 'B-FIC-003', 190, 45, 'assets/images/products/s.jpg', NULL, 1, 'published', '2025-09-01 11:12:04', '2025-09-02 09:59:27', 'assets/images/products/s.jpg', NULL, 0),
(30, 'Sapiens', 'sapiens-book', 'Brief history of humankind', 'Yuval Noah Harari', 18.99, 16.99, 'B-NF-001', 150, 46, 'assets/images/products/s.jpg', NULL, 1, 'published', '2025-09-01 11:12:04', '2025-09-02 09:59:27', 'assets/images/products/s.jpg', NULL, 0),
(31, 'Atomic Habits', 'atomic-habits', 'Build good habits framework', 'James Clear bestseller', 16.99, 14.99, 'B-NF-002', 170, 46, 'assets/images/products/s.jpg', NULL, 1, 'published', '2025-09-01 11:12:04', '2025-09-02 09:59:27', 'assets/images/products/s.jpg', NULL, 0),
(32, 'Educated', 'educated-book', 'Memoir about education', 'Tara Westover autobiography', 17.99, 15.99, 'B-NF-003', 140, 46, 'assets/images/products/s.jpg', NULL, 0, 'published', '2025-09-01 11:12:04', '2025-09-02 09:59:27', 'assets/images/products/s.jpg', NULL, 0),
(33, 'Leather Sofa', 'leather-sofa', 'Premium genuine leather sofa', 'Comfortable seating', 1299.99, 1199.99, 'F-LS-001', 15, 51, 'assets/images/products/s.jpg', NULL, 1, 'published', '2025-09-01 11:12:04', '2025-09-02 09:59:27', 'assets/images/products/s.jpg', NULL, 0),
(34, 'Coffee Table', 'coffee-table', 'Modern wooden coffee table', 'Living room centerpiece', 299.99, 279.99, 'F-CT-001', 25, 51, 'assets/images/products/s.jpg', NULL, 0, 'published', '2025-09-01 11:12:04', '2025-09-02 09:59:27', 'assets/images/products/s.jpg', NULL, 0),
(35, 'TV Stand', 'tv-stand', 'Entertainment center unit', 'Media storage solution', 399.99, 349.99, 'F-TVS-001', 20, 51, 'assets/images/products/s.jpg', NULL, 0, 'published', '2025-09-01 11:12:04', '2025-09-02 09:59:27', 'assets/images/products/s.jpg', NULL, 0),
(36, 'Queen Size Bed', 'queen-size-bed', 'Comfortable queen bed frame', 'Bedroom centerpiece', 899.99, 849.99, 'F-QB-001', 12, 52, 'assets/images/products/s.jpg', NULL, 1, 'published', '2025-09-01 11:12:04', '2025-09-02 09:59:27', 'assets/images/products/s.jpg', NULL, 0),
(37, 'Dresser', 'dresser', '6-drawer wooden dresser', 'Clothing storage solution', 499.99, 449.99, 'F-DR-001', 18, 52, 'assets/images/products/s.jpg', NULL, 0, 'published', '2025-09-01 11:12:04', '2025-09-02 09:59:27', 'assets/images/products/s.jpg', NULL, 0),
(38, 'Nightstand', 'nightstand', 'Bedside table with drawer', 'Convenient bedroom accessory', 199.99, 179.99, 'F-NS-001', 30, 52, 'assets/images/products/s.jpg', NULL, 0, 'published', '2025-09-01 11:12:04', '2025-09-02 09:59:27', 'assets/images/products/s.jpg', NULL, 0),
(39, 'STEM Robotics Kit', 'stem-robotics-kit', 'Educational robotics set', 'Learn programming basics', 89.99, 79.99, 'T-EDU-001', 40, 57, 'assets/images/products/s.jpg', NULL, 1, 'published', '2025-09-01 11:12:04', '2025-09-02 09:59:27', 'assets/images/products/s.jpg', NULL, 0),
(40, 'Building Blocks Set', 'building-blocks-set', 'Creative construction toys', 'Develop motor skills', 49.99, 44.99, 'T-EDU-002', 60, 57, 'assets/images/products/s.jpg', NULL, 0, 'published', '2025-09-01 11:12:04', '2025-09-02 09:59:27', 'assets/images/products/s.jpg', NULL, 0),
(41, 'Science Experiment Kit', 'science-experiment-kit', 'Hands-on learning kit', 'Discover scientific principles', 69.99, 59.99, 'T-EDU-003', 35, 57, 'assets/images/products/s.jpg', NULL, 1, 'published', '2025-09-01 11:12:04', '2025-09-02 09:59:27', 'assets/images/products/s.jpg', NULL, 0),
(42, 'Chess Set', 'chess-set', 'Classic strategy game', 'Wooden chess board', 39.99, 34.99, 'T-BG-001', 50, 59, 'assets/images/products/s.jpg', NULL, 0, 'published', '2025-09-01 11:12:04', '2025-09-02 09:59:27', 'assets/images/products/s.jpg', NULL, 0),
(43, 'Monopoly', 'monopoly-game', 'Classic property trading game', 'Family game night', 29.99, 24.99, 'T-BG-002', 70, 59, 'assets/images/products/s.jpg', NULL, 1, 'published', '2025-09-01 11:12:04', '2025-09-02 09:59:27', 'assets/images/products/s.jpg', NULL, 0),
(44, 'Jenga', 'jenga-game', 'Stacking tower game', 'Test your steady hands', 19.99, 16.99, 'T-BG-003', 80, 59, 'assets/images/products/s.jpg', NULL, 0, 'published', '2025-09-01 11:12:04', '2025-09-02 09:59:27', 'assets/images/products/s.jpg', NULL, 0),
(45, 'Face Moisturizer', 'face-moisturizer', 'Hydrating daily moisturizer', 'Nourish your skin', 34.99, 29.99, 'B-SK-001', 90, 63, 'assets/images/products/s.jpg', NULL, 1, 'published', '2025-09-01 11:12:04', '2025-09-02 09:59:27', 'assets/images/products/s.jpg', NULL, 0),
(46, 'Sunscreen SPF 50', 'sunscreen-spf50', 'Daily protection sunscreen', 'UV protection', 24.99, 19.99, 'B-SK-002', 110, 63, 'assets/images/products/s.jpg', NULL, 0, 'published', '2025-09-01 11:12:04', '2025-09-02 09:59:27', 'assets/images/products/s.jpg', NULL, 0),
(47, 'Face Serum', 'face-serum', 'Anti-aging vitamin C serum', 'Brighten and even skin', 49.99, 44.99, 'B-SK-003', 75, 63, 'assets/images/products/s.jpg', NULL, 1, 'published', '2025-09-01 11:12:04', '2025-09-02 09:59:27', 'assets/images/products/s.jpg', NULL, 0),
(48, 'Foundation', 'foundation-makeup', 'Natural finish foundation', 'Flawless coverage', 39.99, 34.99, 'B-MU-001', 85, 64, 'assets/images/products/s.jpg', NULL, 1, 'published', '2025-09-01 11:12:04', '2025-09-02 09:59:27', 'assets/images/products/s.jpg', NULL, 0),
(49, 'Mascara', 'mascara', 'Lengthening and volumizing', 'Dramatic lashes', 24.99, 19.99, 'B-MU-002', 100, 64, 'assets/images/products/s.jpg', NULL, 0, 'published', '2025-09-01 11:12:04', '2025-09-02 09:59:27', 'assets/images/products/s.jpg', NULL, 0),
(50, 'Lipstick Set', 'lipstick-set', '6 shades lipstick collection', 'Variety of colors', 49.99, 44.99, 'B-MU-003', 65, 64, 'assets/images/products/s.jpg', NULL, 1, 'published', '2025-09-01 11:12:04', '2025-09-02 09:59:27', 'assets/images/products/s.jpg', NULL, 0),
(51, 'Diamond Engagement Ring', 'diamond-engagement-ring', '1 carat solitaire diamond', 'Timeless proposal ring', 2999.99, 2799.99, 'J-R-001', 8, 69, 'assets/images/products/s.jpg', NULL, 1, 'published', '2025-09-01 11:12:04', '2025-09-02 09:59:27', 'assets/images/products/s.jpg', NULL, 0),
(52, 'Gold Wedding Band', 'gold-wedding-band', 'Classic 14k gold band', 'Traditional wedding ring', 899.99, 849.99, 'J-R-002', 15, 69, 'assets/images/products/s.jpg', NULL, 0, 'published', '2025-09-01 11:12:04', '2025-09-02 09:59:27', 'assets/images/products/s.jpg', NULL, 0),
(53, 'Silver Statement Ring', 'silver-statement-ring', 'Bold sterling silver ring', 'Fashion accessory', 129.99, 119.99, 'J-R-003', 25, 69, 'assets/images/products/s.jpg', NULL, 0, 'published', '2025-09-01 11:12:04', '2025-09-02 09:59:27', 'assets/images/products/s.jpg', NULL, 0);
