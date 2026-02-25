import { useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function AdminLogin() {
  const [, navigate] = useLocation();
  const [username, setUsername] = useState("");
  const [senha, setSenha] = useState("");
  const [showSenha, setShowSenha] = useState(false);

  const utils = trpc.useUtils();

  const loginMutation = trpc.adminAuth.login.useMutation({
    onSuccess: (data) => {
      toast.success(`Bem-vindo, ${data.nomeCompleto || data.username}!`);
      // Full page reload ensures the cookie is read before rendering admin layout
      const destino = data.primeiroAcesso ? "/admin/redefinir-senha" : "/admin";
      setTimeout(() => { window.location.href = destino; }, 600);
    },
    onError: (err) => {
      toast.error(err.message || "Erro ao fazer login. Verifique suas credenciais.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !senha.trim()) {
      toast.error("Preencha o username e a senha.");
      return;
    }
    loginMutation.mutate({ username: username.trim(), senha });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      {/* Background subtle pattern */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #c9a84c 0%, transparent 50%), radial-gradient(circle at 75% 75%, #c9a84c 0%, transparent 50%)`
        }}
      />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#c9a84c] to-[#8b6914] flex items-center justify-center">
              <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <div className="text-left">
              <p className="text-[#c9a84c] font-bold text-xl tracking-widest uppercase">Northron</p>
              <p className="text-white/40 text-xs tracking-[0.3em] uppercase">Security</p>
            </div>
          </div>
          <h1 className="text-white text-2xl font-bold mb-1">Painel Administrativo</h1>
          <p className="text-white/40 text-sm">Acesso restrito à equipe Northron</p>
        </div>

        {/* Card de login */}
        <div className="bg-[#111111] border border-white/10 rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label className="block text-white/70 text-sm font-medium mb-2 uppercase tracking-wider">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="seu.username.northron"
                autoComplete="username"
                className="w-full bg-[#1a1a1a] border border-white/10 text-white placeholder-white/20 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#c9a84c]/60 focus:ring-1 focus:ring-[#c9a84c]/30 transition-all"
              />
            </div>

            {/* Senha */}
            <div>
              <label className="block text-white/70 text-sm font-medium mb-2 uppercase tracking-wider">
                Senha
              </label>
              <div className="relative">
                <input
                  type={showSenha ? "text" : "password"}
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full bg-[#1a1a1a] border border-white/10 text-white placeholder-white/20 rounded-lg px-4 py-3 pr-12 text-sm focus:outline-none focus:border-[#c9a84c]/60 focus:ring-1 focus:ring-[#c9a84c]/30 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowSenha(!showSenha)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"
                >
                  {showSenha ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Botão de login */}
            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full bg-gradient-to-r from-[#c9a84c] to-[#8b6914] text-black font-bold py-3 rounded-lg uppercase tracking-widest text-sm hover:from-[#d4b56a] hover:to-[#9a7820] transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loginMutation.isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Entrando...
                </span>
              ) : "Entrar"}
            </button>
          </form>

          {/* Aviso de esqueci a senha */}
          <div className="mt-6 pt-5 border-t border-white/5 text-center">
            <p className="text-white/30 text-xs">
              Esqueceu a senha? Entre em contato com o administrador.
            </p>
          </div>
        </div>

        {/* Voltar ao site */}
        <div className="text-center mt-6">
          <a href="/" className="text-white/30 text-xs hover:text-white/60 transition-colors">
            ← Voltar ao site
          </a>
        </div>
      </div>
    </div>
  );
}
