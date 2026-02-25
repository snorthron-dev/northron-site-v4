CREATE TABLE `eventos` (
	`id` int AUTO_INCREMENT NOT NULL,
	`tipo` varchar(100) NOT NULL,
	`pagina` varchar(100),
	`dados` text,
	`sessionId` varchar(64),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `eventos_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `orcamentos` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nome` varchar(255) NOT NULL,
	`telefone` varchar(20) NOT NULL,
	`email` varchar(320),
	`servico` varchar(100) NOT NULL,
	`raca` varchar(100),
	`mensagem` text,
	`status` enum('novo','em_contato','fechado','cancelado') NOT NULL DEFAULT 'novo',
	`origem` varchar(100),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `orcamentos_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `page_views` (
	`id` int AUTO_INCREMENT NOT NULL,
	`pagina` varchar(100) NOT NULL,
	`subPagina` varchar(100),
	`sessionId` varchar(64),
	`userAgent` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `page_views_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `role` enum('user','admin','staff') NOT NULL DEFAULT 'user';