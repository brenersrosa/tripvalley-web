import { ArrowsDownUp, Calendar } from 'phosphor-react'

interface packageHeroProps {
  locationName: string
  description: string
  showDescription: boolean
  totalPackageValue: number
  numberOfDays: number
  imagePath: string
  departureDate: string
  backDate: string
}

export function HeroLocation({
  locationName,
  description,
  showDescription,
  totalPackageValue,
  numberOfDays,
  imagePath,
  departureDate,
  backDate,
}: packageHeroProps) {
  const priceDiscount = (totalPackageValue * 1.15).toFixed(2)

  return (
    <div className="z-0 hidden select-none md:block lg:block">
      <div className="brightness-90 filter">
        <img
          className="h-[800px] object-cover shadow-2xl brightness-75 lg:w-full"
          src={imagePath}
          alt=""
        />
      </div>
      <div className="absolute -top-6 mx-40">
        <div className="relative top-72 z-10 flex flex-col gap-2 font-bold text-white md:max-w-lg md:text-2xl lg:text-5xl">
          <div className="space-y-1">
            <h1 className="w-auto text-gray-50">
              Conheça
              <span className="text-yellow-400"> {locationName}</span>
            </h1>
            {showDescription && (
              <div className="w-3/4 text-base font-normal">
                <span className="">{description}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="absolute -top-6 right-0 mx-40">
        <div className="relative top-72">
          <div className="w-full rounded-xl bg-white p-6">
            <div className="container flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <h2 className="text-gray-600">a partir de</h2>
                <div className="flex flex-row gap-2 text-gray-400">
                  <span className="text-base font-light italic line-through">
                    R$ {priceDiscount}
                  </span>
                  <span className="rounded-md bg-green-500 px-2 py-1 text-xs font-light italic text-gray-200">
                    {'15% desconto'}
                  </span>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800 md:text-3xl lg:text-4xl">
                  R$ {totalPackageValue}
                </h2>
                <div>
                  <h2 className="text-gray-600">por pessoa</h2>
                </div>
                <hr className="mt-2 border-gray-200" />
              </div>
              <div className="flex flex-row gap-2">
                <Calendar size={24} /> {departureDate}{' '}
                <ArrowsDownUp size={24} /> {backDate}
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-gray-600">Duração:</h2>
                <div className="flex  items-center justify-center rounded-lg bg-green-500 px-20 py-4 text-xl font-medium text-white">
                  {numberOfDays} dias
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
