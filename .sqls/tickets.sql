
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
(5500, 5500, 9, 'تست', 'تست', 'closed', 'low', '2025-09-08 06:19:00', '2025-09-08 09:59:48'),
(5501, 5501, 9, 'test for long message test for long message test for long message test for long message', 'test for long message test for long message test for long message test for long message test for long message test for long message test for long message test for long message test for long message test for long message test for long message test for long message test for long message test for long message test for long message test for long message test for long message test for long message test for long message', 'open', 'medium', '2025-09-07 09:32:21', '2025-09-07 09:32:21'),
(5502, 5502, 9, 'TestFinal', 'testFinal testFinal testFinal testFinal testFinal testFinal testFinal', 'open', 'high', '2025-09-08 11:12:08', '2025-09-08 11:12:08'),
(5503, 5503, 9, 'FinalTest', 'FinalTestFinalTestFinalTestFinalTestFinalTestFinalTestFinalTestFinalTest', 'open', 'low', '2025-09-08 11:24:30', '2025-09-08 11:24:30');

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

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ticket_number` (`ticket_number`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tickets`
--
ALTER TABLE `tickets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5504;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tickets`
--
ALTER TABLE `tickets`
  ADD CONSTRAINT `tickets_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;





----------------------------------------------------


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
(1, 5500, 10, 'تست_', 1, '2025-09-08 06:19:28'),
(2, 5500, 9, 'تست__', 0, '2025-09-08 06:52:55'),
(3, 5500, 10, 'تست____', 1, '2025-09-08 06:53:06'),
(4, 5500, 9, 'تست______', 0, '2025-09-08 07:02:11'),
(5, 5500, 9, 'Test__________', 0, '2025-09-08 08:20:11'),
(6, 5501, 10, 'test for long message test for long message test for long message', 1, '2025-09-07 09:40:21'),
(7, 5501, 9, 'Test', 0, '2025-09-08 09:57:08'),
(8, 5501, 10, 'test test test test test test test test test test test test test test test test test test test test test', 1, '2025-09-08 10:00:57'),
(9, 5503, 9, 'test123', 0, '2025-09-08 14:03:35'),
(10, 5503, 9, 'teset', 0, '2025-09-08 14:56:30');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ticket_replies`
--
ALTER TABLE `ticket_replies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ticket_id` (`ticket_id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ticket_replies`
--
ALTER TABLE `ticket_replies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ticket_replies`
--
ALTER TABLE `ticket_replies`
  ADD CONSTRAINT `ticket_replies_ibfk_1` FOREIGN KEY (`ticket_id`) REFERENCES `tickets` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `ticket_replies_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;