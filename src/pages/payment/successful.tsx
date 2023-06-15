import { House, CheckCircle } from 'phosphor-react'
import { useNavigate } from 'react-router-dom'
import { Balancer } from 'react-wrap-balancer'
import { Button } from '../../components/Button'

export function PaymentSuccess() {
  const navigate = useNavigate()

  return (
    <div className="flex h-screen flex-col-reverse items-center justify-center gap-8 bg-gray-100 bg-notFound bg-cover bg-no-repeat px-8 xl:grid xl:grid-cols-2 xl:px-40">
      <div className="flex w-full flex-col items-center justify-center gap-8 xl:max-w-md">
        <h1 className="w-full font-title text-3xl font-semibold leading-tight text-green-600">
          Compra bem-sucedida!
        </h1>

        <p className="w-full leading-relaxed text-gray-600">
          <Balancer>
            Para demonstrar nosso apreço e retribuir sua confiança, temos uma
            surpresa especial para você! Como forma de agradecimento, estamos
            oferecendo um desconto exclusivo de
            <span className="font-bold text-green-600">
              {' '}
              5% em sua próxima compra.
            </span>{' '}
            Isso mesmo, um desconto especial só para você.
          </Balancer>
        </p>

        <Button
          icon={<House size={24} />}
          title="Voltar para página inicial"
          onClick={() => navigate('/')}
        />
      </div>

      <div className="flex items-center justify-center">
        <i className="text-green-600">
          <CheckCircle size={350} />
        </i>
      </div>
    </div>
  )
}
