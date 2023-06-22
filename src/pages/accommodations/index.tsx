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

import { AccommodationProps } from '../../@types/Accommodation'

import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { Loading } from '../../components/Loading'
import { NavBar } from '../../components/NavBar'
import { CardAccommodation } from '../../components/accommodations/Card'
import { Input } from '../../components/form/Input'
import { Select } from '../../components/form/Select'

export function Accommodations() {
  const [accommodations, setAccommodations] = useState<AccommodationProps[]>([])
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
    const result = Array.from(
      new Set(accommodations.map((accommodation) => accommodation.city)),
    )
    setIsLoading(false)

    setCities(result)
  }, [accommodations])

  const filteredAccommodations = accommodations.filter((accommodation) => {
    const isSearchMatch = accommodation.name
      .toLowerCase()
      .includes(searchText.toLowerCase())

    const isCityMatch =
      ((selectedCity === 'all' || selectedCity === '') && accommodation) ||
      selectedCity === '' ||
      accommodation.city === selectedCity

    const isStateMatch =
      ((selectedState === 'all' || selectedState === '') && accommodation) ||
      (selectedState === 'Ativo' && accommodation.isActive === 'active') ||
      (selectedState === 'Inativo' && accommodation.isActive === 'inactive')

    return isSearchMatch && isCityMatch && isStateMatch
  })

  const hasResults = filteredAccommodations.length > 0

  async function handleToggleIsActive(accommodationId: string) {
    const updatedAccommodations = accommodations.map(async (accommodation) => {
      if (accommodation.id === accommodationId) {
        const newStatus =
          accommodation.isActive === 'active' ? 'inactive' : 'active'

        try {
          await api.put(`/accommodations/${accommodation.id}`, {
            ...accommodation,
            dailyValue: Number(accommodation.dailyValue),
            isActive: newStatus,
          })
          console.log('Accommodation updated successfully.')
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
          console.log('Error updating accommodation:', error)
          return accommodation
        }
        return {
          ...accommodation,
          isActive: newStatus as 'active' | 'inactive',
        } as AccommodationProps
      }
      return accommodation
    })

    const updatedAccommodationsData = await Promise.all(updatedAccommodations)

    setAccommodations(updatedAccommodationsData)
  }

  return (
    <div className="flex h-screen w-full">
      <NavBar />
      <div className="w-full">
        <Header title="Hospedagens" />
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
              onClick={() => navigate('/accommodations/new')}
            />
          </div>

          <>
            {isLoading ? (
              <div className="mx-28 flex max-h-full flex-1 flex-col items-center justify-center">
                <Loading />
              </div>
            ) : (
              <>
                {accommodations.length === 0 ? (
                  <div className="mx-28 flex max-h-full flex-1 flex-col items-center justify-center gap-8">
                    <Barricade size={40} className="text-gray-800" />
                    <span className="max-w-xl text-center leading-relaxed text-gray-600">
                      <Balancer>
                        Ops! Parece que ainda não temos hospedagens cadastradas.
                        Que tal começar a{' '}
                        <a
                          className="cursor-pointer font-medium text-blue-500 transition-colors hover:text-blue-600"
                          onClick={() => navigate('/accommodations/new')}
                        >
                          cadastrar hospedagens
                        </a>{' '}
                        para oferecer aos seus clientes?
                      </Balancer>
                    </span>
                  </div>
                ) : (
                  <>
                    {hasResults ? (
                      <div className="mx-28 grid max-h-full grid-cols-4 gap-6">
                        {filteredAccommodations.map(
                          (accommodation: AccommodationProps) => (
                            <CardAccommodation
                              key={accommodation.id}
                              accommodation={accommodation}
                              onToggleIsActive={() =>
                                handleToggleIsActive(accommodation.id)
                              }
                            />
                          ),
                        )}
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
