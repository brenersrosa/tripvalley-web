import Balance from 'react-wrap-balancer'

import { Input } from '../components/form/Input'
import { Header } from '../components/Header'

export function Login() {
  return (
    <>
      <Header title="Login" linkTo="#" />

      <div className="bg-gray-500 flex h-[calc(100vh-5rem)]">
        <div className="w-full h-full bg-[url('../assets/hero.png')] bg-no-repeat bg-cover flex items-end pl-28 pb-28">
          <div className="max-w-md flex flex-col gap-4">
            <h2 className="font-title font-bold leading-tight text-6xl text-gray-50 uppercase">
              <Balance>Aproveite o mundo!</Balance>
            </h2>
            <span className="text-gray-100 leading-relaxed">
              <Balance>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </Balance>
            </span>
          </div>
        </div>

        <div className="w-full h-full bg-zinc-50 flex items-center">
          <div className="max-w-24 flex flex-col gap-8 mx-auto">
            <h3 className="font-title font-semibold text-4xl leading-tight">
              <Balance>Estamos quase lá!</Balance>
            </h3>
            <span className="font-title leading-relaxed text-gray-500">
              <Balance>
                Faça seu login para começar uma experiência incrível.
              </Balance>
            </span>
            <form action="#" className="flex flex-col gap-8">
              <div className="flex flex-col gap-8">
                <Input inputType="email" name="email" placeholder="E-mail" />
                <Input
                  inputType="password"
                  name="password"
                  placeholder="Senha"
                />
                <a
                  href="#"
                  className="text-blue-500 transition-colors hover:text-blue-600"
                >
                  Esqueci minha senha
                </a>
              </div>
              <button className="w-full h-14 bg-blue-500 rounded-lg text-white font-title font-medium transition-colors hover:bg-blue-600">
                Login
              </button>
              <span className="text-gray-500">
                Não possui uma conta?{' '}
                <a
                  href="#"
                  className="text-blue-500 transition-colors hover:text-blue-600"
                >
                  Criar conta
                </a>
              </span>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
