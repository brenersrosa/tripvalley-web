import { Quotes } from 'phosphor-react'

interface feedbackCardsProps {
  feedback: string
  name: string
  city: string
  image: string
}

export function Feedback({ feedback, name, city, image }: feedbackCardsProps) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border-[1px] border-gray-300 bg-white p-7">
      <Quotes className="text-gray-300" size={80} weight="fill" />
      <p className="leading-relaxed text-gray-700">{feedback}</p>
      <hr className="rounded-full border-gray-400" />
      <div className="flex flex-row items-center gap-4">
        <img className="w-16 rounded-full" src={image} alt="" />
        <div className="flex flex-col justify-center gap-2">
          <h2 className="font-title text-2xl font-bold text-gray-800 lg:text-2xl">
            {name}
          </h2>
          <p className="text-sm text-gray-600 lg:text-base">{city}</p>
        </div>
      </div>
    </div>
  )
}
