import { Link } from "wouter";
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";

export default function AdminDashboard() {
  const { data: stats, isLoading } = trpc.admin.stats.useQuery();

  const totalOrcamentos = stats?.orcamentosStatus?.reduce((a: number, s: { total: number }) => a + Number(s.total), 0) ?? 0;
  const novosOrcamentos = Number(stats?.orcamentosStatus?.find((s: { status: string }) => s.status === "novo")?.total ?? 0);
  const totalViews = stats?.totalViews ?? 0;

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="mb-8">
          <p className="text-[#c9a84c] text-xs font-bold tracking-widest uppercase mb-1">Painel Administrativo</p>
          <h1 className="text-white text-2xl font-bold">Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { label: "Total de Orçamentos", value: isLoading ? "—" : totalOrcamentos, href: "/admin/orcamentos" },
            { label: "Novos (aguardando)", value: isLoading ? "—" : novosOrcamentos, href: "/admin/orcamentos" },
            { label: "Visitas (30 dias)", value: isLoading ? "—" : totalViews, href: "#" },
          ].map((card) => (
            <Link key={card.label} href={card.href}>
              <div className="bg-[#111111] border border-white/10 rounded-xl p-6 hover:border-[#c9a84c]/30 transition-all cursor-pointer">
                <p className="text-4xl font-bold text-[#c9a84c] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{card.value}</p>
                <p className="text-white/40 text-xs uppercase tracking-wider font-semibold">{card.label}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Link href="/admin/orcamentos">
            <div className="bg-[#111111] border border-white/10 rounded-xl p-5 hover:border-[#c9a84c]/30 transition-all cursor-pointer">
              <p className="text-[#c9a84c] font-bold mb-1">→ Ver Orçamentos</p>
              <p className="text-white/40 text-sm">Gerenciar solicitações de avaliação</p>
            </div>
          </Link>
          <Link href="/admin/leads">
            <div className="bg-[#111111] border border-white/10 rounded-xl p-5 hover:border-[#c9a84c]/30 transition-all cursor-pointer">
              <p className="text-[#c9a84c] font-bold mb-1">→ Lista de Espera</p>
              <p className="text-white/40 text-sm">Inscritos para receber promoções</p>
            </div>
          </Link>
        </div>

        {stats?.pageStats && stats.pageStats.length > 0 && (
          <div className="bg-[#111111] border border-white/10 rounded-xl p-6">
            <h2 className="text-white font-semibold mb-4">Páginas mais visitadas (30 dias)</h2>
            <div className="space-y-3">
              {stats.pageStats.slice(0, 8).map((page: { pagina: string; total: number }) => {
                const max = stats.pageStats[0]?.total || 1;
                const pct = Math.round((Number(page.total) / Number(max)) * 100);
                return (
                  <div key={page.pagina} className="flex items-center gap-3">
                    <p className="text-white/50 text-sm w-32 truncate">{page.pagina}</p>
                    <div className="flex-1 bg-white/5 rounded-full h-2">
                      <div className="h-2 rounded-full bg-gradient-to-r from-[#c9a84c] to-[#8b6914]" style={{ width: `${pct}%` }} />
                    </div>
                    <p className="text-white/40 text-sm w-8 text-right">{page.total}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
