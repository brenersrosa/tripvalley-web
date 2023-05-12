import { Route, Routes } from 'react-router-dom'

import { DasdhBoard } from './pages/Dashboard'
import { Login } from './pages/Login'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<DasdhBoard />} />
    </Routes>
  )
}
