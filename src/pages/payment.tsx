import { useEffect, useState } from 'react'
import StripeCheckout, { Token } from 'react-stripe-checkout'
import { api } from '../lib/api'

function PaymentForm() {
  const handlePayment = (token: Token) => {
    // Token após finalizar compra
    console.log('Token do pagamento:', token)
  }
  const [selectedPackage, setSelectedPackage] = useState<string>('')

  useEffect(() => {
    api
      .get('/packages')
      .then((response) => {
        console.log('Response from API:', response.data)
        setSelectedPackage(response.data[0].name)
      })
      .catch((error) => {
        console.log('Error getting packages.', error)
      })
  }, [])

  return (
    <div>
      <StripeCheckout
        token={handlePayment}
        stripeKey="pk_test_51NGtoNLHqsK9bBEOnuCdtIGQA5JKi5RxzVVs5WBV6XIfZstaCfQM5knbZJ47GA1oZn1L9S6b1cVQpcf2F9B5DXW000DvT9ZJOq"
        amount={10000}
        currency="BRL"
        name={selectedPackage}
      />
    </div>
  )
}

export default PaymentForm
