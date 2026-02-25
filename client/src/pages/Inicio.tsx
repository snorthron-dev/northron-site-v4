import { ArrowRight, Shield, MapPin, Award } from 'lucide-react';

interface InicioProps {
  onNavigate?: (tab: string) => void;
}

export default function Inicio({ onNavigate }: InicioProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-40 pb-24 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-40 right-40 w-96 h-96 bg-accent rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-40 left-40 w-96 h-96 bg-accent rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-10 fade-in-up">
              <div className="space-y-6">
                <h1 style={{ fontFamily: "'Playfair Display', serif" }} className="text-5xl md:text-7xl font-bold leading-tight">
                  Controle, Proteção e <span className="text-gradient-gold">Obediência</span> de Alto Nível
                </h1>
                <p style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
                  Treinamento canino profissional para obediência, segurança e proteção patrimonial em Natal/RN e região.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 pt-4">
                <a 
                  href="https://wa.me/5584921440536?text=Olá! Quero solicitar uma avaliação para treinamento ou proteção."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-premium flex items-center justify-center gap-3"
                >
                  <span>Solicitar Avaliação</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <button 
                  onClick={() => onNavigate?.('treinamentos')}
                  className="btn-premium-outline flex items-center justify-center gap-3"
                >
                  Conhecer Serviços
                </button>
              </div>

              {/* Info Cards */}
              <div className="grid grid-cols-3 gap-8 pt-12 border-t border-border/30">
                <div className="space-y-2">
                  <div style={{ fontFamily: "'Playfair Display', serif" }} className="text-3xl md:text-4xl font-bold text-accent">Natal</div>
                  <p style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-sm text-muted-foreground font-light">Atendimento Local</p>
                </div>
                <div className="space-y-2">
                  <div style={{ fontFamily: "'Playfair Display', serif" }} className="text-3xl md:text-4xl font-bold text-accent">24/7</div>
                  <p style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-sm text-muted-foreground font-light">Disponibilidade</p>
                </div>
                <div className="space-y-2">
                  <div style={{ fontFamily: "'Playfair Display', serif" }} className="text-3xl md:text-4xl font-bold text-accent">Elite</div>
                  <p style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-sm text-muted-foreground font-light">Qualidade Premium</p>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative h-96 md:h-full min-h-96">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent rounded-sm opacity-0-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 border border-accent/20 rounded-sm-hover:border-accent/50 transition-colors duration-500"></div>
              <img 
                src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=600&fit=crop" 
                alt="Cão de proteção profissional" 
                className="w-full h-full object-cover rounded-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Diferenciais Section */}
      <section className="py-24 bg-card border-y border-border/30 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="container relative z-10">
          <div className="text-center mb-20">
            <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-4xl md:text-5xl font-bold mb-4">Por Que Escolher Northron Security</h2>
            <div className="divider-gold w-32 h-1 mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="service-card">
              <div className="mb-6 relative">
                <div className="absolute inset-0 bg-accent/10 rounded-full blur-lg opacity-0-hover:opacity-100 transition-opacity duration-300"></div>
                <Shield className="w-14 h-14 text-accent relative" />
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl font-bold mb-4">Proteção Profissional</h3>
              <p style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-muted-foreground font-light leading-relaxed">
                Treinamento especializado em proteção patrimonial e defesa pessoal com padrão internacional.
              </p>
            </div>

            {/* Card 2 */}
            <div className="service-card">
              <div className="mb-6 relative">
                <div className="absolute inset-0 bg-accent/10 rounded-full blur-lg opacity-0-hover:opacity-100 transition-opacity duration-300"></div>
                <MapPin className="w-14 h-14 text-accent relative" />
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl font-bold mb-4">Atendimento Local</h3>
              <p style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-muted-foreground font-light leading-relaxed">
                Treinamento personalizado no local do cliente. Condomínios, residências e empresas.
              </p>
            </div>

            {/* Card 3 */}
            <div className="service-card">
              <div className="mb-6 relative">
                <div className="absolute inset-0 bg-accent/10 rounded-full blur-lg opacity-0-hover:opacity-100 transition-opacity duration-300"></div>
                <Award className="w-14 h-14 text-accent relative" />
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl font-bold mb-4">Protocolo Profissional</h3>
              <p style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-muted-foreground font-light leading-relaxed">
                Protocolos comprovados de obediência e proteção com resultados mensuráveis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container">
          <div className="relative overflow-hidden rounded-sm p-16 md:p-20">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-card via-muted to-card opacity-50"></div>
            <div className="absolute inset-0 border border-accent/20"></div>
            
            {/* Animated accent line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent"></div>

            <div className="relative z-10 text-center">
              <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-4xl md:text-5xl font-bold mb-6">
                Pronto para Começar?
              </h2>
              <p style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-xl text-muted-foreground mb-10 font-light max-w-2xl mx-auto">
                Agende uma avaliação profissional e conheça nossos serviços de elite.
              </p>
              <a 
                href="https://wa.me/5584921440536?text=Olá! Quero solicitar uma avaliação para treinamento ou proteção."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-premium inline-flex items-center gap-3"
              >
                <span>Contato via WhatsApp</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
