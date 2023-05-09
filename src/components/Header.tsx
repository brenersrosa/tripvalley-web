import logo from '../assets/logo-short.svg'
import user from '../assets/user.svg'

export function Header() {
  return (
    <div className="flex items-center justify-between w-full h-20">
      <img src={logo} alt="TRIPvalley logo" />
      <div className="h-full flex-1 flex items-center justify-between px-28 border-b-2 border border-gray-100">
        <span className="font-title font-semibold text-xl">Login</span>
        <a href="#" className="flex items-center gap-4">
          <span className="font-title font-semibold">Entrar</span>
          <img
            src={user}
            alt="Imagem usuário não logado"
            className="w-12 h-12"
          />
        </a>
      </div>
    </div>
  )
}
