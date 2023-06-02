import { Quotes } from "phosphor-react";

type Text = {
    titleName: string
    desc: string
    city: string
    image: string
}

export function Feedback({titleName, desc, city, image}:Text) {
    return (
        <div className="hidden md:block select-none">
            <div className="w-[365px] h-max flex flex-col mx-auto border-2 border-gray-300 py-5 px-5 rounded-md mb-10">
                <div className="my-3">
                <Quotes className="text-gray-500" size={42} weight="light" />
                </div>
                <div className="mb-5 max-w-[370px]">
                    <p className="text-gray-700 font-normal text-sm lg:text-base ">{desc}</p>
                </div>
                <hr className="border-gray-400 rounded-full" />
                <div className="flex flex-row ml-3 items-center gap-3 mt-5">
                    <div>
                        <img className="rounded-full w-16 lg:w-20" src={image} alt="" />
                    </div>
                    <div>
                        <h2 className="lg:text-2xl text-xl font-bold text-gray-800 mb-2">{titleName}</h2>
                        <p className="lg:text-base text-sm text-gray-500">{city}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Feedback;
