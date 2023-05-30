import { Header } from '../../components/Header'
import { NavBar } from '../../components/NavBar'

export function NewAccommodation() {
  return (
    <div className="w-full h-screen flex">
      <NavBar />
      <div className="w-full">
        <Header title="Adicionar hospedagem" />
      </div>
    </div>
  )
}
