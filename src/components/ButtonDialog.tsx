import { ReactNode, useState, ChangeEvent } from 'react'
import clsx from 'clsx'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'phosphor-react'
import { Input } from './form/Input'
import { useNavigate } from 'react-router-dom'

import { api } from '../lib/api'

interface ButtonProps {
  icon?: ReactNode
  title?: string
  onClick?: () => void
}

interface Package {
  id: number
  name: string
}

export function ButtonDialog({ icon, title, onClick }: ButtonProps) {
  const navigate = useNavigate()
  const [destiny, setDestiny] = useState('')
  const [price, setPrice] = useState('')
  const [dateGo, setDate] = useState('')
  const [adults, setAdults] = useState('')
  const [children, setChildren] = useState('')
  const isButtonDisabled = !destiny

  const searchPackage = async () => {
    try {
      const response = await api.get('/packages', {
        params: {
          nameContains: destiny,
        },
      })

      const packages = response.data

      if (packages.length > 0) {
        // Aqui Encontra pacotes correspondentes ao nome digitado
        const closestPackage = findClosestPackage(packages, destiny)
        const packageId = closestPackage.id
        // Aqui faz uma navegação e manda para uma url "packages/{id do pacote}"
        // exemplo: http://localhost:5173/packages/5bda3790-638a-4bc8-bf19-f3b0423bcd1f
        navigate(`/packages/${packageId}`)
      } else {
        // Pacote não encontrado, preciso adiconar um alert para o usuário
        console.log('Pacote não encontrado')
      }
    } catch (error) {
      // Erro ao buscar o pacote preciso adiconar um alert para o usuário
      console.error('Erro ao buscar pacotes:', error)
    }
  }

  // Função que encontra o pacote mais próximo com base no nome de pesquisa
  const findClosestPackage = (
    packages: Package[],
    searchName: string,
  ): Package => {
    // Inicializa a variável do pacote mais próximo com o primeiro pacote do array
    const closestPackage = packages.reduce(
      // Obtém a similaridade entre o nome do pacote mais próximo atual e o nome de pesquisa
      (closest: Package, current: Package) => {
        const closestSimilarity = getSimilarity(closest.name, searchName)
        // Obtém a similaridade entre o nome do pacote atual e o nome de pesquisa
        const currentSimilarity = getSimilarity(current.name, searchName)
        // Compara as similaridades para determinar qual pacote é mais similar ao nome de pesquisa
        if (currentSimilarity > closestSimilarity) {
          return current // O pacote atual é mais similar, então substitui o pacote mais próximo atual
        } else {
          return closest // O pacote mais próximo atual ainda é mais similar
        }
      },
    )

    return closestPackage // Retorna o pacote mais próximo encontrado
  }

  // Função que calcula a similaridade entre dois nomes
  const getSimilarity = (name1: string, name2: string): number => {
    // Converte os nomes em conjuntos (sets) de palavras únicas
    const set1 = new Set(name1.split(' '))
    const set2 = new Set(name2.split(' '))

    // Obtém a interseção entre os conjuntos de palavras
    const intersection = new Set([...set1].filter((x) => set2.has(x)))

    // Obtém a união dos conjuntos de palavras
    const union = new Set([...set1, ...set2])

    // Calcula a similaridade dividindo o tamanho da interseção pelo tamanho da união
    const similarity = intersection.size / union.size
    return similarity // Retorna a similaridade calculada
  }

  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button
            className={clsx(
              'flex h-14 items-center justify-center gap-2 rounded-lg bg-blue-500 text-white transition-colors hover:bg-blue-600',
              {
                'w-14': !title,
                'w-full': title,
              },
            )}
            onClick={() => {
              onClick?.()
              setDestiny('')
            }}
            aria-label={
              'Botão para buscar novo destino. vai ter uma ação: vai abrir um pequeno formulario para ser preenchido'
            }
          >
            {icon}
            {title}
          </button>
        </Dialog.Trigger>
        <Dialog.Overlay className="fixed inset-0 z-10 bg-black opacity-60" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-10 max-h-[90vh] w-[90vw] max-w-[936px] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-zinc-50 pb-12 pl-16 pr-16 pt-12 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <div className="flex items-center gap-4">
            <div className="h-6 w-[6px] rounded-r-md bg-blue-500 md:h-7"></div>
            <Dialog.Title className="m-0 font-title text-xl font-semibold">
              Buscar novo destino
            </Dialog.Title>
          </div>
          <hr className="mb-5 mt-5 border-gray-300" />
          <fieldset className="mb-[15px] flex items-center gap-5">
            <Input
              inputType="destiny"
              placeholder="Destino"
              autoFocus
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setDestiny(e.target.value)
              }
              aria-label="Destino"
            />
            <Input
              inputType="dateGo"
              placeholder="Data de ida"
              value={dateGo}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const numericValue = e.target.value.replace(/\D/g, '')
                setDate(numericValue)
              }}
              aria-label="Data de ida"
            />
          </fieldset>
          <fieldset className="mb-[15px] flex items-center gap-5">
            <Input
              inputType="accommodations"
              placeholder="Hospedagem"
              aria-label="Hospedagem"
            />
            <Input
              inputType="price"
              placeholder="Preço máximo"
              value={price}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const numericValue = e.target.value.replace(/\D/g, '')
                setPrice(numericValue)
              }}
              aria-label="Preço máximo"
            />
          </fieldset>
          <fieldset className="mb-[15px] flex items-center gap-5">
            <Input
              inputType="adults"
              placeholder="Quantidade de adultos"
              value={adults}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const numericValue = e.target.value.replace(/\D/g, '')
                setAdults(numericValue)
              }}
              aria-label="Quantidade de adultos"
            />
            <Input
              inputType="children"
              placeholder="Quantidade de crianças"
              defaultValue={'0'}
              value={children}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const numericValue = e.target.value.replace(/\D/g, '')
                setChildren(numericValue)
              }}
              aria-label="Quantidade de crianças"
            />
          </fieldset>
          <div className="mt-[25px] flex justify-end">
            <Dialog.Close asChild>
              <button
                className={clsx(
                  'flex h-14 items-center justify-center gap-2 rounded-lg bg-blue-500 text-white transition-colors hover:bg-blue-600',
                  {
                    'w-14': !title,
                    'w-full': title,
                    'opacity-75': isButtonDisabled,
                  },
                )}
                onClick={searchPackage}
                disabled={isButtonDisabled}
                aria-label="Botão de buscar pacotes, ele só vai liberar após preencher todos os campos."
              >
                {icon}
                Buscar pacotes
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button
              className=" absolute right-3 top-3 inline-flex h-6 w-6 appearance-none items-center justify-center rounded-full focus:border focus:border-red-300 focus:outline-none"
              aria-label="Fechar"
            >
              <X />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Root>
    </>
  )
}
