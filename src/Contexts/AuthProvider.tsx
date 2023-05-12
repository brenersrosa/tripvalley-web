import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
import { ReactNode, createContext, useState } from 'react'

import { RegisterInputProps, SignInInputProps } from '../schemas/user.schemas'
import { api } from '../services/api'

interface UserProps {
  id: string
  name: string
  email: string
  roleId?: string
}

interface AuthContextProps {
  isAuthenticated: boolean
  user: UserProps | null
  error: null | string
  signIn: (data: SignInInputProps) => Promise<void>
  register: (data: RegisterInputProps) => Promise<void>
  signOut: () => void
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  user: null,
  error: null,
  register: async () => {},
  signIn: async () => {},
  signOut: () => {},
})

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<UserProps | null>(null)
  const [error, setError] = useState(null)

  async function register(data: RegisterInputProps) {
    await api
      .post('/users/register', data)
      .then((response) => {
        console.log(response.data.message)
      })
      .catch((error) => {
        console.error('error', error.response.data.message)
        setError(error.response.data.message)
      })
  }

  async function signIn(data: SignInInputProps) {
    await api
      .post('/users/signin', data)
      .then((response) => {
        const token = response.data.accessToken

        Cookies.set('tripvalley.token', token, {
          expires: 7,
          secure: true,
          sameSite: 'Lax',
        })

        const decoded = jwtDecode<UserProps>(token)

        setUser(decoded)
        setIsAuthenticated(true)
      })
      .catch((error) => {
        console.error('error', error.response.data.message)
      })
  }

  async function signOut() {
    try {
      Cookies.remove('tripvalley.token')
      setUser(null)
      setIsAuthenticated(false)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, signIn, register, signOut, isAuthenticated, error }}
    >
      {children}
    </AuthContext.Provider>
  )
}
