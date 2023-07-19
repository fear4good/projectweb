-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jul 18, 2023 at 05:11 PM
-- Server version: 8.0.31
-- PHP Version: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `projectweb`
--

-- --------------------------------------------------------

--
-- Table structure for table `pois`
--

DROP TABLE IF EXISTS `pois`;
CREATE TABLE IF NOT EXISTS `pois` (
  `id` varchar(40) COLLATE utf8mb4_general_ci NOT NULL,
  `city` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `house_number` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `postcode` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `street` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `brand` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `wikidata` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `wikipedia` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `opening_hours` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `operator` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `bitcoin_payment` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `cash_payment` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `coins_payment` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `credit_cards_payment` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `debit_cards_payment` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `mastercard_payment` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `visa_payment` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `shop` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `website` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `longitude` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `latitude` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pois`
--

INSERT INTO `pois` (`id`, `city`, `house_number`, `postcode`, `street`, `brand`, `wikidata`, `wikipedia`, `name`, `opening_hours`, `operator`, `bitcoin_payment`, `cash_payment`, `coins_payment`, `credit_cards_payment`, `debit_cards_payment`, `mastercard_payment`, `visa_payment`, `phone`, `shop`, `website`, `longitude`, `latitude`) VALUES
('node/354449389', NULL, NULL, NULL, NULL, 'Lidl', 'Q151954', 'en:Lidl', 'Lidl', 'Mo-Fr 07:00-21:00, Sa 07:00-20:00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'supermarket', NULL, '21.712654', '38.2080319'),
('node/360217468', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'The Mart', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'supermarket', NULL, '21.7806567', '38.28931'),
('node/360226900', 'Πάτρα', '9', '26442', 'Νοταρά', 'Lidl', 'Q151954', 'en:Lidl', 'Lidl', 'Mo-Fr 09:00-21:00; Sa 9:00-20:00', 'LIDL', 'no', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', '800 111 3333', 'supermarket', 'https://www.lidl-hellas.gr/el/index.htm', '21.7434265', '38.2633511'),
('node/364381224', 'Ρίο', '23', '26504', 'Αθηνών', NULL, NULL, NULL, 'Σουπερμάρκετ Ανδρικόπουλος', NULL, 'Andrikopoulos', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'supermarket', NULL, '21.7908028', '38.2952086'),
('node/364463568', NULL, NULL, NULL, NULL, 'Σκλαβενίτης', 'Q7536037', NULL, 'Σκλαβενίτης', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'supermarket', NULL, '21.7642075', '38.2104365'),
('node/598279836', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Papakos', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'convenience', NULL, '21.7622778', '38.23553'),
('node/633369803', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'convenience', NULL, '21.7540236', '38.2612908'),
('node/980515550', NULL, NULL, NULL, NULL, 'Lidl', 'Q151954', 'en:Lidl', 'Lidl', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'supermarket', NULL, '21.740082', '38.2312926'),
('node/1643373636', 'Δημοτική Ενότητα Ρίου', NULL, NULL, 'Σώμερσετ', 'Σκλαβενίτης', 'Q7536037', NULL, 'Σκλαβενίτης', 'Mo-Fr 08:00-21:00; Sa 08:00-20:00; Su 11:00-18:00', NULL, NULL, 'yes', NULL, 'yes', NULL, NULL, NULL, NULL, 'supermarket', NULL, '21.7814957', '38.3013087'),
('node/1643373639', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'supermarket', NULL, '21.790383', '38.2949372'),
('node/1643713403', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'convenience', NULL, '21.7666723', '38.2852364'),
('node/1643713405', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'convenience', NULL, '21.7714546', '38.2911121'),
('node/1643713406', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'convenience', NULL, '21.7666079', '38.2913332'),
('node/1643818244', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'convenience', NULL, '21.7625472', '38.2779126'),
('node/1643818267', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'convenience', NULL, '21.7574031', '38.2751636'),
('node/1643818277', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'supermarket', NULL, '21.7629172', '38.2756942'),
('node/1643818281', NULL, NULL, NULL, NULL, 'Σκλαβενίτης', 'Q7536037', 'el:Σκλαβενίτης', 'Σκλαβενίτης', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'supermarket', NULL, '21.7489662', '38.2596476'),
('node/1643825320', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'convenience', NULL, '21.7883123', '38.2945036'),
('node/1643889596', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'supermarket', NULL, '21.7568738', '38.2126477'),
('node/1657132006', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Ρουμελιώτης SUPER Market', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'supermarket', NULL, '21.7436127', '38.2613806'),
('node/1657132008', NULL, NULL, NULL, NULL, 'Σκλαβενίτης', 'Q7536037', 'el:Σκλαβενίτης', 'Σκλαβενίτης', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'supermarket', NULL, '21.741582', '38.2585236'),
('node/1657962066', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'convenience', NULL, '21.7854989', '38.2991382'),
('node/1695934267', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'convenience', NULL, '21.7712803', '38.2915409'),
('node/1763830009', NULL, '52-56', NULL, 'Καλαβρύτων', NULL, NULL, NULL, 'My market', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'supermarket', NULL, '21.7473265', '38.2323892'),
('node/1763830474', NULL, NULL, NULL, NULL, 'ΑΒ Βασιλόπουλος', 'Q4721807', 'el:Άλφα Βήτα Βασιλόπουλος', 'ΑΒ Βασιλόπουλος', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'supermarket', NULL, '21.7257294', '38.2322376'),
('node/1770994538', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Markoulas', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'supermarket', NULL, '21.7603629', '38.2644973'),
('node/1771512424', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'convenience', NULL, '21.7593252', '38.2657865'),
('node/1815896581', NULL, NULL, NULL, NULL, 'Lidl', 'Q151954', 'en:Lidl', 'Lidl', 'Mo-Sa 08:00-20:00', 'Lidl', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'supermarket', NULL, '21.8051332', '38.3067563'),
('node/1971240515', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Ανδρικόπουλος', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'supermarket', NULL, '21.736371', '38.2399863'),
('node/1971240518', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'convenience', NULL, '21.7399001', '38.2377144'),
('node/1971247760', NULL, NULL, NULL, NULL, 'Σκλαβενίτης', 'Q7536037', 'el:Σκλαβενίτης', 'Σκλαβενίτης', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'supermarket', NULL, '21.7373409', '38.2364945'),
('node/1971249846', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'My Market', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'supermarket', NULL, '21.7342362', '38.2427052'),
('node/1997401665', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'convenience', NULL, '21.7689392', '38.2803811'),
('node/1997401682', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'convenience', NULL, '21.7646316', '38.2767389'),
('node/3144355008', 'Πάτρα', NULL, '26441', 'Αγίας Σοφίας & Αθηνών', NULL, NULL, NULL, 'My market', '08:00-21:00 (Saturday: 08:00-20:00)', 'ΜETRO AEBE', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'supermarket', NULL, '21.7396708', '38.2568618'),
('node/3354481184', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Ανδρικόπουλος', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'supermarket', NULL, '21.7323293', '38.1951968'),
('node/4101518891', NULL, NULL, NULL, 'Εγνατίας', NULL, NULL, NULL, 'ΑΒ ΒΑΣΙΛΟΠΟΥΛΟΣ', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'supermarket', NULL, '21.7418506', '38.2565589'),
('node/4356067891', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'supermarket', NULL, '21.7365286', '38.2450095'),
('node/4356183595', NULL, NULL, NULL, NULL, 'Σκλαβενίτης', 'Q7536037', 'el:Σκλαβενίτης', 'Σκλαβενίτης', 'Mo-Fr 08:00-21:00; Sa 08:00-20:00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'supermarket', NULL, '21.733285', '38.2434859'),
('node/4357098895', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'convenience', NULL, '21.7339549', '38.2438242'),
('node/4357217589', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'supermarket', NULL, '21.7414219', '38.2524287'),
('node/4357425491', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'supermarket', NULL, '21.7423925', '38.2512732'),
('node/4357589496', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Ανδρικόπουλος', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'supermarket', NULL, '21.7302559', '38.2427963'),
('node/4358244594', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'supermarket', NULL, '21.7337191', '38.2454121'),
('node/4372108797', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Mini Market', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'convenience', NULL, '21.8364993', '38.2725804'),
('node/4484528391', NULL, NULL, NULL, 'Εθνική Οδός 8α', NULL, NULL, NULL, 'Carna', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'convenience', NULL, '21.7667136', '38.2795377'),
('node/4752810729', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Mini Market', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'convenience', NULL, '21.7770011', '38.3052409'),
('node/4931300543', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Kronos', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'supermarket', NULL, '21.7296435', '38.2425794'),
('node/4953268497', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Φίλιππας', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'convenience', NULL, '21.7504681', '38.2585639'),
('node/4969309651', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'supermarket', NULL, '21.7940989', '38.3015018'),
('node/5005384516', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'No supermarket', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'supermarket', NULL, '21.7363349', '38.2498065'),
('node/5005409493', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Kiosk', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'convenience', NULL, '21.735128', '38.2490852'),
('node/5005409494', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Kiosk', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'convenience', NULL, '21.7349115', '38.2493169'),
('node/5005409495', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Kiosk', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'convenience', NULL, '21.7344427', '38.2489563'),
('node/5005476710', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Kiosk', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'convenience', NULL, '21.7413066', '38.2569875'),
('node/5005476711', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Kiosk', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'convenience', NULL, '21.7409531', '38.2561434'),
('node/5132918123', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'supermarket', NULL, '21.7400704', '38.2523678'),
('node/5164678230', 'Πάτρα', '1 - 3', '26442', 'Αξιού', NULL, NULL, NULL, 'Ανδρικόπουλος - Supermarket', 'Mo-Fr 08:00-21:00; Sa 08:00-20:00', 'Ανδρικόπουλος', NULL, 'yes', NULL, 'yes', 'yes', NULL, NULL, '+302610430062', 'supermarket', 'https://www.andrikopoulos.com.gr/', '21.7481501', '38.2691937'),
('node/5164741179', NULL, NULL, '26442', 'Νοταρά', 'Σκλαβενίτης', 'Q7536037', 'el:Σκλαβενίτης', 'Σκλαβενίτης', 'Mo-Fr 9:00-21:00, Sa 9:00-20:00', NULL, NULL, 'yes', NULL, 'yes', 'yes', NULL, NULL, NULL, 'supermarket', NULL, '21.7497014', '38.2690963'),
('node/5350727524', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'supermarket', NULL, '21.7251655', '38.233827'),
('node/5396345464', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Mini Market', 'Mo-Sa 07:00-22:00', NULL, NULL, 'yes', 'yes', 'yes', NULL, NULL, NULL, NULL, 'convenience', NULL, '21.8764222', '38.3277388'),
('node/5620198221', NULL, NULL, NULL, NULL, 'ΑΒ Βασιλόπουλος', 'Q4721807', 'el:Άλφα Βήτα Βασιλόπουλος', 'ΑΒ Βασιλόπουλος', 'Mo-Fr 08:00-21:00; Sa 08:00-20:00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'supermarket', NULL, '21.7357783', '38.2170935'),
('node/5620208927', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Mini Market', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'convenience', NULL, '21.7321204', '38.2160259'),
('node/5783486253', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'supermarket', NULL, '21.8203451', '38.312741'),
('node/5909978406', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'supermarket', NULL, '21.7312416', '38.2451867'),
('node/7673935764', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '3A', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'supermarket', NULL, '21.7396687', '38.2504514'),
('node/7673976786', NULL, NULL, NULL, NULL, 'Spar', 'Q610492', 'en:SPAR (retailer)', 'Spar', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'supermarket', NULL, '21.7389771', '38.2486316'),
('node/7673986831', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'ΑΝΔΡΙΚΟΠΟΥΛΟΣ', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'supermarket', NULL, '21.7383224', '38.2481545'),
('node/7674120315', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'ΑΝΔΡΙΚΟΠΟΥΛΟΣ', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'supermarket', NULL, '21.7308044', '38.2429466'),
('node/7677225097', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'MyMarket', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'supermarket', NULL, '21.7265283', '38.2392836'),
('node/7914886761', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'supermarket', NULL, '21.7575349', '38.2653368'),
('node/8214753473', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Ena Cash And Carry', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'supermarket', NULL, '21.7253472', '38.2346622'),
('node/8214854586', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'ΚΡΟΝΟΣ - (Σκαγιοπουλείου)', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'supermarket', NULL, '21.7294915', '38.2358002'),
('node/8214887295', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Ανδρικόπουλος Super Market', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'supermarket', NULL, '21.7306406', '38.2379176'),
('node/8214887306', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '3Α Αράπης', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'supermarket', NULL, '21.7328984', '38.2375068'),
('node/8214910532', NULL, NULL, NULL, NULL, 'Γαλαξίας', 'Q5518063', 'el:Γαλαξίας (σούπερ μάρκετ)', 'Γαλαξίας', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'supermarket', NULL, '21.733787', '38.2361127'),
('node/8215010716', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Super Market Θεοδωρόπουλος', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'supermarket', NULL, '21.7283123', '38.2360129'),
('node/8215157448', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Super Market ΚΡΟΝΟΣ', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'supermarket', NULL, '21.7340723', '38.2390442'),
('node/8753329904', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'supermarket', NULL, '21.7396855', '38.2642274'),
('node/8753329905', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'supermarket', NULL, '21.7398813', '38.2658237'),
('node/8777081651', NULL, NULL, NULL, NULL, 'Σκλαβενίτης', 'Q7536037', 'el:Σκλαβενίτης', 'Σκλαβενίτης', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'supermarket', NULL, '21.7428703', '38.2601801'),
('node/8777171555', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '3A ARAPIS', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'supermarket', NULL, '21.7460078', '38.2586424'),
('node/8805335004', NULL, NULL, NULL, NULL, 'Μασούτης', 'Q6783887', 'en:Masoutis', 'Μασούτης', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'supermarket', NULL, '21.7355058', '38.2454669'),
('node/8805467220', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'ΑΒ Shop & Go', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'supermarket', NULL, '21.7380288', '38.24957'),
('node/8806495733', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '3Α ΑΡΑΠΗΣ', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'supermarket', NULL, '21.7455558', '38.2398789'),
('node/9651304117', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Περίπτερο', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'convenience', NULL, '21.7408745', '38.2554443'),
('node/9785182275', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'convenience', NULL, '21.6232207', '38.1494223'),
('node/9785182280', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'convenience', NULL, '21.6206284', '38.1477412'),
('node/9785335420', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'convenience', NULL, '21.6454791', '38.1563067');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL,
  `password` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `email` varchar(40) NOT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `is_admin`) VALUES
(11, 'admin1', '$2y$10$qmiT/WI1s.9IlVNwIonRtuDNTA8syoll4oKr5WUBec22frObsANzq', '', 1),
(4, 'testhash', '$2y$10$S1SXYkEvjoCY3whx3fq32u7jpgyfE86a.O44N6VMtoyI/nGsoeBpu', 'test2@gmail.com', 0);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
