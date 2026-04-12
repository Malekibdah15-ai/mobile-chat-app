import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from "@clerk/clerk-react";
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const PUBLISHABLE_KEY = "pk_test_ZGFzaGluZy1jaXZldC04MS5jbGVyay5hY2NvdW50cy5kZXYk";
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}
const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </ClerkProvider>
  </StrictMode>
)
