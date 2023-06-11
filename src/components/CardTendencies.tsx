import { Bag, Calendar, Car, ForkKnife } from 'phosphor-react'

interface CardProps {
  imagePath: string
  name: string
  valuePerPerson: number
  numberOfDays: number
  breakfast: boolean
  lunch: boolean
  dinner: boolean
  transferParticular: boolean
  transferShared: boolean
  city: string
}

export function CardTendencies({
  imagePath,
  name,
  valuePerPerson,
  numberOfDays,
  breakfast,
  lunch,
  dinner,
  transferParticular,
  transferShared,
  city,
}: CardProps) {
  const transferPart = transferParticular ? 'Particular' : ''
  const transferSharedText = transferShared ? 'Compartilhado' : ''
  const foodBreakfast = breakfast ? 'Café da manhã' : ''
  const foodLunch = lunch ? 'Almoço' : ''
  const foodDinner = dinner ? 'Jantar' : ''
  const priceDiscount = (valuePerPerson * 1.15).toFixed(2)

  const renderDiscountLabel = (
    <span className="rounded-md bg-green-500 px-1 py-1 text-xs font-light italic text-gray-200">
      {'15% desconto'}
    </span>
  )

  const renderPrice = (
    <div className="mt-2 text-3xl font-bold text-gray-800">
      R$ {valuePerPerson},00
    </div>
  )

  const renderFoodLabel = (foodText: string) => (
    <div className="rounded-md bg-green-500 px-1 py-1 text-xs font-light text-gray-200">
      {foodText}
    </div>
  )

  const renderTransferLabel = (transferText: string) => (
    <div className="rounded-md bg-green-500 px-1 py-1 text-xs font-light text-gray-200">
      {transferText}
    </div>
  )

  return (
    <div className="mx-auto gap-10 overflow-hidden rounded-lg border border-gray-300 bg-white shadow-md md:h-[620px] md:w-[300px] lg:w-[320px]">
      <img
        className="h-[220px] w-full object-cover"
        src={imagePath}
        alt="Imagem"
      />
      <div className="px-6 py-4">
        <div className="text-xl font-bold">{name}</div>
        <div className="mb-3 text-base text-gray-700">{city}</div>
        <hr className="my-3 border-gray-400" />
        <div className="text-base text-gray-600">a partir de</div>
        <div className="flex flex-row gap-2 text-gray-400">
          <span className="text-base font-light italic line-through">
            R$ {priceDiscount}
          </span>
          <span className="rounded-md bg-green-500 px-1 py-1 text-xs font-light italic text-gray-200">
            {'15% desconto'}
          </span>
        </div>
        <div className="mt-2 text-3xl font-bold text-gray-800">
          R$ {valuePerPerson + ''}
        </div>
        <div className="mb-4 text-base text-gray-600">por pessoa</div>
        <div className="mb-4 flex flex-col gap-2">
          <div className="flex flex-row items-center gap-2">
            <Calendar size={20} /> {numberOfDays} Dias
          </div>
          <div className="flex w-max flex-row flex-wrap items-center gap-2">
            <ForkKnife size={20} />
            {foodBreakfast && renderFoodLabel(foodBreakfast)}
            {foodLunch && renderFoodLabel(foodLunch)}
            {foodDinner && renderFoodLabel(foodDinner)}
          </div>
          <div className="flex flex-row items-center gap-2">
            <Car size={20} />
            {transferPart && renderTransferLabel(transferPart)}
            {transferSharedText && renderTransferLabel(transferSharedText)}
          </div>
        </div>
        <button className="flex w-full flex-row items-center justify-center gap-2 rounded-lg bg-blue-500 py-3 text-base font-normal text-white hover:bg-blue-700">
          <Bag size={20} />
          Reservar pacote
        </button>
      </div>
    </div>
  )
}
