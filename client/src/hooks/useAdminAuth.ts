import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";

export type AdminUser = {
  id: number;
  username: string;
  nomeCompleto: string | null;
  telefone: string | null;
  cargo: "admin" | "adestrador" | "recepcao";
  fotoUrl: string | null;
  primeiroAcesso: boolean;
  ativo: string;
};

export function useAdminAuth() {
  const { data: adminUser, isLoading, refetch } = trpc.adminAuth.me.useQuery(undefined, {
    retry: false,
    staleTime: 30_000,
  });

  const logoutMutation = trpc.adminAuth.logout.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  return {
    adminUser: adminUser ?? null,
    isLoading,
    isAuthenticated: !!adminUser,
    isAdmin: adminUser?.cargo === "admin",
    logout: () => logoutMutation.mutate(),
    refetch,
  };
}
