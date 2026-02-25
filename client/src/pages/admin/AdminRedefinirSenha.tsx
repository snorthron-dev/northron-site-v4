import { useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { useAdminAuth } from "@/hooks/useAdminAuth";

export default function AdminRedefinirSenha() {
  const [, navigate] = useLocation();
  const { adminUser, refetch } = useAdminAuth();
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const trocarSenhaMutation = trpc.adminAuth.trocarSenha.useMutation({
    onSuccess: async () => {
      toast.success("Senha redefinida com sucesso! Bem-vindo ao painel.");
      await refetch();
      navigate("/admin");
    },
    onError: (err) => {
      toast.error(err.message || "Erro ao redefinir senha.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (novaSenha !== confirmarSenha) {
      toast.error("As senhas não coincidem.");
      return;
    }
    if (novaSenha.length < 6) {
      toast.error("A nova senha deve ter pelo menos 6 caracteres.");
      return;
    }
    trocarSenhaMutation.mutate({ senhaAtual, novaSenha });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#c9a84c] to-[#8b6914] flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-white text-2xl font-bold mb-2">Redefina sua senha</h1>
          <p className="text-white/40 text-sm">
            {adminUser?.primeiroAcesso
              ? "Por segurança, você precisa criar uma nova senha antes de continuar."
              : "Crie uma nova senha para sua conta."}
          </p>
        </div>

        <div className="bg-[#111111] border border-white/10 rounded-2xl p-8 shadow-2xl">
          {adminUser?.primeiroAcesso && (
            <div className="bg-[#c9a84c]/10 border border-[#c9a84c]/20 rounded-lg p-3 mb-6">
              <p className="text-[#c9a84c] text-xs text-center">
                ⚠️ Primeiro acesso detectado — crie uma senha pessoal agora
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-white/70 text-sm font-medium mb-2 uppercase tracking-wider">
                Senha Atual (temporária)
              </label>
              <input
                type="password"
                value={senhaAtual}
                onChange={(e) => setSenhaAtual(e.target.value)}
                placeholder="Senha fornecida pelo administrador"
                className="w-full bg-[#1a1a1a] border border-white/10 text-white placeholder-white/20 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#c9a84c]/60 focus:ring-1 focus:ring-[#c9a84c]/30 transition-all"
              />
            </div>

            <div>
              <label className="block text-white/70 text-sm font-medium mb-2 uppercase tracking-wider">
                Nova Senha
              </label>
              <input
                type="password"
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
                placeholder="Mínimo 6 caracteres"
                className="w-full bg-[#1a1a1a] border border-white/10 text-white placeholder-white/20 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#c9a84c]/60 focus:ring-1 focus:ring-[#c9a84c]/30 transition-all"
              />
            </div>

            <div>
              <label className="block text-white/70 text-sm font-medium mb-2 uppercase tracking-wider">
                Confirmar Nova Senha
              </label>
              <input
                type="password"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                placeholder="Repita a nova senha"
                className={`w-full bg-[#1a1a1a] border text-white placeholder-white/20 rounded-lg px-4 py-3 text-sm focus:outline-none transition-all ${
                  confirmarSenha && novaSenha !== confirmarSenha
                    ? "border-red-500/50 focus:border-red-500/70"
                    : "border-white/10 focus:border-[#c9a84c]/60 focus:ring-1 focus:ring-[#c9a84c]/30"
                }`}
              />
              {confirmarSenha && novaSenha !== confirmarSenha && (
                <p className="text-red-400 text-xs mt-1">As senhas não coincidem</p>
              )}
            </div>

            <button
              type="submit"
              disabled={trocarSenhaMutation.isPending || (!!confirmarSenha && novaSenha !== confirmarSenha)}
              className="w-full bg-gradient-to-r from-[#c9a84c] to-[#8b6914] text-black font-bold py-3 rounded-lg uppercase tracking-widest text-sm hover:from-[#d4b56a] hover:to-[#9a7820] transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {trocarSenhaMutation.isPending ? "Salvando..." : "Salvar Nova Senha"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
