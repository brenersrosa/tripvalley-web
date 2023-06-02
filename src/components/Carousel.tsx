import { CaretLeft, CaretRight } from 'phosphor-react'
import Slider from 'react-slick'

import { SliderArrow } from './SliderArrow'

import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

const sliderData = [
  {
    id: 1,
    title: 'Circuito Religioso',
    imagePath: 'src/assets/carousel/image-2.png',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    id: 2,
    title: 'Vale histórico',
    imagePath: 'src/assets/carousel/image-2.png',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    id: 3,
    title: 'Serra da Mantiqueira',
    imagePath: 'src/assets/carousel/image-2.png',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    id: 4,
    title: 'Rios do Vale',
    imagePath: 'src/assets/carousel/image-2.png',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    id: 5,
    title: 'Litoral Norte',
    imagePath: 'src/assets/carousel/image-2.png',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
]

export function Carousel() {
  const settings = {
    arrows: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    prevArrow: <SliderArrow direction="left" icon={<CaretLeft size={48} />} />,
    nextArrow: (
      <SliderArrow direction="right" icon={<CaretRight size={48} />} />
    ),
  }

  return (
    <Slider className="flex w-full" {...settings}>
      {sliderData.map((category) => (
        <div
          key={category.id}
          className="w-full items-center justify-center pr-6 text-center"
        >
          <img
            src="src/assets/carousel/image-2.png"
            alt=""
            className="w-full rounded-lg border-[1px] border-gray-300"
          />
          <h3 className="my-4 font-title text-xl font-semibold leading-tight text-gray-800">
            {category.title}
          </h3>
          <p className="w-full px-2 leading-relaxed text-gray-700">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </div>
      ))}
    </Slider>
  )
}
