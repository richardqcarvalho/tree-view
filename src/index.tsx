import AppRoutes from '@/routes'
import '@/styles/globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRoot } from 'react-dom/client'

const root = document.getElementById('root') as HTMLElement
const queryClient = new QueryClient()

createRoot(root).render(
  <QueryClientProvider client={queryClient}>
    <AppRoutes />
  </QueryClientProvider>,
)
