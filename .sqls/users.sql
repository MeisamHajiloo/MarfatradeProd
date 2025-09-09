--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `profile_picture` varchar(255) DEFAULT NULL
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `created_at`, `updated_at`, `profile_picture`) VALUES
(9, 'meisam', 'm.hajiloo@gmail.com', '$2y$10$jWhCzbmNGmsMWLbBLEeIo.DeSMXV8CyQttxf3VPfazeItD8/1wAya', '2025-08-31 09:53:03', '2025-09-09 11:24:34', 'assets/images/users/meisam.png'),
(10, 'Admin', 'admin@marfatrade.com', '$2y$10$o7OwsYQTKoVspYAY7Q4GDeCtcAUGl0XTsGvztqFQbuMh2/qQAwxfi', '2025-09-08 07:52:22', '2025-09-08 07:52:22', NULL),
(11, 'admin2', 'admin2@marfatrade.com', '$2y$10$PD1Rtn7Nqtc2gC8inj8go.10y1NCSseGHnPVpieRPgvXoro9eZ.YS', '2025-09-08 08:17:59', '2025-09-08 08:17:59', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;