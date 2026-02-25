import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin", "staff"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Solicitações de orçamento dos clientes
export const orcamentos = mysqlTable("orcamentos", {
  id: int("id").autoincrement().primaryKey(),
  nome: varchar("nome", { length: 255 }).notNull(),
  telefone: varchar("telefone", { length: 20 }).notNull(),
  email: varchar("email", { length: 320 }),
  servico: varchar("servico", { length: 100 }).notNull(),
  raca: varchar("raca", { length: 100 }),
  mensagem: text("mensagem"),
  status: mysqlEnum("status", ["novo", "em_contato", "fechado", "cancelado"]).default("novo").notNull(),
  origem: varchar("origem", { length: 100 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Orcamento = typeof orcamentos.$inferSelect;
export type InsertOrcamento = typeof orcamentos.$inferInsert;

// Rastreamento de page views
export const pageViews = mysqlTable("page_views", {
  id: int("id").autoincrement().primaryKey(),
  pagina: varchar("pagina", { length: 100 }).notNull(),
  subPagina: varchar("subPagina", { length: 100 }),
  sessionId: varchar("sessionId", { length: 64 }),
  userAgent: text("userAgent"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type PageView = typeof pageViews.$inferSelect;
export type InsertPageView = typeof pageViews.$inferInsert;

// Eventos de interação
export const eventos = mysqlTable("eventos", {
  id: int("id").autoincrement().primaryKey(),
  tipo: varchar("tipo", { length: 100 }).notNull(),
  pagina: varchar("pagina", { length: 100 }),
  dados: text("dados"),
  sessionId: varchar("sessionId", { length: 64 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Evento = typeof eventos.$inferSelect;
export type InsertEvento = typeof eventos.$inferInsert;
// Lista de espera para promoções e novidades
export const listaEspera = mysqlTable("lista_espera", {
  id: int("id").autoincrement().primaryKey(),
  nome: varchar("nome", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }),
  whatsapp: varchar("whatsapp", { length: 20 }),
  interesse: varchar("interesse", { length: 100 }), // adestramento, guarda, consultoria, geral
  ativo: mysqlEnum("ativo", ["sim", "nao"]).default("sim").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ListaEspera = typeof listaEspera.$inferSelect;
export type InsertListaEspera = typeof listaEspera.$inferInsert;

// Usuários do painel administrativo (sistema de login próprio)
// role: admin = acesso total | adestrador = gerencia orçamentos | recepcao = apenas consulta
export const adminUsers = mysqlTable("admin_users", {
  id: int("id").autoincrement().primaryKey(),
  username: varchar("username", { length: 100 }).notNull().unique(),
  passwordHash: varchar("passwordHash", { length: 255 }).notNull(),
  nomeCompleto: varchar("nomeCompleto", { length: 255 }),
  telefone: varchar("telefone", { length: 20 }),
  cargo: mysqlEnum("cargo", ["admin", "adestrador", "recepcao"]).default("recepcao").notNull(),
  fotoUrl: text("fotoUrl"),
  fotoKey: varchar("fotoKey", { length: 255 }),
  ativo: mysqlEnum("ativo", ["sim", "nao"]).default("sim").notNull(),
  primeiroAcesso: mysqlEnum("primeiroAcesso", ["sim", "nao"]).default("sim").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn"),
});
export type AdminUser = typeof adminUsers.$inferSelect;
export type InsertAdminUser = typeof adminUsers.$inferInsert;

// =====================
// Novas tabelas para serviços adicionais
// =====================

// Configurações editáveis pelo administrador. Cada chave armazena um valor em formato string (pode ser convertido em número no código).
export const settings = mysqlTable("settings", {
  /** Chave única de configuração (ex: adestramento_base_price, obra_preco_mensal) */
  key: varchar("key", { length: 100 }).primaryKey(),
  /** Valor armazenado como string; será interpretado conforme o contexto */
  value: text("value").notNull(),
  /** Quando a configuração foi criada ou atualizada */
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Setting = typeof settings.$inferSelect;
export type InsertSetting = typeof settings.$inferInsert;

// Solicitações de aluguel de cães para obras (segurança em canteiros). Armazena dados do cliente e o valor estimado calculado.
export const alugueisObra = mysqlTable("alugueis_obra", {
  id: int("id").autoincrement().primaryKey(),
  nome: varchar("nome", { length: 255 }).notNull(),
  telefone: varchar("telefone", { length: 20 }).notNull(),
  email: varchar("email", { length: 320 }),
  quantidadeCaes: int("quantidadeCaes").notNull(),
  duracaoMeses: int("duracaoMeses").notNull(),
  /** Valor estimado em centavos (ex: 123450 => R$1.234,50) */
  valorEstimado: int("valorEstimado").notNull(),
  entrada: int("entrada").notNull(),
  status: mysqlEnum("status", ["novo", "em_contato", "fechado", "cancelado"]).default("novo").notNull(),
  mensagem: text("mensagem"),
  origem: varchar("origem", { length: 100 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type AluguelObra = typeof alugueisObra.$inferSelect;
export type InsertAluguelObra = typeof alugueisObra.$inferInsert;

// Solicitações de aluguel de cães para festas e eventos. Computa valor estimado com base em horas e quantidade de cães.
export const alugueisFesta = mysqlTable("alugueis_festa", {
  id: int("id").autoincrement().primaryKey(),
  nome: varchar("nome", { length: 255 }).notNull(),
  telefone: varchar("telefone", { length: 20 }).notNull(),
  email: varchar("email", { length: 320 }),
  data: varchar("data", { length: 25 }),
  horas: int("horas").notNull(),
  quantidadeCaes: int("quantidadeCaes").notNull(),
  /** Valor estimado em centavos (ex: 30000 = R$300,00) */
  valorEstimado: int("valorEstimado").notNull(),
  status: mysqlEnum("status", ["novo", "em_contato", "fechado", "cancelado"]).default("novo").notNull(),
  mensagem: text("mensagem"),
  origem: varchar("origem", { length: 100 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type AluguelFesta = typeof alugueisFesta.$inferSelect;
export type InsertAluguelFesta = typeof alugueisFesta.$inferInsert;

// Lista de interesse no curso de adestramento. Essa tabela registra pessoas interessadas em futuros cursos.
export const cursosInteresse = mysqlTable("cursos_interesse", {
  id: int("id").autoincrement().primaryKey(),
  nome: varchar("nome", { length: 255 }).notNull(),
  whatsapp: varchar("whatsapp", { length: 20 }).notNull(),
  cidade: varchar("cidade", { length: 100 }),
  nivelInteresse: varchar("nivelInteresse", { length: 100 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type CursoInteresse = typeof cursosInteresse.$inferSelect;
export type InsertCursoInteresse = typeof cursosInteresse.$inferInsert;
