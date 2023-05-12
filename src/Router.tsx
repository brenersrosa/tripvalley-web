import { Route, Routes } from 'react-router-dom'

import { DasdhBoard } from './pages/Dashboard'
import { Home } from './pages/Home'
import { SignIn } from './pages/SignIn'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/dashboard" element={<DasdhBoard />} />
    </Routes>
  )
}
