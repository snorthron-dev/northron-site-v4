import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

// Labels and colors for each status of a aluguel
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

/**
 * Página do painel administrativo para gerenciar solicitações de aluguel de cães
 * para canteiros de obras. Lista todas as solicitações recebidas, com dados de
 * contato, quantidade de cães e duração do contrato. Permite ao funcionário
 * atualizar o status de cada solicitação. Apenas usuários autenticados podem
 * acessar esta página (AdminLayout cuida da proteção).
 */
export default function AdminAluguelObra() {
  const utils = trpc.useUtils();
  // Busca a lista de solicitações; usa paginação simples
  const { data: alugueis, isLoading } = trpc.aluguelObra.listar.useQuery({ limit: 100, offset: 0 });
  const atualizarMutation = trpc.aluguelObra.atualizarStatus.useMutation({
    onSuccess: () => {
      utils.aluguelObra.listar.invalidate();
    },
    onError: (err) => toast.error(err.message),
  });

  // Formata valores em centavos para BRL
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value / 100);
  };

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="mb-8">
          <p className="text-[#c9a84c] text-xs font-bold tracking-widest uppercase mb-1">Painel Administrativo</p>
          <h1 className="text-white text-2xl font-bold">Aluguel para Obras</h1>
          <p className="text-white/40 text-sm mt-1">Solicitações de cães para canteiros de obra</p>
        </div>

        {isLoading && (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-[#c9a84c] border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        {!isLoading && alugueis && alugueis.length === 0 && (
          <div className="text-center py-20 bg-[#111111] border border-white/10 rounded-xl">
            <p className="text-white/30 text-lg mb-2">Nenhuma solicitação ainda</p>
            <p className="text-white/20 text-sm">As solicitações aparecerão aqui quando clientes enviarem o formulário.</p>
          </div>
        )}
        {!isLoading && alugueis && alugueis.length > 0 && (
          <div className="space-y-3">
            {alugueis.map((aluguel) => (
              <div key={aluguel.id} className="bg-[#111111] border border-white/10 rounded-xl p-5">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <p className="text-white font-semibold">{aluguel.nome}</p>
                      <span className={"text-xs px-2 py-0.5 rounded-full border " + (statusColor[aluguel.status] || statusColor.novo)}>
                        {statusLabel[aluguel.status] || aluguel.status}
                      </span>
                    </div>
                    <p className="text-[#c9a84c] text-sm font-medium mb-1">{aluguel.quantidadeCaes} cão/ães • {aluguel.duracaoMeses} meses</p>
                    <p className="text-white/40 text-xs mb-1">Valor estimado: {formatCurrency(aluguel.valorEstimado)}</p>
                    {aluguel.mensagem && <p className="text-white/60 text-sm mt-2 leading-relaxed whitespace-pre-wrap">{aluguel.mensagem}</p>}
                    <div className="flex gap-4 mt-3 flex-wrap">
                      <a
                        href={"https://wa.me/" + aluguel.telefone.replace(/\D/g, "") + "?text=Olá " + aluguel.nome + "! Vi sua solicitação de aluguel para obra. Vamos conversar?"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-400 hover:text-green-300 text-sm transition-colors"
                      >
                        📱 {aluguel.telefone}
                      </a>
                      {aluguel.email && (
                        <a href={"mailto:" + aluguel.email} className="text-white/40 hover:text-white/70 text-sm transition-colors">
                          {aluguel.email}
                        </a>
                      )}
                    </div>
                    <p className="text-white/20 text-xs mt-2">
                      {new Date(aluguel.createdAt).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <select
                      value={aluguel.status}
                      onChange={(e) => atualizarMutation.mutate({ id: aluguel.id, status: e.target.value as any })}
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