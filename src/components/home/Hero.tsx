import { GlobeHemisphereWest, MagnifyingGlass, Ticket } from 'phosphor-react'
import { Balancer } from 'react-wrap-balancer'

import { ButtonDialog } from '../ButtonDialog'

import wave from '../../assets/wave.svg'

export function Hero() {
  return (
    <div className="w-full">
      <div className="flex h-screen w-full bg-home bg-cover bg-no-repeat px-5 md:items-center md:px-10 lg:px-40">
        <div className="my-20 flex max-w-lg flex-col gap-2 md:gap-8">
          <h1 className="font-title text-3xl font-bold leading-tight text-gray-50 md:text-5xl">
            <Balancer>
              Defina sua <span className="text-yellow-400">próxima viagem</span>{' '}
              de maneira simples e fácil
            </Balancer>
          </h1>

          <span className="text-base leading-normal text-gray-100 md:text-xl">
            Vários destinos para você e sua família, com conforto e segurança.
          </span>

          <ButtonDialog
            icon={<MagnifyingGlass size={24} />}
            title="Buscar novo destino"
          />
        </div>
      </div>

      <div className="-translate-y-1/3 md:-translate-y-1/2">
        <div className="mx-5 flex flex-col gap-11 rounded-2xl bg-white p-10 shadow-2xl md:mx-10 md:flex-row lg:mx-40">
          <div className="flex flex-col items-center justify-center gap-2 text-left">
            <MagnifyingGlass size={40} className="text-blue-500" />
            <h3 className="text-xl font-semibold text-gray-800">
              Procure seu destino
            </h3>
            <p className="text-center text-sm leading-relaxed text-gray-700 md:text-base">
              Descubra destinos incríveis para sua próxima viagem. Explore
              praias paradisíacas, cidades históricas e paisagens deslumbrantes
              ao redor do mundo. Temos opções para todos os gostos e orçamentos.
            </p>
          </div>
          <hr className="w-full border-blue-400 md:hidden" />
          <div className="flex flex-col items-center justify-center gap-2">
            <Ticket size={40} className="text-blue-500" />
            <h3 className="text-xl font-semibold text-gray-800">
              Reserve seu pacotes
            </h3>
            <p className="text-center text-sm leading-relaxed text-gray-700 md:text-base">
              Planeje a sua viagem sem preocupações com os nossos pacotes
              completos. Desfrute de hospedagens confortáveis e aproveite
              passeios emocionantes e exclusivos. Garantimos uma experiência
              agradável e bem organizada.
            </p>
          </div>
          <hr className="w-full border-blue-400 md:hidden" />

          <div className="flex flex-col items-center justify-center gap-2">
            <GlobeHemisphereWest size={40} className="text-blue-500" />
            <h3 className="text-xl font-semibold text-gray-800">
              Conheça a região
            </h3>
            <p className="text-center text-sm leading-relaxed text-gray-700 md:text-base">
              Conheça a fundo a região que você está visitando. Descubra a rica
              história, os pontos turísticos fascinantes e as tradições locais.
              Com dicas e recomendações úteis, você aproveitará ao máximo cada
              momento da sua viagem.
            </p>
          </div>
        </div>
        <img
          className="absolute left-1/2 -z-50 w-[calc(100%-5rem)] -translate-x-1/2 -translate-y-[30%] md:w-[calc(100%-22rem)]"
          src={wave}
          alt="Blue wave"
        />
      </div>
    </div>
  )
}
