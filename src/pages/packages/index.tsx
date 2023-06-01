import { Header } from '../../components/Header'
import { NavBar } from '../../components/NavBar'

export function Packages() {
  return (
    <div className="flex h-screen w-full">
      <NavBar />
      <div className="w-full">
        <Header title="Pacotes" />
      </div>
    </div>
  )
}
