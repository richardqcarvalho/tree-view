import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRoot } from 'react-dom/client'
import './globals.css'
import AppRoutes from './routes'

const root = document.getElementById('root') as HTMLElement
const queryClient = new QueryClient()

createRoot(root).render(
  <QueryClientProvider client={queryClient}>
    <AppRoutes />
  </QueryClientProvider>,
)
