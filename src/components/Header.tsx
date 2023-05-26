import { SignOut } from 'phosphor-react'
import { useContext } from 'react'
import logo from '../assets/logo-short.svg'

import { AuthContext } from '../contexts/AuthContext'

export function Header() {
  const { user, signOut } = useContext(AuthContext)

  function handleSignOut() {
    signOut()
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
      <div className="h-full flex-1 flex items-center justify-between shadow-md md:border-b-2 px-5 md:px-28">
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
