import clsx from 'clsx'
import { MapPin } from 'phosphor-react'
import { ButtonOptions } from '../ButtonOptions'

import { Accommodation } from '../../schemas/accommodation.schema'

interface CardAccommodationProps {
  accommodation: Accommodation
  onToggleIsActive?: () => void
}

export function CardAccommodation({
  accommodation,
  onToggleIsActive,
}: CardAccommodationProps) {
  return (
    <div className="relative flex w-full flex-grow flex-col rounded-lg border-[1px] border-gray-200 bg-white">
      <div className="h-36 w-full">
        <div
          className={clsx(
            'absolute left-4 top-4 rounded-sm px-2 py-1 text-sm text-gray-50',
            {
              'bg-green-500': accommodation.isActive === 'active',
              'bg-gray-400': accommodation.isActive === 'inactive',
            },
          )}
        >
          {accommodation.isActive === 'active' ? 'ativo' : 'inativo'}
        </div>

        <div className="absolute right-4 top-4">
          <ButtonOptions
            onToggleIsActive={onToggleIsActive}
            state={accommodation.isActive}
          />
        </div>
        <img
          src={accommodation.imagePath}
          alt="Accommodation image"
          className="h-full w-full rounded-t-lg object-cover"
        />
      </div>
      <div className="flex flex-col gap-2 p-4">
        <h3 className="line-clamp-1 max-w-xs font-title text-xl font-bold leading-relaxed text-gray-800">
          {accommodation.name}
        </h3>
        <div className="flex items-center gap-1 text-gray-700">
          <MapPin size={20} />
          {accommodation.city}
        </div>
        <p className="line-clamp-3 max-w-xs leading-relaxed text-gray-700">
          {accommodation.description}
        </p>
      </div>
    </div>
  )
}
