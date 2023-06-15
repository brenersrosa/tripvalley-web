import { Route, Routes } from 'react-router-dom'

import { ProtectedRoute } from './components/ProtectedRoute'
import { NotFound } from './pages/404'
import { Accommodations } from './pages/accommodations'
import { NewAccommodation } from './pages/accommodations/new'
import { Home } from './pages/home'
import { Packages } from './pages/packages'
import { NewPackage } from './pages/packages/new'
import { SignIn } from './pages/signIn'
import { Payment } from './pages/payment/payment'
import { PaymentSuccess } from './pages/payment/successful'
import { UserPackages } from './pages/userPackages'
import { Companions } from './pages/companions/companions'

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
      <Route
        path="/payment"
        element={
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        }
      />
      <Route
        path="/companions"
        element={
          <ProtectedRoute>
            <Companions />
          </ProtectedRoute>
        }
      />
      <Route
        path="/successful"
        element={
          <ProtectedRoute>
            <PaymentSuccess />
          </ProtectedRoute>
        }
      />
      <Route path="/packages/:id" element={<UserPackages />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
