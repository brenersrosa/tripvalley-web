import { MagnifyingGlass } from 'phosphor-react'
import { Link } from 'react-router-dom'

export function Hero(): JSX.Element {
  return (
    <div className="z-0 hidden select-none md:block lg:block">
      <div className="brightness-90 filter">
        <img
          className="h-min object-fill lg:w-full"
          src="src/assets/background/backgroundHome.png"
          alt=""
        />
      </div>
      <div className="absolute -top-2">
        <div className="relative left-10 top-36 z-10 flex flex-col gap-2 px-[60px] font-bold text-white md:max-w-lg md:text-2xl lg:text-5xl">
          <div className="space-y-1">
            <h1 className="w-auto text-gray-50">
              Planeje sua próxima{' '}
              <span className="text-yellow-400">viagem</span>
            </h1>
            <h1>de maneira simples e fácil</h1>
            <h2 className="text-base font-normal">
              Diversos destinos para você e sua família, com conforto e
              segurança.
            </h2>
          </div>
          <div>
            <Link
              to="/signin"
              className="flex flex-row items-center justify-center rounded-lg bg-blue-500 font-bold text-gray-50 transition  hover:bg-blue-600 md:py-3 md:text-sm lg:py-4 lg:text-base"
            >
              <MagnifyingGlass className="my-auto mr-2" size={24} />
              Encontre seu novo destino
            </Link>
          </div>
        </div>
      </div>

      <div className="relative bottom-24 z-20 flex w-auto select-none items-center justify-center">
        <img
          className="object-fill"
          src="src/assets/informativeImages/infoHome.png"
          alt=""
        />
      </div>
    </div>
  )
}

export default Hero
