import { CaretLeft, CaretRight } from 'phosphor-react'
import Slider from 'react-slick'

import { SliderArrow } from './SliderArrow'
import { CardMain } from './CardMain' // Importe o componente CardMain aqui

import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

const sliderData = [
  {
    id: 1,
    imagePath: '../src/assets/carousel/image-3.svg',
    title: 'Conheça Ubachuva!',
    subtitle: 'Ubatuba • SP',
    priceDiscount: '1.150,00',
    discountTag: '15% de desconto',
    price: '1.000,00',
    days: 7,
    food: ['Café da manhã', 'Almoço', 'Jantar'],
    transferType: ['Comunitário', 'Paticular'],
  },
  {
    id: 2,
    imagePath: '../src/assets/carousel/image-3.svg',
    title: 'Conheça Ubachuva!',
    subtitle: 'Ubatuba • SP',
    priceDiscount: '1.150,00',
    discountTag: '15% de desconto',
    price: '1.000,00',
    days: 7,
    food: ['Café da manhã', 'Almoço'],
    transferType: ['Comunitário', 'Paticular'],
  },
  {
    id: 3,
    imagePath: '../src/assets/carousel/image-3.svg',
    title: 'Conheça Ubachuva!',
    subtitle: 'Ubatuba • SP',
    priceDiscount: '1.150,00',
    discountTag: '15% de desconto',
    price: '1.000,00',
    days: 7,
    food: ['Café da manhã'],
    transferType: ['Comunitário', 'Paticular'],
  },
  {
    id: 4,
    imagePath: '../src/assets/carousel/image-3.svg',
    title: 'Conheça Ubachuva!',
    subtitle: 'Ubatuba • SP',
    priceDiscount: '1.150,00',
    discountTag: '15% de desconto',
    price: '1.000,00',
    days: 7,
    food: ['Café da manhã'],
    transferType: ['Comunitário'],
  },
]

export function CarouselMain() {
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
    <Slider className="mx-5 flex md:mx-10 lg:mx-40" {...settings}>
      {sliderData.map((reserveCard) => (
        <div key={reserveCard.id}>
          <CardMain
            imagePath={reserveCard.imagePath}
            title={reserveCard.title}
            subtitle={reserveCard.subtitle}
            priceDiscount={reserveCard.priceDiscount}
            discountTag={reserveCard.discountTag}
            price={reserveCard.price}
            days={reserveCard.days}
            food={reserveCard.food}
            transferType={reserveCard.transferType}
          />
        </div>
      ))}
    </Slider>
  )
}
