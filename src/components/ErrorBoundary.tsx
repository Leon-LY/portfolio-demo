import { Component, type ReactNode, type ErrorInfo } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary] Caught error:', error.message, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="min-h-screen flex items-center justify-center bg-surface-0">
            <div className="text-center px-6 max-w-lg">
              <h1 className="text-2xl font-bold text-white mb-3">页面遇到了问题</h1>
              <p className="text-text-secondary mb-4">抱歉，页面渲染时遇到了错误。请刷新重试，或稍后再来。</p>
              {this.state.error && (
                <details className="mb-6 text-left">
                  <summary className="text-xs text-text-tertiary cursor-pointer hover:text-text-secondary">错误详情</summary>
                  <pre className="mt-2 p-3 bg-surface-0 border border-white/[0.06] rounded-lg text-xs text-red-400 overflow-auto max-h-40">
                    {this.state.error.message}
                  </pre>
                </details>
              )}
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-accent hover:bg-accent-bright text-white rounded-xl font-medium transition-all active:scale-[0.97]"
              >
                刷新页面
              </button>
            </div>
          </div>
        )
      )
    }
    return this.props.children
  }
}
