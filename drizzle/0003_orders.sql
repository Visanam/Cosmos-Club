-- Records a completed Stripe purchase, written by the /api/stripe/webhook
-- handler. The unique stripeSessionId makes webhook retries idempotent.
CREATE TABLE `orders` (
	`id` int AUTO_INCREMENT NOT NULL,
	`stripeSessionId` varchar(255) NOT NULL,
	`parentName` varchar(255),
	`customerEmail` varchar(320),
	`childNameAge` varchar(255),
	`valueFocus` varchar(100),
	`country` varchar(64),
	`currency` varchar(8),
	`amount` int,
	`orderStatus` enum('paid','refunded') NOT NULL DEFAULT 'paid',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `orders_id` PRIMARY KEY(`id`),
	CONSTRAINT `orders_stripeSessionId_unique` UNIQUE(`stripeSessionId`)
);
