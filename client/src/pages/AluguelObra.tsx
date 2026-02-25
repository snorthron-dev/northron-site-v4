import { useState, useEffect } from "react";
import { Link } from "wouter";
import AnimatedSection from "@/components/AnimatedSection";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function AluguelObra() {
  const registrar = trpc.analytics.registrarPageView.useMutation();
  useEffect(() => {
    registrar.mutate({ pagina: "aluguel-obra" });
  }, []);

  const [enviado, setEnviado] = useState(false);
  const [valor, setValor] = useState<string | null>(null);
  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    email: "",
    quantidadeCaes: 1,
    duracaoMeses: 3,
    mensagem: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const criar = trpc.aluguelObra.criar.useMutation({
    onSuccess: (data) => {
      const val = data?.valorEstimado ?? 0;
      const formatted = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val / 100);
      setValor(formatted);
      setEnviado(true);
      toast.success("Solicitação enviada com sucesso!");
    },
    onError: (err) => toast.error(err.message),
  });

  const validar = () => {
    const errs: Record<string, string> = {};
    if (!form.nome.trim()) errs.nome = "Nome é obrigatório";
    if (!form.telefone.trim() || form.telefone.replace(/\D/g, "").length < 10) errs.telefone = "WhatsApp inválido";
    if (form.email && !form.email.includes("@")) errs.email = "Email inválido";
    if (form.quantidadeCaes < 1) errs.quantidadeCaes = "Informe ao menos 1 cão";
    if (![3, 6, 12].includes(form.duracaoMeses)) errs.duracaoMeses = "Duração inválida";
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
    criar.mutate({
      nome: form.nome,
      telefone: form.telefone,
      email: form.email || undefined,
      quantidadeCaes: form.quantidadeCaes,
      duracaoMeses: form.duracaoMeses as 3 | 6 | 12,
      mensagem: form.mensagem || undefined,
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
              <h2 style={{ fontSize: "2rem", fontWeight: 700, color: "hsl(45 20% 92%)", marginBottom: "1rem" }}>Solicitação recebida!</h2>
              <p style={{ color: "hsl(0 0% 60%)", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                Nossa equipe entrará em contato para alinhar logística e contrato.
              </p>
              {valor && (
                <p style={{ color: "hsl(43 89% 52%)", fontSize: "1rem", fontWeight: 600, marginBottom: "2rem" }}>
                  Valor estimado: {valor}
                </p>
              )}
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/" className="btn-outline-gold" style={{ fontSize: "0.8rem" }}>Voltar ao início</Link>
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
            <div className="section-subtitle">Serviços Corporativos</div>
            <h1 className="section-title" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>Aluguel de Cães para Obras</h1>
            <div className="divider-gold" />
            <p style={{ color: "hsl(0 0% 60%)", fontSize: "1rem", lineHeight: 1.8, marginTop: "1.5rem", maxWidth: "600px" }}>
              Oferecemos cães treinados para segurança em canteiros de obras. Escolha a quantidade e a duração desejada; apresentaremos uma estimativa e, em seguida, nossa equipe entrará em contato para detalhar o contrato.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="page-section">
        <div className="container" style={{ maxWidth: "800px", margin: "0 auto" }}>
          <AnimatedSection animation="fadeInUp">
            <form onSubmit={handleSubmit}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "1.25rem" }}>
                <div>
                  <label style={labelStyle}>Nome *</label>
                  <input
                    type="text"
                    placeholder="Seu nome"
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
                  <label style={labelStyle}>Quantidade de cães *</label>
                  <input
                    type="number"
                    min={1}
                    value={form.quantidadeCaes}
                    onChange={(e) => setForm({ ...form, quantidadeCaes: parseInt(e.target.value) || 1 })}
                    style={{ ...inputStyle, borderColor: errors.quantidadeCaes ? "hsl(0 70% 60%)" : "hsl(0 0% 15%)" }}
                  />
                  {errors.quantidadeCaes && <div style={errorStyle}>{errors.quantidadeCaes}</div>}
                </div>
              </div>
              <div style={{ marginBottom: "1.25rem" }}>
                <label style={labelStyle}>Duração (meses) *</label>
                <select
                  value={form.duracaoMeses}
                  onChange={(e) => setForm({ ...form, duracaoMeses: parseInt(e.target.value) as any })}
                  style={{ ...inputStyle, cursor: "pointer", borderColor: errors.duracaoMeses ? "hsl(0 70% 60%)" : "hsl(0 0% 15%)" }}
                >
                  <option value={3}>3 meses</option>
                  <option value={6}>6 meses (5% de desconto)</option>
                  <option value={12}>12 meses (10% de desconto)</option>
                </select>
                {errors.duracaoMeses && <div style={errorStyle}>{errors.duracaoMeses}</div>}
              </div>
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={labelStyle}>Informações adicionais</label>
                <textarea
                  placeholder="Especifique local, necessidades ou dúvidas para otimizarmos o atendimento."
                  value={form.mensagem}
                  onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
                  rows={5}
                  style={{ ...inputStyle, resize: "vertical", minHeight: "120px" }}
                />
              </div>
              <button
                type="submit"
                disabled={criar.isPending}
                className="btn-gold"
                style={{ fontSize: "0.85rem", opacity: criar.isPending ? 0.7 : 1, cursor: criar.isPending ? "not-allowed" : "pointer" }}
              >
                {criar.isPending ? "Enviando..." : "Enviar Solicitação"}
              </button>
            </form>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}