import useAuthStore from '../Contexts/useAuthStore'
import { Header } from '../components/Header'

export function DasdhBoard() {
  const { user } = useAuthStore()

  return (
    <>
      <Header />

      <div className="flex flex-col items-center justify-center h-[calc(100vh-5rem)] gap-4">
        <h1>Bem vindo, {user?.name}</h1>
      </div>
    </>
  )
}
