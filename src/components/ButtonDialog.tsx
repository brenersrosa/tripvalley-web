import clsx from 'clsx'
import { ReactNode, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'phosphor-react'
import { Input } from './form/Input'

interface ButtonProps {
  icon?: ReactNode
  title?: string
  onClick?: () => void
}

export function Button({ icon, title, onClick }: ButtonProps) {
  const [destiny, setDestiny] = useState('')
  const [adults, setAdults] = useState('')
  const [date, setDate] = useState('')
  const [accommodation, setAccommodation] = useState('')
  const isButtonDisabled = !destiny || !accommodation || !adults || !date

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
            onClick={onClick}
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
              onChange={(e) => setDestiny(e.target.value)}
            />
            <Input
              inputType="date"
              placeholder="Data de ida"
              onChange={(e) => setDate(e.target.value)}
            />
          </fieldset>
          <fieldset className="mb-[15px] flex items-center gap-5">
            <Input
              inputType="accommodations"
              placeholder="Hospedagem"
              onChange={(e) => setAccommodation(e.target.value)}
            />
            <Input inputType="price" placeholder="Preço máximo" />
          </fieldset>
          <fieldset className="mb-[15px] flex items-center gap-5">
            <Input
              inputType="adults"
              placeholder="Quantidade de adultos"
              onChange={(e) => setAdults(e.target.value)}
            />
            <Input
              inputType="children"
              placeholder="Quantidade de crianças"
              defaultValue={'0'}
              onChange={(e) => setDestiny(e.target.value)}
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
                onClick={onClick}
                disabled={isButtonDisabled}
              >
                {icon}
                Buscar pacotes
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button
              className=" absolute right-3 top-3 inline-flex h-6 w-6 appearance-none items-center justify-center rounded-full focus:border focus:border-red-300 focus:outline-none"
              aria-label="Close"
            >
              <X />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Root>
    </>
  )
}
