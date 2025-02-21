import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from "@/components/theme-provider"
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <ThemeProvider
  attribute="class"
  defaultTheme="system"
  enableSystem
  disableTransitionOnChange
>
<StrictMode>
    <App />
  </StrictMode>,
</ThemeProvider>
)
