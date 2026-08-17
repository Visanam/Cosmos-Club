CREATE TABLE `leads` (
	`id` int AUTO_INCREMENT NOT NULL,
	`type` enum('school','event') NOT NULL,
	`schoolName` varchar(255),
	`contactName` varchar(255) NOT NULL,
	`contactEmail` varchar(320) NOT NULL,
	`contactPhone` varchar(64) NOT NULL,
	`gradeRange` varchar(128),
	`eventType` varchar(128),
	`message` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `leads_id` PRIMARY KEY(`id`)
);
