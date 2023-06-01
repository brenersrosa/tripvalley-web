import { Link } from 'react-router-dom';
import { MagnifyingGlass } from 'phosphor-react';

export function Hero(): JSX.Element {
    return (
        <div className="hidden md:block lg:block select-none z-0">
            <div className="filter brightness-90">
                <img className="lg:w-full h-min object-fill" src="src/assets/background/backgroundHome.png" alt="" />
            </div>
            <div className="absolute -top-2">
                <div className="relative flex flex-col gap-2 px-[60px] left-10 top-36 font-bold md:text-2xl lg:text-5xl md:max-w-lg text-white z-10">
                    <div className="space-y-1">
                        <h1 className="text-gray-50 w-auto">Planeje sua próxima <span className="text-yellow-400">viagem</span></h1>
                        <h1>de maneira simples e fácil</h1>
                        <h2 className="font-normal text-base">Diversos destinos para você e sua família, com conforto e segurança.</h2>
                    </div>
                    <div>
                        <Link to="/signin" className="flex justify-center items-center flex-row md:py-3 lg:py-4 lg:text-base md:text-sm rounded-lg  bg-blue-500 text-gray-50 font-bold hover:bg-blue-600 transition">
                            <MagnifyingGlass className="mr-2 my-auto" size={24} />
                            Encontre seu novo destino
                        </Link>
                    </div>
                </div>
            </div>

            <div className="relative w-auto items-center justify-center flex bottom-24 z-20 select-none">
                <img className="object-fill" src="src/assets/informativeImages/infoHome.png" alt="" />
            </div>
        </div>
    );
}

export default Hero;
