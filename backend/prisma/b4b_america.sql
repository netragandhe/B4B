-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 03, 2026 at 06:08 AM
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
-- Database: `b4b`
--

-- --------------------------------------------------------

--
-- Table structure for table `affiliatepayout`
--

CREATE TABLE `affiliatepayout` (
  `id` varchar(191) NOT NULL,
  `affiliateId` varchar(191) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `period` varchar(191) NOT NULL,
  `status` enum('PENDING','PROCESSING','PAID','FAILED') NOT NULL DEFAULT 'PENDING',
  `scheduledDate` varchar(191) DEFAULT NULL,
  `paidDate` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `affiliateprofile`
--

CREATE TABLE `affiliateprofile` (
  `id` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `referralCode` varchar(191) NOT NULL,
  `totalReferrals` int(11) NOT NULL DEFAULT 0,
  `conversionRate` varchar(191) NOT NULL DEFAULT '0.0%',
  `totalCommissions` decimal(12,2) NOT NULL DEFAULT 0.00,
  `status` varchar(191) NOT NULL DEFAULT 'Active',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `bizproprofile`
--

CREATE TABLE `bizproprofile` (
  `id` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `rankLevel` int(11) NOT NULL DEFAULT 1,
  `rankTitle` varchar(191) NOT NULL DEFAULT 'Account Executive',
  `districtNumber` int(11) DEFAULT NULL,
  `consecutiveMonthsHit` int(11) NOT NULL DEFAULT 0,
  `currentMonthVolume` decimal(12,2) NOT NULL DEFAULT 0.00,
  `allTimeEarnings` decimal(12,2) NOT NULL DEFAULT 0.00,
  `uplineCoachId` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `bizproprofile`
--

INSERT INTO `bizproprofile` (`id`, `userId`, `rankLevel`, `rankTitle`, `districtNumber`, `consecutiveMonthsHit`, `currentMonthVolume`, `allTimeEarnings`, `uplineCoachId`, `createdAt`, `updatedAt`) VALUES
('1d239b47-777f-433f-873f-b37c8c990b08', '39615e45-76fe-4c54-afe5-3fd34fe7040b', 4, 'District Leader', 7, 0, 320000.00, 48500.00, NULL, '2026-10-28 06:24:05.687', '2026-10-28 06:24:05.687');

-- --------------------------------------------------------

--
-- Table structure for table `bulletincomment`
--

CREATE TABLE `bulletincomment` (
  `id` varchar(191) NOT NULL,
  `postId` varchar(191) NOT NULL,
  `authorId` varchar(191) NOT NULL,
  `content` text NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `bulletinpost`
--

CREATE TABLE `bulletinpost` (
  `id` varchar(191) NOT NULL,
  `title` varchar(191) NOT NULL,
  `summary` text DEFAULT NULL,
  `contentHtml` longtext NOT NULL,
  `authorId` varchar(191) NOT NULL,
  `isPinned` tinyint(1) NOT NULL DEFAULT 0,
  `category` varchar(191) NOT NULL DEFAULT 'General Announcement',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `bulletinpost`
--

INSERT INTO `bulletinpost` (`id`, `title`, `summary`, `contentHtml`, `authorId`, `isPinned`, `category`, `createdAt`, `updatedAt`) VALUES
('post_init_1', 'Q4 Commercial Lending Volume Guidelines Released', 'Updated debt tier matrices for all SBA and Asset-Based facilities.', '<p>Super Admin has published the Q4 2026 commercial debt lending guidelines.</p>', '313e3c5a-d165-47e4-956f-1ee068730683', 1, 'Company Announcement', '2026-10-28 06:02:45.865', '2026-10-28 06:02:45.865');

-- --------------------------------------------------------

--
-- Table structure for table `bulletinreaction`
--

CREATE TABLE `bulletinreaction` (
  `id` varchar(191) NOT NULL,
  `postId` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `emoji` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `clientprofile`
--

CREATE TABLE `clientprofile` (
  `id` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `assignedCoachId` varchar(191) DEFAULT NULL,
  `companyName` varchar(191) DEFAULT NULL,
  `primaryContact` varchar(191) DEFAULT NULL,
  `annualRevenue` decimal(14,2) DEFAULT NULL,
  `creditScore` int(11) DEFAULT NULL,
  `industry` varchar(191) DEFAULT NULL,
  `yearsInBusiness` int(11) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `clientprofile`
--

INSERT INTO `clientprofile` (`id`, `userId`, `assignedCoachId`, `companyName`, `primaryContact`, `annualRevenue`, `creditScore`, `industry`, `yearsInBusiness`, `createdAt`, `updatedAt`) VALUES
('c0ab7e31-61cf-4bf3-ae4d-1d5f977fb216', '2250c744-e4f4-4a59-a756-a94c412b538c', NULL, 'Apex Freight LLC', 'Marcus Vance', 4200000.00, 715, 'Logistics & Transportation', NULL, '2026-10-28 06:24:05.697', '2026-10-28 06:24:05.697');

-- --------------------------------------------------------

--
-- Table structure for table `cmspage`
--

CREATE TABLE `cmspage` (
  `id` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `title` varchar(191) NOT NULL,
  `headline` text NOT NULL,
  `summary` text NOT NULL,
  `heroImage` text DEFAULT NULL,
  `metaDescription` text DEFAULT NULL,
  `faqs` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`faqs`)),
  `lastUpdated` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `commissionledger`
--

CREATE TABLE `commissionledger` (
  `id` varchar(191) NOT NULL,
  `coachId` varchar(191) NOT NULL,
  `amount` decimal(12,2) NOT NULL,
  `type` varchar(191) NOT NULL,
  `description` text NOT NULL,
  `periodMonth` int(11) NOT NULL,
  `periodYear` int(11) NOT NULL,
  `status` enum('PENDING','PROCESSING','PAID','FAILED') NOT NULL DEFAULT 'PENDING',
  `stripeTransferId` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `commissionrule`
--

CREATE TABLE `commissionrule` (
  `id` varchar(191) NOT NULL,
  `serviceName` varchar(191) NOT NULL,
  `category` varchar(191) NOT NULL,
  `basePercent` decimal(5,2) NOT NULL DEFAULT 2.00,
  `flatBonus` decimal(10,2) NOT NULL DEFAULT 0.00,
  `rankMultiplier` decimal(4,2) NOT NULL DEFAULT 1.00,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `commissionrule`
--

INSERT INTO `commissionrule` (`id`, `serviceName`, `category`, `basePercent`, `flatBonus`, `rankMultiplier`, `active`, `createdAt`, `updatedAt`) VALUES
('cm_1', 'Revenue-Based Working Capital Line', 'Capital', 3.50, 500.00, 1.20, 1, '2026-10-28 06:02:45.821', '2026-10-28 06:24:05.907'),
('cm_2', 'Equipment & Fleet Lease Financing', 'Capital', 2.50, 250.00, 1.10, 1, '2026-10-28 06:02:45.829', '2026-10-28 06:24:05.911'),
('cm_3', 'SBA 7(a) Guarantee Bridge Funding', 'Capital', 2.00, 1000.00, 1.50, 1, '2026-10-28 06:02:45.836', '2026-10-28 06:24:05.915'),
('cm_4', 'Fractional CFO & Treasury Advisory', 'Advisory', 15.00, 0.00, 1.00, 1, '2026-10-28 06:02:45.841', '2026-10-28 06:24:05.918'),
('cm_5', 'Invoice Factoring & AR Advance', 'Capital', 2.00, 300.00, 1.15, 1, '2026-10-28 06:02:45.845', '2026-10-28 06:24:05.922');

-- --------------------------------------------------------

--
-- Table structure for table `eboxdocument`
--

CREATE TABLE `eboxdocument` (
  `id` varchar(191) NOT NULL,
  `clientId` varchar(191) DEFAULT NULL,
  `uploaderId` varchar(191) NOT NULL,
  `fileName` varchar(191) NOT NULL,
  `s3Key` varchar(191) NOT NULL,
  `fileSizeBytes` int(11) NOT NULL,
  `mimeType` varchar(191) NOT NULL,
  `category` varchar(191) NOT NULL,
  `isEncrypted` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `employerprofile`
--

CREATE TABLE `employerprofile` (
  `id` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `companyName` varchar(191) NOT NULL,
  `industry` varchar(191) DEFAULT NULL,
  `website` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `fundingapplication`
--

CREATE TABLE `fundingapplication` (
  `id` varchar(191) NOT NULL,
  `clientId` varchar(191) NOT NULL,
  `facilityName` varchar(191) NOT NULL,
  `requestedAmount` decimal(12,2) NOT NULL,
  `approvedAmount` decimal(12,2) DEFAULT NULL,
  `interestRate` varchar(191) DEFAULT NULL,
  `currentStep` enum('SUBMITTED','DOCS_VERIFIED','UNDERWRITING_REVIEW','COMMITTEE_APPROVED','FUNDED_ACTIVE') NOT NULL DEFAULT 'SUBMITTED',
  `underwriterName` varchar(191) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `invoice`
--

CREATE TABLE `invoice` (
  `id` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `invoiceNumber` varchar(191) NOT NULL,
  `stripeInvoiceId` varchar(191) DEFAULT NULL,
  `amountPaid` decimal(10,2) NOT NULL,
  `currency` varchar(191) NOT NULL DEFAULT 'USD',
  `status` varchar(191) NOT NULL DEFAULT 'Paid',
  `pdfReceiptUrl` text DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job`
--

CREATE TABLE `job` (
  `id` varchar(191) NOT NULL,
  `employerId` varchar(191) NOT NULL,
  `title` varchar(191) NOT NULL,
  `category` varchar(191) NOT NULL,
  `state` varchar(191) NOT NULL,
  `city` varchar(191) NOT NULL,
  `salaryMin` decimal(10,2) DEFAULT NULL,
  `salaryMax` decimal(10,2) DEFAULT NULL,
  `jobType` varchar(191) NOT NULL,
  `description` text NOT NULL,
  `status` enum('PENDING','APPROVED','REJECTED') NOT NULL DEFAULT 'PENDING',
  `rejectionReason` text DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobapplication`
--

CREATE TABLE `jobapplication` (
  `id` varchar(191) NOT NULL,
  `jobId` varchar(191) NOT NULL,
  `seekerId` varchar(191) NOT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'SUBMITTED',
  `coverLetter` text DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobseekerprofile`
--

CREATE TABLE `jobseekerprofile` (
  `id` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `resumeS3Key` varchar(191) DEFAULT NULL,
  `skills` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`skills`)),
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lead`
--

CREATE TABLE `lead` (
  `id` varchar(191) NOT NULL,
  `fullName` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `phone` varchar(191) DEFAULT NULL,
  `businessName` varchar(191) DEFAULT NULL,
  `serviceRequested` varchar(191) NOT NULL,
  `estimatedValue` decimal(12,2) DEFAULT NULL,
  `stage` enum('NEW_INQUIRY','CONTACTED','QUALIFIED','PROPOSAL_SENT','UNDERWRITING','CLOSED_WON','CLOSED_LOST') NOT NULL DEFAULT 'NEW_INQUIRY',
  `assignedCoachId` varchar(191) DEFAULT NULL,
  `source` varchar(191) NOT NULL DEFAULT 'Website Direct',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pendingapproval`
--

CREATE TABLE `pendingapproval` (
  `id` varchar(191) NOT NULL,
  `type` varchar(191) NOT NULL,
  `title` varchar(191) NOT NULL,
  `subtitle` text DEFAULT NULL,
  `amount` varchar(191) DEFAULT NULL,
  `date` varchar(191) NOT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'Pending',
  `rejectionReason` text DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pendingapproval`
--

INSERT INTO `pendingapproval` (`id`, `type`, `title`, `subtitle`, `amount`, `date`, `status`, `rejectionReason`, `createdAt`, `updatedAt`) VALUES
('app_1', 'Rank Promotion', 'David Ross — Promotion to Regional Leader (Rank 5)', 'Achieved $610k Personal Vol + $1.11M Team Vol', '$610,000', '2026-10-07', 'Pending', NULL, '2026-10-28 06:02:45.849', '2026-10-28 06:24:05.926'),
('app_2', 'High-Value Draw', 'Apex Freight LLC — $300,000 Disbursement Request', 'Chase Business Account (••• 4912)', '$300,000', '2026-10-08', 'Pending', NULL, '2026-10-28 06:02:45.856', '2026-10-28 06:24:05.931'),
('app_3', 'Underwriting Term Sheet', 'BioTech Solutions Inc — $1.2M SBA Bridge Line', 'Risk Grade A — 256-Bit Verification Passed', '$1,200,000', '2026-10-06', 'Pending', NULL, '2026-10-28 06:02:45.861', '2026-10-28 06:24:05.934');

-- --------------------------------------------------------

--
-- Table structure for table `permissionauditlog`
--

CREATE TABLE `permissionauditlog` (
  `id` varchar(191) NOT NULL,
  `timestamp` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `user` varchar(191) NOT NULL,
  `action` text NOT NULL,
  `roleTarget` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `rankrule`
--

CREATE TABLE `rankrule` (
  `level` int(11) NOT NULL,
  `title` varchar(191) NOT NULL,
  `personalMonthlyVolumeMin` decimal(12,2) NOT NULL DEFAULT 0.00,
  `personalMonthlyVolumeMax` decimal(12,2) NOT NULL DEFAULT 0.00,
  `consecutiveMonthsRequired` int(11) NOT NULL DEFAULT 3,
  `requiredTeamMembers` int(11) NOT NULL DEFAULT 0,
  `teamOverridePercent` decimal(5,2) NOT NULL DEFAULT 0.00,
  `directCommissionPercent` decimal(5,2) NOT NULL DEFAULT 10.00,
  `description` text DEFAULT NULL,
  `termsOfPromotion` text DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `rankrule`
--

INSERT INTO `rankrule` (`level`, `title`, `personalMonthlyVolumeMin`, `personalMonthlyVolumeMax`, `consecutiveMonthsRequired`, `requiredTeamMembers`, `teamOverridePercent`, `directCommissionPercent`, `description`, `termsOfPromotion`, `createdAt`, `updatedAt`) VALUES
(1, 'Account Executive', 0.00, 49999.00, 1, 0, 0.00, 10.00, 'Initial entry rank for newly onboarded B4B Coaches and brokers.', 'Complete compliance credentialing and activate first client file.', '2026-10-28 06:02:45.643', '2026-10-28 06:24:05.717'),
(2, 'Relationship Coordinator II', 50000.00, 149999.00, 2, 0, 0.00, 15.00, 'Proven originator closing regular recurring commercial loan files.', 'Maintain $50,000 monthly originations across 2 consecutive months.', '2026-10-28 06:02:45.650', '2026-10-28 06:24:05.724'),
(3, 'Senior Executive', 150000.00, 299999.00, 3, 1, 2.50, 20.00, 'Senior advisor eligible for downline sponsorship overrides.', '$150,000 volume for 3 consecutive months + 1 sponsored advisor.', '2026-10-28 06:02:45.656', '2026-10-28 06:24:05.728'),
(4, 'District Leader', 300000.00, 599999.00, 3, 3, 5.00, 25.00, 'Leadership tier with district dispatch privileges.', '$300,000 volume for 3 consecutive months + 3 active direct advisors.', '2026-10-28 06:02:45.659', '2026-10-28 06:24:05.733'),
(5, 'Regional Leader', 600000.00, 999999.00, 4, 5, 7.50, 30.00, 'Directs multi-county regional origination teams.', '$600,000 monthly volume for 4 months + 5 direct team originators.', '2026-10-28 06:02:45.663', '2026-10-28 06:24:05.737'),
(6, 'Channel VP', 1000000.00, 1999999.00, 6, 8, 10.00, 35.00, 'Executive presiding over Federal Reserve branch territories.', '$1.0M monthly volume for 6 months + 8 active producing advisors.', '2026-10-28 06:02:45.667', '2026-10-28 06:24:05.741'),
(7, 'Senior Channel VP', 2000000.00, 3499999.00, 6, 12, 12.50, 40.00, 'Senior corporate officer directing regional origination hubs.', '$2.0M monthly volume for 6 months + 12 active downlines.', '2026-10-28 06:02:45.671', '2026-10-28 06:24:05.747'),
(8, 'National Channel VP', 3500000.00, 4999999.00, 6, 18, 15.00, 45.00, 'Nationwide director participating in platform revenue shares.', '$3.5M monthly volume + 18 producing advisors nationwide.', '2026-10-28 06:02:45.674', '2026-10-28 06:24:05.751'),
(9, 'Senior National Channel VP', 5000000.00, 10000000.00, 6, 25, 20.00, 50.00, 'Highest achievable rank in B4B America.', '$5.0M sustained monthly volume + 25 downlines + Executive Board approval.', '2026-10-28 06:02:45.678', '2026-10-28 06:24:05.756');

-- --------------------------------------------------------

--
-- Table structure for table `rolepermission`
--

CREATE TABLE `rolepermission` (
  `id` varchar(191) NOT NULL,
  `roleId` varchar(191) NOT NULL,
  `menuId` varchar(191) NOT NULL,
  `canView` tinyint(1) NOT NULL DEFAULT 0,
  `canCreate` tinyint(1) NOT NULL DEFAULT 0,
  `canEdit` tinyint(1) NOT NULL DEFAULT 0,
  `canDelete` tinyint(1) NOT NULL DEFAULT 0,
  `canExport` tinyint(1) NOT NULL DEFAULT 0,
  `scope` varchar(191) NOT NULL DEFAULT 'OWN',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `scoreboardarchive`
--

CREATE TABLE `scoreboardarchive` (
  `id` varchar(191) NOT NULL,
  `month` varchar(191) NOT NULL,
  `topProducer` varchar(191) NOT NULL,
  `secondPlace` varchar(191) DEFAULT NULL,
  `thirdPlace` varchar(191) DEFAULT NULL,
  `totalNetworkVolume` varchar(191) NOT NULL,
  `totalDealsClosed` int(11) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `scoreboardauditlog`
--

CREATE TABLE `scoreboardauditlog` (
  `id` varchar(191) NOT NULL,
  `timestamp` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `modifiedBy` varchar(191) NOT NULL,
  `action` varchar(191) NOT NULL,
  `changes` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `scoreboardentry`
--

CREATE TABLE `scoreboardentry` (
  `id` varchar(191) NOT NULL,
  `coachId` varchar(191) NOT NULL,
  `periodType` varchar(191) NOT NULL,
  `periodKey` varchar(191) NOT NULL,
  `closedVolume` decimal(14,2) NOT NULL DEFAULT 0.00,
  `dealsClosed` int(11) NOT NULL DEFAULT 0,
  `pointsEarned` int(11) NOT NULL DEFAULT 0,
  `rankPosition` int(11) DEFAULT NULL,
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `scoreboardsetting`
--

CREATE TABLE `scoreboardsetting` (
  `id` varchar(191) NOT NULL,
  `cycleType` varchar(191) NOT NULL DEFAULT 'Monthly',
  `tvModeIntervalSeconds` int(11) NOT NULL DEFAULT 15,
  `qualificationMinVolume` decimal(12,2) NOT NULL DEFAULT 25000.00,
  `directDealPointMultiplier` int(11) NOT NULL DEFAULT 10,
  `overrideDealPointMultiplier` int(11) NOT NULL DEFAULT 5,
  `rankPromotionBonusPoints` int(11) NOT NULL DEFAULT 50,
  `showEarningsPublicly` tinyint(1) NOT NULL DEFAULT 0,
  `showRankBadges` tinyint(1) NOT NULL DEFAULT 1,
  `autoArchiveAtMonthEnd` tinyint(1) NOT NULL DEFAULT 1,
  `tvDisplayTheme` varchar(191) NOT NULL DEFAULT 'Dark Blue Glow',
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `scoreboardsetting`
--

INSERT INTO `scoreboardsetting` (`id`, `cycleType`, `tvModeIntervalSeconds`, `qualificationMinVolume`, `directDealPointMultiplier`, `overrideDealPointMultiplier`, `rankPromotionBonusPoints`, `showEarningsPublicly`, `showRankBadges`, `autoArchiveAtMonthEnd`, `tvDisplayTheme`, `updatedAt`) VALUES
('sb_default', 'Monthly', 15, 25000.00, 10, 5, 50, 0, 1, 1, 'Dark Blue Glow', '2026-10-28 06:02:45.873');

-- --------------------------------------------------------

--
-- Table structure for table `serviceproduct`
--

CREATE TABLE `serviceproduct` (
  `id` varchar(191) NOT NULL,
  `title` varchar(191) NOT NULL,
  `sku` varchar(191) NOT NULL,
  `category` varchar(191) NOT NULL,
  `basePrice` decimal(12,2) NOT NULL,
  `commissionRate` varchar(191) NOT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'Active',
  `description` text DEFAULT NULL,
  `updatedAt` datetime(3) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `serviceproduct`
--

INSERT INTO `serviceproduct` (`id`, `title`, `sku`, `category`, `basePrice`, `commissionRate`, `status`, `description`, `updatedAt`, `createdAt`) VALUES
('prd_001', 'Accept Payments (Merchant Processing)', 'SKU-B4B-001', 'Operations', 65000.00, '10.0%', 'Active', NULL, '2026-10-28 06:24:05.802', '2026-10-28 06:02:45.727'),
('prd_002', 'Business Management & Advisory', 'SKU-B4B-002', 'Advisory', 48000.00, '15.0%', 'Active', NULL, '2026-10-28 06:24:05.810', '2026-10-28 06:02:45.734'),
('prd_003', 'Business Branding (Print My LOGO)', 'SKU-B4B-003', 'Growth', 15000.00, '20.0%', 'Active', NULL, '2026-10-28 06:24:05.817', '2026-10-28 06:02:45.740'),
('prd_004', 'Build Business Credit Score', 'SKU-B4B-004', 'Growth', 12000.00, '25.0%', 'Active', NULL, '2026-10-28 06:24:05.823', '2026-10-28 06:02:45.744'),
('prd_005', 'Business Plan Writing & Pitch Deck', 'SKU-B4B-005', 'Advisory', 8500.00, '25.0%', 'Active', NULL, '2026-10-28 06:24:05.830', '2026-10-28 06:02:45.749'),
('prd_006', 'Business Funding and Loans (SBA / Term)', 'SKU-B4B-006', 'Capital', 350000.00, '3.5%', 'Active', NULL, '2026-10-28 06:24:05.838', '2026-10-28 06:02:45.753'),
('prd_007', 'Lead Generation System', 'SKU-B4B-007', 'Growth', 22000.00, '18.0%', 'Active', NULL, '2026-10-28 06:24:05.846', '2026-10-28 06:02:45.758'),
('prd_008', 'Customer Service Academy Training', 'SKU-B4B-008', 'Operations', 18000.00, '20.0%', 'Active', NULL, '2026-10-28 06:24:05.854', '2026-10-28 06:02:45.762'),
('prd_009', 'Cyber Security & SOC 2 Compliance', 'SKU-B4B-009', 'Operations', 36000.00, '15.0%', 'Active', NULL, '2026-10-28 06:24:05.859', '2026-10-28 06:02:45.766'),
('prd_010', 'Find Jobs (B4B Commercial Hiring)', 'SKU-B4B-010', 'Growth', 14000.00, '20.0%', 'Active', NULL, '2026-10-28 06:24:05.863', '2026-10-28 06:02:45.770'),
('prd_011', 'Commercial Key-Person Insurance', 'SKU-B4B-011', 'Capital', 28000.00, '12.0%', 'Active', NULL, '2026-10-28 06:24:05.866', '2026-10-28 06:02:45.774'),
('prd_012', 'Enterprise IT Solutions & Cloud', 'SKU-B4B-012', 'Operations', 45000.00, '15.0%', 'Active', NULL, '2026-10-28 06:24:05.870', '2026-10-28 06:02:45.779'),
('prd_013', 'Digital Performance Marketing', 'SKU-B4B-013', 'Growth', 32000.00, '18.0%', 'Active', NULL, '2026-10-28 06:24:05.874', '2026-10-28 06:02:45.784'),
('prd_014', 'Affiliates and Channel Partnerships', 'SKU-B4B-014', 'Growth', 20000.00, '25.0%', 'Active', NULL, '2026-10-28 06:24:05.878', '2026-10-28 06:02:45.788'),
('prd_015', 'Bookkeeping and Corporate Tax Prep', 'SKU-B4B-015', 'Advisory', 24000.00, '20.0%', 'Active', NULL, '2026-10-28 06:24:05.883', '2026-10-28 06:02:45.793'),
('prd_016', 'Web Design Pros & Modern Portals', 'SKU-B4B-016', 'Growth', 25000.00, '20.0%', 'Active', NULL, '2026-10-28 06:24:05.887', '2026-10-28 06:02:45.798');

-- --------------------------------------------------------

--
-- Table structure for table `subscription`
--

CREATE TABLE `subscription` (
  `id` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `stripeSubscriptionId` varchar(191) DEFAULT NULL,
  `planTier` varchar(191) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `status` enum('ACTIVE','PAST_DUE','CANCELED','TRIALING') NOT NULL DEFAULT 'ACTIVE',
  `currentPeriodStart` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `currentPeriodEnd` datetime(3) NOT NULL,
  `cancelAtPeriodEnd` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `subscriptionplan`
--

CREATE TABLE `subscriptionplan` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `monthlyPrice` decimal(10,2) NOT NULL,
  `annualPrice` decimal(10,2) NOT NULL,
  `targetRank` varchar(191) NOT NULL,
  `features` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`features`)),
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `subscriptionplan`
--

INSERT INTO `subscriptionplan` (`id`, `name`, `monthlyPrice`, `annualPrice`, `targetRank`, `features`, `createdAt`, `updatedAt`) VALUES
('plan_core', 'Core B4B Coach', 25.00, 240.00, 'Rank 1 - 3 (AE & Senior Exec)', '[\"Access to CRM & Loan Pipeline\",\"Nationwide Bulletin Feed\",\"eBOX Document Vault (5GB)\"]', '2026-10-28 06:02:45.804', '2026-10-28 06:24:05.894'),
('plan_executive', 'Executive Director', 99.00, 950.00, 'Rank 7 - 9 (Channel & National VP)', '[\"Federal Reserve Regional Cockpit\",\"Executive Profit Pool Split\",\"White-glove Deal Underwriting Desk\"]', '2026-10-28 06:02:45.815', '2026-10-28 06:24:05.903'),
('plan_leadership', 'Leadership Coach', 49.00, 470.00, 'Rank 4 - 6 (District & Regional Leader)', '[\"Downline Sponsorship Tools\",\"District Dispatch Territory Access\",\"Team Override Analytics\"]', '2026-10-28 06:02:45.811', '2026-10-28 06:24:05.899');

-- --------------------------------------------------------

--
-- Table structure for table `territorydistrict`
--

CREATE TABLE `territorydistrict` (
  `id` int(11) NOT NULL,
  `number` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `headOfficeCity` varchar(191) NOT NULL,
  `seniorVpName` varchar(191) DEFAULT NULL,
  `exclusivityStatus` varchar(191) NOT NULL DEFAULT 'Allocated',
  `branchCities` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`branchCities`)),
  `states` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`states`)),
  `volume` decimal(14,2) NOT NULL DEFAULT 0.00,
  `brokersCount` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `territorydistrict`
--

INSERT INTO `territorydistrict` (`id`, `number`, `name`, `headOfficeCity`, `seniorVpName`, `exclusivityStatus`, `branchCities`, `states`, `volume`, `brokersCount`) VALUES
(1, 1, 'District 1 - Boston (1-A)', 'Boston, MA', 'Sarah Jenkins', 'Allocated', NULL, '[\"CT\",\"MA\",\"ME\",\"NH\",\"RI\",\"VT\"]', 8400000.00, 18),
(2, 2, 'District 2 - New York (2-B)', 'New York, NY', 'Elena Rostova', 'Allocated', NULL, '[\"NY\",\"NJ\",\"PR\"]', 24500000.00, 38),
(3, 3, 'District 3 - Philadelphia (3-C)', 'Philadelphia, PA', 'David Vance', 'Allocated', NULL, '[\"PA\",\"NJ\",\"DE\"]', 6200000.00, 14),
(4, 4, 'District 4 - Cleveland (4-D)', 'Cleveland, OH', 'Robert Lang', 'Open', NULL, '[\"OH\",\"PA\",\"WV\",\"KY\"]', 5800000.00, 12),
(5, 5, 'District 5 - Richmond (5-E)', 'Richmond, VA', 'Amanda Clark', 'Allocated', NULL, '[\"VA\",\"MD\",\"NC\",\"SC\",\"DC\",\"WV\"]', 11200000.00, 22),
(6, 6, 'District 6 - Atlanta (6-F)', 'Atlanta, GA', 'Marcus Vance', 'Allocated', NULL, '[\"GA\",\"FL\",\"AL\",\"TN\",\"MS\",\"LA\"]', 16800000.00, 29),
(7, 7, 'District 7 - Chicago (7-G)', 'Chicago, IL', 'David Ross', 'Allocated', NULL, '[\"IL\",\"IN\",\"IA\",\"MI\",\"WI\"]', 18900000.00, 34),
(8, 8, 'District 8 - St. Louis (8-H)', 'St. Louis, MO', 'Michael Chang', 'Open', NULL, '[\"MO\",\"IL\",\"IN\",\"KY\",\"TN\",\"MS\",\"AR\"]', 4900000.00, 11),
(9, 9, 'District 9 - Minneapolis (9-I)', 'Minneapolis, MN', 'Karen Peterson', 'Allocated', NULL, '[\"MN\",\"MT\",\"ND\",\"SD\",\"WI\"]', 5200000.00, 9),
(10, 10, 'District 10 - Kansas City (10-J)', 'Kansas City, MO', 'Thomas Wright', 'Open', NULL, '[\"CO\",\"KS\",\"NE\",\"OK\",\"WY\",\"MO\",\"NM\"]', 6700000.00, 15),
(11, 11, 'District 11 - Dallas (11-K)', 'Dallas, TX', 'Rachel Adams', 'Allocated', NULL, '[\"TX\",\"NM\",\"LA\"]', 21400000.00, 36),
(12, 12, 'District 12 - San Francisco (12-L)', 'San Francisco, CA', 'Kevin Zhao', 'Allocated', NULL, '[\"CA\",\"OR\",\"WA\",\"NV\",\"AZ\",\"UT\",\"ID\",\"HI\",\"AK\"]', 28600000.00, 42);

-- --------------------------------------------------------

--
-- Table structure for table `territorynote`
--

CREATE TABLE `territorynote` (
  `id` varchar(191) NOT NULL,
  `districtId` int(11) NOT NULL,
  `coachId` varchar(191) DEFAULT NULL,
  `author` varchar(191) NOT NULL DEFAULT 'Super Admin',
  `content` text NOT NULL,
  `date` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `trainingmodule`
--

CREATE TABLE `trainingmodule` (
  `id` varchar(191) NOT NULL,
  `title` varchar(191) NOT NULL,
  `category` varchar(191) NOT NULL,
  `minRankRequired` int(11) NOT NULL DEFAULT 1,
  `duration` varchar(191) NOT NULL,
  `videoUrl` text NOT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'Published',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `trainingmodule`
--

INSERT INTO `trainingmodule` (`id`, `title`, `category`, `minRankRequired`, `duration`, `videoUrl`, `status`, `createdAt`, `updatedAt`) VALUES
('tr_1', 'Enterprise Working Capital Underwriting Standards', 'Capital', 1, '24 mins', 'https://youtube.com/embed/demo1', 'Published', '2026-10-28 06:02:45.880', '2026-10-28 06:02:45.880');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `passwordHash` varchar(191) NOT NULL,
  `role` enum('ADMIN','BIZ_PRO','CLIENT','AFFILIATE','EMPLOYER','JOB_SEEKER') NOT NULL DEFAULT 'BIZ_PRO',
  `fullName` varchar(191) NOT NULL,
  `phone` varchar(191) DEFAULT NULL,
  `companyName` varchar(191) DEFAULT NULL,
  `avatarUrl` text DEFAULT NULL,
  `status` enum('PENDING','ACTIVE','SUSPENDED') NOT NULL DEFAULT 'ACTIVE',
  `twoFactorActive` tinyint(1) NOT NULL DEFAULT 0,
  `twoFactorOtp` varchar(191) DEFAULT NULL,
  `otpExpiresAt` datetime(3) DEFAULT NULL,
  `lastLoginAt` datetime(3) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `passwordHash`, `role`, `fullName`, `phone`, `companyName`, `avatarUrl`, `status`, `twoFactorActive`, `twoFactorOtp`, `otpExpiresAt`, `lastLoginAt`, `createdAt`, `updatedAt`) VALUES
('0584b51f-7cdd-4e75-8c65-36d946a3b271', 'affiliate@demo.com', '$2a$10$GigKNDc9Q.1v22GiRtA9juStGL4MssD1KWDudIyQeBTP0RH2fmEr2', 'AFFILIATE', 'Jason Bourne', '+1 (800) 555-0104', 'Midwest Financial Alliance', NULL, 'ACTIVE', 0, NULL, NULL, NULL, '2026-10-28 06:24:05.703', '2026-10-28 06:24:05.703'),
('2250c744-e4f4-4a59-a756-a94c412b538c', 'client@demo.com', '$2a$10$GigKNDc9Q.1v22GiRtA9juStGL4MssD1KWDudIyQeBTP0RH2fmEr2', 'CLIENT', 'Marcus Vance', '+1 (800) 555-0103', 'Apex Freight LLC', NULL, 'ACTIVE', 0, NULL, NULL, '2026-10-28 06:29:18.089', '2026-10-28 06:24:05.693', '2026-10-28 06:29:18.092'),
('313e3c5a-d165-47e4-956f-1ee068730683', 'admin@b4bamerica.com', '$2a$10$2vaAjccmiAme32sJn8mFW.3S9C.NP4hOmtRm4KfHffw/dttsu2Emy', 'ADMIN', 'Super Admin', '+1 (800) 555-0199', 'B4B America Corporate HQ', NULL, 'ACTIVE', 0, NULL, NULL, NULL, '2026-10-28 06:02:45.630', '2026-10-28 06:24:05.665'),
('39615e45-76fe-4c54-afe5-3fd34fe7040b', 'bizpro@demo.com', '$2a$10$GigKNDc9Q.1v22GiRtA9juStGL4MssD1KWDudIyQeBTP0RH2fmEr2', 'BIZ_PRO', 'David Ross', '+1 (800) 555-0102', 'Great Lakes Debt Advisory', NULL, 'ACTIVE', 0, NULL, NULL, NULL, '2026-10-28 06:24:05.682', '2026-10-28 06:24:05.682'),
('7593c2f4-b2d4-4de0-acb1-c70d4b1fda5a', 'admin@demo.com', '$2a$10$GigKNDc9Q.1v22GiRtA9juStGL4MssD1KWDudIyQeBTP0RH2fmEr2', 'ADMIN', 'Sarah Jenkins', '+1 (800) 555-0101', 'B4B Executive Board', NULL, 'ACTIVE', 0, NULL, NULL, '2026-10-28 06:33:16.564', '2026-10-28 06:24:05.675', '2026-10-28 06:33:16.568'),
('ef96749a-73a5-42c9-9041-133f109e7c8d', 'seeker@demo.com', '$2a$10$GigKNDc9Q.1v22GiRtA9juStGL4MssD1KWDudIyQeBTP0RH2fmEr2', 'JOB_SEEKER', 'Michael Chang', '+1 (800) 555-0106', 'Independent Candidate', NULL, 'ACTIVE', 0, NULL, NULL, NULL, '2026-10-28 06:24:05.712', '2026-10-28 06:24:05.712'),
('efe8e873-5db8-4eb0-ac6a-d352bc955f37', 'employer@demo.com', '$2a$10$GigKNDc9Q.1v22GiRtA9juStGL4MssD1KWDudIyQeBTP0RH2fmEr2', 'EMPLOYER', 'Emily Watson', '+1 (800) 555-0105', 'Apex Commercial Partners', NULL, 'ACTIVE', 0, NULL, NULL, NULL, '2026-10-28 06:24:05.707', '2026-10-28 06:24:05.707');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `affiliatepayout`
--
ALTER TABLE `affiliatepayout`
  ADD PRIMARY KEY (`id`),
  ADD KEY `AffiliatePayout_affiliateId_fkey` (`affiliateId`);

--
-- Indexes for table `affiliateprofile`
--
ALTER TABLE `affiliateprofile`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `AffiliateProfile_userId_key` (`userId`),
  ADD UNIQUE KEY `AffiliateProfile_referralCode_key` (`referralCode`);

--
-- Indexes for table `bizproprofile`
--
ALTER TABLE `bizproprofile`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `BizProProfile_userId_key` (`userId`),
  ADD KEY `BizProProfile_uplineCoachId_fkey` (`uplineCoachId`);

--
-- Indexes for table `bulletincomment`
--
ALTER TABLE `bulletincomment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `BulletinComment_postId_fkey` (`postId`),
  ADD KEY `BulletinComment_authorId_fkey` (`authorId`);

--
-- Indexes for table `bulletinpost`
--
ALTER TABLE `bulletinpost`
  ADD PRIMARY KEY (`id`),
  ADD KEY `BulletinPost_isPinned_createdAt_idx` (`isPinned`,`createdAt`),
  ADD KEY `BulletinPost_authorId_fkey` (`authorId`);

--
-- Indexes for table `bulletinreaction`
--
ALTER TABLE `bulletinreaction`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `BulletinReaction_postId_userId_emoji_key` (`postId`,`userId`,`emoji`),
  ADD KEY `BulletinReaction_userId_fkey` (`userId`);

--
-- Indexes for table `clientprofile`
--
ALTER TABLE `clientprofile`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ClientProfile_userId_key` (`userId`),
  ADD KEY `ClientProfile_assignedCoachId_fkey` (`assignedCoachId`);

--
-- Indexes for table `cmspage`
--
ALTER TABLE `cmspage`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `CmsPage_slug_key` (`slug`);

--
-- Indexes for table `commissionledger`
--
ALTER TABLE `commissionledger`
  ADD PRIMARY KEY (`id`),
  ADD KEY `CommissionLedger_coachId_periodYear_periodMonth_idx` (`coachId`,`periodYear`,`periodMonth`);

--
-- Indexes for table `commissionrule`
--
ALTER TABLE `commissionrule`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `eboxdocument`
--
ALTER TABLE `eboxdocument`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `EboxDocument_s3Key_key` (`s3Key`),
  ADD KEY `EboxDocument_clientId_category_idx` (`clientId`,`category`),
  ADD KEY `EboxDocument_uploaderId_fkey` (`uploaderId`);

--
-- Indexes for table `employerprofile`
--
ALTER TABLE `employerprofile`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `EmployerProfile_userId_key` (`userId`);

--
-- Indexes for table `fundingapplication`
--
ALTER TABLE `fundingapplication`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FundingApplication_clientId_fkey` (`clientId`);

--
-- Indexes for table `invoice`
--
ALTER TABLE `invoice`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Invoice_invoiceNumber_key` (`invoiceNumber`),
  ADD UNIQUE KEY `Invoice_stripeInvoiceId_key` (`stripeInvoiceId`),
  ADD KEY `Invoice_userId_fkey` (`userId`);

--
-- Indexes for table `job`
--
ALTER TABLE `job`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Job_status_category_state_idx` (`status`,`category`,`state`),
  ADD KEY `Job_employerId_fkey` (`employerId`);

--
-- Indexes for table `jobapplication`
--
ALTER TABLE `jobapplication`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `JobApplication_jobId_seekerId_key` (`jobId`,`seekerId`),
  ADD KEY `JobApplication_seekerId_fkey` (`seekerId`);

--
-- Indexes for table `jobseekerprofile`
--
ALTER TABLE `jobseekerprofile`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `JobSeekerProfile_userId_key` (`userId`);

--
-- Indexes for table `lead`
--
ALTER TABLE `lead`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Lead_stage_assignedCoachId_idx` (`stage`,`assignedCoachId`),
  ADD KEY `Lead_assignedCoachId_fkey` (`assignedCoachId`);

--
-- Indexes for table `pendingapproval`
--
ALTER TABLE `pendingapproval`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `permissionauditlog`
--
ALTER TABLE `permissionauditlog`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rankrule`
--
ALTER TABLE `rankrule`
  ADD PRIMARY KEY (`level`),
  ADD UNIQUE KEY `RankRule_title_key` (`title`);

--
-- Indexes for table `rolepermission`
--
ALTER TABLE `rolepermission`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `RolePermission_roleId_menuId_key` (`roleId`,`menuId`);

--
-- Indexes for table `scoreboardarchive`
--
ALTER TABLE `scoreboardarchive`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `scoreboardauditlog`
--
ALTER TABLE `scoreboardauditlog`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `scoreboardentry`
--
ALTER TABLE `scoreboardentry`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ScoreboardEntry_coachId_periodType_periodKey_key` (`coachId`,`periodType`,`periodKey`);

--
-- Indexes for table `scoreboardsetting`
--
ALTER TABLE `scoreboardsetting`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `serviceproduct`
--
ALTER TABLE `serviceproduct`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ServiceProduct_sku_key` (`sku`),
  ADD KEY `ServiceProduct_category_status_idx` (`category`,`status`);

--
-- Indexes for table `subscription`
--
ALTER TABLE `subscription`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Subscription_stripeSubscriptionId_key` (`stripeSubscriptionId`),
  ADD KEY `Subscription_userId_fkey` (`userId`);

--
-- Indexes for table `subscriptionplan`
--
ALTER TABLE `subscriptionplan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `territorydistrict`
--
ALTER TABLE `territorydistrict`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `TerritoryDistrict_number_key` (`number`);

--
-- Indexes for table `territorynote`
--
ALTER TABLE `territorynote`
  ADD PRIMARY KEY (`id`),
  ADD KEY `TerritoryNote_districtId_fkey` (`districtId`),
  ADD KEY `TerritoryNote_coachId_fkey` (`coachId`);

--
-- Indexes for table `trainingmodule`
--
ALTER TABLE `trainingmodule`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_email_key` (`email`),
  ADD KEY `User_role_status_idx` (`role`,`status`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `affiliatepayout`
--
ALTER TABLE `affiliatepayout`
  ADD CONSTRAINT `AffiliatePayout_affiliateId_fkey` FOREIGN KEY (`affiliateId`) REFERENCES `affiliateprofile` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `affiliateprofile`
--
ALTER TABLE `affiliateprofile`
  ADD CONSTRAINT `AffiliateProfile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `bizproprofile`
--
ALTER TABLE `bizproprofile`
  ADD CONSTRAINT `BizProProfile_uplineCoachId_fkey` FOREIGN KEY (`uplineCoachId`) REFERENCES `bizproprofile` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `BizProProfile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `bulletincomment`
--
ALTER TABLE `bulletincomment`
  ADD CONSTRAINT `BulletinComment_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `BulletinComment_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `bulletinpost` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `bulletinpost`
--
ALTER TABLE `bulletinpost`
  ADD CONSTRAINT `BulletinPost_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `bulletinreaction`
--
ALTER TABLE `bulletinreaction`
  ADD CONSTRAINT `BulletinReaction_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `bulletinpost` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `BulletinReaction_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `clientprofile`
--
ALTER TABLE `clientprofile`
  ADD CONSTRAINT `ClientProfile_assignedCoachId_fkey` FOREIGN KEY (`assignedCoachId`) REFERENCES `bizproprofile` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `ClientProfile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `commissionledger`
--
ALTER TABLE `commissionledger`
  ADD CONSTRAINT `CommissionLedger_coachId_fkey` FOREIGN KEY (`coachId`) REFERENCES `bizproprofile` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `eboxdocument`
--
ALTER TABLE `eboxdocument`
  ADD CONSTRAINT `EboxDocument_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `clientprofile` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `EboxDocument_uploaderId_fkey` FOREIGN KEY (`uploaderId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `employerprofile`
--
ALTER TABLE `employerprofile`
  ADD CONSTRAINT `EmployerProfile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `fundingapplication`
--
ALTER TABLE `fundingapplication`
  ADD CONSTRAINT `FundingApplication_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `clientprofile` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `invoice`
--
ALTER TABLE `invoice`
  ADD CONSTRAINT `Invoice_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `job`
--
ALTER TABLE `job`
  ADD CONSTRAINT `Job_employerId_fkey` FOREIGN KEY (`employerId`) REFERENCES `employerprofile` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `jobapplication`
--
ALTER TABLE `jobapplication`
  ADD CONSTRAINT `JobApplication_jobId_fkey` FOREIGN KEY (`jobId`) REFERENCES `job` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `JobApplication_seekerId_fkey` FOREIGN KEY (`seekerId`) REFERENCES `jobseekerprofile` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `jobseekerprofile`
--
ALTER TABLE `jobseekerprofile`
  ADD CONSTRAINT `JobSeekerProfile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `lead`
--
ALTER TABLE `lead`
  ADD CONSTRAINT `Lead_assignedCoachId_fkey` FOREIGN KEY (`assignedCoachId`) REFERENCES `bizproprofile` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `scoreboardentry`
--
ALTER TABLE `scoreboardentry`
  ADD CONSTRAINT `ScoreboardEntry_coachId_fkey` FOREIGN KEY (`coachId`) REFERENCES `bizproprofile` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `subscription`
--
ALTER TABLE `subscription`
  ADD CONSTRAINT `Subscription_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `territorynote`
--
ALTER TABLE `territorynote`
  ADD CONSTRAINT `TerritoryNote_coachId_fkey` FOREIGN KEY (`coachId`) REFERENCES `bizproprofile` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `TerritoryNote_districtId_fkey` FOREIGN KEY (`districtId`) REFERENCES `territorydistrict` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
