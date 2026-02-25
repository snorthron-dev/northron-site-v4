import { useEffect } from "react";
import { Link } from "wouter";
import AnimatedSection from "@/components/AnimatedSection";
import { trpc } from "@/lib/trpc";

const planos = [
  {
    titulo: "Aula Online",
    preco: "R$ 80",
    periodicidade: "por sessão",
    descricao: "Para dúvidas pontuais e orientação específica sobre um comportamento ou situação.",
    incluso: [
      "1 sessão via videoconferência",
      "Até 60 minutos",
      "Análise de vídeo do comportamento (se enviado)",
      "Orientações práticas e imediatas",
      "Resumo escrito por WhatsApp após a sessão",
    ],
    ideal: "Quem precisa de uma orientação rápida sobre um problema específico",
    featured: false,
  },
  {
    titulo: "Consultoria Online",
    preco: "R$ 150",
    periodicidade: "por sessão",
    descricao: "Avaliação comportamental completa e plano de ação personalizado, tudo de forma remota.",
    incluso: [
      "1 sessão via videoconferência (até 90 min)",
      "Análise detalhada do comportamento",
      "Plano de ação personalizado",
      "Material de apoio enviado por escrito",
      "1 semana de suporte por WhatsApp",
      "Acompanhamento do progresso",
    ],
    ideal: "Quem quer um diagnóstico completo e um plano claro sem precisar de visita presencial",
    featured: false,
  },
  {
    titulo: "Consultoria Presencial",
    preco: "R$ 300",
    periodicidade: "por sessão",
    descricao: "Avaliação no ambiente do animal, com observação direta do comportamento e orientação ao tutor.",
    incluso: [
      "Visita presencial ao local do cliente",
      "Avaliação comportamental no ambiente real",
      "Observação direta do cão e do tutor",
      "Plano de treinamento personalizado",
      "1 semana de acompanhamento online",
      "Relatório escrito com recomendações",
    ],
    ideal: "Quem quer a avaliação mais completa possível, com o profissional no ambiente do cão",
    featured: true,
  },
];

export default function Planos() {
  const registrar = trpc.analytics.registrarPageView.useMutation();
  useEffect(() => { registrar.mutate({ pagina: "planos" }); }, []);

  return (
    <div className="page-transition" style={{ paddingTop: "72px" }}>
      {/* Cabeçalho dos serviços */}
      <section style={{ padding: "5rem 0 4rem", background: "hsl(0 0% 4%)", borderBottom: "1px solid hsl(0 0% 10%)" }}>
        <div className="container">
          <AnimatedSection animation="fadeInUp">
            <div className="section-subtitle">Serviços</div>
            <h1 className="section-title" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>Consultorias e Planos</h1>
            <div className="divider-gold" />
            <p style={{ color: "hsl(0 0% 60%)", fontSize: "1rem", lineHeight: 1.8, marginTop: "1.5rem", maxWidth: "600px" }}>
              Para consultorias, apresentamos valores claros e sem surpresas. Nos programas de adestramento, oferecemos apenas estimativas personalizadas após uma avaliação gratuita do seu cão.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Consultorias */}
      <section className="page-section">
        <div className="container">
          <AnimatedSection animation="fadeInUp">
            <div style={{ marginBottom: "3rem" }}>
              <div className="section-subtitle">Consultorias</div>
              <h2 className="section-title" style={{ fontSize: "2rem" }}>Avaliação e orientação</h2>
              <p style={{ color: "hsl(0 0% 60%)", fontSize: "0.9rem", lineHeight: 1.8, maxWidth: "500px" }}>
                Ideal para quem quer entender o comportamento do cão antes de decidir por um treinamento completo, ou para quem precisa de orientação pontual.
              </p>
            </div>
          </AnimatedSection>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {planos.map((plano, i) => (
              <AnimatedSection key={plano.titulo} animation="fadeInUp" delay={i * 100}>
                <div className={`plan-card ${plano.featured ? "featured" : ""}`} style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                  {plano.featured && <div className="badge-popular">Mais Completo</div>}
                  <div style={{ marginBottom: "1.5rem" }}>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 700, color: "hsl(45 20% 92%)", marginBottom: "0.75rem" }}>
                      {plano.titulo}
                    </h3>
                    <p style={{ color: "hsl(0 0% 55%)", fontSize: "0.85rem", lineHeight: 1.7 }}>{plano.descricao}</p>
                  </div>

                  <div style={{ marginBottom: "1.5rem" }}>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.5rem", fontWeight: 900, color: "hsl(43 89% 52%)", lineHeight: 1 }}>
                      {plano.preco}
                    </div>
                    <div style={{ color: "hsl(0 0% 50%)", fontSize: "0.8rem", marginTop: "0.25rem" }}>{plano.periodicidade}</div>
                  </div>

                  <div style={{ width: "40px", height: "1px", background: "hsl(43 89% 52% / 0.3)", marginBottom: "1.5rem" }} />

                  <div style={{ flex: 1, marginBottom: "1.5rem" }}>
                    {plano.incluso.map((item) => (
                      <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem", marginBottom: "0.625rem" }}>
                        <div style={{ width: "14px", height: "14px", borderRadius: "50%", background: "hsl(43 89% 52% / 0.15)", border: "1px solid hsl(43 89% 52% / 0.4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                          <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "hsl(43 89% 52%)" }} />
                        </div>
                        <span style={{ color: "hsl(0 0% 65%)", fontSize: "0.825rem", lineHeight: 1.6 }}>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ padding: "0.875rem", background: "hsl(43 89% 52% / 0.05)", border: "1px solid hsl(43 89% 52% / 0.15)", borderRadius: "4px", marginBottom: "1.5rem" }}>
                    <p style={{ color: "hsl(0 0% 55%)", fontSize: "0.775rem", lineHeight: 1.6 }}>
                      <strong style={{ color: "hsl(43 89% 52%)" }}>Ideal para:</strong> {plano.ideal}
                    </p>
                  </div>

                  <Link href="/orcamento" className={plano.featured ? "btn-gold" : "btn-outline-gold"} style={{ fontSize: "0.8rem", justifyContent: "center" }}>
                    Solicitar {plano.titulo}
                  </Link>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Treinamentos */}
      <section className="page-section-sm" style={{ background: "hsl(0 0% 5%)" }}>
        <div className="container">
          <AnimatedSection animation="fadeInUp">
            <div style={{ marginBottom: "2.5rem" }}>
              <div className="section-subtitle">Treinamentos</div>
              <h2 className="section-title" style={{ fontSize: "2rem" }}>Programas completos</h2>
            </div>
          </AnimatedSection>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
            {[
              { titulo: "Adestramento Básico", duracao: "3 meses mín.", desc: "Comandos fundamentais, socialização e convivência harmoniosa.", id: "basico" },
              { titulo: "Adestramento Intermediário", duracao: "6 meses mín.", desc: "Comandos avançados, controle em ambientes com distrações.", id: "intermediario" },
              { titulo: "Adestramento Avançado", duracao: "12 meses mín.", desc: "Obediência de alto nível, objetivos específicos do tutor.", id: "avancado" },
              { titulo: "Guarda Patrimonial", duracao: "A definir", desc: "Formação para guarda de residências, empresas e propriedades.", id: "guarda" },
            ].map((item, i) => (
              <AnimatedSection key={item.titulo} animation="fadeInUp" delay={i * 80}>
                <div className="card-premium" style={{ padding: "1.75rem" }}>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "hsl(45 20% 92%)", marginBottom: "0.5rem" }}>{item.titulo}</h3>
                  <div style={{ color: "hsl(0 0% 45%)", fontSize: "0.75rem", marginBottom: "0.875rem" }}>Duração: {item.duracao}</div>
                  <p style={{ color: "hsl(0 0% 60%)", fontSize: "0.825rem", lineHeight: 1.7, marginBottom: "1.25rem" }}>{item.desc}</p>
                  {item.id === "guarda" ? (
                    <Link href="/guarda-protecao" style={{ color: "hsl(43 89% 52%)", fontSize: "0.775rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none" }}>
                      Ver detalhes →
                    </Link>
                  ) : (
                    <Link href={`/adestramento/${item.id}`} style={{ color: "hsl(43 89% 52%)", fontSize: "0.775rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none" }}>
                      Escolher Plano →
                    </Link>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Transparência e avaliação */}
      <section className="page-section-sm">
        <div className="container">
          <AnimatedSection animation="fadeInUp">
            <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
              <h2 style={{ fontSize: "1.75rem", fontWeight: 700, color: "hsl(45 20% 92%)", marginBottom: "1.25rem" }}>
                Transparência e avaliação personalizada
              </h2>
              <p style={{ color: "hsl(0 0% 60%)", fontSize: "0.9rem", lineHeight: 1.9, marginBottom: "1.25rem" }}>
                Não exibimos valores fixos para nossos programas de adestramento. Após uma avaliação inicial gratuita, nossa equipe apresentará uma estimativa personalizada para o seu cão e objetivos.
              </p>
              <p style={{ color: "hsl(0 0% 60%)", fontSize: "0.9rem", lineHeight: 1.9, marginBottom: "2rem" }}>
                Para serviços de guarda, proteção e consultorias, o valor é definido após análise detalhada das necessidades do cliente. Tudo é combinado previamente, sem surpresas.
              </p>
              <Link href="/orcamento" className="btn-gold">Solicitar Avaliação Gratuita</Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
