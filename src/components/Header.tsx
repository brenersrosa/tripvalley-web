import { SignOut } from 'phosphor-react'
import { useContext } from 'react'

import { AuthContext } from '../contexts/AuthContext'

interface FormHeaderProps {
  title: string
}

export function Header({ title }: FormHeaderProps) {
  const { user, signOut } = useContext(AuthContext)

  function handleSignOut() {
    signOut()
  }

  return (
    <div className="flex items-center justify-between w-full h-20">
      <div className="h-full flex-1 flex items-center justify-between border-b-2 px-5 md:px-28">
        <span className="font-title font-semibold text-xl">{title}</span>
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
