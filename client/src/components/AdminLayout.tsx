import { useEffect } from "react";
import { useLocation, Link } from "wouter";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { toast } from "sonner";

interface AdminLayoutProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export default function AdminLayout({ children, requireAdmin = false }: AdminLayoutProps) {
  const [location, navigate] = useLocation();
  const { adminUser, isLoading, isAuthenticated, isAdmin, logout } = useAdminAuth();

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) {
      navigate("/admin/login");
      return;
    }
    if (adminUser?.primeiroAcesso && location !== "/admin/redefinir-senha") {
      navigate("/admin/redefinir-senha");
      return;
    }
    if (requireAdmin && !isAdmin) {
      toast.error("Acesso restrito ao administrador.");
      navigate("/admin");
    }
  }, [isLoading, isAuthenticated, adminUser, location]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-[#c9a84c] border-t-transparent rounded-full animate-spin" />
          <p className="text-white/40 text-sm">Verificando acesso...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  const navItems = [
    {
      href: "/admin",
      label: "Dashboard",
      // Ícone de dashboard: quatro quadrados
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ),
      roles: ["admin", "adestrador", "recepcao"],
    },
    {
      href: "/admin/orcamentos",
      label: "Orçamentos",
      // Ícone de documento para orçamentos
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      roles: ["admin", "adestrador", "recepcao"],
    },
    {
      href: "/admin/aluguel-obra",
      label: "Aluguel Obras",
      // Ícone de prédio para aluguel de cães em obras
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-9a1 1 0 011-1h3V3h4v8h6V3h4v8h3a1 1 0 011 1v9" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 12v9m4-9v9M7 12v9m-4-4h18" />
        </svg>
      ),
      roles: ["admin", "adestrador", "recepcao"],
    },
    {
      href: "/admin/aluguel-festa",
      label: "Aluguel Festas",
      // Ícone de estrela/celebração para aluguel de festas
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ),
      roles: ["admin", "adestrador", "recepcao"],
    },
    {
      href: "/admin/leads",
      label: "Lista de Espera",
      // Ícone de pessoas para lista de espera (promoções)
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      roles: ["admin"],
    },
    {
      href: "/admin/cursos",
      label: "Cursos",
      // Ícone de livro para cursos
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20h9M12 4h9M4 6h7v4H4zm0 6h7v4H4z" />
        </svg>
      ),
      roles: ["admin"],
    },
    {
      href: "/admin/funcionarios",
      label: "Funcionários",
      // Ícone de usuários para funcionários
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      roles: ["admin"],
    },
    {
      href: "/admin/config",
      label: "Configurações",
      // Ícone de engrenagem para configurações
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.591 1.066c1.541-.94 3.44.96 2.5 2.5a1.724 1.724 0 001.065 2.591c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.591c.94 1.541-.959 3.441-2.5 2.5a1.724 1.724 0 00-2.591 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.591-1.066c-1.541.94-3.441-.959-2.5-2.5a1.724 1.724 0 00-1.066-2.591c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.591c-.94-1.541.959-3.44 2.5-2.5.968.591 2.207.104 2.591-1.066z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      roles: ["admin"],
    },
  ];

  const visibleNav = navItems.filter(item =>
    item.roles.includes(adminUser?.cargo || "recepcao")
  );

  const cargoLabel = {
    admin: "Administrador",
    adestrador: "Adestrador",
    recepcao: "Recepção",
  }[adminUser?.cargo || "recepcao"];

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0d0d0d] border-r border-white/5 flex flex-col fixed h-full z-20">
        {/* Logo */}
        <div className="p-6 border-b border-white/5">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#c9a84c] to-[#8b6914] flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <div>
              <p className="text-[#c9a84c] font-bold text-sm tracking-widest uppercase">Northron</p>
              <p className="text-white/30 text-[10px] tracking-widest uppercase">Admin</p>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {visibleNav.map((item) => {
            const isActive = location === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                  isActive
                    ? "bg-[#c9a84c]/15 text-[#c9a84c] border border-[#c9a84c]/20"
                    : "text-white/50 hover:text-white/80 hover:bg-white/5"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User info + logout */}
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 mb-3">
            {adminUser?.fotoUrl ? (
              <img
                src={adminUser.fotoUrl}
                alt={adminUser.nomeCompleto || adminUser.username}
                className="w-9 h-9 rounded-full object-cover border border-white/10"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-[#1a1a1a] border border-white/10 flex items-center justify-center text-white/50 text-sm font-bold">
                {(adminUser?.nomeCompleto || adminUser?.username || "?")[0].toUpperCase()}
              </div>
            )}
            <div className="min-w-0">
              <p className="text-white text-sm font-medium truncate">
                {adminUser?.nomeCompleto || adminUser?.username}
              </p>
              <p className="text-[#c9a84c]/70 text-xs">{cargoLabel}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link
              href="/admin/meu-perfil"
              className="flex-1 text-center text-white/40 hover:text-white/70 text-xs py-1.5 rounded border border-white/5 hover:border-white/10 transition-all"
            >
              Meu Perfil
            </Link>
            <button
              onClick={() => {
                logout();
                navigate("/admin/login");
              }}
              className="flex-1 text-center text-white/40 hover:text-red-400 text-xs py-1.5 rounded border border-white/5 hover:border-red-500/20 transition-all"
            >
              Sair
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-64 min-h-screen">
        {children}
      </main>
    </div>
  );
}
