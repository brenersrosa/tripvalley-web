import { CaretLeft, CaretRight } from 'phosphor-react'
import Slider from 'react-slick'

import { SliderArrow } from './SliderArrow'

import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

const sliderData = [
  {
    id: 1,
    title: 'Circuito Religioso',
    imagePath: '../src/assets/carousel/image-2.svg',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    id: 2,
    title: 'Vale histórico',
    imagePath: 'src/assets/carousel/image-1.svg',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    id: 3,
    title: 'Serra da Mantiqueira',
    imagePath: 'src/assets/carousel/image-4.svg',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    id: 4,
    title: 'Rios do Vale',
    imagePath: 'src/assets/carousel/image-2.svg',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    id: 5,
    title: 'Litoral Norte',
    imagePath: 'src/assets/carousel/image-3.svg',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
]

export function Carousel() {
  const settings = {
    arrows: true,
    slidesToShow: 3, // Altere o número de slides a serem exibidos em dispositivos desktop
    slidesToScroll: 1,
    infinite: true,
    prevArrow: <SliderArrow direction="left" icon={<CaretLeft size={48} />} />,
    nextArrow: (
      <SliderArrow direction="right" icon={<CaretRight size={48} />} />
    ),
    responsive: [
      {
        breakpoint: 1024, // Defina o ponto de interrupção para dispositivos desktop (exemplo: 1024px)
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768, // Defina o ponto de interrupção para tablets (exemplo: 768px)
        settings: {
          arrows: false,
          slidesToShow: 1,
        },
      },
    ],
  }

  return (
    <Slider className="flex w-full" {...settings}>
      {sliderData.map((category) => (
        <div
          key={category.id}
          className="w-full items-center justify-center pr-2 text-center md:pr-6"
        >
          <img
            src={category.imagePath}
            alt=""
            className="w-full rounded-lg border-[1px] border-gray-300"
          />
          <h3 className="my-4 font-title text-xl font-semibold leading-tight text-gray-800">
            {category.title}
          </h3>
          <p className="w-full px-2 leading-relaxed text-gray-700">
            {category.description}
          </p>
        </div>
      ))}
    </Slider>
  )
}
