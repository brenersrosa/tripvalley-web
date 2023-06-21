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
import { Input } from '../../components/form/Input'
import { MultilineInput } from '../../components/form/MultilineInput'
import { Select } from '../../components/form/Select'
import { Switch } from '../../components/form/Switch'
import { TitleForm } from '../../components/form/Title'

import { AccommodationProps } from '../../@types/Accommodation'
import { CategoryProps } from '../../@types/Category'

import {
  ItinerariesInputProps,
  itinerarySchema,
} from '../../schemas/itinerary.schema'

import citiesData from '../../utils/cities.json'

interface Errors {
  [key: string]: string
}

export function NewItinerary() {
  const [isActive, setIsActive] = useState<'active' | 'inactive'>('active')
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [numberOfDays, setNumberOfDays] = useState<number>(0)
  const [valuePerPerson, setValuePerPerson] = useState<number>(0)
  const [category, setCategory] = useState<CategoryProps | null>()
  const [categories, setCategories] = useState<CategoryProps[]>([])
  const [accommodation, setAccommodation] =
    useState<AccommodationProps | null>()
  const [accommodations, setAccommodations] = useState<AccommodationProps[]>([])
  const [uf, setUf] = useState<string>('')
  const [city, setCity] = useState<string>('')
  const [filteredAccommodations, setFilteredAccommodations] = useState<
    AccommodationProps[]
  >([])

  const [contentItems, setContentItems] = useState([{ content: '' }])
  const [classificationItems, setClassificationItems] = useState([
    { classification: '' },
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
      .get('/accommodations')
      .then((response) => {
        setAccommodations(response.data)
      })
      .catch((error) => {
        console.log('Error getting accommodations.', error)
      })
  }, [])

  useEffect(() => {
    filterAccommodations()
  }, [city])

  function filterAccommodations() {
    const filtered = accommodations.filter(
      (accommodation) => accommodation.city === city,
    )
    setFilteredAccommodations(filtered)
  }

  function addNewContentItem() {
    setContentItems([...contentItems, { content: '' }])
  }

  function deleteContentItem(position: number) {
    const updatedContentItems = contentItems.filter(
      (_, index) => index !== position,
    )
    setContentItems(updatedContentItems)
  }

  function addNewClassificationItem() {
    setClassificationItems([...classificationItems, { classification: '' }])
  }

  function deleteClassificationItem(position: number) {
    const updateClassificationItems = classificationItems.filter(
      (_, index) => index !== position,
    )
    setClassificationItems(updateClassificationItems)
  }

  function setContentItemValue(position: number, field: string, value: string) {
    const updateContentItems = contentItems.map((contentItem, index) => {
      if (index === position) {
        return { ...contentItem, [field]: value }
      }

      return contentItem
    })

    setContentItems(updateContentItems)
  }

  function setClassificationItemValue(
    position: number,
    field: string,
    value: string,
  ) {
    const updateClassificationItems = classificationItems.map(
      (classificationItem, index) => {
        if (index === position) {
          return { ...classificationItem, [field]: value }
        }

        return classificationItem
      },
    )

    setClassificationItems(updateClassificationItems)
  }

  function validateFormData(formData: ItinerariesInputProps) {
    try {
      itinerarySchema.parse(formData)
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
    setNumberOfDays(0)
    setValuePerPerson(0)
    setContentItems([{ content: '' }])
    setClassificationItems([{ classification: '' }])
    setCategory(null)
    setAccommodation(null)
  }

  function handleAccommodationChange(value: string) {
    const selectedAccommodation = accommodations.find(
      (accommodation) => accommodation.name === value,
    )

    if (selectedAccommodation) {
      setAccommodation(selectedAccommodation)
    }
  }

  function handleCategoryChange(value: string) {
    const selectedCategory = categories.find(
      (category) => category.name === value,
    )

    if (selectedCategory) {
      setCategory(selectedCategory)
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    const formData: ItinerariesInputProps = {
      isActive,
      name,
      description,
      numberOfDays,
      valuePerPerson,
      content: contentItems.map((item) => item.content),
      classification: classificationItems.map((item) => item.classification),
      categoryId: category?.id || '',
      accommodationId: accommodation?.id || '',
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
      const response = await api.post('/itineraries', formData)
      console.log('Novo itinerário criado com sucesso:', response.data)
      toast.success('Novo itinerário criado com sucesso!', {
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
      navigate('/itineraries')
    } catch (error) {
      console.error('Erro ao criar novo itinerário:', error)
      toast.error('Erro ao criar novo itinerário.', {
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
        <Header title="Adicionar itinerário" />

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
                    title="Número de dias"
                    value={numberOfDays === 0 ? '' : numberOfDays}
                    onChange={(e) => setNumberOfDays(Number(e.target.value))}
                    type="number"
                    min={0}
                  />

                  <Input
                    title="Valor por pessoa"
                    value={valuePerPerson === 0 ? '' : valuePerPerson}
                    onChange={(e) => setValuePerPerson(Number(e.target.value))}
                    type="number"
                    step=".01"
                    min={0}
                    placeholder="R$ 0,00"
                  />
                </div>

                <div className="flex w-full flex-col gap-4">
                  <span className="text-gray-600">Conteúdo</span>
                  <div className="flex flex-col gap-4 rounded-lg border-[1px] border-gray-300 p-4">
                    {contentItems.map((contentItem, index) => {
                      return (
                        <div key={index} className="flex items-center gap-4">
                          <Input
                            name="content"
                            placeholder={`${index + 1}˚ conteúdo`}
                            value={contentItem.content}
                            onChange={(e) =>
                              setContentItemValue(
                                index,
                                'content',
                                e.target.value,
                              )
                            }
                          />
                          <a
                            onClick={() => deleteContentItem(index)}
                            className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-lg border-[1px] border-gray-300 transition-colors hover:border-red-500 hover:bg-red-500 hover:text-white"
                          >
                            <TrashSimple size={16} />
                          </a>
                        </div>
                      )
                    })}
                    <a
                      onClick={addNewContentItem}
                      className="flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-blue-500 text-white transition-colors hover:bg-blue-600"
                    >
                      <Plus size={16} /> Adicionar
                    </a>
                  </div>
                </div>

                <div className="flex w-full flex-col gap-4">
                  <span className="text-gray-600">Classificação</span>
                  <div className="flex flex-col gap-4 rounded-lg border-[1px] border-gray-300 p-4">
                    {classificationItems.map((classificationItem, index) => {
                      return (
                        <div key={index} className="flex items-center gap-4">
                          <Input
                            name="classification"
                            placeholder={`${index + 1}˚ conteúdo`}
                            value={classificationItem.classification}
                            onChange={(e) =>
                              setClassificationItemValue(
                                index,
                                'classification',
                                e.target.value,
                              )
                            }
                          />
                          <a
                            onClick={() => deleteClassificationItem(index)}
                            className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-lg border-[1px] border-gray-300 transition-colors hover:border-red-500 hover:bg-red-500 hover:text-white"
                          >
                            <TrashSimple size={16} />
                          </a>
                        </div>
                      )
                    })}
                    <a
                      onClick={addNewClassificationItem}
                      className="flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-blue-500 text-white transition-colors hover:bg-blue-600"
                    >
                      <Plus size={16} /> Adicionar
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-8">
              <TitleForm title="Dados da hospedagem" />

              <hr className="bg-gray-300" />

              <div className="flex w-full flex-col gap-6">
                <div className="grid grid-cols-2 gap-6">
                  <Select
                    title="Estado"
                    data={Object.keys(cities).map((id) => ({ id, name: id }))}
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
                  <Select
                    title="Hospedagem"
                    data={filteredAccommodations.map((accommodation) => ({
                      id: accommodation.id,
                      name: accommodation.name,
                    }))}
                    value={accommodation?.name || ''}
                    onChange={handleAccommodationChange}
                  />

                  <Select
                    title="Categoria"
                    data={categories.map((category) => ({
                      id: category.id,
                      name: category.name,
                    }))}
                    value={category?.name || ''}
                    onChange={handleCategoryChange}
                  />
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
