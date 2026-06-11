import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  ChevronDown, 
  Smartphone, 
  Lock,
  Sparkles,
  BarChart3,
  Calendar,
  ListChecks,
  Layers,
  Play,
  ShieldCheck,
  MousePointerClick
} from "lucide-react";

const PRIMARY_CTA =
  'inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#22C55E] to-[#4ADE80] text-black font-extrabold uppercase tracking-widest rounded-xl shadow-lg shadow-[#22C55E]/25 hover:scale-[1.02] active:scale-[0.99] transition-transform duration-200';

const HERO_VIDEO_ID = '2jtToi2wIps';
const HERO_VIDEO_EMBED = `https://www.youtube-nocookie.com/embed/${HERO_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`;

type IPhoneMockupProps = {
  src: string;
  alt: string;
  priority?: boolean;
  tilt?: 'left' | 'right' | 'none';
};

function IPhoneMockup({ src, alt, priority = false, tilt = 'none' }: IPhoneMockupProps) {
  const tiltClass =
    tilt === 'left'
      ? '-rotate-2 sm:-rotate-[4deg] md:-rotate-[6deg]'
      : tilt === 'right'
        ? 'rotate-2 sm:rotate-[4deg] md:rotate-[6deg]'
        : '';

  return (
    <div
      className={`relative mx-auto w-full max-w-[220px] sm:max-w-[260px] md:max-w-[280px] ${tiltClass} transition-transform duration-300 hover:rotate-0`}
    >
      <div
        className="absolute inset-6 sm:inset-8 rounded-[40px] bg-[#22C55E]/[0.07] blur-2xl pointer-events-none"
        aria-hidden
      />
      <div className="relative rounded-[42px] sm:rounded-[44px] p-[2px] bg-gradient-to-b from-[#454545] via-[#1c1c1c] to-[#080808] shadow-[0_28px_56px_-14px_rgba(0,0,0,0.85)]">
        <div className="rounded-[40px] sm:rounded-[42px] bg-[#050505] p-[9px] sm:p-[10px] border border-white/[0.07]">
          <div className="relative rounded-[30px] sm:rounded-[32px] overflow-hidden bg-[#050505] aspect-[9/19.5]">
            <div
              className="absolute top-2.5 sm:top-3 left-1/2 -translate-x-1/2 z-20 w-[32%] max-w-[100px] h-[22px] sm:h-[26px] bg-[#050505] rounded-full border border-white/[0.08] shadow-[inset_0_1px_2px_rgba(255,255,255,0.06)]"
              aria-hidden
            />
            <img
              src={src}
              alt={alt}
              width={390}
              height={844}
              className="w-full h-full object-cover object-top"
              loading={priority ? 'eager' : 'lazy'}
              decoding="async"
              {...(priority ? { fetchPriority: 'high' as const } : { fetchPriority: 'low' as const })}
            />
          </div>
        </div>
        <div className="absolute -right-[2px] top-[26%] w-[3px] h-[11%] bg-[#2a2a2a] rounded-r-sm opacity-80" aria-hidden />
        <div className="absolute -left-[2px] top-[20%] w-[3px] h-[7%] bg-[#2a2a2a] rounded-l-sm opacity-60" aria-hidden />
        <div className="absolute -left-[2px] top-[30%] w-[3px] h-[11%] bg-[#2a2a2a] rounded-l-sm opacity-60" aria-hidden />
      </div>
    </div>
  );
}

function TrustBadges({ className = '' }: { className?: string }) {
  const items = [
    {
      icon: ShieldCheck,
      title: '7 Dias de Garantia Incondicional',
      desc: 'Teste sem risco. Não gostou? Devolvemos 100%.',
    },
    {
      icon: Lock,
      title: 'Ambiente Seguro',
      desc: 'Seus dados financeiros protegidos a cada acesso.',
    },
    {
      icon: MousePointerClick,
      title: 'Cancelamento sem burocracia',
      desc: 'Cancele quando quiser, sem complicação.',
    },
  ] as const;

  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto ${className}`}
      role="list"
      aria-label="Garantias de compra segura"
    >
      {items.map(({ icon: Icon, title, desc }) => (
        <div
          key={title}
          role="listitem"
          className="flex items-start gap-3 p-3 rounded-xl border border-border/80 bg-[#060606]/80 text-left"
        >
          <div className="w-9 h-9 rounded-lg border border-[#22C55E]/20 bg-[#22C55E]/5 flex items-center justify-center text-[#22C55E] flex-shrink-0">
            <Icon className="w-4 h-4" strokeWidth={1.75} aria-hidden />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] sm:text-[11px] font-extrabold text-white uppercase tracking-wide leading-snug">
              {title}
            </p>
            <p className="text-[9px] sm:text-[10px] text-muted-foreground font-medium mt-0.5 leading-relaxed">
              {desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<'vendas' | 'obrigado'>('vendas');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [heroVideoActive, setHeroVideoActive] = useState(false);

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

  // CAPTURA DINÂMICA DE UTMS E REESCRITA DE LINKS DA CAKTO (MANTENDO O ESTADO INTACTO)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 1. Extrai os parâmetros diretamente da URL do anúncio
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get("utm_source");
    const utmMedium = urlParams.get("utm_medium");
    const utmCampaign = urlParams.get("utm_campaign");

    // 2. Persiste com segurança no armazenamento local da sessão
    if (utmSource) sessionStorage.setItem("utm_source", utmSource);
    if (utmMedium) sessionStorage.setItem("utm_medium", utmMedium);
    if (utmCampaign) sessionStorage.setItem("utm_campaign", utmCampaign);

    const savedSource = sessionStorage.getItem("utm_source");
    const savedMedium = sessionStorage.getItem("utm_medium");
    const savedCampaign = sessionStorage.getItem("utm_campaign");

    // 3. Se houver rastro de tráfego, injeta os parâmetros em todos os links da Cakto
    if (savedSource || savedMedium || savedCampaign) {
      setTimeout(() => {
        const links = document.querySelectorAll("a");
        links.forEach(link => {
          let href = link.href;
          if (href && (href.includes("cakto.com") || href.includes("pay.cakto"))) {
            try {
              let url = new URL(href);
              if (savedSource) {
                url.searchParams.set("utm_source", savedSource);
                url.searchParams.set("src", savedSource); // Mapeamento SRC nativo Cakto
              }
              if (savedMedium) url.searchParams.set("utm_medium", savedMedium);
              if (savedCampaign) url.searchParams.set("utm_campaign", savedCampaign);
              
              link.href = url.toString();
            } catch (e) {
              console.error("Erro ao processar URL de checkout:", e);
            }
          }
        });
      }, 300); // Delay milimétrico para garantir renderização do DOM do React
    }
  }, [currentPage]);

  // Disparo assíncrono purificado do Pixel e CAPI - Apenas PageView Estratégico
  useEffect(() => {
    const PIXEL_ID = "1650440006207697";
    const CAPI_TOKEN = "EAB4hda1l5Q0BRXIWNYaekyTJ2LraBp2e3o8Mw3UCYrVgZAKmDVmNClZC98nUeBRFePBRuslzWrjpQfK6lsOsAd2sgvRIUm7Y0ZA7EpHtchZBFqs06aNW6ObZBvd0ZAv5mki2FvLiGuDDmKyE47u42fGOYBxNE8xsHPMi5vr4Yxk3bQo6X04CYZBSiLJVIG5tdlRIgZDZD";
    
    const isPurchase = currentPage === 'obrigado';

    // Disparo do Pixel no Navegador (Acesso dinâmico para ignorar erro de tipagem do TS)
    const globalWindow = window as any;
    if (globalWindow.fbq) {
      if (isPurchase) {
        globalWindow.fbq('track', 'Purchase', { value: 39.90, currency: 'BRL' });
      } else {
        globalWindow.fbq('track', 'PageView');
      }
    }
    
    // Disparo da API de Conversões (CAPI - Servidor Back-end)
    fetch(`https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${CAPI_TOKEN}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: [{
          event_name: isPurchase ? "Purchase" : "PageView",
          event_time: Math.floor(Date.now() / 1000),
          action_source: "website",
          event_source_url: window.location.href,
          ...(isPurchase ? { custom_data: { value: 39.90, currency: "BRL" } } : {}),
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
          <button
            onClick={scrollToPricing}
            className={`${PRIMARY_CTA} text-[10px] sm:text-xs px-4 sm:px-5 py-2.5 sm:py-3`}
          >
            VER PLANOS <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      <main className="pt-20 sm:pt-24">
        
        {/* 1. HERO SECTION - CPF x CNPJ */}
        <section className="max-w-4xl mx-auto px-4 pt-12 sm:pt-16 pb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-white/[0.02] mb-6">
            <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse"></span>
            <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest text-white/80">
              Para autônomos e empresários
            </span>
          </div>
          
          <h1 className="text-2xl sm:text-4xl md:text-[2.65rem] font-extrabold uppercase tracking-tight text-white leading-[1.15] mb-6 max-w-3xl mx-auto">
            Pare de misturar o dinheiro da casa com o da empresa. <span className="text-[#22C55E]">Veja seu lucro real</span> sem planilha.
          </h1>
          
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto mb-8 sm:mb-10 font-medium leading-relaxed">
            O Sommar separa suas finanças pessoais das da empresa em um só lugar. Você descobre, em minutos, quanto seu negócio realmente lucra — <span className="text-white">sem confundir salário com faturamento.</span>
          </p>

          {/* VÍDEO DE DEMONSTRAÇÃO — embed adiado até o clique (LCP) */}
          <div className="max-w-2xl mx-auto w-full mb-10 rounded-2xl border border-border bg-[#0a0a0a] p-2 shadow-2xl card-glow">
            <div className="relative w-full pb-[56.25%] h-0 rounded-xl overflow-hidden bg-black">
              {heroVideoActive ? (
                <iframe
                  className="absolute top-0 left-0 w-full h-full border-0"
                  src={HERO_VIDEO_EMBED}
                  title="Vídeo de demonstração Sommar App"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setHeroVideoActive(true)}
                  className="absolute inset-0 w-full h-full group cursor-pointer"
                  aria-label="Reproduzir vídeo de demonstração Sommar App"
                >
                  <img
                    src={`https://i.ytimg.com/vi/${HERO_VIDEO_ID}/hqdefault.jpg`}
                    alt=""
                    width={1280}
                    height={720}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-black/25 group-hover:bg-black/40 transition-colors">
                    <span className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-[#22C55E] to-[#4ADE80] flex items-center justify-center shadow-xl shadow-[#22C55E]/30 group-hover:scale-105 transition-transform">
                      <Play className="w-6 h-6 sm:w-7 sm:h-7 text-black ml-0.5" fill="currentColor" aria-hidden />
                    </span>
                  </span>
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-5 max-w-2xl mx-auto">
            <button
              onClick={scrollToPricing}
              className={`${PRIMARY_CTA} w-full sm:w-auto text-xs sm:text-sm px-10 py-5 shadow-2xl shadow-[#22C55E]/20`}
            >
              QUERO SEPARAR MINHAS FINANÇAS <ArrowRight className="w-4 h-4" />
            </button>
            <TrustBadges />
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
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight leading-tight">
                Suas contas <span className="text-[#22C55E]">pessoais e da empresa</span>, finalmente separadas.
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-medium">
                O Sommar mostra quanto entrou, quanto saiu e <strong className="text-white">quanto sobrou de lucro de verdade</strong> — sem você montar planilha.
              </p>
              <button
                type="button"
                onClick={scrollToPricing}
                className="text-[#22C55E] text-xs font-extrabold uppercase tracking-wider hover:underline underline-offset-4"
              >
                Ver planos e começar →
              </button>
            </div>
            
            <IPhoneMockup src="/lancar-sommar.jpg" alt="Interface de Lançamentos Sommar" tilt="right" />
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
        </section>

        {/* 5. MARINHO IA SECTION (MOCK SMARTPHONE CELULAR 2) */}
        <section className="max-w-4xl mx-auto px-4 py-20 border-b border-border/40 bg-white/[0.005]">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4 text-center md:text-left">
              <span className="text-[10px] font-extrabold text-[#22C55E] border border-[#22C55E]/20 bg-[#22C55E]/5 px-2.5 py-1 rounded-md uppercase tracking-widest inline-flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Consultor IA 24h
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight leading-tight">
                Anote gastos pelo <span className="text-[#22C55E]">chat</span> em segundos.
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-medium">
                <strong className="text-white">Sem formulário chato.</strong> Você manda os gastos por mensagem e o Sommar organiza tudo — <strong className="text-[#22C55E]">já separado entre pessoal e empresa.</strong>
              </p>
              <ul className="flex flex-col gap-2 pt-2 text-xs font-bold uppercase tracking-wide text-white/90 text-left max-w-xs mx-auto md:mx-0">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" /> Vários gastos de uma vez</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" /> Lucro atualizado na hora</li>
              </ul>
            </div>
            
            <IPhoneMockup src="/marinho-sommar.jpg" alt="Assistente Virtual Marinho Inteligência Financeira" tilt="left" />
          </div>
        </section>

        {/* 6. FUNCIONALIDADES DE ALTO VALOR */}
        <section className="max-w-4xl mx-auto px-4 py-20 border-b border-border/40">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-[10px] font-extrabold text-[#22C55E] border border-[#22C55E]/20 bg-[#22C55E]/5 px-3 py-1 rounded-full uppercase tracking-widest">Método Concreto</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight mt-4">Funcionalidades de <span className="text-[#22C55E]">Alto Valor</span></h2>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">Cada recurso foi pensado para resolver um problem real de quem precisa controlar finanças com profissionalismo estruturado.</p>
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
            
            <IPhoneMockup src="/resumo-sommar.jpg" alt="Análise de Dados Gráficos Finanças" tilt="right" />
          </div>
        </section>

        {/* ECOSSISTEMA SOMMAR — ROTINAS & COMPROMISSOS */}
        <section className="border-t border-b border-border/40 bg-[#050505] py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-[10px] font-extrabold text-[#22C55E] border border-[#22C55E]/20 bg-[#22C55E]/5 px-3 py-1 rounded-full uppercase tracking-widest inline-flex items-center gap-1.5">
                <Layers className="w-3 h-3" /> Ecossistema Sommar
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight mt-4">
                Um só app. <span className="text-[#22C55E]">Toda a sua operação.</span>
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-3 leading-relaxed font-medium">
                Você não precisa de três ferramentas diferentes. Finanças, rotinas e agenda vivem no mesmo sistema — o sistema operacional da sua rotina.
              </p>
            </div>

            {/* Rotinas — Consistência */}
            <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center mb-20 md:mb-24">
              <div className="order-2 md:order-1 space-y-4 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-[#050505] text-[#22C55E]">
                  <ListChecks className="w-4 h-4" strokeWidth={1.75} />
                  <span className="text-[10px] font-extrabold uppercase tracking-widest">Rotinas</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white uppercase tracking-tight">
                  <span className="text-[#22C55E]">Consistência</span> que vira resultado
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-medium max-w-md mx-auto md:mx-0">
                  Não é sobre trabalhar mais, é sobre fazer o que importa. Gerencie suas tarefas diárias com a mesma precisão do seu financeiro.
                </p>
              </div>
              <div className="order-1 md:order-2 flex justify-center md:justify-end px-2 sm:px-0">
                <IPhoneMockup
                  src="/rotinas-sommar.jpg"
                  alt="Módulo de Rotinas Sommar App"
                  tilt="right"
                />
              </div>
            </div>

            {/* Compromissos — Controle */}
            <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
              <div className="flex justify-center md:justify-start px-2 sm:px-0">
                <IPhoneMockup
                  src="/compromissos-sommar.jpg"
                  alt="Módulo de Compromissos e Agenda Sommar App"
                  tilt="left"
                />
              </div>
              <div className="space-y-4 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-[#050505] text-[#22C55E]">
                  <Calendar className="w-4 h-4" strokeWidth={1.75} />
                  <span className="text-[10px] font-extrabold uppercase tracking-widest">Compromissos</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white uppercase tracking-tight">
                  <span className="text-[#22C55E]">Controle</span> total do seu tempo
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-medium max-w-md mx-auto md:mx-0">
                  Seu tempo é seu maior ativo. Centralize sua agenda e nunca mais perca um prazo ou oportunidade de negócio.
                </p>
                <button
                  type="button"
                  onClick={scrollToPricing}
                  className="text-[#22C55E] text-xs font-extrabold uppercase tracking-wider hover:underline underline-offset-4"
                >
                  Ver planos →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* POR QUE O SOMMAR? */}
        <section className="max-w-4xl mx-auto px-4 py-20 border-b border-border/40">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-[10px] font-extrabold text-[#22C55E] border border-[#22C55E]/20 bg-[#22C55E]/5 px-3 py-1 rounded-full uppercase tracking-widest">Diferenciais</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight mt-4">
              Por que o <span className="text-[#22C55E]">Sommar?</span>
            </h2>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed font-medium">
              Tudo o que você precisa para operar como empreendedor — sem fragmentar sua rotina em apps isolados.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="p-5 rounded-xl border border-[#22C55E]/25 bg-[#050505] space-y-2 sm:col-span-2 lg:col-span-1 lg:row-span-1">
              <div className="w-9 h-9 rounded-lg border border-[#22C55E]/20 bg-[#22C55E]/5 flex items-center justify-center text-[#22C55E]">
                <Layers className="w-4 h-4" strokeWidth={1.75} />
              </div>
              <span className="text-[10px] font-bold text-[#22C55E] uppercase tracking-wider block">Integração total</span>
              <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                O impacto das suas tarefas diárias refletido direto no seu fluxo de caixa.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-border bg-[#050505] space-y-2">
              <div className="w-9 h-9 rounded-lg border border-border bg-white/[0.02] flex items-center justify-center text-[#22C55E]">
                <CheckCircle2 className="w-4 h-4" strokeWidth={1.75} />
              </div>
              <span className="text-[10px] font-bold text-white/80 uppercase tracking-wider block">CPF × CNPJ blindado</span>
              <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                Separação real entre vida pessoal e empresarial, com lucro e margem automáticos.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-border bg-[#050505] space-y-2">
              <div className="w-9 h-9 rounded-lg border border-border bg-white/[0.02] flex items-center justify-center text-[#22C55E]">
                <Sparkles className="w-4 h-4" strokeWidth={1.75} />
              </div>
              <span className="text-[10px] font-bold text-white/80 uppercase tracking-wider block">Marinho IA 24h</span>
              <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                Lançamentos em massa via chat — sem formulários engessados.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-border bg-[#050505] space-y-2">
              <div className="w-9 h-9 rounded-lg border border-border bg-white/[0.02] flex items-center justify-center text-[#22C55E]">
                <Smartphone className="w-4 h-4" strokeWidth={1.75} />
              </div>
              <span className="text-[10px] font-bold text-white/80 uppercase tracking-wider block">No celular, na hora</span>
              <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                Acesse pelo navegador do seu celular. Sem instalar nada e sem ocupar memória.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-border bg-[#050505] space-y-2">
              <div className="w-9 h-9 rounded-lg border border-border bg-white/[0.02] flex items-center justify-center text-[#22C55E]">
                <Lock className="w-4 h-4" strokeWidth={1.75} />
              </div>
              <span className="text-[10px] font-bold text-white/80 uppercase tracking-wider block">Ambiente seguro</span>
              <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                Seus dados financeiros protegidos em cada acesso, com a mesma segurança de um banco digital.
              </p>
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
                <span className="text-[9px] font-extrabold text-[#22C55E] uppercase tracking-wider block mb-2">E-book Completo</span>
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

        </section>

        {/* 9. OFERTA E PREÇO - PRICING SECTION */}
        <section id="pricing" className="border-t border-border bg-white/[0.01] py-24 px-4 scroll-mt-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center max-w-xl mx-auto mb-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight">
                Separe CPF e CNPJ hoje. <span className="text-[#22C55E]">Veja seu lucro real.</span>
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-4 leading-relaxed font-medium">
                Escolha o plano e comece agora. Menos que um almoço por semana para nunca mais misturar contas pessoais com as da empresa.
              </p>
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
                  <a
                    href="https://pay.cakto.com.br/ni9nrpf_687767"
                    target="_blank"
                    rel="noreferrer"
                    className={`${PRIMARY_CTA} w-full text-center text-[11px] py-4`}
                  >
                    COMEÇAR PLANO MENSAL <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* PLANO ANUAL */}
              <div className="p-6 rounded-2xl border-2 border-[#22C55E] bg-[#060606] flex flex-col justify-between relative shadow-xl card-glow">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base font-extrabold text-white uppercase tracking-wider">Plano Anual</h3>
                    <span className="bg-[#22C55E] text-black text-[8px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full">
                      ★ Melhor oferta
                    </span>
                  </div>
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
                    <li className="flex items-center gap-2 text-white/90 pl-2">✓ Método "O Lucro Real do Empreendedor"</li>
                  </ul>
                </div>

                <div className="pt-6">
                  <a
                    href="https://pay.cakto.com.br/itbvz49"
                    target="_blank"
                    rel="noreferrer"
                    className={`${PRIMARY_CTA} w-full text-center text-[11px] py-4 shadow-xl shadow-[#22C55E]/20`}
                  >
                    COMEÇAR PLANO ANUAL <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
            
            <TrustBadges className="mt-10" />
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
                { q: "Meus dados estão seguros?", a: "Sim. O Sommar usa ambiente seguro com proteção de dados no mesmo nível de bancos digitais. Suas informações financeiras ficam privadas e protegidas." },
                { q: "Preciso de conta em algum banco específico?", a: "Não. Você pode usar com qualquer banco. Basta registrar seus gastos e receitas — o Sommar faz a separação entre pessoal e empresa para você." },
                { q: "Como recebo o acesso?", a: "Assim que o pagamento for confirmado, você recebe um e-mail com seu login para acessar o app em app.sommarapp.com.br." },
                { q: "Como funciona a garantia de 7 dias?", a: "Você tem 7 dias para testar. Se não gostar, cancela com 1 clique na plataforma de pagamento e recebe 100% do valor de volta, sem burocracia." }
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
            <h3 className="text-xl font-extrabold text-white uppercase">
              Separe suas contas. <span className="text-[#22C55E]">Veja seu lucro real.</span>
            </h3>
            <p className="text-xs text-muted-foreground font-medium leading-relaxed max-w-sm mx-auto">
              Escolha seu plano e comece hoje — com 7 dias de garantia se não for para você.
            </p>
            <button
              onClick={scrollToPricing}
              className={`${PRIMARY_CTA} text-xs px-8 py-4`}
            >
              ESCOLHER MEU PLANO <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-border py-6 bg-black text-center text-[10px] text-neutral-500 font-medium">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
          <img src="/favicon.jpg" alt="" className="w-5 h-5 rounded-md object-contain opacity-80" aria-hidden />
          <span>© 2026 Sommar App. Todos os direitos reservados.</span>
        </div>
      </footer>

    </div>
  );
}