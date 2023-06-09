import { useEffect, useState } from 'react'
import { CaretLeft, CaretRight } from 'phosphor-react'
import Slider from 'react-slick'

import { SliderArrow } from './SliderArrow'
import { CardTendencies } from './CardTendencies'

import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

import { api } from '../lib/api'

interface Package {
  id: string
  name: string
  transferParticular: number
  transferShared: number
}

export function CarouselTendencies() {
  const [packages, setPackages] = useState<Package[]>([])

  useEffect(() => {
    api
      .get('/packages')
      .then((response) => {
        setPackages(response.data)
      })
      .catch((error) => {
        console.log('Error getting packages.', error)
      })
  }, [])

  const settings = {
    arrows: true,
    slidesToShow: 1, // Altere o número de slides a serem exibidos em dispositivos desktop
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
    <Slider className="mx-5 flex flex-col md:mx-10 lg:mx-40" {...settings}>
      {packages.map((pkg) => {
        return (
          <CardTendencies
            key={pkg.id}
            name={pkg.name}
            transferParticular={pkg.transferParticular}
            transferShared={pkg.transferShared}
          />
        )
      })}
    </Slider>
  )
}
