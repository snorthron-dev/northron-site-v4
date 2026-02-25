import { Link } from "wouter";
import AnimatedSection from "@/components/AnimatedSection";
import { useEffect } from "react";
import { trpc } from "@/lib/trpc";

export default function Sobre() {
  const registrar = trpc.analytics.registrarPageView.useMutation();
  useEffect(() => { registrar.mutate({ pagina: "sobre" }); }, []);

  return (
    <div className="page-transition" style={{ paddingTop: "72px" }}>
      {/* Hero */}
      <section style={{ padding: "5rem 0 4rem", background: "hsl(0 0% 4%)", borderBottom: "1px solid hsl(0 0% 10%)" }}>
        <div className="container">
          <AnimatedSection animation="fadeInUp">
            <div className="section-subtitle">Quem somos</div>
            <h1 className="section-title" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>Sobre a Northron Security</h1>
            <div className="divider-gold" />
          </AnimatedSection>
        </div>
      </section>

      {/* Conteúdo */}
      <section className="page-section">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}>
            <AnimatedSection animation="slideInLeft">
              <div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 700, color: "hsl(45 20% 92%)", marginBottom: "1.5rem" }}>
                  Uma empresa nova, uma experiência real
                </h2>
                <p style={{ color: "hsl(0 0% 60%)", fontSize: "0.95rem", lineHeight: 1.9, marginBottom: "1.25rem" }}>
                  A Northron Security nasceu da vontade de transformar anos de trabalho prático com cães em um serviço profissional, sério e acessível para famílias e empresas do Rio Grande do Norte.
                </p>
                <p style={{ color: "hsl(0 0% 60%)", fontSize: "0.95rem", lineHeight: 1.9, marginBottom: "1.25rem" }}>
                  Não somos uma empresa com décadas de história — somos honestos sobre isso. Mas temos algo que muitas empresas antigas não têm: comprometimento real com cada animal, sem fórmulas prontas ou promessas impossíveis.
                </p>
                <p style={{ color: "hsl(0 0% 60%)", fontSize: "0.95rem", lineHeight: 1.9, marginBottom: "2rem" }}>
                  O trabalho com cães começou muito antes da empresa. São anos de estudo, prática e convivência com animais de diferentes raças, temperamentos e históricos — do filhote mais dócil ao adulto com comportamentos desafiadores.
                </p>
                <Link href="/metodologia" className="btn-gold" style={{ fontSize: "0.8rem" }}>
                  Ver Nossa Metodologia
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slideInRight">
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {[
                  { titulo: "Missão", texto: "Oferecer treinamento canino de qualidade, com honestidade e respeito ao animal, fortalecendo o vínculo entre cão e tutor." },
                  { titulo: "Visão", texto: "Ser referência em treinamento e proteção canina no Rio Grande do Norte, reconhecidos pela seriedade e pelos resultados reais." },
                  { titulo: "Valores", texto: "Honestidade, bem-estar animal, comprometimento com o cliente, método humano e transparência em cada etapa do processo." },
                ].map((item) => (
                  <div key={item.titulo} className="card-premium" style={{ padding: "1.75rem" }}>
                    <div style={{ width: "40px", height: "2px", background: "hsl(43 89% 52%)", marginBottom: "1rem" }} />
                    <h4 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "hsl(43 89% 52%)", marginBottom: "0.75rem" }}>
                      {item.titulo}
                    </h4>
                    <p style={{ color: "hsl(0 0% 60%)", fontSize: "0.875rem", lineHeight: 1.8 }}>{item.texto}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Área de atuação */}
      <section className="page-section-sm" style={{ background: "hsl(0 0% 5%)" }}>
        <div className="container">
          <AnimatedSection animation="fadeInUp">
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <div className="section-subtitle">Onde atuamos</div>
              <h2 className="section-title" style={{ fontSize: "2rem" }}>Área de atendimento</h2>
            </div>
          </AnimatedSection>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
            {["Natal RN", "Ceará-Mirim RN", "Parnamirim RN", "São Gonçalo do Amarante RN", "Macaíba RN", "Região Metropolitana"].map((local, i) => (
              <AnimatedSection key={local} animation="fadeInUp" delay={i * 80}>
                <div style={{ padding: "1.25rem", background: "hsl(0 0% 8%)", border: "1px solid hsl(0 0% 13%)", borderRadius: "4px", textAlign: "center" }}>
                  <div style={{ color: "hsl(43 89% 52%)", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.1em" }}>📍</div>
                  <div style={{ color: "hsl(45 20% 85%)", fontSize: "0.875rem", fontWeight: 500, marginTop: "0.5rem" }}>{local}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="page-section-sm">
        <div className="container" style={{ textAlign: "center" }}>
          <AnimatedSection animation="fadeInUp">
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, color: "hsl(45 20% 92%)", marginBottom: "1rem" }}>
              Pronto para começar?
            </h2>
            <p style={{ color: "hsl(0 0% 60%)", marginBottom: "2rem" }}>A avaliação inicial é gratuita e sem compromisso.</p>
            <Link href="/orcamento" className="btn-gold">Solicitar Avaliação Gratuita</Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
