import { GlobeHemisphereWest, MagnifyingGlass, Ticket } from 'phosphor-react'
import { Balancer } from 'react-wrap-balancer'

import { Button } from '../Button'

import wave from '../../assets/wave.svg'

export function Hero() {
  return (
    <div className="w-full">
      <div className="flex h-screen w-full items-center bg-home bg-cover bg-no-repeat px-40 brightness-90">
        <div className="flex max-w-lg flex-col gap-8">
          <h1 className="font-title text-5xl font-bold leading-tight text-gray-50">
            <Balancer>
              Defina sua <span className="text-yellow-400">próxima viagem</span>{' '}
              de maneira simples e fácil
            </Balancer>
          </h1>

          <span className="text-xl leading-normal text-gray-100">
            Vários destinos para você e sua família, com conforto e segurança.
          </span>

          <Button
            icon={<MagnifyingGlass size={24} className="text-white" />}
            title="Buscar novo destino"
          />
        </div>
      </div>

      <div className="-translate-y-1/4">
        <div className="mx-40 flex gap-11 rounded-2xl bg-white p-10 shadow-2xl">
          <div className="flex flex-col items-center justify-center gap-2">
            <MagnifyingGlass size={40} className="text-blue-500" />
            <h3 className="text-xl font-semibold text-gray-800">
              Procure seu destino
            </h3>
            <p className="text-center leading-relaxed text-gray-700">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industrys standard dummy text
              ever since the 1500s.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-2">
            <Ticket size={40} className="text-blue-500" />
            <h3 className="text-xl font-semibold text-gray-800">
              Reserve seu pacotes
            </h3>
            <p className="text-center leading-relaxed text-gray-700">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industrys standard dummy text
              ever since the 1500s.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-2">
            <GlobeHemisphereWest size={40} className="text-blue-500" />
            <h3 className="text-xl font-semibold text-gray-800">
              Conheça a região
            </h3>
            <p className="text-center leading-relaxed text-gray-700">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industrys standard dummy text
              ever since the 1500s.
            </p>
          </div>
        </div>
        <img
          className="absolute left-1/2 -z-50 w-[calc(100%-22rem)] -translate-x-1/2 -translate-y-[30%]"
          src={wave}
          alt="Blue wave"
        />
      </div>
    </div>
  );
}
