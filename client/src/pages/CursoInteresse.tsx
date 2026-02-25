import { useState, useEffect } from "react";
import { Link } from "wouter";
import AnimatedSection from "@/components/AnimatedSection";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function CursoInteresse() {
  const registrar = trpc.analytics.registrarPageView.useMutation();
  useEffect(() => {
    registrar.mutate({ pagina: "curso-interesse" });
  }, []);

  const [enviado, setEnviado] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    whatsapp: "",
    cidade: "",
    nivelInteresse: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const inscrever = trpc.curso.inscrever.useMutation({
    onSuccess: () => {
      setEnviado(true);
      toast.success("Inscrição registrada com sucesso!");
    },
    onError: (err) => toast.error(err.message),
  });

  const validar = () => {
    const errs: Record<string, string> = {};
    if (!form.nome.trim()) errs.nome = "Nome é obrigatório";
    if (!form.whatsapp.trim() || form.whatsapp.replace(/\D/g, "").length < 8) errs.whatsapp = "WhatsApp inválido";
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
    inscrever.mutate({
      nome: form.nome,
      whatsapp: form.whatsapp,
      cidade: form.cidade || undefined,
      nivelInteresse: form.nivelInteresse || undefined,
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
              <h2 style={{ fontSize: "2rem", fontWeight: 700, color: "hsl(45 20% 92%)", marginBottom: "1rem" }}>Obrigado pelo interesse!</h2>
              <p style={{ color: "hsl(0 0% 60%)", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: "2rem" }}>
                Você foi adicionado à lista de interesse para o curso de adestramento. Entraremos em contato assim que novas turmas forem abertas.
              </p>
              <Link href="/" className="btn-outline-gold" style={{ fontSize: "0.8rem" }}>Voltar ao início</Link>
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
            <div className="section-subtitle">Formação</div>
            <h1 className="section-title" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>Lista de Interesse — Curso de Adestramento</h1>
            <div className="divider-gold" />
            <p style={{ color: "hsl(0 0% 60%)", fontSize: "1rem", lineHeight: 1.8, marginTop: "1.5rem", maxWidth: "600px" }}>
              Estamos preparando um curso completo para tutores e profissionais que desejam aprender técnicas de adestramento canino. Inscreva-se na lista de interesse para ser avisado quando abrirmos as inscrições.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="page-section">
        <div className="container" style={{ maxWidth: "700px", margin: "0 auto" }}>
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
                    value={form.whatsapp}
                    onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                    style={{ ...inputStyle, borderColor: errors.whatsapp ? "hsl(0 70% 60%)" : "hsl(0 0% 15%)" }}
                  />
                  {errors.whatsapp && <div style={errorStyle}>{errors.whatsapp}</div>}
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "1.25rem" }}>
                <div>
                  <label style={labelStyle}>Cidade</label>
                  <input
                    type="text"
                    placeholder="Ex: Natal/RN"
                    value={form.cidade}
                    onChange={(e) => setForm({ ...form, cidade: e.target.value })}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Nível de interesse</label>
                  <select
                    value={form.nivelInteresse}
                    onChange={(e) => setForm({ ...form, nivelInteresse: e.target.value })}
                    style={{ ...inputStyle, cursor: "pointer" }}
                  >
                    <option value="">Selecione...</option>
                    <option value="iniciante">Iniciante</option>
                    <option value="intermediario">Intermediário</option>
                    <option value="avancado">Avançado</option>
                    <option value="profissional">Profissional / Instrutor</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                disabled={inscrever.isPending}
                className="btn-gold"
                style={{ fontSize: "0.85rem", opacity: inscrever.isPending ? 0.7 : 1, cursor: inscrever.isPending ? "not-allowed" : "pointer" }}
              >
                {inscrever.isPending ? "Enviando..." : "Registrar Interesse"}
              </button>
            </form>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}