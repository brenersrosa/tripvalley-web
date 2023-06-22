import { CaretLeft, CaretRight } from 'phosphor-react'
import { useEffect, useState } from 'react'
import Slider from 'react-slick'

import { CardTendencies } from './CardTendencies'
import { SliderArrow } from './SliderArrow'

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
        let totalValue = 0
        return pkg.itineraries.map((ite, index) => {
          if (index === 0) {
            const { breakfast, lunch, dinner } = ite.itinerary.accommodation
            pkg.itineraries.forEach((ite) => {
              const { valuePerPerson, numberOfDays } = ite.itinerary
              const { dailyValue } = ite.itinerary.accommodation

              // Cálculo da soma dos valores dos itinerários
              totalValue +=
                // @ts-ignore
                parseFloat(valuePerPerson) + dailyValue * numberOfDays
            })

            return (
              <CardTendencies
                key={pkg.id}
                id={pkg.id}
                name={pkg.name}
                imagePath={pkg.imagePath}
                transferShared={pkg.transferShared}
                transferParticular={pkg.transferParticular}
                transferExclusive={pkg.transferExclusive}
                breakfast={breakfast}
                lunch={lunch}
                dinner={dinner}
                // @ts-ignore
                packageValue={totalValue}
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
