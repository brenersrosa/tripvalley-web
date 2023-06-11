import clsx from 'clsx'
import { Check, PencilSimple, X } from 'phosphor-react'

interface ButtonOptionProps {
  state: 'active' | 'inactive'
  onToggleIsActive?: () => void
}

export function ButtonOptions({ state, onToggleIsActive }: ButtonOptionProps) {
  return (
    <div className="flex gap-2">
      <button className="flex h-9 w-9 items-center justify-center rounded-l-lg border-[1px] border-gray-200 bg-white text-gray-600 transition-colors hover:border-blue-500 hover:bg-blue-500 hover:text-white">
        <PencilSimple size={20} />
      </button>

      <button
        className={clsx(
          'flex h-9 w-9 items-center justify-center rounded-r-lg border-[1px] border-gray-200 bg-white text-gray-600 transition-colors hover:text-white',
          {
            'hover:border-red-500 hover:bg-red-500': state === 'active',
            'hover:border-green-500 hover:bg-green-500': state === 'inactive',
          },
        )}
        onClick={onToggleIsActive}
      >
        {state === 'active' ? <X size={20} /> : <Check size={20} />}
      </button>
    </div>
  )
}
