import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";

/**
 * Página administrativa para visualizar a lista de interessados no curso de adestramento.
 * Apenas o administrador principal pode acessar essa página (AdminLayout com requireAdmin).
 * Lista as inscrições com nome, WhatsApp, cidade, nível de interesse e data. Não há
 * alteração de status aqui, apenas leitura e contatos via WhatsApp.
 */
export default function AdminCursos() {
  const { data: interesses, isLoading } = trpc.curso.listar.useQuery({ limit: 200, offset: 0 });
  return (
    <AdminLayout requireAdmin>
      <div className="p-8">
        <div className="mb-8">
          <p className="text-[#c9a84c] text-xs font-bold tracking-widest uppercase mb-1">Painel Administrativo</p>
          <h1 className="text-white text-2xl font-bold">Interesse no Curso</h1>
          <p className="text-white/40 text-sm mt-1">Pessoas interessadas no curso de adestramento</p>
        </div>
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-[#c9a84c] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : interesses && interesses.length === 0 ? (
          <div className="text-center py-20 bg-[#111111] border border-white/10 rounded-xl">
            <p className="text-white/30 text-lg mb-2">Nenhuma inscrição ainda</p>
            <p className="text-white/20 text-sm">As inscrições aparecerão aqui quando clientes preencherem o formulário de interesse.</p>
          </div>
        ) : interesses && interesses.length > 0 ? (
          <>
            <div className="bg-[#111111] border border-white/10 rounded-xl overflow-hidden">
              <div className="grid grid-cols-5 gap-4 px-5 py-3 border-b border-white/5 text-white/30 text-xs uppercase tracking-wider font-semibold">
                <span>Nome</span>
                <span>WhatsApp</span>
                <span>Cidade</span>
                <span>Nível de interesse</span>
                <span>Data</span>
              </div>
              {interesses.map((item) => (
                <div key={item.id} className="grid grid-cols-5 gap-4 px-5 py-4 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                  <p className="text-white text-sm font-medium truncate">{item.nome}</p>
                  <p className="text-white/60 text-sm truncate">
                    {item.whatsapp ? (
                      <a
                        href={`https://wa.me/${item.whatsapp.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-400 hover:text-green-300 transition-colors"
                      >
                        {item.whatsapp}
                      </a>
                    ) : "—"}
                  </p>
                  <p className="text-white/60 text-sm truncate">{item.cidade || "—"}</p>
                  <p className="text-[#c9a84c] text-xs truncate">{item.nivelInteresse || "—"}</p>
                  <p className="text-white/20 text-xs truncate">
                    {new Date(item.createdAt).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" })}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-white/20 text-xs mt-4 text-right">
              {interesses.length} inscrito{interesses.length !== 1 ? "s" : ""} no total
            </p>
          </>
        ) : null}
      </div>
    </AdminLayout>
  );
}