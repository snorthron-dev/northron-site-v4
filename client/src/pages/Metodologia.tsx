import { Link } from "wouter";
import AnimatedSection from "@/components/AnimatedSection";
import { useEffect } from "react";
import { trpc } from "@/lib/trpc";

const etapas = [
  { num: "01", titulo: "Contato inicial", subtitulo: "Avaliação gratuita", texto: "Você entra em contato pelo WhatsApp ou pelo formulário do site. Conversamos sobre seu cão, seu histórico, o que você espera e o que está enfrentando. Sem compromisso, sem pressão — só uma conversa honesta." },
  { num: "02", titulo: "Avaliação presencial", subtitulo: "Diagnóstico real", texto: "Agendamos uma visita para observar o comportamento do animal no ambiente dele. É nesse momento que identificamos o que realmente está acontecendo — não apenas os sintomas, mas as causas." },
  { num: "03", titulo: "Plano personalizado", subtitulo: "Sem fórmula pronta", texto: "Com base na avaliação, criamos um plano de treinamento específico para o seu cão. Cada animal é diferente. Cada família tem necessidades diferentes. O plano reflete isso." },
  { num: "04", titulo: "Execução do treinamento", subtitulo: "Trabalho consistente", texto: "O treinamento começa. Sessões regulares, com evolução gradual e registrada. Você acompanha o progresso e entende o que está sendo feito e por quê." },
  { num: "05", titulo: "Orientação ao tutor", subtitulo: "Você faz parte do processo", texto: "O treinamento não termina quando o profissional vai embora. Ensinamos você a manter e reforçar o que foi aprendido. O vínculo entre tutor e cão é parte essencial do resultado." },
  { num: "06", titulo: "Acompanhamento", subtitulo: "Suporte contínuo", texto: "Após o treinamento, estamos disponíveis para dúvidas e ajustes. Comportamento canino é dinâmico — e estamos aqui para apoiar quando necessário." },
];

export default function Metodologia() {
  const registrar = trpc.analytics.registrarPageView.useMutation();
  useEffect(() => { registrar.mutate({ pagina: "metodologia" }); }, []);

  return (
    <div className="page-transition" style={{ paddingTop: "72px" }}>
      <section style={{ padding: "5rem 0 4rem", background: "hsl(0 0% 4%)", borderBottom: "1px solid hsl(0 0% 10%)" }}>
        <div className="container">
          <AnimatedSection animation="fadeInUp">
            <div className="section-subtitle">Como trabalhamos</div>
            <h1 className="section-title" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>Nossa Metodologia</h1>
            <div className="divider-gold" />
            <p style={{ color: "hsl(0 0% 60%)", fontSize: "1rem", lineHeight: 1.8, marginTop: "1.5rem", maxWidth: "600px" }}>
              Cada etapa do nosso processo foi pensada para garantir resultados reais, comunicação clara e respeito ao animal e ao tutor.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem", maxWidth: "800px" }}>
            {etapas.map((etapa, i) => (
              <AnimatedSection key={etapa.num} animation="slideInLeft" delay={i * 80}>
                <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>
                  <div className="step-number" style={{ flexShrink: 0 }}>{etapa.num}</div>
                  <div className="card-premium" style={{ padding: "1.75rem", flex: 1 }}>
                    <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "hsl(43 89% 52%)", marginBottom: "0.4rem" }}>
                      {etapa.subtitulo}
                    </div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", fontWeight: 700, color: "hsl(45 20% 92%)", marginBottom: "0.75rem" }}>
                      {etapa.titulo}
                    </h3>
                    <p style={{ color: "hsl(0 0% 60%)", fontSize: "0.9rem", lineHeight: 1.8 }}>{etapa.texto}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section-sm" style={{ background: "hsl(0 0% 5%)" }}>
        <div className="container">
          <AnimatedSection animation="fadeInUp">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
              {[
                { titulo: "Reforço positivo", texto: "Utilizamos recompensas e comunicação clara. Sem punição física, sem coerção. O cão aprende porque quer, não porque tem medo." },
                { titulo: "Ritmo do animal", texto: "Cada cão aprende no seu tempo. Não forçamos progressos artificiais. A consistência supera a velocidade." },
                { titulo: "Transparência total", texto: "Você sabe o que está sendo feito, por que está sendo feito e o que esperar. Sem mistérios, sem jargões desnecessários." },
              ].map((item) => (
                <div key={item.titulo} className="card-premium" style={{ padding: "2rem" }}>
                  <div style={{ width: "40px", height: "2px", background: "hsl(43 89% 52%)", marginBottom: "1rem" }} />
                  <h4 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "hsl(43 89% 52%)", marginBottom: "0.75rem" }}>{item.titulo}</h4>
                  <p style={{ color: "hsl(0 0% 60%)", fontSize: "0.875rem", lineHeight: 1.8 }}>{item.texto}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="page-section-sm">
        <div className="container" style={{ textAlign: "center" }}>
          <AnimatedSection animation="fadeInUp">
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, color: "hsl(45 20% 92%)", marginBottom: "1rem" }}>Quer ver na prática?</h2>
            <p style={{ color: "hsl(0 0% 60%)", marginBottom: "2rem" }}>Solicite uma avaliação gratuita e conheça o processo de perto.</p>
            <Link href="/orcamento" className="btn-gold">Solicitar Avaliação Gratuita</Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
