import { Barricade, Binoculars, MagnifyingGlass, Plus } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { api } from '../../lib/api'

import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { Loading } from '../../components/Loading'
import { NavBar } from '../../components/NavBar'
import { CardAccommodation } from '../../components/accommodations/Card'
import { Input } from '../../components/form/Input'
import { Select } from '../../components/form/Select'

interface Accommodation {
  id: string
  isActive: 'active' | 'inactive'
  imagePath: string
  name: string
  city: string
  description: string
}

export function Accommodations() {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([])
  const [cities, setCities] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedState, setSelectedState] = useState('')
  const [searchText, setSearchText] = useState('')

  const navigate = useNavigate()

  const status = ['Ativo', 'Inativo']

  useEffect(() => {
    api
      .get('/accommodations')
      .then((response) => {
        setAccommodations(response.data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log('Error getting accommodations.', error)
      })
  }, [])

  useEffect(() => {
    api.get('/accommodations').then((response) => {
      const accommodations = response.data
      setCities(
        Array.from(
          new Set(
            accommodations.map(
              (accommodation: Accommodation) => accommodation.city,
            ),
          ),
        ),
      )
      setIsLoading(false)
    })
  }, [])

  const filteredAccommodations = accommodations.filter((accommodation) => {
    const isSearchMatch = accommodation.name
      .toLowerCase()
      .includes(searchText.toLowerCase())

    const isCityMatch =
      selectedCity === '' || accommodation.city === selectedCity

    const isStateMatch =
      selectedState === '' || accommodation.isActive === selectedState

    return isSearchMatch && isCityMatch && isStateMatch
  })

  const hasResults = filteredAccommodations.length > 0

  return (
    <div className="flex h-screen w-full">
      <NavBar />
      <div className="w-full">
        <Header title="Hospedagens" />
        <div className="flex h-[calc(100vh-5rem)] w-full flex-col">
          <div className="z-50 mx-48 my-12 grid grid-cols-4 gap-6">
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
              onClick={() => navigate('/accommodations/new')}
            />
          </div>

          <>
            {isLoading ? (
              <div className="mx-48 flex max-h-full flex-1 flex-col items-center justify-center">
                <Loading />
              </div>
            ) : (
              <>
                {accommodations.length === 0 ? (
                  <div className="mx-48 flex max-h-full flex-1 flex-col items-center justify-center gap-8">
                    <Barricade size={40} className="text-gray-800" />
                    <span className="max-w-xl text-center leading-relaxed text-gray-600">
                      Ops! Parece que ainda não temos hospedagens cadastradas.
                      Que tal começar a{' '}
                      <a
                        className="cursor-pointer font-medium text-blue-500 transition-colors hover:text-blue-600"
                        onClick={() => navigate('/accommodations/new')}
                      >
                        cadastrar hospedagens
                      </a>{' '}
                      para oferecer aos seus clientes?
                    </span>
                  </div>
                ) : (
                  <>
                    {hasResults ? (
                      <div className="mx-48 grid max-h-full grid-cols-4 gap-6">
                        {filteredAccommodations.map(
                          (accommodation: Accommodation) => (
                            <CardAccommodation
                              key={accommodation.id}
                              isActive={accommodation.isActive}
                              imagePath={accommodation.imagePath}
                              name={accommodation.name}
                              city={accommodation.city}
                              description={accommodation.description}
                            />
                          ),
                        )}
                      </div>
                    ) : (
                      <div className="mx-48 flex max-h-full flex-1 flex-col items-center justify-center gap-8">
                        <Binoculars size={40} className="text-gray-800" />
                        <span className="max-w-xl text-center leading-relaxed text-gray-600">
                          Infelizmente, não encontramos resultados
                          correspondentes à sua pesquisa.
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
