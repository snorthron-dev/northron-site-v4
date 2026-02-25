import { useEffect } from "react";
import { Link } from "wouter";
import AnimatedSection from "@/components/AnimatedSection";
import { trpc } from "@/lib/trpc";

export default function Contato() {
  const registrar = trpc.analytics.registrarPageView.useMutation();
  useEffect(() => { registrar.mutate({ pagina: "contato" }); }, []);

  return (
    <div className="page-transition" style={{ paddingTop: "72px" }}>
      <section style={{ padding: "5rem 0 4rem", background: "hsl(0 0% 4%)", borderBottom: "1px solid hsl(0 0% 10%)" }}>
        <div className="container">
          <AnimatedSection animation="fadeInUp">
            <div className="section-subtitle">Fale conosco</div>
            <h1 className="section-title" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>Contato</h1>
            <div className="divider-gold" />
            <p style={{ color: "hsl(0 0% 60%)", fontSize: "1rem", lineHeight: 1.8, marginTop: "1.5rem", maxWidth: "600px" }}>
              Estamos disponíveis para responder dúvidas, agendar avaliações e conversar sobre o seu cão. Escolha o canal que preferir.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}>
            {/* Canais de contato */}
            <AnimatedSection animation="slideInLeft">
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {/* WhatsApp */}
                <div className="card-premium" style={{ padding: "2rem" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "1.25rem" }}>
                    <div style={{ width: "48px", height: "48px", background: "hsl(43 89% 52% / 0.1)", border: "1px solid hsl(43 89% 52% / 0.3)", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="hsl(43 89% 52%)">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.255.949L2 3l1.395 5.233A11.955 11.955 0 002 12c0 6.627 5.373 12 12 12s12-5.373 12-12S18.627 0 12 0z"/>
                      </svg>
                    </div>
                    <div>
                      <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "hsl(43 89% 52%)", marginBottom: "0.5rem" }}>
                        WhatsApp
                      </div>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 700, color: "hsl(45 20% 92%)", marginBottom: "0.5rem" }}>
                        (84) 9 2144-0536
                      </div>
                      <p style={{ color: "hsl(0 0% 55%)", fontSize: "0.85rem", lineHeight: 1.7, marginBottom: "1rem" }}>
                        Canal mais rápido. Respondemos em horário comercial, geralmente em poucas horas.
                      </p>
                      <a
                        href="https://wa.me/5584921440536?text=Olá! Gostaria de entrar em contato com a Northron Security."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-gold"
                        style={{ fontSize: "0.775rem" }}
                      >
                        Abrir WhatsApp
                      </a>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="card-premium" style={{ padding: "2rem" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "1.25rem" }}>
                    <div style={{ width: "48px", height: "48px", background: "hsl(43 89% 52% / 0.1)", border: "1px solid hsl(43 89% 52% / 0.3)", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="hsl(43 89% 52%)" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                      </svg>
                    </div>
                    <div>
                      <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "hsl(43 89% 52%)", marginBottom: "0.5rem" }}>
                        Email
                      </div>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", fontWeight: 700, color: "hsl(45 20% 92%)", marginBottom: "0.5rem" }}>
                        snorthron@gmail.com
                      </div>
                      <p style={{ color: "hsl(0 0% 55%)", fontSize: "0.85rem", lineHeight: 1.7, marginBottom: "1rem" }}>
                        Para mensagens mais detalhadas ou formais. Respondemos em até 24 horas.
                      </p>
                      <a
                        href="mailto:snorthron@gmail.com"
                        className="btn-outline-gold"
                        style={{ fontSize: "0.775rem" }}
                      >
                        Enviar Email
                      </a>
                    </div>
                  </div>
                </div>

                {/* Instagram */}
                <div className="card-premium" style={{ padding: "2rem" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "1.25rem" }}>
                    <div style={{ width: "48px", height: "48px", background: "hsl(43 89% 52% / 0.1)", border: "1px solid hsl(43 89% 52% / 0.3)", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="hsl(43 89% 52%)">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </div>
                    <div>
                      <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "hsl(43 89% 52%)", marginBottom: "0.5rem" }}>
                        Instagram
                      </div>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", fontWeight: 700, color: "hsl(45 20% 92%)", marginBottom: "0.5rem" }}>
                        @northronsecurity
                      </div>
                      <p style={{ color: "hsl(0 0% 55%)", fontSize: "0.85rem", lineHeight: 1.7, marginBottom: "1rem" }}>
                        Acompanhe o trabalho, veja resultados e fique por dentro das novidades.
                      </p>
                      <a
                        href="https://instagram.com/northronsecurity"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-outline-gold"
                        style={{ fontSize: "0.775rem" }}
                      >
                        Ver Instagram
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Localização e horários */}
            <AnimatedSection animation="slideInRight">
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.75rem", fontWeight: 700, color: "hsl(45 20% 92%)", marginBottom: "1.5rem" }}>
                    Onde atuamos
                  </h2>
                  <div className="card-premium" style={{ padding: "2rem", marginBottom: "1.5rem" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                      {[
                        { local: "Natal RN", detalhe: "Zona Norte, Sul, Leste e Oeste" },
                        { local: "Ceará-Mirim RN", detalhe: "Cidade e zona rural" },
                        { local: "Parnamirim RN", detalhe: "Atendimento disponível" },
                        { local: "São Gonçalo do Amarante RN", detalhe: "Atendimento disponível" },
                        { local: "Macaíba RN", detalhe: "Atendimento disponível" },
                      ].map((item) => (
                        <div key={item.local} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", paddingBottom: "0.875rem", borderBottom: "1px solid hsl(0 0% 10%)" }}>
                          <span style={{ color: "hsl(43 89% 52%)", fontSize: "0.9rem" }}>📍</span>
                          <div>
                            <div style={{ color: "hsl(45 20% 88%)", fontSize: "0.875rem", fontWeight: 600 }}>{item.local}</div>
                            <div style={{ color: "hsl(0 0% 50%)", fontSize: "0.775rem" }}>{item.detalhe}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p style={{ color: "hsl(0 0% 50%)", fontSize: "0.8rem", lineHeight: 1.7, marginTop: "1rem" }}>
                      Atendemos no local do cliente. Para outras cidades da região metropolitana, consulte disponibilidade.
                    </p>
                  </div>

                  <div className="card-premium" style={{ padding: "2rem" }}>
                    <h4 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "hsl(43 89% 52%)", marginBottom: "1rem" }}>
                      Horário de atendimento
                    </h4>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                      {[
                        { dia: "Segunda a Sexta", hora: "8h às 18h" },
                        { dia: "Sábado", hora: "8h às 14h" },
                        { dia: "Domingo", hora: "Sob consulta" },
                      ].map((item) => (
                        <div key={item.dia} style={{ display: "flex", justifyContent: "space-between", paddingBottom: "0.625rem", borderBottom: "1px solid hsl(0 0% 10%)" }}>
                          <span style={{ color: "hsl(0 0% 65%)", fontSize: "0.875rem" }}>{item.dia}</span>
                          <span style={{ color: "hsl(45 20% 85%)", fontSize: "0.875rem", fontWeight: 500 }}>{item.hora}</span>
                        </div>
                      ))}
                    </div>
                    <p style={{ color: "hsl(0 0% 45%)", fontSize: "0.775rem", lineHeight: 1.7, marginTop: "1rem" }}>
                      Horários podem variar. Confirme disponibilidade pelo WhatsApp.
                    </p>
                  </div>
                </div>

                <div style={{ textAlign: "center" }}>
                  <Link href="/orcamento" className="btn-gold" style={{ fontSize: "0.85rem" }}>
                    Solicitar Avaliação Gratuita
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}
