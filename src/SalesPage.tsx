import { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Smartphone, 
  Lock,
  Sparkles,
  BarChart3,
  Layers,
  Play,
  ShieldCheck,
  MousePointerClick,
  Info
} from "lucide-react";

const PRIMARY_CTA =
  'inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#22C55E] to-[#4ADE80] text-black font-extrabold uppercase tracking-widest rounded-xl shadow-lg shadow-[#22C55E]/25 hover:scale-[1.02] active:scale-[0.99] transition-transform duration-200';

const HERO_VIDEO_ID = '_7ba2qlrl_g';
const HERO_VIDEO_EMBED = `https://www.youtube-nocookie.com/embed/${HERO_VIDEO_ID}?autoplay=1&playsinline=1&rel=0&modestbranding=1`;

/** Normaliza dor da URL/estado para matching sem acentos ou encoding quebrado. */
function normalizePainText(rawPain: string): string {
  let decoded = rawPain.trim();
  try {
    decoded = decodeURIComponent(decoded.replace(/\+/g, ' '));
  } catch {
    // já decodificado (ex.: URLSearchParams)
  }
  return decoded
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

/**
 * Traduz a dor bruta do quiz em complemento gramaticalmente correto
 * para a headline de /diagnostico (nunca injeta o texto cru).
 */
function resolveDiagnosisHeadlineComplement(rawPain: string): string {
  const pain = normalizePainText(rawPain);

  if (pain.includes('planilha') || pain.includes('caderno')) {
    return 'devido à perda de tempo com planilhas e cadernos';
  }
  if (
    pain.includes('separacao') ||
    pain.includes('cpf') ||
    pain.includes('misturo') ||
    pain.includes('pessoal')
  ) {
    return 'devido à perigosa falta de separação entre CPF e CNPJ';
  }
  if (pain.includes('cabeca') || pain.includes('nao gerencio')) {
    return 'pelo fato de você gerenciar tudo apenas de cabeça';
  }
  return 'devido à falta de clareza nos números';
}

type PhoneMockupProps = {
  src: string;
  alt: string;
  priority?: boolean;
  arrowSide?: 'left' | 'right';
};

function PhoneMockup({ src, alt, priority = false, arrowSide = 'left' }: PhoneMockupProps) {
  const arrowClass =
    arrowSide === 'left'
      ? 'sm:-left-9 sm:top-1/2 sm:-translate-y-1/2 sm:translate-x-0 sm:rotate-0'
      : 'sm:-right-9 sm:top-1/2 sm:-translate-y-1/2 sm:translate-x-0 sm:rotate-180';

  return (
    <div
      className="relative mx-auto w-full max-w-[220px] sm:max-w-[260px] md:max-w-[280px] transition-transform duration-300 hover:-translate-y-1"
    >
      <div
        className={`absolute -top-7 left-1/2 z-20 flex h-7 w-7 -translate-x-1/2 rotate-90 items-center justify-center rounded-full border border-[#22C55E]/40 bg-[#22C55E]/10 text-[#22C55E] shadow-lg shadow-[#22C55E]/10 ${arrowClass}`}
        aria-hidden
      >
        <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
      </div>
      <div
        className="absolute inset-6 sm:inset-8 rounded-[40px] bg-[#22C55E]/[0.07] blur-2xl pointer-events-none"
        aria-hidden
      />
      <div className="relative rounded-[36px] sm:rounded-[40px] bg-gradient-to-br from-[#5f6368] via-[#171717] to-[#050505] p-[3px] shadow-[0_28px_56px_-14px_rgba(0,0,0,0.85)]">
        <div className="rounded-[33px] sm:rounded-[37px] bg-[#050505] p-[6px] sm:p-[7px] border border-white/[0.08]">
          <div className="relative aspect-[390/844] overflow-hidden rounded-[27px] sm:rounded-[31px] bg-[#050505]">
            <img
              src={src}
              alt={alt}
              width={390}
              height={844}
              className="w-full h-full object-contain object-center"
              loading={priority ? 'eager' : 'lazy'}
              decoding="async"
              {...(priority ? { fetchPriority: 'high' as const } : { fetchPriority: 'low' as const })}
            />
          </div>
        </div>
        <div className="absolute -right-[3px] top-[24%] h-[12%] w-[3px] rounded-r-sm bg-[#343434] opacity-80" aria-hidden />
        <div className="absolute -left-[3px] top-[18%] h-[7%] w-[3px] rounded-l-sm bg-[#343434] opacity-70" aria-hidden />
        <div className="absolute -left-[3px] top-[29%] h-[11%] w-[3px] rounded-l-sm bg-[#343434] opacity-70" aria-hidden />
      </div>
    </div>
  );
}

const VALUE_STACK_ITEMS = [
  { label: 'Sistema de Controle Duplo (CPF/CNPJ)', price: 'R$ 297/ano' },
  { label: 'Inteligência Artificial Marinho IA Integrada', price: 'R$ 397/ano' },
  { label: 'Suporte VIP Direto com os Fundadores', price: 'R$ 147/ano' },
] as const;

const SOCIAL_PROOF_SLIDES = [
  {
    src: '/prova1.webp',
    alt: 'Depoimento real de usuário Sommar App',
    headline: 'Finalmente sei quanto meu negócio lucra de verdade',
    subtext: 'Usuários reais que pararam de misturar CPF e CNPJ e ganharam clareza sobre margem e fluxo de caixa.',
  },
  {
    src: '/prova2.webp',
    alt: 'Prova social Sommar App — feedback de cliente',
    headline: 'Controle financeiro sem planilha e sem complicação',
    subtext: 'Autônomos e prestadores de serviço que organizaram receitas, despesas e lucro real em um só lugar.',
  },
] as const;

function SocialProofCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SOCIAL_PROOF_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = SOCIAL_PROOF_SLIDES[current];

  return (
    <div className="max-w-lg mx-auto">
      <div className="relative rounded-2xl border border-border bg-[#060606] overflow-hidden shadow-xl">
        <div className="relative aspect-[4/5] sm:aspect-[3/4] bg-[#0a0a0a]">
          {SOCIAL_PROOF_SLIDES.map((item, index) => (
            <img
              key={item.src}
              src={item.src}
              alt={item.alt}
              className={`absolute inset-0 w-full h-full object-contain object-center transition-opacity duration-500 ${
                index === current ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
              loading="lazy"
              decoding="async"
              fetchPriority="low"
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => setCurrent((prev) => (prev - 1 + SOCIAL_PROOF_SLIDES.length) % SOCIAL_PROOF_SLIDES.length)}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/70 border border-white/10 text-white flex items-center justify-center hover:bg-[#22C55E]/20 hover:border-[#22C55E]/40 transition-colors"
          aria-label="Depoimento anterior"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => setCurrent((prev) => (prev + 1) % SOCIAL_PROOF_SLIDES.length)}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/70 border border-white/10 text-white flex items-center justify-center hover:bg-[#22C55E]/20 hover:border-[#22C55E]/40 transition-colors"
          aria-label="Próximo depoimento"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-5 text-center px-2">
        <p className="text-sm font-extrabold text-white leading-snug">{slide.headline}</p>
        <p className="text-[11px] text-muted-foreground font-medium mt-2 leading-relaxed">{slide.subtext}</p>
        <div className="flex items-center justify-center gap-2 mt-4" role="tablist" aria-label="Navegação de depoimentos">
          {SOCIAL_PROOF_SLIDES.map((_, index) => (
            <button
              key={index}
              type="button"
              role="tab"
              aria-selected={index === current}
              aria-label={`Depoimento ${index + 1}`}
              onClick={() => setCurrent(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === current ? 'w-6 bg-[#22C55E]' : 'w-1.5 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
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

export type SalesPageProps = {
  diagnosisPain: string;
};

export default function SalesPage({ diagnosisPain }: SalesPageProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [heroVideoActive, setHeroVideoActive] = useState(false);

  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleFaq = (index: number) => {
    setActiveFaq((current) => (current === index ? null : index));
  };

  const salesPath =
    typeof window !== 'undefined' ? window.location.pathname.replace(/\/+$/, '') || '/' : '';
  const isOfficialLanding = salesPath === '/oficial';
  const isQuizResult = salesPath === '/diagnostico';

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
            VER OFERTA <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      <main className="pt-20 sm:pt-24">
        
        {/* 1. HERO SECTION - CPF x CNPJ */}
        <section className="max-w-4xl mx-auto px-4 pt-12 sm:pt-16 pb-12 text-center">
          {isQuizResult && diagnosisPain && (
            <div className="mx-auto mb-5 max-w-2xl rounded-2xl border border-[#22C55E]/25 bg-[#22C55E]/[0.07] px-4 py-3 text-left shadow-lg shadow-[#22C55E]/5">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#4ADE80]">
                Diagnóstico concluído
              </p>
              <p className="mt-1 text-xs font-semibold leading-relaxed text-white/80">
                Pelo seu perfil, o principal gargalo hoje é: <strong className="text-white">{diagnosisPain}</strong>. Veja como o Sommar ajuda a resolver isso sem planilhas.
              </p>
            </div>
          )}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-white/[0.02] mb-6">
            <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse"></span>
            <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest text-white/80">
              Para autônomos, prestadores e MEIs
            </span>
          </div>
          
          <h1 className="text-2xl sm:text-4xl md:text-[2.65rem] font-extrabold uppercase tracking-tight text-white leading-[1.15] mb-6 max-w-3xl mx-auto">
            {isOfficialLanding ? (
              <>
                Pare de operar no escuro: o controle financeiro inteligente para autônomos e MEIs.{' '}
                <span className="text-[#22C55E]">
                  Descubra o seu lucro real e separe seu CPF do CNPJ com o Sommar e a nossa inteligência artificial em menos de 2 minutos por dia.
                </span>
              </>
            ) : (
              <>
                Seu diagnóstico está pronto: O seu negócio está operando no escuro{' '}
                {resolveDiagnosisHeadlineComplement(diagnosisPain)}.{' '}
                <span className="text-[#22C55E]">
                  Aqui está como o Sommar e a nossa inteligência artificial vão te devolver o controle do lucro real em menos de 2 minutos por dia.
                </span>
              </>
            )}
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
                    src={`https://i.ytimg.com/vi/${HERO_VIDEO_ID}/mqdefault.jpg`}
                    alt=""
                    width={320}
                    height={180}
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
                Ver oferta e começar →
              </button>
            </div>
            
            <PhoneMockup src="/lancar-sommar.webp" alt="Interface de Lançamentos Sommar" arrowSide="left" />
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
        <section className="max-w-4xl mx-auto px-4 py-16 sm:py-20 border-b border-border/40 bg-white/[0.005]">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="space-y-4 text-center md:text-left order-2 md:order-1">
              <span className="text-[10px] font-extrabold text-[#22C55E] border border-[#22C55E]/20 bg-[#22C55E]/5 px-2.5 py-1 rounded-md uppercase tracking-widest inline-flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Gerente Financeiro Digital
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white uppercase tracking-tight leading-tight">
                O <span className="text-[#22C55E]">Marinho IA</span> elimina planilhas complexas do seu dia a dia.
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-medium max-w-md mx-auto md:mx-0">
                Seu <strong className="text-white">Gerente Financeiro Digital 24h</strong> dentro do app. Envie comandos em texto corrido ou fotos de recibos e comprovantes — o Marinho lê, categoriza e separa automaticamente entre <strong className="text-[#22C55E]">CPF e CNPJ</strong>, sem preenchimento manual.
              </p>
              <ul className="flex flex-col gap-2.5 pt-2 text-[11px] sm:text-xs font-bold uppercase tracking-wide text-white/90 text-left max-w-sm mx-auto md:mx-0">
                <li className="flex items-start sm:items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] flex-shrink-0 mt-0.5 sm:mt-0" /> Comandos em texto e leitura de comprovantes</li>
                <li className="flex items-start sm:items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] flex-shrink-0 mt-0.5 sm:mt-0" /> Vários lançamentos de uma só vez</li>
                <li className="flex items-start sm:items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] flex-shrink-0 mt-0.5 sm:mt-0" /> Lucro e margem atualizados na hora</li>
              </ul>
            </div>
            
            <div className="order-1 md:order-2">
              <PhoneMockup src="/marinho-sommar.webp" alt="Marinho IA — Gerente Financeiro Digital Sommar App" arrowSide="left" />
            </div>
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
            
            <PhoneMockup src="/resumo-sommar.webp" alt="Análise de Dados Gráficos Finanças" arrowSide="left" />
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
              Tudo o que você precisa para operar como empreendedor — sem fragmentar sua gestão financeira em apps isolados.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="p-5 rounded-xl border border-[#22C55E]/25 bg-[#050505] space-y-2 sm:col-span-2 lg:col-span-1 lg:row-span-1">
              <div className="w-9 h-9 rounded-lg border border-[#22C55E]/20 bg-[#22C55E]/5 flex items-center justify-center text-[#22C55E]">
                <Layers className="w-4 h-4" strokeWidth={1.75} />
              </div>
              <span className="text-[10px] font-bold text-[#22C55E] uppercase tracking-wider block">Visão unificada</span>
              <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                Receitas, despesas e lucro real em um painel só — pessoal e empresarial integrados.
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
                Gerente Financeiro Digital: comandos em texto e leitura de comprovantes — sem planilhas.
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
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[10px] font-extrabold text-[#22C55E] border border-[#22C55E]/20 bg-[#22C55E]/5 px-3 py-1 rounded-full uppercase tracking-widest">Para Quem É</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight mt-4">
              Para quem é o <span className="text-[#22C55E]">Sommar App?</span>
            </h2>
            <p className="text-sm sm:text-base text-white font-bold mt-6 leading-relaxed px-2">
              O controle financeiro definitivo para{' '}
              <span className="text-[#22C55E]">Prestadores de Serviços, Autônomos, Profissionais Liberais e Microempreendedores.</span>
            </p>
            <p className="text-xs text-muted-foreground mt-3 font-medium leading-relaxed">
              Se você vive de prestar serviço, faturar por projeto ou operar como MEI — e precisa enxergar lucro real sem misturar CPF e CNPJ — o Sommar foi feito para você.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-10">
            <div className="p-6 rounded-xl border border-border bg-[#060606] text-center space-y-3">
              <div className="w-10 h-10 bg-[#22C55E]/5 border border-[#22C55E]/10 rounded-xl flex items-center justify-center mx-auto text-[#22C55E]"><Sparkles className="w-5 h-5" /></div>
              <h3 className="text-sm font-extrabold text-white uppercase">Prestador de Serviços</h3>
              <p className="text-xs text-muted-foreground leading-relaxed font-medium">Consultores, designers, técnicos e profissionais liberais que precisam separar receitas de projetos das contas pessoais e calcular margem real por mês.</p>
            </div>
            <div className="p-6 rounded-xl border border-[#22C55E]/30 bg-[#22C55E]/[0.03] text-center space-y-3 relative">
              <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#22C55E] text-black text-[8px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full whitespace-nowrap">Perfil Ideal</span>
              <div className="w-10 h-10 bg-[#22C55E]/10 border border-[#22C55E]/20 rounded-xl flex items-center justify-center mx-auto text-[#22C55E]"><Smartphone className="w-5 h-5" /></div>
              <h3 className="text-sm font-extrabold text-white uppercase">Autônomo / Freelancer</h3>
              <p className="text-xs text-muted-foreground leading-relaxed font-medium">Renda variável exige clareza constante. Separe seus projetos das contas de casa e saiba exatamente quanto sobrou — não confunda faturamento com lucro.</p>
            </div>
            <div className="p-6 rounded-xl border border-border bg-[#060606] text-center space-y-3">
              <div className="w-10 h-10 bg-[#22C55E]/5 border border-[#22C55E]/10 rounded-xl flex items-center justify-center mx-auto text-[#22C55E]"><BarChart3 className="w-5 h-5" /></div>
              <h3 className="text-sm font-extrabold text-white uppercase">MEI / Microempreendedor</h3>
              <p className="text-xs text-muted-foreground leading-relaxed font-medium">Pare de confundir faturamento bruto com lucro líquido. O Modo Empresarial mostra receita, custos operacionais e margem com precisão milimétrica.</p>
            </div>
          </div>

          <div className="max-w-3xl mx-auto p-5 rounded-2xl border border-amber-500/20 bg-amber-500/[0.04] flex gap-4 items-start">
            <div className="w-9 h-9 rounded-lg border border-amber-500/30 bg-amber-500/10 flex items-center justify-center text-amber-400 flex-shrink-0 mt-0.5">
              <Info className="w-4 h-4" strokeWidth={1.75} aria-hidden />
            </div>
            <div className="text-left min-w-0">
              <p className="text-[10px] font-extrabold text-amber-400 uppercase tracking-widest mb-1.5">Importante — leia antes de assinar</p>
              <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                <strong className="text-white/90">Nota:</strong> O Sommar foca 100% no controle do seu fluxo de caixa, cálculo de margem de lucro real e separação de contas (CPF/CNPJ).{' '}
                <span className="text-white/80">Não possuímos módulo de controle de estoque físico ou frente de caixa (PDV).</span>
              </p>
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
                <h4 className="text-xs font-extrabold text-white uppercase">MARINHO IA - SEU GERENTE FINANCEIRO 24H</h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed font-medium pt-2">Esqueça planilhas ou preenchimentos manuais chatos. Você envia uma mensagem de texto corrido ou a foto do seu comprovante/recibo diretamente no chat interno do aplicativo, e o Marinho processa, categoriza e separa tudo automaticamente. Sem preenchimento manual, direto na tela do seu celular.</p>
              </div>
            </div>
            <div className="p-5 rounded-xl border border-border bg-[#060606] space-y-2 flex flex-col justify-between">
              <div>
                <span className="text-[9px] font-extrabold text-[#22C55E] uppercase tracking-wider block mb-2">E-book Completo</span>
                <h4 className="text-xs font-extrabold text-white uppercase">MÉTODO EXCLUSIVO: O LUCRO REAL DO EMPREENDEDOR</h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed font-medium pt-2">O mapa secreto em formato de e-book para estancar as perdas do seu caixa. Descubra como prestadores de serviços economizam até R$ 2.000 por mês apenas eliminando custos fantasmas e cobrando o preço correto por seus projetos.</p>
              </div>
            </div>
            <div className="p-5 rounded-xl border border-border bg-[#060606] space-y-2 flex flex-col justify-between">
              <div>
                <span className="text-[9px] font-extrabold text-[#22C55E] uppercase tracking-wider block mb-2">Valor Incalculável</span>
                <h4 className="text-xs font-extrabold text-white uppercase">ACESSO VITALÍCIO ÀS ATUALIZAÇÕES DA PLATAFORMA</h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed font-medium pt-2">Você garante a versão V2 hoje e nunca mais pagará nenhuma mensalidade ou taxa adicional pelas próximas evoluções da nossa inteligência artificial. O seu preço fica blindado para sempre.</p>
              </div>
            </div>
          </div>

        </section>

        {/* DEPOIMENTOS — CARROSSEL (antes da oferta) */}
        <section className="border-t border-b border-border/40 bg-white/[0.002] py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-[10px] font-extrabold text-[#22C55E] border border-[#22C55E]/20 bg-[#22C55E]/5 px-3 py-1 rounded-full uppercase tracking-widest">⭐ Depoimentos</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight mt-4">
                Quem usa, <span className="text-[#22C55E]">recomenda.</span>
              </h2>
              <p className="text-xs text-muted-foreground mt-3 font-medium leading-relaxed max-w-md mx-auto">
                Autônomos e prestadores de serviço que já organizaram CPF e CNPJ com o Sommar — veja o que dizem na prática.
              </p>
            </div>
            <SocialProofCarousel />
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
                Escolha o plano ideal para o seu momento — com acesso completo a tudo, do controle duplo ao Marinho IA.
              </p>
            </div>

            {/* Empilhamento de Valor */}
            <div className="max-w-lg mx-auto mb-12">
              <p className="text-[10px] font-extrabold text-[#22C55E] uppercase tracking-widest text-center mb-4">O que você levaria separado</p>
              <div className="rounded-2xl border border-border bg-[#060606] overflow-hidden">
                <ul className="divide-y divide-border/60">
                  {VALUE_STACK_ITEMS.map(({ label, price }) => (
                    <li key={label} className="flex items-center justify-between gap-4 px-5 py-4">
                      <span className="text-[11px] sm:text-xs text-white/90 font-medium leading-snug">{label}</span>
                      <span className="text-[10px] sm:text-[11px] text-neutral-500 font-bold whitespace-nowrap flex-shrink-0">
                        Valor Normal: <span className="line-through">{price}</span>
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="px-5 py-4 bg-red-500/[0.06] border-t border-red-500/20 flex items-center justify-between gap-4">
                  <span className="text-[11px] font-extrabold text-white uppercase tracking-wide">Valor Total Somado</span>
                  <span className="text-sm font-extrabold text-red-400 line-through">R$ 841,00/ano</span>
                </div>
              </div>
            </div>

            <div className="max-w-2xl mx-auto mb-6 p-4 rounded-2xl border border-amber-500/20 bg-amber-500/[0.04] text-center">
              <p className="text-[10px] sm:text-[11px] text-amber-300 font-extrabold uppercase tracking-wider leading-relaxed">
                ⚠️ ATENÇÃO: As condições de juros reduzidos da Cakto e os bônus exclusivos inclusos são garantidos apenas para as adesões realizadas durante esta janela de lançamento.
              </p>
            </div>

            {/* Cards de Preço */}
            <div className="grid sm:grid-cols-2 gap-5 max-w-2xl mx-auto items-stretch">
              {/* CARD A — Plano Mensal */}
              <div className="p-6 rounded-2xl border border-border bg-[#060606] flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-white uppercase tracking-wider">Plano Mensal</h3>
                  <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">Ideal para validar sua gestão.</p>

                  <div className="my-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-xs font-bold text-muted-foreground">R$</span>
                      <span className="text-4xl font-extrabold text-white tracking-tight">39,90</span>
                      <span className="text-[10px] font-bold text-neutral-500"> /mês</span>
                    </div>
                    <p className="text-[9px] text-neutral-500 font-medium mt-2">(+ R$ 0,99 taxa fixa de serviço Cakto. Total: R$ 40,89)</p>
                  </div>

                  <ul className="flex flex-col gap-2.5 border-t border-border/40 pt-5 text-[11px] text-white/80 font-medium">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] flex-shrink-0" /> Acesso completo ao Sommar</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] flex-shrink-0" /> Modo Pessoal + Empresarial</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] flex-shrink-0" /> Marinho IA integrado</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] flex-shrink-0" /> Cancele quando quiser</li>
                  </ul>
                </div>

                <div className="pt-6">
                  <a
                    href="https://pay.cakto.com.br/ni9nrpf_687767"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 border border-border bg-white/[0.03] text-white font-extrabold text-[11px] uppercase tracking-widest py-4 rounded-xl hover:bg-white/[0.06] transition-colors"
                  >
                    QUERO O PLANO MENSAL
                  </a>
                </div>
              </div>

              {/* CARD B — Plano Anual (Destaque) */}
              <div className="p-6 rounded-2xl border-2 border-[#22C55E] bg-[#060606] flex flex-col justify-between relative shadow-xl card-glow animate-pulse-glow sm:scale-[1.02] sm:-my-1">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#22C55E] text-black text-[8px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full whitespace-nowrap shadow-lg">
                  ★ Mais vendido / Melhor custo-benefício
                </span>

                <div>
                  <div className="flex items-center gap-2 flex-wrap mt-1">
                    <h3 className="text-base font-extrabold text-white uppercase tracking-wider">Plano Anual</h3>
                    <span className="bg-[#22C55E]/15 border border-[#22C55E]/30 text-[#22C55E] text-[8px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full">
                      Mais Vendido
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">A melhor escolha para blindar seu preço e destravar os bônus de maior valor.</p>

                  <div className="my-6">
                    <span className="text-neutral-500 line-through text-[11px] font-bold block">De R$ 841,00</span>
                    <div className="flex items-baseline gap-1 mt-0.5 flex-wrap">
                      <span className="text-xs font-bold text-muted-foreground">Por apenas R$</span>
                      <span className="text-4xl font-extrabold text-[#22C55E] tracking-tight">297,00</span>
                      <span className="text-[10px] font-bold text-neutral-500"> à vista</span>
                    </div>
                    <p className="text-[9px] text-neutral-500 font-medium mt-2">(+ R$ 0,99 taxa fixa de serviço Cakto)</p>
                    <p className="text-[9px] text-[#22C55E] font-bold mt-2 uppercase tracking-wider">OU EM ATÉ 12X DE R$ 29,70 (COM JUROS DA PLATAFORMA)</p>
                  </div>

                  <ul className="flex flex-col gap-2.5 border-t border-border/40 pt-5 text-[11px] text-white/90 font-medium">
                    <li className="flex items-center gap-2 text-[#22C55E] font-extrabold uppercase tracking-wider"><CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" /> Tudo do plano mensal +</li>
                    <li className="flex items-center gap-2 pl-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] flex-shrink-0" /> E-book "O Lucro Real do Empreendedor"</li>
                    <li className="flex items-center gap-2 pl-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] flex-shrink-0" /> Suporte VIP com os Fundadores</li>
                    <li className="flex items-center gap-2 pl-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] flex-shrink-0" /> Atualizações vitalícias inclusas</li>
                    <li className="flex items-center gap-2 pl-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] flex-shrink-0" /> Lucro Real e Margem automáticos</li>
                  </ul>
                </div>

                <div className="pt-6 flex flex-col items-center">
                  <a
                    href="https://pay.cakto.com.br/itbvz49"
                    target="_blank"
                    rel="noreferrer"
                    className={`${PRIMARY_CTA} w-full text-center text-[10px] sm:text-[11px] py-4 shadow-xl shadow-[#22C55E]/20`}
                  >
                    QUERO O PLANO ANUAL COM DESCONTO <ArrowRight className="w-4 h-4" />
                  </a>
                  <span className="relative mt-3 inline-flex items-center justify-center bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E] text-[8px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-lg">
                    <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#060606] border-l border-t border-[#22C55E]/30 rotate-45" aria-hidden />
                    MELHOR CUSTO-BENEFÍCIO
                  </span>
                </div>
              </div>
            </div>
            
            <TrustBadges className="mt-10" />
          </div>
        </section>

        {/* 10. SOBRE O CRIADOR - ABOUT SECTION */}
        <section className="max-w-4xl mx-auto px-4 py-20 border-b border-border/40">
          <div className="grid md:grid-cols-3 gap-8 items-center max-w-3xl mx-auto">
            <div className="md:col-span-1 rounded-2xl border border-border p-1.5 bg-[#0a0a0a] max-w-[200px] mx-auto relative">
              <img src="/felipe-sobrinho.webp" alt="Felipe — Criador do Sommar App" className="w-full h-auto rounded-xl object-cover" />
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
              QUERO O ACESSO <ArrowRight className="w-4 h-4" />
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