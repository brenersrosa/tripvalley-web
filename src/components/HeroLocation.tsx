interface localName {
    locationName: string
    description: string
    showDescription: boolean
}

export function HeroLocation({ locationName, description, showDescription }: localName): JSX.Element {

    return (
        <div className="hidden md:block lg:block select-none z-0">
            <div className="filter brightness-90">
                <img className="lg:w-full h-min object-fill" src="src/assets/background/backgroundLocations.png" alt="" />
            </div>
            <div className="absolute -top-2">
                <div className="relative flex flex-col gap-2 px-[60px] left-10 top-72 font-bold md:text-2xl lg:text-5xl md:max-w-lg text-white z-10">
                    <div className="space-y-1">
                        <h1 className="text-gray-50 w-auto">Você está em<span className="text-yellow-400"> {locationName}</span></h1>
                        <h2 className={`${showDescription ? 'block' : 'hidden'}`}> <span className='font-normal text-base'>{description}</span></h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

