CREATE TABLE `lista_espera` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nome` varchar(255) NOT NULL,
	`email` varchar(320),
	`whatsapp` varchar(20),
	`interesse` varchar(100),
	`ativo` enum('sim','nao') NOT NULL DEFAULT 'sim',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `lista_espera_id` PRIMARY KEY(`id`)
);
