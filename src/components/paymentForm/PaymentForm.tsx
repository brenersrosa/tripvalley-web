import { useState, useEffect } from 'react'

import { AlertDialog } from '@radix-ui/react-alert-dialog'

import StripeCheckout from 'react-stripe-checkout'

import { useLocation, useNavigate } from 'react-router-dom'

import { parseCookies } from 'nookies'
import jwtDecode from 'jwt-decode'

import '../../styles/checkout.css'

import { api } from '../../lib/api'
import { Button } from '../Button'
import { Footer } from '../Footer'

export function PaymentForm() {
  const [errorMessage, setErrorMessage] = useState('') // Estado para controlar a mensagem de erro

  // ================================================================================================
  // Parte para realizar a venda do pacote utilizando o gateway de pagamento, envio de token, id, companions etc...
  const handlePayment = async (): Promise<void> => {
    try {
      // Obter o token do cookie e decodificar para obter o ID do usuário
      const cookies = parseCookies() // Obtém todos os cookies
      const token = cookies['tripvalley.token'] // Obtém o valor do cookie 'tripvalley.token'
      const decodedToken: { id: string } = jwtDecode(token) // Decodifica o token JWT para obter o ID do usuário
      const userId = decodedToken.id // Obtém o ID do usuário
      // Enviar os dados para o banco de dados
      const { packageValue, companionsArrayData = [], id } = location.state // Obtém o "valor" do produto que foi pego da outra página, mas podemos passar mais infos "nomePacote" "dias" etc..
      await api.post('/orders', {
        // Faz um post para a API
        status: 'accept', // Status para api reconhecer
        userId,
        packageId: id, // Preciso saber como fazer um push do pacote que o usuário selecionou para esse campo
        totalValue: packageValue,
        companions: companionsArrayData, // Aqui entra o array em JSON para armazenar no banco caso tenha acompanhantes
      })
      // Limpar o cache depois da compra
      localStorage.removeItem('id')
      localStorage.removeItem('packageValue')
      localStorage.removeItem('companionsArray')
      navigate('/successful') // Redirecionar para a página de sucesso
    } catch (error) {
      console.log('Erro ao enviar os dados para o banco de dados:', error)
      setErrorMessage(
        'Erro ao enviar os dados, por favor solicite a equipe de TI.',
      ) // Define a mensagem de erro para enviar ao frontend
    }
  }

  // ==========================================================================================================
  // Parte para passar os dados para o card de detalhes dos pacotes.
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

  return (
    <div className="pt-28">
      <nav className="fixed right-0 top-0 z-50 flex h-[40px] w-full  items-center justify-between border-b bg-black bg-opacity-60 px-5 text-gray-50 shadow-lg md:h-[90px] md:border-b-0 md:px-10 lg:px-40">
        <div className="flex select-none items-center">
          <a href="/" className="text-xl font-bold text-blue-500 md:text-4xl">
            TRIP<span className="text-base text-white md:text-2xl">valley</span>
          </a>
        </div>
        <div className="mb-3  w-[15%]">
          <Button title="Voltar" onClick={() => navigate(-1)} />
        </div>
      </nav>
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
      <div className="mx-40 flex gap-3 border border-gray-200 bg-white shadow-md">
        <div className="flex w-full flex-col text-left">
          <div className="w-full">
            <figure className="relative cursor-pointer shadow-lg grayscale filter transition-all duration-300 hover:grayscale-0">
              <img
                className="h-96 w-full"
                src={packageImage}
                alt="image description"
              />

              <figcaption className="absolute bottom-6 px-4 text-lg text-white">
                <p>{packageDescription}</p>
              </figcaption>
            </figure>
          </div>
          <div className="px-4 py-4">
            <h2 className="text-lg font-semibold">Nome do pacote</h2>
            <p className="text-gray-600">{packageName}</p>
            <h2 className="mt-2 text-lg font-semibold">
              Quantidade de adultos
            </h2>
            <p className="max-w-xs text-gray-600">{adults}</p>
            <h2 className="mt-2 text-lg font-semibold">
              Quantidade de crianças
            </h2>
            <p className="max-w-xs text-gray-600">{children || '0'}</p>
            <h2 className="mt-2 text-lg font-semibold">Tipo de transfer</h2>
            <p className="max-w-xs text-gray-600">{transferType || '0'}</p>
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
          <div className="flex flex-col">
            <StripeCheckout
              token={handlePayment}
              stripeKey="pk_test_51NGtoNLHqsK9bBEOnuCdtIGQA5JKi5RxzVVs5WBV6XIfZstaCfQM5knbZJ47GA1oZn1L9S6b1cVQpcf2F9B5DXW000DvT9ZJOq"
              amount={packageValue * 100} // Valor em centavos
              image={packageImage}
              description={packageDescription}
              currency="BRL"
              name={packageName}
              label="Pagar com cartão de crédito"
              locale="auto"
              allowRememberMe={true}
              panelLabel="Valor"
            />
          </div>
        </div>
      </div>
      <div className="mt-10 border-t-2 border-gray-300">
        <Footer />
      </div>
    </div>
  )
}
