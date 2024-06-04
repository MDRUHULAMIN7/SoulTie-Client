import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { HelmetProvider } from 'react-helmet-async'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AuthProviders from './Providers/AuthProviders'
import { RouterProvider } from 'react-router-dom'
import { router } from './Routerss/Routes'
import { Toaster } from 'react-hot-toast'

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <HelmetProvider>
  <QueryClientProvider client={queryClient}>
    <AuthProviders>
      <RouterProvider router={router}>
<Toaster></Toaster>
      </RouterProvider>
    </AuthProviders>
  </QueryClientProvider>
   </HelmetProvider>
  </React.StrictMode>,
)
