import { useEffect } from "react";
import { Link } from "wouter";
import AnimatedSection from "@/components/AnimatedSection";
import { trpc } from "@/lib/trpc";

const casos = [
  {
    titulo: "Labrador com comportamento destrutivo",
    raca: "Labrador Retriever · 2 anos",
    problema: "O cão destruía móveis, latia excessivamente e não obedecia nenhum comando. O tutor estava pensando em devolvê-lo.",
    processo: "Avaliação identificou excesso de energia não direcionada e falta de limites claros. Iniciamos com adestramento básico focado em canalizar a energia e estabelecer rotina.",
    resultado: "Após 4 meses, o cão parou de destruir objetos, passou a caminhar na guia e responde a comandos básicos com consistência.",
    tempo: "4 meses",
  },
  {
    titulo: "Pastor Alemão agressivo com estranhos",
    raca: "Pastor Alemão · 3 anos",
    problema: "Cão reagia de forma agressiva com visitantes e pessoas na rua. O tutor não conseguia levá-lo a lugares públicos.",
    processo: "Avaliação identificou medo como raiz da agressividade. Trabalho de dessensibilização gradual, controle de impulsos e reforço de confiança no tutor.",
    resultado: "O cão passou a tolerar visitas sem reações agressivas e consegue caminhar em ambientes públicos com controle.",
    tempo: "6 meses",
  },
  {
    titulo: "Rottweiler para guarda patrimonial",
    raca: "Rottweiler · 4 anos",
    problema: "Proprietário de empresa queria um cão de guarda eficaz, mas que não representasse risco para funcionários e clientes.",
    processo: "Avaliação de temperamento confirmou aptidão para guarda. Treinamento focado em alerta, defesa de território e discriminação amigo/intruso.",
    resultado: "Cão atua como guarda eficaz, alerta a presença de estranhos e mantém comportamento equilibrado com pessoas autorizadas.",
    tempo: "8 meses",
  },
];

export default function Resultados() {
  const registrar = trpc.analytics.registrarPageView.useMutation();
  useEffect(() => { registrar.mutate({ pagina: "resultados" }); }, []);

  return (
    <div className="page-transition" style={{ paddingTop: "72px" }}>
      <section style={{ padding: "5rem 0 4rem", background: "hsl(0 0% 4%)", borderBottom: "1px solid hsl(0 0% 10%)" }}>
        <div className="container">
          <AnimatedSection animation="fadeInUp">
            <div className="section-subtitle">Resultados</div>
            <h1 className="section-title" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>Casos reais</h1>
            <div className="divider-gold" />
            <p style={{ color: "hsl(0 0% 60%)", fontSize: "1rem", lineHeight: 1.8, marginTop: "1.5rem", maxWidth: "600px" }}>
              Resultados reais de animais que passaram pelo nosso processo. Sem exageros, sem omissões — o que aconteceu de fato.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
            {casos.map((caso, i) => (
              <AnimatedSection key={caso.titulo} animation="fadeInUp" delay={i * 100}>
                <div className="card-premium" style={{ padding: "2.5rem" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "2.5rem" }}>
                    <div>
                      <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "hsl(43 89% 52%)", marginBottom: "0.5rem" }}>
                        Caso
                      </div>
                      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", fontWeight: 700, color: "hsl(45 20% 92%)", marginBottom: "0.5rem" }}>
                        {caso.titulo}
                      </h3>
                      <div style={{ color: "hsl(0 0% 45%)", fontSize: "0.75rem", marginBottom: "1rem" }}>{caso.raca}</div>
                      <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "hsl(0 0% 45%)", marginBottom: "0.5rem" }}>
                        Situação inicial
                      </div>
                      <p style={{ color: "hsl(0 0% 60%)", fontSize: "0.85rem", lineHeight: 1.7 }}>{caso.problema}</p>
                    </div>
                    <div>
                      <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "hsl(0 0% 45%)", marginBottom: "0.5rem" }}>
                        O que fizemos
                      </div>
                      <p style={{ color: "hsl(0 0% 60%)", fontSize: "0.85rem", lineHeight: 1.7 }}>{caso.processo}</p>
                    </div>
                    <div>
                      <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "hsl(43 89% 52%)", marginBottom: "0.5rem" }}>
                        Resultado
                      </div>
                      <p style={{ color: "hsl(0 0% 70%)", fontSize: "0.85rem", lineHeight: 1.7, marginBottom: "1rem" }}>{caso.resultado}</p>
                      <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.375rem 0.875rem", background: "hsl(43 89% 52% / 0.1)", border: "1px solid hsl(43 89% 52% / 0.3)", borderRadius: "2px" }}>
                        <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "hsl(43 89% 52%)" }} />
                        <span style={{ color: "hsl(43 89% 52%)", fontSize: "0.75rem", fontWeight: 600 }}>{caso.tempo} de treinamento</span>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Nota de honestidade */}
      <section className="page-section-sm" style={{ background: "hsl(0 0% 5%)" }}>
        <div className="container">
          <AnimatedSection animation="fadeInUp">
            <div style={{ maxWidth: "700px", margin: "0 auto" }}>
              <div className="card-premium" style={{ padding: "2.5rem" }}>
                <div style={{ width: "40px", height: "2px", background: "hsl(43 89% 52%)", marginBottom: "1.25rem" }} />
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 700, color: "hsl(45 20% 92%)", marginBottom: "1rem" }}>
                  Uma nota sobre resultados
                </h3>
                <p style={{ color: "hsl(0 0% 60%)", fontSize: "0.9rem", lineHeight: 1.9, marginBottom: "1rem" }}>
                  Os casos descritos aqui são reais. Os resultados também. Mas é importante ser honesto: nem todo treinamento termina com transformação total, e o tempo de cada processo varia muito.
                </p>
                <p style={{ color: "hsl(0 0% 60%)", fontSize: "0.9rem", lineHeight: 1.9 }}>
                  Fatores como a consistência do tutor em casa, o histórico do animal, a raça e a idade influenciam diretamente no resultado. O que podemos garantir é comprometimento, honestidade e o melhor trabalho possível dentro das possibilidades reais de cada caso.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="page-section-sm">
        <div className="container" style={{ textAlign: "center" }}>
          <AnimatedSection animation="fadeInUp">
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, color: "hsl(45 20% 92%)", marginBottom: "1rem" }}>
              Quer resultados assim?
            </h2>
            <p style={{ color: "hsl(0 0% 60%)", marginBottom: "2rem" }}>Comece com uma avaliação gratuita e honesta.</p>
            <Link href="/orcamento" className="btn-gold">Solicitar Avaliação Gratuita</Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
