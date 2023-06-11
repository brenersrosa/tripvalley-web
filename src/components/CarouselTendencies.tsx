import { useEffect, useState } from 'react'
import { CaretLeft, CaretRight } from 'phosphor-react'
import Slider from 'react-slick'

import { SliderArrow } from './SliderArrow'
import { CardTendencies } from './CardTendencies'

import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

import { PackageProps } from '../@types/Package'
import { api } from '../lib/api'

export function CarouselTendencies() {
  const [packages, setPackages] = useState<PackageProps[]>([])

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

  const sliderSettings = {
    arrows: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: false,
    prevArrow: <SliderArrow direction="left" icon={<CaretLeft size={48} />} />,
    nextArrow: (
      <SliderArrow direction="right" icon={<CaretRight size={48} />} />
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          slidesToShow: 1,
        },
      },
    ],
  }

  return (
    <Slider className="flex flex-col" {...sliderSettings}>
      {packages.map((pkg) => {
        return pkg.itineraries.map((ite, index) => {
          if (index === 0) {
            return (
              <CardTendencies
                key={pkg.id}
                name={pkg.name}
                imagePath={ite.itinerary.accommodation.imagePath}
                transferShared={pkg.transferShared}
                transferParticular={pkg.transferParticular}
                breakfast={ite.itinerary.accommodation.breakfast}
                lunch={ite.itinerary.accommodation.lunch}
                dinner={ite.itinerary.accommodation.dinner}
                valuePerPerson={ite.itinerary.valuePerPerson}
                numberOfDays={ite.itinerary.numberOfDays}
                city={ite.itinerary.accommodation.city}
              />
            )
          }
          return null
        })
      })}
    </Slider>
  )
}
