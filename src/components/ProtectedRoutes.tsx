import { useContext } from 'react'
import { Route, RouteProps, Routes } from 'react-router-dom'

import { AuthContext } from '../Contexts/AuthProvider'
import { SignIn } from '../pages/SignIn'

export function ProtectedRoutes({ element, ...rest }: RouteProps) {
  const { isAuthenticated } = useContext(AuthContext)

  return (
    <Routes {...rest}>
      {isAuthenticated ? (
        <Route {...rest} element={element} />
      ) : (
        <Route {...rest} element={<SignIn />} />
      )}
    </Routes>
  )
}
