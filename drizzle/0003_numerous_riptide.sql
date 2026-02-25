CREATE TABLE `admin_users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`username` varchar(100) NOT NULL,
	`passwordHash` varchar(255) NOT NULL,
	`nomeCompleto` varchar(255),
	`telefone` varchar(20),
	`cargo` enum('admin','adestrador','recepcao') NOT NULL DEFAULT 'recepcao',
	`fotoUrl` text,
	`fotoKey` varchar(255),
	`ativo` enum('sim','nao') NOT NULL DEFAULT 'sim',
	`primeiroAcesso` enum('sim','nao') NOT NULL DEFAULT 'sim',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`lastSignedIn` timestamp,
	CONSTRAINT `admin_users_id` PRIMARY KEY(`id`),
	CONSTRAINT `admin_users_username_unique` UNIQUE(`username`)
);
