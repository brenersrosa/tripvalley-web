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
  const [backDate, setBackDate] = useState<Date | string>('')
  const [transferParticular, setTransferParticular] = useState<boolean>(false)
  const [transferExclusive, setTransferExclusive] = useState<boolean>(false)
  const [transferShared, setTransferShared] = useState<boolean>(false)
  const [itinerary, setItinerary] = useState<ItineraryProps | null>()
  const [itineraries, setItineraries] = useState<ItineraryProps[]>([])
  const [numberOfDays, setNumberOfDays] = useState<number>(0)
  const [valuePerPerson, setValuePerPerson] = useState<number>(0)
  const [category, setCategory] = useState<CategoryProps | null>()
  const [categories, setCategories] = useState<CategoryProps[]>([])
  const [uf, setUf] = useState<string>('')
  const [city, setCity] = useState<string>('')

  const [filteredItineraries, setFilteredItineraries] = useState<
    ItineraryProps[]
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
        console.log('Error getting accommodations.', error)
      })
  }, [])

  // useEffect(() => {
  //   const filtered = itineraries.filter((itinerary) => {
  //     return (
  //       itinerary.accommodation.city === city &&
  //       (category ? itinerary.category.id === category.id : true)
  //     )
  //   })

  //   setFilteredItineraries(filtered)

  //   console.log(filtered)

  //   console.log(filteredItineraries)
  //   console.log(filteredItineraries)
  // }, [itineraries, city, category])

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

  function handleCategoryChange(value: string, position: number) {
    const selectedCategory = categories.find(
      (category) => category.name === value,
    )

    if (selectedCategory) {
      setItineraryItems((prevItems) => {
        const updatedItems = [...prevItems]
        updatedItems[position] = {
          ...updatedItems[position],
          category: selectedCategory.id,
        }
        return updatedItems
      })
    }
  }

  function handleItineraryChange(value: string, position: number) {
    const selectedItinerary = itineraries.find(
      (itinerary) => itinerary.name === value,
    )

    console.log(selectedItinerary)

    if (selectedItinerary) {
      setItineraryItems((prevItems) => {
        const updatedItems = [...prevItems]
        updatedItems[position] = {
          id: selectedItinerary.id,
          uf: selectedItinerary.accommodation.zipCode,
          city: selectedItinerary.accommodation.city,
          category: selectedItinerary.category.id,
        }
        console.log(updatedItems)
        return updatedItems
      })
    }
  }

  const updateFilteredItineraries = () => {
    // Realize a filtragem dos itinerários com base nos estados selecionados de uf, city e category
    const filteredItineraries = itineraries.filter((itinerary) => {
      const isUfMatch = itinerary.accommodation.zipCode === uf
      const isCityMatch = itinerary.accommodation.city === city
      const isCategoryMatch = itinerary.category === category

      // Retorne true apenas para os itinerários que atendam aos critérios selecionados
      return isUfMatch && isCityMatch && isCategoryMatch
    })

    setFilteredItineraries(filteredItineraries)
  }

  // Atualize a lista de itinerários filtrados sempre que os estados de uf, city ou category mudarem
  useEffect(() => {
    updateFilteredItineraries()
  }, [uf, city, category])

  function clearForm() {
    setIsActive('active')
    setName('')
    setDescription('')
    setNumberOfDays(0)
    setValuePerPerson(0)
    setItineraryItems([{ id: '', uf: '', city: '', category: '' }])
    setCategory(null)
    setItinerary(null)
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    const date = new Date()
    const formattedDepartureDate = date.toISOString()

    console.log(formattedDepartureDate)

    const formData = {
      isActive,
      name,
      description,
      imagePath,
      departureDate:
        departureDate instanceof Date
          ? departureDate.toISOString()
          : departureDate,
      backDate:
        departureDate instanceof Date
          ? departureDate.toISOString()
          : departureDate,
      transferParticular,
      transferExclusive,
      transferShared,
      itineraries: itineraryItems.map((item) => item.id),
    }

    console.log('formData: ', formData)

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
                  <span className="text-gray-600">Tipos de quartos</span>
                  <div className="grid grid-cols-4 gap-4">
                    <Checkbox
                      title="Transporte particular"
                      checked={transferParticular}
                      onChange={() =>
                        setTransferParticular(!transferParticular)
                      }
                    />
                    <Checkbox
                      title="Transporte exclusivo"
                      checked={transferExclusive}
                      onChange={() => setTransferExclusive(!transferExclusive)}
                    />
                    <Checkbox
                      title="Transporte compartilhado"
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
                              value={uf}
                              onChange={(value: string) => setUf(value)}
                            />

                            <Select
                              title="Cidade"
                              data={(cities[uf] || []).map((name) => ({
                                id: name,
                                name,
                              }))}
                              value={city}
                              onChange={(value: string) => setCity(value)}
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-6">
                            {/* <Select
                              title="Categoria"
                              data={categories.map((category) => ({
                                id: category.id,
                                name: category.name,
                              }))}
                              value={category?.name || ''}
                              onChange={handleCategoryChange}
                            /> */}

                            <Select
                              title="Categoria"
                              data={categories.map((category) => ({
                                id: category.id,
                                name: category.name,
                              }))}
                              value={itineraryItems[index]?.category || ''}
                              onChange={(value) =>
                                handleCategoryChange(value, index)
                              }
                            />

                            <Select
                              title="Itinerário"
                              data={filteredItineraries.map((itinerary) => ({
                                id: itinerary.id,
                                name: itinerary.name,
                              }))}
                              value={itineraryItems[index]?.id || ''}
                              onChange={(value) =>
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
