import { useState, useEffect } from "react";
import { Link } from "wouter";
import AnimatedSection from "@/components/AnimatedSection";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function Promocoes() {
  const registrar = trpc.analytics.registrarPageView.useMutation();
  useEffect(() => { registrar.mutate({ pagina: "promocoes" }); }, []);

  const [enviado, setEnviado] = useState(false);
  const [form, setForm] = useState({ nome: "", email: "", whatsapp: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const inscrever = trpc.listaEspera.inscrever.useMutation({
    onSuccess: () => {
      setEnviado(true);
      toast.success("Inscrição realizada com sucesso!");
    },
    onError: (err) => {
      toast.error("Erro: " + err.message);
    },
  });

  const validar = () => {
    const errs: Record<string, string> = {};
    if (!form.nome.trim()) errs.nome = "Nome é obrigatório";
    if (!form.email.trim() || !form.email.includes("@")) errs.email = "Email inválido";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validar();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    inscrever.mutate({ nome: form.nome, email: form.email, whatsapp: form.whatsapp || undefined });
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

  return (
    <div className="page-transition" style={{ paddingTop: "72px" }}>
      <section style={{ padding: "5rem 0 4rem", background: "hsl(0 0% 4%)", borderBottom: "1px solid hsl(0 0% 10%)" }}>
        <div className="container">
          <AnimatedSection animation="fadeInUp">
            <div className="section-subtitle">Ofertas especiais</div>
            <h1 className="section-title" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>Promoções</h1>
            <div className="divider-gold" />
            <p style={{ color: "hsl(0 0% 60%)", fontSize: "1rem", lineHeight: 1.8, marginTop: "1.5rem", maxWidth: "600px" }}>
              Quando tivermos promoções, descontos ou condições especiais, você será o primeiro a saber. Cadastre seu email e não perca nada.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}>
            {/* Formulário */}
            <AnimatedSection animation="slideInLeft">
              {enviado ? (
                <div style={{ textAlign: "center", padding: "3rem 0" }}>
                  <div style={{ fontSize: "3rem", marginBottom: "1.5rem" }}>🎉</div>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.75rem", fontWeight: 700, color: "hsl(45 20% 92%)", marginBottom: "1rem" }}>
                    Você está na lista!
                  </h2>
                  <p style={{ color: "hsl(0 0% 60%)", fontSize: "0.9rem", lineHeight: 1.8, marginBottom: "2rem" }}>
                    Quando tivermos promoções, você será avisado por email. Prometemos não encher sua caixa de entrada com spam.
                  </p>
                  <Link href="/" className="btn-outline-gold" style={{ fontSize: "0.8rem" }}>
                    Voltar ao início
                  </Link>
                </div>
              ) : (
                <div>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.75rem", fontWeight: 700, color: "hsl(45 20% 92%)", marginBottom: "0.75rem" }}>
                    Receba nossas promoções
                  </h2>
                  <p style={{ color: "hsl(0 0% 60%)", fontSize: "0.9rem", lineHeight: 1.8, marginBottom: "2rem" }}>
                    Cadastre seu email e WhatsApp para receber avisos quando tivermos condições especiais, descontos sazonais ou novos serviços.
                  </p>

                  <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: "1.25rem" }}>
                      <label style={labelStyle}>Seu nome *</label>
                      <input
                        type="text"
                        placeholder="Como posso te chamar?"
                        value={form.nome}
                        onChange={(e) => setForm({ ...form, nome: e.target.value })}
                        style={{ ...inputStyle, borderColor: errors.nome ? "hsl(0 70% 60%)" : "hsl(0 0% 15%)" }}
                      />
                      {errors.nome && <div style={{ color: "hsl(0 70% 60%)", fontSize: "0.75rem", marginTop: "0.375rem" }}>{errors.nome}</div>}
                    </div>

                    <div style={{ marginBottom: "1.25rem" }}>
                      <label style={labelStyle}>Email *</label>
                      <input
                        type="email"
                        placeholder="seu@email.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        style={{ ...inputStyle, borderColor: errors.email ? "hsl(0 70% 60%)" : "hsl(0 0% 15%)" }}
                      />
                      {errors.email && <div style={{ color: "hsl(0 70% 60%)", fontSize: "0.75rem", marginTop: "0.375rem" }}>{errors.email}</div>}
                    </div>

                    <div style={{ marginBottom: "1.75rem" }}>
                      <label style={labelStyle}>WhatsApp (opcional)</label>
                      <input
                        type="tel"
                        placeholder="(84) 9 0000-0000"
                        value={form.whatsapp}
                        onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                        style={inputStyle}
                      />
                      <div style={{ color: "hsl(0 0% 40%)", fontSize: "0.75rem", marginTop: "0.375rem" }}>
                        Se preferir receber avisos também por WhatsApp
                      </div>
                    </div>

                    <div style={{ marginBottom: "1.75rem", padding: "1rem 1.25rem", background: "hsl(43 89% 52% / 0.05)", border: "1px solid hsl(43 89% 52% / 0.2)", borderRadius: "4px" }}>
                      <p style={{ color: "hsl(0 0% 55%)", fontSize: "0.8rem", lineHeight: 1.7 }}>
                        📧 <strong style={{ color: "hsl(43 89% 52%)" }}>Sem spam.</strong> Só enviamos mensagens quando realmente temos algo relevante para você. Você pode cancelar a qualquer momento respondendo "sair" para qualquer mensagem.
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={inscrever.isPending}
                      className="btn-gold"
                      style={{ fontSize: "0.85rem", opacity: inscrever.isPending ? 0.7 : 1 }}
                    >
                      {inscrever.isPending ? "Inscrevendo..." : "Quero Receber Promoções"}
                    </button>
                  </form>
                </div>
              )}
            </AnimatedSection>

            {/* Info lateral */}
            <AnimatedSection animation="slideInRight">
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 700, color: "hsl(45 20% 92%)", marginBottom: "1rem" }}>
                    O que você pode esperar
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    {[
                      { titulo: "Promoções sazonais", texto: "Descontos em datas especiais como Dia dos Animais, Natal e início do ano." },
                      { titulo: "Pacotes especiais", texto: "Combinações de serviços com condições diferenciadas para novos clientes." },
                      { titulo: "Novos serviços", texto: "Quando lançarmos algo novo, você será avisado antes de todo mundo." },
                      { titulo: "Dicas gratuitas", texto: "Eventualmente, compartilhamos orientações práticas sobre comportamento canino." },
                    ].map((item) => (
                      <div key={item.titulo} className="card-premium" style={{ padding: "1.25rem" }}>
                        <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "hsl(43 89% 52%)", marginBottom: "0.5rem" }}>
                          {item.titulo}
                        </div>
                        <p style={{ color: "hsl(0 0% 60%)", fontSize: "0.825rem", lineHeight: 1.7 }}>{item.texto}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ padding: "1.5rem", background: "hsl(0 0% 6%)", border: "1px solid hsl(0 0% 12%)", borderRadius: "4px" }}>
                  <p style={{ color: "hsl(0 0% 55%)", fontSize: "0.8rem", lineHeight: 1.7 }}>
                    🔒 <strong style={{ color: "hsl(0 0% 70%)" }}>Seus dados são privados.</strong> Não compartilhamos suas informações com terceiros. Usamos apenas para enviar as promoções que você solicitou.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Não tem promoção agora? */}
      <section className="page-section-sm" style={{ background: "hsl(0 0% 5%)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <AnimatedSection animation="fadeInUp">
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.75rem", fontWeight: 700, color: "hsl(45 20% 92%)", marginBottom: "1rem" }}>
              Não quer esperar por uma promoção?
            </h2>
            <p style={{ color: "hsl(0 0% 60%)", fontSize: "0.9rem", lineHeight: 1.8, marginBottom: "2rem", maxWidth: "500px", margin: "0 auto 2rem" }}>
              A avaliação inicial já é gratuita. Solicite agora e descubra o que podemos fazer pelo seu cão.
            </p>
            <Link href="/orcamento" className="btn-gold">Solicitar Avaliação Gratuita</Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
