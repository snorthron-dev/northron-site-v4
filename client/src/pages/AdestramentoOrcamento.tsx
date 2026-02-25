import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Link } from "wouter";
import AnimatedSection from "@/components/AnimatedSection";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

// Reutilizamos a definição dos níveis de treinamento a partir da página
// original de Treinamentos. Não expomos preços diretamente ao cliente;
// os valores abaixo são utilizados apenas para calcular uma estimativa
// interna que é exibida após o envio do formulário. Caso o administrador
// atualize os valores no backend, estes valores podem ser ajustados aqui
// manualmente ou via chamada a uma rota pública de configurações.
const niveis = [
  {
    id: "basico",
    label: "Básico",
    duracao: "3 meses",
    descricao: "O ponto de partida para qualquer cão. Estabelece as fundações do comportamento: atenção, obediência simples e convivência harmoniosa com a família.",
    conteudo: [
      "Sentar, deitar, ficar e vir quando chamado",
      "Caminhar na guia sem puxar",
      "Controle de impulsos básico",
      "Socialização com pessoas e ambientes",
      "Orientações ao tutor para reforço em casa",
      "Avaliação comportamental inicial",
    ],
    obs: "Duração mínima de 3 meses. O ritmo de evolução varia conforme o animal e a consistência do tutor em casa.",
  },
  {
    id: "intermediario",
    label: "Intermediário",
    duracao: "6 meses",
    descricao: "Para cães que já dominam o básico e estão prontos para comandos mais complexos, maior distância e situações com mais distrações.",
    conteudo: [
      "Comandos à distância e fora da guia",
      "Controle em ambientes com distrações",
      "Exercícios de obediência avançada",
      "Correção de comportamentos indesejados",
      "Trabalho de foco e concentração",
      "Sessões de revisão e consolidação",
    ],
    obs: "Requer que o cão demonstre domínio do nível básico. Avaliamos isso na primeira sessão.",
  },
  {
    id: "avancado",
    label: "Avançado",
    duracao: "12 meses",
    descricao: "Treinamento completo para cães com objetivos específicos: máxima obediência, trabalho ou simplesmente alcançar todo o potencial do animal.",
    conteudo: [
      "Obediência de alto nível em qualquer ambiente",
      "Trabalho de foco e precisão",
      "Exercícios de performance e controle",
      "Treinamento para situações específicas do tutor",
      "Correção de comportamentos complexos",
      "Acompanhamento mensal pós-treinamento",
    ],
    obs: "Indicado para cães que já passaram pelos níveis básico e intermediário, ou que demonstram alto potencial na avaliação inicial.",
  },
];

// Base de cálculo para estimativa interna. O cliente não vê estes valores
// antes de enviar o formulário; apenas a estimativa gerada depois.
const BASE_MENSAL = 700;
const DESCONTO_INTERMEDIARIO = 0.05;
const DESCONTO_AVANCADO = 0.10;

export default function AdestramentoOrcamento() {
  // Obter o parâmetro do plano a partir da URL. Wouter não fornece um
  // hook dedicado para query params, então usamos window.location diretamente.
  const [location] = useLocation();
  const parts = location.split("/");
  const planoId = parts[2] || "basico";
  const nivel = niveis.find((n) => n.id === planoId) || niveis[0];

  // Estado do formulário
  const [enviado, setEnviado] = useState(false);
  const [estimativa, setEstimativa] = useState<string | null>(null);
  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    email: "",
    raca: "",
    idadeCao: "",
    mensagem: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const criarOrcamento = trpc.orcamento.criar.useMutation({
    onSuccess: () => {
      // Calcular estimativa interna
      let valorMensal = BASE_MENSAL;
      if (nivel.id === "intermediario") valorMensal = BASE_MENSAL * (1 - DESCONTO_INTERMEDIARIO);
      if (nivel.id === "avancado") valorMensal = BASE_MENSAL * (1 - DESCONTO_AVANCADO);
      // Arredondar para 2 casas decimais
      valorMensal = Math.round(valorMensal * 100) / 100;
      const formatted = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valorMensal);
      setEstimativa(formatted + "/mês");
      setEnviado(true);
      toast.success("Solicitação enviada com sucesso!");
    },
    onError: (err) => {
      toast.error("Erro ao enviar: " + err.message);
    },
  });

  const registrar = trpc.analytics.registrarPageView.useMutation();
  useEffect(() => {
    registrar.mutate({ pagina: "adestramento-" + nivel.id });
  }, [nivel.id]);

  const validar = () => {
    const errs: Record<string, string> = {};
    if (!form.nome.trim()) errs.nome = "Nome é obrigatório";
    if (!form.telefone.trim() || form.telefone.replace(/\D/g, "").length < 10) errs.telefone = "WhatsApp inválido";
    if (form.email && !form.email.includes("@")) errs.email = "Email inválido";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validar();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    criarOrcamento.mutate({
      nome: form.nome,
      telefone: form.telefone,
      email: form.email || undefined,
      servico: `Adestramento ${nivel.label}`,
      raca: form.raca || undefined,
      mensagem: form.mensagem || "", // mensagem opcional
      origem: "site",
    });
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.875rem 1rem",
    background: "hsl(0 0% 8%)",
    border: "1px solid hsl(0 0% 15%)",
    borderRadius: "4px",
    color: "hsl(45 20% 90%)",
    fontSize: "0.875rem",
    outline: "none",
    transition: "border-color 0.3s ease",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: "0.7rem",
    fontWeight: 700,
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    color: "hsl(0 0% 55%)",
    marginBottom: "0.5rem",
    display: "block",
  };

  const errorStyle: React.CSSProperties = {
    color: "hsl(0 70% 60%)",
    fontSize: "0.75rem",
    marginTop: "0.375rem",
  };

  if (enviado) {
    return (
      <div className="page-transition" style={{ paddingTop: "72px", minHeight: "80vh", display: "flex", alignItems: "center" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <AnimatedSection animation="fadeInUp">
            <div style={{ maxWidth: "600px", margin: "0 auto" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1.5rem" }}>✅</div>
              <h2 style={{ fontSize: "2rem", fontWeight: 700, color: "hsl(45 20% 92%)", marginBottom: "1rem" }}>
                Solicitação recebida!
              </h2>
              <p style={{ color: "hsl(0 0% 60%)", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                Um de nossos adestradores entrará em contato para avaliar seu cão e confirmar a estimativa do plano ideal.
              </p>
              {estimativa && (
                <p style={{ color: "hsl(43 89% 52%)", fontSize: "1rem", fontWeight: 600, marginBottom: "2rem" }}>
                  Estimativa mensal: {estimativa}
                </p>
              )}
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                <a
                  href={
                    `https://wa.me/55${form.telefone.replace(/\D/g, "")}?text=${encodeURIComponent(
                      `Olá! Enviei uma solicitação de adestramento (${nivel.label}) pelo site. Meu nome é ${form.nome}.`
                    )}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold"
                  style={{ fontSize: "0.8rem" }}
                >
                  Falar no WhatsApp
                </a>
                <Link href="/" className="btn-outline-gold" style={{ fontSize: "0.8rem" }}>
                  Voltar ao início
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    );
  }

  return (
    <div className="page-transition" style={{ paddingTop: "72px" }}>
      <section style={{ padding: "5rem 0 4rem", background: "hsl(0 0% 4%)", borderBottom: "1px solid hsl(0 0% 10%)" }}>
        <div className="container">
          <AnimatedSection animation="fadeInUp">
            <div className="section-subtitle">Treinamento</div>
            <h1 className="section-title" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
              Adestramento {nivel.label}
            </h1>
            <div className="divider-gold" />
            <p style={{ color: "hsl(0 0% 60%)", fontSize: "1rem", lineHeight: 1.8, marginTop: "1.5rem", maxWidth: "600px" }}>
              {nivel.descricao}
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="page-section">
        <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "4rem", alignItems: "start" }}>
          {/* Informações do plano */}
          <AnimatedSection animation="slideInLeft">
            <div>
              <div className="tag-gold" style={{ marginBottom: "1.5rem" }}>{nivel.duracao}</div>
              <h2 style={{ fontSize: "2rem", fontWeight: 700, color: "hsl(45 20% 92%)", marginBottom: "1rem" }}>
                Nível {nivel.label}
              </h2>
              <p style={{ color: "hsl(0 0% 60%)", fontSize: "0.95rem", lineHeight: 1.9, marginBottom: "2rem" }}>{nivel.descricao}</p>
              <h4 style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "hsl(43 89% 52%)", marginBottom: "1rem" }}>
                O que está incluso
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem", marginBottom: "2rem" }}>
                {nivel.conteudo.map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                    <div style={{ width: "16px", height: "16px", borderRadius: "50%", background: "hsl(43 89% 52% / 0.15)", border: "1px solid hsl(43 89% 52% / 0.4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "hsl(43 89% 52%)" }} />
                    </div>
                    <span style={{ color: "hsl(0 0% 70%)", fontSize: "0.875rem", lineHeight: 1.6 }}>{item}</span>
                  </div>
                ))}
              </div>
              <div style={{ padding: "1rem 1.25rem", background: "hsl(43 89% 52% / 0.05)", border: "1px solid hsl(43 89% 52% / 0.2)", borderRadius: "4px", marginBottom: "2rem" }}>
                <p style={{ color: "hsl(0 0% 55%)", fontSize: "0.8rem", lineHeight: 1.7 }}>
                  <strong style={{ color: "hsl(43 89% 52%)" }}>Observação:</strong> {nivel.obs}
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Formulário de solicitação */}
          <AnimatedSection animation="slideInRight">
            <form onSubmit={handleSubmit}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "1.25rem" }}>
                <div>
                  <label style={labelStyle}>Seu nome *</label>
                  <input
                    type="text"
                    placeholder="Como podemos te chamar?"
                    value={form.nome}
                    onChange={(e) => setForm({ ...form, nome: e.target.value })}
                    style={{ ...inputStyle, borderColor: errors.nome ? "hsl(0 70% 60%)" : "hsl(0 0% 15%)" }}
                  />
                  {errors.nome && <div style={errorStyle}>{errors.nome}</div>}
                </div>
                <div>
                  <label style={labelStyle}>WhatsApp *</label>
                  <input
                    type="tel"
                    placeholder="(84) 9 0000-0000"
                    value={form.telefone}
                    onChange={(e) => setForm({ ...form, telefone: e.target.value })}
                    style={{ ...inputStyle, borderColor: errors.telefone ? "hsl(0 70% 60%)" : "hsl(0 0% 15%)" }}
                  />
                  {errors.telefone && <div style={errorStyle}>{errors.telefone}</div>}
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "1.25rem" }}>
                <div>
                  <label style={labelStyle}>Email</label>
                  <input
                    type="email"
                    placeholder="seu@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    style={{ ...inputStyle, borderColor: errors.email ? "hsl(0 70% 60%)" : "hsl(0 0% 15%)" }}
                  />
                  {errors.email && <div style={errorStyle}>{errors.email}</div>}
                </div>
                <div>
                  <label style={labelStyle}>Raça do cão</label>
                  <input
                    type="text"
                    placeholder="Ex: Labrador, SRD..."
                    value={form.raca}
                    onChange={(e) => setForm({ ...form, raca: e.target.value })}
                    style={inputStyle}
                  />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "1.25rem" }}>
                <div>
                  <label style={labelStyle}>Idade do cão</label>
                  <input
                    type="text"
                    placeholder="Ex: 6 meses, 2 anos..."
                    value={form.idadeCao}
                    onChange={(e) => setForm({ ...form, idadeCao: e.target.value })}
                    style={inputStyle}
                  />
                </div>
                <div />
              </div>
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={labelStyle}>Conte sobre seu cão (opcional)</label>
                <textarea
                  placeholder="Compartilhe seus objetivos, desafios ou quaisquer detalhes que ajudem nossa equipe a entender melhor a situação."
                  value={form.mensagem}
                  onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
                  rows={6}
                  style={{
                    ...inputStyle,
                    resize: "vertical",
                    minHeight: "140px",
                    borderColor: errors.mensagem ? "hsl(0 70% 60%)" : "hsl(0 0% 15%)",
                  }}
                />
              </div>
              <button
                type="submit"
                disabled={criarOrcamento.isPending}
                className="btn-gold"
                style={{ fontSize: "0.85rem", opacity: criarOrcamento.isPending ? 0.7 : 1, cursor: criarOrcamento.isPending ? "not-allowed" : "pointer" }}
              >
                {criarOrcamento.isPending ? "Enviando..." : "Enviar Solicitação"}
              </button>
            </form>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}