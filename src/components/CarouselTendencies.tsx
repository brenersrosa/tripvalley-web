import { useEffect, useState } from 'react'
import { CaretLeft, CaretRight } from 'phosphor-react'
import Slider from 'react-slick'

import { SliderArrow } from './SliderArrow'
import { CardTendencies } from './CardTendencies'

import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

import { api } from '../lib/api'

interface Itinerary {
  id: string
  itinerary: {
    accommodation: {
      id: string
      isActive: string
      imagePath: string
      name: string
      dailyValue: number
      breakfast: number
      lunch: number
      dinner: number
      // outras propriedades relacionadas à acomodação
    }
    numberOfDays: number
    // campo do itinerario onde puxa os dias e passar para o card
  }
}

interface Package {
  id: string
  name: string
  numberOfDays: number
  transferParticular: number
  transferShared: number
  itineraries: Itinerary[]
}

export function CarouselTendencies() {
  const [packages, setPackages] = useState<Package[]>([])

  useEffect(() => {
    api
      .get('/packages')
      .then((response) => {
        setPackages(response.data)
        console.log(response.data)
      })
      .catch((error) => {
        console.log('Error getting packages.', error)
      })
  }, [])

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
    <Slider className="flex flex-col" {...settings}>
      {packages.map((pkg) => {
        return pkg.itineraries.map((itinerary, index) => {
          if (index === 0) {
            return (
              <CardTendencies
                key={itinerary.id}
                imagePath={itinerary.itinerary.accommodation.imagePath}
                name={pkg.name}
                transferParticular={pkg.transferParticular}
                transferShared={pkg.transferShared}
                breakfast={itinerary.itinerary.accommodation.breakfast}
                lunch={itinerary.itinerary.accommodation.lunch}
                dinner={itinerary.itinerary.accommodation.dinner}
                numberOfDays={itinerary.itinerary.numberOfDays}
                dailyValue={itinerary.itinerary.accommodation.dailyValue}
              />
            )
          }
          return null
        })
      })}
    </Slider>
  )
}
