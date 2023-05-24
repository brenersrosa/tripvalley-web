import jwtDecode from 'jwt-decode'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { ReactNode, createContext, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import colors from 'tailwindcss/colors'

import { XCircle } from 'phosphor-react'
import { api } from '../lib/api'

interface signInCredentials {
  email: string
  password: string
}

interface UserProps {
  id: string
  name: string
  email: string
}

interface AuthContextProps {
  isAuthenticated: boolean
  loading: boolean
  user: UserProps | null
  error: null | string
  signIn: (data: signInCredentials) => Promise<void>
  signOut: () => void
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps | null>(null)
  const isAuthenticated = !!user
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    const { 'tripvalley.token': token } = parseCookies()

    async function getUserData() {
      try {
        if (token) {
          const user: UserProps = jwtDecode(token)

          setUser(user)
        }
      } catch (error) {
        console.log(error)
      }
    }

    getUserData()

    setLoading(false)

    // setTimeout(() => {
    // setLoading(false)
    // }, 5000)
  }, [])

  async function signIn({ email, password }: signInCredentials) {
    await api
      .post('/signin', {
        email,
        password,
      })
      .then((response) => {
        const { accessToken } = response.data

        setCookie(undefined, 'tripvalley.token', accessToken, {
          maxAge: 60 * 60 * 60 * 7, // 7 days
          path: '/',
        })

        const userLogged: UserProps = jwtDecode(accessToken)

        setUser(userLogged)

        api.defaults.headers.Authorization = `Bearer ${accessToken}`

        navigate('/dashboard')
      })
      .catch((error) => {
        toast.error(error.response.data.message, {
          position: 'top-right',
          style: {
            backgroundColor: colors.red[500],
            color: colors.white,
            fontSize: 16,
            fontWeight: 500,
            padding: 16,
          },
          icon: <XCircle size={54} weight="fill" className="text-gray-50" />,
        })
        console.log(error.response.data.message)
        setError(error.response.data.message)
      })
  }

  async function signOut() {
    try {
      destroyCookie(null, 'tripvalley.token')
      setUser(null)
      navigate('/signin')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <AuthContext.Provider
      value={{ loading, user, isAuthenticated, signIn, signOut, error }}
    >
      {children}
    </AuthContext.Provider>
  )
}
