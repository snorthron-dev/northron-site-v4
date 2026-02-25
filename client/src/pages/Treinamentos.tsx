import { useState, useEffect } from "react";
import { Link } from "wouter";
import AnimatedSection from "@/components/AnimatedSection";
import { trpc } from "@/lib/trpc";

const niveis = [
  {
    id: "basico",
    label: "Básico",
    duracao: "3 meses",
    preco: "R$ 700",
    ideal: "Filhotes e cães sem treinamento anterior",
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
    preco: "R$ 700",
    ideal: "Cães com base de obediência que precisam avançar",
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
    preco: "R$ 700",
    ideal: "Cães com alto potencial ou objetivos específicos",
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

export default function Treinamentos() {
  const [ativo, setAtivo] = useState("basico");
  const registrar = trpc.analytics.registrarPageView.useMutation();
  useEffect(() => { registrar.mutate({ pagina: "treinamentos" }); }, []);
  const nivel = niveis.find((n) => n.id === ativo)!;

  return (
    <div className="page-transition" style={{ paddingTop: "72px" }}>
      <section style={{ padding: "5rem 0 4rem", background: "hsl(0 0% 4%)", borderBottom: "1px solid hsl(0 0% 10%)" }}>
        <div className="container">
          <AnimatedSection animation="fadeInUp">
            <div className="section-subtitle">Serviços</div>
            <h1 className="section-title" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>Adestramento Canino</h1>
            <div className="divider-gold" />
            <p style={{ color: "hsl(0 0% 60%)", fontSize: "1rem", lineHeight: 1.8, marginTop: "1.5rem", maxWidth: "600px" }}>
              Três níveis progressivos de treinamento comportamental para cães de todas as raças e idades. Cada nível tem objetivos claros e resultados mensuráveis.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <AnimatedSection animation="fadeInUp">
            <div style={{ display: "flex", gap: "0", marginBottom: "3rem", borderBottom: "1px solid hsl(0 0% 13%)" }}>
              {niveis.map((n) => (
                <button key={n.id} onClick={() => setAtivo(n.id)} style={{
                  padding: "1rem 2rem",
                  background: "none",
                  border: "none",
                  borderBottom: ativo === n.id ? "2px solid hsl(43 89% 52%)" : "2px solid transparent",
                  color: ativo === n.id ? "hsl(43 89% 52%)" : "hsl(0 0% 50%)",
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  marginBottom: "-1px"
                }}>
                  {n.label}
                </button>
              ))}
            </div>
          </AnimatedSection>

          <div key={ativo} className="animate-fade-in">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: "4rem", alignItems: "start" }}>
              <div>
                <div className="tag-gold" style={{ marginBottom: "1.5rem" }}>{nivel.ideal}</div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, color: "hsl(45 20% 92%)", marginBottom: "1rem" }}>
                  Nível {nivel.label}
                </h2>
                <p style={{ color: "hsl(0 0% 60%)", fontSize: "0.95rem", lineHeight: 1.9, marginBottom: "2rem" }}>{nivel.descricao}</p>

                <h4 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "hsl(43 89% 52%)", marginBottom: "1rem" }}>
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

                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  <Link href={`/adestramento/${nivel.id}`} className="btn-gold" style={{ fontSize: "0.8rem" }}>Escolher Plano</Link>
                  <a
                    href={`https://wa.me/5584921440536?text=${encodeURIComponent(`Olá! Tenho interesse no adestramento nível ${nivel.label}. Podem me dar mais informações?`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline-gold"
                    style={{ fontSize: "0.8rem" }}
                  >
                    Falar no WhatsApp
                  </a>
                </div>
              </div>

              {/* Card de investimento removido: não exibimos valores diretamente. */}
            </div>
          </div>
        </div>
      </section>

      <section className="page-section-sm" style={{ background: "hsl(0 0% 5%)" }}>
        <div className="container">
          <AnimatedSection animation="fadeInUp">
            <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.75rem", fontWeight: 700, color: "hsl(45 20% 92%)" }}>Dúvidas sobre adestramento</h2>
            </div>
          </AnimatedSection>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem", maxWidth: "900px", margin: "0 auto" }}>
            {[
              { p: "Qual a idade mínima?", r: "A partir dos 3 meses, após as vacinas básicas. Quanto mais cedo, melhor — mas nunca é tarde para treinar." },
              { p: "Meu cão é muito velho?", r: "Não existe cão velho demais. O processo pode ser mais gradual, mas resultados são possíveis em qualquer idade." },
              { p: "Preciso estar presente?", r: "Recomendamos fortemente que sim. O cão precisa aprender a obedecer você, não só o treinador." },
              { p: "Funciona com raças difíceis?", r: "Sim. Raça não define comportamento. Avaliamos cada caso individualmente na consulta gratuita." },
            ].map((item) => (
              <div key={item.p} className="card-premium" style={{ padding: "1.5rem" }}>
                <p style={{ color: "hsl(43 89% 52%)", fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.75rem" }}>{item.p}</p>
                <p style={{ color: "hsl(0 0% 60%)", fontSize: "0.85rem", lineHeight: 1.7 }}>{item.r}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <Link href="/faq" className="btn-outline-gold" style={{ fontSize: "0.8rem" }}>Ver Todas as Dúvidas</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
