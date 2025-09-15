-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 15, 2025 at 09:45 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

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
  `description` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `slug`, `parent_id`, `description`, `image`, `created_at`) VALUES
(35, 'Perfumes', 'perfumes', 31, 'Fragrances and colognes.', 'perfumes.jpg', '2025-09-15 06:18:25'),
(34, 'Hair Care', 'hair-care', 31, 'Shampoos, conditioners, and hair styling products.', 'hair-care.jpg', '2025-09-15 06:18:25'),
(33, 'Makeup', 'makeup', 31, 'Cosmetics and makeup products.', 'makeup.jpg', '2025-09-15 06:18:25'),
(32, 'Skincare', 'skincare', 31, 'Face creams, cleansers, and skincare products.', 'skincare.jpg', '2025-09-15 06:18:25'),
(31, 'Health & Beauty', 'health-beauty', NULL, 'Cosmetics, skincare, and health products.', 'health-beauty.jpg', '2025-09-15 06:18:25'),
(30, 'Music', 'music', 25, 'CDs, vinyl records, and digital music.', 'music.jpg', '2025-09-15 06:18:25'),
(29, 'Video Games', 'video-games', 25, 'Console and PC games.', 'video-games.jpg', '2025-09-15 06:18:25'),
(28, 'Movies & TV', 'movies-tv', 25, 'DVDs, Blu-rays, and streaming media.', 'movies-tv.jpg', '2025-09-15 06:18:25'),
(27, 'Non-Fiction Books', 'non-fiction-books', 25, 'Educational and factual books.', 'non-fiction-books.jpg', '2025-09-15 06:18:25'),
(26, 'Fiction Books', 'fiction-books', 25, 'Novels and fiction literature.', 'fiction-books.jpg', '2025-09-15 06:18:25'),
(25, 'Books & Media', 'books-media', NULL, 'Books, movies, music, and games.', 'books-media.jpg', '2025-09-15 06:18:25'),
(24, 'Team Sports', 'team-sports', 19, 'Equipment for soccer, basketball, and other team sports.', 'team-sports.jpg', '2025-09-15 06:18:25'),
(23, 'Water Sports', 'water-sports', 19, 'Equipment for swimming, diving, and water activities.', 'water-sports.jpg', '2025-09-15 06:18:25'),
(22, 'Cycling', 'cycling', 19, 'Bicycles, parts, and cycling accessories.', 'cycling.jpg', '2025-09-15 06:18:25'),
(21, 'Camping Gear', 'camping-gear', 19, 'Tents, sleeping bags, and camping supplies.', 'camping-gear.jpg', '2025-09-15 06:18:25'),
(20, 'Fitness Equipment', 'fitness-equipment', 19, 'Exercise machines, weights, and fitness accessories.', 'fitness-equipment.jpg', '2025-09-15 06:18:25'),
(19, 'Sports & Outdoors', 'sports-outdoors', NULL, 'Sports equipment and outdoor gear.', 'sports-outdoors.jpg', '2025-09-15 06:18:25'),
(18, 'Accessories', 'accessories', 13, 'Fashion accessories like bags, belts, and watches.', 'accessories.jpg', '2025-09-15 06:18:25'),
(17, 'Women\'s Shoes', 'womens-shoes', 13, 'Footwear for women including heels, sandals, and boots.', 'womens-shoes.jpg', '2025-09-15 06:18:25'),
(16, 'Men\'s Shoes', 'mens-shoes', 13, 'Footwear for men including sneakers, boots, and formal shoes.', 'mens-shoes.jpg', '2025-09-15 06:18:25'),
(15, 'Women\'s Clothing', 'womens-clothing', 13, 'Clothing for women including dresses, tops, and skirts.', 'womens-clothing.jpg', '2025-09-15 06:18:25'),
(14, 'Men\'s Clothing', 'mens-clothing', 13, 'Clothing for men including shirts, pants, and jackets.', 'mens-clothing.jpg', '2025-09-15 06:18:25'),
(13, 'Fashion', 'fashion', NULL, 'Clothing, footwear, and accessories.', 'fashion.jpg', '2025-09-15 06:18:25'),
(12, 'Vacuum Cleaners', 'vacuum-cleaners', 7, 'Vacuum cleaners and floor care.', 'vacuum-cleaners.jpg', '2025-09-15 06:18:25'),
(11, 'Microwaves', 'microwaves', 7, 'Microwave ovens and kitchen appliances.', 'microwaves.jpg', '2025-09-15 06:18:25'),
(10, 'Air Conditioners', 'air-conditioners', 7, 'AC units and cooling systems.', 'air-conditioners.jpg', '2025-09-15 06:18:25'),
(9, 'Washing Machines', 'washing-machines', 7, 'Washing machines and dryers.', 'washing-machines.jpg', '2025-09-15 06:18:25'),
(8, 'Refrigerators', 'refrigerators', 7, 'Refrigerators and freezers for home use.', 'refrigerators.jpg', '2025-09-15 06:18:25'),
(7, 'Home Appliances', 'home-appliances', NULL, 'Appliances for your home and kitchen.', 'home-appliances.jpg', '2025-09-15 06:18:25'),
(6, 'Cameras', 'cameras', 1, 'Digital cameras, DSLRs, and photography equipment.', 'cameras.jpg', '2025-09-15 06:18:25'),
(5, 'Headphones', 'headphones', 1, 'Headphones, earphones, and audio accessories.', 'headphones.jpg', '2025-09-15 06:18:25'),
(4, 'Tablets', 'tablets', 1, 'Tablet computers and iPads.', 'tablets.jpg', '2025-09-15 06:18:25'),
(3, 'Laptops', 'laptops', 1, 'Laptops, notebooks, and ultrabooks for work and gaming.', 'laptops.jpg', '2025-09-15 06:18:25'),
(2, 'Mobile Phones', 'mobile-phones', 1, 'Smartphones and feature phones from various brands.', 'mobile-phones.jpg', '2025-09-15 06:18:25'),
(1, 'Electronics', 'electronics', NULL, 'All kinds of electronic devices and gadgets.', 'electronics.jpg', '2025-09-15 06:18:25'),
(36, 'Vitamins', 'vitamins', 31, 'Dietary supplements and vitamins.', 'vitamins.jpg', '2025-09-15 06:18:25'),
(37, 'Toys & Games', 'toys-games', NULL, 'Toys, games, and hobbies for all ages.', 'toys-games.jpg', '2025-09-15 06:18:25'),
(38, 'Action Figures', 'action-figures', 37, 'Action figures and collectibles.', 'action-figures.jpg', '2025-09-15 06:18:25'),
(39, 'Board Games', 'board-games', 37, 'Classic and modern board games.', 'board-games.jpg', '2025-09-15 06:18:25'),
(40, 'Puzzles', 'puzzles', 37, 'Jigsaw puzzles and brain teasers.', 'puzzles.jpg', '2025-09-15 06:18:25'),
(41, 'Outdoor Toys', 'outdoor-toys', 37, 'Toys for outdoor play.', 'outdoor-toys.jpg', '2025-09-15 06:18:25'),
(42, 'Educational Toys', 'educational-toys', 37, 'Toys that promote learning and development.', 'educational-toys.jpg', '2025-09-15 06:18:25'),
(43, 'Automotive', 'automotive', NULL, 'Car parts, accessories, and tools.', 'automotive.jpg', '2025-09-15 06:18:25'),
(44, 'Car Parts', 'car-parts', 43, 'Replacement parts and components for vehicles.', 'car-parts.jpg', '2025-09-15 06:18:25'),
(45, 'Car Accessories', 'car-accessories', 43, 'Interior and exterior car accessories.', 'car-accessories.jpg', '2025-09-15 06:18:25'),
(46, 'Tools & Equipment', 'tools-equipment', 43, 'Automotive tools and repair equipment.', 'tools-equipment.jpg', '2025-09-15 06:18:25'),
(47, 'Motorcycle Gear', 'motorcycle-gear', 43, 'Parts and accessories for motorcycles.', 'motorcycle-gear.jpg', '2025-09-15 06:18:25'),
(48, 'Oils & Fluids', 'oils-fluids', 43, 'Engine oils, lubricants, and fluids.', 'oils-fluids.jpg', '2025-09-15 06:18:25'),
(49, 'Home & Garden', 'home-garden', NULL, 'Furniture, decor, and garden supplies.', 'home-garden.jpg', '2025-09-15 06:18:25'),
(50, 'Furniture', 'furniture', 49, 'Home and office furniture.', 'furniture.jpg', '2025-09-15 06:18:25'),
(51, 'Home Decor', 'home-decor', 49, 'Decorative items for home interior.', 'home-decor.jpg', '2025-09-15 06:18:25'),
(52, 'Kitchen & Dining', 'kitchen-dining', 49, 'Kitware, utensils, and dining accessories.', 'kitchen-dining.jpg', '2025-09-15 06:18:25'),
(53, 'Garden Tools', 'garden-tools', 49, 'Tools and equipment for gardening.', 'garden-tools.jpg', '2025-09-15 06:18:25'),
(54, 'Outdoor Furniture', 'outdoor-furniture', 49, 'Furniture for patios and gardens.', 'outdoor-furniture.jpg', '2025-09-15 06:18:25'),
(55, 'Jewelry', 'jewelry', NULL, 'Fine jewelry and watches.', 'jewelry.jpg', '2025-09-15 06:18:25'),
(56, 'Necklaces', 'necklaces', 55, 'Gold and silver necklaces.', 'necklaces.jpg', '2025-09-15 06:18:25'),
(57, 'Rings', 'rings', 55, 'Engagement rings and fashion rings.', 'rings.jpg', '2025-09-15 06:18:25'),
(58, 'Watches', 'watches', 55, 'Luxury and casual watches.', 'watches.jpg', '2025-09-15 06:18:25'),
(59, 'Bracelets', 'bracelets', 55, 'Bracelets and bangles.', 'bracelets.jpg', '2025-09-15 06:18:25'),
(60, 'Earrings', 'earrings', 55, 'Stud earrings and danglers.', 'earrings.jpg', '2025-09-15 06:18:25');

-- --------------------------------------------------------

--
-- Table structure for table `counters`
--

CREATE TABLE `counters` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `count` int(11) NOT NULL,
  `icon` varchar(50) NOT NULL,
  `sort_order` int(11) DEFAULT 0
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

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
  `login_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` varchar(255) DEFAULT NULL,
  `success` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(0, 1, '2025-09-10 06:09:44', '89.198.179.18', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Mobile Safari/537.36', 1),
(0, 1, '2025-09-11 10:58:14', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 1),
(0, 1, '2025-09-11 11:19:08', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 1),
(0, 1, '2025-09-13 07:51:34', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 1),
(0, 1, '2025-09-13 08:33:38', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 1),
(0, 1, '2025-09-13 09:16:16', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 1),
(0, 1, '2025-09-13 09:36:45', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 1),
(0, 1, '2025-09-13 12:09:21', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 1),
(0, 1, '2025-09-13 12:47:24', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 1),
(0, 1, '2025-09-13 12:49:19', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 1),
(0, 1, '2025-09-13 12:54:35', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 1),
(0, 1, '2025-09-13 13:05:43', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 1),
(0, 1, '2025-09-13 13:10:26', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36 Edg/140.0.0.0', 1),
(0, 1, '2025-09-13 13:17:03', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 1),
(0, 1, '2025-09-13 13:26:14', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 1),
(0, 1, '2025-09-13 14:00:10', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 1),
(0, 1, '2025-09-13 14:04:01', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 1),
(0, 1, '2025-09-13 14:07:09', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 1),
(0, 1, '2025-09-13 14:14:42', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 1),
(0, 1, '2025-09-13 14:20:09', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 1),
(0, 1, '2025-09-13 14:46:55', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 1),
(0, 1, '2025-09-14 05:44:10', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 1),
(0, 1, '2025-09-14 05:51:47', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 1),
(0, 1, '2025-09-14 06:03:34', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 0),
(0, 1, '2025-09-14 06:03:37', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 1),
(0, 1, '2025-09-14 06:10:08', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 1),
(0, 1, '2025-09-14 06:24:02', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 0),
(0, 1, '2025-09-14 06:25:04', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 0),
(0, 1, '2025-09-14 06:25:08', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 1),
(0, 1, '2025-09-14 06:41:10', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 1),
(0, 1, '2025-09-14 06:43:01', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 0),
(0, 1, '2025-09-14 06:43:43', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 1),
(0, 1, '2025-09-14 06:43:59', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 1),
(0, 1, '2025-09-14 06:45:40', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 1),
(0, 1, '2025-09-14 06:48:18', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 1),
(0, 1, '2025-09-14 06:48:57', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 0),
(0, 1, '2025-09-14 06:49:05', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 0),
(0, 1, '2025-09-14 06:49:13', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 1),
(0, 1, '2025-09-14 06:51:05', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 1),
(0, 1, '2025-09-14 06:52:46', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 0),
(0, 1, '2025-09-14 06:52:52', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 1),
(0, 1, '2025-09-14 06:53:05', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 1),
(0, 1, '2025-09-14 07:08:46', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 1),
(0, 1, '2025-09-14 08:25:49', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 0),
(0, 1, '2025-09-14 08:25:53', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 1),
(0, 1, '2025-09-14 08:34:24', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 0),
(0, 1, '2025-09-14 08:37:40', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 1),
(0, 1, '2025-09-14 08:55:11', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 1),
(0, 1, '2025-09-14 08:59:41', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 1),
(0, 1, '2025-09-14 09:01:48', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 1),
(0, 1, '2025-09-14 10:21:26', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 1),
(0, 1, '2025-09-14 11:19:23', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36 Edg/140.0.0.0', 1),
(0, 1, '2025-09-14 11:26:22', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 1),
(0, 1, '2025-09-14 12:23:35', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 1),
(0, 1, '2025-09-14 12:33:39', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 1),
(0, 1, '2025-09-14 12:50:41', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 1),
(0, 1, '2025-09-14 13:09:37', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 1),
(0, 1, '2025-09-14 13:17:26', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 1),
(0, 1, '2025-09-14 13:20:49', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 1),
(0, 1, '2025-09-14 14:12:34', '127.0.0.1', 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Mobile Safari/537.36', 1),
(0, 1, '2025-09-14 14:17:13', '127.0.0.1', 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Mobile Safari/537.36 Edg/140.0.0.0', 1),
(0, 1, '2025-09-14 14:52:07', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 1),
(0, 1, '2025-09-14 15:51:58', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 1),
(0, 1, '2025-09-14 15:58:09', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 1),
(0, 1, '2025-09-15 05:18:49', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 1);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `sale_price` decimal(10,2) DEFAULT NULL,
  `stock_quantity` int(11) DEFAULT 0,
  `category_id` int(11) DEFAULT NULL,
  `gallery` text DEFAULT NULL,
  `status` enum('published','draft','out_of_stock') DEFAULT 'published',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `thumbnail` varchar(255) DEFAULT NULL,
  `views` int(11) DEFAULT 0,
  `unit` varchar(50) DEFAULT NULL,
  `moq` int(11) DEFAULT NULL,
  `monthly_supply_quantity` int(11) DEFAULT NULL,
  `payment_methods` varchar(255) DEFAULT 'L/C, TT, Payoneer, PayPal'
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `slug`, `description`, `price`, `sale_price`, `stock_quantity`, `category_id`, `gallery`, `status`, `created_at`, `updated_at`, `thumbnail`, `views`, `unit`, `moq`, `monthly_supply_quantity`, `payment_methods`) VALUES
(31, 'Adidas Predator Soccer Cleats', 'adidas-predator-soccer-cleats', 'Professional soccer cleats with enhanced control and precision.', 250.00, 220.00, 50, 24, 'assets/images/products/adidas-cleats.jpg,assets/images/products/adidas-cleats-1.jpg,assets/images/products/adidas-cleats-2.jpg', 'published', '2025-09-15 06:22:48', '2025-09-15 07:39:32', 'assets/images/products/adidas-cleats-thumb.jpg', 91, 'pair', 10, 500, 'L/C, TT, PayPal'),
(30, 'Spalding NBA Basketball Hoop', 'spalding-nba-basketball-hoop', 'Adjustable basketball hoop with professional NBA design.', 399.00, 349.00, 15, 24, 'spalding-hoop-1.jpg,spalding-hoop-2.jpg', 'published', '2025-09-15 06:22:48', '2025-09-15 06:22:48', 'spalding-hoop-thumb.jpg', 40, 'piece', 1, 200, 'L/C, TT'),
(29, 'Wilson Evolution Basketball', 'wilson-evolution-basketball', 'Official game basketball with superior grip and feel.', 69.99, 59.99, 80, 24, 'wilson-basketball-1.jpg,wilson-basketball-2.jpg', 'published', '2025-09-15 06:22:48', '2025-09-15 06:22:48', 'wilson-basketball-thumb.jpg', 65, 'piece', 10, 600, 'L/C, TT, PayPal'),
(28, 'Coleman Sundome Tent', 'coleman-sundome-tent', 'Easy-to-setup dome tent for 4 people with weatherproof design.', 89.99, 79.99, 35, 21, 'coleman-tent-1.jpg,coleman-tent-2.jpg', 'published', '2025-09-15 06:22:48', '2025-09-15 06:22:48', 'coleman-tent-thumb.jpg', 55, 'piece', 1, 400, 'L/C, TT, PayPal'),
(27, 'Patagonia Fleece Jacket', 'patagonia-fleece-jacket', 'Warm and sustainable fleece jacket made from recycled materials.', 139.00, 119.00, 60, 14, 'patagonia-jacket-1.jpg,patagonia-jacket-2.jpg', 'published', '2025-09-15 06:22:48', '2025-09-15 06:22:48', 'patagonia-jacket-thumb.jpg', 70, 'piece', 10, 1000, 'L/C, TT, PayPal'),
(26, 'North Face Jacket', 'north-face-jacket', 'Waterproof and breathable jacket for outdoor activities.', 229.00, 199.00, 45, 14, 'northface-jacket-1.jpg,northface-jacket-2.jpg', 'published', '2025-09-15 06:22:48', '2025-09-15 06:22:48', 'northface-jacket-thumb.jpg', 85, 'piece', 10, 800, 'L/C, TT, PayPal'),
(25, 'Yeti Tundra 45 Cooler', 'yeti-tundra-45-cooler', 'Roto-molded cooler with bear-proof design and excellent insulation.', 375.00, 350.00, 25, 21, 'yeti-cooler-1.jpg,yeti-cooler-2.jpg', 'published', '2025-09-15 06:22:48', '2025-09-15 06:22:48', 'yeti-cooler-thumb.jpg', 60, 'piece', 1, 300, 'L/C, TT'),
(24, 'Garmin Forerunner 955', 'garmin-forerunner-955', 'GPS running watch with advanced training metrics and mapping.', 499.99, 449.99, 30, 20, 'garmin-watch-1.jpg,garmin-watch-2.jpg', 'published', '2025-09-15 06:22:48', '2025-09-15 06:22:48', 'garmin-watch-thumb.jpg', 75, 'piece', 1, 500, 'L/C, TT'),
(23, 'Fitbit Charge 5', 'fitbit-charge-5', 'Advanced fitness tracker with ECG app and stress management tools.', 179.95, 149.95, 85, 20, 'fitbit-charge5-1.jpg,fitbit-charge5-2.jpg', 'published', '2025-09-15 06:22:48', '2025-09-15 06:22:48', 'fitbit-charge5-thumb.jpg', 130, 'piece', 1, 1200, 'L/C, TT, PayPal'),
(22, 'Instant Pot Duo Plus', 'instant-pot-duo-plus', '9-in-1 multi-use pressure cooker with easy-to-use controls.', 99.95, 89.99, 65, 52, 'instant-pot-1.jpg,instant-pot-2.jpg', 'published', '2025-09-15 06:22:48', '2025-09-15 06:22:48', 'instant-pot-thumb.jpg', 110, 'piece', 1, 800, 'L/C, TT, PayPal'),
(21, 'Nespresso Vertuo Plus', 'nespresso-vertuo-plus', 'Coffee machine with centrifusion technology for perfect coffee extraction.', 179.00, 159.00, 40, 52, 'nespresso-machine-1.jpg,nespresso-machine-2.jpg', 'published', '2025-09-15 06:22:48', '2025-09-15 06:22:48', 'nespresso-machine-thumb.jpg', 90, 'piece', 1, 600, 'L/C, TT, PayPal'),
(20, 'Bose QuietComfort Earbuds', 'bose-quietcomfort-earbuds', 'Wireless earbuds with world-class noise cancellation.', 279.00, 249.00, 70, 5, 'bose-earbuds-1.jpg,bose-earbuds-2.jpg', 'published', '2025-09-15 06:22:48', '2025-09-15 06:22:48', 'bose-earbuds-thumb.jpg', 120, 'pair', 1, 1000, 'L/C, TT, PayPal'),
(19, 'Samsung Galaxy Watch 6', 'samsung-galaxy-watch-6', 'Smartwatch with advanced health monitoring and long battery life.', 299.99, 279.99, 55, 1, 'samsung-watch-1.jpg,samsung-watch-2.jpg', 'published', '2025-09-15 06:22:48', '2025-09-15 06:22:48', 'samsung-watch-thumb.jpg', 100, 'piece', 1, 900, 'L/C, TT, PayPal'),
(18, 'Apple Watch Series 9', 'apple-watch-series-9', 'Advanced smartwatch with health monitoring and fitness tracking features.', 399.00, 379.00, 60, 1, 'apple-watch-1.jpg,apple-watch-2.jpg', 'published', '2025-09-15 06:22:48', '2025-09-15 06:22:48', 'apple-watch-thumb.jpg', 140, 'piece', 1, 1200, 'L/C, TT, PayPal'),
(17, 'Xbox Series X', 'xbox-series-x', 'Powerful gaming console with 12 teraflops of processing power.', 499.99, NULL, 18, 29, 'xbox-seriesx-1.jpg,xbox-seriesx-2.jpg', 'published', '2025-09-15 06:22:48', '2025-09-15 06:22:48', 'xbox-seriesx-thumb.jpg', 180, 'piece', 1, 700, 'L/C, TT'),
(16, 'PlayStation 5 Console', 'playstation-5-console', 'Next-generation gaming console with ultra-high speed SSD.', 499.99, NULL, 15, 29, 'ps5-console-1.jpg,ps5-console-2.jpg', 'published', '2025-09-15 06:22:48', '2025-09-15 06:22:48', 'ps5-console-thumb.jpg', 250, 'piece', 1, 800, 'L/C, TT'),
(15, 'Dyson V11 Vacuum Cleaner', 'dyson-v11-vacuum-cleaner', 'Cordless vacuum with powerful suction and intelligent cleaning modes.', 599.00, 549.00, 40, 12, 'dyson-vacuum-1.jpg,dyson-vacuum-2.jpg', 'published', '2025-09-15 06:22:48', '2025-09-15 06:22:48', 'dyson-vacuum-thumb.jpg', 110, 'piece', 1, 600, 'L/C, TT, PayPal'),
(14, 'KitchenAid Stand Mixer', 'kitchenaid-stand-mixer', 'Professional stand mixer with 10-speed settings and various attachments.', 429.99, 399.99, 30, 52, 'kitchenaid-mixer-1.jpg,kitchenaid-mixer-2.jpg', 'published', '2025-09-15 06:22:48', '2025-09-15 06:22:48', 'kitchenaid-mixer-thumb.jpg', 80, 'piece', 1, 500, 'L/C, TT, PayPal'),
(13, 'Sony 65-inch 4K TV', 'sony-65-inch-4k-tv', 'Smart TV with Cognitive Processor XR for realistic picture quality.', 1399.00, 1299.00, 25, 1, 'sony-tv-1.jpg,sony-tv-2.jpg', 'published', '2025-09-15 06:22:48', '2025-09-15 06:22:48', 'sony-tv-thumb.jpg', 95, 'piece', 1, 400, 'L/C, TT'),
(12, 'Levi\'s 501 Original Jeans', 'levis-501-original-jeans', 'Classic straight fit jeans in original shrink-to-fit design.', 89.50, 79.99, 200, 14, 'levis-jeans-1.jpg,levis-jeans-2.jpg', 'published', '2025-09-15 06:22:48', '2025-09-15 06:22:48', 'levis-jeans-thumb.jpg', 150, 'piece', 20, 3000, 'L/C, TT, PayPal'),
(11, 'Adidas Ultraboost 22', 'adidas-ultraboost-22', 'Running shoes with Boost technology for responsive cushioning.', 180.00, 160.00, 80, 16, 'adidas-ultraboost-1.jpg,adidas-ultraboost-2.jpg', 'published', '2025-09-15 06:22:48', '2025-09-15 06:22:48', 'adidas-ultraboost-thumb.jpg', 120, 'pair', 10, 1500, 'L/C, TT, PayPal'),
(10, 'Nike Air Max 270', 'nike-air-max-270', 'Comfortable sneakers with maximal air cushioning for all-day comfort.', 150.00, 135.00, 100, 16, 'nike-airmax-1.jpg,nike-airmax-2.jpg', 'published', '2025-09-15 06:22:48', '2025-09-15 06:22:48', 'nike-airmax-thumb.jpg', 180, 'pair', 10, 2000, 'L/C, TT, PayPal'),
(9, 'iPad Pro 12.9-inch', 'ipad-pro-12-9-inch', 'Professional tablet with M2 chip and Liquid Retina XDR display.', 1099.00, 999.00, 35, 4, 'ipad-pro-1.jpg,ipad-pro-2.jpg', 'published', '2025-09-15 06:22:48', '2025-09-15 06:22:48', 'ipad-pro-thumb.jpg', 90, 'piece', 1, 700, 'L/C, TT, PayPal'),
(8, 'Dell XPS 15 Laptop', 'dell-xps-15-laptop', 'Powerful Windows laptop with OLED display and Intel Core i9 processor.', 1899.00, 1799.00, 40, 3, 'dell-xps15-1.jpg,dell-xps15-2.jpg', 'published', '2025-09-15 06:22:48', '2025-09-15 06:22:48', 'dell-xps15-thumb.jpg', 110, 'piece', 1, 600, 'L/C, TT, Payoneer'),
(7, 'Samsung Front Load Washer', 'samsung-front-load-washer', 'Energy efficient front load washing machine with steam technology.', 899.00, 849.00, 25, 9, 'samsung-washer-1.jpg,samsung-washer-2.jpg', 'published', '2025-09-15 06:22:48', '2025-09-15 06:22:48', 'samsung-washer-thumb.jpg', 70, 'piece', 1, 300, 'L/C, TT'),
(6, 'LG Smart Refrigerator', 'lg-smart-refrigerator', 'Smart fridge with Wi-Fi connectivity and door-in-door design.', 2199.00, 1999.00, 15, 8, 'lg-refrigerator-1.jpg,lg-refrigerator-2.jpg', 'published', '2025-09-15 06:22:48', '2025-09-15 06:22:48', 'lg-refrigerator-thumb.jpg', 60, 'piece', 1, 200, 'L/C, TT, PayPal'),
(5, 'Canon EOS R5 Camera', 'canon-eos-r5', 'Professional mirrorless camera with 45MP sensor and 8K video recording.', 3899.00, 3799.00, 20, 6, 'canon-eos-r5-1.jpg,canon-eos-r5-2.jpg', 'published', '2025-09-15 06:22:48', '2025-09-15 06:22:48', 'canon-eos-r5-thumb.jpg', 85, 'piece', 1, 300, 'L/C, TT'),
(4, 'Sony WH-1000XM5 Headphones', 'sony-wh-1000xm5', 'Industry-leading noise canceling headphones with exceptional sound quality.', 349.99, 329.99, 75, 5, 'sony-xm5-1.jpg,sony-xm5-2.jpg', 'published', '2025-09-15 06:22:48', '2025-09-15 06:22:48', 'sony-xm5-thumb.jpg', 200, 'piece', 1, 1200, 'L/C, TT, PayPal'),
(3, 'MacBook Pro 16-inch', 'macbook-pro-16-inch', 'Professional laptop with M3 Max chip for extreme performance.', 2499.00, 2399.00, 30, 3, 'macbook-pro-16-1.jpg,macbook-pro-16-2.jpg', 'published', '2025-09-15 06:22:48', '2025-09-15 06:22:48', 'macbook-pro-16-thumb.jpg', 150, 'piece', 1, 500, 'L/C, TT, Payoneer'),
(2, 'Samsung Galaxy S24 Ultra', 'samsung-galaxy-s24-ultra', 'Samsung\'s premium smartphone with S Pen and advanced AI capabilities.', 1299.00, NULL, 45, 2, 'galaxy-s24-ultra-1.jpg,galaxy-s24-ultra-2.jpg', 'published', '2025-09-15 06:22:48', '2025-09-15 06:22:48', 'galaxy-s24-ultra-thumb.jpg', 95, 'piece', 1, 800, 'L/C, TT, PayPal'),
(1, 'iPhone 15 Pro Max', 'iphone-15-pro-max', 'The latest flagship smartphone from Apple with advanced camera system and A17 Pro chip.', 1199.00, 1099.00, 50, 2, 'iphone15-pro-max-1.jpg,iphone15-pro-max-2.jpg,iphone15-pro-max-3.jpg', 'published', '2025-09-15 06:22:48', '2025-09-15 06:22:48', 'iphone15-pro-max-thumb.jpg', 120, 'piece', 1, 1000, 'L/C, TT, Payoneer, PayPal'),
(32, 'Nike Mercurial Vapor Cleats', 'nike-mercurial-vapor-cleats', 'Lightweight soccer cleats designed for speed and agility.', 275.00, 250.00, 45, 24, 'nike-cleats-1.jpg,nike-cleats-2.jpg', 'published', '2025-09-15 06:22:48', '2025-09-15 06:22:48', 'nike-cleats-thumb.jpg', 80, 'pair', 10, 450, 'L/C, TT, PayPal'),
(33, 'Kindle Paperwhite', 'kindle-paperwhite', 'Waterproof e-reader with glare-free display and built-in light.', 139.99, 129.99, 90, 26, 'kindle-paperwhite-1.jpg,kindle-paperwhite-2.jpg', 'published', '2025-09-15 06:22:48', '2025-09-15 06:22:48', 'kindle-paperwhite-thumb.jpg', 120, 'piece', 1, 1500, 'L/C, TT, PayPal'),
(34, 'Bose SoundLink Speaker', 'bose-soundlink-speaker', 'Portable Bluetooth speaker with deep, loud sound.', 129.00, 109.00, 70, 30, 'bose-speaker-1.jpg,bose-speaker-2.jpg', 'published', '2025-09-15 06:22:48', '2025-09-15 06:22:48', 'bose-speaker-thumb.jpg', 95, 'piece', 1, 900, 'L/C, TT, PayPal'),
(35, 'JBL Flip 6 Speaker', 'jbl-flip-6-speaker', 'Portable Bluetooth speaker with powerful sound and waterproof design.', 129.95, 119.95, 85, 30, 'jbl-speaker-1.jpg,jbl-speaker-2.jpg', 'published', '2025-09-15 06:22:48', '2025-09-15 06:22:48', 'jbl-speaker-thumb.jpg', 110, 'piece', 1, 1000, 'L/C, TT, PayPal'),
(36, 'GoPro Hero 12 Black', 'gopro-hero-12-black', 'Action camera with 5.3K video and HyperSmooth 6.0 stabilization.', 399.99, 379.99, 40, 6, 'gopro-hero12-1.jpg,gopro-hero12-2.jpg', 'published', '2025-09-15 06:22:48', '2025-09-15 06:22:48', 'gopro-hero12-thumb.jpg', 130, 'piece', 1, 600, 'L/C, TT, PayPal'),
(37, 'DJI Mini 3 Pro Drone', 'dji-mini-3-pro-drone', 'Compact drone with 4K camera and tri-directional obstacle sensing.', 759.00, 709.00, 25, 6, 'dji-drone-1.jpg,dji-drone-2.jpg', 'published', '2025-09-15 06:22:48', '2025-09-15 06:22:48', 'dji-drone-thumb.jpg', 95, 'piece', 1, 400, 'L/C, TT'),
(38, 'Apple AirPods Pro', 'apple-airpods-pro', 'Wireless earbuds with active noise cancellation and spatial audio.', 249.00, 229.00, 100, 5, 'airpods-pro-1.jpg,airpods-pro-2.jpg', 'published', '2025-09-15 06:22:48', '2025-09-15 06:22:48', 'airpods-pro-thumb.jpg', 200, 'pair', 1, 2000, 'L/C, TT, PayPal'),
(39, 'Samsung T7 SSD', 'samsung-t7-ssd', 'Portable SSD with fast transfer speeds and rugged design.', 109.99, 99.99, 75, 1, 'samsung-ssd-1.jpg,samsung-ssd-2.jpg', 'published', '2025-09-15 06:22:48', '2025-09-15 06:22:48', 'samsung-ssd-thumb.jpg', 85, 'piece', 1, 800, 'L/C, TT, PayPal'),
(40, 'Logitech MX Master 3', 'logitech-mx-master-3', 'Advanced wireless mouse with ergonomic design and precision scrolling.', 99.99, 89.99, 60, 1, 'logitech-mouse-1.jpg,logitech-mouse-2.jpg', 'published', '2025-09-15 06:22:48', '2025-09-15 06:22:48', 'logitech-mouse-thumb.jpg', 110, 'piece', 1, 700, 'L/C, TT, PayPal'),
(41, 'Microsoft Surface Laptop 5', 'microsoft-surface-laptop-5', 'Sleek Windows laptop with touchscreen and premium design.', 1299.00, 1199.00, 35, 3, 'surface-laptop-1.jpg,surface-laptop-2.jpg', 'published', '2025-09-15 06:22:48', '2025-09-15 06:22:48', 'surface-laptop-thumb.jpg', 90, 'piece', 1, 500, 'L/C, TT'),
(42, 'HP LaserJet Printer', 'hp-laserjet-printer', 'Reliable laser printer for home and office use.', 199.99, 179.99, 40, 1, 'hp-printer-1.jpg,hp-printer-2.jpg', 'published', '2025-09-15 06:22:48', '2025-09-15 06:22:48', 'hp-printer-thumb.jpg', 65, 'piece', 1, 400, 'L/C, TT, PayPal'),
(43, 'Epson EcoTank Printer', 'epson-ecotank-printer', 'Ink tank printer with high page yield and low printing cost.', 299.99, 279.99, 30, 1, 'epson-printer-1.jpg,epson-printer-2.jpg', 'published', '2025-09-15 06:22:48', '2025-09-15 06:22:48', 'epson-printer-thumb.jpg', 55, 'piece', 1, 300, 'L/C, TT'),
(44, 'Anker PowerCore Battery', 'anker-powercore-battery', 'High-capacity portable charger for smartphones and devices.', 79.99, 69.99, 100, 1, 'anker-battery-1.jpg,anker-battery-2.jpg', 'published', '2025-09-15 06:22:48', '2025-09-15 06:22:48', 'anker-battery-thumb.jpg', 120, 'piece', 1, 1500, 'L/C, TT, PayPal'),
(45, 'Tile Pro Tracker', 'tile-pro-tracker', 'Bluetooth tracker to find your keys, wallet, and other items.', 34.99, 29.99, 150, 1, 'tile-tracker-1.jpg,tile-tracker-2.jpg', 'published', '2025-09-15 06:22:48', '2025-09-15 06:22:48', 'tile-tracker-thumb.jpg', 80, 'piece', 10, 2000, 'L/C, TT, PayPal'),
(46, 'Ring Video Doorbell', 'ring-video-doorbell', 'Smart doorbell with HD video and two-way talk.', 99.99, 89.99, 50, 1, 'ring-doorbell-1.jpg,ring-doorbell-2.jpg', 'published', '2025-09-15 06:22:48', '2025-09-15 06:22:48', 'ring-doorbell-thumb.jpg', 95, 'piece', 1, 600, 'L/C, TT, PayPal'),
(47, 'Nest Learning Thermostat', 'nest-learning-thermostat', 'Smart thermostat that learns your schedule and saves energy.', 249.99, 229.99, 40, 1, 'nest-thermostat-1.jpg,nest-thermostat-2.jpg', 'published', '2025-09-15 06:22:48', '2025-09-15 06:22:48', 'nest-thermostat-thumb.jpg', 70, 'piece', 1, 500, 'L/C, TT'),
(48, 'Philips Hue Starter Kit', 'philips-hue-starter-kit', 'Smart lighting system with color changing bulbs and bridge.', 199.99, 179.99, 45, 1, 'philips-hue-1.jpg,philips-hue-2.jpg', 'published', '2025-09-15 06:22:48', '2025-09-15 06:22:48', 'philips-hue-thumb.jpg', 85, 'kit', 1, 700, 'L/C, TT, PayPal'),
(49, 'iRobot Roomba i4', 'irobot-roomba-i4', 'Robot vacuum with powerful suction and smart mapping.', 399.00, 349.00, 30, 12, 'roomba-vacuum-1.jpg,roomba-vacuum-2.jpg', 'published', '2025-09-15 06:22:48', '2025-09-15 06:22:48', 'roomba-vacuum-thumb.jpg', 75, 'piece', 1, 400, 'L/C, TT, PayPal'),
(50, 'Shark Navigator Vacuum', 'shark-navigator-vacuum', 'Upright vacuum with powerful suction and lift-away technology.', 199.99, 179.99, 55, 12, 'shark-vacuum-1.jpg,shark-vacuum-2.jpg', 'published', '2025-09-15 06:22:48', '2025-09-15 06:22:48', 'shark-vacuum-thumb.jpg', 65, 'piece', 1, 500, 'L/C, TT, PayPal'),
(51, 'KitchenAid Food Processor', 'kitchenaid-food-processor', '13-cup food processor with precise slicing and dicing.', 229.99, 199.99, 35, 52, 'kitchenaid-processor-1.jpg,kitchenaid-processor-2.jpg', 'published', '2025-09-15 06:22:48', '2025-09-15 06:22:48', 'kitchenaid-processor-thumb.jpg', 60, 'piece', 1, 400, 'L/C, TT, PayPal'),
(52, 'Vitamix Blender', 'vitamix-blender', 'Professional-grade blender with powerful motor and variable speed control.', 449.95, 399.95, 25, 52, 'vitamix-blender-1.jpg,vitamix-blender-2.jpg', 'published', '2025-09-15 06:22:48', '2025-09-15 06:22:48', 'vitamix-blender-thumb.jpg', 70, 'piece', 1, 300, 'L/C, TT'),
(53, 'Ninja Air Fryer', 'ninja-air-fryer', 'Air fryer that crisps with little or no oil for healthier cooking.', 99.99, 89.99, 70, 52, 'ninja-airfryer-1.jpg,ninja-airfryer-2.jpg', 'published', '2025-09-15 06:22:48', '2025-09-15 06:22:48', 'ninja-airfryer-thumb.jpg', 90, 'piece', 1, 800, 'L/C, TT, PayPal'),
(54, 'Cuisinart Coffee Maker', 'cuisinart-coffee-maker', 'Programmable coffee maker with thermal carafe to keep coffee hot.', 119.99, 99.99, 60, 52, 'cuisinart-coffeemaker-1.jpg,cuisinart-coffeemaker-2.jpg', 'published', '2025-09-15 06:22:48', '2025-09-15 06:22:48', 'cuisinart-coffeemaker-thumb.jpg', 75, 'piece', 1, 600, 'L/C, TT, PayPal'),
(55, 'Breville Smart Oven', 'breville-smart-oven', 'Countertop oven with multiple cooking functions and element IQ.', 299.99, 279.99, 40, 52, 'breville-oven-1.jpg,breville-oven-2.jpg', 'published', '2025-09-15 06:22:48', '2025-09-15 06:22:48', 'breville-oven-thumb.jpg', 65, 'piece', 1, 400, 'L/C, TT'),
(56, 'Zojirushi Rice Cooker', 'zojirushi-rice-cooker', 'Advanced rice cooker with fuzzy logic technology for perfect rice.', 199.99, 179.99, 50, 52, 'zojirushi-ricecooker-1.jpg,zojirushi-ricecooker-2.jpg', 'published', '2025-09-15 06:22:48', '2025-09-15 06:22:48', 'zojirushi-ricecooker-thumb.jpg', 55, 'piece', 1, 500, 'L/C, TT, PayPal'),
(57, 'Lodge Cast Iron Skillet', 'lodge-cast-iron-skillet', 'Pre-seasoned cast iron skillet for even heating and versatile cooking.', 24.90, 21.99, 100, 52, 'lodge-skillet-1.jpg,lodge-skillet-2.jpg', 'published', '2025-09-15 06:22:48', '2025-09-15 06:22:48', 'lodge-skillet-thumb.jpg', 80, 'piece', 10, 1200, 'L/C, TT, PayPal'),
(58, 'All-Clad Stainless Cookware', 'all-clad-stainless-cookware', 'Professional stainless steel cookware with even heat distribution.', 299.99, 279.99, 20, 52, 'allclad-cookware-1.jpg,allclad-cookware-2.jpg', 'published', '2025-09-15 06:22:48', '2025-09-15 06:22:48', 'allclad-cookware-thumb.jpg', 45, 'set', 1, 300, 'L/C, TT'),
(59, 'OXO Good Grips Tools', 'oxo-good-grips-tools', 'Ergonomic kitchen tools with comfortable non-slip handles.', 39.99, 34.99, 120, 52, 'oxo-tools-1.jpg,oxo-tools-2.jpg', 'published', '2025-09-15 06:22:48', '2025-09-15 06:22:48', 'oxo-tools-thumb.jpg', 70, 'set', 10, 1500, 'L/C, TT, PayPal');

-- --------------------------------------------------------

--
-- Table structure for table `product_inquiries`
--

CREATE TABLE `product_inquiries` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `inquiry_via` enum('whatsapp','telegram') NOT NULL,
  `situation` varchar(255) DEFAULT NULL,
  `inquiry_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0 COMMENT 'Flag for soft delete: 0=active, 1=deleted'
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `product_inquiries`
--

INSERT INTO `product_inquiries` (`id`, `product_id`, `user_id`, `inquiry_via`, `situation`, `inquiry_date`, `is_deleted`) VALUES
(10, 30, 1, 'whatsapp', NULL, '2025-09-09 17:48:39', 1),
(9, 1, 1, 'telegram', NULL, '2025-09-09 05:39:51', 1),
(8, 1, 1, 'whatsapp', NULL, '2025-09-09 05:38:37', 1),
(4, 9, 1, 'whatsapp', NULL, '2025-09-08 13:44:49', 1),
(5, 1, 1, 'whatsapp', NULL, '2025-09-08 14:53:39', 1),
(6, 27, 1, 'whatsapp', NULL, '2025-09-08 16:04:34', 1),
(7, 27, 1, 'telegram', NULL, '2025-09-08 16:04:39', 0),
(11, 30, 1, 'telegram', NULL, '2025-09-09 17:49:10', 0),
(12, 1, 1, 'telegram', NULL, '2025-09-13 14:48:52', 1),
(13, 1, 1, 'whatsapp', NULL, '2025-09-14 08:32:12', 1),
(14, 1, 1, 'telegram', NULL, '2025-09-14 16:24:08', 1),
(15, 6, 1, 'whatsapp', NULL, '2025-09-14 16:24:29', 0);

-- --------------------------------------------------------

--
-- Table structure for table `slides`
--

CREATE TABLE `slides` (
  `id` int(11) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `button_text` varchar(50) DEFAULT NULL,
  `button_link` varchar(255) DEFAULT NULL,
  `sort_order` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

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
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tickets`
--

INSERT INTO `tickets` (`id`, `ticket_number`, `user_id`, `subject`, `message`, `status`, `priority`, `created_at`, `updated_at`) VALUES
(5500, 5500, 1, 'تست', 'تست', 'closed', 'low', '2025-09-08 06:19:00', '2025-09-08 16:22:03'),
(5501, 5501, 1, 'test for long message test for long message test for long message test for long message', 'test for long message test for long message test for long message test for long message test for long message test for long message test for long message test for long message test for long message test for long message test for long message test for long message test for long message test for long message test for long message test for long message test for long message test for long message test for long message', 'open', 'medium', '2025-09-07 09:32:21', '2025-09-08 16:22:00'),
(5502, 5502, 1, 'TestFinal', 'testFinal testFinal testFinal testFinal testFinal testFinal testFinal', 'open', 'high', '2025-09-08 11:12:08', '2025-09-08 16:21:56'),
(5503, 5503, 1, 'FinalTest', 'FinalTestFinalTestFinalTestFinalTestFinalTestFinalTestFinalTestFinalTest', 'open', 'low', '2025-09-08 11:24:30', '2025-09-08 16:21:53'),
(5504, 5504, 1, 'test for long message test for long message test for long message test for long message', 'سیبلاسا', 'open', 'medium', '2025-09-08 16:17:18', '2025-09-08 16:17:18'),
(5505, 5505, 1, 'test', 'test', 'open', 'medium', '2025-09-09 05:44:15', '2025-09-09 05:44:15'),
(5506, 5506, 1, 'asdfasdf', 'asdfasdfasdfasdf', 'open', 'medium', '2025-09-13 14:22:36', '2025-09-13 14:22:36'),
(5507, 5507, 1, 'asdfasdf', 'asdfasdfasdfasdf', 'open', 'medium', '2025-09-13 14:22:37', '2025-09-13 14:22:37'),
(5508, 5508, 1, 'asfdgsdfgd', 'cvbxcvb', 'open', 'medium', '2025-09-13 14:23:01', '2025-09-13 14:23:01'),
(5509, 5509, 1, 'asfdgsdfgd', 'cvbxcvb', 'open', 'medium', '2025-09-13 14:23:01', '2025-09-13 14:23:01'),
(5510, 5510, 1, 'sdfgdfg', 'sdfgsdfg', 'open', 'medium', '2025-09-13 14:23:35', '2025-09-13 14:23:35'),
(5511, 5511, 1, 'sdfgdfg', 'sdfgsdfg', 'open', 'medium', '2025-09-13 14:23:35', '2025-09-13 14:23:35'),
(5512, 5512, 1, 'sdfgsdfg', 'sdfgsdf5wtythe5363674576', 'closed', 'medium', '2025-09-13 14:25:01', '2025-09-14 13:36:44'),
(5513, 5513, 1, 'sdfgsdfg', 'sdfgsdf5wtythe5363674576', 'open', 'medium', '2025-09-13 14:25:01', '2025-09-13 14:25:01');

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
  `is_admin` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(22, 5505, 1, 'Test', 0, '2025-09-09 17:50:40'),
(23, 5505, 1, 'hi', 0, '2025-09-13 09:30:06'),
(24, 5509, 1, 'sadfasdf', 0, '2025-09-13 14:35:00'),
(25, 5509, 1, 'asdfasdfasdf', 0, '2025-09-13 14:35:05'),
(26, 5509, 1, 'asdfasdf', 0, '2025-09-13 14:35:11'),
(27, 5512, 1, 'sdfgsd', 0, '2025-09-14 10:24:29'),
(28, 5512, 1, 'sdfgsdfg', 0, '2025-09-14 10:24:31'),
(29, 5512, 1, 'sdfgsdfg', 0, '2025-09-14 10:24:33'),
(30, 5512, 1, 'sdfgsdfg', 0, '2025-09-14 10:25:47'),
(31, 5512, 1, 'dfbdfghjdyjrtyur67yu', 0, '2025-09-14 10:25:53'),
(32, 5512, 1, 'qwfdqwef', 0, '2025-09-14 10:29:30'),
(33, 5512, 1, 'dfhgfdgh', 0, '2025-09-14 10:29:35'),
(34, 5507, 1, 'asdfasdf', 0, '2025-09-14 13:21:07');

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
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `profile_picture`, `created_at`, `updated_at`) VALUES
(1, 'Meisam', 'm.hajiloo@gmail.com', '$2y$10$R2R7BpE1iBtyvorT8qrPEusYEGzSDmeU6XOIAGwUj9xVHG2MJT6Ly', 'assets/images/users/user_1_1757588318.png', '2025-08-31 14:40:52', '2025-09-11 10:58:38'),
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT for table `product_inquiries`
--
ALTER TABLE `product_inquiries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `slides`
--
ALTER TABLE `slides`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tickets`
--
ALTER TABLE `tickets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5514;

--
-- AUTO_INCREMENT for table `ticket_replies`
--
ALTER TABLE `ticket_replies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
