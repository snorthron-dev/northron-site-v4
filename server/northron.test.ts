import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { getDb } from "./db";

// Testa a conexão com o banco de dados
describe("Database Connection", () => {
  it("should connect to the database", async () => {
    const db = await getDb();
    expect(db).toBeDefined();
  });
});

// Testa as funções de orçamento
describe("Orçamentos", () => {
  let orcamentoId: number;

  it("should create a new orçamento", async () => {
    const { criarOrcamento } = await import("./db");
    const result = await criarOrcamento({
      nome: "Teste Vitest",
      telefone: "84999999999",
      email: "teste@vitest.com",
      servico: "adestramento",
      raca: "Labrador",
      mensagem: "Teste automatizado de criação de orçamento",
      status: "novo",
      origem: "teste",
    });
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    // Salvar o ID para limpeza posterior
    if (result && result.length > 0) {
      orcamentoId = (result[0] as { insertId: number }).insertId;
    }
  });

  it("should list orçamentos", async () => {
    const { listarOrcamentos } = await import("./db");
    const result = await listarOrcamentos(10, 0);
    expect(Array.isArray(result)).toBe(true);
  });

  it("should count orçamentos by status", async () => {
    const { contarOrcamentosPorStatus } = await import("./db");
    const result = await contarOrcamentosPorStatus();
    expect(Array.isArray(result)).toBe(true);
    // Cada item deve ter status e total
    if (result.length > 0) {
      expect(result[0]).toHaveProperty("status");
      expect(result[0]).toHaveProperty("total");
    }
  });
});

// Testa as funções de lista de espera
describe("Lista de Espera", () => {
  it("should add to lista de espera", async () => {
    const { inscreverListaEspera } = await import("./db");
    const result = await inscreverListaEspera({
      nome: "Teste Lista Espera",
      email: "lista@vitest.com",
      whatsapp: "84988888888",
      interesse: "adestramento",
      ativo: "sim",
    });
    expect(result).toBeDefined();
  });

  it("should list lista de espera", async () => {
    const { listarListaEspera } = await import("./db");
    const result = await listarListaEspera(10, 0);
    expect(Array.isArray(result)).toBe(true);
  });
});

// Testa as funções de analytics
describe("Analytics", () => {
  it("should register a page view", async () => {
    const { registrarPageView } = await import("./db");
    const result = await registrarPageView({
      pagina: "teste-vitest",
      userAgent: "vitest",
    });
    expect(result).toBeDefined();
  });

  it("should get page view stats", async () => {
    const { obterEstatisticasPageViews } = await import("./db");
    const result = await obterEstatisticasPageViews(30);
    expect(Array.isArray(result)).toBe(true);
  });

  it("should get total page views", async () => {
    const { obterTotalPageViews } = await import("./db");
    const result = await obterTotalPageViews(30);
    expect(typeof result).toBe("number");
    expect(result).toBeGreaterThanOrEqual(0);
  });
});
