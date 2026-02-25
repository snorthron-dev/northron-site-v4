-- ============================================================
-- NORTHRON SECURITY - Script de Criação do Banco de Dados
-- Execute este script no seu MySQL/MariaDB antes de rodar o app
-- Compatível com: MySQL 8.0+, MariaDB 10.5+, PlanetScale, Railway
-- ============================================================

CREATE DATABASE IF NOT EXISTS northron_security
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE northron_security;

-- Tabela de usuários OAuth (legado Manus, pode ignorar se não usar OAuth)
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  openId VARCHAR(64) NOT NULL UNIQUE,
  name TEXT,
  email VARCHAR(320),
  loginMethod VARCHAR(64),
  role ENUM('user','admin','staff') NOT NULL DEFAULT 'user',
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  lastSignedIn TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Solicitações de orçamento dos clientes
CREATE TABLE IF NOT EXISTS orcamentos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  telefone VARCHAR(20) NOT NULL,
  email VARCHAR(320),
  servico VARCHAR(100) NOT NULL,
  raca VARCHAR(100),
  mensagem TEXT,
  status ENUM('novo','em_contato','fechado','cancelado') NOT NULL DEFAULT 'novo',
  origem VARCHAR(100),
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Rastreamento de page views (analytics)
CREATE TABLE IF NOT EXISTS page_views (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pagina VARCHAR(100) NOT NULL,
  subPagina VARCHAR(100),
  sessionId VARCHAR(64),
  userAgent TEXT,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Eventos de interação (analytics)
CREATE TABLE IF NOT EXISTS eventos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tipo VARCHAR(100) NOT NULL,
  pagina VARCHAR(100),
  dados TEXT,
  sessionId VARCHAR(64),
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Lista de espera para promoções e novidades
CREATE TABLE IF NOT EXISTS lista_espera (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(320),
  whatsapp VARCHAR(20),
  interesse VARCHAR(100),
  ativo ENUM('sim','nao') NOT NULL DEFAULT 'sim',
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Usuários do painel administrativo (login próprio)
-- cargo: admin = acesso total | adestrador = gerencia orçamentos | recepcao = apenas consulta
CREATE TABLE IF NOT EXISTS admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  passwordHash VARCHAR(255) NOT NULL,
  nomeCompleto VARCHAR(255),
  telefone VARCHAR(20),
  cargo ENUM('admin','adestrador','recepcao') NOT NULL DEFAULT 'recepcao',
  fotoUrl TEXT,
  fotoKey VARCHAR(255),
  ativo ENUM('sim','nao') NOT NULL DEFAULT 'sim',
  primeiroAcesso ENUM('sim','nao') NOT NULL DEFAULT 'sim',
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  lastSignedIn TIMESTAMP NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- USUÁRIO ADMIN INICIAL
-- Username: thiago.northron.adm
-- Senha: Adonai.01
-- Hash bcrypt gerado com saltRounds=12
-- TROQUE A SENHA no primeiro acesso pelo painel!
-- ============================================================
INSERT IGNORE INTO admin_users
  (username, passwordHash, nomeCompleto, cargo, ativo, primeiroAcesso)
VALUES (
  'thiago.northron.adm',
  '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBpj2VKGnFxlJu',
  'Thiago',
  'admin',
  'sim',
  'sim'
);

-- ============================================================
-- COMO CRIAR NOVOS FUNCIONÁRIOS
-- Padrão de username: primeironome.northron (ex: joao.northron)
-- Se o nome já existir: primeironome2.northron (ex: joao2.northron)
-- Gere o hash da senha com: node -e "const b=require('bcryptjs'); b.hash('SenhaAqui',12).then(console.log)"
-- ============================================================
-- Exemplo:
-- INSERT INTO admin_users (username, passwordHash, nomeCompleto, cargo, ativo, primeiroAcesso)
-- VALUES ('joao.northron', 'HASH_AQUI', 'João Silva', 'adestrador', 'sim', 'sim');

-- ============================================================
-- NOVAS TABELAS PARA SERVIÇOS E CONFIGURAÇÕES
-- Estas tabelas suportam os novos fluxos de aluguel de cães para obras,
-- aluguel de cães para festas e lista de interesse em cursos. Além disso,
-- há uma tabela de configurações que permite ao administrador atualizar
-- valores e descontos sem precisar mexer no código.
-- ============================================================

-- Tabela de configurações chave-valor
CREATE TABLE IF NOT EXISTS settings (
  `key` VARCHAR(100) NOT NULL PRIMARY KEY,
  `value` TEXT NOT NULL,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabela de solicitações de aluguel de cães para obras
CREATE TABLE IF NOT EXISTS alugueis_obra (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  telefone VARCHAR(20) NOT NULL,
  email VARCHAR(320),
  quantidadeCaes INT NOT NULL,
  duracaoMeses INT NOT NULL,
  valorEstimado INT NOT NULL,
  entrada INT NOT NULL,
  status ENUM('novo','em_contato','fechado','cancelado') NOT NULL DEFAULT 'novo',
  mensagem TEXT,
  origem VARCHAR(100),
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabela de solicitações de aluguel de cães para festas
CREATE TABLE IF NOT EXISTS alugueis_festa (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  telefone VARCHAR(20) NOT NULL,
  email VARCHAR(320),
  data VARCHAR(25),
  horas INT NOT NULL,
  quantidadeCaes INT NOT NULL,
  valorEstimado INT NOT NULL,
  status ENUM('novo','em_contato','fechado','cancelado') NOT NULL DEFAULT 'novo',
  mensagem TEXT,
  origem VARCHAR(100),
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabela de interessados em curso de adestramento
CREATE TABLE IF NOT EXISTS cursos_interesse (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  whatsapp VARCHAR(20) NOT NULL,
  cidade VARCHAR(100),
  nivelInteresse VARCHAR(100),
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

