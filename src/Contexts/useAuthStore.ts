import { useContext } from 'react'
import { AuthContext } from './AuthProvider'

const useAuthStore = () => {
  const { isAuthenticated, signIn, signOut, user, register, error } =
    useContext(AuthContext)
  return { isAuthenticated, signIn, signOut, user, register, error }
}

export default useAuthStore
