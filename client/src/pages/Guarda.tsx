import { useState, useEffect } from "react";
import { Link } from "wouter";
import AnimatedSection from "@/components/AnimatedSection";
import { trpc } from "@/lib/trpc";

export default function Guarda() {
  const [ativo, setAtivo] = useState("guarda");
  const registrar = trpc.analytics.registrarPageView.useMutation();
  useEffect(() => { registrar.mutate({ pagina: "guarda-protecao" }); }, []);

  return (
    <div className="page-transition" style={{ paddingTop: "72px" }}>
      <section style={{ padding: "5rem 0 4rem", background: "hsl(0 0% 4%)", borderBottom: "1px solid hsl(0 0% 10%)" }}>
        <div className="container">
          <AnimatedSection animation="fadeInUp">
            <div className="section-subtitle">Serviços</div>
            <h1 className="section-title" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>Guarda & Proteção</h1>
            <div className="divider-gold" />
            <p style={{ color: "hsl(0 0% 60%)", fontSize: "1rem", lineHeight: 1.8, marginTop: "1.5rem", maxWidth: "600px" }}>
              Formação especializada de cães para guarda patrimonial e proteção pessoal. Treinamento sério, responsável e com foco em segurança real.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <AnimatedSection animation="fadeInUp">
            <div style={{ display: "flex", gap: "0", marginBottom: "3rem", borderBottom: "1px solid hsl(0 0% 13%)" }}>
              {[{ id: "guarda", label: "Cão de Guarda" }, { id: "protecao", label: "Proteção Pessoal" }].map((tab) => (
                <button key={tab.id} onClick={() => setAtivo(tab.id)} style={{
                  padding: "1rem 2rem", background: "none", border: "none",
                  borderBottom: ativo === tab.id ? "2px solid hsl(43 89% 52%)" : "2px solid transparent",
                  color: ativo === tab.id ? "hsl(43 89% 52%)" : "hsl(0 0% 50%)",
                  fontFamily: "'Montserrat', sans-serif", fontSize: "0.8rem", fontWeight: 700,
                  letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer",
                  transition: "all 0.3s ease", marginBottom: "-1px"
                }}>{tab.label}</button>
              ))}
            </div>
          </AnimatedSection>

          {ativo === "guarda" && (
            <div className="animate-fade-in">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>
                <div>
                  <div className="tag-gold" style={{ marginBottom: "1.5rem" }}>Residências, empresas e propriedades</div>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, color: "hsl(45 20% 92%)", marginBottom: "1rem" }}>Cão de Guarda Patrimonial</h2>
                  <p style={{ color: "hsl(0 0% 60%)", fontSize: "0.95rem", lineHeight: 1.9, marginBottom: "2rem" }}>
                    O cão de guarda é treinado para proteger um território específico — sua residência, empresa ou propriedade. O objetivo é ter um animal que alerta, intimida e, quando necessário, age para proteger o patrimônio.
                  </p>
                  <p style={{ color: "hsl(0 0% 60%)", fontSize: "0.95rem", lineHeight: 1.9, marginBottom: "2rem" }}>
                    Diferente do que muitos pensam, um bom cão de guarda não é um animal agressivo sem controle. É um animal equilibrado, que sabe distinguir situações e responde de forma proporcional.
                  </p>
                  <h4 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "hsl(43 89% 52%)", marginBottom: "1rem" }}>O que desenvolvemos</h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem", marginBottom: "2rem" }}>
                    {["Alerta e latido de aviso", "Defesa do território", "Obediência ao dono mesmo em situação de estresse", "Discriminação: amigo x intruso", "Controle de mordida (quando aplicável)", "Convivência segura com a família"].map((item) => (
                      <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                        <div style={{ width: "16px", height: "16px", borderRadius: "50%", background: "hsl(43 89% 52% / 0.15)", border: "1px solid hsl(43 89% 52% / 0.4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "hsl(43 89% 52%)" }} />
                        </div>
                        <span style={{ color: "hsl(0 0% 70%)", fontSize: "0.875rem", lineHeight: 1.6 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                    <Link href="/orcamento" className="btn-gold" style={{ fontSize: "0.8rem" }}>Solicitar Avaliação</Link>
                    <a href="https://wa.me/5584921440536?text=Olá! Tenho interesse em treinamento de cão de guarda." target="_blank" rel="noopener noreferrer" className="btn-outline-gold" style={{ fontSize: "0.8rem" }}>Falar no WhatsApp</a>
                  </div>
                </div>
                <div>
                  <div className="plan-card featured" style={{ textAlign: "center" }}>
                    <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "hsl(43 89% 52%)", marginBottom: "1.5rem" }}>Investimento</div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "3.5rem", fontWeight: 900, color: "hsl(43 89% 52%)", lineHeight: 1 }}>R$ 900</div>
                    <div style={{ color: "hsl(0 0% 50%)", fontSize: "0.875rem", marginTop: "0.5rem", marginBottom: "1.5rem" }}>por mês</div>
                    <div style={{ width: "40px", height: "1px", background: "hsl(43 89% 52% / 0.3)", margin: "0 auto 1.5rem" }} />
                    {["Avaliação do animal e do ambiente", "Treinamento personalizado", "Orientação ao dono inclusa", "Acompanhamento do progresso"].map((item) => (
                      <div key={item} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
                        <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "hsl(43 89% 52%)" }} />
                        <span style={{ color: "hsl(0 0% 65%)", fontSize: "0.875rem" }}>{item}</span>
                      </div>
                    ))}
                    <div style={{ marginTop: "1.5rem" }}>
                      <Link href="/orcamento" className="btn-gold" style={{ width: "100%", justifyContent: "center" }}>Solicitar Avaliação</Link>
                    </div>
                  </div>
                  <div style={{ marginTop: "1.5rem", padding: "1.25rem", background: "hsl(0 0% 6%)", border: "1px solid hsl(0 0% 12%)", borderRadius: "4px" }}>
                    <p style={{ color: "hsl(0 0% 50%)", fontSize: "0.8rem", lineHeight: 1.7 }}>
                      ⚠️ <strong style={{ color: "hsl(0 0% 65%)" }}>Importante:</strong> Nem todo cão tem perfil para guarda. Avaliamos temperamento, histórico e aptidão antes de iniciar qualquer treinamento de proteção.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {ativo === "protecao" && (
            <div className="animate-fade-in">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>
                <div>
                  <div className="tag-gold" style={{ marginBottom: "1.5rem" }}>Para indivíduos e famílias</div>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, color: "hsl(45 20% 92%)", marginBottom: "1rem" }}>Proteção Pessoal</h2>
                  <p style={{ color: "hsl(0 0% 60%)", fontSize: "0.95rem", lineHeight: 1.9, marginBottom: "2rem" }}>
                    O cão de proteção pessoal é treinado para acompanhar e defender seu dono em situações de risco. É um nível mais avançado que requer um animal com perfil específico e um dono comprometido com o processo.
                  </p>
                  <p style={{ color: "hsl(0 0% 60%)", fontSize: "0.95rem", lineHeight: 1.9, marginBottom: "2rem" }}>
                    Esse tipo de treinamento exige responsabilidade. Conversamos abertamente sobre o que é possível, o que é necessário e o que não é recomendado para cada situação.
                  </p>
                  <div style={{ padding: "1.25rem", background: "hsl(43 89% 52% / 0.05)", border: "1px solid hsl(43 89% 52% / 0.2)", borderRadius: "4px", marginBottom: "2rem" }}>
                    <p style={{ color: "hsl(0 0% 60%)", fontSize: "0.875rem", lineHeight: 1.7 }}>
                      <strong style={{ color: "hsl(43 89% 52%)" }}>Avaliação obrigatória:</strong> Todo treinamento de proteção pessoal começa com uma avaliação detalhada do cão e uma conversa honesta sobre expectativas e responsabilidades.
                    </p>
                  </div>
                  <Link href="/orcamento" className="btn-gold" style={{ fontSize: "0.8rem" }}>Solicitar Avaliação</Link>
                </div>
                <div className="card-premium" style={{ padding: "2rem" }}>
                  <h4 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "hsl(43 89% 52%)", marginBottom: "1.5rem" }}>Perfil necessário do cão</h4>
                  {["Temperamento equilibrado (nem agressivo, nem medroso)", "Boa base de obediência", "Confiança no dono", "Aptidão para trabalho de proteção (avaliada individualmente)"].map((item) => (
                    <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", marginBottom: "0.875rem" }}>
                      <div style={{ width: "16px", height: "16px", borderRadius: "50%", background: "hsl(43 89% 52% / 0.15)", border: "1px solid hsl(43 89% 52% / 0.4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                        <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "hsl(43 89% 52%)" }} />
                      </div>
                      <span style={{ color: "hsl(0 0% 65%)", fontSize: "0.875rem", lineHeight: 1.6 }}>{item}</span>
                    </div>
                  ))}
                  <div style={{ marginTop: "1.5rem", padding: "1rem", background: "hsl(0 0% 8%)", borderRadius: "4px" }}>
                    <p style={{ color: "hsl(0 0% 50%)", fontSize: "0.8rem", lineHeight: 1.7 }}>O valor é definido após avaliação, pois depende do nível de treinamento necessário e do perfil do animal.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
