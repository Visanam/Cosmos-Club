CREATE TABLE `storyComments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`page` varchar(64) NOT NULL,
	`displayName` varchar(80) NOT NULL,
	`message` text NOT NULL,
	`status` enum('pending','approved','rejected') NOT NULL DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`reviewedAt` timestamp,
	CONSTRAINT `storyComments_id` PRIMARY KEY(`id`)
);
