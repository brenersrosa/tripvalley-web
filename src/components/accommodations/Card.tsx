import clsx from 'clsx'
import { MapPin } from 'phosphor-react'

interface CardAccommodationProps {
  isActive: 'active' | 'inactive'
  imagePath: string
  name: string
  city: string
  description: string
}

export function CardAccommodation({
  isActive,
  imagePath,
  name,
  city,
  description,
}: CardAccommodationProps) {
  return (
    <div className="relative flex w-full flex-grow flex-col rounded-lg border-[1px] border-gray-200 bg-white">
      <div className="h-36 w-full">
        <div
          className={clsx(
            'absolute left-4 top-4 rounded-sm px-1 text-xs text-gray-50',
            {
              'bg-green-500': isActive === 'active',
              'bg-gray-400': isActive === 'inactive',
            },
          )}
        >
          {isActive === 'active' ? 'ativo' : 'inativo'}
        </div>
        <img
          src={imagePath}
          alt="Accommodation image"
          className="h-full w-full rounded-t-lg object-cover"
        />
      </div>
      <div className="flex flex-col gap-2 p-4">
        <h3 className="line-clamp-1 max-w-xs font-title text-xl font-bold leading-relaxed text-gray-800">
          {name}
        </h3>
        <div className="flex items-center gap-1 text-gray-700">
          <MapPin size={20} />
          {city}
        </div>
        <p className="line-clamp-3 max-w-xs leading-relaxed text-gray-700">
          {description}
        </p>
      </div>
    </div>
  )
}
