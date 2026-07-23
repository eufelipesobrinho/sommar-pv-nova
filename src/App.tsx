import React, { useState, useEffect, lazy, Suspense } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  BarChart3,
  Lock,
} from "lucide-react";

const PRIMARY_CTA =
  'inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#22C55E] to-[#4ADE80] text-black font-extrabold uppercase tracking-widest rounded-xl shadow-lg shadow-[#22C55E]/25 hover:scale-[1.02] active:scale-[0.99] transition-transform duration-200';

const DIAGNOSIS_QUESTIONS = [
  {
    id: 'modelo',
    question: 'Qual é o modelo atual do seu negócio?',
    options: [
      'Prestador de Serviços / Profissional Liberal',
      'Autônomo / Freelancer',
      'Microempreendedor (MEI)',
    ],
  },
  {
    id: 'gargalo',
    question: 'Qual o seu maior gargalo financeiro hoje?',
    options: [
      'Misturo o dinheiro pessoal com o da empresa',
      'Não sei o meu lucro real líquido',
      'Perco muito tempo com planilhas e cadernos',
    ],
  },
  {
    id: 'gestao',
    question: 'Como você gerencia suas finanças atualmente?',
    options: [
      'No caderno ou anotações soltas',
      'Em planilhas complexas no Excel',
      'Não gerencio, está tudo na minha cabeça',
    ],
  },
] as const;

const PROCESSING_MESSAGES = [
  'Analisando perfil comercial...',
  'Calculando nível de sangria de caixa...',
  'Gerando diagnóstico...',
] as const;

type Page = 'quiz' | 'vendas' | 'obrigado';
type DiagnosisAnswers = Record<(typeof DIAGNOSIS_QUESTIONS)[number]['id'], string>;

function resolvePageFromPath(pathname: string): Page {
  const path = pathname.replace(/\/+$/, '') || '/';
  if (path === '/obrigado') return 'obrigado';
  if (path === '/oficial' || path === '/diagnostico') return 'vendas';
  return 'quiz';
}

function trackMetaCustom(eventName: string) {
  try {
    const fbq = (window as Window & { fbq?: (...args: unknown[]) => void }).fbq;
    if (typeof fbq === 'function') {
      fbq('trackCustom', eventName);
    }
  } catch {
    // WebView Android / Instagram: falha de ponte nativa não deve quebrar o quiz
  }
}

class QuizErrorBoundary extends React.Component<
  { children: React.ReactNode; onRecover?: () => void },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn('[QuizErrorBoundary]', error.message);
  }

  private recover = () => {
    this.setState({ hasError: false });
    this.props.onRecover?.();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#020302] text-white font-sora flex flex-col items-center justify-center px-4 text-center gap-4">
          <p className="text-sm font-medium text-white/70 max-w-sm">
            Não foi possível carregar o diagnóstico neste navegador. Tente novamente.
          </p>
          <button
            type="button"
            onClick={this.recover}
            className={`${PRIMARY_CTA} text-xs px-6 py-3`}
          >
            Tentar de novo
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

function DiagnosisQuiz({ onComplete }: { onComplete: (pain: string) => void }) {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Partial<DiagnosisAnswers>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingMessage, setProcessingMessage] = useState(0);
  const [isAdvancing, setIsAdvancing] = useState(false);

  useEffect(() => {
    if (!isProcessing) return;

    const messageTimer = window.setInterval(() => {
      setProcessingMessage((current) => (current + 1) % PROCESSING_MESSAGES.length);
    }, 800);

    return () => window.clearInterval(messageTimer);
  }, [isProcessing]);

  useEffect(() => {
    if (currentQuestion === 1) trackMetaCustom('Sommar_Quiz_Step1_Done');
    if (currentQuestion === 2) trackMetaCustom('Sommar_Quiz_Step2_Done');
  }, [currentQuestion]);

  const handleAnswer = (answer: string) => {
    if (isAdvancing || isProcessing) return;

    const question = DIAGNOSIS_QUESTIONS[currentQuestion];
    const nextAnswers = { ...answers, [question.id]: answer };

    setAnswers(nextAnswers);

    if (currentQuestion < DIAGNOSIS_QUESTIONS.length - 1) {
      setIsAdvancing(true);
      window.setTimeout(() => {
        setCurrentQuestion((current) => current + 1);
        setIsAdvancing(false);
      }, 180);
      return;
    }

    const selectedPain = nextAnswers.gargalo ?? 'Não sei o meu lucro real líquido';
    setIsProcessing(true);
    window.setTimeout(() => onComplete(selectedPain), 2500);
  };

  const progress = started ? ((currentQuestion + 1) / DIAGNOSIS_QUESTIONS.length) * 100 : 0;
  const question = DIAGNOSIS_QUESTIONS[currentQuestion];

  return (
    <div className="min-h-screen overflow-hidden bg-[#020302] text-white font-sora selection:bg-[#22C55E]/30">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.18),_transparent_34%),radial-gradient(circle_at_bottom,_rgba(34,197,94,0.08),_transparent_32%)]" aria-hidden />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#22C55E]/70 to-transparent" aria-hidden />

      <main className="relative z-10 flex min-h-screen items-center justify-center px-4 py-6 sm:py-10">
        <section className="w-full max-w-md sm:max-w-lg">
          <div className="mb-8 flex items-center justify-center gap-3">
            <img src="/favicon.jpg" alt="Sommar App Logo" className="h-10 w-10 rounded-xl object-contain shadow-lg shadow-[#22C55E]/10" />
            <span className="text-xl font-extrabold tracking-tight">
              <span className="text-[#22C55E]">Sommar</span> App
            </span>
          </div>

          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#050605]/90 p-5 shadow-[0_30px_90px_-35px_rgba(34,197,94,0.65)] backdrop-blur-xl sm:p-7">
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#22C55E]/10 blur-3xl" aria-hidden />

            {!started && !isProcessing && (
              <div className="relative space-y-7 text-center transition-all duration-500">
                <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-[#22C55E]/25 bg-[#22C55E]/10 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#4ADE80]">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden />
                  Diagnóstico + 7 dias grátis
                </div>

                <div className="space-y-4">
                  <h1 className="text-3xl font-black uppercase leading-[0.98] tracking-tight text-white sm:text-4xl">
                    Descubra em 1 minuto por que você trabalha tanto e não vê a cor do seu lucro líquido.
                  </h1>
                  <p className="mx-auto max-w-sm text-sm font-medium leading-relaxed text-white/62">
                    Este diagnóstico rápido analisa a saúde financeira de autônomos, MEIs e prestadores. Depois, teste o Sommar por 7 dias grátis — sem cartão.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setStarted(true)}
                  className={`${PRIMARY_CTA} w-full px-5 py-5 text-[11px] sm:text-xs`}
                >
                  INICIAR DIAGNÓSTICO GRATUITO <ArrowRight className="h-4 w-4" />
                </button>

                <p className="text-[10px] font-bold uppercase tracking-widest text-white/35">
                  3 perguntas rápidas. Sem cadastro.
                </p>
              </div>
            )}

            {started && !isProcessing && (
              <div key={question.id} className="relative animate-[fadeIn_0.35s_ease-out] space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/40">
                    <span>Etapa {currentQuestion + 1} de {DIAGNOSIS_QUESTIONS.length}</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#22C55E] to-[#86EFAC] transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-2 text-center">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#4ADE80]">
                    Diagnóstico Sommar
                  </p>
                  <h2 className="text-2xl font-black uppercase leading-tight tracking-tight text-white sm:text-3xl">
                    {question.question}
                  </h2>
                </div>

                <div className="space-y-3">
                  {question.options.map((option) => (
                    <button
                      key={option}
                      type="button"
                      disabled={isAdvancing}
                      onClick={() => handleAnswer(option)}
                      className="group flex w-full items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-4 text-left text-sm font-extrabold leading-snug text-white transition-all duration-200 hover:border-[#22C55E]/55 hover:bg-[#22C55E]/10 hover:shadow-lg hover:shadow-[#22C55E]/10 active:scale-[0.99] disabled:pointer-events-none disabled:opacity-70"
                    >
                      <span>{option}</span>
                      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-black/40 text-[#22C55E] transition-transform duration-200 group-hover:translate-x-1">
                        <ArrowRight className="h-4 w-4" aria-hidden />
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {isProcessing && (
              <div className="relative flex min-h-[430px] flex-col items-center justify-center space-y-8 text-center animate-[fadeIn_0.35s_ease-out]">
                <div className="relative flex h-24 w-24 items-center justify-center">
                  <div className="absolute inset-0 rounded-full border border-[#22C55E]/20" />
                  <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-[#22C55E] border-r-[#4ADE80] animate-spin" />
                  <div className="h-12 w-12 rounded-2xl bg-[#22C55E]/10 border border-[#22C55E]/25 flex items-center justify-center text-[#22C55E]">
                    <BarChart3 className="h-6 w-6" aria-hidden />
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.26em] text-[#4ADE80]">
                    Aguarde seu resultado
                  </p>
                  <h2 className="text-2xl font-black uppercase tracking-tight text-white">
                    {PROCESSING_MESSAGES[processingMessage]}
                  </h2>
                  <div className="mx-auto mt-5 h-1.5 w-56 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-gradient-to-r from-[#22C55E] via-[#86EFAC] to-[#22C55E] animate-[pulse_0.8s_ease-in-out_infinite]" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

const SalesPage = lazy(() => import('./SalesPage'));

const salesFallback = (
  <div className="min-h-screen bg-black flex items-center justify-center text-white">Carregando...</div>
);

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>(() =>
    typeof window !== 'undefined' ? resolvePageFromPath(window.location.pathname) : 'quiz',
  );
  const [diagnosisPain, setDiagnosisPain] = useState('');
  const [quizBoundaryKey, setQuizBoundaryKey] = useState(0);

  useEffect(() => {
    const handleLocation = () => {
      setCurrentPage(resolvePageFromPath(window.location.pathname));
    };

    const urlPain = new URLSearchParams(window.location.search).get('dor');
    setDiagnosisPain(urlPain ?? sessionStorage.getItem('sommar_diagnosis_pain') ?? '');
    handleLocation();
    window.addEventListener('popstate', handleLocation);
    return () => window.removeEventListener('popstate', handleLocation);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get("utm_source");
    const utmMedium = urlParams.get("utm_medium");
    const utmCampaign = urlParams.get("utm_campaign");
    const utmContent = urlParams.get("utm_content");
    const utmTerm = urlParams.get("utm_term");

    if (utmSource) sessionStorage.setItem("utm_source", utmSource);
    if (utmMedium) sessionStorage.setItem("utm_medium", utmMedium);
    if (utmCampaign) sessionStorage.setItem("utm_campaign", utmCampaign);
    if (utmContent) sessionStorage.setItem("utm_content", utmContent);
    if (utmTerm) sessionStorage.setItem("utm_term", utmTerm);
    if (utmSource) sessionStorage.setItem("src", utmSource);
  }, [currentPage]);

  useEffect(() => {
    const PIXEL_ID = "1650440006207697";
    const CAPI_TOKEN = "EAB4hda1l5Q0BRXIWNYaekyTJ2LraBp2e3o8Mw3UCYrVgZAKmDVmNClZC98nUeBRFePBRuslzWrjpQfK6lsOsAd2sgvRIUm7Y0ZA7EpHtchZBFqs06aNW6ObZBvd0ZAv5mki2FvLiGuDDmKyE47u42fGOYBxNE8xsHPMi5vr4Yxk3bQo6X04CYZBSiLJVIG5tdlRIgZDZD";
    const isPurchase = currentPage === 'obrigado';
    const path = window.location.pathname.replace(/\/+$/, '');

    const fireTracking = () => {
      const globalWindow = window as any;
      try {
        if (globalWindow.fbq) {
          if (isPurchase) {
            globalWindow.fbq('track', 'Purchase', { value: 39.90, currency: 'BRL' });
          } else if (currentPage !== 'quiz') {
            globalWindow.fbq('track', 'PageView');
          }
          if (currentPage === 'vendas' && path === '/diagnostico') {
            globalWindow.fbq('trackCustom', 'Sommar_Quiz_Completed');
          }
        }
      } catch {
        // Instagram/Android WebView: postMessage nativo pode falhar sem quebrar a SPA
      }

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
    };

    let idleId: number | undefined;
    let timeoutId: number | undefined;
    if ('requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(fireTracking, { timeout: 3000 });
    } else {
      timeoutId = setTimeout(fireTracking, 2000);
    }

    return () => {
      if (idleId !== undefined && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, [currentPage]);

  const completeDiagnosis = (pain: string) => {
    sessionStorage.setItem('sommar_diagnosis_pain', pain);
    setDiagnosisPain(pain);

    // Preserva UTMs ao ir para /diagnostico
    const next = new URLSearchParams(window.location.search);
    next.set('dor', pain);
    window.history.pushState({}, '', `/diagnostico?${next.toString()}`);
    setCurrentPage('vendas');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

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
              Falar com o Suporte
            </a>
          </div>
        </main>

        <footer className="border-t border-border py-6 text-center text-[10px] font-bold text-white/30 bg-black/40">
          © 2026 Sommar App. Todos os direitos reservados.
        </footer>
      </div>
    );
  }

  if (currentPage === 'quiz') {
    return (
      <QuizErrorBoundary
        key={quizBoundaryKey}
        onRecover={() => setQuizBoundaryKey((k) => k + 1)}
      >
        <DiagnosisQuiz onComplete={completeDiagnosis} />
      </QuizErrorBoundary>
    );
  }

  return (
    <Suspense fallback={salesFallback}>
      <SalesPage diagnosisPain={diagnosisPain} />
    </Suspense>
  );
}
