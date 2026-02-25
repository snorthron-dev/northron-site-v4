import { useState, useRef } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import AdminLayout from "@/components/AdminLayout";

type Funcionario = {
  id: number;
  username: string;
  nomeCompleto: string | null;
  telefone: string | null;
  cargo: "admin" | "adestrador" | "recepcao";
  fotoUrl: string | null;
  ativo: string;
  primeiroAcesso: string;
  createdAt: Date;
  lastSignedIn: Date | null;
};

const cargoLabel = {
  admin: "Administrador",
  adestrador: "Adestrador",
  recepcao: "Recepção",
};

const cargoBadgeColor = {
  admin: "bg-[#c9a84c]/20 text-[#c9a84c] border-[#c9a84c]/30",
  adestrador: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  recepcao: "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

export default function AdminFuncionarios() {
  const [showCriar, setShowCriar] = useState(false);
  const [editando, setEditando] = useState<Funcionario | null>(null);
  const [redefinindo, setRedefinindo] = useState<Funcionario | null>(null);
  const [novaSenha, setNovaSenha] = useState("");
  const [novoFuncionario, setNovoFuncionario] = useState({
    nomeCompleto: "",
    telefone: "",
    cargo: "recepcao" as "adestrador" | "recepcao",
  });
  const [editForm, setEditForm] = useState({ nomeCompleto: "", telefone: "", cargo: "recepcao" as "adestrador" | "recepcao" });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingFotoId, setUploadingFotoId] = useState<number | null>(null);

  const utils = trpc.useUtils();

  const { data: funcionarios, isLoading } = trpc.funcionarios.listar.useQuery();

  const criarMutation = trpc.funcionarios.criar.useMutation({
    onSuccess: (data) => {
      toast.success(
        <div>
          <p className="font-bold">Funcionário criado!</p>
          <p className="text-sm mt-1">Username: <strong>{data.username}</strong></p>
          <p className="text-sm">Senha temporária: <strong>{data.senhaTemp}</strong></p>
          <p className="text-xs text-yellow-400 mt-1">⚠️ Anote a senha — ela não será exibida novamente.</p>
        </div>,
        { duration: 15000 }
      );
      utils.funcionarios.listar.invalidate();
      setShowCriar(false);
      setNovoFuncionario({ nomeCompleto: "", telefone: "", cargo: "recepcao" });
    },
    onError: (err) => toast.error(err.message),
  });

  const editarMutation = trpc.funcionarios.editar.useMutation({
    onSuccess: () => {
      toast.success("Perfil atualizado!");
      utils.funcionarios.listar.invalidate();
      setEditando(null);
    },
    onError: (err) => toast.error(err.message),
  });

  const redefinirSenhaMutation = trpc.funcionarios.redefinirSenha.useMutation({
    onSuccess: () => {
      toast.success("Senha redefinida! O funcionário precisará criar uma nova senha no próximo acesso.");
      utils.funcionarios.listar.invalidate();
      setRedefinindo(null);
      setNovaSenha("");
    },
    onError: (err) => toast.error(err.message),
  });

  const ativarDesativarMutation = trpc.funcionarios.ativarDesativar.useMutation({
    onSuccess: (_, vars) => {
      toast.success(vars.ativo === "sim" ? "Acesso reativado." : "Acesso desativado.");
      utils.funcionarios.listar.invalidate();
    },
    onError: (err) => toast.error(err.message),
  });

  const uploadFotoMutation = trpc.funcionarios.uploadFoto.useMutation({
    onSuccess: (data) => {
      toast.success("Foto atualizada!");
      utils.funcionarios.listar.invalidate();
      setUploadingFotoId(null);
    },
    onError: (err) => {
      toast.error(err.message);
      setUploadingFotoId(null);
    },
  });

  const handleFotoChange = (funcionarioId: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      toast.error("A foto deve ter no máximo 2MB.");
      return;
    }
    setUploadingFotoId(funcionarioId);
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(",")[1];
      uploadFotoMutation.mutate({
        id: funcionarioId,
        fotoBase64: base64,
        mimeType: file.type,
      });
    };
    reader.readAsDataURL(file);
  };

  const openEditar = (f: Funcionario) => {
    setEditando(f);
    setEditForm({
      nomeCompleto: f.nomeCompleto || "",
      telefone: f.telefone || "",
      cargo: f.cargo === "admin" ? "adestrador" : f.cargo,
    });
  };

  return (
    <AdminLayout requireAdmin>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-white text-2xl font-bold">Funcionários</h1>
            <p className="text-white/40 text-sm mt-1">Gerencie a equipe Northron Security</p>
          </div>
          <button
            onClick={() => setShowCriar(true)}
            className="bg-gradient-to-r from-[#c9a84c] to-[#8b6914] text-black font-bold px-5 py-2.5 rounded-lg text-sm uppercase tracking-wider hover:from-[#d4b56a] hover:to-[#9a7820] transition-all"
          >
            + Novo Funcionário
          </button>
        </div>

        {/* Lista */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-[#c9a84c] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : !funcionarios?.length ? (
          <div className="text-center py-20">
            <p className="text-white/30">Nenhum funcionário cadastrado ainda.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {funcionarios.map((f) => (
              <div
                key={f.id}
                className={`bg-[#111111] border rounded-xl p-5 flex items-center gap-5 ${
                  f.ativo === "nao" ? "border-white/5 opacity-50" : "border-white/10"
                }`}
              >
                {/* Foto */}
                <div className="relative flex-shrink-0">
                  {f.fotoUrl ? (
                    <img
                      src={f.fotoUrl}
                      alt={f.nomeCompleto || f.username}
                      className="w-14 h-14 rounded-full object-cover border-2 border-white/10"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-[#1a1a1a] border-2 border-white/10 flex items-center justify-center text-white/40 text-xl font-bold">
                      {(f.nomeCompleto || f.username)[0].toUpperCase()}
                    </div>
                  )}
                  <button
                    onClick={() => {
                      const input = document.createElement("input");
                      input.type = "file";
                      input.accept = "image/*";
                      input.onchange = (e) => handleFotoChange(f.id, e as any);
                      input.click();
                    }}
                    disabled={uploadingFotoId === f.id}
                    className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#c9a84c] rounded-full flex items-center justify-center hover:bg-[#d4b56a] transition-colors"
                    title="Alterar foto"
                  >
                    {uploadingFotoId === f.id ? (
                      <div className="w-3 h-3 border border-black border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                  </button>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-white font-semibold">{f.nomeCompleto || "—"}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${cargoBadgeColor[f.cargo]}`}>
                      {cargoLabel[f.cargo]}
                    </span>
                    {f.primeiroAcesso === "sim" && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                        Primeiro acesso pendente
                      </span>
                    )}
                    {f.ativo === "nao" && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                        Desativado
                      </span>
                    )}
                  </div>
                  <p className="text-white/40 text-sm mt-0.5">@{f.username}</p>
                  {f.telefone && <p className="text-white/30 text-xs mt-0.5">{f.telefone}</p>}
                  <p className="text-white/20 text-xs mt-1">
                    Criado em {new Date(f.createdAt).toLocaleDateString("pt-BR")}
                    {f.lastSignedIn && ` · Último acesso: ${new Date(f.lastSignedIn).toLocaleDateString("pt-BR")}`}
                  </p>
                </div>

                {/* Ações */}
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => openEditar(f as Funcionario)}
                    className="text-white/40 hover:text-white/80 p-2 rounded-lg hover:bg-white/5 transition-all"
                    title="Editar"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setRedefinindo(f as Funcionario)}
                    className="text-white/40 hover:text-[#c9a84c] p-2 rounded-lg hover:bg-[#c9a84c]/5 transition-all"
                    title="Redefinir senha"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => ativarDesativarMutation.mutate({ id: f.id, ativo: f.ativo === "sim" ? "nao" : "sim" })}
                    className={`p-2 rounded-lg transition-all ${
                      f.ativo === "sim"
                        ? "text-white/40 hover:text-red-400 hover:bg-red-500/5"
                        : "text-white/40 hover:text-green-400 hover:bg-green-500/5"
                    }`}
                    title={f.ativo === "sim" ? "Desativar acesso" : "Reativar acesso"}
                  >
                    {f.ativo === "sim" ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal: Criar funcionário */}
      {showCriar && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-white font-bold text-lg mb-5">Novo Funcionário</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-white/60 text-xs uppercase tracking-wider mb-1.5">Nome Completo *</label>
                <input
                  type="text"
                  value={novoFuncionario.nomeCompleto}
                  onChange={(e) => setNovoFuncionario(p => ({ ...p, nomeCompleto: e.target.value }))}
                  placeholder="Ex: João Silva"
                  className="w-full bg-[#1a1a1a] border border-white/10 text-white placeholder-white/20 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#c9a84c]/50"
                />
                <p className="text-white/30 text-xs mt-1">
                  Username gerado automaticamente: {novoFuncionario.nomeCompleto
                    ? `${novoFuncionario.nomeCompleto.split(" ")[0].toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "")}.northron`
                    : "primeironome.northron"}
                </p>
              </div>
              <div>
                <label className="block text-white/60 text-xs uppercase tracking-wider mb-1.5">Telefone</label>
                <input
                  type="text"
                  value={novoFuncionario.telefone}
                  onChange={(e) => setNovoFuncionario(p => ({ ...p, telefone: e.target.value }))}
                  placeholder="(84) 99999-9999"
                  className="w-full bg-[#1a1a1a] border border-white/10 text-white placeholder-white/20 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#c9a84c]/50"
                />
              </div>
              <div>
                <label className="block text-white/60 text-xs uppercase tracking-wider mb-1.5">Cargo *</label>
                <select
                  value={novoFuncionario.cargo}
                  onChange={(e) => setNovoFuncionario(p => ({ ...p, cargo: e.target.value as "adestrador" | "recepcao" }))}
                  className="w-full bg-[#1a1a1a] border border-white/10 text-white rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#c9a84c]/50"
                >
                  <option value="adestrador">Adestrador — gerencia orçamentos</option>
                  <option value="recepcao">Recepção — apenas consulta e tira dúvidas</option>
                </select>
              </div>
              <div className="bg-[#c9a84c]/5 border border-[#c9a84c]/15 rounded-lg p-3">
                <p className="text-[#c9a84c]/80 text-xs">
                  Uma senha temporária será gerada automaticamente. O funcionário precisará redefini-la no primeiro acesso.
                </p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowCriar(false)}
                className="flex-1 py-2.5 rounded-lg border border-white/10 text-white/50 hover:text-white/80 text-sm transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={() => criarMutation.mutate(novoFuncionario)}
                disabled={criarMutation.isPending || !novoFuncionario.nomeCompleto.trim()}
                className="flex-1 bg-gradient-to-r from-[#c9a84c] to-[#8b6914] text-black font-bold py-2.5 rounded-lg text-sm disabled:opacity-50 transition-all"
              >
                {criarMutation.isPending ? "Criando..." : "Criar Funcionário"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Editar funcionário */}
      {editando && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-white font-bold text-lg mb-5">Editar: {editando.nomeCompleto || editando.username}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-white/60 text-xs uppercase tracking-wider mb-1.5">Nome Completo</label>
                <input
                  type="text"
                  value={editForm.nomeCompleto}
                  onChange={(e) => setEditForm(p => ({ ...p, nomeCompleto: e.target.value }))}
                  className="w-full bg-[#1a1a1a] border border-white/10 text-white rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#c9a84c]/50"
                />
              </div>
              <div>
                <label className="block text-white/60 text-xs uppercase tracking-wider mb-1.5">Telefone</label>
                <input
                  type="text"
                  value={editForm.telefone}
                  onChange={(e) => setEditForm(p => ({ ...p, telefone: e.target.value }))}
                  className="w-full bg-[#1a1a1a] border border-white/10 text-white rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#c9a84c]/50"
                />
              </div>
              <div>
                <label className="block text-white/60 text-xs uppercase tracking-wider mb-1.5">Cargo</label>
                <select
                  value={editForm.cargo}
                  onChange={(e) => setEditForm(p => ({ ...p, cargo: e.target.value as "adestrador" | "recepcao" }))}
                  className="w-full bg-[#1a1a1a] border border-white/10 text-white rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#c9a84c]/50"
                >
                  <option value="adestrador">Adestrador</option>
                  <option value="recepcao">Recepção</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setEditando(null)} className="flex-1 py-2.5 rounded-lg border border-white/10 text-white/50 hover:text-white/80 text-sm transition-all">
                Cancelar
              </button>
              <button
                onClick={() => editarMutation.mutate({ id: editando.id, ...editForm })}
                disabled={editarMutation.isPending}
                className="flex-1 bg-gradient-to-r from-[#c9a84c] to-[#8b6914] text-black font-bold py-2.5 rounded-lg text-sm disabled:opacity-50 transition-all"
              >
                {editarMutation.isPending ? "Salvando..." : "Salvar Alterações"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Redefinir senha */}
      {redefinindo && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-white font-bold text-lg mb-2">Redefinir Senha</h2>
            <p className="text-white/40 text-sm mb-5">
              Redefina a senha de <strong className="text-white/70">{redefinindo.nomeCompleto || redefinindo.username}</strong>.
              O funcionário precisará criar uma nova senha no próximo acesso.
            </p>
            <div>
              <label className="block text-white/60 text-xs uppercase tracking-wider mb-1.5">Nova Senha Temporária</label>
              <input
                type="text"
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
                placeholder="Mínimo 6 caracteres"
                className="w-full bg-[#1a1a1a] border border-white/10 text-white placeholder-white/20 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#c9a84c]/50"
              />
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => { setRedefinindo(null); setNovaSenha(""); }} className="flex-1 py-2.5 rounded-lg border border-white/10 text-white/50 hover:text-white/80 text-sm transition-all">
                Cancelar
              </button>
              <button
                onClick={() => redefinirSenhaMutation.mutate({ id: redefinindo.id, novaSenha })}
                disabled={redefinirSenhaMutation.isPending || novaSenha.length < 6}
                className="flex-1 bg-gradient-to-r from-[#c9a84c] to-[#8b6914] text-black font-bold py-2.5 rounded-lg text-sm disabled:opacity-50 transition-all"
              >
                {redefinirSenhaMutation.isPending ? "Redefinindo..." : "Redefinir Senha"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
