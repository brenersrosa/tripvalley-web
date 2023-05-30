import { Route, Routes } from 'react-router-dom'

import { ProtectedRoute } from './components/ProtectedRoute'
import { Home } from './pages/Home'
import { SignIn } from './pages/SignIn'
import { Accommodations } from './pages/accommodations'
import { NewAccommodation } from './pages/accommodations/new'
import { Packages } from './pages/packages'
import { NewPackage } from './pages/packages/new'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route
        path="/accommodations"
        element={
          <ProtectedRoute>
            <Accommodations />
          </ProtectedRoute>
        }
      />
      <Route
        path="/accommodations/new"
        element={
          <ProtectedRoute>
            <NewAccommodation />
          </ProtectedRoute>
        }
      />
      <Route
        path="/packages"
        element={
          <ProtectedRoute>
            <Packages />
          </ProtectedRoute>
        }
      />
      <Route
        path="/packages/new"
        element={
          <ProtectedRoute>
            <NewPackage />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}
