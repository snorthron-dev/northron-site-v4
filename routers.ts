import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import {
  criarOrcamento,
  listarOrcamentos,
  atualizarStatusOrcamento,
  contarOrcamentosPorStatus,
  registrarPageView,
  obterEstatisticasPageViews,
  obterTotalPageViews,
  obterPageViewsPorDia,
  registrarEvento,
  obterEstatisticasEventos,
  listarUsuarios,
  atualizarRoleUsuario,
  inscreverListaEspera,
  listarListaEspera,
  criarAdminUser,
  buscarAdminUserPorId,
  verificarSenhaAdminUser,
  atualizarSenhaAdminUser,
  atualizarPerfilAdminUser,
  ativarDesativarAdminUser,
  registrarLoginAdminUser,
  listarAdminUsers,
  verificarUsernameDisponivel,
  // Novas funções de banco
  listarSettings,
  getSetting,
  setSetting,
  criarAluguelObra,
  listarAlugueisObra,
  atualizarStatusAluguelObra,
  criarAluguelFesta,
  listarAlugueisFesta,
  atualizarStatusAluguelFesta,
  criarCursoInteresse,
  listarCursosInteresse,
} from "./db";
import { notifyOwner } from "./_core/notification";
import { storagePut } from "./storage";
import * as jose from "jose";
import { parse as parseCookies } from "cookie";

// Cookie name for admin session (separate from OAuth session)
const ADMIN_COOKIE = "northron_admin_session";

// Helper: read admin cookie from raw header (avoids cookie-parser dependency)
function getAdminCookieFromReq(req: any): string | undefined {
  const cookieHeader = req?.headers?.cookie;
  if (!cookieHeader) return undefined;
  const parsed = parseCookies(cookieHeader);
  return parsed[ADMIN_COOKIE];
}

// Helper: sign admin JWT
async function signAdminToken(userId: number, cargo: string) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET || "northron-secret-2025");
  return new jose.SignJWT({ userId, cargo })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("8h")
    .sign(secret);
}

// Helper: verify admin JWT from cookie
async function verifyAdminToken(token: string): Promise<{ userId: number; cargo: string } | null> {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "northron-secret-2025");
    const { payload } = await jose.jwtVerify(token, secret);
    return { userId: payload.userId as number, cargo: payload.cargo as string };
  } catch {
    return null;
  }
}

// Procedure que exige admin ou staff (OAuth)
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin" && (ctx.user.role as string) !== "staff") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Acesso restrito a administradores." });
  }
  return next({ ctx });
});

// Procedure que exige apenas admin (OAuth)
const superAdminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Acesso restrito ao administrador principal." });
  }
  return next({ ctx });
});

// Procedure que verifica sessão do admin próprio (username/senha)
const adminAuthProcedure = publicProcedure.use(async ({ ctx, next }) => {
  const token = getAdminCookieFromReq(ctx.req);
  if (!token) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Sessão administrativa não encontrada." });
  }
  const payload = await verifyAdminToken(token);
  if (!payload) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Sessão inválida ou expirada." });
  }
  const adminUser = await buscarAdminUserPorId(payload.userId);
  if (!adminUser || adminUser.ativo === "nao") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Usuário desativado ou não encontrado." });
  }
  return next({ ctx: { ...ctx, adminUser } });
});

// Procedure que exige cargo admin
const adminOnlyProcedure = adminAuthProcedure.use(({ ctx, next }) => {
  if ((ctx as any).adminUser?.cargo !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Apenas o administrador pode realizar esta ação." });
  }
  return next({ ctx });
});

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // ============ AUTENTICAÇÃO ADMIN PRÓPRIA (username/senha) ============
  adminAuth: router({
    login: publicProcedure
      .input(z.object({
        username: z.string().min(1, "Username obrigatório"),
        senha: z.string().min(1, "Senha obrigatória"),
      }))
      .mutation(async ({ input, ctx }) => {
        const user = await verificarSenhaAdminUser(input.username, input.senha);
        if (!user) {
          throw new TRPCError({ code: "UNAUTHORIZED", message: "Username ou senha incorretos." });
        }
        await registrarLoginAdminUser(user.id);
        const token = await signAdminToken(user.id, user.cargo);
        const cookieOpts = getSessionCookieOptions(ctx.req);
        ctx.res.cookie(ADMIN_COOKIE, token, {
          ...cookieOpts,
          maxAge: 8 * 60 * 60 * 1000, // 8 horas
        });
        return {
          success: true,
          primeiroAcesso: user.primeiroAcesso === "sim",
          cargo: user.cargo,
          nomeCompleto: user.nomeCompleto,
          username: user.username,
        };
      }),

    logout: publicProcedure.mutation(({ ctx }) => {
      ctx.res.clearCookie(ADMIN_COOKIE, { path: "/" });
      return { success: true };
    }),

    me: publicProcedure.query(async ({ ctx }) => {
      const token = getAdminCookieFromReq(ctx.req);
      if (!token) return null;
      const payload = await verifyAdminToken(token);
      if (!payload) return null;
      const user = await buscarAdminUserPorId(payload.userId);
      if (!user || user.ativo === "nao") return null;
      return {
        id: user.id,
        username: user.username,
        nomeCompleto: user.nomeCompleto,
        telefone: user.telefone,
        cargo: user.cargo,
        fotoUrl: user.fotoUrl,
        primeiroAcesso: user.primeiroAcesso === "sim",
        ativo: user.ativo,
      };
    }),

    trocarSenha: adminAuthProcedure
      .input(z.object({
        senhaAtual: z.string().min(1),
        novaSenha: z.string().min(6, "A nova senha deve ter pelo menos 6 caracteres"),
      }))
      .mutation(async ({ input, ctx }) => {
        const adminUser = (ctx as any).adminUser;
        // Verificar senha atual
        const valid = await verificarSenhaAdminUser(adminUser.username, input.senhaAtual);
        if (!valid) {
          throw new TRPCError({ code: "BAD_REQUEST", message: "Senha atual incorreta." });
        }
        await atualizarSenhaAdminUser(adminUser.id, input.novaSenha);
        return { success: true };
      }),
  }),

  // ============ GESTÃO DE FUNCIONÁRIOS (APENAS ADMIN) ============
  funcionarios: router({
    listar: adminAuthProcedure.query(async ({ ctx }) => {
      const adminUser = (ctx as any).adminUser;
      if (adminUser.cargo !== "admin") {
        throw new TRPCError({ code: "FORBIDDEN", message: "Apenas o administrador pode ver os funcionários." });
      }
      return listarAdminUsers();
    }),

    criar: adminOnlyProcedure
      .input(z.object({
        nomeCompleto: z.string().min(2, "Nome completo obrigatório"),
        telefone: z.string().optional(),
        cargo: z.enum(["adestrador", "recepcao"]),
      }))
      .mutation(async ({ input }) => {
        // Gerar username automático: primeironome.northron (ou primeironome2.northron se duplicado)
        const primeiroNome = input.nomeCompleto
          .split(" ")[0]
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-z0-9]/g, "");

        let username = `${primeiroNome}.northron`;
        let disponivel = await verificarUsernameDisponivel(username);
        if (!disponivel) {
          let counter = 2;
          while (!disponivel) {
            username = `${primeiroNome}${counter}.northron`;
            disponivel = await verificarUsernameDisponivel(username);
            counter++;
          }
        }

        // Senha temporária padrão para novos funcionários. Conforme requisitos,
        // todos os colaboradores iniciam com "1234" e serão forçados a trocar
        // no primeiro login.
        const senhaTemp = "1234";

        await criarAdminUser({
          username,
          password: senhaTemp,
          nomeCompleto: input.nomeCompleto,
          telefone: input.telefone,
          cargo: input.cargo,
          primeiroAcesso: "sim",
        });

        return { success: true, username, senhaTemp };
      }),

    editar: adminOnlyProcedure
      .input(z.object({
        id: z.number(),
        nomeCompleto: z.string().min(2).optional(),
        telefone: z.string().optional(),
        cargo: z.enum(["adestrador", "recepcao"]).optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await atualizarPerfilAdminUser(id, data);
        return { success: true };
      }),

    redefinirSenha: adminOnlyProcedure
      .input(z.object({
        id: z.number(),
        novaSenha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
      }))
      .mutation(async ({ input }) => {
        await atualizarSenhaAdminUser(input.id, input.novaSenha);
        // Marcar como primeiro acesso para forçar troca
        const { getDb } = await import("./db");
        const db = await getDb();
        if (db) {
          const { adminUsers } = await import("../drizzle/schema");
          const { eq } = await import("drizzle-orm");
          await db.update(adminUsers).set({ primeiroAcesso: "sim" }).where(eq(adminUsers.id, input.id));
        }
        return { success: true };
      }),

    ativarDesativar: adminOnlyProcedure
      .input(z.object({
        id: z.number(),
        ativo: z.enum(["sim", "nao"]),
      }))
      .mutation(async ({ input }) => {
        await ativarDesativarAdminUser(input.id, input.ativo);
        return { success: true };
      }),

    uploadFoto: adminOnlyProcedure
      .input(z.object({
        id: z.number(),
        fotoBase64: z.string(),
        mimeType: z.string().default("image/jpeg"),
      }))
      .mutation(async ({ input }) => {
        const buffer = Buffer.from(input.fotoBase64, "base64");
        const ext = input.mimeType.split("/")[1] || "jpg";
        const key = `funcionarios/foto-${input.id}-${Date.now()}.${ext}`;
        const { url } = await storagePut(key, buffer, input.mimeType);
        await atualizarPerfilAdminUser(input.id, { fotoUrl: url, fotoKey: key });
        return { success: true, fotoUrl: url };
      }),
  }),

  // ============ ORÇAMENTOS (PÚBLICO) ============
  orcamento: router({
    criar: publicProcedure
      .input(
        z.object({
          nome: z.string().min(2, "Nome é obrigatório"),
          telefone: z.string().min(8, "Telefone/WhatsApp inválido"),
          email: z.string().email("Email inválido").optional().or(z.literal("")),
          servico: z.string().min(1, "Selecione um serviço"),
          raca: z.string().optional(),
          mensagem: z.string().min(10, "Descreva o problema do seu cão (mínimo 10 caracteres)"),
          origem: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        await criarOrcamento({
          nome: input.nome,
          telefone: input.telefone,
          email: input.email || null,
          servico: input.servico,
          raca: input.raca || null,
          mensagem: input.mensagem,
          origem: input.origem || null,
        });

        try {
          await notifyOwner({
            title: `🐕 Nova solicitação: ${input.servico}`,
            content: `**${input.nome}** solicitou orçamento para **${input.servico}**.\n📱 WhatsApp: ${input.telefone}\n📧 Email: ${input.email || "não informado"}\n\n💬 Problema: ${input.mensagem}`,
          });
        } catch (e) {
          console.warn("Falha ao notificar dono:", e);
        }

        return { success: true };
      }),
  }),

  // ============ CONFIGURAÇÕES (ADMIN) ============
  config: router({
    // Retorna todas as configurações existentes como uma lista de { key, value }
    listar: adminAuthProcedure.query(async () => {
      return listarSettings();
    }),
    // Obtém um valor de configuração específico. Usa argumento "key".
    obter: adminAuthProcedure
      .input(z.object({ key: z.string() }))
      .query(async ({ input }) => {
        const value = await getSetting(input.key);
        return { key: input.key, value };
      }),
    // Atualiza ou cria uma configuração. Apenas o admin principal pode alterar valores.
    atualizar: adminOnlyProcedure
      .input(z.object({ key: z.string(), value: z.string() }))
      .mutation(async ({ input }) => {
        await setSetting(input.key, input.value);
        return { success: true };
      }),
  }),

  // ============ ALUGUEL DE CÃES PARA OBRAS ============
  aluguelObra: router({
    // Cria uma solicitação de aluguel para canteiros de obra e calcula o valor estimado
    criar: publicProcedure
      .input(
        z.object({
          nome: z.string().min(2, "Nome obrigatório"),
          telefone: z.string().min(8, "Telefone inválido"),
          email: z.string().email().optional().or(z.literal("")),
          quantidadeCaes: z.number().min(1, "Informe quantos cães"),
          duracaoMeses: z.union([z.literal(3), z.literal(6), z.literal(12)]),
          mensagem: z.string().optional(),
          origem: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        // Ler configurações ou usar valores padrão
        const toFloat = (str: string | null | undefined, def: number) => {
          const n = parseFloat(String(str));
          return isNaN(n) ? def : n;
        };
        const baseMensal = toFloat(await getSetting("obra_preco_mensal"), 1600);
        const entrada = toFloat(await getSetting("obra_entrada"), 500);
        const desconto6 = toFloat(await getSetting("obra_desconto_6"), 0.05);
        const desconto12 = toFloat(await getSetting("obra_desconto_12"), 0.10);
        // Calcular valor
        let total = baseMensal * input.quantidadeCaes * input.duracaoMeses;
        if (input.duracaoMeses === 6) total *= 1 - desconto6;
        if (input.duracaoMeses === 12) total *= 1 - desconto12;
        // Somar entrada
        total += entrada;
        const valorEstimado = Math.round(total * 100); // em centavos
        await criarAluguelObra({
          nome: input.nome,
          telefone: input.telefone,
          email: input.email || null,
          quantidadeCaes: input.quantidadeCaes,
          duracaoMeses: input.duracaoMeses,
          valorEstimado,
          entrada: Math.round(entrada * 100),
          status: "novo",
          mensagem: input.mensagem || null,
          origem: input.origem || null,
        });
        try {
          await notifyOwner({
            title: `🐾 Novo aluguel para obra (${input.quantidadeCaes} cão/ães)`,
            content: `**${input.nome}** solicitou aluguel de cães para ${input.duracaoMeses} meses. Quantidade: ${input.quantidadeCaes}.
📱 ${input.telefone}
📧 ${input.email || "sem email"}\n\n${input.mensagem || ""}`,
          });
        } catch (e) {
          console.warn("Falha ao notificar dono:", e);
        }
        return { success: true, valorEstimado };
      }),
    // Lista solicitações para o admin
    listar: adminAuthProcedure
      .input(z.object({ limit: z.number().optional().default(50), offset: z.number().optional().default(0) }))
      .query(async ({ input }) => listarAlugueisObra(input.limit, input.offset)),
    // Atualiza status
    atualizarStatus: adminAuthProcedure
      .input(z.object({ id: z.number(), status: z.enum(["novo", "em_contato", "fechado", "cancelado"]) }))
      .mutation(async ({ input }) => {
        await atualizarStatusAluguelObra(input.id, input.status);
        return { success: true };
      }),
  }),

  // ============ ALUGUEL DE CÃES PARA FESTAS ============
  aluguelFesta: router({
    criar: publicProcedure
      .input(
        z.object({
          nome: z.string().min(2, "Nome obrigatório"),
          telefone: z.string().min(8, "Telefone inválido"),
          email: z.string().email().optional().or(z.literal("")),
          data: z.string().min(4, "Informe uma data"),
          horas: z.number().min(1, "Informe a quantidade de horas"),
          quantidadeCaes: z.number().min(1, "Informe quantos cães"),
          mensagem: z.string().optional(),
          origem: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const toFloat = (str: string | null | undefined, def: number) => {
          const n = parseFloat(String(str));
          return isNaN(n) ? def : n;
        };
        const precoHora = toFloat(await getSetting("festa_preco_hora"), 60);
        let total = precoHora * input.horas * input.quantidadeCaes;
        const valorEstimado = Math.round(total * 100);
        await criarAluguelFesta({
          nome: input.nome,
          telefone: input.telefone,
          email: input.email || null,
          data: input.data,
          horas: input.horas,
          quantidadeCaes: input.quantidadeCaes,
          valorEstimado,
          status: "novo",
          mensagem: input.mensagem || null,
          origem: input.origem || null,
        });
        try {
          await notifyOwner({
            title: `🎉 Novo aluguel para festa (${input.quantidadeCaes} cão/ães)`,
            content: `**${input.nome}** solicitou ${input.horas}h de aluguel para festa no dia ${input.data}.\nQuantidade: ${input.quantidadeCaes}.\n📱 ${input.telefone}\n📧 ${input.email || "sem email"}\n\n${input.mensagem || ""}`,
          });
        } catch (e) {
          console.warn("Falha ao notificar dono:", e);
        }
        return { success: true, valorEstimado };
      }),
    listar: adminAuthProcedure
      .input(z.object({ limit: z.number().optional().default(50), offset: z.number().optional().default(0) }))
      .query(async ({ input }) => listarAlugueisFesta(input.limit, input.offset)),
    atualizarStatus: adminAuthProcedure
      .input(z.object({ id: z.number(), status: z.enum(["novo", "em_contato", "fechado", "cancelado"]) }))
      .mutation(async ({ input }) => {
        await atualizarStatusAluguelFesta(input.id, input.status);
        return { success: true };
      }),
  }),

  // ============ LISTA DE INTERESSE EM CURSO ============
  curso: router({
    inscrever: publicProcedure
      .input(
        z.object({
          nome: z.string().min(2, "Nome obrigatório"),
          whatsapp: z.string().min(8, "WhatsApp obrigatório"),
          cidade: z.string().optional().or(z.literal("")),
          nivelInteresse: z.string().optional().or(z.literal("")),
        })
      )
      .mutation(async ({ input }) => {
        await criarCursoInteresse({
          nome: input.nome,
          whatsapp: input.whatsapp,
          cidade: input.cidade || null,
          nivelInteresse: input.nivelInteresse || null,
        });
        try {
          await notifyOwner({
            title: `📚 Nova inscrição no curso de adestramento`,
            content: `**${input.nome}** deseja participar do curso de adestramento.\n📱 WhatsApp: ${input.whatsapp}\n📍 Cidade: ${input.cidade || "não informado"}\nNível de interesse: ${input.nivelInteresse || "não informado"}`,
          });
        } catch (e) {
          console.warn("Falha ao notificar dono:", e);
        }
        return { success: true };
      }),
    listar: adminAuthProcedure
      .input(z.object({ limit: z.number().optional().default(100), offset: z.number().optional().default(0) }))
      .query(async ({ input, ctx }) => {
        const adminUser = (ctx as any).adminUser;
        if (adminUser.cargo !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN", message: "Apenas o administrador pode ver a lista de interessados." });
        }
        return listarCursosInteresse(input.limit, input.offset);
      }),
  }),

  // ============ LISTA DE ESPERA / PROMOÇÕES (PÚBLICO) ============
  listaEspera: router({
    inscrever: publicProcedure
      .input(
        z.object({
          nome: z.string().min(2, "Nome é obrigatório"),
          email: z.string().email("Email inválido").optional().or(z.literal("")),
          whatsapp: z.string().min(8, "WhatsApp inválido").optional().or(z.literal("")),
          interesse: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        if (!input.email && !input.whatsapp) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Informe pelo menos um email ou WhatsApp para receber as promoções.",
          });
        }

        await inscreverListaEspera({
          nome: input.nome,
          email: input.email || null,
          whatsapp: input.whatsapp || null,
          interesse: input.interesse || "geral",
        });

        try {
          await notifyOwner({
            title: "📬 Novo inscrito na lista de promoções!",
            content: `**${input.nome}** se inscreveu para receber promoções.\n📧 ${input.email || "sem email"} | 📱 ${input.whatsapp || "sem WhatsApp"}\nInteresse: ${input.interesse || "geral"}`,
          });
        } catch (e) {
          console.warn("Falha ao notificar dono:", e);
        }

        return { success: true };
      }),
  }),

  // ============ ANALYTICS (PÚBLICO) ============
  analytics: router({
    registrarPageView: publicProcedure
      .input(
        z.object({
          pagina: z.string(),
          subPagina: z.string().optional(),
          sessionId: z.string().optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        const userAgent = (ctx.req as any)?.headers?.["user-agent"] || null;
        await registrarPageView({
          pagina: input.pagina,
          subPagina: input.subPagina || null,
          sessionId: input.sessionId || null,
          userAgent,
        });
        return { success: true };
      }),

    registrarEvento: publicProcedure
      .input(
        z.object({
          tipo: z.string(),
          pagina: z.string().optional(),
          dados: z.string().optional(),
          sessionId: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        await registrarEvento({
          tipo: input.tipo,
          pagina: input.pagina || null,
          dados: input.dados || null,
          sessionId: input.sessionId || null,
        });
        return { success: true };
      }),
  }),

  // ============ ADMIN (PAINEL - USA SESSÃO PRÓPRIA) ============
  admin: router({
    stats: adminAuthProcedure.query(async ({ ctx }) => {
      const adminUser = (ctx as any).adminUser;
      if (adminUser.cargo !== "admin" && adminUser.cargo !== "adestrador") {
        throw new TRPCError({ code: "FORBIDDEN" });
      }
      const [totalViews, pageStats, eventStats, orcamentosStatus, viewsPorDia] = await Promise.all([
        obterTotalPageViews(30),
        obterEstatisticasPageViews(30),
        obterEstatisticasEventos(30),
        contarOrcamentosPorStatus(),
        obterPageViewsPorDia(30),
      ]);
      return { totalViews, pageStats, eventStats, orcamentosStatus, viewsPorDia };
    }),

    listarOrcamentos: adminAuthProcedure
      .input(z.object({ limit: z.number().optional().default(50), offset: z.number().optional().default(0) }))
      .query(async ({ input }) => listarOrcamentos(input.limit, input.offset)),

    atualizarStatusOrcamento: adminAuthProcedure
      .input(z.object({ id: z.number(), status: z.enum(["novo", "em_contato", "fechado", "cancelado"]) }))
      .mutation(async ({ input }) => {
        await atualizarStatusOrcamento(input.id, input.status);
        return { success: true };
      }),

    listarListaEspera: adminAuthProcedure
      .input(z.object({ limit: z.number().optional().default(100), offset: z.number().optional().default(0) }))
      .query(async ({ input, ctx }) => {
        const adminUser = (ctx as any).adminUser;
        if (adminUser.cargo !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN", message: "Apenas o administrador pode ver a lista de espera." });
        }
        return listarListaEspera(input.limit, input.offset);
      }),

    // Manter compatibilidade com OAuth (legado)
    listarUsuarios: superAdminProcedure.query(async () => listarUsuarios()),
    atualizarRoleUsuario: superAdminProcedure
      .input(z.object({ id: z.number(), role: z.enum(["user", "admin", "staff"]) }))
      .mutation(async ({ input }) => {
        await atualizarRoleUsuario(input.id, input.role);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
