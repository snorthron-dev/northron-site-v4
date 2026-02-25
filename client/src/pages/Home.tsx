import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import AnimatedSection from "@/components/AnimatedSection";
import { trpc } from "@/lib/trpc";
// Hook para session ID
function useSessionId() {
  const [sessionId] = useState(() => {
    const stored = sessionStorage.getItem("ns_session");
    if (stored) return stored;
    const id = Math.random().toString(36).substring(2);
    sessionStorage.setItem("ns_session", id);
    return id;
  });
  return sessionId;
}

// Hook para contador animado
function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function StatCard({ number, suffix, label, delay }: { number: number; suffix: string; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const count = useCountUp(number, 2000, started);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setStarted(true); observer.disconnect(); }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ textAlign: "center", animationDelay: `${delay}ms` }} className="animate-fade-in-up">
      <div className="stat-number">{count}{suffix}</div>
      <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "hsl(0 0% 55%)", marginTop: "0.5rem" }}>
        {label}
      </div>
    </div>
  );
}

const servicos = [
  {
    icon: "🐕",
    titulo: "Adestramento",
    descricao: "Treinamento comportamental completo para cães de todas as raças e idades. Do básico ao avançado, com foco no vínculo entre tutor e animal.",
    href: "/treinamentos",
    label: "Ver Treinamentos"
  },
  {
    icon: "🛡️",
    titulo: "Guarda & Proteção",
    descricao: "Formação especializada de cães para guarda patrimonial e proteção pessoal. Treinamento sério, responsável e eficaz.",
    href: "/guarda-protecao",
    label: "Saiba Mais"
  },
  {
    icon: "📋",
    titulo: "Consultoria",
    descricao: "Avaliação comportamental e orientação personalizada para tutores. Presencial ou online, com diagnóstico honesto e plano de ação claro.",
    href: "/planos",
    label: "Ver Planos"
  },
];

const diferenciais = [
  { titulo: "Sem mentiras", texto: "Somos honestos sobre o que é possível. Não prometemos milagres — prometemos trabalho sério e resultados reais." },
  { titulo: "Foco no vínculo", texto: "O treinamento mais eficaz é aquele que fortalece a relação entre você e seu cão, não apenas obediência mecânica." },
  { titulo: "Método humano", texto: "Utilizamos técnicas baseadas em reforço positivo e comunicação clara, sem punição física ou coerção." },
  { titulo: "Atendimento personalizado", texto: "Cada cão é único. Cada plano é adaptado ao animal, ao tutor e ao objetivo específico." },
];

export default function Home() {
  const sessionId = useSessionId();
  const registrarPageView = trpc.analytics.registrarPageView.useMutation();

  useEffect(() => {
    registrarPageView.mutate({ pagina: "inicio", sessionId });
  }, []);

  return (
    <div className="page-transition">
      {/* ===== HERO ===== */}
      <section style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg, hsl(0 0% 3%) 0%, hsl(0 0% 6%) 50%, hsl(0 0% 4%) 100%)"
      }}>
        {/* Padrão de fundo decorativo */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle at 20% 50%, hsl(43 89% 52% / 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, hsl(43 89% 52% / 0.03) 0%, transparent 40%)",
          pointerEvents: "none"
        }} />

        {/* Linha dourada decorativa */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: "linear-gradient(90deg, transparent, hsl(43 89% 52% / 0.6), transparent)"
        }} />

        <div className="container" style={{ paddingTop: "8rem", paddingBottom: "6rem" }}>
          <div style={{ maxWidth: "720px" }}>
            {/* Tag */}
            <AnimatedSection animation="fadeIn">
              <span className="tag-gold" style={{ marginBottom: "2rem", display: "inline-block" }}>
                Natal RN · Ceará-Mirim · Região Metropolitana
              </span>
            </AnimatedSection>

            {/* Título principal */}
            <AnimatedSection animation="fadeInUp" delay={100}>
              <h1 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                fontWeight: 900,
                lineHeight: 1.1,
                color: "hsl(45 20% 95%)",
                marginBottom: "1.5rem",
                letterSpacing: "-0.02em"
              }}>
                Treinamento canino{" "}
                <span className="text-gradient-gold">sério</span>,<br />
                resultados{" "}
                <span style={{ fontStyle: "italic" }}>reais</span>.
              </h1>
            </AnimatedSection>

            {/* Subtítulo */}
            <AnimatedSection animation="fadeInUp" delay={200}>
              <p style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "1.1rem",
                color: "hsl(0 0% 65%)",
                lineHeight: 1.8,
                marginBottom: "2.5rem",
                maxWidth: "560px"
              }}>
                Adestramento comportamental, guarda patrimonial e proteção pessoal. 
                Anos de experiência com cães, comprometimento com cada animal e honestidade 
                em cada etapa do processo.
              </p>
            </AnimatedSection>

            {/* CTAs */}
            <AnimatedSection animation="fadeInUp" delay={300}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "3rem" }}>
                <Link href="/orcamento" className="btn-gold" style={{ fontSize: "0.85rem" }}>
                  Solicitar Avaliação Gratuita
                </Link>
                <Link href="/sobre" className="btn-outline-gold" style={{ fontSize: "0.85rem" }}>
                  Conhecer a Empresa
                </Link>
              </div>
            </AnimatedSection>

            {/* Indicadores rápidos */}
            <AnimatedSection animation="fadeIn" delay={400}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
                {[
                  { label: "Anos com cães", value: "10+" },
                  { label: "Raças atendidas", value: "30+" },
                  { label: "Atendimento", value: "RN" },
                ].map((item) => (
                  <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div style={{ width: "1px", height: "32px", background: "hsl(43 89% 52% / 0.4)" }} />
                    <div>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 700, color: "hsl(43 89% 52%)" }}>{item.value}</div>
                      <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", color: "hsl(0 0% 50%)", textTransform: "uppercase" }}>{item.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Seta de scroll */}
        <div style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          opacity: 0.5
        }}>
          <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.65rem", letterSpacing: "0.2em", color: "hsl(43 89% 52%)", textTransform: "uppercase" }}>
            Explorar
          </div>
          <div style={{
            width: "1px",
            height: "40px",
            background: "linear-gradient(to bottom, hsl(43 89% 52%), transparent)",
            animation: "fadeInUp 1.5s ease infinite"
          }} />
        </div>
      </section>

      {/* ===== SERVIÇOS ===== */}
      <section className="page-section" style={{ background: "hsl(0 0% 5%)" }}>
        <div className="container">
          <AnimatedSection animation="fadeInUp">
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <div className="section-subtitle">O que fazemos</div>
              <h2 className="section-title">Serviços especializados</h2>
              <div style={{ width: "60px", height: "1px", background: "hsl(43 89% 52%)", margin: "1.5rem auto 0" }} />
            </div>
          </AnimatedSection>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {servicos.map((s, i) => (
              <AnimatedSection key={s.titulo} animation="fadeInUp" delay={i * 120}>
                <div className="card-premium" style={{ padding: "2.5rem", height: "100%", display: "flex", flexDirection: "column" }}>
                  <div style={{ fontSize: "2.5rem", marginBottom: "1.25rem" }}>{s.icon}</div>
                  <h3 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color: "hsl(45 20% 92%)",
                    marginBottom: "1rem"
                  }}>
                    {s.titulo}
                  </h3>
                  <p style={{ color: "hsl(0 0% 60%)", fontSize: "0.9rem", lineHeight: 1.8, flex: 1, marginBottom: "1.5rem" }}>
                    {s.descricao}
                  </p>
                  <Link href={s.href} className="btn-outline-gold" style={{ fontSize: "0.75rem", padding: "0.625rem 1.25rem", alignSelf: "flex-start" }}>
                    {s.label}
                  </Link>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SOBRE (TEASER) ===== */}
      <section className="page-section">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
            <AnimatedSection animation="slideInLeft">
              <div>
                <div className="section-subtitle">Quem somos</div>
                <h2 className="section-title" style={{ marginBottom: "1.5rem" }}>
                  Experiência real,<br />sem exageros
                </h2>
                <div className="divider-gold" />
                <p style={{ color: "hsl(0 0% 60%)", fontSize: "0.95rem", lineHeight: 1.9, marginTop: "1.5rem", marginBottom: "1.5rem" }}>
                  A Northron Security é uma empresa nova, mas o trabalho com cães não é. 
                  São anos de dedicação, estudo e prática com animais de diferentes raças, 
                  temperamentos e históricos.
                </p>
                <p style={{ color: "hsl(0 0% 60%)", fontSize: "0.95rem", lineHeight: 1.9, marginBottom: "2rem" }}>
                  Não prometemos transformar qualquer cão em um super-herói. Prometemos 
                  honestidade, comprometimento e o melhor resultado possível para cada animal 
                  e cada família.
                </p>
                <Link href="/sobre" className="btn-gold" style={{ fontSize: "0.8rem" }}>
                  Nossa História
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slideInRight">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                {diferenciais.map((d, i) => (
                  <div key={d.titulo} className="card-premium" style={{ padding: "1.5rem" }}>
                    <div style={{
                      width: "32px",
                      height: "2px",
                      background: "hsl(43 89% 52%)",
                      marginBottom: "1rem"
                    }} />
                    <h4 style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "hsl(43 89% 52%)",
                      marginBottom: "0.75rem"
                    }}>
                      {d.titulo}
                    </h4>
                    <p style={{ color: "hsl(0 0% 55%)", fontSize: "0.8rem", lineHeight: 1.7 }}>
                      {d.texto}
                    </p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ===== METODOLOGIA (TEASER) ===== */}
      <section className="page-section" style={{ background: "hsl(0 0% 5%)" }}>
        <div className="container">
          <AnimatedSection animation="fadeInUp">
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <div className="section-subtitle">Como trabalhamos</div>
              <h2 className="section-title">Do primeiro contato ao resultado</h2>
            </div>
          </AnimatedSection>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem" }}>
            {[
              { num: "01", titulo: "Avaliação gratuita", texto: "Conversamos sobre seu cão, seu histórico e o que você espera alcançar. Sem compromisso." },
              { num: "02", titulo: "Diagnóstico honesto", texto: "Avaliamos o comportamento do animal e apresentamos o que é possível e o que não é." },
              { num: "03", titulo: "Plano personalizado", texto: "Criamos um plano de treinamento específico para o seu cão e seus objetivos." },
              { num: "04", titulo: "Acompanhamento", texto: "Você acompanha cada etapa e recebe orientações para reforçar o aprendizado em casa." },
            ].map((step, i) => (
              <AnimatedSection key={step.num} animation="fadeInUp" delay={i * 100}>
                <div style={{ textAlign: "center" }}>
                  <div className="step-number" style={{ margin: "0 auto 1.25rem" }}>{step.num}</div>
                  <h4 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "hsl(45 20% 92%)", marginBottom: "0.75rem" }}>
                    {step.titulo}
                  </h4>
                  <p style={{ color: "hsl(0 0% 55%)", fontSize: "0.85rem", lineHeight: 1.7 }}>
                    {step.texto}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection animation="fadeIn" delay={400}>
            <div style={{ textAlign: "center", marginTop: "3.5rem" }}>
              <Link href="/metodologia" className="btn-outline-gold" style={{ fontSize: "0.8rem" }}>
                Ver Metodologia Completa
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section style={{
        padding: "6rem 0",
        background: "linear-gradient(135deg, hsl(0 0% 4%) 0%, hsl(0 0% 7%) 50%, hsl(0 0% 4%) 100%)",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle at 50% 50%, hsl(43 89% 52% / 0.06) 0%, transparent 60%)",
          pointerEvents: "none"
        }} />
        <div className="container" style={{ textAlign: "center", position: "relative" }}>
          <AnimatedSection animation="fadeInUp">
            <div className="section-subtitle">Pronto para começar?</div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              color: "hsl(45 20% 95%)",
              marginBottom: "1.25rem",
              lineHeight: 1.2
            }}>
              Seu cão merece o melhor.<br />
              <span className="text-gradient-gold">Vamos conversar.</span>
            </h2>
            <p style={{ color: "hsl(0 0% 60%)", fontSize: "1rem", lineHeight: 1.8, marginBottom: "2.5rem", maxWidth: "500px", margin: "0 auto 2.5rem" }}>
              A avaliação inicial é gratuita. Sem compromisso, sem pressão. 
              Só uma conversa honesta sobre o que seu cão precisa.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
              <Link href="/orcamento" className="btn-gold">
                Solicitar Avaliação Gratuita
              </Link>
              <a
                href="https://wa.me/5584921440536?text=Olá! Quero solicitar uma avaliação gratuita para meu cão."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-gold"
              >
                Falar no WhatsApp
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
