import clsx from 'clsx'
import { format } from 'date-fns'
import {
  ArrowDown,
  ArrowUp,
  Barricade,
  Binoculars,
  Bus,
  Car,
  MagnifyingGlass,
  Plus,
  Taxi,
  XCircle,
} from 'phosphor-react'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Balancer } from 'react-wrap-balancer'
import colors from 'tailwindcss/colors'

import { api } from '../../lib/api'

import { PackageProps } from '../../@types/Package'

import { Button } from '../../components/Button'
import { ButtonOptions } from '../../components/ButtonOptions'
import { Header } from '../../components/Header'
import { Loading } from '../../components/Loading'
import { NavBar } from '../../components/NavBar'
import { Input } from '../../components/form/Input'
import { Select } from '../../components/form/Select'

export function Packages() {
  const [pkgs, setPkgs] = useState<PackageProps[]>([])
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
        setPkgs(response.data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log('Error getting accommodations.', error)
      })
  }, [])

  useEffect(() => {
    const result = pkgs.reduce((cities: string[], items) => {
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
  }, [pkgs])

  const filteredPackages = pkgs.filter((item) => {
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

  // async function handleToggleIsActive(pkgId: string) {
  //   console.log(pkgId)
  //   const updatedPackages = pkgs.map(async (pkg) => {
  //     if (pkg.id === pkgId) {
  //       console.log(pkg.id)
  //       console.log(pkgId)
  //       const newStatus = pkg.isActive === 'active' ? 'inactive' : 'active'

  //       try {
  //         await api.put(`/packages/${pkg.id}`, {
  //           ...pkg,
  //           isActive: newStatus,
  //           name: pkg.name,
  //           description: pkg.description,
  //           imagePath: pkg.imagePath,
  //           departureDate:
  //             pkg.departureDate instanceof Date
  //               ? pkg.departureDate.toISOString()
  //               : pkg.departureDate,
  //           backDate:
  //             pkg.backDate instanceof Date
  //               ? pkg.backDate.toISOString()
  //               : pkg.backDate,
  //           transferParticular: pkg.transferParticular,
  //           transferExclusive: pkg.transferExclusive,
  //           transferShared: pkg.transferShared,
  //           itineraries: pkg.itineraries.map((itinerary) => ({
  //             ...itinerary,
  //             id: itinerary.itinerary.id,
  //             isActive: itinerary.itinerary.isActive,
  //             name: itinerary.itinerary.name,
  //             description: itinerary.itinerary.description,
  //             numberOfDays: Number(itinerary.itinerary.numberOfDays),
  //             valuePerPerson: Number(itinerary.itinerary.valuePerPerson),
  //             content: itinerary.itinerary.content,
  //             classification: itinerary.itinerary.classification,
  //             categoryId: itinerary.itinerary.category.id,
  //             accommodationId: itinerary.itinerary.accommodation.id,
  //           })),
  //         })
  //         console.log('Package updated successfully.')
  //       } catch (error) {
  //         toast.error('Erro ao atualizar os dados', {
  //           position: 'top-right',
  //           style: {
  //             backgroundColor: colors.red[500],
  //             color: colors.white,
  //             fontSize: 16,
  //             fontWeight: 500,
  //             padding: 16,
  //           },
  //           icon: <XCircle size={40} weight="fill" className="text-gray-50" />,
  //         })
  //         console.log('Error updating package:', error)
  //         return pkg
  //       }
  //       return {
  //         ...pkg,
  //         isActive: newStatus as 'active' | 'inactive',
  //       } as PackageProps
  //     }
  //     return pkg
  //   })

  //   const updatedPackagesData = await Promise.all(updatedPackages)
  //   setPkgs(updatedPackagesData)
  // }

  async function handleToggleIsActive(pkgId: string) {
    const updatedPackages = pkgs.map(async (pkg) => {
      if (pkg.id === pkgId) {
        const newStatus = pkg.isActive === 'active' ? 'inactive' : 'active'

        try {
          const updatedPackage = {
            isActive: newStatus,
            name: pkg.name,
            description: pkg.description,
            imagePath: pkg.imagePath,
            departureDate:
              pkg.departureDate instanceof Date
                ? pkg.departureDate.toISOString()
                : pkg.departureDate,
            backDate:
              pkg.backDate instanceof Date
                ? pkg.backDate.toISOString()
                : pkg.backDate,
            transferParticular: pkg.transferParticular,
            transferExclusive: pkg.transferExclusive,
            transferShared: pkg.transferShared,
            itineraries: pkg.itineraries.map((itinerary) => ({
              ...itinerary,
              itineraryId: itinerary.itinerary.id,
              isActive: itinerary.itinerary.isActive,
              name: itinerary.itinerary.name,
              description: itinerary.itinerary.description,
              numberOfDays: Number(itinerary.itinerary.numberOfDays),
              valuePerPerson: Number(itinerary.itinerary.valuePerPerson),
              content: itinerary.itinerary.content,
              classification: itinerary.itinerary.classification,
              categoryId: itinerary.itinerary.category.id,
              accommodationId: itinerary.itinerary.accommodation.id,
            })),
          }
          console.log(updatedPackage)

          await api.put(`/packages/${pkg.id}`, updatedPackage)
          console.log('Package updated successfully.')
        } catch (error) {
          console.log('Error updating package:', error)
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
          return pkg
        }

        return {
          ...pkg,
          isActive: newStatus as 'active' | 'inactive',
        } as PackageProps
      }

      return pkg
    })

    const updatedPackagesData = await Promise.all(updatedPackages)
    console.log('Updated packages:', updatedPackagesData)
    setPkgs(updatedPackagesData)
  }

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
                {pkgs.length === 0 ? (
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
                      <div className="mx-28 max-h-full overflow-auto">
                        <table className="w-full min-w-[620px] table-auto border-collapse">
                          <thead className="sticky top-0 bg-gray-200">
                            <tr className="bg-gray-50">
                              <th className="p-4 text-left text-sm leading-relaxed text-gray-600">
                                Nome
                              </th>
                              <th className="p-4 text-left text-sm leading-relaxed text-gray-600">
                                Cidades
                              </th>
                              <th className="p-4 text-left text-sm leading-relaxed text-gray-600">
                                Datas
                              </th>
                              <th className="p-4 text-left text-sm leading-relaxed text-gray-600">
                                Qtd. de dias
                              </th>
                              <th className="p-4 text-left text-sm leading-relaxed text-gray-600">
                                Transfer
                              </th>
                              <th className="p-4 text-left text-sm leading-relaxed text-gray-600">
                                Status
                              </th>
                              <th className="p-4 text-left text-sm leading-relaxed text-gray-600"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredPackages.map((pkg) => (
                              <tr
                                key={pkg?.id}
                                className="bg-white hover:bg-gray-100"
                              >
                                <td className="border-b-[1px] border-l-[1px] border-t-[1px] border-solid border-gray-100  p-4 leading-relaxed text-gray-600">
                                  {pkg.name}
                                </td>
                                <td className="border-b-[1px] border-t-[1px] border-solid border-gray-100  p-4 leading-relaxed">
                                  <div className="flex gap-2">
                                    {Array.from(
                                      new Set(
                                        pkg.itineraries.map(
                                          (item) =>
                                            item.itinerary.accommodation.city,
                                        ),
                                      ),
                                    )
                                      .filter(
                                        (city, index, array) =>
                                          array.indexOf(city) === index,
                                      )
                                      .map((city, i) => (
                                        <div
                                          key={`${city}-${i}`}
                                          className="line-clamp-1 w-[75px] rounded-sm border-[1px] border-gray-200  p-1 text-center text-sm text-gray-600"
                                        >
                                          {city}
                                        </div>
                                      ))}
                                  </div>
                                </td>
                                <td className="border-b-[1px] border-t-[1px] border-solid border-gray-100  p-4 leading-relaxed text-gray-600">
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <ArrowUp
                                        size={12}
                                        className="text-green-500"
                                      />
                                      <span className="text-sm">
                                        {format(
                                          new Date(pkg.departureDate),
                                          'dd/MM/yyyy',
                                        )}
                                      </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                      <ArrowDown
                                        size={12}
                                        className="text-red-500"
                                      />
                                      <span className="text-sm">
                                        {format(
                                          new Date(pkg.backDate),
                                          'dd/MM/yyyy',
                                        )}
                                      </span>
                                    </div>
                                  </div>
                                </td>
                                <td className="border-b-[1px] border-t-[1px] border-solid border-gray-100  p-4 leading-relaxed text-gray-600">
                                  {pkg.itineraries
                                    .map((item) => item.itinerary.numberOfDays)
                                    .reduce((acc, number) => acc + number, 0)}
                                </td>
                                <td className="border-b-[1px] border-t-[1px] border-solid border-gray-100  p-4 leading-relaxed text-gray-600">
                                  <div className="flex w-full justify-between">
                                    {!!pkg.transferParticular && (
                                      <Car size={16} />
                                    )}
                                    {!!pkg.transferExclusive && (
                                      <Taxi size={16} />
                                    )}
                                    {!!pkg.transferShared && <Bus size={16} />}
                                  </div>
                                </td>
                                <td className="w-28 border-b-[1px] border-t-[1px] border-solid border-gray-100  p-4">
                                  <span
                                    className={clsx(
                                      'flex items-center gap-2 leading-relaxed text-gray-600 before:h-2 before:w-2 before:rounded-full',
                                      {
                                        'before:bg-green-500':
                                          pkg.isActive === 'active',
                                        'before:bg-red-500':
                                          pkg.isActive === 'inactive',
                                      },
                                    )}
                                  >
                                    {pkg.isActive === 'active' && 'Ativo'}
                                    {pkg.isActive === 'inactive' && 'Inativo'}
                                  </span>
                                </td>
                                <td className="w-16 border-b-[1px] border-r-[1px] border-t-[1px] border-solid border-gray-100 p-4">
                                  <ButtonOptions
                                    onToggleIsActive={() =>
                                      handleToggleIsActive(pkg.id)
                                    }
                                    state={pkg.isActive}
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
