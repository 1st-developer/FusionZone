import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from "@/components/theme-provider"
import { Provider } from 'react-redux'
import './index.css'
import App from './App'
import { store } from './redux/store'

createRoot(document.getElementById('root')!).render(
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
  <StrictMode>
  < Provider store={store}>
      <App /> 
    </Provider>
  </StrictMode>
</ThemeProvider>

)
