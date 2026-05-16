import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  ChevronDown, 
  Smartphone, 
  Lock,
  Sparkles,
  BarChart3
} from "lucide-react";

export default function App() {
  const [currentPage, setCurrentPage] = useState<'vendas' | 'obrigado'>('vendas');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    const handleLocation = () => {
      if (window.location.pathname === '/obrigado') {
        setCurrentPage('obrigado');
      } else {
        setCurrentPage('vendas');
      }
    };
    handleLocation();
    window.addEventListener('popstate', handleLocation);
    return () => window.removeEventListener('popstate', handleLocation);
  }, []);

  // Disparo assíncrono purificado do Pixel e CAPI - Apenas PageView Estratégico
  useEffect(() => {
    const PIXEL_ID = "1650440006207697";
    const CAPI_TOKEN = "EAB4hda1l5Q0BRXIWNYaekyTJ2LraBp2e3o8Mw3UCYrVgZAKmDVmNClZC98nUeBRFePBRuslzWrjpQfK6lsOsAd2sgvRIUm7Y0ZA7EpHtchZBFqs06aNW6ObZBvd0ZAv5mki2FvLiGuDDmKyE47u42fGOYBxNE8xsHPMi5vr4Yxk3bQo6X04CYZBSiLJVIG5tdlRIgZDZD";
    
    // Disparo do Pixel no Navegador (Acesso dinâmico para ignorar erro de tipagem do TS)
    const globalWindow = window as any;
    if (globalWindow.fbq) {
      globalWindow.fbq('track', 'PageView');
    }
    
    // Disparo da API de Conversões (CAPI - Servidor Back-end)
    fetch(`https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${CAPI_TOKEN}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: [{
          event_name: "PageView",
          event_time: Math.floor(Date.now() / 1000),
          action_source: "website",
          event_source_url: window.location.href,
        }]
      })
    }).catch(() => {});
  }, [currentPage]);

  const scrollToPricing = (e: React.MouseEvent) => {
    e.preventDefault();
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // ----------------------------------------------------------------
  // PÁGINA DE OBRIGADO (Print 1000551061)
  // ----------------------------------------------------------------
  if (currentPage === 'obrigado') {
    return (
      <div className="min-h-screen bg-[#040404] text-[#e5e5e5] font-sora flex flex-col justify-between selection:bg-[#22C55E]/30">
        <header className="border-b border-border/60 bg-[#040404]/80 backdrop-blur-md py-4 sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-4 flex items-center gap-3">
            <img src="/favicon.jpg" alt="Logo" className="w-9 h-9 rounded-xl object-contain" />
            <span className="text-xl font-extrabold uppercase tracking-wider text-white">Sommar<span className="text-[#22C55E]">App</span></span>
          </div>
        </header>

        <main className="flex-1 py-16 px-4 max-w-2xl mx-auto w-full text-center flex flex-col justify-center items-center">
          <div className="w-16 h-16 bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E] rounded-full flex items-center justify-center mb-6 shadow-xl animate-pulse">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold uppercase text-white mb-3 tracking-tight">
            Parabéns pela sua decisão, <span className="text-gradient">Founder!</span>
          </h1>
          <p className="text-sm font-medium text-muted-foreground mb-8">Você acaba de profissionalizar a gestão do seu negócio e da sua vida.</p>

          <div className="w-full text-left p-6 rounded-2xl gradient-border mb-8">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/20 flex items-center justify-center text-[#22C55E] flex-shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-white uppercase mb-1">Verifique seu E-mail</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">A <strong className="text-white">Cakto</strong> enviará um e-mail com todos os detalhes da sua transação em instantes. Verifique também a pasta de spam.</p>
              </div>
            </div>
          </div>

          <div className="w-full text-left p-6 rounded-2xl gradient-border mb-8 bg-[#0a0a0a]/50">
            <h4 className="text-xs font-extrabold text-white uppercase mb-3 tracking-wider">Dúvidas? Fale direto comigo:</h4>
            <a href="https://wa.me/5586999568422" target="_blank" rel="noreferrer" className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] text-black font-extrabold text-xs uppercase tracking-widest py-3.5 rounded-xl transition-transform hover:scale-[1.01]">
              Chamar no WhatsApp
            </a>
          </div>
        </main>

        <footer className="border-t border-border py-6 text-center text-[10px] font-bold text-white/30 bg-black/40">
          © 2026 Sommar App. Todos os direitos reservados.
        </footer>
      </div>
    );
  }

  // ----------------------------------------------------------------
  // PÁGINA DE VENDAS PRINCIPAL (PV)
  // ----------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#040404] text-[#e5e5e5] font-sora selection:bg-[#22C55E]/30 overflow-x-hidden">
      
      {/* HEADER ESTRATÉGICO */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#040404]/80 border-b border-border/40">
        <div className="max-w-5xl mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <img src="/favicon.jpg" alt="Sommar App Logo" className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg object-contain" />
            <span className="text-lg sm:text-xl font-extrabold tracking-tight">
              <span className="text-[#22C55E]">Sommar</span> <span className="text-white">App</span>
            </span>
          </div>
          <button onClick={scrollToPricing} className="bg-gradient-to-r from-[#22C55E] to-[#4ADE80] text-black font-extrabold text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-widest px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl hover:scale-[1.02] transition-transform duration-200 shadow-md shadow-[#22C55E]/10 animate-pulse-glow">
            ATIVAR MINHA DIREÇÃO LUCRATIVA
          </button>
        </div>
      </header>

      <main className="pt-20 sm:pt-24">
        
        {/* 1. HERO SECTION - CPF x CNPJ */}
        <section className="max-w-4xl mx-auto px-4 pt-12 sm:pt-16 pb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-white/[0.02] mb-6">
            <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse"></span>
            <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest text-white/80">Seu Consultor Estratégico IA 24h</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white leading-[1.2] mb-6 max-w-3xl mx-auto">
            Saiba se sua empresa está lucrando ou se você está <span className="text-[#22C55E]">pagando para trabalhar</span> em menos de 1 minuto.
          </h1>
          
          <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto mb-8 sm:mb-10 font-medium leading-relaxed">
            O Sommar processa seus extratos automaticamente, separa o CPF do CNPJ e te entrega o lucro real. <span className="text-[#22C55E]">Sem planilhas, sem erros e sem perda de tempo.</span>
          </p>

          {/* VÍDEO DE DEMONSTRAÇÃO COMPATÍVEL MOBILE */}
          <div className="max-w-2xl mx-auto w-full mb-10 rounded-2xl border border-border bg-[#0a0a0a] p-2 shadow-2xl card-glow">
            <div className="relative w-full pb-[56.25%] h-0 rounded-xl overflow-hidden">
              <iframe 
                className="absolute top-0 left-0 w-full h-full border-0"
                src="https://www.youtube.com/embed/YfYAfW8kFO4" 
                title="Vídeo de demonstração Sommar App"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
              ></iframe>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-4">
            <button onClick={scrollToPricing} className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#22C55E] to-[#4ADE80] text-black font-extrabold text-xs sm:text-sm uppercase tracking-widest px-10 py-5 rounded-xl shadow-2xl shadow-[#22C55E]/20 hover:scale-[1.03] transition-all duration-200">
              QUERO MEU CONSULTOR IA AGORA <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[10px] sm:text-[11px] text-muted-foreground font-medium mt-1">
              Veja como o Marinho IA transforma confusão em <span className="text-[#22C55E]">diagnóstico estratégico</span>
            </p>
          </div>
        </section>

        {/* 2. AGITAÇÃO DA DOR - PAIN SECTION */}
        <section className="border-t border-b border-border bg-white/[0.01] py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-[10px] font-extrabold bg-red-500/10 border border-red-500/20 text-red-400 uppercase tracking-widest px-3 py-1 rounded-full">Você se Identifica?</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight mt-6 mb-12">O caos de quem <span className="text-red-400">mistura tudo</span></h2>

            <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-12">
              <div className="p-6 rounded-xl border border-border bg-[#060606] text-center flex flex-col items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-red-500/10 border border-border text-red-500 font-black text-xs flex items-center justify-center">1</div>
                <p className="text-xs text-muted-foreground font-medium leading-relaxed">Paga fornecedor com o dinheiro do aluguel pessoal</p>
              </div>
              <div className="p-6 rounded-xl border border-border bg-[#060606] text-center flex flex-col items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-red-500/10 border border-border text-red-500 font-black text-xs flex items-center justify-center">2</div>
                <p className="text-xs text-muted-foreground font-medium leading-relaxed">Acha que a empresa deu lucro, mas era o salário pessoal na conta</p>
              </div>
              <div className="p-6 rounded-xl border border-border bg-[#060606] text-center flex flex-col items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-red-500/10 border border-border text-red-500 font-black text-xs flex items-center justify-center">3</div>
                <p className="text-xs text-muted-foreground font-medium leading-relaxed">No fim do mês, não sabe quanto sobrou de verdade</p>
              </div>
            </div>

            <p className="text-xs text-red-400 font-bold uppercase tracking-wider flex items-center justify-center gap-2">
              🔄 E o ciclo se repete todo mês...
            </p>
          </div>
        </section>

        {/* INTERMEZZO DE COPY */}
        <section className="max-w-2xl mx-auto text-center py-16 px-4">
          <p className="text-xs sm:text-sm text-muted-foreground font-medium leading-relaxed">
            A falta de separação entre CPF e CNPJ cria <strong className="text-white">decisões erradas baseadas em números falsos.</strong> Mas o problema não é você — <span className="text-[#22C55E]">é a falta de uma ferramenta profissional que entenda as duas realidades.</span>
          </p>
        </section>

        {/* 3. APRESENTAÇÃO DA SOLUÇÃO (MOCKUP SMARTPHONE SMART) */}
        <section className="max-w-4xl mx-auto px-4 py-16 border-b border-border/40">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4 text-center md:text-left">
              <span className="text-[10px] font-extrabold text-[#22C55E] bg-[#22C55E]/10 border border-[#22C55E]/20 uppercase tracking-widest px-2.5 py-1 rounded-md inline-flex items-center gap-1">
                ✓ A Solução
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight leading-tight">Apresentamos o <span className="text-[#22C55E]">Sommar App</span></h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-medium">
                O sistema que <strong className="text-white">separa sua vida pessoal da empresarial</strong> e te dá lucro real automático.
              </p>
              <button onClick={scrollToPricing} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#22C55E] to-[#4ADE80] text-black font-extrabold text-xs uppercase tracking-widest px-6 py-4 rounded-xl shadow-lg shadow-[#22C55E]/10 hover:scale-[1.02] transition-all">
                QUERO PROFISSIONALIZAR MINHA GESTÃO <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            
            {/* MOCK CELULAR 1 */}
            <div className="relative mx-auto w-full max-w-[280px] h-[560px] bg-[#000] border-[10px] border-[#1a1a1a] rounded-[40px] shadow-2xl card-glow overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#1a1a1a] rounded-b-2xl z-20"></div>
              <img src="/lancar-sommar.jpg" alt="Interface de Lançamentos Sommar" className="w-full h-full object-cover rounded-[30px]" />
            </div>
          </div>
        </section>

        {/* 4. DUALITY SECTION - MODO PESSOAL VS EMPRESARIAL */}
        <section className="max-w-4xl mx-auto px-4 py-20 border-b border-border/40">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-[10px] font-extrabold text-[#22C55E] border border-[#22C55E]/20 bg-[#22C55E]/5 px-3 py-1 rounded-full uppercase tracking-widest">O Grande Diferencial</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight mt-4">Dois contextos, <span className="text-[#22C55E]">um só app.</span></h2>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">Troque entre <strong className="text-[#22C55E]">Pessoal</strong> e <strong className="text-blue-400">Empresarial</strong> com um clique. Dados 100% separados, cores específicas e métricas que fazem sentido para cada lado da sua vida.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* Modo Pessoal */}
            <div className="p-6 rounded-2xl border border-[#22C55E]/20 bg-[#22C55E]/[0.01] space-y-4">
              <div className="flex items-center gap-2 text-[#22C55E] font-extrabold text-xs uppercase tracking-wider">
                <div className="w-2 h-2 rounded-full bg-[#22C55E]"></div> Modo Pessoal (CPF)
              </div>
              <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Foco em:</p>
              <ul className="flex flex-col gap-2.5 text-xs text-muted-foreground font-medium">
                <li className="flex items-center gap-2 bg-white/[0.02] border border-border p-3 rounded-xl"><CheckCircle2 className="w-4 h-4 text-[#22C55E] flex-shrink-0" /> Receitas e Despesas (Controle total de fluxos)</li>
                <li className="flex items-center gap-2 bg-white/[0.02] border border-border p-3 rounded-xl"><CheckCircle2 className="w-4 h-4 text-[#22C55E] flex-shrink-0" /> Saldo Disponível (Quanto sobra no mês)</li>
                <li className="flex items-center gap-2 bg-white/[0.02] border border-border p-3 rounded-xl"><CheckCircle2 className="w-4 h-4 text-[#22C55E] flex-shrink-0" /> Reserva de Emergência (Metas de segurança)</li>
                <li className="flex items-center gap-2 bg-white/[0.02] border border-border p-3 rounded-xl"><CheckCircle2 className="w-4 h-4 text-[#22C55E] flex-shrink-0" /> Saúde Financeira (Score inteligente via IA)</li>
              </ul>
            </div>

            {/* Modo Empresarial */}
            <div className="p-6 rounded-2xl border border-blue-500/20 bg-blue-500/[0.01] space-y-4">
              <div className="flex items-center gap-2 text-blue-400 font-extrabold text-xs uppercase tracking-wider">
                <div className="w-2 h-2 rounded-full bg-blue-400"></div> Modo Empresarial (CNPJ)
              </div>
              <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Foco em:</p>
              <ul className="flex flex-col gap-2.5 text-xs text-muted-foreground font-medium">
                <li className="flex items-center gap-2 bg-white/[0.02] border border-border p-3 rounded-xl"><CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" /> Faturamento (Acompanhe a receita da empresa)</li>
                <li className="flex items-center gap-2 bg-white/[0.02] border border-border p-3 rounded-xl"><CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" /> Custos Operacionais (Cada centavo mapeado)</li>
                <li className="flex items-center gap-2 bg-white/[0.02] border border-border p-3 rounded-xl"><CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" /> Lucro Real (Saiba quanto realmente sobrou)</li>
                <li className="flex items-center gap-2 bg-white/[0.02] border border-border p-3 rounded-xl"><CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" /> Margem (%) (A saúde real do seu negócio)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CONFIGURAÇÃO TEMA CLARO OU ESCURO */}
        <section className="max-w-xl mx-auto text-center py-12 px-4">
          <h3 className="text-lg font-extrabold text-white uppercase mb-2">Modo Claro ou Escuro? <span className="text-[#22C55E]">Você escolhe.</span></h3>
          <p className="text-xs text-muted-foreground font-medium leading-relaxed mb-6">O contexto (Pessoal ou Empresarial) <strong className="text-white">não está preso a um tema.</strong> Você usa Pessoal no escuro, Empresarial no claro — ou o oposto.</p>
          <button onClick={scrollToPricing} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#22C55E] to-[#4ADE80] text-black font-extrabold text-xs uppercase tracking-widest px-6 py-4 rounded-xl shadow-lg">
            ATIVAR MINHA DIREÇÃO LUCRATIVA <ArrowRight className="w-4 h-4" />
          </button>
        </section>

        {/* 5. MARINHO IA SECTION (MOCK SMARTPHONE CELULAR 2) */}
        <section className="max-w-4xl mx-auto px-4 py-20 border-b border-border/40 bg-white/[0.005]">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4 text-center md:text-left">
              <span className="text-[10px] font-extrabold text-[#22C55E] border border-[#22C55E]/20 bg-[#22C55E]/5 px-2.5 py-1 rounded-md uppercase tracking-widest inline-flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Consultor IA 24h
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight leading-tight">Marinho IA: <span className="text-[#22C55E]">O cérebro que lança tudo por você.</span></h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-medium">
                <strong className="text-white">Esqueça digitação manual travada.</strong> O Marinho agora lê <strong className="text-[#22C55E]">mensagens do chat de forma fluida</strong> — interpretando e organizando lançamentos completos de custos em segundos.
              </p>
              <ul className="flex flex-col gap-2 pt-2 text-xs font-bold uppercase tracking-wide text-white/90 text-left max-w-xs mx-auto md:mx-0">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" /> Lançamento Inteligente em Massa via Chat</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" /> Inteligência Conversacional Estratégica</li>
              </ul>
              <button onClick={scrollToPricing} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#22C55E] to-[#4ADE80] text-black font-extrabold text-xs uppercase tracking-widest px-6 py-4 rounded-xl shadow-lg">
                ATIVAR MINHA DIREÇÃO LUCRATIVA <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            
            {/* MOCK CELULAR 2 */}
            <div className="relative mx-auto w-full max-w-[280px] h-[560px] bg-[#000] border-[10px] border-[#1a1a1a] rounded-[40px] shadow-2xl card-glow overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#1a1a1a] rounded-b-2xl z-20"></div>
              <img src="/marinho-sommar.jpg" alt="Assistente Virtual Marinho Inteligência Financeira" className="w-full h-full object-cover rounded-[30px]" />
            </div>
          </div>
        </section>

        {/* 6. FUNCIONALIDADES DE ALTO VALOR */}
        <section className="max-w-4xl mx-auto px-4 py-20 border-b border-border/40">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-[10px] font-extrabold text-[#22C55E] border border-[#22C55E]/20 bg-[#22C55E]/5 px-3 py-1 rounded-full uppercase tracking-widest">Método Concreto</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight mt-4">Funcionalidades de <span className="text-[#22C55E]">Alto Valor</span></h2>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">Cada recurso foi pensado para resolver um problema real de quem precisa controlar finanças com profissionalismo estruturado.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto mb-16">
            <div className="p-5 rounded-xl border border-border bg-[#060606] space-y-2">
              <span className="text-[10px] font-bold text-[#22C55E] uppercase tracking-wider">Lançamento em Massa via Chat</span>
              <p className="text-xs text-muted-foreground font-medium leading-relaxed">Mande múltiplos blocos de custos em texto corrido de uma só vez. O parser analisa os dados e processa toda a sua carteira em <strong className="text-white">segundos</strong>.</p>
            </div>
            <div className="p-5 rounded-xl border border-border bg-[#060606] space-y-2">
              <span className="text-[10px] font-bold text-[#22C55E] uppercase tracking-wider">Gestão de Cartões</span>
              <p className="text-xs text-muted-foreground font-medium leading-relaxed">Cadastre e gerencie seus cartões com controle estrito de faturas. Acompanhe despesas consolidadas sem burocracia.</p>
            </div>
            <div className="p-5 rounded-xl border border-border bg-[#060606] space-y-2">
              <span className="text-[10px] font-bold text-[#22C55E] uppercase tracking-wider">Parcelamento Inteligente (Fluxo de Caixa)</span>
              <p className="text-xs text-muted-foreground font-medium leading-relaxed">Lance compras parceladas uma única vez e veja o impacto no fluxo de caixa futuro. Saiba exatamente quanto do seu dinheiro já está conhecido.</p>
            </div>
            <div className="p-5 rounded-xl border border-border bg-[#060606] space-y-2">
              <span className="text-[10px] font-bold text-[#22C55E] uppercase tracking-wider">Divisão entre Sócios (Multi-Membros)</span>
              <p className="text-xs text-muted-foreground font-medium leading-relaxed">Gestão de membros corporativos com fotos e divisão proporcional de gastos. Perfeito para sócios, casais ou famílias.</p>
            </div>
          </div>

          {/* REAL TIME ANALYTICS (MOCK SMARTPHONE CELULAR 3) */}
          <div className="grid md:grid-cols-2 gap-12 items-center bg-white/[0.005] p-6 rounded-2xl border border-border max-w-3xl mx-auto">
            <div className="space-y-4 text-center md:text-left">
              <span className="text-[10px] font-extrabold text-[#22C55E] uppercase tracking-widest flex items-center justify-center md:justify-start gap-1.5">
                <BarChart3 className="w-3.5 h-3.5" /> Análise de Dados
              </span>
              <h3 className="text-xl font-extrabold text-white uppercase tracking-tight">Receitas, despesas e <span className="text-[#22C55E]">projeção patrimonial</span> em tempo real.</h3>
              <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                Visualize o <strong className="text-white">capital disponível</strong>, sua <strong className="text-white">evolução patrimonial</strong> e onde estão as <strong className="text-red-400">sangrias do seu mês.</strong>
              </p>
              <button onClick={scrollToPricing} className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#22C55E] to-[#4ADE80] text-black font-extrabold text-xs uppercase tracking-widest px-5 py-3.5 rounded-xl">
                ATIVAR MINHA DIREÇÃO LUCRATIVA <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            
            {/* MOCK CELULAR 3 */}
            <div className="relative mx-auto w-full max-w-[280px] h-[560px] bg-[#000] border-[10px] border-[#1a1a1a] rounded-[40px] shadow-2xl card-glow overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#1a1a1a] rounded-b-2xl z-20"></div>
              <img src="/resumo-sommar.jpg" alt="Análise de Dados Gráficos Finanças" className="w-full h-full object-cover rounded-[30px]" />
            </div>
          </div>
        </section>

        {/* 7. PÚBLICO-ALVO SECTION */}
        <section className="max-w-4xl mx-auto px-4 py-20 border-b border-border/40">
          <div className="text-center max-w-xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight">Para quem é o <span className="text-[#22C55E]">Sommar App?</span></h2>
            <p className="text-xs text-muted-foreground mt-2 font-medium">Se você precisa separar vida pessoal da profissional de maneira blindada, o Sommar é focado em você.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="p-6 rounded-xl border border-border bg-[#060606] text-center space-y-3">
              <div className="w-10 h-10 bg-[#22C55E]/5 border border-[#22C55E]/10 rounded-xl flex items-center justify-center mx-auto text-[#22C55E]"><Smartphone className="w-5 h-5" /></div>
              <h3 className="text-sm font-extrabold text-white uppercase">O CLT Visionário</h3>
              <p className="text-xs text-muted-foreground leading-relaxed font-medium">Domine suas finanças pessoais hoje e já prepare o terreno para empreender amanhã. O Modo Pessoal é seu ponto de partida estratégico.</p>
            </div>
            <div className="p-6 rounded-xl border border-border bg-[#060606] text-center space-y-3">
              <div className="w-10 h-10 bg-[#22C55E]/5 border border-[#22C55E]/10 rounded-xl flex items-center justify-center mx-auto text-[#22C55E]"><Sparkles className="w-5 h-5" /></div>
              <h3 className="text-sm font-extrabold text-white uppercase">O Freelancer / Autônomo</h3>
              <p className="text-xs text-muted-foreground leading-relaxed font-medium">Renda variável exige flexibilidade constante. Separe seus projetos operacionais das contas de casa e saiba exatamente a sua margem real por mês.</p>
            </div>
            <div className="p-6 rounded-xl border border-border bg-[#060606] text-center space-y-3">
              <div className="w-10 h-10 bg-[#22C55E]/5 border border-[#22C55E]/10 rounded-xl flex items-center justify-center mx-auto text-[#22C55E]"><BarChart3 className="w-5 h-5" /></div>
              <h3 className="text-sm font-extrabold text-white uppercase">O Empreendedor / MEI</h3>
              <p className="text-xs text-muted-foreground leading-relaxed font-medium">Pare de confundir faturamento bruto com lucro líquido. O Modo Empresarial te mostra faturamento, despesas operacionais e Lucro Real com precisão milimétrica.</p>
            </div>
          </div>
        </section>

        {/* 8. ARSENAL DE BÔNUS */}
        <section className="max-w-4xl mx-auto px-4 py-20">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-[10px] font-extrabold text-[#22C55E] border border-[#22C55E]/20 bg-[#22C55E]/5 px-3 py-1 rounded-full uppercase tracking-widest">Arsenal de Bônus</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight mt-4">Sua Gestão Profissional com um <span className="text-[#22C55E]">Arsenal de Bônus</span></h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="p-5 rounded-xl border border-border bg-[#060606] space-y-2 flex flex-col justify-between">
              <div>
                <span className="text-[9px] font-extrabold text-[#22C55E] uppercase tracking-wider block mb-2">Bônus Incluso no plano</span>
                <h4 className="text-xs font-extrabold text-white uppercase">Marinho IA — Gerente Financeiro 24h</h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed font-medium pt-2">Esqueça formulários engessados. O Marinho gerencia e lança suas despesas por chat nativo, organizando fluxos em segundos.</p>
              </div>
            </div>
            <div className="p-5 rounded-xl border border-border bg-[#060606] space-y-2 flex flex-col justify-between">
              <div>
                <span className="text-[9px] font-extrabold text-[#22C55E] uppercase tracking-wider block mb-2">3 e-books completos</span>
                <h4 className="text-xs font-extrabold text-white uppercase">Método "O Lucro Real do Empreendedor"</h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed font-medium pt-2">O guia estratégico definitivo para acabar com o caos financeiro empresarial e separar de vez seu CPF da sua movimentação de caixa.</p>
              </div>
            </div>
            <div className="p-5 rounded-xl border border-border bg-[#060606] space-y-2 flex flex-col justify-between">
              <div>
                <span className="text-[9px] font-extrabold text-[#22C55E] uppercase tracking-wider block mb-2">Valor Incalculável</span>
                <h4 className="text-xs font-extrabold text-white uppercase">Acesso Vitalício às Atualizações</h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed font-medium pt-2">Tenha acesso livre a todas as futuras atualizações e melhorias na inteligência do assistente Marinho IA sem pagar nenhuma taxa adicional.</p>
              </div>
            </div>
          </div>

          <div className="max-w-xs mx-auto mt-8">
            <button onClick={scrollToPricing} className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#22C55E] to-[#4ADE80] text-black font-extrabold text-xs uppercase tracking-widest px-6 py-4 rounded-xl shadow-xl shadow-[#22C55E]/10 animate-pulse-glow">
              QUERO GARANTIR MINHA VAGA E TODOS OS BÔNUS <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* 9. OFERTA E PREÇO - PRICING SECTION */}
        <section id="pricing" className="border-t border-border bg-white/[0.01] py-24 px-4 scroll-mt-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center max-w-xl mx-auto mb-16">
              <h2 className="text-3xl font-extrabold text-white uppercase tracking-tight">Invista na <span className="text-[#22C55E]">profissionalização</span> do seu lucro</h2>
              <div className="p-4 rounded-xl border border-red-500/10 bg-red-500/[0.01] text-xs font-medium text-muted-foreground mt-6 leading-relaxed max-w-md mx-auto">
                "Quanto custa a hora de um consultor financeiro? No mínimo <strong className="text-white underline">R$ 250,00</strong>. Quanto custa um ano de cálculo que faz você pagar imposto sobre o seu próprio pró-labore? <strong className="text-red-400 underline">Milhares de reais.</strong>"
              </div>
              <p className="text-xs text-muted-foreground mt-6">Escolha o plano ideal para transformar sua gestão financeira em uma máquina de lucro estável.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto items-stretch">
              {/* PLANO MENSAL */}
              <div className="p-6 rounded-2xl border border-border bg-[#060606] flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-white uppercase tracking-wider">Plano Mensal</h3>
                  <p className="text-[11px] text-muted-foreground mt-1">Controle total com pagamento flexível.</p>
                  
                  <div className="my-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-xs font-bold text-muted-foreground">R$</span>
                      <span className="text-4xl font-extrabold text-white tracking-tight">39,90</span>
                      <span className="text-[10px] font-bold text-neutral-500"> /mês</span>
                    </div>
                    <p className="text-[9px] text-[#22C55E] font-bold mt-1 uppercase tracking-wider">O preço de um café com pão de queijo pelo seu controle de vida!</p>
                  </div>

                  <ul className="flex flex-col gap-3 border-t border-border/40 pt-5 text-[11px] text-muted-foreground font-medium">
                    <li className="flex items-center gap-2 text-white/90"><CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] flex-shrink-0" /> Modo Pessoal + Modo Empresarial</li>
                    <li className="flex items-center gap-2 text-white/90"><CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] flex-shrink-0" /> Lucro Real e Margem automáticos</li>
                    <li className="flex items-center gap-2 text-white/90"><CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] flex-shrink-0" /> Lançamento em Massa via Chat</li>
                    <li className="flex items-center gap-2 text-white/90"><CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] flex-shrink-0" /> Parcelamento automático de cartão</li>
                    <li className="flex items-center gap-2 text-white/90"><CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] flex-shrink-0" /> Gestão de Cartões consolidada</li>
                    <li className="flex items-center gap-2 text-white/90"><CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] flex-shrink-0" /> Divisão entre sócios e membros</li>
                    <li className="flex items-center gap-2 text-white/90"><CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] flex-shrink-0" /> PWA — sem ocupar espaço no celular</li>
                    <li className="flex items-center gap-2 text-white/90"><CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] flex-shrink-0" /> Segurança com TLS (nível bancário)</li>
                    <li className="flex items-center gap-2 text-white/60 pt-2 border-t border-white/5"><CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]/50" /> Bônus exclusivo incluso:</li>
                    <li className="flex items-center gap-2 text-white/90 pl-2">○ Marinho IA — Gerente Financeiro 24h</li>
                  </ul>
                </div>

                <div className="pt-6">
                  <a href="https://pay.cakto.com.br/ni9nrpf_687767" target="_blank" rel="noreferrer" className="w-full text-center block bg-white/5 text-white border border-border text-[11px] font-extrabold uppercase tracking-widest py-3.5 rounded-xl hover:bg-white/10 transition-colors">
                    ATIVAR PLANO MENSAL •
                  </a>
                  <div className="flex justify-between items-center text-[10px] text-neutral-500 font-bold uppercase tracking-wider pt-3 px-1">
                    <span>🔒 Pagamento Seguro</span>
                    <span>⚡ Liberação Imediata</span>
                  </div>
                </div>
              </div>

              {/* PLANO ANUAL */}
              <div className="p-6 rounded-2xl border-2 border-[#22C55E] bg-[#060606] flex flex-col justify-between relative shadow-xl card-glow">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#22C55E] text-black text-[9px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full">
                  ★ MELHOR CUSTO BENEFÍCIO
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-white uppercase tracking-wider">Plano Anual</h3>
                  <p className="text-[11px] text-muted-foreground mt-1">Para empresários que jogam sério.</p>
                  
                  <div className="my-6">
                    <span className="text-neutral-500 line-through text-[11px] font-bold block">R$ 397,00</span>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="text-xs font-bold text-muted-foreground">R$</span>
                      <span className="text-4xl font-extrabold text-[#22C55E] tracking-tight">297</span>
                      <span className="text-[10px] font-bold text-neutral-500"> /ano</span>
                    </div>
                    <p className="text-[9px] text-[#22C55E] font-bold mt-1 uppercase tracking-wider">ou 12x de R$ 30,76 (ECONOMIZE + DE R$ 100)</p>
                  </div>

                  <ul className="flex flex-col gap-3 border-t border-border/40 pt-5 text-[11px] text-white/90 font-medium">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] flex-shrink-0" /> Modo Pessoal + Modo Empresarial</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] flex-shrink-0" /> Lucro Real e Margem automáticos</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] flex-shrink-0" /> Lançamento em Massa via Chat</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] flex-shrink-0" /> Parcelamento automático de cartão</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] flex-shrink-0" /> Gestão de Cartões consolidada</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] flex-shrink-0" /> Divisão entre sócios e membros</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] flex-shrink-0" /> PWA — sem ocupar espaço no celular</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] flex-shrink-0" /> Segurança com TLS (nível bancário)</li>
                    <li className="flex items-center gap-2 text-[#22C55E] pt-2 border-t border-white/5"><CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" /> + BÔNUS EXCLUSIVOS:</li>
                    <li className="flex items-center gap-2 text-white/90 pl-2">✓ Marinho IA — Gerente Financeiro 24h</li>
                    <li className="flex items-center gap-2 text-white/90 pl-2">✓ Método \"O Lucro Real do Empreendedor\"</li>
                  </ul>
                </div>

                <div className="pt-6">
                  <a href="https://pay.cakto.com.br/itbvz49" target="_blank" rel="noreferrer" className="w-full text-center block bg-gradient-to-r from-[#22C55E] to-[#4ADE80] text-black font-extrabold text-[11px] uppercase tracking-widest py-3.5 rounded-xl shadow-md shadow-[#22C55E]/10 hover:scale-[1.01] transition-transform duration-200">
                    ATIVAR PLANO ANUAL
                  </a>
                  <div className="flex justify-between items-center text-[10px] text-neutral-500 font-bold uppercase tracking-wider pt-3 px-1">
                    <span>🔒 Pagamento Seguro</span>
                    <span>⚡ Liberação Imediata</span>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-[10px] text-neutral-500 text-center font-medium max-w-md mx-auto mt-8 leading-relaxed">
              Garantia incondicional de 7 dias. Não gostou? Devolvemos 100% do seu investimento sem perguntas chatas.
            </p>
          </div>
        </section>

        {/* PROVA SOCIAL - TESTIMONIALS SECTION */}
        <section className="border-b border-border/40 bg-white/[0.002] py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-[10px] font-extrabold text-[#22C55E] border border-[#22C55E]/20 bg-[#22C55E]/5 px-3 py-1 rounded-full uppercase tracking-widest">⭐ Depoimentos</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight mt-4">O que dizem nossos <span className="text-[#22C55E]">usuários</span></h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <div className="p-5 rounded-xl border border-border bg-[#060606] flex flex-col justify-between gap-4">
                <p className="text-xs text-muted-foreground font-medium leading-relaxed italic">
                  "Sempre desistia de anotar meus gastos porque nenhum app aceitava que meu salário mudava todo mês com as comissões. O Sommar resolveu isso com a edição de valores mensais!"
                </p>
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#22C55E] flex items-center justify-center text-[11px] font-black">R</div>
                  <div>
                    <h5 className="text-[11px] font-extrabold text-white uppercase">Ricardo S.</h5>
                    <p className="text-[9px] text-neutral-500 font-bold uppercase">Autônomo</p>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-xl border border-border bg-[#060606] flex flex-col justify-between gap-4">
                <p className="text-xs text-muted-foreground font-medium leading-relaxed italic">
                  "O parcelamento automático de cartão me salvou. Finalmente sei exatamente quanto do meu salário já está comprometido para os próximos meses."
                </p>
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#22C55E] flex items-center justify-center text-[11px] font-black">A</div>
                  <div>
                    <h5 className="text-[11px] font-extrabold text-white uppercase">Ana L.</h5>
                    <p className="text-[9px] text-neutral-500 font-bold uppercase">Empregada CLT</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 10. SOBRE O CRIADOR - ABOUT SECTION */}
        <section className="max-w-4xl mx-auto px-4 py-20 border-b border-border/40">
          <div className="grid md:grid-cols-3 gap-8 items-center max-w-3xl mx-auto">
            <div className="md:col-span-1 rounded-2xl border border-border p-1.5 bg-[#0a0a0a] max-w-[200px] mx-auto relative">
              <img src="/felipe-sobrinho.jpg" alt="Felipe — Criador do Sommar App" className="w-full h-auto rounded-xl object-cover" />
              <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-[#22C55E] text-black text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-md whitespace-nowrap">Idealizador do Sommar</div>
            </div>
            <div className="md:col-span-2 text-center md:text-left space-y-3 pt-6 md:pt-0">
              <span className="text-[10px] font-extrabold text-[#22C55E] border border-[#22C55E]/20 bg-[#22C55E]/5 px-2.5 py-0.5 rounded uppercase tracking-widest inline-block">Sobre o Criador</span>
              <h2 className="text-2xl font-extrabold text-white uppercase tracking-tight">Criado por quem <span className="text-[#22C55E]">sentiu a dor na pele.</span></h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-medium">
                Muito prazer, eu sou o <strong className="text-white">Felipe</strong>, idealizador do Sommar App.
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                Criei o Sommar porque, além de sentir, percebi a frustração das pessoas ao usar planilhas que não se adequam à vida real. Eu precisava de algo que atendesse o maior número de pessoas, e o maior número de realidades.
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                Como não encontrei a ferramenta perfeita, <span className="text-[#22C55E] font-bold">decidi construí-la.</span> O Sommar é o resultado de um trabalho focado em entregar segurança, design premium e, acima de tudo, flexibilidade para quem é CLT, freelancer ou empreendedor.
              </p>
              <p className="text-xs text-white font-bold leading-relaxed">
                Minha missão é ajudar você a transformar sua relação com o dinheiro, <span className="text-[#22C55E]">saindo do caos e construindo um conforto. Vamos juntos?</span>
              </p>
            </div>
          </div>
        </section>

        {/* 11. GARANTIA - GUARANTEE SECTION */}
        <section className="max-w-4xl mx-auto px-4 py-16">
          <div className="p-8 max-w-2xl mx-auto rounded-3xl gradient-border flex flex-col items-center gap-4 text-center">
            <span className="text-[9px] font-extrabold text-[#22C55E] border border-[#22C55E]/20 bg-[#22C55E]/5 px-2.5 py-0.5 rounded uppercase tracking-widest">Garantia Total</span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white uppercase tracking-tight">Garantia <span className="text-[#22C55E]">Incondicional</span> de 7 dias</h2>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto leading-relaxed font-medium">
              Acreditamos tanto no poder do Sommar App que oferecemos uma garantia sem riscos. Experimente todas as funcionalidades por 7 dias. Se por qualquer motivo você não ficar satisfeito, <strong className="text-white">devolvemos 100% do seu dinheiro.</strong> Sem perguntas, sem burocracia.
            </p>
            <div className="flex gap-4 text-[10px] text-[#22C55E] font-bold uppercase tracking-wider pt-2">
              <span>✓ Reembolso total</span>
              <span>✓ Sem perguntas</span>
              <span>✓ Risco zero</span>
            </div>
          </div>
        </section>

        {/* 12. FAQ - PERGUNTAS FREQUENTES */}
        <section className="border-t border-border bg-white/[0.01] py-20 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-[10px] font-extrabold text-[#22C55E] border border-[#22C55E]/20 bg-[#22C55E]/5 px-3 py-1 rounded-full uppercase tracking-widest">Quebra de Objeções</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight mt-4">Perguntas <span className="text-[#22C55E]">Frequentes</span></h2>
            </div>

            <div className="flex flex-col gap-3 max-w-xl mx-auto">
              {[
                { q: "Meus dados estão seguros?", a: "Totalmente. O Sommar App utiliza criptografia de nível bancário TLS e armazenamento isolado para garantir a privacidade total e inviolável de todas as suas informações financeiras." },
                { q: "Preciso de conta em algum banco específico?", a: "Não. A nossa inteligência e os parsers de importação aceitam a leitura de arquivos e extratos de qualquer instituição financeira ou banco operando nacionalmente." },
                { q: "Como recebo o acesso?", a: "Imediatamente após a confirmação de liquidação pela Cakto, você receberá um e-mail contendo as credenciais de autenticação privada para acessar o ecossistema em app.sommarapp.com.br." },
                { q: "Como funciona a garantia de 7 dias?", a: "Dentro do período de 7 dias, se decidir não continuar, basta acionar nosso canal de suporte ou a própria plataforma Cakto. Cancelamos seu plano e estornamos 100% do valor pago imediatamente." }
              ].map((item, index) => (
                <div key={index} className="border border-border bg-[#060606] rounded-xl overflow-hidden">
                  <button onClick={() => toggleFaq(index)} className="w-full flex items-center justify-between p-4 text-left font-bold text-xs sm:text-sm text-white uppercase tracking-wide hover:bg-white/[0.01]">
                    <span>{item.q}</span>
                    <ChevronDown className={`w-4 h-4 text-[#22C55E] transition-transform duration-200 ${activeFaq === index ? "rotate-180" : ""}`} />
                  </button>
                  {activeFaq === index && (
                    <div className="px-4 pb-4 pt-1 text-xs text-muted-foreground leading-relaxed border-t border-border/30 bg-white/[0.005]">
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CALL TO ACTION FINAL BANNER */}
        <section className="max-w-2xl mx-auto px-4 py-12 text-center">
          <div className="p-8 rounded-2xl border border-[#22C55E]/10 bg-gradient-to-b from-[#22C55E]/[0.02] to-transparent space-y-4">
            <h3 className="text-xl font-extrabold text-white uppercase">Separe. Controle. <span className="text-[#22C55E]">Escale.</span></h3>
            <p className="text-xs text-muted-foreground font-medium leading-relaxed max-w-xs mx-auto">Profissionalize sua gestão financeira hoje e veja sua empresa crescer com números reais.</p>
            <button onClick={scrollToPricing} className="inline-flex items-center gap-2 bg-gradient-to-r from-[#22C55E] to-[#4ADE80] text-black font-extrabold text-xs uppercase tracking-widest px-6 py-4 rounded-xl shadow-lg">
              ATIVAR MINHA DIREÇÃO LUCRATIVA <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-border py-8 bg-black text-center text-[10px] text-neutral-500 font-bold">
        <div className="max-w-4xl mx-auto px-4 flex flex-col gap-4 sm:flex-row sm:justify-between items-center">
          <div className="flex items-center gap-2">
            <img src="/favicon.jpg" alt="Logo" className="w-5 h-5 rounded-md object-contain" />
            <span>Sommar App</span>
          </div>
          <div className="flex gap-4 uppercase text-[9px] tracking-wider text-neutral-600">
            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
          </div>
          <span>© 2026 Sommar App. Todos os direitos reservados.</span>
        </div>
      </footer>

    </div>
  );
}