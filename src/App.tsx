import { Toaster } from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom'

import { AuthProvider } from './contexts/AuthContext'

import { Router } from './Router'

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </BrowserRouter>
  )
}
