import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function PackageBuy() {
  const navigate = useNavigate()
  const [productName, setProductName] = useState('Ubachuva')
  const [productValue, setProductValue] = useState(500)

  const handleBuy = () => {
    // Redirecionar para a página de pagamento
    navigate('/payment', {
      state: {
        productName,
        productValue,
      },
    })
  }

  return (
    <div>
      <h1>Minha Página Para testar compra</h1>
      <br />
      <br />
      <label htmlFor="">Nome do produto:</label>
      <h2>{productName}</h2>
      <label htmlFor="">Valor do produto:</label>
      <h2>{productValue}</h2>

      <br />
      <br />
      <button
        className="rounded-md bg-blue-500 px-3 py-1 text-white"
        onClick={handleBuy}
      >
        Comprar
      </button>
    </div>
  )
}
