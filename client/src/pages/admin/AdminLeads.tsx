import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";

export default function AdminLeads() {
  const { data: leads, isLoading } = trpc.admin.listarListaEspera.useQuery({ limit: 200, offset: 0 });

  return (
    <AdminLayout requireAdmin>
      <div className="p-8">
        <div className="mb-8">
          <p className="text-[#c9a84c] text-xs font-bold tracking-widest uppercase mb-1">Painel Administrativo</p>
          <h1 className="text-white text-2xl font-bold">Lista de Espera</h1>
          <p className="text-white/40 text-sm mt-1">Clientes inscritos para receber promoções</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-[#c9a84c] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : leads && leads.length === 0 ? (
          <div className="text-center py-20 bg-[#111111] border border-white/10 rounded-xl">
            <p className="text-white/30 text-lg mb-2">Nenhum inscrito ainda</p>
            <p className="text-white/20 text-sm">Os inscritos aparecerão aqui quando clientes se cadastrarem na página de Promoções.</p>
          </div>
        ) : leads && leads.length > 0 ? (
          <>
            <div className="bg-[#111111] border border-white/10 rounded-xl overflow-hidden">
              <div className="grid grid-cols-4 gap-4 px-5 py-3 border-b border-white/5 text-white/30 text-xs uppercase tracking-wider font-semibold">
                <span>Nome</span>
                <span>WhatsApp</span>
                <span>Email</span>
                <span>Interesse / Data</span>
              </div>
              {leads.map((lead) => (
                <div key={lead.id} className="grid grid-cols-4 gap-4 px-5 py-4 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                  <p className="text-white text-sm font-medium truncate">{lead.nome}</p>
                  <p className="text-white/60 text-sm truncate">
                    {lead.whatsapp ? (
                      <a
                        href={`https://wa.me/${lead.whatsapp.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-400 hover:text-green-300 transition-colors"
                      >
                        {lead.whatsapp}
                      </a>
                    ) : "—"}
                  </p>
                  <p className="text-white/60 text-sm truncate">{lead.email || "—"}</p>
                  <div>
                    <p className="text-[#c9a84c] text-xs">{lead.interesse || "geral"}</p>
                    <p className="text-white/20 text-xs mt-0.5">{new Date(lead.createdAt).toLocaleDateString("pt-BR")}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-white/20 text-xs mt-4 text-right">{leads.length} inscrito{leads.length !== 1 ? "s" : ""} no total</p>
          </>
        ) : null}
      </div>
    </AdminLayout>
  );
}
