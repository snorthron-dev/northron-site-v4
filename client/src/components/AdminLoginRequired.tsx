import { getLoginUrl } from "@/const";

export default function AdminLoginRequired() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "hsl(0 0% 4%)",
    }}>
      <div style={{
        textAlign: "center",
        padding: "3rem 2rem",
        background: "hsl(0 0% 7%)",
        border: "1px solid hsl(0 0% 13%)",
        borderRadius: "4px",
        maxWidth: "400px",
        width: "90%",
      }}>
        {/* Logo / ícone */}
        <div style={{
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: "hsl(43 89% 52% / 0.1)",
          border: "1px solid hsl(43 89% 52% / 0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 1.5rem",
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="hsl(43 89% 52%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
        </div>

        <div style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "0.65rem",
          fontWeight: 700,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "hsl(43 89% 52%)",
          marginBottom: "0.75rem",
        }}>
          Painel Administrativo
        </div>

        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "1.5rem",
          fontWeight: 700,
          color: "hsl(45 20% 92%)",
          marginBottom: "0.75rem",
        }}>
          Acesso Restrito
        </h2>

        <p style={{
          color: "hsl(0 0% 55%)",
          fontSize: "0.875rem",
          lineHeight: 1.7,
          marginBottom: "2rem",
        }}>
          Faça login com sua conta Manus para acessar o painel de administração da Northron Security.
        </p>

        <a
          href={getLoginUrl()}
          style={{
            display: "inline-block",
            padding: "0.875rem 2rem",
            background: "hsl(43 89% 52%)",
            color: "hsl(0 0% 5%)",
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            textDecoration: "none",
            borderRadius: "2px",
            transition: "background 0.2s ease",
            width: "100%",
            boxSizing: "border-box" as const,
          }}
          onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = "hsl(43 89% 62%)"}
          onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = "hsl(43 89% 52%)"}
        >
          Entrar com Manus
        </a>

        <div style={{ marginTop: "1.5rem" }}>
          <a href="/" style={{
            color: "hsl(0 0% 40%)",
            fontSize: "0.8rem",
            textDecoration: "none",
          }}>
            ← Voltar ao site
          </a>
        </div>
      </div>
    </div>
  );
}
