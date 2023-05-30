import { Header } from '../../components/Header'
import { NavBar } from '../../components/NavBar'

export function NewPackage() {
  return (
    <div className="w-full h-screen flex">
      <NavBar />
      <div className="w-full">
        <Header title="Adicionar pacote" />
      </div>
    </div>
  )
}
