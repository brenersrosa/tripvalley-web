import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { HeaderUser } from '../../components/home/HeaderUser'
import { Footer } from '../../components/Footer'
import { Button } from '../../components/Button'
import { CaretLeft } from 'phosphor-react'

export function Companions() {
  const navigate = useNavigate()
  const location = useLocation()

  // Extrair os valores específicos do objeto de estado passado pela rota anterior
  const { packageValue, adults, children, transferType, id } = location.state

  // Configurar os estados iniciais com base nos valores extraídos
  const [adultsCount] = useState(adults - 1)
  const [childrenCount] = useState(children)
  const [companionsArray, setCompanions] = useState<
    { [key: string]: string }[]
  >([])

  // Manipulador para envio do formulário
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Converter o array de acompanhantes em uma string JSON
    const companionsJSON = JSON.stringify(companionsArray)
    // Converter a string JSON de volta para um array de objetos
    const parsedCompanions = JSON.parse(companionsJSON)

    // Navegar para a página de pagamento com os dados necessários
    navigate('/payment', {
      state: {
        packageValue,
        transferType,
        id,
        adults,
        children,
        companionsArray: parsedCompanions,
      },
    })
  }

  // Renderizar o formulário dinamicamente com base no número de adultos e crianças da página de userPackage
  const renderForm = () => {
    const forms = []
    for (let i = 1; i <= adultsCount + childrenCount; i++) {
      forms.push(
        <div key={i} className="mb-4">
          <h2 className="mb-2 text-lg font-medium">Dados da pessoa {i}</h2>
          <div className="flex flex-col space-y-2">
            <input
              className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
              type="text"
              name="name"
              placeholder="Nome"
              required
              onChange={(e) => handleFormChange(e, i)}
            />
            <input
              type="text"
              name="document"
              className="w-full rounded-md border border-gray-300  px-4 py-3 outline-none focus-within:border-blue-500"
              maxLength={11}
              placeholder="CPF (opcional)"
              onChange={(e) => handleFormChange(e, i)}
            />
            <input
              className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus-within:border-blue-500"
              type="number"
              name="age"
              placeholder="Idade"
              required
              max={120}
              min={1}
              onChange={(e) => handleFormChange(e, i)}
            />
            {/* Outros campos do formulário */}
          </div>
        </div>,
      )
    }
    return forms
  }

  // Manipulador para alterações nos campos do formulário
  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const { name, value } = e.target

    const updatedCompanions = [...companionsArray] // Cria uma cópia atualizada do array de acompanhantes

    // Atualiza o objeto do acompanhante específico com os novos dados
    updatedCompanions[index - 1] = {
      ...updatedCompanions[index - 1],
      [name]: value,
    }
    // Define o novo estado do array de acompanhantes
    setCompanions(updatedCompanions)
  }

  return (
    <div className="flex flex-col gap-10 bg-gray-100">
      <HeaderUser />
      <div className="flex h-[300px] w-full items-center justify-center bg-blue-500 bg-companions shadow-lg">
        <h1 className="font-title text-3xl font-bold text-gray-50">
          Registrar Acompanhantes
        </h1>
      </div>
      <div className="mx-40 w-[15%]">
        <Button title="Voltar" onClick={() => navigate(-1)} />
      </div>
      <div className="items-left mx-40 flex flex-col rounded-lg border bg-white px-9 py-9 shadow-md">
        <form onSubmit={handleFormSubmit}>
          {renderForm()}
          <button
            type="submit"
            className="mt-4 w-full rounded bg-blue-500 px-4 py-3 text-white"
          >
            Enviar
          </button>
        </form>
      </div>
      <Footer />
    </div>
  )
}
