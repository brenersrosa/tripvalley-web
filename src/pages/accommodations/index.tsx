import { MagnifyingGlass, Plus } from 'phosphor-react'
import { useNavigate } from 'react-router-dom'

import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { NavBar } from '../../components/NavBar'
import { Input } from '../../components/form/Input'
import { Select } from '../../components/form/Select'

export function Accommodations() {
  const navigate = useNavigate()

  const cities = [
    'Lorena',
    'Ubatuba',
    'Aparecida do Norte',
    'Cachoeira Paulista',
    'Areias',
  ]

  const status = ['Ativo', 'Inativo']

  return (
    <div className="flex h-screen w-full">
      <NavBar />
      <div className="w-full">
        <Header title="Hospedagens" />
        <div className="flex h-[calc(100vh-5rem)] w-full justify-center">
          <div className="mx-48 my-12 flex flex-1 gap-6">
            <Input
              placeholder="Pesquisar"
              icon={<MagnifyingGlass size={24} />}
            />

            <Select placeholder="Cidade" data={cities} />

            <Select placeholder="Status" data={status} />

            <Button
              icon={<Plus size={24} />}
              title="Adicionar"
              onClick={() => navigate('/accommodations/new')}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
