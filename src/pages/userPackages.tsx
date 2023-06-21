/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useCallback, SetStateAction } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { PackageProps } from '../@types/Package'
import { api } from '../lib/api'

import colors from 'tailwindcss/colors'
import { toast } from 'react-hot-toast'
import {
  XCircle,
  CaretRight,
  ArrowsDownUp,
  UsersFour,
  Handbag,
} from 'phosphor-react'

import { format } from 'date-fns'
import { HeroLocation } from '../components/HeroPackageDetails'
import { HeaderUser } from '../components/home/HeaderUser'
import { Title } from '../components/Title'
import { Input } from '../components/form/Input'
import { TransferSelect } from '../components/form/TransferSelect'
import { Footer } from '../components/Footer'

export function UserPackages() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  // Preços para transferência compartilhada e exclusiva
  const sharedPrice = 100
  const exclusivePrice = 700

  // Estados
  const [loading, setLoading] = useState(true)
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState<number>(0)
  const [transferType, setTransferType] = useState<string>('')
  const [valueItineraryAndAccommodations, setTotalPackageValue] =
    useState<number>(0)
  const [packageValue, setTotalValue] = useState<number>(
    valueItineraryAndAccommodations,
  )
  const [packageSelected, setPackageSelected] = useState<PackageProps | null>(
    null,
  )
  const [isTransferSelected, setIsTransferSelected] = useState<boolean>(false) // Estado para controlar se um transfer foi selecionado

  // Obtém a data de partida e volta com base nos dados do package
  const departureDate = packageSelected?.departureDate
  const backDate = packageSelected?.backDate

  // Função de retorno de chamada para calcular o número total de dias
  const totalNumberOfDays = useCallback(() => {
    return (
      packageSelected?.itineraries.reduce(
        (totalValue, { itinerary }) => totalValue + itinerary.numberOfDays,
        0,
      ) || 0
    )
  }, [packageSelected])

  // Buscar dados da API
  useEffect(() => {
    const startTime = Date.now()

    async function fetchData() {
      try {
        const response = await api.get(`/packages/${id}`)
        setPackageSelected(response.data)
        setLoading(false)

        const endTime = Date.now()
        const duration = endTime - startTime
        console.log(`Tempo de carregamento: ${duration}ms`)
      } catch (error) {
        console.error(error)
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  // Manipulador para alterar o tipo de transferência
  const handleTransferTypeChange = (value: SetStateAction<string>) => {
    setTransferType(value)
    setIsTransferSelected(true) // Define que um transfer foi selecionado
  }

  useEffect(() => {
    if (packageSelected) {
      // Aqui faz um calculo, [ valor do itinerario + (valorDiaria * numeroDeDias)
      // De onde sai os valores:  valor do itinerario(itinerary) (valorDiaria(Accommodations) * numeroDeDias(Itinerary))
      const calculatedTotalPackageValue = packageSelected.itineraries.reduce(
        (totalValue, itinerary) => {
          const itineraryPerPerson = parseFloat(
            String(itinerary.itinerary.valuePerPerson),
          )
          const { accommodation, numberOfDays } = itinerary.itinerary
          const dailyValue = accommodation.dailyValue
          const itineraryValue = dailyValue * numberOfDays
          return totalValue + itineraryValue + itineraryPerPerson
        },
        0,
      )

      const formattedTotalPackageValue = calculatedTotalPackageValue.toFixed(2)
      const parsedTotalPackageValue = parseFloat(formattedTotalPackageValue)

      setTotalPackageValue(parsedTotalPackageValue)
    }
  }, [packageSelected])

  useEffect(() => {
    const calculateTotalValue = () => {
      // Depois que faz o calculo de itinerary e accommodation é armazenado a variavel dela em (value)
      let value = valueItineraryAndAccommodations
      // Aqui faz o calculo dos transfer com base em qual o usuário escolher
      if (transferType === 'Comunitário') {
        value += sharedPrice
      } else if (transferType === 'Particular') {
        value += exclusivePrice
      }

      // Aqui é onde ocorre a multiplicação por número de adultos e foi adicionado uma condição fixa que o minimo de adultos é "1"
      value *= Math.max(adults, 1)

      // Define o valor total e atualiza o estado
      setTotalValue(value)
    }
    // Chama a função para calcular o valor total sempre que houver alterações nos estados de transferType, adults ou totalPackageAccommodationsValue
    calculateTotalValue()
  }, [transferType, adults, valueItineraryAndAccommodations])

  const handleButtonClick = () => {
    if (!isTransferSelected) {
      toast.error('Por favor selecione um transfer', {
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
      return
    }

    if (adults + children === 1) {
      navigate('/payment', {
        state: { packageValue, adults, transferType, companionsArray: [], id },
      })
    } else {
      navigate('/companions', {
        state: { packageValue, adults, children, transferType, id },
      })
    }
  }

  if (loading) {
    // Exibição de um indicador de carregamento enquanto os dados são buscados
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-200">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 animate-spin rounded-full border-t-4 border-blue-500"></div>
          <span className="mt-4 text-lg text-blue-500">
            Carregando pacote...
          </span>
        </div>
      </div>
    )
  }

  const formatDate = (date: string | undefined): string => {
    return date ? format(new Date(date), 'dd/MM/yyyy') : ''
  }

  const departureDateFormatted = formatDate(departureDate)
  const backDateFormatted = formatDate(backDate)

  return (
    <div className="flex flex-col gap-16 bg-gray-100 md:gap-24">
      <HeaderUser />

      {packageSelected ? (
        <div>
          <div>
            <HeroLocation
              imagePath={packageSelected.imagePath}
              locationName={packageSelected.name}
              description={packageSelected.description}
              showDescription={true}
              departureDate={departureDateFormatted}
              backDate={backDateFormatted}
              numberOfDays={totalNumberOfDays()}
              totalPackageValue={valueItineraryAndAccommodations}
            />
          </div>

          <div className="mx-5 mb-7 mt-20 md:mx-40">
            <Title title="Itinerário" />
          </div>

          {packageSelected.itineraries.map((itinerary, index) => {
            // Verifica se é o primeiro itinerário
            const isFirstItinerary = index === 0
            // Verifica se é o último itinerário
            const isLastItinerary =
              index === packageSelected.itineraries.length - 1

            const displayedNumberOfDays = isFirstItinerary
              ? 1 // Se for o primeiro itinerário, exibe apenas 1 dia
              : isLastItinerary
              ? totalNumberOfDays() // Se for o último itinerário, exibe o número total de dias da viagem
              : null

            const { accommodation } = itinerary.itinerary

            return (
              <div
                className="mx-5 mb-10 flex flex-col rounded-lg bg-white p-8 shadow-md md:mx-40"
                key={itinerary.itinerary.id}
              >
                <div className="flex flex-row items-center justify-center gap-4 md:gap-14">
                  <div className="flex flex-col items-center justify-center">
                    <h2 className="w-max rounded-lg bg-blue-500 px-5 py-3 text-xl font-semibold text-white">
                      {displayedNumberOfDays + '° dia'}
                    </h2>
                  </div>

                  <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-bold text-gray-800">
                      {itinerary.itinerary.accommodation.name}
                    </h2>
                    <h3 className="text-justify text-base font-normal leading-6">
                      {itinerary.itinerary.accommodation.description}
                    </h3>

                    <div className="flex flex-row gap-2">
                      {accommodation.breakfast && (
                        <div className="flex items-center rounded-md bg-green-500 px-1 py-1 text-xs font-light text-gray-200">
                          Café da manhã
                        </div>
                      )}

                      {accommodation.lunch && (
                        <div className="flex items-center rounded-md bg-green-500 px-1 py-1 text-xs font-light text-gray-200">
                          Almoço
                        </div>
                      )}

                      {accommodation.dinner && (
                        <div className="flex items-center rounded-md bg-green-500 px-1 py-1 text-xs font-light text-gray-200">
                          Jantar
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex h-[200px] w-full">
                    <img
                      className="h-full w-full overflow-hidden rounded-lg object-cover"
                      src={itinerary.itinerary.accommodation.imagePath}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            )
          })}

          <div className="mx-5 mb-7 mt-20 md:mx-40">
            <Title title="Conteúdo do pacote" />
          </div>

          {packageSelected.itineraries.map((itinerary) => {
            return (
              <div
                className="mx-5 mb-10 flex flex-col rounded-lg bg-white p-8 shadow-md md:mx-40"
                key={itinerary.itinerary.id}
              >
                <div className="whitespace-pre-line break-all font-sans text-base font-normal">
                  {itinerary.itinerary.content.map((content, index) => (
                    <div className="flex items-center" key={index}>
                      <CaretRight className="mr-2" />
                      <span>{content}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}

          <div className="mx-5 mb-7 mt-20 md:mx-40">
            <Title title="Classificação" />
          </div>

          {packageSelected.itineraries.map((itinerary) => {
            return (
              <div
                className="mx-5 mb-10 flex flex-col rounded-lg bg-white p-8 shadow-md md:mx-40"
                key={itinerary.itinerary.id}
              >
                <div className="whitespace-pre-line break-all font-sans text-base font-normal">
                  {itinerary.itinerary.classification.map((content, index) => (
                    <div className="flex items-center" key={index}>
                      <CaretRight className="mr-2" />
                      <span>{content}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}

          <div className="mx-5 mb-7 mt-20 md:mx-40">
            <Title title="Transfer" />
          </div>

          <div className="mx-5 flex flex-row items-center justify-evenly rounded-lg bg-white p-8 shadow-md md:mx-40">
            {packageSelected.transferShared && (
              <div className="flex flex-col gap-2">
                <div>
                  <img
                    className="max-w-xs object-cover"
                    src="/src/assets/userpackage/van.svg"
                    alt=""
                  />
                </div>
                <div className="font-title text-2xl font-bold text-gray-800">
                  Comunitário
                </div>
                <div className="flex flex-row items-center gap-2 text-gray-600">
                  <UsersFour size={24} />
                  <div className="font-title text-base text-gray-700">
                    20 lugares
                  </div>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <h2 className="font-sans text-3xl font-bold text-gray-700">
                    <span className="text-base font-normal">R$ </span>
                    {sharedPrice},00
                  </h2>
                  <div className="font-sans font-normal text-gray-700">
                    / pessoa
                  </div>
                </div>
              </div>
            )}

            {packageSelected.transferShared &&
              packageSelected.transferParticular && (
                <div className="flex flex-row items-center gap-4">
                  <div>
                    <hr className="w-24 border-gray-400" />
                  </div>
                  <div className="text-gray-600">
                    <ArrowsDownUp size={24} />
                  </div>
                  <div>
                    <hr className="w-24 border-gray-400" />
                  </div>
                </div>
              )}

            {packageSelected.transferExclusive && (
              <div className="flex flex-col gap-2">
                <div>
                  <img
                    className="max-w-xs object-cover"
                    src="/src/assets/userpackage/car.svg"
                    alt=""
                  />
                </div>
                <div className="font-title text-2xl font-bold text-gray-800">
                  Particular
                </div>
                <div className="flex flex-row items-center gap-2 text-gray-600">
                  <UsersFour size={24} />
                  <div className="font-title text-base text-gray-700">
                    5 lugares
                  </div>
                </div>
                <div>
                  <h2 className="font-sans text-3xl font-bold text-gray-700">
                    <span className="text-base font-normal">R$ </span>
                    {exclusivePrice},00
                  </h2>
                </div>
              </div>
            )}
          </div>

          <div className="mx-5 mt-10 flex flex-row items-center justify-between gap-4 rounded-lg bg-white p-8 shadow-md md:mx-40">
            <div className="flex flex-col gap-8 border-r-2 border-gray-400 px-6">
              <div className="z-10">
                <TransferSelect
                  placeholder="Selecione o transfer"
                  onChange={handleTransferTypeChange}
                  transferShared={packageSelected.transferShared}
                  transferExclusive={packageSelected.transferExclusive}
                />
              </div>
              <div className="flex flex-row">
                <fieldset className="flex items-center gap-5">
                  <Input
                    inputType="adults"
                    placeholder="Quantidade de adultos"
                    aria-label="Quantidade de adultos"
                    value={adults}
                    onChange={(e) => {
                      const value = Number(e.target.value)
                      setAdults(value > 0 ? value : 1) // Garante que o valor mínimo seja 1
                    }}
                  />
                  <Input
                    inputType="children"
                    placeholder="Quantidade de crianças"
                    aria-label="Quantidade de crianças"
                    value={children}
                    onChange={(e) => {
                      const value = Number(e.target.value)
                      setChildren(value)
                    }}
                  />
                </fieldset>
              </div>
              <div className="flex flex-col gap-2">
                <div>
                  <h2 className="text-gray-700">
                    Crianças até 3 anos:
                    <span className="font-bold text-blue-500"> GRÁTIS</span>
                  </h2>
                </div>
                <div>
                  <h2 className="text-gray-700">
                    Crianças entre 4 e 10 anos:
                    <span className="font-bold text-blue-500"> 10% OFF</span>
                  </h2>
                </div>
              </div>
            </div>

            <div className="flex w-max flex-col gap-4">
              <div>
                <h2 className="font-sans text-3xl font-bold text-gray-700">
                  <span className="text-base font-normal">R$ </span>
                  {packageValue}
                </h2>
              </div>
              <div>
                <h2 className="font-title text-base text-gray-500">
                  Taxas e impostos não inclusos
                </h2>
              </div>
              <div>
                <button
                  onClick={handleButtonClick}
                  type="submit"
                  className="flex h-14 w-max flex-row items-center gap-2 rounded-lg bg-blue-500 px-10 font-title font-medium text-white transition-colors hover:bg-blue-600"
                >
                  <Handbag size={24} />
                  Reservar pacote
                </button>
              </div>
            </div>
          </div>
          <div className="mt-11">
            <Footer />
          </div>
        </div>
      ) : (
        <div className="flex h-screen items-center justify-center bg-gray-200">
          <div className="text-center">
            <div>
              <h2 className="mb-4 text-2xl font-bold text-gray-800">
                Pacote não encontrado...
              </h2>
            </div>
            <div>
              <a
                href="/"
                className="rounded bg-blue-500 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-600"
              >
                Voltar à página inicial
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
