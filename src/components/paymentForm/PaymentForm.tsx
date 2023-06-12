import { useState } from 'react'

import { AlertDialog } from '@radix-ui/react-alert-dialog'

import StripeCheckout, { Token } from 'react-stripe-checkout'

import { useLocation, useNavigate } from 'react-router-dom'

import { parseCookies } from 'nookies'
import jwtDecode from 'jwt-decode'

import '../../styles/checkout.css'

import { api } from '../../lib/api'

export function PaymentForm() {
  const [errorMessage, setErrorMessage] = useState('') // Estado para controlar a mensagem de erro
  // Função para lidar com o pagamento
  const handlePayment = async (token: Token): Promise<void> => {
    console.log('Token do pagamento:', token)

    try {
      // Obter o token do cookie e decodificar para obter o ID do usuário
      const cookies = parseCookies() // Obtém todos os cookies
      const token = cookies['tripvalley.token'] // Obtém o valor do cookie 'tripvalley.token'
      const decodedToken: { id: string } = jwtDecode(token) // Decodifica o token JWT para obter o ID do usuário
      const userId = decodedToken.id // Obtém o ID do usuário

      console.log('ID do usuário:', userId)

      // Enviar os dados para o banco de dados
      const { productValue } = location.state // Obtém o "valor" do produto que foi pego da outra página, mas podemos passar mais infos "nomePacote" "dias" etc..
      const response = await api.post('/orders', {
        // Faz um post para a API
        status: 'awaiting', // Preciso entender como funciona esse field
        userId,
        packageId: 'd237ba66-9a13-4bca-8be8-943f2effda79', // Preciso saber como fazer um push do pacote que o usuário selecionou para esse campo
        totalValue: productValue,
        companions: [], // Preciso entender essa companions também
        // Interesante talvez passar o nome do pacote que o usuário comprou, "productName" mas precisa alterar no backend para receber isso
      })
      console.log('Resposta da API:', response.data) // ver  oque está recebendo

      try {
        console.log('E-mail enviado com sucesso')
      } catch (error) {
        console.error('Erro ao enviar o e-mail:', error)
        setErrorMessage('Erro ao enviar o e-mail')
        return
      }
      // Limpar o cache depois da compra
      localStorage.removeItem('productName')
      localStorage.removeItem('productValue')
      navigate('/successful') // Redirecionar para a página de sucesso
    } catch (error) {
      console.log('Erro ao enviar os dados para o banco de dados:', error)
      setErrorMessage(
        'Erro ao enviar os dados, por favor solicite a equipe de TI.',
      ) // Define a mensagem de erro para enviar ao frontend
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
      {errorMessage && (
        <div className="mb-4 flex flex-col items-center gap-2 rounded-xl border-2 border-gray-300 bg-red-500 px-7 py-4 font-normal text-gray-50">
          <AlertDialog>{errorMessage}</AlertDialog>
          <a
            href="#"
            className="w-max rounded-lg bg-blue-500 px-3 py-1 font-sans text-gray-50 hover:bg-blue-600"
          >
            Entrar em contato com suporte
          </a>
        </div>
      )}
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
            stripeKey="pk_test_51NGtoNLHqsK9bBEOnuCdtIGQA5JKi5RxzVVs5WBV6XIfZstaCfQM5knbZJ47GA1oZn1L9S6b1cVQpcf2F9B5DXW000DvT9ZJOq"
            label="Pix"
          />
          <StripeCheckout
            token={handlePayment}
            stripeKey="pk_test_51NGtoNLHqsK9bBEOnuCdtIGQA5JKi5RxzVVs5WBV6XIfZstaCfQM5knbZJ47GA1oZn1L9S6b1cVQpcf2F9B5DXW000DvT9ZJOq"
            label="Boleto bancário"
          />
          <StripeCheckout
            token={handlePayment}
            stripeKey="pk_test_51NGtoNLHqsK9bBEOnuCdtIGQA5JKi5RxzVVs5WBV6XIfZstaCfQM5knbZJ47GA1oZn1L9S6b1cVQpcf2F9B5DXW000DvT9ZJOq"
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
            locale="auto"
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
