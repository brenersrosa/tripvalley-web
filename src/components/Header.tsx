import { useNavigate } from 'react-router-dom'

import { SignOut } from 'phosphor-react'
import useAuthStore from '../Contexts/useAuthStore'
import logo from '../assets/logo-short.svg'

export function Header() {
  const { user, signOut } = useAuthStore()

  const navigate = useNavigate()

  function handleSignOut() {
    signOut()
    navigate('/signin')
  }

  function getPageName() {
    const path = location.pathname

    switch (path) {
      case '/':
        return 'Home'
      case '/signin':
        return 'SignIn'
      case '/dashboard':
        return 'Dashboard'
      default:
        return ''
    }
  }

  return (
    <div className="flex items-center justify-between w-full h-20">
      <img src={logo} alt="TRIPvalley logo" />
      <div className="h-full flex-1 flex items-center justify-between px-28 border-b-2 border border-gray-100">
        <span className="font-title font-semibold text-xl">
          {getPageName()}
        </span>
        {!user ? (
          <span className="font-medium">Entrar</span>
        ) : (
          <div className="flex items-center gap-4">
            <span className="font-medium">{user.name}</span>
            <button onClick={handleSignOut}>
              <SignOut size={24} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
