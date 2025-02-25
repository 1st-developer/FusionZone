import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from "@/components/theme-provider"
import { Provider } from 'react-redux'
import './index.css'
import App from './App'
import { store } from './redux/store'
import {Toaster} from "react-hot-toast"
import {GoogleOAuthProvider} from "@react-oauth/google"

const CLIENT_ID = "673293782938-4talstk929lh931klbl3milkt7uprs22.apps.googleusercontent.com"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
  < Provider store={store}>
    <Toaster />
      <App /> 
    </Provider>
</ThemeProvider>
</GoogleOAuthProvider>
  </StrictMode>

)
