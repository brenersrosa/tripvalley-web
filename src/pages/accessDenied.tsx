import { House } from 'phosphor-react'
import { useNavigate } from 'react-router-dom'
import { Balancer } from 'react-wrap-balancer'

import { Button } from '../components/Button'

import heroImg from '../assets/not-found.svg'

export function AccessDenied() {
  const navigate = useNavigate()

  return (
    <div className="flex h-screen flex-col-reverse items-center justify-center gap-8 bg-gray-100 bg-notFound bg-cover bg-no-repeat px-8 xl:grid xl:grid-cols-2 xl:px-40">
      <div className="flex w-full flex-col items-center justify-center gap-8 xl:max-w-md">
        <h1 className="w-full font-title text-3xl font-semibold leading-tight text-gray-900">
          Ooops, acesso negado...
        </h1>

        <p className="w-full leading-relaxed text-gray-600">
          <Balancer>
            Parece que está tentando acessar caminhos proibidos. Explore nossos
            pacotes de viagens e sonhe com o seu próximo destino e qualquer
            dúvida contate nosso suporte.
          </Balancer>
        </p>

        <Button
          icon={<House size={24} />}
          title="Voltar para casa"
          onClick={() => navigate('/')}
        />
      </div>

      <div className="flex items-center justify-center">
        <img src={heroImg} alt="Image 404" />
      </div>
    </div>
  )
}
