import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'

// Prevent browser from restoring previous scroll position on refresh
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}
// Force scroll to top on load
window.scrollTo(0, 0)
// Also on beforeunload to prevent position memory
window.addEventListener('beforeunload', () => { window.scrollTo(0, 0) })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
