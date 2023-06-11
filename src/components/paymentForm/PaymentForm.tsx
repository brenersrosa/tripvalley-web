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
    'Nome do produto: ' + productName,
    'Valor do produto: ' + productValue,
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
    <div className="my-auto flex h-screen items-center justify-center bg-gray-200">
      <div className="rounded-lg border-2 bg-white p-10 text-left shadow-md">
        <h1 className="font-title text-2xl font-bold">Detalhes do Pacote</h1>
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Nome do pacote</h2>
          <p className="text-gray-600">{productName}</p>
        </div>
        <div className="mt-2">
          <h2 className="text-lg font-semibold">Valor do pacote</h2>
          <p className="text-gray-600">{productValue}</p>
        </div>
        <div className="mt-8">
          <StripeCheckout
            token={handlePayment}
            stripeKey="pk_test_51NGtoNLHqsK9bBEOnuCdtIGQA5JKi5RxzVVs5WBV6XIfZstaCfQM5knbZJ47GA1oZn1L9S6b1cVQpcf2F9B5DXW000DvT9ZJOq"
            amount={productValue} // Valor em centavos
            currency="BRL"
            name={productName}
            label="Pagar com cartão de crédito"
            alipay={true}
            locale="teste"
            zipCode={true}
            allowRememberMe={true}
            panelLabel="Valor"
          />
        </div>
      </div>
    </div>
  )
}
