import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from "@/components/theme-provider"
import { Provider } from 'react-redux'
import './index.css'
import App from './App'
import { store } from './redux/store'
import {Toaster} from "react-hot-toast"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
  < Provider store={store}>
    <Toaster />
      <App /> 
    </Provider>
</ThemeProvider>
  </StrictMode>

)
