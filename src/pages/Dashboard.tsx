import { useContext } from 'react'
import { Header } from '../components/Header'
import { AuthContext } from '../contexts/AuthContext'

export function Dashboard() {
  const { user } = useContext(AuthContext)

  return (
    <>
      <Header />

      <div className="flex flex-col items-center justify-center h-[calc(100vh-5rem)] gap-4">
        <h1>Bem vindo, {user?.name}</h1>
      </div>
    </>
  )
}
