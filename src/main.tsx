import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './app'
import './main.css'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/query-client'

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
)
