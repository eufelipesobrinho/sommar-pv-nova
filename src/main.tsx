import { StrictMode, Component, type ErrorInfo, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

/** Instagram/Android WebView: evita crash quando a ponte nativa já foi destruída. */
function installSafePostMessage() {
  if (typeof window === 'undefined') return

  const original = window.postMessage.bind(window)
  window.postMessage = ((...args: Parameters<Window['postMessage']>) => {
    try {
      return original(...args)
    } catch {
      // "error invoking postmessage: java object is gone"
    }
  }) as Window['postMessage']

  window.addEventListener(
    'error',
    (event) => {
      const message = String(event.message ?? event.error?.message ?? '').toLowerCase()
      if (
        message.includes('postmessage') ||
        message.includes('java object is gone') ||
        message.includes('error invoking')
      ) {
        event.preventDefault()
        event.stopImmediatePropagation()
      }
    },
    true,
  )

  window.addEventListener('unhandledrejection', (event) => {
    const reason = String(event.reason?.message ?? event.reason ?? '').toLowerCase()
    if (
      reason.includes('postmessage') ||
      reason.includes('java object is gone') ||
      reason.includes('error invoking')
    ) {
      event.preventDefault()
    }
  })
}

class AppErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn('[AppErrorBoundary]', error.message, info.componentStack)
  }

  private recover = () => {
    this.setState({ hasError: false })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#040404] text-white font-sora flex flex-col items-center justify-center px-4 text-center gap-4">
          <p className="text-sm font-medium text-white/70 max-w-sm">
            Algo interrompeu a tela. Você pode continuar sem perder o fluxo.
          </p>
          <button
            type="button"
            onClick={this.recover}
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#22C55E] to-[#4ADE80] text-black font-extrabold uppercase tracking-widest rounded-xl px-6 py-3 text-xs"
          >
            Continuar
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

installSafePostMessage()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppErrorBoundary>
      <App />
    </AppErrorBoundary>
  </StrictMode>,
)
