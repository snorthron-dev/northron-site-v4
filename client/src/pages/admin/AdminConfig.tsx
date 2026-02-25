import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

/**
 * Página administrativa de configurações. Permite que o administrador visualize
 * todas as configurações armazenadas no backend (valores dos serviços, descontos,
 * mensagens, etc.) e altere os valores sem precisar editar código. Ao
 * submeter uma alteração, a página chama a mutação do TRPC que persiste o novo
 * valor e recarrega a lista. Somente administradores têm acesso.
 */
export default function AdminConfig() {
  const utils = trpc.useUtils();
  const { data: settings, isLoading } = trpc.config.listar.useQuery();
  const atualizarMutation = trpc.config.atualizar.useMutation({
    onSuccess: () => {
      toast.success("Configuração atualizada com sucesso");
      utils.config.listar.invalidate();
    },
    onError: (err) => toast.error(err.message),
  });
  // Local state para valores editáveis; chave -> string
  const [localValues, setLocalValues] = useState<Record<string, string>>({});
  // Atualiza valor local quando input muda
  const handleChange = (key: string, value: string) => {
    setLocalValues((prev) => ({ ...prev, [key]: value }));
  };
  const handleSave = (key: string) => {
    const value = (localValues[key] !== undefined ? localValues[key] : settings?.find((s: any) => s.key === key)?.value) ?? "";
    atualizarMutation.mutate({ key, value });
  };
  return (
    <AdminLayout requireAdmin>
      <div className="p-8">
        <div className="mb-8">
          <p className="text-[#c9a84c] text-xs font-bold tracking-widest uppercase mb-1">Painel Administrativo</p>
          <h1 className="text-white text-2xl font-bold">Configurações</h1>
          <p className="text-white/40 text-sm mt-1">Gerencie valores e textos do site</p>
        </div>
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-[#c9a84c] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : settings && settings.length > 0 ? (
          <div className="space-y-4">
            {settings.map((setting: any) => (
              <div key={setting.key} className="bg-[#111111] border border-white/10 rounded-xl p-5">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold mb-1">{setting.key}</p>
                    <p className="text-white/40 text-xs mb-2">Valor atual: {setting.value || ""}</p>
                    <input
                      type="text"
                      value={localValues[setting.key] !== undefined ? localValues[setting.key] : setting.value || ""}
                      onChange={(e) => handleChange(setting.key, e.target.value)}
                      className="w-full md:w-96 bg-[#1a1a1a] border border-white/10 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-[#c9a84c]/50"
                    />
                  </div>
                  <div className="flex-shrink-0">
                    <button
                      onClick={() => handleSave(setting.key)}
                      className="bg-[#c9a84c] hover:bg-[#b38d2b] text-black font-medium text-sm px-4 py-2 rounded-lg transition-colors"
                    >
                      Salvar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-white/40">Nenhuma configuração encontrada.</p>
        )}
      </div>
    </AdminLayout>
  );
}