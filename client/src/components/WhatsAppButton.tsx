import { useLocation } from "wouter";

const mensagensPorPagina: Record<string, string> = {
  "/": "Olá! Quero saber mais sobre os serviços da Northron Security.",
  "/treinamentos": "Olá! Tenho interesse em adestramento para meu cão. Podem me ajudar?",
  "/guarda-protecao": "Olá! Quero saber mais sobre cão de guarda e proteção.",
  "/planos": "Olá! Quero conhecer os serviços e consultar valores sob medida.",
  "/resultados": "Olá! Vi os resultados de vocês e quero saber mais!",
  "/sobre": "Olá! Quero saber mais sobre a Northron Security.",
  "/metodologia": "Olá! Fiquei interessado na metodologia de vocês.",
  "/faq": "Olá! Tenho algumas dúvidas sobre os serviços de vocês.",
  "/orcamento": "Olá! Quero solicitar uma avaliação gratuita para meu cão.",
  "/contato": "Olá! Gostaria de entrar em contato com a Northron Security.",
};

export default function WhatsAppButton() {
  const [location] = useLocation();
  const mensagem = mensagensPorPagina[location] || mensagensPorPagina["/"];
  const url = "https://wa.me/5584921440536?text=" + encodeURIComponent(mensagem);
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="whatsapp-btn" title="Falar no WhatsApp" aria-label="Falar no WhatsApp">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.255.949L2 3l1.395 5.233A11.955 11.955 0 002 12c0 6.627 5.373 12 12 12s12-5.373 12-12S18.627 0 12 0z"/>
      </svg>
    </a>
  );
}
