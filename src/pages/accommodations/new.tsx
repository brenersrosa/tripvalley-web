import { FloppyDisk } from 'phosphor-react'
import { FormEvent, useState } from 'react'
import { z } from 'zod'

import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { NavBar } from '../../components/NavBar'
import { Checkbox } from '../../components/form/Checkbox'
import { Input } from '../../components/form/Input'
import { Select } from '../../components/form/Select'
import { Switch } from '../../components/form/Switch'
import { TitleForm } from '../../components/form/Title'

import { api } from '../../lib/api'

import citiesData from '../../utils/cities.json'

import { MultilineInput } from '../../components/form/MultilineInput'
import {
  AccommodationsInputProps,
  accommodationSchema,
} from '../../schemas/accommodation.schema'

interface Errors {
  [key: string]: string
}

export function NewAccommodation() {
  const [isActive, setIsActive] = useState<'active' | 'inactive'>('active')
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [dailyValue, setDailyValue] = useState<number>(0)
  const [imagePath, setImagePath] = useState<string>('')
  const [zipCode, setZipCode] = useState<string>('')
  const [addressName, setAddressName] = useState<string>('')
  const [districtName, setDistrictName] = useState<string>('')
  const [addressNumber, setAddressNumber] = useState<string>('')
  const [uf, setUf] = useState<string>('')
  const [city, setCity] = useState<string>('')
  const [singleRoom, setSingleRoom] = useState<boolean>(false)
  const [doubleRoom, setDoubleRoom] = useState<boolean>(false)
  const [doubleBedroom, setDoubleBedroom] = useState<boolean>(false)
  const [dormRoom, setDormRoom] = useState<boolean>(false)
  const [breakfast, setBreakfast] = useState<boolean>(false)
  const [lunch, setLunch] = useState<boolean>(false)
  const [dinner, setDinner] = useState<boolean>(false)
  const [wifi, setWifi] = useState<boolean>(false)
  const [petFriendly, setPetFriendly] = useState<boolean>(false)
  const [parking, setParking] = useState<boolean>(false)
  const [gyn, setGyn] = useState<boolean>(false)
  const [pool, setPool] = useState<boolean>(false)
  const [onSiteRestaurants, setOnSiteRestaurants] = useState<boolean>(false)
  const [nearbyRestaurants, setNearbyRestaurants] = useState<boolean>(false)
  const [roomService, setRoomService] = useState<boolean>(false)
  const [transportService, setTransportService] = useState<boolean>(false)
  const [childrensArea, setChildrensArea] = useState<boolean>(false)

  const [errors, setErrors] = useState<Errors>({})

  const cities: { [key: string]: string[] } = citiesData

  function validateFormData(formData: AccommodationsInputProps) {
    try {
      accommodationSchema.parse(formData)
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
    setDailyValue(0)
    setImagePath('')
    setZipCode('')
    setAddressName('')
    setDistrictName('')
    setAddressNumber('')
    setUf('')
    setCity('')
    setSingleRoom(false)
    setDoubleRoom(false)
    setDoubleBedroom(false)
    setDormRoom(false)
    setBreakfast(false)
    setLunch(false)
    setDinner(false)
    setWifi(false)
    setPetFriendly(false)
    setParking(false)
    setGyn(false)
    setPool(false)
    setOnSiteRestaurants(false)
    setNearbyRestaurants(false)
    setRoomService(false)
    setTransportService(false)
    setChildrensArea(false)
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    const formData: AccommodationsInputProps = {
      isActive,
      name,
      description,
      dailyValue,
      imagePath,
      zipCode,
      addressName,
      districtName,
      addressNumber,
      uf,
      city,
      singleRoom,
      doubleRoom,
      doubleBedroom,
      dormRoom,
      breakfast,
      lunch,
      dinner,
      wifi,
      petFriendly,
      parking,
      gyn,
      pool,
      onSiteRestaurants,
      nearbyRestaurants,
      roomService,
      transportService,
      childrensArea,
    }

    const isFormDataValid = validateFormData(formData)

    if (!isFormDataValid) {
      return
    }

    try {
      const response = await api.post('/accommodations', formData)
      console.log('Nova hospedagem criada com sucesso:', response.data)
      clearForm()
    } catch (error) {
      console.error('Erro ao criar nova hospedagem:', error)
    }
  }

  return (
    <div className="flex h-screen w-full">
      <NavBar />
      <div className="w-full">
        <Header title="Adicionar hospedagem" />

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
                  title="Nome da hospedagem"
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
                    title="Valor da diária"
                    value={dailyValue}
                    onChange={(e) => setDailyValue(Number(e.target.value))}
                    type="number"
                    step=".01"
                    min={0}
                    placeholder="R$ 0,00"
                  />

                  <Input
                    title="URL da imagem"
                    value={imagePath}
                    onChange={(e) => setImagePath(e.target.value)}
                  />
                </div>

                <div className="flex w-full flex-col gap-4">
                  <span className="text-gray-600">Tipos de quartos</span>
                  <div className="grid grid-cols-4 gap-4">
                    <Checkbox
                      title="Solteiro"
                      checked={singleRoom}
                      onChange={() => setSingleRoom(!singleRoom)}
                    />
                    <Checkbox
                      title="Solteiro duplo"
                      checked={doubleRoom}
                      onChange={() => setDoubleRoom(!doubleRoom)}
                    />
                    <Checkbox
                      title="Casal"
                      checked={doubleBedroom}
                      onChange={() => setDoubleBedroom(!doubleBedroom)}
                    />
                    <Checkbox
                      title="Dormitório"
                      checked={dormRoom}
                      onChange={() => setDormRoom(!dormRoom)}
                    />
                  </div>
                </div>

                <div className="flex w-full flex-col gap-4">
                  <span className="text-gray-600">Serviços oferecidos</span>
                  <div className="grid grid-cols-4 gap-4">
                    <Checkbox
                      title="Café da manhã"
                      checked={breakfast}
                      onChange={() => setBreakfast(!breakfast)}
                    />
                    <Checkbox
                      title="Almoço"
                      checked={lunch}
                      onChange={() => setLunch(!lunch)}
                    />
                    <Checkbox
                      title="Jantar"
                      checked={dinner}
                      onChange={() => setDinner(!dinner)}
                    />
                    <Checkbox
                      title="Wifi"
                      checked={wifi}
                      onChange={() => setWifi(!wifi)}
                    />
                    <Checkbox
                      title="Pet friendly"
                      checked={petFriendly}
                      onChange={() => setPetFriendly(!petFriendly)}
                    />
                    <Checkbox
                      title="Estacionamento"
                      checked={parking}
                      onChange={() => setParking(!parking)}
                    />
                    <Checkbox
                      title="Academia"
                      checked={gyn}
                      onChange={() => setGyn(!gyn)}
                    />
                    <Checkbox
                      title="Piscina"
                      checked={pool}
                      onChange={() => setPool(!pool)}
                    />
                    <Checkbox
                      title="Restaurantes no local"
                      checked={onSiteRestaurants}
                      onChange={() => setOnSiteRestaurants(!onSiteRestaurants)}
                    />
                    <Checkbox
                      title="Restaurantes por perto"
                      checked={nearbyRestaurants}
                      onChange={() => setNearbyRestaurants(!nearbyRestaurants)}
                    />
                    <Checkbox
                      title="Serviço de quarto"
                      checked={roomService}
                      onChange={() => setRoomService(!roomService)}
                    />
                    <Checkbox
                      title="Serviço de transporte"
                      checked={transportService}
                      onChange={() => setTransportService(!transportService)}
                    />
                    <Checkbox
                      title="Área infantil"
                      checked={childrensArea}
                      onChange={() => setChildrensArea(!childrensArea)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-8">
              <TitleForm title="Endereço" />

              <hr className="bg-gray-300" />

              <div className="flex w-full flex-col gap-6">
                <div className="grid grid-cols-4 gap-6">
                  <div className="col-span-1">
                    <Input
                      title="CEP"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                    />
                  </div>
                  <div className="col-span-3">
                    <Input
                      title="Rua"
                      value={addressName}
                      onChange={(e) => setAddressName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-6">
                  <div className="col-span-3">
                    <Input
                      title="Bairro"
                      value={districtName}
                      onChange={(e) => setDistrictName(e.target.value)}
                    />
                  </div>
                  <div className="col-span-1">
                    <Input
                      title="Número"
                      value={addressNumber}
                      onChange={(e) => setAddressNumber(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-6">
                  <div className="col-span-1">
                    <Select
                      title="Estado"
                      data={Object.keys(cities)}
                      value={uf}
                      onChange={(value: string) => setUf(value)}
                    />
                  </div>
                  <div className="col-span-3">
                    <Select
                      title="Cidade"
                      data={cities[uf] || []}
                      value={city}
                      onChange={(value: string) => setCity(value)}
                    />
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
