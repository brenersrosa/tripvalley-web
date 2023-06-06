import clsx from 'clsx'
import { Barricade, Binoculars, MagnifyingGlass, Plus } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Balancer } from 'react-wrap-balancer'

import { api } from '../../lib/api'

import { Button } from '../../components/Button'
import { ButtonOptions } from '../../components/ButtonOptions'
import { Header } from '../../components/Header'
import { Loading } from '../../components/Loading'
import { NavBar } from '../../components/NavBar'
import { Input } from '../../components/form/Input'
import { Select } from '../../components/form/Select'

interface Itinerary {
  id: string
  itinerary: {
    id: string
    numberOfDays: number
    category: {
      id: string
      name: string
    }
    accommodation: {
      id: string
      city: string
    }
  }
}

interface PackageProps {
  id: string
  name: string
  itineraries: Itinerary[]
  numberOfDays: number
  isActive: 'active' | 'inactive'
}

export function Packages() {
  const [packagesList, setPackagesList] = useState<PackageProps[]>([])
  const [cities, setCities] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedState, setSelectedState] = useState('')
  const [searchText, setSearchText] = useState('')

  const navigate = useNavigate()

  const status = ['Ativo', 'Inativo']

  useEffect(() => {
    api
      .get('/packages')
      .then((response) => {
        setPackagesList(response.data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log('Error getting accommodations.', error)
      })
  }, [])

  useEffect(() => {
    const result = packagesList.reduce((cities: string[], items) => {
      items.itineraries.forEach((item) => {
        const city = item.itinerary.accommodation.city
        if (!cities.includes(city)) {
          cities.push(city)
        }
      })
      setIsLoading(false)
      return cities
    }, [])

    setCities(result)
  }, [packagesList])

  const filteredPackages = packagesList.filter((item) => {
    const isSearchMatch = item.name
      .toLowerCase()
      .includes(searchText.toLowerCase())

    const isCityMatch =
      ((selectedCity === 'all' || selectedCity === '') && item) ||
      selectedCity === '' ||
      item.itineraries
        .map((itinerary) => itinerary.itinerary.accommodation.city)
        .map((city) => city)
        .includes(selectedCity)

    const isStateMatch =
      ((selectedState === 'all' || selectedState === '') && item) ||
      (selectedState === 'Ativo' && item.isActive === 'active') ||
      (selectedState === 'Inativo' && item.isActive === 'inactive')

    return isSearchMatch && isCityMatch && isStateMatch
  })

  const hasResults = filteredPackages.length > 0

  return (
    <div className="flex h-screen w-full">
      <NavBar />
      <div className="w-full">
        <Header title="Pacotes" />
        <div className="flex h-[calc(100vh-5rem)] w-full flex-col">
          <div className="z-50 mx-28 my-12 grid grid-cols-4 gap-6">
            <Input
              placeholder="Pesquisar"
              icon={<MagnifyingGlass size={24} />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />

            <Select
              placeholder="Cidade"
              data={cities}
              value={selectedCity}
              onChange={(value: string) => setSelectedCity(value)}
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
              onClick={() => navigate('/packages/new')}
            />
          </div>

          <>
            {isLoading ? (
              <div className="mx-28 flex max-h-full flex-1 flex-col items-center justify-center">
                <Loading />
              </div>
            ) : (
              <>
                {packagesList.length === 0 ? (
                  <div className="mx-28 flex max-h-full flex-1 flex-col items-center justify-center gap-8">
                    <Barricade size={40} className="text-gray-800" />
                    <span className="max-w-xl text-center leading-relaxed text-gray-600">
                      <Balancer>
                        Ops! Parece que ainda não temos pacotes cadastrados. Que
                        tal começar a{' '}
                        <a
                          className="cursor-pointer font-medium text-blue-500 transition-colors hover:text-blue-600"
                          onClick={() => navigate('/packages/new')}
                        >
                          cadastrar pacotes
                        </a>{' '}
                        para oferecer aos seus clientes?
                      </Balancer>
                    </span>
                  </div>
                ) : (
                  <>
                    {hasResults ? (
                      <div className="mx-28 max-h-full">
                        <table className="w-full min-w-[620px] border-collapse">
                          <thead className="border-[1px] border-gray-200">
                            <tr>
                              <th className="bg-white p-4 text-left text-sm leading-relaxed text-gray-600">
                                Nome
                              </th>
                              <th className="bg-white p-4 text-left text-sm leading-relaxed text-gray-600">
                                Cidades
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
                            {filteredPackages.map((item) => (
                              <tr key={item.id}>
                                <td className="line-clamp-1 border-b-[1px] border-l-[1px] border-t-[1px] border-solid border-gray-100 bg-white p-4 leading-relaxed text-gray-600">
                                  {item.name}
                                </td>
                                <td className="w-[512px] border-b-[1px] border-t-[1px] border-solid border-gray-100 bg-white p-4 leading-relaxed">
                                  <div className="flex gap-2">
                                    {item.itineraries.map((itinerary, i) => (
                                      <div
                                        key={`${itinerary}-${i}`}
                                        className="line-clamp-1 w-[75px] rounded-sm border-[1px] border-gray-200 bg-white p-1 text-center text-xs text-gray-600"
                                      >
                                        {itinerary.itinerary.accommodation.city}
                                      </div>
                                    ))}
                                  </div>
                                </td>
                                <td className="w-56 border-b-[1px] border-t-[1px] border-solid border-gray-100 bg-white p-4 leading-relaxed text-gray-600">
                                  {item.itineraries
                                    .map(
                                      (itinerary) =>
                                        itinerary.itinerary.numberOfDays,
                                    )
                                    .reduce((acc, number) => acc + number, 0)}
                                </td>
                                <td className="w-56 border-b-[1px] border-t-[1px] border-solid border-gray-100 bg-white p-4">
                                  <span
                                    className={clsx(
                                      'flex items-center gap-2 leading-relaxed text-gray-600 before:h-2 before:w-2 before:rounded-full',
                                      {
                                        'before:bg-green-500':
                                          item.isActive === 'active',
                                        'before:bg-red-500':
                                          item.isActive === 'inactive',
                                      },
                                    )}
                                  >
                                    {item.isActive === 'active' && 'Ativo'}
                                    {item.isActive === 'inactive' && 'Inativo'}
                                  </span>
                                </td>
                                <td className="w-16 border-b-[1px] border-r-[1px] border-t-[1px] border-solid border-gray-100 p-4">
                                  <ButtonOptions />
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
