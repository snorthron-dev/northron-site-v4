import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// TODO: add feature queries here as your schema grows.

// ============ ORÇAMENTOS ============
import { orcamentos, pageViews, eventos } from "../drizzle/schema";
import { desc, count, sql, gte } from "drizzle-orm";
import type { InsertOrcamento, InsertPageView, InsertEvento } from "../drizzle/schema";
import {
  settings,
  alugueisObra,
  alugueisFesta,
  cursosInteresse,
  type InsertSetting,
  type InsertAluguelObra,
  type InsertAluguelFesta,
  type InsertCursoInteresse,
} from "../drizzle/schema";

export async function criarOrcamento(data: InsertOrcamento) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(orcamentos).values(data);
}

export async function listarOrcamentos(limit = 50, offset = 0) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(orcamentos)
    .orderBy(desc(orcamentos.createdAt))
    .limit(limit)
    .offset(offset);
}

export async function buscarOrcamentoPorId(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const [result] = await db.select().from(orcamentos).where(eq(orcamentos.id, id));
  return result;
}

export async function atualizarStatusOrcamento(
  id: number,
  status: "novo" | "em_contato" | "fechado" | "cancelado"
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(orcamentos).set({ status }).where(eq(orcamentos.id, id));
}

export async function contarOrcamentosPorStatus() {
  const db = await getDb();
  if (!db) return [];
  return db
    .select({ status: orcamentos.status, total: count() })
    .from(orcamentos)
    .groupBy(orcamentos.status);
}

// ============ PAGE VIEWS ============

export async function registrarPageView(data: InsertPageView) {
  const db = await getDb();
  if (!db) return;
  return db.insert(pageViews).values(data);
}

export async function obterEstatisticasPageViews(dias = 30) {
  const db = await getDb();
  if (!db) return [];
  const dataInicio = new Date();
  dataInicio.setDate(dataInicio.getDate() - dias);
  return db
    .select({ pagina: pageViews.pagina, total: count() })
    .from(pageViews)
    .where(gte(pageViews.createdAt, dataInicio))
    .groupBy(pageViews.pagina)
    .orderBy(desc(count()));
}

export async function obterTotalPageViews(dias = 30) {
  const db = await getDb();
  if (!db) return 0;
  const dataInicio = new Date();
  dataInicio.setDate(dataInicio.getDate() - dias);
  const [result] = await db
    .select({ total: count() })
    .from(pageViews)
    .where(gte(pageViews.createdAt, dataInicio));
  return result?.total ?? 0;
}

export async function obterPageViewsPorDia(dias = 30) {
  const db = await getDb();
  if (!db) return [];
  const dataInicio = new Date();
  dataInicio.setDate(dataInicio.getDate() - dias);
  return db
    .select({
      dia: sql<string>`DATE(${pageViews.createdAt})`,
      total: count(),
    })
    .from(pageViews)
    .where(gte(pageViews.createdAt, dataInicio))
    .groupBy(sql`DATE(${pageViews.createdAt})`)
    .orderBy(sql`DATE(${pageViews.createdAt})`);
}

// ============ EVENTOS ============

export async function registrarEvento(data: InsertEvento) {
  const db = await getDb();
  if (!db) return;
  return db.insert(eventos).values(data);
}

export async function obterEstatisticasEventos(dias = 30) {
  const db = await getDb();
  if (!db) return [];
  const dataInicio = new Date();
  dataInicio.setDate(dataInicio.getDate() - dias);
  return db
    .select({ tipo: eventos.tipo, total: count() })
    .from(eventos)
    .where(gte(eventos.createdAt, dataInicio))
    .groupBy(eventos.tipo)
    .orderBy(desc(count()));
}

// ============ USUÁRIOS (ADMIN) ============

export async function listarUsuarios() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(users).orderBy(desc(users.createdAt));
}

export async function atualizarRoleUsuario(id: number, role: "user" | "admin" | "staff") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(users).set({ role }).where(eq(users.id, id));
}

// ============ LISTA DE ESPERA ============
import { listaEspera } from "../drizzle/schema";
import type { InsertListaEspera } from "../drizzle/schema";

export async function inscreverListaEspera(data: InsertListaEspera) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(listaEspera).values(data);
}

export async function listarListaEspera(limit = 100, offset = 0) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(listaEspera)
    .orderBy(desc(listaEspera.createdAt))
    .limit(limit)
    .offset(offset);
}

// ============ ADMIN USERS (SISTEMA DE LOGIN PRÓPRIO) ============
import { adminUsers } from "../drizzle/schema";
import type { InsertAdminUser } from "../drizzle/schema";
import bcrypt from "bcryptjs";

export async function criarAdminUser(data: {
  username: string;
  password: string;
  nomeCompleto?: string;
  telefone?: string;
  cargo?: "admin" | "adestrador" | "recepcao";
  primeiroAcesso?: "sim" | "nao";
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const passwordHash = await bcrypt.hash(data.password, 12);
  return db.insert(adminUsers).values({
    username: data.username,
    passwordHash,
    nomeCompleto: data.nomeCompleto,
    telefone: data.telefone,
    cargo: data.cargo ?? "recepcao",
    primeiroAcesso: data.primeiroAcesso ?? "sim",
    ativo: "sim",
  });
}

export async function buscarAdminUserPorUsername(username: string) {
  const db = await getDb();
  if (!db) return undefined;
  // Case-insensitive: normalize to lowercase before comparing
  const usernameLower = username.toLowerCase().trim();
  const [result] = await db.select().from(adminUsers).where(sql`LOWER(${adminUsers.username}) = ${usernameLower}`).limit(1);
  return result;
}

export async function buscarAdminUserPorId(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const [result] = await db.select().from(adminUsers).where(eq(adminUsers.id, id)).limit(1);
  return result;
}

export async function verificarSenhaAdminUser(username: string, password: string) {
  const user = await buscarAdminUserPorUsername(username);
  if (!user || user.ativo === "nao") return null;
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return null;
  return user;
}

export async function atualizarSenhaAdminUser(id: number, novaSenha: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const passwordHash = await bcrypt.hash(novaSenha, 12);
  return db.update(adminUsers).set({ passwordHash, primeiroAcesso: "nao", updatedAt: new Date() }).where(eq(adminUsers.id, id));
}

export async function atualizarPerfilAdminUser(id: number, data: { nomeCompleto?: string; telefone?: string; cargo?: "admin" | "adestrador" | "recepcao"; fotoUrl?: string; fotoKey?: string }) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(adminUsers).set({ ...data, updatedAt: new Date() }).where(eq(adminUsers.id, id));
}

export async function ativarDesativarAdminUser(id: number, ativo: "sim" | "nao") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(adminUsers).set({ ativo, updatedAt: new Date() }).where(eq(adminUsers.id, id));
}

export async function registrarLoginAdminUser(id: number) {
  const db = await getDb();
  if (!db) return;
  return db.update(adminUsers).set({ lastSignedIn: new Date() }).where(eq(adminUsers.id, id));
}

export async function listarAdminUsers() {
  const db = await getDb();
  if (!db) return [];
  return db.select({
    id: adminUsers.id,
    username: adminUsers.username,
    nomeCompleto: adminUsers.nomeCompleto,
    telefone: adminUsers.telefone,
    cargo: adminUsers.cargo,
    fotoUrl: adminUsers.fotoUrl,
    ativo: adminUsers.ativo,
    primeiroAcesso: adminUsers.primeiroAcesso,
    createdAt: adminUsers.createdAt,
    lastSignedIn: adminUsers.lastSignedIn,
  }).from(adminUsers).orderBy(desc(adminUsers.createdAt));
}

export async function verificarUsernameDisponivel(username: string) {
  const db = await getDb();
  if (!db) return false;
  const [result] = await db.select({ id: adminUsers.id }).from(adminUsers).where(eq(adminUsers.username, username)).limit(1);
  return !result;
}

// ================== CONFIGURAÇÕES ==================
// Obtém todas as configurações como um objeto { key: value }
export async function listarSettings() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(settings);
}

// Obtém uma configuração específica
export async function getSetting(key: string): Promise<string | null> {
  const db = await getDb();
  if (!db) return null;
  const [result] = await db.select().from(settings).where(eq(settings.key, key)).limit(1);
  return result ? result.value : null;
}

// Cria ou atualiza uma configuração
export async function setSetting(key: string, value: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  // If exists, update; else insert
  const existing = await getSetting(key);
  if (existing === null) {
    return db.insert(settings).values({ key, value });
  } else {
    return db.update(settings).set({ value, updatedAt: new Date() }).where(eq(settings.key, key));
  }
}

// ================== ALUGUEL OBRA ==================
export async function criarAluguelObra(data: InsertAluguelObra) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(alugueisObra).values(data);
}

export async function listarAlugueisObra(limit = 50, offset = 0) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(alugueisObra).orderBy(desc(alugueisObra.createdAt)).limit(limit).offset(offset);
}

export async function atualizarStatusAluguelObra(id: number, status: "novo" | "em_contato" | "fechado" | "cancelado") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(alugueisObra).set({ status }).where(eq(alugueisObra.id, id));
}

// ================== ALUGUEL FESTA ==================
export async function criarAluguelFesta(data: InsertAluguelFesta) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(alugueisFesta).values(data);
}

export async function listarAlugueisFesta(limit = 50, offset = 0) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(alugueisFesta).orderBy(desc(alugueisFesta.createdAt)).limit(limit).offset(offset);
}

export async function atualizarStatusAluguelFesta(id: number, status: "novo" | "em_contato" | "fechado" | "cancelado") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(alugueisFesta).set({ status }).where(eq(alugueisFesta.id, id));
}

// ================== CURSO INTERESSE ==================
export async function criarCursoInteresse(data: InsertCursoInteresse) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(cursosInteresse).values(data);
}

export async function listarCursosInteresse(limit = 100, offset = 0) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(cursosInteresse).orderBy(desc(cursosInteresse.createdAt)).limit(limit).offset(offset);
}
