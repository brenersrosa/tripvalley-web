import logo from '../assets/logo-short.svg'
import user from '../assets/user.svg'

export function Header() {
  return (
    <div className="flex items-center justify-between">
      <img src={logo} alt="TRIPvalley logo" />
      <div className="flex-1 flex items-center justify-between px-28">
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
