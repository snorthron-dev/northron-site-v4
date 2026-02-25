import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/sobre", label: "Sobre" },
  { href: "/treinamentos", label: "Treinamentos" },
  { href: "/aluguel-obra", label: "Obras" },
  { href: "/aluguel-festa", label: "Festas" },
  { href: "/curso", label: "Curso" },
  { href: "/guarda-protecao", label: "Guarda & Proteção" },
  { href: "/planos", label: "Planos" },
  { href: "/resultados", label: "Resultados" },
  { href: "/faq", label: "FAQ" },
  { href: "/contato", label: "Contato" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fechar menu ao navegar
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <nav className={`navbar ${scrolled ? "navbar-scrolled" : "navbar-transparent"}`}>
      <div className="container">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "72px" }}>
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none" }}>
            <img
              src="/logo.png"
              alt="Northron Security"
              style={{ width: "44px", height: "44px", objectFit: "contain" }}
            />
            <div>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "hsl(45 20% 92%)",
                lineHeight: 1.1,
                letterSpacing: "-0.01em"
              }}>
                NORTHRON
              </div>
              <div style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.6rem",
                fontWeight: 600,
                letterSpacing: "0.2em",
                color: "hsl(43 89% 52%)",
                textTransform: "uppercase"
              }}>
                Security
              </div>
            </div>
          </Link>

          {/* Links desktop */}
          <div style={{ display: "flex", alignItems: "center", gap: "1.75rem" }} className="hidden-mobile">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${location === link.href ? "active" : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA + Hamburguer */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <Link href="/orcamento" className="btn-gold hidden-mobile" style={{ fontSize: "0.75rem", padding: "0.625rem 1.25rem" }}>
              Solicitar Avaliação
            </Link>

            {/* Hamburguer */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="show-mobile"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "5px"
              }}
              aria-label="Menu"
            >
              <span style={{
                display: "block",
                width: "24px",
                height: "2px",
                background: menuOpen ? "hsl(43 89% 52%)" : "hsl(45 20% 92%)",
                transition: "all 0.3s ease",
                transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none"
              }} />
              <span style={{
                display: "block",
                width: "24px",
                height: "2px",
                background: "hsl(43 89% 52%)",
                transition: "all 0.3s ease",
                opacity: menuOpen ? 0 : 1
              }} />
              <span style={{
                display: "block",
                width: "24px",
                height: "2px",
                background: menuOpen ? "hsl(43 89% 52%)" : "hsl(45 20% 92%)",
                transition: "all 0.3s ease",
                transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none"
              }} />
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div style={{
          background: "hsl(0 0% 5%)",
          borderTop: "1px solid hsl(43 89% 52% / 0.2)",
          padding: "1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem"
        }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.875rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: location === link.href ? "hsl(43 89% 52%)" : "hsl(0 0% 75%)",
                textDecoration: "none",
                padding: "0.5rem 0",
                borderBottom: "1px solid hsl(0 0% 12%)"
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/orcamento" className="btn-gold" style={{ marginTop: "0.5rem", textAlign: "center" }}>
            Solicitar Avaliação Gratuita
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 901px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
