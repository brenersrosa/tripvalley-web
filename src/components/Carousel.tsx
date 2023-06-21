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
      'Explore uma jornada espiritual e mergulhe na rica história religiosa deste circuito. Descubra santuários, templos e locais sagrados que irão inspirar sua fé e proporcionar momentos de reflexão profunda.',
  },
  {
    id: 2,
    title: 'Vale histórico',
    imagePath: 'src/assets/carousel/image-1.svg',
    description:
      'Viaje de volta no tempo e descubra as raízes históricas deste belo vale. Explore cidades encantadoras, casarões coloniais e monumentos que contam a história fascinante dessa região, mergulhando em sua herança cultural.',
  },
  {
    id: 3,
    title: 'Serra da Mantiqueira',
    imagePath: 'src/assets/carousel/image-4.svg',
    description:
      'Encante-se com a majestosa Serra da Mantiqueira, um paraíso para os amantes da natureza. Explore trilhas deslumbrantes, cachoeiras exuberantes e desfrute de vistas panorâmicas deslumbrantes em meio a essa cadeia montanhosa.',
  },
  {
    id: 4,
    title: 'Rios do Vale',
    imagePath: 'src/assets/carousel/image-2.svg',
    description:
      'Deixe-se envolver pela serenidade dos rios que cruzam essa região. Desfrute de passeios de barco, pesca tranquila e momentos relaxantes junto às margens desses cursos d água encantadores, conectando-se com a natureza em sua forma mais pura.',
  },
  {
    id: 5,
    title: 'Litoral Norte',
    imagePath: 'src/assets/carousel/image-3.svg',
    description:
      'Relaxe nas praias paradisíacas e aproveite o sol no vibrante Litoral Norte. Desfrute de paisagens deslumbrantes, mergulhos refrescantes no mar e atividades aquáticas emocionantes, tornando suas férias memoráveis e cheias de diversão.',
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
