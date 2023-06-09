import { Bag, Calendar, Car, ForkKnife } from 'phosphor-react'

interface CardProps {
  // imagePath: string
  name: string
  city?: string
  // priceDiscount: string
  // discountTag: string
  // price: string
  // days: number
  // food: string[]
  transferParticular: number
  transferShared: number
}

export function CardTendencies({
  // imagePath,
  name,
  city,
  // price,
  // priceDiscount,
  // discountTag,
  // days,
  // food,
  transferParticular,
  transferShared,
}: CardProps) {
  const transferPart = transferParticular > 0 ? 'Particular' : ''
  const transferShar = transferShared > 0 ? 'Compartilhado' : ''

  return (
    <div className="mx-auto max-w-xs gap-10 overflow-hidden rounded-lg border border-gray-300 bg-white shadow-md">
      <img className="w-full" src="https://picsum.photos/200" alt="Imagem" />
      <div className="px-6 py-4">
        <div className="text-xl font-bold">{name}</div>
        <p className="mb-3 text-base text-gray-700">{city}</p>
        <hr className="my-3 border-gray-400" />
        <p className="text-base text-gray-600">a partir de</p>
        <p className="flex flex-row gap-2 text-gray-400">
          <span className="text-base font-light italic line-through">
            R$ {'priceDiscount'}
          </span>
          <span className="rounded-md bg-green-500 px-1 py-1 text-xs font-light italic text-gray-200">
            {'discountTag'}
          </span>
        </p>
        <p className="mt-2 text-3xl font-bold text-gray-800">R$ {'price'}</p>
        <p className="mb-4 text-base text-gray-600">por pessoa</p>
        <div className="mb-4 flex flex-col gap-2">
          <p className="flex flex-row items-center gap-2">
            <Calendar size={20} /> {'days'} Dias
          </p>
          <p className="flex w-max flex-row flex-wrap items-center gap-2">
            <ForkKnife size={20} />
            {/* {food.map((tag, index) => ( */}
            <span
              // key={index}
              className="rounded-md bg-green-500 px-1 py-1 text-xs font-light text-gray-200"
            >
              {/* {tag} */}
            </span>
            {/* ))} */}
          </p>
          <p className="flex flex-row items-center gap-2">
            <Car size={20} />
            <div className="rounded-md bg-green-500 px-1 py-1 text-xs font-light text-gray-200">
              {transferPart}
            </div>
            <div className="rounded-md bg-green-500 px-1 py-1 text-xs font-light text-gray-200">
              {transferShar}
            </div>
          </p>
        </div>
        <button className="flex w-full flex-row items-center justify-center gap-2 rounded-lg bg-blue-500 py-3 text-base font-normal text-white hover:bg-blue-700">
          <Bag size={20} />
          Reservar pacote
        </button>
      </div>
    </div>
  )
}
