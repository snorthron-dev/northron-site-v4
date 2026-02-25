import { useState, useEffect } from "react";
import { Link } from "wouter";
import AnimatedSection from "@/components/AnimatedSection";
import { trpc } from "@/lib/trpc";

const categorias = [
  {
    titulo: "Sobre o treinamento",
    perguntas: [
      { p: "Qual a idade mínima para começar o treinamento?", r: "A partir dos 3 meses de idade, após as vacinas básicas. Filhotes aprendem mais rápido, mas nunca é tarde para treinar — trabalhamos com cães de qualquer idade." },
      { p: "Meu cão é muito velho para aprender?", r: "Não existe cão velho demais. O processo pode ser mais gradual com cães mais velhos, especialmente se têm comportamentos arraigados há anos, mas resultados são possíveis em qualquer idade." },
      { p: "Preciso estar presente nas sessões de treinamento?", r: "Recomendamos fortemente que sim, especialmente nas primeiras sessões. O objetivo não é ter um cão que obedece só ao treinador — é ter um cão que obedece a você. Sua participação é parte essencial do processo." },
      { p: "Quantas sessões por semana são necessárias?", r: "Geralmente 2 sessões por semana, com duração de 40 a 60 minutos cada. O que acontece entre as sessões — a consistência do tutor em casa — é tão importante quanto as sessões em si." },
      { p: "O treinamento funciona com qualquer raça?", r: "Sim. Raça não define comportamento — histórico, ambiente e consistência definem. Avaliamos cada caso individualmente. Algumas raças têm características que influenciam o processo, mas isso é discutido na avaliação inicial." },
      { p: "Meu cão precisa de treinamento se já é calmo?", r: "Treinamento não é só para cães problemáticos. Um cão bem treinado é mais seguro, mais feliz e tem uma relação melhor com o tutor. Mesmo cães calmos se beneficiam de obediência básica." },
    ],
  },
  {
    titulo: "Sobre guarda e proteção",
    perguntas: [
      { p: "Qualquer cão pode ser treinado para guarda?", r: "Não. Treinamento de guarda requer um animal com temperamento específico: equilibrado, confiante, sem medo excessivo e sem agressividade indiscriminada. Avaliamos o perfil antes de qualquer compromisso." },
      { p: "Um cão de guarda é perigoso para a família?", r: "Um cão bem treinado para guarda não representa risco para a família. Parte do treinamento é justamente ensinar o animal a discriminar quem é amigo e quem é intruso. Mas isso exige seriedade no processo." },
      { p: "Qual a diferença entre cão de guarda e cão de proteção pessoal?", r: "O cão de guarda protege um território (residência, empresa). O cão de proteção pessoal acompanha e defende o dono em qualquer ambiente. São treinamentos diferentes, com objetivos e requisitos distintos." },
      { p: "Quanto tempo leva para treinar um cão de guarda?", r: "Depende do animal, do nível de treinamento desejado e da consistência do processo. Em média, de 6 a 12 meses para uma formação completa. Avaliamos cada caso individualmente." },
    ],
  },
  {
    titulo: "Sobre valores e processo",
    perguntas: [
      { p: "A avaliação inicial é realmente gratuita?", r: "Sim. A avaliação inicial é gratuita e sem compromisso. Conversamos sobre o seu cão, avaliamos o caso e apresentamos o que é possível fazer. Só depois você decide se quer prosseguir." },
      { p: "Como funciona o pagamento?", r: "Para treinamentos mensais, o pagamento é feito mensalmente. Para consultorias, o pagamento é por sessão. Combinamos tudo antes de começar — sem surpresas." },
      { p: "Vocês atendem em domicílio?", r: "Sim. O atendimento é feito no local do cliente — sua casa, empresa ou propriedade. Isso é importante porque o cão precisa aprender a se comportar no ambiente onde vive." },
      { p: "E se o resultado não for o esperado?", r: "Somos honestos sobre o que é possível desde o início. Se durante o processo identificarmos que o objetivo não é alcançável, comunicamos imediatamente. Não continuamos cobrando por algo que não está funcionando." },
      { p: "Vocês emitem algum certificado?", r: "Não emitimos certificados formais no momento. O resultado do treinamento é prático e observável — não é um papel. Se isso mudar, atualizaremos aqui." },
    ],
  },
  {
    titulo: "Sobre comportamento canino",
    perguntas: [
      { p: "Meu cão late muito. Tem solução?", r: "Depende da causa. Latido excessivo pode ter várias origens: ansiedade, tédio, medo, territorialidade. Identificar a causa é o primeiro passo. Na avaliação, analisamos o contexto e apresentamos o que é possível fazer." },
      { p: "Meu cão morde. É perigoso continuar com ele?", r: "Mordida é um sinal que precisa ser levado a sério. Antes de qualquer decisão, é importante entender o contexto: o cão morde por medo, dor, proteção de recurso? A avaliação é essencial. Não recomendamos continuar sem orientação profissional." },
      { p: "Meu cão tem medo de tudo. Tem como melhorar?", r: "Sim. Medo excessivo é tratável com dessensibilização gradual e reforço positivo. É um processo que exige paciência e consistência, mas resultados são possíveis na maioria dos casos." },
      { p: "Meu cão não para quieto. É hiperatividade?", r: "Nem sempre. Muitos cães 'hiperativos' são simplesmente cães com muita energia e pouco estímulo. Antes de qualquer diagnóstico, avaliamos rotina, ambiente e comportamento. Na maioria dos casos, a solução é mais simples do que parece." },
    ],
  },
];

function AccordionItem({ pergunta, resposta }: { pergunta: string; resposta: string }) {
  const [aberto, setAberto] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid hsl(0 0% 12%)" }}>
      <button
        onClick={() => setAberto(!aberto)}
        style={{
          width: "100%",
          padding: "1.25rem 0",
          background: "none",
          border: "none",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "1rem",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.9rem", fontWeight: 600, color: aberto ? "hsl(43 89% 52%)" : "hsl(45 20% 88%)", lineHeight: 1.5, transition: "color 0.3s ease" }}>
          {pergunta}
        </span>
        <span style={{ color: "hsl(43 89% 52%)", fontSize: "1.25rem", lineHeight: 1, flexShrink: 0, transition: "transform 0.3s ease", transform: aberto ? "rotate(45deg)" : "rotate(0deg)" }}>
          +
        </span>
      </button>
      {aberto && (
        <div className="animate-fade-in" style={{ paddingBottom: "1.25rem" }}>
          <p style={{ color: "hsl(0 0% 60%)", fontSize: "0.875rem", lineHeight: 1.9 }}>{resposta}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  const registrar = trpc.analytics.registrarPageView.useMutation();
  useEffect(() => { registrar.mutate({ pagina: "faq" }); }, []);

  return (
    <div className="page-transition" style={{ paddingTop: "72px" }}>
      <section style={{ padding: "5rem 0 4rem", background: "hsl(0 0% 4%)", borderBottom: "1px solid hsl(0 0% 10%)" }}>
        <div className="container">
          <AnimatedSection animation="fadeInUp">
            <div className="section-subtitle">Dúvidas</div>
            <h1 className="section-title" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>Perguntas Frequentes</h1>
            <div className="divider-gold" />
            <p style={{ color: "hsl(0 0% 60%)", fontSize: "1rem", lineHeight: 1.8, marginTop: "1.5rem", maxWidth: "600px" }}>
              Respondemos as dúvidas mais comuns com honestidade. Se sua dúvida não está aqui, fale com a gente.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>
            <div>
              {categorias.slice(0, 2).map((cat, i) => (
                <AnimatedSection key={cat.titulo} animation="fadeInUp" delay={i * 100}>
                  <div style={{ marginBottom: "3rem" }}>
                    <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "hsl(43 89% 52%)", marginBottom: "1.5rem" }}>
                      {cat.titulo}
                    </h2>
                    {cat.perguntas.map((item) => (
                      <AccordionItem key={item.p} pergunta={item.p} resposta={item.r} />
                    ))}
                  </div>
                </AnimatedSection>
              ))}
            </div>
            <div>
              {categorias.slice(2).map((cat, i) => (
                <AnimatedSection key={cat.titulo} animation="fadeInUp" delay={i * 100}>
                  <div style={{ marginBottom: "3rem" }}>
                    <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "hsl(43 89% 52%)", marginBottom: "1.5rem" }}>
                      {cat.titulo}
                    </h2>
                    {cat.perguntas.map((item) => (
                      <AccordionItem key={item.p} pergunta={item.p} resposta={item.r} />
                    ))}
                  </div>
                </AnimatedSection>
              ))}

              {/* CTA */}
              <AnimatedSection animation="fadeInUp">
                <div className="card-premium" style={{ padding: "2rem", textAlign: "center" }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.25rem", fontWeight: 700, color: "hsl(45 20% 92%)", marginBottom: "0.75rem" }}>
                    Ainda tem dúvidas?
                  </div>
                  <p style={{ color: "hsl(0 0% 60%)", fontSize: "0.875rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                    Fale diretamente com a gente. Respondemos todas as perguntas, sem compromisso.
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    <a href="https://wa.me/5584921440536?text=Olá! Tenho uma dúvida sobre os serviços de vocês." target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ fontSize: "0.8rem", justifyContent: "center" }}>
                      Falar no WhatsApp
                    </a>
                    <Link href="/orcamento" className="btn-outline-gold" style={{ fontSize: "0.8rem", justifyContent: "center" }}>
                      Solicitar Avaliação Gratuita
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
