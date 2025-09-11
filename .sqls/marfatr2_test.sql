-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 11, 2025 at 02:12 PM
-- Server version: 5.7.43
-- PHP Version: 8.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `marfatr2_test`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `description` text,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `slug`, `parent_id`, `description`, `image`, `created_at`) VALUES
(1, 'Electronics', 'electronics', NULL, 'Electronic products category', NULL, '2025-09-02 11:22:06'),
(2, 'Home Appliances', 'home-appliances', NULL, 'Home appliances category', NULL, '2025-09-02 11:22:06'),
(3, 'Clothing', 'clothing', NULL, 'Clothing and fashion category', NULL, '2025-09-02 11:22:06'),
(4, 'Sports', 'sports', NULL, 'Sports equipment category', NULL, '2025-09-02 11:22:06'),
(5, 'Books', 'books', NULL, 'Books and literature category', NULL, '2025-09-02 11:22:06'),
(6, 'Furniture', 'furniture', NULL, 'Furniture and home decor category', NULL, '2025-09-02 11:22:06'),
(7, 'Toys', 'toys', NULL, 'Toys and games category', NULL, '2025-09-02 11:22:06'),
(8, 'Beauty', 'beauty', NULL, 'Beauty and personal care category', NULL, '2025-09-02 11:22:06'),
(9, 'Jewelry', 'jewelry', NULL, 'Jewelry and accessories category', NULL, '2025-09-02 11:22:06'),
(10, 'Automotive', 'automotive', NULL, 'Automotive parts and accessories category', NULL, '2025-09-02 11:22:06'),
(11, 'Tools', 'tools', NULL, 'Tools and hardware category', NULL, '2025-09-02 11:22:06'),
(12, 'Food', 'food', NULL, 'Food and beverages category', NULL, '2025-09-02 11:22:06'),
(13, 'Health', 'health', NULL, 'Health and wellness category', NULL, '2025-09-02 11:22:06'),
(14, 'Pet Supplies', 'pet-supplies', NULL, 'Pet supplies category', NULL, '2025-09-02 11:22:06'),
(15, 'Office', 'office', NULL, 'Office supplies category', NULL, '2025-09-02 11:22:06'),
(16, 'Gardening', 'gardening', NULL, 'Gardening supplies category', NULL, '2025-09-02 11:22:06'),
(17, 'Art', 'art', NULL, 'Art and craft supplies category', NULL, '2025-09-02 11:22:06'),
(18, 'Music', 'music', NULL, 'Musical instruments category', NULL, '2025-09-02 11:22:06'),
(19, 'Baby', 'baby', NULL, 'Baby products category', NULL, '2025-09-02 11:22:06'),
(20, 'Travel', 'travel', NULL, 'Travel and luggage category', NULL, '2025-09-02 11:22:06'),
(21, 'Smartphones', 'smartphones', 1, 'Smartphones and mobile devices', NULL, '2025-09-02 11:22:06'),
(22, 'Laptops', 'laptops', 1, 'Laptops and notebooks', NULL, '2025-09-02 11:22:06'),
(23, 'Tablets', 'tablets', 1, 'Tablets and iPads', NULL, '2025-09-02 11:22:06'),
(24, 'Cameras', 'cameras', 1, 'Cameras and photography equipment', NULL, '2025-09-02 11:22:06'),
(25, 'Headphones', 'headphones', 1, 'Headphones and audio accessories', NULL, '2025-09-02 11:22:06'),
(26, 'Wearables', 'wearables', 1, 'Wearable technology', NULL, '2025-09-02 11:22:06'),
(27, 'Refrigerators', 'refrigerators', 2, 'Refrigerators and freezers', NULL, '2025-09-02 11:22:06'),
(28, 'Washing Machines', 'washing-machines', 2, 'Washing machines and dryers', NULL, '2025-09-02 11:22:06'),
(29, 'Air Conditioners', 'air-conditioners', 2, 'Air conditioning units', NULL, '2025-09-02 11:22:06'),
(30, 'Vacuum Cleaners', 'vacuum-cleaners', 2, 'Vacuum cleaners', NULL, '2025-09-02 11:22:06'),
(31, 'Microwaves', 'microwaves', 2, 'Microwave ovens', NULL, '2025-09-02 11:22:06'),
(32, 'Coffee Makers', 'coffee-makers', 2, 'Coffee makers and machines', NULL, '2025-09-02 11:22:06'),
(33, 'Men Clothing', 'men-clothing', 3, 'Men clothing and apparel', NULL, '2025-09-02 11:22:06'),
(34, 'Women Clothing', 'women-clothing', 3, 'Women clothing and apparel', NULL, '2025-09-02 11:22:06'),
(35, 'Kids Clothing', 'kids-clothing', 3, 'Kids clothing and apparel', NULL, '2025-09-02 11:22:06'),
(36, 'Shoes', 'shoes', 3, 'Shoes and footwear', NULL, '2025-09-02 11:22:06'),
(37, 'Accessories', 'accessories', 3, 'Fashion accessories', NULL, '2025-09-02 11:22:06'),
(38, 'Sportswear', 'sportswear', 3, 'Sports clothing and apparel', NULL, '2025-09-02 11:22:06'),
(39, 'Fitness', 'fitness', 4, 'Fitness equipment', NULL, '2025-09-02 11:22:06'),
(40, 'Outdoor', 'outdoor', 4, 'Outdoor sports equipment', NULL, '2025-09-02 11:22:06'),
(41, 'Water Sports', 'water-sports', 4, 'Water sports equipment', NULL, '2025-09-02 11:22:06'),
(42, 'Team Sports', 'team-sports', 4, 'Team sports equipment', NULL, '2025-09-02 11:22:06'),
(43, 'Cycling', 'cycling', 4, 'Cycling equipment', NULL, '2025-09-02 11:22:06'),
(44, 'Camping', 'camping', 4, 'Camping gear', NULL, '2025-09-02 11:22:06'),
(45, 'Fiction', 'fiction', 5, 'Fiction books', NULL, '2025-09-02 11:22:06'),
(46, 'Non-Fiction', 'non-fiction', 5, 'Non-fiction books', NULL, '2025-09-02 11:22:06'),
(47, 'Children Books', 'children-books', 5, 'Children books', NULL, '2025-09-02 11:22:06'),
(48, 'Educational', 'educational', 5, 'Educational books', NULL, '2025-09-02 11:22:06'),
(49, 'Cookbooks', 'cookbooks', 5, 'Cookbooks and recipes', NULL, '2025-09-02 11:22:06'),
(50, 'Biographies', 'biographies', 5, 'Biographies and memoirs', NULL, '2025-09-02 11:22:06'),
(51, 'Living Room', 'living-room', 6, 'Living room furniture', NULL, '2025-09-02 11:22:06'),
(52, 'Bedroom', 'bedroom', 6, 'Bedroom furniture', NULL, '2025-09-02 11:22:06'),
(53, 'Kitchen', 'kitchen', 6, 'Kitchen furniture', NULL, '2025-09-02 11:22:06'),
(54, 'Office Furniture', 'office-furniture', 6, 'Office furniture', NULL, '2025-09-02 11:22:06'),
(55, 'Outdoor Furniture', 'outdoor-furniture', 6, 'Outdoor furniture', NULL, '2025-09-02 11:22:06'),
(56, 'Storage', 'storage', 6, 'Storage solutions', NULL, '2025-09-02 11:22:06'),
(57, 'Educational Toys', 'educational-toys', 7, 'Educational toys', NULL, '2025-09-02 11:22:06'),
(58, 'Action Figures', 'action-figures', 7, 'Action figures', NULL, '2025-09-02 11:22:06'),
(59, 'Board Games', 'board-games', 7, 'Board games', NULL, '2025-09-02 11:22:06'),
(60, 'Puzzles', 'puzzles', 7, 'Puzzles and brain teasers', NULL, '2025-09-02 11:22:06'),
(61, 'Outdoor Toys', 'outdoor-toys', 7, 'Outdoor toys', NULL, '2025-09-02 11:22:06'),
(62, 'Dolls', 'dolls', 7, 'Dolls and accessories', NULL, '2025-09-02 11:22:06'),
(63, 'Skincare', 'skincare', 8, 'Skincare products', NULL, '2025-09-02 11:22:06'),
(64, 'Makeup', 'makeup', 8, 'Makeup and cosmetics', NULL, '2025-09-02 11:22:06'),
(65, 'Hair Care', 'hair-care', 8, 'Hair care products', NULL, '2025-09-02 11:22:06'),
(66, 'Fragrances', 'fragrances', 8, 'Perfumes and fragrances', NULL, '2025-09-02 11:22:06'),
(67, 'Bath & Body', 'bath-body', 8, 'Bath and body products', NULL, '2025-09-02 11:22:06'),
(68, 'Men Grooming', 'men-grooming', 8, 'Men grooming products', NULL, '2025-09-02 11:22:06'),
(69, 'Rings', 'rings', 9, 'Rings and bands', NULL, '2025-09-02 11:22:06'),
(70, 'Necklaces', 'necklaces', 9, 'Necklaces and pendants', NULL, '2025-09-02 11:22:06'),
(71, 'Bracelets', 'bracelets', 9, 'Bracelets and bangles', NULL, '2025-09-02 11:22:06'),
(72, 'Earrings', 'earrings', 9, 'Earrings and studs', NULL, '2025-09-02 11:22:06'),
(73, 'Watches', 'watches', 9, 'Watches and timepieces', NULL, '2025-09-02 11:22:06'),
(74, 'Accessories', 'jewelry-accessories', 9, 'Jewelry accessories', NULL, '2025-09-02 11:22:06');

-- --------------------------------------------------------

--
-- Table structure for table `counters`
--

CREATE TABLE `counters` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `count` int(11) NOT NULL,
  `icon` varchar(50) NOT NULL,
  `sort_order` int(11) DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `counters`
--

INSERT INTO `counters` (`id`, `title`, `count`, `icon`, `sort_order`) VALUES
(1, 'Our Customers', 5, 'fas fa-users', 1),
(2, 'Products', 1480, 'fas fa-box', 2),
(3, 'Inquiries', 205321, 'fas fa-question-circle', 3);

-- --------------------------------------------------------

--
-- Table structure for table `login_logs`
--

CREATE TABLE `login_logs` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `login_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` varchar(255) DEFAULT NULL,
  `success` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `login_logs`
--

INSERT INTO `login_logs` (`id`, `user_id`, `login_time`, `ip_address`, `user_agent`, `success`) VALUES
(0, 0, '2025-08-31 14:42:00', '5.212.40.163', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36', 1),
(0, 0, '2025-08-31 18:47:31', '5.114.78.101', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36', 1),
(0, 0, '2025-09-06 19:24:53', '5.211.82.11', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Mobile Safari/537.36', 1),
(0, 0, '2025-09-07 09:14:09', '89.198.159.95', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 1),
(0, 0, '2025-09-07 09:30:16', '89.198.159.95', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Mobile Safari/537.36', 1),
(0, 0, '2025-09-07 09:30:17', '89.198.159.95', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Mobile Safari/537.36', 1),
(0, 0, '2025-09-07 14:25:28', '89.198.159.95', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Mobile Safari/537.36', 1),
(0, 0, '2025-09-07 14:30:29', '89.198.159.95', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Mobile Safari/537.36', 1),
(0, 0, '2025-09-07 16:14:51', '89.198.159.95', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Mobile Safari/537.36', 1),
(0, 0, '2025-09-07 16:18:06', '51.210.103.160', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Mobile Safari/537.36', 1),
(0, 0, '2025-09-07 17:15:05', '51.210.103.160', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Mobile Safari/537.36', 1),
(0, 0, '2025-09-08 05:05:32', '37.235.49.168', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 1),
(0, 0, '2025-09-08 05:10:54', '82.180.236.183', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 1),
(0, 0, '2025-09-08 12:57:09', '46.51.67.240', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 1),
(0, 1, '2025-09-08 13:44:04', '77.83.245.50', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36 Edg/140.0.0.0', 1),
(0, 1, '2025-09-08 13:44:04', '77.83.245.50', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36 Edg/140.0.0.0', 1),
(0, 1, '2025-09-08 13:50:19', '77.83.245.50', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36 Edg/140.0.0.0', 1),
(0, 1, '2025-09-08 14:02:26', '77.83.245.50', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 1),
(0, 1, '2025-09-08 14:20:13', '77.83.245.50', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 1),
(0, 1, '2025-09-08 14:52:39', '77.83.245.50', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 1),
(0, 1, '2025-09-08 15:12:10', '77.83.245.50', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 1),
(0, 1, '2025-09-08 15:19:21', '77.83.245.50', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 1),
(0, 1, '2025-09-08 16:04:27', '46.51.67.240', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 1),
(0, 1, '2025-09-08 16:28:57', '77.83.245.50', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 1),
(0, 1, '2025-09-09 05:37:28', '77.83.245.50', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 1),
(0, 1, '2025-09-09 15:36:45', '83.217.9.64', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36 Edg/140.0.0.0', 1),
(0, 1, '2025-09-09 16:34:44', '83.217.9.64', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36 Edg/140.0.0.0', 1),
(0, 1, '2025-09-09 17:47:46', '5.210.91.172', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Mobile Safari/537.36', 1),
(0, 1, '2025-09-09 17:52:20', '5.210.91.172', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Mobile Safari/537.36', 1),
(0, 1, '2025-09-10 06:09:44', '89.198.179.18', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Mobile Safari/537.36', 1);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` text,
  `short_description` text,
  `price` decimal(10,2) NOT NULL,
  `sale_price` decimal(10,2) DEFAULT NULL,
  `sku` varchar(100) DEFAULT NULL,
  `stock_quantity` int(11) DEFAULT '0',
  `category_id` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `gallery` text,
  `featured` tinyint(1) DEFAULT '0',
  `status` enum('published','draft','out_of_stock') DEFAULT 'published',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `thumbnail` varchar(255) DEFAULT NULL,
  `short_desc` text,
  `views` int(11) DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `slug`, `description`, `short_description`, `price`, `sale_price`, `sku`, `stock_quantity`, `category_id`, `image`, `gallery`, `featured`, `status`, `created_at`, `updated_at`, `thumbnail`, `short_desc`, `views`) VALUES
(1, 'iPhone 15 Pro', 'iphone-15-pro', 'Latest iPhone with advanced features', 'Premium smartphone', 999.99, 949.99, 'IP15-PRO', 50, 21, 'assets/images/products/s.jpg', NULL, 1, 'published', '2025-09-01 07:42:04', '2025-09-09 04:49:08', 'assets/images/products/s.jpg', NULL, 15),
(2, 'Samsung Galaxy S23', 'samsung-galaxy-s23', 'Powerful Android smartphone', 'Flagship Android device', 899.99, 849.99, 'SM-S231', 45, 21, 'assets/images/products/s.jpg', NULL, 1, 'published', '2025-09-01 07:42:04', '2025-09-09 04:56:29', 'assets/images/products/s.jpg', NULL, 2),
(3, 'Google Pixel 7', 'google-pixel-7', 'Google flagship smartphone', 'Best camera phone', 799.99, 749.99, 'GP-P7', 35, 21, 'assets/images/products/s.jpg', NULL, 0, 'published', '2025-09-01 07:42:04', '2025-09-09 04:54:11', 'assets/images/products/s.jpg', NULL, 4),
(4, 'MacBook Pro 16\"', 'macbook-pro-16', 'Professional laptop for creatives', 'Powerful creative workstation', 2399.99, 2299.99, 'MBP16-M2', 25, 22, 'assets/images/products/s.jpg', NULL, 1, 'published', '2025-09-01 07:42:04', '2025-09-09 05:01:51', 'assets/images/products/s.jpg', NULL, 2),
(5, 'Dell XPS 15', 'dell-xps-15', 'Premium Windows laptop', 'High-performance Windows laptop', 1899.99, 1799.99, 'DLL-XPS15', 30, 22, 'assets/images/products/s.jpg', NULL, 1, 'published', '2025-09-01 07:42:04', '2025-09-09 04:58:52', 'assets/images/products/s.jpg', NULL, 2),
(6, 'Lenovo ThinkPad X1', 'lenovo-thinkpad-x1', 'Business professional laptop', 'Enterprise-grade laptop', 1699.99, 1599.99, 'LNV-TPX1', 20, 22, 'assets/images/products/s.jpg', NULL, 0, 'published', '2025-09-01 07:42:04', '2025-09-09 04:53:00', 'assets/images/products/s.jpg', NULL, 1),
(7, 'iPad Pro 12.9\"', 'ipad-pro-12-9', 'Professional tablet for creatives', 'Powerful tablet device', 1099.99, 999.99, 'APP-IPDP12', 40, 23, 'assets/images/products/s.jpg', NULL, 1, 'published', '2025-09-01 07:42:04', '2025-09-09 04:55:45', 'assets/images/products/s.jpg', NULL, 2),
(8, 'Samsung Galaxy Tab S8', 'samsung-galaxy-tab-s8', 'Android tablet with S Pen', 'Premium Android tablet', 899.99, 849.99, 'SM-TABS8', 35, 23, 'assets/images/products/s.jpg', NULL, 0, 'published', '2025-09-01 07:42:04', '2025-09-09 11:16:34', 'assets/images/products/s.jpg', NULL, 2),
(9, 'Microsoft Surface Pro 9', 'microsoft-surface-pro-9', '2-in-1 tablet and laptop', 'Versatile computing device', 1299.99, 1199.99, 'MS-SP9', 25, 23, 'assets/images/products/s.jpg', NULL, 1, 'published', '2025-09-01 07:42:04', '2025-09-09 15:13:55', 'assets/images/products/s.jpg', NULL, 4),
(10, 'LG French Door Refrigerator', 'lg-french-door-refrigerator', 'Spacious French door fridge', 'Energy efficient refrigerator', 1899.99, 1799.99, 'LG-FDR500', 15, 27, 'assets/images/products/s.jpg', NULL, 1, 'published', '2025-09-01 07:42:04', '2025-09-09 04:53:25', 'assets/images/products/s.jpg', NULL, 2),
(11, 'Samsung Family Hub Refrigerator', 'samsung-family-hub-refrigerator', 'Smart refrigerator with touchscreen', 'Connected kitchen appliance', 2499.99, 2299.99, 'SM-FHUB', 10, 27, 'assets/images/products/s.jpg', NULL, 1, 'published', '2025-09-01 07:42:04', '2025-09-09 04:51:27', 'assets/images/products/s.jpg', NULL, 1),
(12, 'Whirlpool Side-by-Side Refrigerator', 'whirlpool-side-by-side-refrigerator', 'Reliable side-by-side fridge', 'Durable cooling solution', 1599.99, 1499.99, 'WH-SBS', 20, 27, 'assets/images/products/s.jpg', NULL, 0, 'published', '2025-09-01 07:42:04', '2025-09-09 05:00:22', 'assets/images/products/s.jpg', NULL, 2),
(13, 'Samsung Front Load Washer', 'samsung-front-load-washer', 'Efficient front loading washer', 'Energy saving washing machine', 899.99, 849.99, 'SM-FLW', 25, 28, 'assets/images/products/s.jpg', NULL, 1, 'published', '2025-09-01 07:42:04', '2025-09-02 06:29:27', 'assets/images/products/s.jpg', NULL, 0),
(14, 'Maytag Top Load Washer', 'maytag-top-load-washer', 'Durable top loading washer', 'Reliable laundry solution', 799.99, 749.99, 'MY-TLW', 30, 28, 'assets/images/products/s.jpg', NULL, 0, 'published', '2025-09-01 07:42:04', '2025-09-02 06:29:27', 'assets/images/products/s.jpg', NULL, 0),
(15, 'Men Casual Shirt', 'men-casual-shirt', 'Comfortable casual shirt', 'Everyday wear shirt', 49.99, 44.99, 'MCS-001', 100, 33, 'assets/images/products/s.jpg', NULL, 0, 'published', '2025-09-01 07:42:04', '2025-09-07 09:53:19', 'assets/images/products/s.jpg', NULL, 1),
(16, 'Men Formal Suit', 'men-formal-suit', 'Professional business suit', 'Premium formal wear', 299.99, 279.99, 'MFS-001', 50, 33, 'assets/images/products/s.jpg', NULL, 1, 'published', '2025-09-01 07:42:04', '2025-09-02 06:29:27', 'assets/images/products/s.jpg', NULL, 0),
(17, 'Men Jeans', 'men-jeans', 'Durable denim jeans', 'Comfortable casual pants', 79.99, 69.99, 'MJ-001', 80, 33, 'assets/images/products/s.jpg', NULL, 0, 'published', '2025-09-01 07:42:04', '2025-09-02 06:29:27', 'assets/images/products/s.jpg', NULL, 0),
(18, 'Women Summer Dress', 'women-summer-dress', 'Lightweight summer dress', 'Perfect for warm weather', 89.99, 79.99, 'WSD-001', 60, 34, 'assets/images/products/s.jpg', NULL, 1, 'published', '2025-09-01 07:42:04', '2025-09-02 06:29:27', 'assets/images/products/s.jpg', NULL, 0),
(19, 'Women Blouse', 'women-blouse', 'Elegant women blouse', 'Office and casual wear', 59.99, 49.99, 'WB-001', 70, 34, 'assets/images/products/s.jpg', NULL, 0, 'published', '2025-09-01 07:42:04', '2025-09-02 06:29:27', 'assets/images/products/s.jpg', NULL, 0),
(20, 'Women Skirt', 'women-skirt', 'Fashionable women skirt', 'Versatile bottom wear', 69.99, 59.99, 'WS-001', 65, 34, 'assets/images/products/s.jpg', NULL, 0, 'published', '2025-09-01 07:42:04', '2025-09-02 06:29:27', 'assets/images/products/s.jpg', NULL, 0),
(21, 'Yoga Mat', 'yoga-mat', 'Non-slip yoga mat', 'Comfortable exercise surface', 39.99, 34.99, 'YM-001', 120, 39, 'assets/images/products/s.jpg', NULL, 0, 'published', '2025-09-01 07:42:04', '2025-09-02 06:29:27', 'assets/images/products/s.jpg', NULL, 0),
(22, 'Dumbbell Set', 'dumbbell-set', 'Adjustable weight dumbbells', 'Home workout equipment', 129.99, 119.99, 'DS-001', 40, 39, 'assets/images/products/s.jpg', NULL, 1, 'published', '2025-09-01 07:42:04', '2025-09-02 06:29:27', 'assets/images/products/s.jpg', NULL, 0),
(23, 'Resistance Bands', 'resistance-bands', 'Set of exercise bands', 'Portable workout solution', 29.99, 24.99, 'RB-001', 150, 39, 'assets/images/products/s.jpg', NULL, 0, 'published', '2025-09-01 07:42:04', '2025-09-02 06:29:27', 'assets/images/products/s.jpg', NULL, 0),
(24, 'Camping Tent', 'camping-tent', '4-person camping tent', 'Weather-resistant shelter', 199.99, 179.99, 'CT-001', 30, 40, 'assets/images/products/s.jpg', NULL, 1, 'published', '2025-09-01 07:42:04', '2025-09-02 06:29:27', 'assets/images/products/s.jpg', NULL, 0),
(25, 'Hiking Backpack', 'hiking-backpack', '60L hiking backpack', 'Comfortable carrying solution', 149.99, 139.99, 'HB-001', 45, 40, 'assets/images/products/s.jpg', NULL, 1, 'published', '2025-09-01 07:42:04', '2025-09-02 06:45:29', 'assets/images/products/s.jpg', NULL, 1),
(26, 'Sleeping Bag', 'sleeping-bag', 'All-weather sleeping bag', 'Warm and comfortable', 89.99, 79.99, 'SB-001', 60, 40, 'assets/images/products/s.jpg', NULL, 0, 'published', '2025-09-01 07:42:04', '2025-09-02 06:29:27', 'assets/images/products/s.jpg', NULL, 0),
(27, 'The Great Gatsby', 'the-great-gatsby', 'Classic American novel', 'F. Scott Fitzgerald masterpiece', 12.99, 10.99, 'B-FIC-001', 200, 45, 'assets/images/products/s.jpg', NULL, 1, 'published', '2025-09-01 07:42:04', '2025-09-02 06:29:27', 'assets/images/products/s.jpg', NULL, 0),
(28, 'To Kill a Mockingbird', 'to-kill-a-mockingbird', 'American classic literature', 'Harper Lee novel', 14.99, 12.99, 'B-FIC-002', 180, 45, 'assets/images/products/s.jpg', NULL, 1, 'published', '2025-09-01 07:42:04', '2025-09-07 17:29:11', 'assets/images/products/s.jpg', NULL, 1),
(29, '1984', '1984-book', 'Dystopian classic novel', 'George Orwell masterpiece', 13.99, 11.99, 'B-FIC-003', 190, 45, 'assets/images/products/s.jpg', NULL, 1, 'published', '2025-09-01 07:42:04', '2025-09-02 06:29:27', 'assets/images/products/s.jpg', NULL, 0),
(30, 'Sapiens', 'sapiens-book', 'Brief history of humankind', 'Yuval Noah Harari', 18.99, 16.99, 'B-NF-001', 150, 46, 'assets/images/products/s.jpg', NULL, 1, 'published', '2025-09-01 07:42:04', '2025-09-02 06:29:27', 'assets/images/products/s.jpg', NULL, 0),
(31, 'Atomic Habits', 'atomic-habits', 'Build good habits framework', 'James Clear bestseller', 16.99, 14.99, 'B-NF-002', 170, 46, 'assets/images/products/s.jpg', NULL, 1, 'published', '2025-09-01 07:42:04', '2025-09-02 06:29:27', 'assets/images/products/s.jpg', NULL, 0),
(32, 'Educated', 'educated-book', 'Memoir about education', 'Tara Westover autobiography', 17.99, 15.99, 'B-NF-003', 140, 46, 'assets/images/products/s.jpg', NULL, 0, 'published', '2025-09-01 07:42:04', '2025-09-02 06:29:27', 'assets/images/products/s.jpg', NULL, 0),
(33, 'Leather Sofa', 'leather-sofa', 'Premium genuine leather sofa', 'Comfortable seating', 1299.99, 1199.99, 'F-LS-001', 15, 51, 'assets/images/products/s.jpg', NULL, 1, 'published', '2025-09-01 07:42:04', '2025-09-02 06:29:27', 'assets/images/products/s.jpg', NULL, 0),
(34, 'Coffee Table', 'coffee-table', 'Modern wooden coffee table', 'Living room centerpiece', 299.99, 279.99, 'F-CT-001', 25, 51, 'assets/images/products/s.jpg', NULL, 0, 'published', '2025-09-01 07:42:04', '2025-09-02 06:29:27', 'assets/images/products/s.jpg', NULL, 0),
(35, 'TV Stand', 'tv-stand', 'Entertainment center unit', 'Media storage solution', 399.99, 349.99, 'F-TVS-001', 20, 51, 'assets/images/products/s.jpg', NULL, 0, 'published', '2025-09-01 07:42:04', '2025-09-02 06:29:27', 'assets/images/products/s.jpg', NULL, 0),
(36, 'Queen Size Bed', 'queen-size-bed', 'Comfortable queen bed frame', 'Bedroom centerpiece', 899.99, 849.99, 'F-QB-001', 12, 52, 'assets/images/products/s.jpg', NULL, 1, 'published', '2025-09-01 07:42:04', '2025-09-02 06:29:27', 'assets/images/products/s.jpg', NULL, 0),
(37, 'Dresser', 'dresser', '6-drawer wooden dresser', 'Clothing storage solution', 499.99, 449.99, 'F-DR-001', 18, 52, 'assets/images/products/s.jpg', NULL, 0, 'published', '2025-09-01 07:42:04', '2025-09-02 06:29:27', 'assets/images/products/s.jpg', NULL, 0),
(38, 'Nightstand', 'nightstand', 'Bedside table with drawer', 'Convenient bedroom accessory', 199.99, 179.99, 'F-NS-001', 30, 52, 'assets/images/products/s.jpg', NULL, 0, 'published', '2025-09-01 07:42:04', '2025-09-02 06:29:27', 'assets/images/products/s.jpg', NULL, 0),
(39, 'STEM Robotics Kit', 'stem-robotics-kit', 'Educational robotics set', 'Learn programming basics', 89.99, 79.99, 'T-EDU-001', 40, 57, 'assets/images/products/s.jpg', NULL, 1, 'published', '2025-09-01 07:42:04', '2025-09-02 06:29:27', 'assets/images/products/s.jpg', NULL, 0),
(40, 'Building Blocks Set', 'building-blocks-set', 'Creative construction toys', 'Develop motor skills', 49.99, 44.99, 'T-EDU-002', 60, 57, 'assets/images/products/s.jpg', NULL, 0, 'published', '2025-09-01 07:42:04', '2025-09-02 06:29:27', 'assets/images/products/s.jpg', NULL, 0),
(41, 'Science Experiment Kit', 'science-experiment-kit', 'Hands-on learning kit', 'Discover scientific principles', 69.99, 59.99, 'T-EDU-003', 35, 57, 'assets/images/products/s.jpg', NULL, 1, 'published', '2025-09-01 07:42:04', '2025-09-02 06:29:27', 'assets/images/products/s.jpg', NULL, 0),
(42, 'Chess Set', 'chess-set', 'Classic strategy game', 'Wooden chess board', 39.99, 34.99, 'T-BG-001', 50, 59, 'assets/images/products/s.jpg', NULL, 0, 'published', '2025-09-01 07:42:04', '2025-09-02 06:29:27', 'assets/images/products/s.jpg', NULL, 0),
(43, 'Monopoly', 'monopoly-game', 'Classic property trading game', 'Family game night', 29.99, 24.99, 'T-BG-002', 70, 59, 'assets/images/products/s.jpg', NULL, 1, 'published', '2025-09-01 07:42:04', '2025-09-02 06:29:27', 'assets/images/products/s.jpg', NULL, 0),
(44, 'Jenga', 'jenga-game', 'Stacking tower game', 'Test your steady hands', 19.99, 16.99, 'T-BG-003', 80, 59, 'assets/images/products/s.jpg', NULL, 0, 'published', '2025-09-01 07:42:04', '2025-09-02 06:29:27', 'assets/images/products/s.jpg', NULL, 0),
(45, 'Face Moisturizer', 'face-moisturizer', 'Hydrating daily moisturizer', 'Nourish your skin', 34.99, 29.99, 'B-SK-001', 90, 63, 'assets/images/products/s.jpg', NULL, 1, 'published', '2025-09-01 07:42:04', '2025-09-02 06:29:27', 'assets/images/products/s.jpg', NULL, 0),
(46, 'Sunscreen SPF 50', 'sunscreen-spf50', 'Daily protection sunscreen', 'UV protection', 24.99, 19.99, 'B-SK-002', 110, 63, 'assets/images/products/s.jpg', NULL, 0, 'published', '2025-09-01 07:42:04', '2025-09-02 06:29:27', 'assets/images/products/s.jpg', NULL, 0),
(47, 'Face Serum', 'face-serum', 'Anti-aging vitamin C serum', 'Brighten and even skin', 49.99, 44.99, 'B-SK-003', 75, 63, 'assets/images/products/s.jpg', NULL, 1, 'published', '2025-09-01 07:42:04', '2025-09-02 06:29:27', 'assets/images/products/s.jpg', NULL, 0),
(48, 'Foundation', 'foundation-makeup', 'Natural finish foundation', 'Flawless coverage', 39.99, 34.99, 'B-MU-001', 85, 64, 'assets/images/products/s.jpg', NULL, 1, 'published', '2025-09-01 07:42:04', '2025-09-02 06:29:27', 'assets/images/products/s.jpg', NULL, 0),
(49, 'Mascara', 'mascara', 'Lengthening and volumizing', 'Dramatic lashes', 24.99, 19.99, 'B-MU-002', 100, 64, 'assets/images/products/s.jpg', NULL, 0, 'published', '2025-09-01 07:42:04', '2025-09-02 06:29:27', 'assets/images/products/s.jpg', NULL, 0),
(50, 'Lipstick Set', 'lipstick-set', '6 shades lipstick collection', 'Variety of colors', 49.99, 44.99, 'B-MU-003', 65, 64, 'assets/images/products/s.jpg', NULL, 1, 'published', '2025-09-01 07:42:04', '2025-09-02 06:29:27', 'assets/images/products/s.jpg', NULL, 0),
(51, 'Diamond Engagement Ring', 'diamond-engagement-ring', '1 carat solitaire diamond', 'Timeless proposal ring', 2999.99, 2799.99, 'J-R-001', 8, 69, 'assets/images/products/s.jpg', NULL, 1, 'published', '2025-09-01 07:42:04', '2025-09-02 06:29:27', 'assets/images/products/s.jpg', NULL, 0),
(52, 'Gold Wedding Band', 'gold-wedding-band', 'Classic 14k gold band', 'Traditional wedding ring', 899.99, 849.99, 'J-R-002', 15, 69, 'assets/images/products/s.jpg', NULL, 0, 'published', '2025-09-01 07:42:04', '2025-09-02 06:29:27', 'assets/images/products/s.jpg', NULL, 0),
(53, 'Silver Statement Ring', 'silver-statement-ring', 'Bold sterling silver ring', 'Fashion accessory', 129.99, 119.99, 'J-R-003', 25, 69, 'assets/images/products/s.jpg', NULL, 0, 'published', '2025-09-01 07:42:04', '2025-09-02 06:29:27', 'assets/images/products/s.jpg', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `product_inquiries`
--

CREATE TABLE `product_inquiries` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `inquiry_via` enum('whatsapp','telegram') NOT NULL,
  `inquiry_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product_inquiries`
--

INSERT INTO `product_inquiries` (`id`, `product_id`, `user_id`, `inquiry_via`, `inquiry_date`) VALUES
(10, 30, 1, 'whatsapp', '2025-09-09 17:48:39'),
(9, 1, 1, 'telegram', '2025-09-09 05:39:51'),
(8, 1, 1, 'whatsapp', '2025-09-09 05:38:37'),
(4, 9, 1, 'whatsapp', '2025-09-08 13:44:49'),
(5, 1, 1, 'whatsapp', '2025-09-08 14:53:39'),
(6, 27, 1, 'whatsapp', '2025-09-08 16:04:34'),
(7, 27, 1, 'telegram', '2025-09-08 16:04:39'),
(11, 30, 1, 'telegram', '2025-09-09 17:49:10');

-- --------------------------------------------------------

--
-- Table structure for table `slides`
--

CREATE TABLE `slides` (
  `id` int(11) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `button_text` varchar(50) DEFAULT NULL,
  `button_link` varchar(255) DEFAULT NULL,
  `sort_order` int(11) DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `slides`
--

INSERT INTO `slides` (`id`, `image_url`, `title`, `description`, `button_text`, `button_link`, `sort_order`, `is_active`, `created_at`) VALUES
(1, 'assets/images/slide1.jpg', 'Welcome to Marfa Trade', 'Your trusted partner in future trading solutions', 'Get Started', '/register', 1, 1, '2025-08-23 16:17:58'),
(2, 'assets/images/slide2.jpg', 'Advanced Trading Platform', 'Experience our cutting-edge trading technology', 'Learn More', '/platform', 2, 1, '2025-08-23 16:17:58'),
(3, 'assets/images/slide3.jpg', 'Global Market Access', 'Trade across international markets with ease', 'Explore Markets', '/markets', 3, 1, '2025-08-23 16:17:58');

-- --------------------------------------------------------

--
-- Table structure for table `tickets`
--

CREATE TABLE `tickets` (
  `id` int(11) NOT NULL,
  `ticket_number` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `status` enum('open','in_progress','closed') NOT NULL DEFAULT 'open',
  `priority` enum('low','medium','high') NOT NULL DEFAULT 'medium',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tickets`
--

INSERT INTO `tickets` (`id`, `ticket_number`, `user_id`, `subject`, `message`, `status`, `priority`, `created_at`, `updated_at`) VALUES
(5500, 5500, 1, 'تست', 'تست', 'closed', 'low', '2025-09-08 06:19:00', '2025-09-08 16:22:03'),
(5501, 5501, 1, 'test for long message test for long message test for long message test for long message', 'test for long message test for long message test for long message test for long message test for long message test for long message test for long message test for long message test for long message test for long message test for long message test for long message test for long message test for long message test for long message test for long message test for long message test for long message test for long message', 'open', 'medium', '2025-09-07 09:32:21', '2025-09-08 16:22:00'),
(5502, 5502, 1, 'TestFinal', 'testFinal testFinal testFinal testFinal testFinal testFinal testFinal', 'open', 'high', '2025-09-08 11:12:08', '2025-09-08 16:21:56'),
(5503, 5503, 1, 'FinalTest', 'FinalTestFinalTestFinalTestFinalTestFinalTestFinalTestFinalTestFinalTest', 'open', 'low', '2025-09-08 11:24:30', '2025-09-08 16:21:53'),
(5504, 5504, 1, 'test for long message test for long message test for long message test for long message', 'سیبلاسا', 'open', 'medium', '2025-09-08 16:17:18', '2025-09-08 16:17:18'),
(5505, 5505, 1, 'test', 'test', 'open', 'medium', '2025-09-09 05:44:15', '2025-09-09 05:44:15');

--
-- Triggers `tickets`
--
DELIMITER $$
CREATE TRIGGER `set_ticket_number` BEFORE INSERT ON `tickets` FOR EACH ROW BEGIN
    DECLARE next_number INT;
    SELECT COALESCE(MAX(ticket_number), 5499) + 1 INTO next_number FROM tickets;
    SET NEW.ticket_number = next_number;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `ticket_replies`
--

CREATE TABLE `ticket_replies` (
  `id` int(11) NOT NULL,
  `ticket_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `message` text NOT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ticket_replies`
--

INSERT INTO `ticket_replies` (`id`, `ticket_id`, `user_id`, `message`, `is_admin`, `created_at`) VALUES
(1, 5504, 2, 'تست_', 1, '2025-09-08 02:49:28'),
(13, 5504, 1, 'ضصثبضصثب', 0, '2025-09-08 16:22:43'),
(14, 5504, 2, 'ضصثبضصثب', 1, '2025-09-08 16:22:53'),
(15, 5504, 2, 'ادمین', 1, '2025-09-08 16:23:04'),
(16, 5504, 1, 'ثبت', 0, '2025-09-09 05:37:48'),
(17, 5501, 1, 'تست', 0, '2025-09-09 05:40:35'),
(18, 5505, 1, 'test', 0, '2025-09-09 05:44:28'),
(19, 5505, 2, 'test', 1, '2025-09-09 05:54:29'),
(20, 5505, 1, 'تست', 0, '2025-09-09 15:37:25'),
(21, 5505, 2, 'admin', 1, '2025-09-09 15:37:35'),
(22, 5505, 1, 'Test', 0, '2025-09-09 17:50:40');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `profile_picture`, `created_at`, `updated_at`) VALUES
(1, 'Meisam', 'm.hajiloo@gmail.com', '$2y$10$R2R7BpE1iBtyvorT8qrPEusYEGzSDmeU6XOIAGwUj9xVHG2MJT6Ly', 'assets/images/users/user_1_1757440408.jpg', '2025-08-31 14:40:52', '2025-09-09 17:53:28'),
(2, 'Admin', 'admin@marfatrade.com', '$2y$10$ImVhjouMqqfnJi3fGPnCZ.8ob3ygyv3odC4S61X2ACVJWiaU1MNxa', NULL, '2025-09-08 16:27:38', '2025-09-08 16:27:38');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `parent_id` (`parent_id`);

--
-- Indexes for table `counters`
--
ALTER TABLE `counters`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD UNIQUE KEY `sku` (`sku`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `product_inquiries`
--
ALTER TABLE `product_inquiries`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `slides`
--
ALTER TABLE `slides`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ticket_number` (`ticket_number`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `ticket_replies`
--
ALTER TABLE `ticket_replies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ticket_id` (`ticket_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT for table `counters`
--
ALTER TABLE `counters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `product_inquiries`
--
ALTER TABLE `product_inquiries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `slides`
--
ALTER TABLE `slides`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tickets`
--
ALTER TABLE `tickets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5506;

--
-- AUTO_INCREMENT for table `ticket_replies`
--
ALTER TABLE `ticket_replies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
