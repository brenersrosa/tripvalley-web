import { CaretLeft, SignOut } from 'phosphor-react'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '../contexts/AuthContext'
import { Button } from './Button'

interface FormHeaderProps {
  title: string
}

export function Header({ title }: FormHeaderProps) {
  const { user, signOut } = useContext(AuthContext)
  const [isButtonEnabled, setIsButtonEnabled] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const currentPath = window.location.pathname
    const pathLevels = currentPath.split('/')

    if (pathLevels.length > 2) {
      setIsButtonEnabled(true)
    } else {
      setIsButtonEnabled(false)
    }
  }, [])

  function handleSignOut() {
    signOut()
  }

  return (
    <div className="flex h-20 w-full items-center justify-between">
      <div className="flex h-full flex-1 items-center justify-between border-b-2 px-5 md:px-28">
        {isButtonEnabled === true && (
          <Button icon={<CaretLeft size={24} />} onClick={() => navigate(-1)} />
        )}
        <span className="font-title text-xl font-semibold">{title}</span>
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
