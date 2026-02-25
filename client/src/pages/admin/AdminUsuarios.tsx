import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";

export default function AdminUsuarios() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div style={{ minHeight: "100vh", background: "hsl(0 0% 4%)", display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ color: "hsl(43 89% 52%)" }}>Carregando...</div></div>;
  if (!isAuthenticated) return <div style={{ minHeight: "100vh", background: "hsl(0 0% 4%)", display: "flex", alignItems: "center", justifyContent: "center" }}><Link href="/" style={{ color: "hsl(43 89% 52%)" }}>Voltar</Link></div>;

  return (
    <div style={{ minHeight: "100vh", background: "hsl(0 0% 4%)", paddingTop: "72px" }}>
      <div className="container" style={{ padding: "3rem 1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <div>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "hsl(43 89% 52%)", marginBottom: "0.5rem" }}>Admin</div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, color: "hsl(45 20% 92%)" }}>Usuários</h1>
          </div>
          <Link href="/admin" style={{ color: "hsl(0 0% 50%)", fontSize: "0.8rem", textDecoration: "none" }}>← Voltar</Link>
        </div>
        <div style={{ padding: "2rem", background: "hsl(0 0% 7%)", border: "1px solid hsl(0 0% 13%)", borderRadius: "4px", color: "hsl(0 0% 55%)", fontSize: "0.9rem" }}>
          Gerenciamento de usuários disponível via painel de banco de dados.
        </div>
      </div>
    </div>
  );
}
