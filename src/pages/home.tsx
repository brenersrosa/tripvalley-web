import Newsletter from '../assets/background/newsletter.svg'
import { Carousel } from '../components/Carousel'
import { Title } from '../components/Title'
import { Input } from '../components/form/Input'
import { HeaderUser } from '../components/home/HeaderUser'
import { Hero } from '../components/home/Hero'
import { Feedback } from '../components/home/feedbackCards'

export function Home() {
  return (
    <div className="flex flex-col gap-24 bg-gray-100">
      <HeaderUser />
      <Hero />

      <div className="flex flex-col gap-12 px-40">
        <Title title="Categorias" />
        <Carousel />
      </div>

      <div className="flex flex-col gap-12 px-40">
        <Title title="Feedback dos clientes" />
        <div className="grid grid-cols-3 gap-10">
          <Feedback
            feedback="A Trip Valley superou minhas expectativas! Tudo foi muito bem planejado e organizado, o atendimento foi excelente e as opções de passeios foram incríveis. Recomendo muito!"
            image="/src/assets/feedback/profile-C.png"
            name="Carlos Alberto"
            city="Aparecida do Norte • SP"
          />
          <Feedback
            feedback="Ótima experiência com a Trip Valley, tudo muito organizado e bem planejado. Atendimento excelente da equipe da Trip Valley, opções de passeios incríveis e preços justos"
            image="/src/assets/feedback/profile-A.png"
            name="Bruna Cristina"
            city="Cunha • SP"
          />
          <Feedback
            feedback="Ameii viajar com a Trip Valley!! A agência é muito atenciosa e se preocupou em conhecer e meus interesses e necessidades para oferecer o melhor roteiro de viagem possível. "
            image="/src/assets/feedback/profile-B.png"
            name="Ana Maria"
            city="Ubatuba • SP"
          />
        </div>
      </div>

      <div className="relative w-full">
        <img
          src={Newsletter}
          alt="foto de fundo com coqueiros e uma praia"
          className="w-full"
        />
        <div className="absolute left-0 top-2/4 w-full px-40 text-white">
          <h2 className="text-sm font-bold">Inscreva-se e fique atualizado!</h2>
          <p className="text-xs font-normal">
            Receba atualizações e as melhores ofertas no seu e-mail.
          </p>
          <Input inputType="email" placeholder="Insira seu melhor e-mail" />
        </div>
      </div>
    </div>
  )
}
