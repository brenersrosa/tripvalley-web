import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { App } from './App.tsx'

import { AuthProvider } from './Contexts/AuthProvider.tsx'

import { DasdhBoard } from './pages/Dashboard.tsx'
import { Home } from './pages/Home.tsx'

import { SignIn } from './pages/SignIn.tsx'
import './styles/main.css'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    // errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      // {
      //   path: '/register',
      //   element: <Register />
      // },
      {
        path: '/signin',
        element: <SignIn />,
      },
      {
        path: '/dashboard',
        element: <DasdhBoard />,
      },
      // {
      //   path: '/dashboard/*',
      //   element: <ProtectedRoutes element={<DasdhBoard />} />,
      // },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={routes} />
    </AuthProvider>
  </React.StrictMode>,
)
