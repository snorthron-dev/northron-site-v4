import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const statusLabel: Record<string, string> = {
  novo: "Novo",
  em_contato: "Em Contato",
  fechado: "Fechado",
  cancelado: "Cancelado",
};

const statusColor: Record<string, string> = {
  novo: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  em_contato: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  fechado: "bg-green-500/10 text-green-400 border-green-500/20",
  cancelado: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function AdminOrcamentos() {
  const utils = trpc.useUtils();
  const { data: orcamentos, isLoading } = trpc.admin.listarOrcamentos.useQuery({ limit: 100, offset: 0 });

  const atualizarMutation = trpc.admin.atualizarStatusOrcamento.useMutation({
    onSuccess: () => {
      utils.admin.listarOrcamentos.invalidate();
    },
    onError: (err) => toast.error(err.message),
  });

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="mb-8">
          <p className="text-[#c9a84c] text-xs font-bold tracking-widest uppercase mb-1">Painel Administrativo</p>
          <h1 className="text-white text-2xl font-bold">Orçamentos</h1>
          <p className="text-white/40 text-sm mt-1">Solicitações de avaliação recebidas</p>
        </div>

        {isLoading && (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-[#c9a84c] border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        {!isLoading && orcamentos && orcamentos.length === 0 && (
          <div className="text-center py-20 bg-[#111111] border border-white/10 rounded-xl">
            <p className="text-white/30 text-lg mb-2">Nenhum orçamento ainda</p>
            <p className="text-white/20 text-sm">As solicitações aparecerão aqui quando clientes preencherem o formulário.</p>
          </div>
        )}
        {!isLoading && orcamentos && orcamentos.length > 0 && (
          <div className="space-y-3">
            {orcamentos.map((o) => (
              <div key={o.id} className="bg-[#111111] border border-white/10 rounded-xl p-5">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <p className="text-white font-semibold">{o.nome}</p>
                      <span className={"text-xs px-2 py-0.5 rounded-full border " + (statusColor[o.status] || statusColor.novo)}>
                        {statusLabel[o.status] || o.status}
                      </span>
                    </div>
                    <p className="text-[#c9a84c] text-sm font-medium mb-1">{o.servico}</p>
                    {o.raca && <p className="text-white/40 text-xs mb-1">Raça: {o.raca}</p>}
                    <p className="text-white/60 text-sm mt-2 leading-relaxed">{o.mensagem}</p>
                    <div className="flex gap-4 mt-3 flex-wrap">
                      <a
                        href={"https://wa.me/" + o.telefone.replace(/\D/g, "") + "?text=Olá " + o.nome + "! Vi sua solicitação de orçamento para " + o.servico + ". Vamos conversar?"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-400 hover:text-green-300 text-sm transition-colors"
                      >
                        📱 {o.telefone}
                      </a>
                      {o.email && (
                        <a href={"mailto:" + o.email} className="text-white/40 hover:text-white/70 text-sm transition-colors">
                          {o.email}
                        </a>
                      )}
                    </div>
                    <p className="text-white/20 text-xs mt-2">
                      {new Date(o.createdAt).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <select
                      value={o.status}
                      onChange={(e) => atualizarMutation.mutate({ id: o.id, status: e.target.value as any })}
                      className="bg-[#1a1a1a] border border-white/10 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-[#c9a84c]/50"
                    >
                      <option value="novo">Novo</option>
                      <option value="em_contato">Em Contato</option>
                      <option value="fechado">Fechado</option>
                      <option value="cancelado">Cancelado</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
