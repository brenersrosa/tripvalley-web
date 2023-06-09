import { CaretRight } from 'phosphor-react'
import { Button } from '../components/Button'
import { Carousel } from '../components/Carousel'
import { Title } from '../components/Title'
import { Input } from '../components/form/Input'
import { CarouselTendencies } from '../components/CarouselTendencies'
import { Feedback } from '../components/home/Feedback'
import { HeaderUser } from '../components/home/HeaderUser'
import { Hero } from '../components/home/Hero'
import { Footer } from '../components/Footer'

export function Home() {
  return (
    <div className="flex w-full flex-col gap-16 bg-gray-100 md:gap-24">
      <HeaderUser />
      <Hero />

      <div className="flex flex-col gap-12 px-5 md:px-10 lg:px-40">
        <Title title="Categorias" />
        <Carousel />
      </div>

      <div className="flex flex-col gap-12 px-5 md:px-10 lg:px-40">
        <Title title="Tendências" />
      </div>
      <CarouselTendencies />

      <div className="flex flex-col gap-12 px-5 md:px-10 lg:px-40">
        <Title title="Feedback dos clientes" />
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <Feedback
            feedback="A Trip Valley superou minhas expectativas! Tudo foi muito bem planejado e organizado, o atendimento foi excelente e as opções de passeios foram incríveis. Recomendo muito!"
            image="src/assets/feedback/profile-C.svg"
            name="Carlos Alberto"
            city="Aparecida do Norte • SP"
          />
          <Feedback
            feedback="Ótima experiência com a Trip Valley, tudo muito organizado e bem planejado. Atendimento excelente da equipe da Trip Valley, opções de passeios incríveis e preços justos"
            image="src/assets/feedback/profile-B.svg"
            name="João Pedro"
            city="Cunha • SP"
          />
          <Feedback
            feedback="Ameii viajar com a Trip Valley!! A agência é muito atenciosa e se preocupou em conhecer e meus interesses e necessidades para oferecer o melhor roteiro de viagem possível. "
            image="src/assets/feedback/profile-A.svg"
            name="Ana Maria"
            city="Ubatuba • SP"
          />
        </div>
      </div>

      <div className="flex flex-col gap-12 bg-locations bg-cover bg-no-repeat px-5 py-6 md:px-10 md:py-12 lg:px-40 lg:py-24">
        <h3 className="font-title text-3xl font-bold text-gray-50 md:text-6xl">
          Inscreva-se e fique atualizado
        </h3>
        <span
          className="text-base text-gray-100 md:text-xl"
          aria-label="Inscreva-se e fique atualizado, ao adicionar seu e-mail ao campo abaixo, vamos enviar emails com novidades sobre o TRIPvalley"
        >
          Receba todas atualizações e as melhores ofertas em seu e-mail.
        </span>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="col-span-1 md:col-span-2">
            <Input
              inputType="email"
              placeholder="Insira seu melhor e-mail"
              aria-label="Campo para ser digitado seu e-mail"
            />
          </div>
          <Button
            aria-label="Botão para confirmar o email, após confirmar vamos enviar emails para o seu email com novidades"
            icon={<CaretRight size={24} />}
            title="Inscreva-se"
          />
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}
