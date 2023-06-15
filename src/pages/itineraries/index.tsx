import clsx from 'clsx'
import {
  Barricade,
  Binoculars,
  MagnifyingGlass,
  Plus,
  XCircle,
} from 'phosphor-react'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Balancer } from 'react-wrap-balancer'
import colors from 'tailwindcss/colors'

import { api } from '../../lib/api'

import { ItineraryProps } from '../../@types/Itinerary'

import { Button } from '../../components/Button'
import { ButtonOptions } from '../../components/ButtonOptions'
import { Header } from '../../components/Header'
import { Loading } from '../../components/Loading'
import { NavBar } from '../../components/NavBar'
import { Input } from '../../components/form/Input'
import { Select } from '../../components/form/Select'
import { formatCurrency } from '../../utils/formatCurrency'

export function Itineraries() {
  const [itineraries, setItineraries] = useState<ItineraryProps[]>([])
  // const [cities, setCities] = useState<string[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  // const [selectedCity, setSelectedCity] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedState, setSelectedState] = useState('')
  const [searchText, setSearchText] = useState('')

  const navigate = useNavigate()

  const status = ['Ativo', 'Inativo']

  useEffect(() => {
    api
      .get('/itineraries')
      .then((response) => {
        setItineraries(response.data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log('Error getting accommodations.', error)
      })
  }, [])

  useEffect(() => {
    const result = Array.from(
      new Set(itineraries.map((itinerary) => itinerary.category.name)),
    )
    setIsLoading(false)

    setCategories(result)
  }, [itineraries])

  const filteredItineraries = itineraries.filter((item) => {
    const isSearchMatch = item.name
      .toLowerCase()
      .includes(searchText.toLowerCase())

    const isCategoryMatch =
      ((selectedCategory === 'all' || selectedCategory === '') && item) ||
      selectedCategory === '' ||
      item.category.name === selectedCategory

    const isStateMatch =
      ((selectedState === 'all' || selectedState === '') && item) ||
      (selectedState === 'Ativo' && item.isActive === 'active') ||
      (selectedState === 'Inativo' && item.isActive === 'inactive')

    return isSearchMatch && isCategoryMatch && isStateMatch
  })

  const hasResults = filteredItineraries.length > 0

  async function handleToggleIsActive(itineraryId: string) {
    const updatedItineraries = itineraries.map(async (itinerary) => {
      if (itinerary.id === itineraryId) {
        const newStatus =
          itinerary.isActive === 'active' ? 'inactive' : 'active'
        try {
          await api.put(`/itineraries/${itinerary.id}`, {
            ...itinerary,
            isActive: newStatus,
            numberOfDays: Number(itinerary.numberOfDays),
            valuePerPerson: Number(itinerary.valuePerPerson),
          })
          console.log('Itinerary updated successfully.')
        } catch (error) {
          toast.error('Erro ao atualizar os dados', {
            position: 'top-right',
            style: {
              backgroundColor: colors.red[500],
              color: colors.white,
              fontSize: 16,
              fontWeight: 500,
              padding: 16,
            },
            icon: <XCircle size={40} weight="fill" className="text-gray-50" />,
          })
          console.log('Error updating itinerary:', error)
          return itinerary
        }
        return {
          ...itinerary,
          isActive: newStatus as 'active' | 'inactive',
        } as ItineraryProps
      }
      return itinerary
    })
    const updatedItinerariesData = await Promise.all(updatedItineraries)
    setItineraries(updatedItinerariesData)
  }

  return (
    <div className="flex h-screen w-full">
      <NavBar />
      <div className="w-full">
        <Header title="Ititerários" />
        <div className="flex h-[calc(100vh-5rem)] w-full flex-col">
          <div className="z-50 mx-28 my-12 grid grid-cols-4 gap-6">
            <Input
              placeholder="Pesquisar"
              icon={<MagnifyingGlass size={24} />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />

            <Select
              placeholder="Categoria"
              data={categories}
              value={selectedCategory}
              onChange={(value: string) => setSelectedCategory(value)}
            />

            <Select
              placeholder="Status"
              data={status}
              value={selectedState}
              onChange={(value: string) => setSelectedState(value)}
            />

            <Button
              icon={<Plus size={24} />}
              title="Adicionar"
              onClick={() => navigate('/itineraries/new')}
            />
          </div>

          <>
            {isLoading ? (
              <div className="mx-28 flex max-h-full flex-1 flex-col items-center justify-center">
                <Loading />
              </div>
            ) : (
              <>
                {itineraries.length === 0 ? (
                  <div className="mx-28 flex max-h-full flex-1 flex-col items-center justify-center gap-8">
                    <Barricade size={40} className="text-gray-800" />
                    <span className="max-w-xl text-center leading-relaxed text-gray-600">
                      <Balancer>
                        Ops! Parece que ainda não temos itinerários cadastrados.
                        Que tal começar a{' '}
                        <a
                          className="cursor-pointer font-medium text-blue-500 transition-colors hover:text-blue-600"
                          onClick={() => navigate('/packages/new')}
                        >
                          cadastrar itinerários
                        </a>{' '}
                        para oferecer aos seus clientes?
                      </Balancer>
                    </span>
                  </div>
                ) : (
                  <>
                    {hasResults ? (
                      <div className="mx-28 max-h-full overflow-auto">
                        <table className="w-full min-w-[620px] border-collapse">
                          <thead className="border-[1px] border-gray-200">
                            <tr>
                              <th className="bg-white p-4 text-left text-sm leading-relaxed text-gray-600">
                                Nome
                              </th>
                              <th className="bg-white p-4 text-left text-sm leading-relaxed text-gray-600">
                                Categoria
                              </th>
                              <th className="bg-white p-4 text-left text-sm leading-relaxed text-gray-600">
                                Valor por pessoa
                              </th>
                              <th className="bg-white p-4 text-left text-sm leading-relaxed text-gray-600">
                                Hospedagem
                              </th>
                              <th className="bg-white p-4 text-left text-sm leading-relaxed text-gray-600">
                                Qtd. de dias
                              </th>
                              <th className="bg-white p-4 text-left text-sm leading-relaxed text-gray-600">
                                Status
                              </th>
                              <th className="bg-white p-4 text-left text-sm leading-relaxed text-gray-600"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredItineraries.map((itinerary) => (
                              <tr key={itinerary.id}>
                                <td className="w-56 border-b-[1px] border-l-[1px] border-t-[1px] border-solid border-gray-100 bg-white p-4 leading-relaxed text-gray-600">
                                  {itinerary.name}
                                </td>
                                <td className="border-b-[1px] border-t-[1px] border-solid border-gray-100 bg-white p-4 leading-relaxed text-gray-600">
                                  {itinerary.category.name}
                                </td>
                                <td className="border-b-[1px] border-t-[1px] border-solid border-gray-100 bg-white p-4 leading-relaxed text-gray-600">
                                  {formatCurrency(itinerary.valuePerPerson)}
                                </td>
                                <td className="border-b-[1px] border-t-[1px] border-solid border-gray-100 bg-white p-4 leading-relaxed text-gray-600">
                                  {itinerary.accommodation.name}
                                </td>
                                <td className="border-b-[1px] border-t-[1px] border-solid border-gray-100 bg-white p-4 leading-relaxed text-gray-600">
                                  {itinerary.numberOfDays}
                                </td>
                                <td className="w-28 border-b-[1px] border-t-[1px] border-solid border-gray-100 bg-white p-4">
                                  <span
                                    className={clsx(
                                      'flex items-center gap-2 leading-relaxed text-gray-600 before:h-2 before:w-2 before:rounded-full',
                                      {
                                        'before:bg-green-500':
                                          itinerary.isActive === 'active',
                                        'before:bg-red-500':
                                          itinerary.isActive === 'inactive',
                                      },
                                    )}
                                  >
                                    {itinerary.isActive === 'active' && 'Ativo'}
                                    {itinerary.isActive === 'inactive' &&
                                      'Inativo'}
                                  </span>
                                </td>
                                <td className="w-16 border-b-[1px] border-r-[1px] border-t-[1px] border-solid border-gray-100 p-4">
                                  <ButtonOptions
                                    onToggleIsActive={() =>
                                      handleToggleIsActive(itinerary.id)
                                    }
                                    state={itinerary.isActive}
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="mx-28 flex max-h-full flex-1 flex-col items-center justify-center gap-8">
                        <Binoculars size={40} className="text-gray-800" />
                        <span className="max-w-xl text-center leading-relaxed text-gray-600">
                          <Balancer>
                            Infelizmente, não encontramos resultados
                            correspondentes à sua pesquisa.
                          </Balancer>
                        </span>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </>
        </div>
      </div>
    </div>
  )
}
