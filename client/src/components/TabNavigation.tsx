import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);

  const tabs = [
    { id: 'inicio', label: 'Início' },
    { id: 'treinamentos', label: 'Treinamentos' },
    { id: 'guarda', label: 'Guarda e Proteção' },
    { id: 'planos', label: 'Planos' },
    { id: 'resultados', label: 'Resultados' },
    { id: 'contato', label: 'Contato' },
  ];

  const handleTabClick = (tabId: string) => {
    onTabChange(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-background border-b border-border/30 z-50 backdrop-blur-sm">
      <div className="container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            {!logoFailed ? (
              <img 
                src="/logo.png" 
                alt="Northron Security" 
                className="h-14 w-auto object-contain"
                onError={() => setLogoFailed(true)}
              />
            ) : (
              <div style={{ fontFamily: "'Playfair Display', serif" }} className="text-xl font-bold text-accent">
                Northron
              </div>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`px-5 py-3 text-sm font-medium transition-all duration-300 relative ${
                  activeTab === tab.id
                    ? 'text-accent'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent"></div>
                )}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-accent transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-card border-b border-border/30">
            <div className="container py-4 space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`w-full text-left px-6 py-3 transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'text-accent bg-muted'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
