import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

// Páginas públicas
import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import Metodologia from "./pages/Metodologia";
import Treinamentos from "./pages/Treinamentos";
import Guarda from "./pages/Guarda";
import Planos from "./pages/Planos";
import Resultados from "./pages/Resultados";
import FAQ from "./pages/FAQ";
import Orcamento from "./pages/Orcamento";
import Promocoes from "./pages/Promocoes";
import Contato from "./pages/Contato";

// Novas páginas de serviços
import AdestramentoOrcamento from "./pages/AdestramentoOrcamento";
import AluguelObra from "./pages/AluguelObra";
import AluguelFesta from "./pages/AluguelFesta";
import CursoInteresse from "./pages/CursoInteresse";

// Painel admin — autenticação própria
import AdminLogin from "./pages/admin/AdminLogin";
import AdminRedefinirSenha from "./pages/admin/AdminRedefinirSenha";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminOrcamentos from "./pages/admin/AdminOrcamentos";
import AdminLeads from "./pages/admin/AdminLeads";
import AdminFuncionarios from "./pages/admin/AdminFuncionarios";

// Novas páginas administrativas
import AdminAluguelObra from "./pages/admin/AdminAluguelObra";
import AdminAluguelFesta from "./pages/admin/AdminAluguelFesta";
import AdminCursos from "./pages/admin/AdminCursos";
import AdminConfig from "./pages/admin/AdminConfig";

// 404
import NotFound from "./pages/NotFound";

// Componentes de layout
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      {/* Site público */}
      <Route path="/">
        <PublicLayout><Home /></PublicLayout>
      </Route>
      <Route path="/sobre">
        <PublicLayout><Sobre /></PublicLayout>
      </Route>
      <Route path="/metodologia">
        <PublicLayout><Metodologia /></PublicLayout>
      </Route>
      <Route path="/treinamentos">
        <PublicLayout><Treinamentos /></PublicLayout>
      </Route>
      <Route path="/guarda-protecao">
        <PublicLayout><Guarda /></PublicLayout>
      </Route>
      <Route path="/planos">
        <PublicLayout><Planos /></PublicLayout>
      </Route>
      <Route path="/resultados">
        <PublicLayout><Resultados /></PublicLayout>
      </Route>
      <Route path="/faq">
        <PublicLayout><FAQ /></PublicLayout>
      </Route>
      <Route path="/orcamento">
        <PublicLayout><Orcamento /></PublicLayout>
      </Route>
      <Route path="/promocoes">
        <PublicLayout><Promocoes /></PublicLayout>
      </Route>
      <Route path="/contato">
        <PublicLayout><Contato /></PublicLayout>
      </Route>

      {/* Novas rotas para serviços e cursos */}
      <Route path="/adestramento/:plano">
        <PublicLayout><AdestramentoOrcamento /></PublicLayout>
      </Route>
      <Route path="/aluguel-obra">
        <PublicLayout><AluguelObra /></PublicLayout>
      </Route>
      <Route path="/aluguel-festa">
        <PublicLayout><AluguelFesta /></PublicLayout>
      </Route>
      <Route path="/curso">
        <PublicLayout><CursoInteresse /></PublicLayout>
      </Route>

      {/* Painel admin — rotas sem layout (têm layout próprio) */}
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/redefinir-senha" component={AdminRedefinirSenha} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/orcamentos" component={AdminOrcamentos} />
      <Route path="/admin/leads" component={AdminLeads} />
      <Route path="/admin/funcionarios" component={AdminFuncionarios} />

      {/* Rotas administrativas adicionais */}
      <Route path="/admin/aluguel-obra" component={AdminAluguelObra} />
      <Route path="/admin/aluguel-festa" component={AdminAluguelFesta} />
      <Route path="/admin/cursos" component={AdminCursos} />
      <Route path="/admin/config" component={AdminConfig} />

      {/* 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
