interface localName {
  locationName: string
  description: string
  showDescription: boolean
}

export function HeroLocation({
  locationName,
  description,
  showDescription,
}: localName): JSX.Element {
  return (
    <div className="z-0 hidden select-none md:block lg:block">
      <div className="brightness-90 filter">
        <img
          className="h-min object-fill lg:w-full"
          src="src/assets/background/backgroundLocations.png"
          alt=""
        />
      </div>
      <div className="absolute -top-2">
        <div className="relative left-10 top-72 z-10 flex flex-col gap-2 px-[60px] font-bold text-white md:max-w-lg md:text-2xl lg:text-5xl">
          <div className="space-y-1">
            <h1 className="w-auto text-gray-50">
              Você está em
              <span className="text-yellow-400"> {locationName}</span>
            </h1>
            <h2 className={`${showDescription ? 'block' : 'hidden'}`}>
              {' '}
              <span className="text-base font-normal">{description}</span>
            </h2>
          </div>
        </div>
      </div>
    </div>
  )
}
