import { Route, Routes } from 'react-router-dom'

import { ProtectedRoute } from './components/ProtectedRoute'
import { NotFound } from './pages/404'
import { Accommodations } from './pages/accommodations'
import { NewAccommodation } from './pages/accommodations/new'
import { Companions } from './pages/companions/companions'
import { Home } from './pages/home'
import { Itineraries } from './pages/itineraries'
import { NewItinerary } from './pages/itineraries/new'
import { Packages } from './pages/packages'
import { NewPackage } from './pages/packages/new'
import { Payment } from './pages/payment/payment'
import { PaymentSuccess } from './pages/payment/successful'
import { SignIn } from './pages/signIn'
import { UserPackages } from './pages/userPackages'

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
        path="/itineraries"
        element={
          <ProtectedRoute>
            <Itineraries />
          </ProtectedRoute>
        }
      />
      <Route
        path="/itineraries/new"
        element={
          <ProtectedRoute>
            <NewItinerary />
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
      <Route path="/payment" element={<Payment />} />
      <Route path="/companions" element={<Companions />} />
      <Route path="/successful" element={<PaymentSuccess />} />
      <Route path="/packages/:id" element={<UserPackages />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
