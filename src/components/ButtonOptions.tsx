import { PencilSimple, X } from 'phosphor-react'

export function ButtonOptions() {
  return (
    <div className="flex gap-2">
      <button className="flex h-9 w-9 items-center justify-center rounded-l-lg border-[1px] border-gray-200 bg-white text-gray-600 transition-colors hover:bg-blue-500 hover:text-white">
        <PencilSimple size={20} />
      </button>

      <button className="flex h-9 w-9 items-center justify-center rounded-r-lg border-[1px] border-gray-200 bg-white text-gray-600 transition-colors hover:bg-red-500 hover:text-white">
        <X size={20} />
      </button>
    </div>
  )
}
