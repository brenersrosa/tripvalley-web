import { useState, useEffect } from 'react'

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
      const { packageValue, id } = location.state // Obtém o "valor" do produto que foi pego da outra página, mas podemos passar mais infos "nomePacote" "dias" etc..
      const response = await api.post('/orders', {
        // Faz um post para a API
        status: 'accept', // Preciso entender como funciona esse field
        userId,
        packageId: id, // Preciso saber como fazer um push do pacote que o usuário selecionou para esse campo
        totalValue: packageValue,
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
      setErrorMessage(
        'Erro ao enviar os dados, por favor solicite a equipe de TI.',
      ) // Define a mensagem de erro para enviar ao frontend
    }
  }

  // Obter o nome e valor do produto apenas teste [deletar depois]
  const navigate = useNavigate()
  const location = useLocation()
  const { packageValue, adults, children, transferType, id } = location.state
  const [packageName, setPackageName] = useState('')
  const [packageDescription, setPackageDescription] = useState('')
  const [packageImage, setPackageImage] = useState('')

  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        const response = await api.get(`/packages/${id}`)
        const { name, description, imagePath } = response.data
        setPackageName(name)
        setPackageDescription(description)
        setPackageImage(imagePath)
      } catch (error) {
        console.error('Erro ao obter os detalhes do pacote:', error)
      }
    }

    fetchPackageDetails()
  }, [id])

  console.log(`Informações do produto:
  ----------------------
  Valor total: ${packageValue}
  Número de adultos: ${adults}
  Número de crianças: ${children}
  Tipo de transferência: ${transferType}
  ID: ${id}
  Nome do pacote: ${packageName}
  Descrição do pacote: ${packageDescription}
  imagePath: ${packageImage}`)

  return (
    <div className="my-auto flex h-max flex-col items-center justify-center bg-gray-200 py-10">
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
              src={packageImage}
              alt=""
            />
          </div>
          <div className="mt-4">
            <h2 className="text-lg font-semibold">Nome do pacote</h2>
            <p className="text-gray-600">{packageName}</p>
            <h2 className="mt-2 text-lg font-semibold">Descrição</h2>
            <p className="max-w-xs text-gray-600">{packageDescription}</p>
            <h2 className="mt-2 text-lg font-semibold">Quantidad de adultos</h2>
            <p className="max-w-xs text-gray-600">{adults}</p>
            <h2 className="mt-2 text-lg font-semibold">
              Quantidade de crianças
            </h2>
            <p className="max-w-xs text-gray-600">{children || '0'}</p>
          </div>
          <div className="mt-2">
            <h2 className="text-lg font-semibold">Valor do pacote</h2>
            <p className="text-gray-600">
              {packageValue.toLocaleString('pt-BR', {
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
            amount={packageValue * 100} // Valor em centavos
            image={packageImage}
            description={packageDescription}
            currency="BRL"
            reconfigureOnUpdate={true}
            name={packageName}
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