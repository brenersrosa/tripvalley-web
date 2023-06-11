import { useEffect, useState } from 'react'
import StripeCheckout, { Token } from 'react-stripe-checkout'
import { useLocation, useNavigate } from 'react-router-dom'
import '../../styles/checkout.css'

import { api } from '../../lib/api'

export function PaymentForm() {
  const handlePayment = (token: Token): void => {
    // Token após finalizar compra
    console.log('Token do pagamento:', token)
    navigate('/successful')
  }

  const location = useLocation()
  const { productName, productValue } = location.state
  console.log(
    'Nome do produto: ' + '[' + productName + '',
    'Valor do produto: ' + '[' + productValue + ']',
  )

  const navigate = useNavigate()

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await api.get('/packages')
        console.log('Response from API:', response.data)
      } catch (error) {
        console.log('Error getting packages.', error)
      }
    }

    fetchPackages()
  }, [])

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
            stripeKey="pk_test_51NGtoNLHqsK9bBEOnuCdtIGQA5JKi5RxzVVs5WBV6XIfZstaCfQM5knbZJ47GA1oZn1L9S6b1cVQpcf2F9B5DXW000DvT9ZJOq"
            amount={productValue * 150} // Valor em centavos
            image="https://st.depositphotos.com/1620138/3305/i/450/depositphotos_33054491-stock-photo-ubatuba-sao-paulo-brazil.jpg"
            description="Pacote de 3 dias para ubatuba"
            currency="BRL"
            reconfigureOnUpdate={true}
            name={productName}
            label="Pix"
            alipay={true}
            locale="br"
            bitcoin={true}
            zipCode={true}
            allowRememberMe={true}
            panelLabel="Valor"
          />
          <StripeCheckout
            token={handlePayment}
            stripeKey="pk_test_51NGtoNLHqsK9bBEOnuCdtIGQA5JKi5RxzVVs5WBV6XIfZstaCfQM5knbZJ47GA1oZn1L9S6b1cVQpcf2F9B5DXW000DvT9ZJOq"
            amount={productValue * 150} // Valor em centavos
            image="https://st.depositphotos.com/1620138/3305/i/450/depositphotos_33054491-stock-photo-ubatuba-sao-paulo-brazil.jpg"
            description="Pacote de 3 dias para ubatuba"
            currency="BRL"
            reconfigureOnUpdate={true}
            name={productName}
            label="Boleto bancário"
            alipay={true}
            locale="br"
            bitcoin={true}
            zipCode={true}
            allowRememberMe={true}
            panelLabel="Valor"
          />
          <StripeCheckout
            token={handlePayment}
            stripeKey="pk_test_51NGtoNLHqsK9bBEOnuCdtIGQA5JKi5RxzVVs5WBV6XIfZstaCfQM5knbZJ47GA1oZn1L9S6b1cVQpcf2F9B5DXW000DvT9ZJOq"
            amount={productValue * 150} // Valor em centavos
            image="https://st.depositphotos.com/1620138/3305/i/450/depositphotos_33054491-stock-photo-ubatuba-sao-paulo-brazil.jpg"
            description="Pacote de 3 dias para ubatuba"
            currency="BRL"
            reconfigureOnUpdate={true}
            name={productName}
            label="Pagar com cartão de débito"
            alipay={true}
            locale="br"
            bitcoin={true}
            zipCode={true}
            allowRememberMe={true}
            panelLabel="Valor"
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
