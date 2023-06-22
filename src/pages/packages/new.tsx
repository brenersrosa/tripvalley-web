import {
  CheckCircle,
  FloppyDisk,
  Plus,
  TrashSimple,
  XCircle,
} from 'phosphor-react'
import { FormEvent, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import colors from 'tailwindcss/colors'
import { z } from 'zod'

import { api } from '../../lib/api'

import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { NavBar } from '../../components/NavBar'
import { Checkbox } from '../../components/form/Checkbox'
import { Input } from '../../components/form/Input'
import { MultilineInput } from '../../components/form/MultilineInput'
import { Select } from '../../components/form/Select'
import { Switch } from '../../components/form/Switch'
import { TitleForm } from '../../components/form/Title'

import { CategoryProps } from '../../@types/Category'
import { ItineraryProps } from '../../@types/Itinerary'

import { PackageInputProps, packageSchema } from '../../schemas/package.schema'

import citiesData from '../../utils/cities.json'

interface Errors {
  [key: string]: string
}

interface ItineraryItem {
  id: string
  uf: string
  city: string
  category: string
}

export function NewPackage() {
  const [isActive, setIsActive] = useState<'active' | 'inactive'>('active')
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [imagePath, setImagePath] = useState<string>('')
  const [departureDate, setDepartureDate] = useState<Date | string>('')
  const [transferParticular, setTransferParticular] = useState<boolean>(false)
  const [transferExclusive, setTransferExclusive] = useState<boolean>(false)
  const [transferShared, setTransferShared] = useState<boolean>(false)
  const [itineraries, setItineraries] = useState<ItineraryProps[]>([])
  const [categories, setCategories] = useState<CategoryProps[]>([])
  const [filteredItineraries, setFilteredItineraries] = useState<
    Array<ItineraryProps[]>
  >([])
  const [itineraryItems, setItineraryItems] = useState<ItineraryItem[]>([
    { id: '', uf: '', city: '', category: '' },
  ])

  const [errors, setErrors] = useState<Errors>({})

  const cities: { [key: string]: string[] } = citiesData

  const navigate = useNavigate()

  useEffect(() => {
    api
      .get('/categories')
      .then((response) => {
        setCategories(response.data)
      })
      .catch((error) => {
        console.log('Error getting categories.', error)
      })
  }, [])

  useEffect(() => {
    api
      .get('/itineraries')
      .then((response) => {
        setItineraries(response.data)
      })
      .catch((error) => {
        console.log('Error getting itineraries.', error)
      })
  }, [])

  function validateFormData(formData: PackageInputProps) {
    try {
      packageSchema.parse(formData)
      setErrors({})
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Errors = {}
        error.errors.forEach((err) => {
          fieldErrors[err.path[0]] = err.message
        })
        setErrors(fieldErrors)
      }
      return false
    }
  }

  function clearForm() {
    setIsActive('active')
    setName('')
    setDescription('')
    setItineraryItems([{ id: '', uf: '', city: '', category: '' }])
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    const selectedItineraryIds = itineraryItems.map((item) => item.id)

    const selectedItineraries = itineraries.filter((itinerary) =>
      selectedItineraryIds.includes(itinerary.id),
    )

    const sumOfNumberOfDays = selectedItineraries.reduce(
      (acc, itinerary) => acc + itinerary.numberOfDays,
      0,
    )

    const backDate = new Date(
      new Date(departureDate).getTime() +
        sumOfNumberOfDays * 24 * 60 * 60 * 1000,
    )

    const formData = {
      isActive,
      name,
      description,
      imagePath,
      departureDate:
        departureDate instanceof Date
          ? departureDate.toISOString()
          : departureDate,
      backDate: backDate instanceof Date ? backDate.toISOString() : backDate,
      transferParticular,
      transferExclusive,
      transferShared,
      itineraries: itineraryItems.map((item) => item.id),
    }

    const isFormDataValid = validateFormData(formData)

    if (!isFormDataValid) {
      toast.error('Erro ao validar os dados.', {
        position: 'top-right',
        style: {
          backgroundColor: colors.red[500],
          color: colors.white,
          fontSize: 16,
          fontWeight: 500,
          padding: 16,
        },
        icon: <XCircle size={54} weight="fill" className="text-gray-50" />,
      })
      console.log('Erro ao validar os dados.')
      return
    }

    try {
      const response = await api.post('/packages', JSON.stringify(formData), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      console.log('Pacote criado com sucesso:', response.data.result)
      toast.success('Pacote criado com sucesso!', {
        position: 'top-right',
        style: {
          backgroundColor: colors.green[500],
          color: colors.white,
          fontSize: 16,
          fontWeight: 500,
          padding: 16,
        },
        icon: <CheckCircle size={54} weight="fill" className="text-gray-50" />,
      })
      clearForm()
      navigate('/packages')
    } catch (error) {
      console.log(formData)
      console.log(error)
      toast.error('Erro ao criar novo pacote.', {
        position: 'top-right',
        style: {
          backgroundColor: colors.red[500],
          color: colors.white,
          fontSize: 16,
          fontWeight: 500,
          padding: 16,
        },
        icon: <XCircle size={54} weight="fill" className="text-gray-50" />,
      })
    }
  }

  function addNewItineraryItem() {
    setItineraryItems([
      ...itineraryItems,
      { id: '', uf: '', city: '', category: '' },
    ])
  }

  function deleteItineraryItem(position: number) {
    const updatedItineraryItems = itineraryItems.filter(
      (_, index) => index !== position,
    )
    setItineraryItems(updatedItineraryItems)
  }

  function handleUfChange(value: string, index: number) {
    const selectedUf = value

    if (selectedUf) {
      const updatedItineraryItems = [...itineraryItems]
      updatedItineraryItems[index] = {
        ...updatedItineraryItems[index],
        uf: selectedUf,
      }
      setItineraryItems(updatedItineraryItems)
    }
  }

  function handleCityChange(value: string, index: number) {
    const selectedCity = value

    if (selectedCity) {
      const updatedItineraryItems = [...itineraryItems]
      updatedItineraryItems[index] = {
        ...updatedItineraryItems[index],
        city: selectedCity,
      }
      setItineraryItems(updatedItineraryItems)
    }
  }

  function handleCategoryChange(value: string, index: number) {
    const selectedCategory = categories.find(
      (category) => category.name === value,
    )

    if (selectedCategory) {
      const updatedItineraryItems = [...itineraryItems]
      updatedItineraryItems[index] = {
        ...updatedItineraryItems[index],
        category: selectedCategory.id,
      }
      setItineraryItems(updatedItineraryItems)

      const filtered = itineraries.filter((itinerary) => {
        return (
          itinerary.accommodation.city === updatedItineraryItems[index].city &&
          (selectedCategory
            ? itinerary.category.id === selectedCategory.id
            : true)
        )
      })

      const updatedFilteredItineraries = [...filteredItineraries]
      updatedFilteredItineraries[index] = filtered
      setFilteredItineraries(updatedFilteredItineraries)
    }
  }

  function handleItineraryChange(value: string, index: number) {
    const selectedItinerary = itineraries.find(
      (itinerary) => itinerary.name === value,
    )

    if (selectedItinerary) {
      const updatedItineraryItems = [...itineraryItems]
      updatedItineraryItems[index] = {
        ...updatedItineraryItems[index],
        id: selectedItinerary.id,
      }
      setItineraryItems(updatedItineraryItems)
    }
  }

  console.log(filteredItineraries[0])

  return (
    <div className="flex h-screen w-full">
      <NavBar />
      <div className="w-full">
        <Header title="Adicionar pacote" />

        <form className="h-[calc(100vh-5rem)] w-full" onSubmit={handleSubmit}>
          <div className="mx-28 my-12 flex flex-col gap-12 rounded-2xl border-[1px] border-gray-200 bg-white px-16 py-12">
            <div className="flex flex-col gap-8">
              <div className="flex w-full justify-between">
                <TitleForm title="Dados básicos" />
                <Switch isActive={isActive} onIsActiveChange={setIsActive} />
              </div>

              <hr className="bg-gray-300" />

              <div className="flex w-full flex-col gap-6">
                <Input
                  title="Nome do itinerário"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoFocus
                />

                <MultilineInput
                  title="Descrição"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />

                <div className="grid grid-cols-2 gap-6">
                  <Input
                    title="URL da imagem"
                    value={imagePath}
                    onChange={(e) => setImagePath(e.target.value)}
                  />

                  <Input
                    title="Data de partida"
                    value={
                      departureDate instanceof Date
                        ? departureDate.toISOString().split('T')[0]
                        : ''
                    }
                    onChange={(e) => setDepartureDate(new Date(e.target.value))}
                    type="date"
                  />
                </div>

                <div className="flex w-full flex-col gap-4">
                  <span className="text-gray-600">Transfer</span>
                  <div className="grid grid-cols-4 gap-4">
                    <Checkbox
                      title="Particular"
                      checked={transferParticular}
                      onChange={() =>
                        setTransferParticular(!transferParticular)
                      }
                    />
                    <Checkbox
                      title="Exclusivo"
                      checked={transferExclusive}
                      onChange={() => setTransferExclusive(!transferExclusive)}
                    />
                    <Checkbox
                      title="Compartilhado"
                      checked={transferShared}
                      onChange={() => setTransferShared(!transferShared)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-8">
              <TitleForm title="Itinerários" />

              <hr className="bg-gray-300" />

              <div className="flex w-full flex-col gap-6">
                <div className="flex w-full flex-col gap-4">
                  <div className="flex flex-col gap-4 rounded-lg border-[1px] border-gray-300 p-4">
                    {itineraryItems.map((itineraryItem, index) => {
                      return (
                        <div
                          key={`${index}-${itineraryItem}`}
                          className="flex flex-col gap-6"
                        >
                          <div className="grid grid-cols-2 gap-6">
                            <Select
                              title="Estado"
                              data={Object.keys(cities).map((id) => ({
                                id,
                                name: id,
                              }))}
                              value={itineraryItems[index].uf || ''}
                              onChange={(value: string) =>
                                handleUfChange(value, index)
                              }
                            />

                            <Select
                              title="Cidade"
                              data={(
                                cities[itineraryItems[index].uf] || []
                              ).map((name) => ({
                                id: name,
                                name,
                              }))}
                              value={itineraryItems[index].city || ''}
                              onChange={(value: string) =>
                                handleCityChange(value, index)
                              }
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-6">
                            <Select
                              title="Categoria"
                              data={categories.map((category) => ({
                                id: category.id,
                                name: category.name,
                              }))}
                              value={itineraryItems[index].category || ''}
                              onChange={(value: string) =>
                                handleCategoryChange(value, index)
                              }
                            />

                            <Select
                              title="Itinerário"
                              data={
                                filteredItineraries[index]
                                  ? filteredItineraries[index].map(
                                      (itinerary) => ({
                                        id: itinerary.id,
                                        name: itinerary.name,
                                      }),
                                    )
                                  : []
                              }
                              value={itineraryItems[index].id || ''}
                              onChange={(value: string) =>
                                handleItineraryChange(value, index)
                              }
                            />
                          </div>

                          <a
                            onClick={() => deleteItineraryItem(index)}
                            className="flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border-[1px] border-gray-300 text-gray-600 transition-colors hover:border-red-500 hover:bg-red-500 hover:text-white"
                          >
                            <TrashSimple size={16} /> Excluir
                          </a>
                        </div>
                      )
                    })}

                    <hr className="bg-gray-300" />

                    <a
                      onClick={addNewItineraryItem}
                      className="flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-blue-500 text-white transition-colors hover:bg-blue-600"
                    >
                      <Plus size={16} /> Adicionar
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <Button
              icon={<FloppyDisk size={24} />}
              title="Salvar"
              variant="save"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  )
}
