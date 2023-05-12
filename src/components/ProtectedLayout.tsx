import { ReactNode, useContext } from 'react'
import { AuthContext } from '../Contexts/AuthProvider'

interface ProtectedLayoutProps {
  children: ReactNode | any
}

export function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const { isAuthenticated } = useContext(AuthContext)

  if (!isAuthenticated) {
    return <h1>{`You don't have access!`}</h1>
  }

  return { children }
}
