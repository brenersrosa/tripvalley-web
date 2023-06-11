import { useEffect } from 'react'
import StripeCheckout, { Token } from 'react-stripe-checkout'
import { useLocation, useNavigate } from 'react-router-dom'
import { parseCookies } from 'nookies'
import jwtDecode from 'jwt-decode'
import '../../styles/checkout.css'

import { api } from '../../lib/api'

export function PaymentForm() {
  // Função para lidar com o pagamento
  const handlePayment = async (token: Token): Promise<void> => {
    console.log('Token do pagamento:', token)

    try {
      // Obter o token do cookie e decodificar para obter o ID do usuário
      const cookies = parseCookies()
      const token = cookies['tripvalley.token']
      const decodedToken: { id: string } = jwtDecode(token)
      const userId = decodedToken.id

      console.log('ID do usuário:', userId)

      // Enviar os dados para o banco de dados
      const { productName, productValue } = location.state
      const response = await api.post('/orders', {
        status: 'awaiting', // Preciso entender como funciona esse field
        userId,
        packageId: '4838705d-3391-48be-b9ee-657aaf7a5ae8', // Preciso saber como fazer um push do pacote que o usuário selecionou para esse campo
        totalValue: productValue,
        companions: [], // Preciso entender essa companions também
        // Interesante talvez passar o nome do pacote que o usuário comprou, "productName" mas precisa alterar no backend para receber isso
      })
      console.log('Resposta da API:', response.data) // ver  oque está recebendo

      // Limpar o cache depois da compra
      localStorage.removeItem('productName')
      localStorage.removeItem('productValue')

      navigate('/successful') // Redirecionar para a página de sucesso
    } catch (error) {
      console.log('Erro ao enviar os dados para o banco de dados:', error)
    }
  }

  // Obter o nome e valor do produto apenas teste [deletar depois]
  const location = useLocation()
  const { productName, productValue } = location.state
  console.log(
    'Nome do produto: ' + '[' + productName + ']',
    'Valor do produto: ' + '[' + productValue + ']',
  )

  const navigate = useNavigate()

  return (
    <div className="my-auto flex h-screen flex-col items-center justify-center bg-gray-200">
      <div className="flex flex-row gap-3 rounded-lg border-2 bg-white shadow-md">
        <div className="flex flex-col border-r-2 p-10 text-left">
          <h1 className="mb-2 font-title text-2xl font-bold">
            Detalhes do Pacote
          </h1>
          <div>
            <img
              className="max-w-[220px] rounded-lg object-cover shadow-lg brightness-95"
              src="https://st.depositphotos.com/1620138/3305/i/450/depositphotos_33054491-stock-photo-ubatuba-sao-paulo-brazil.jpg"
              alt=""
            />
          </div>
          <div className="mt-4">
            <h2 className="text-lg font-semibold">Nome do pacote</h2>
            <p className="text-gray-600">{productName}</p>
          </div>
          <div className="mt-2">
            <h2 className="text-lg font-semibold">Valor do pacote</h2>
            <p className="text-gray-600">
              {productValue.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-start justify-start gap-5 p-10">
          <h1 className="font-title text-2xl font-bold">
            Métodos de pagamento
          </h1>
          <StripeCheckout
            token={handlePayment}
            stripeKey="working..."
            label="Pix"
          />
          <StripeCheckout
            token={handlePayment}
            stripeKey="working..."
            label="Boleto bancário"
          />
          <StripeCheckout
            token={handlePayment}
            stripeKey="working..."
            label="Pagar com cartão de débito"
          />
          <StripeCheckout
            token={handlePayment}
            stripeKey="pk_test_51NGtoNLHqsK9bBEOnuCdtIGQA5JKi5RxzVVs5WBV6XIfZstaCfQM5knbZJ47GA1oZn1L9S6b1cVQpcf2F9B5DXW000DvT9ZJOq"
            amount={productValue * 100} // Valor em centavos
            image="https://st.depositphotos.com/1620138/3305/i/450/depositphotos_33054491-stock-photo-ubatuba-sao-paulo-brazil.jpg"
            description="Pacote de 3 dias para ubatuba"
            currency="BRL"
            reconfigureOnUpdate={true}
            name={productName}
            label="Pagar com cartão de crédito"
            alipay={true}
            locale="br"
            bitcoin={true}
            zipCode={true}
            allowRememberMe={true}
            panelLabel="Valor"
          />
        </div>
      </div>
    </div>
  )
}
