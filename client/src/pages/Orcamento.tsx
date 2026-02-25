import { useState, useEffect } from "react";
import { Link } from "wouter";
import AnimatedSection from "@/components/AnimatedSection";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const servicosOpcoes = [
  "Adestramento Básico",
  "Adestramento Intermediário",
  "Adestramento Avançado",
  "Guarda Patrimonial",
  "Proteção Pessoal",
  "Consultoria Presencial",
  "Consultoria Online",
  "Aula Online",
  "Ainda não sei — quero uma avaliação",
];

export default function Orcamento() {
  const registrar = trpc.analytics.registrarPageView.useMutation();
  useEffect(() => { registrar.mutate({ pagina: "orcamento" }); }, []);

  const [enviado, setEnviado] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    servico: "",
    raca: "",
    idadeCao: "",
    mensagem: "",
    receberOfertas: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const criarOrcamento = trpc.orcamento.criar.useMutation({
    onSuccess: () => {
      setEnviado(true);
      toast.success("Solicitação enviada com sucesso!");
    },
    onError: (err) => {
      toast.error("Erro ao enviar: " + err.message);
    },
  });

  const validar = () => {
    const errs: Record<string, string> = {};
    if (!form.nome.trim()) errs.nome = "Nome é obrigatório";
    if (!form.email.trim() || !form.email.includes("@")) errs.email = "Email inválido";
    if (!form.telefone.trim() || form.telefone.replace(/\D/g, "").length < 10) errs.telefone = "WhatsApp inválido";
    if (!form.mensagem.trim() || form.mensagem.trim().length < 20) errs.mensagem = "Descreva o problema com pelo menos 20 caracteres";
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
      email: form.email,
      telefone: form.telefone,
      servico: form.servico || "Ainda não sei — quero uma avaliação",
      raca: form.raca || undefined,
      mensagem: form.mensagem,
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
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.875rem",
    outline: "none",
    transition: "border-color 0.3s ease",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "'Montserrat', sans-serif",
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
            <div style={{ maxWidth: "500px", margin: "0 auto" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1.5rem" }}>✅</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, color: "hsl(45 20% 92%)", marginBottom: "1rem" }}>
                Solicitação recebida!
              </h2>
              <p style={{ color: "hsl(0 0% 60%)", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: "2rem" }}>
                Recebemos sua solicitação de avaliação. Entraremos em contato pelo WhatsApp em até 24 horas para agendar.
              </p>
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                <a
                    href={`https://wa.me/5584921440536?text=${encodeURIComponent('Olá! Acabei de enviar uma solicitação de avaliação pelo site. Meu nome é ' + form.nome + '.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold"
                  style={{ fontSize: "0.8rem" }}
                >
                  Falar no WhatsApp agora
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
            <div className="section-subtitle">Avaliação gratuita</div>
            <h1 className="section-title" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>Solicitar Avaliação</h1>
            <div className="divider-gold" />
            <p style={{ color: "hsl(0 0% 60%)", fontSize: "1rem", lineHeight: 1.8, marginTop: "1.5rem", maxWidth: "600px" }}>
              Preencha o formulário abaixo. Quanto mais detalhes você der sobre o seu cão e a situação, melhor poderemos te ajudar. A avaliação inicial é gratuita e sem compromisso.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "4rem", alignItems: "start" }}>
            {/* Formulário */}
            <AnimatedSection animation="slideInLeft">
              <form onSubmit={handleSubmit}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "1.25rem" }}>
                  <div>
                    <label style={labelStyle}>Seu nome *</label>
                    <input
                      type="text"
                      placeholder="Como posso te chamar?"
                      value={form.nome}
                      onChange={(e) => setForm({ ...form, nome: e.target.value })}
                      style={{ ...inputStyle, borderColor: errors.nome ? "hsl(0 70% 60%)" : "hsl(0 0% 15%)" }}
                    />
                    {errors.nome && <div style={errorStyle}>{errors.nome}</div>}
                  </div>
                  <div>
                    <label style={labelStyle}>Email *</label>
                    <input
                      type="email"
                      placeholder="seu@email.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      style={{ ...inputStyle, borderColor: errors.email ? "hsl(0 70% 60%)" : "hsl(0 0% 15%)" }}
                    />
                    {errors.email && <div style={errorStyle}>{errors.email}</div>}
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "1.25rem" }}>
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
                  <div>
                    <label style={labelStyle}>Serviço de interesse</label>
                    <select
                      value={form.servico}
                      onChange={(e) => setForm({ ...form, servico: e.target.value })}
                      style={{ ...inputStyle, cursor: "pointer" }}
                    >
                      <option value="">Selecione (opcional)</option>
                      {servicosOpcoes.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "1.25rem" }}>
                  <div>
                    <label style={labelStyle}>Raça do cão</label>
                    <input
                      type="text"
                      placeholder="Ex: Labrador, SRD, Pastor Alemão..."
                      value={form.raca}
                      onChange={(e) => setForm({ ...form, raca: e.target.value })}
                      style={inputStyle}
                    />
                  </div>
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
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={labelStyle}>
                    Descreva o problema ou o que você precisa *
                  </label>
                  <textarea
                    placeholder="Conte com detalhes: qual o comportamento do seu cão? Há quanto tempo acontece? O que já foi tentado? Quanto mais você contar, melhor poderemos te ajudar."
                    value={form.mensagem}
                    onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
                    rows={6}
                    style={{
                      ...inputStyle,
                      resize: "vertical",
                      minHeight: "140px",
                      borderColor: errors.mensagem ? "hsl(0 70% 60%)" : "hsl(0 0% 15%)"
                    }}
                  />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    {errors.mensagem ? <div style={errorStyle}>{errors.mensagem}</div> : <div />}
                    <div style={{ color: "hsl(0 0% 40%)", fontSize: "0.75rem", marginTop: "0.375rem" }}>
                      {form.mensagem.length} caracteres
                    </div>
                  </div>
                </div>

                {/* Checkbox de ofertas */}
                <div style={{ marginBottom: "2rem" }}>
                  <label style={{ display: "flex", alignItems: "flex-start", gap: "0.875rem", cursor: "pointer" }}>
                    <div
                      onClick={() => setForm({ ...form, receberOfertas: !form.receberOfertas })}
                      style={{
                        width: "20px",
                        height: "20px",
                        border: `2px solid ${form.receberOfertas ? "hsl(43 89% 52%)" : "hsl(0 0% 25%)"}`,
                        borderRadius: "3px",
                        background: form.receberOfertas ? "hsl(43 89% 52% / 0.15)" : "transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        marginTop: "2px",
                        transition: "all 0.2s ease",
                        cursor: "pointer",
                      }}
                    >
                      {form.receberOfertas && (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6L5 9L10 3" stroke="hsl(43 89% 52%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.875rem", fontWeight: 500, color: "hsl(45 20% 85%)", marginBottom: "0.25rem" }}>
                        Quero receber promoções e novidades
                      </div>
                      <div style={{ color: "hsl(0 0% 50%)", fontSize: "0.775rem", lineHeight: 1.6 }}>
                        Quando tivermos promoções, datas especiais ou novos serviços, você será avisado por email. Sem spam — prometemos.
                      </div>
                    </div>
                  </label>
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

            {/* Sidebar informativa */}
            <AnimatedSection animation="slideInRight">
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div className="card-premium" style={{ padding: "1.75rem" }}>
                  <div style={{ width: "40px", height: "2px", background: "hsl(43 89% 52%)", marginBottom: "1rem" }} />
                  <h4 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "hsl(43 89% 52%)", marginBottom: "0.75rem" }}>
                    O que acontece depois?
                  </h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                    {[
                      { num: "1", texto: "Recebemos sua solicitação e analisamos as informações" },
                      { num: "2", texto: "Entramos em contato pelo WhatsApp em até 24 horas" },
                      { num: "3", texto: "Agendamos a avaliação gratuita no melhor horário para você" },
                      { num: "4", texto: "Apresentamos o diagnóstico e o que podemos fazer" },
                    ].map((step) => (
                      <div key={step.num} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                        <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: "hsl(43 89% 52% / 0.15)", border: "1px solid hsl(43 89% 52% / 0.4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <span style={{ color: "hsl(43 89% 52%)", fontSize: "0.65rem", fontWeight: 700 }}>{step.num}</span>
                        </div>
                        <p style={{ color: "hsl(0 0% 60%)", fontSize: "0.825rem", lineHeight: 1.6 }}>{step.texto}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card-premium" style={{ padding: "1.75rem" }}>
                  <h4 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "hsl(43 89% 52%)", marginBottom: "1rem" }}>
                    Prefere falar direto?
                  </h4>
                  <a
                    href="https://wa.me/5584921440536?text=Olá! Quero solicitar uma avaliação gratuita para meu cão."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline-gold"
                    style={{ fontSize: "0.8rem", justifyContent: "center", width: "100%" }}
                  >
                    Falar no WhatsApp
                  </a>
                  <div style={{ marginTop: "1rem", textAlign: "center" }}>
                    <a href="mailto:snorthron@gmail.com" style={{ color: "hsl(0 0% 50%)", fontSize: "0.8rem", textDecoration: "none" }}>
                      snorthron@gmail.com
                    </a>
                  </div>
                </div>

                <div style={{ padding: "1.25rem", background: "hsl(43 89% 52% / 0.05)", border: "1px solid hsl(43 89% 52% / 0.2)", borderRadius: "4px" }}>
                  <p style={{ color: "hsl(0 0% 55%)", fontSize: "0.8rem", lineHeight: 1.7 }}>
                    🔒 <strong style={{ color: "hsl(0 0% 70%)" }}>Seus dados são privados.</strong> Usamos apenas para entrar em contato sobre sua solicitação. Não compartilhamos com terceiros.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}
