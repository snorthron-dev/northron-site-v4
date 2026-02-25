import { Link } from "wouter";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{
      background: "hsl(0 0% 3%)",
      borderTop: "1px solid hsl(43 89% 52% / 0.15)",
      paddingTop: "4rem",
      paddingBottom: "2rem"
    }}>
      <div className="container">
        {/* Grid principal */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "3rem",
          marginBottom: "3rem"
        }}>
          {/* Coluna 1: Logo e descrição */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
              <img src="/logo.png" alt="Northron Security" style={{ width: "40px", height: "40px", objectFit: "contain" }} />
              <div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontWeight: 700, color: "hsl(45 20% 92%)" }}>
                  NORTHRON
                </div>
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.55rem", fontWeight: 600, letterSpacing: "0.2em", color: "hsl(43 89% 52%)", textTransform: "uppercase" }}>
                  Security
                </div>
              </div>
            </div>
            <p style={{ color: "hsl(0 0% 55%)", fontSize: "0.875rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
              Treinamento e proteção canina profissional em Natal RN. Comprometidos com resultados reais e bem-estar animal.
            </p>
            {/* Redes sociais */}
            <div style={{ display: "flex", gap: "1rem" }}>
              <a
                href="https://instagram.com/northronsecurity"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: "36px",
                  height: "36px",
                  border: "1px solid hsl(43 89% 52% / 0.3)",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "hsl(43 89% 52%)",
                  transition: "all 0.3s ease",
                  textDecoration: "none"
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "hsl(43 89% 52% / 0.15)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "hsl(43 89% 52%)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "hsl(43 89% 52% / 0.3)";
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://wa.me/5584921440536"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: "36px",
                  height: "36px",
                  border: "1px solid hsl(43 89% 52% / 0.3)",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "hsl(43 89% 52%)",
                  transition: "all 0.3s ease",
                  textDecoration: "none"
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "hsl(43 89% 52% / 0.15)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "hsl(43 89% 52%)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "hsl(43 89% 52% / 0.3)";
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.255.949L2 3l1.395 5.233A11.955 11.955 0 002 12c0 6.627 5.373 12 12 12s12-5.373 12-12S18.627 0 12 0z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Coluna 2: Serviços */}
          <div>
            <h4 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.2em", color: "hsl(43 89% 52%)", textTransform: "uppercase", marginBottom: "1.25rem" }}>
              Serviços
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[
                { href: "/treinamentos", label: "Adestramento Básico" },
                { href: "/treinamentos", label: "Adestramento Intermediário" },
                { href: "/treinamentos", label: "Adestramento Avançado" },
                { href: "/guarda-protecao", label: "Cão de Guarda" },
                { href: "/guarda-protecao", label: "Cão de Proteção Pessoal" },
                { href: "/planos", label: "Consultorias" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  style={{
                    color: "hsl(0 0% 55%)",
                    fontSize: "0.875rem",
                    textDecoration: "none",
                    transition: "color 0.2s ease"
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "hsl(43 89% 52%)"}
                  onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "hsl(0 0% 55%)"}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Coluna 3: Empresa */}
          <div>
            <h4 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.2em", color: "hsl(43 89% 52%)", textTransform: "uppercase", marginBottom: "1.25rem" }}>
              Empresa
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[
                { href: "/sobre", label: "Sobre Nós" },
                { href: "/metodologia", label: "Nossa Metodologia" },
                { href: "/resultados", label: "Resultados" },
                { href: "/faq", label: "Perguntas Frequentes" },
                { href: "/promocoes", label: "Promoções" },
                { href: "/contato", label: "Contato" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  style={{
                    color: "hsl(0 0% 55%)",
                    fontSize: "0.875rem",
                    textDecoration: "none",
                    transition: "color 0.2s ease"
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "hsl(43 89% 52%)"}
                  onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "hsl(0 0% 55%)"}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Coluna 4: Contato */}
          <div>
            <h4 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.2em", color: "hsl(43 89% 52%)", textTransform: "uppercase", marginBottom: "1.25rem" }}>
              Contato
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <div style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", color: "hsl(0 0% 45%)", textTransform: "uppercase", marginBottom: "0.25rem" }}>WhatsApp</div>
                <a href="https://wa.me/5584921440536" target="_blank" rel="noopener noreferrer" style={{ color: "hsl(45 20% 85%)", fontSize: "0.9rem", textDecoration: "none" }}>
                  (84) 9 2144-0536
                </a>
              </div>
              <div>
                <div style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", color: "hsl(0 0% 45%)", textTransform: "uppercase", marginBottom: "0.25rem" }}>Email</div>
                <a href="mailto:snorthron@gmail.com" style={{ color: "hsl(45 20% 85%)", fontSize: "0.9rem", textDecoration: "none" }}>
                  snorthron@gmail.com
                </a>
              </div>
              <div>
                <div style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", color: "hsl(0 0% 45%)", textTransform: "uppercase", marginBottom: "0.25rem" }}>Localização</div>
                <span style={{ color: "hsl(45 20% 85%)", fontSize: "0.9rem" }}>
                  Natal RN · Ceará-Mirim RN<br />
                  e região metropolitana
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Linha divisória */}
        <div style={{ borderTop: "1px solid hsl(0 0% 12%)", paddingTop: "2rem", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
          <p style={{ color: "hsl(0 0% 40%)", fontSize: "0.8rem" }}>
            © {year} Northron Security. Todos os direitos reservados.
          </p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <Link href="/orcamento" style={{ color: "hsl(43 89% 52%)", fontSize: "0.8rem", textDecoration: "none", fontWeight: 600 }}>
              Solicitar Avaliação
            </Link>
            <Link href="/promocoes" style={{ color: "hsl(0 0% 50%)", fontSize: "0.8rem", textDecoration: "none" }}>
              Promoções
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
