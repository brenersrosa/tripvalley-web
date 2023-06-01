import { Hero } from "../components/home/Hero";
import { HeaderUser } from "../components/home/HeaderUser";
import { Title } from "../components/Title";
import { Carousel } from "../components/Carousel";
import { Feedback } from "../components/home/feedbackCards";

export function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 ">
      <HeaderUser></HeaderUser>
      <Hero></Hero>
      <div>
        <Title title="Categorias"></Title>
        <Carousel></Carousel>
      </div>
      <div className="h-10"></div>
      <div className="flex justify-center">
        <img className="w-11/12" src="/src/assets/background/backgroundPin.png" alt="imagem de uma van na esquerda e um caminho tracejado simulando uma rota e no final uma bolinha azul sinalizando o destino final"/>
      </div>
      <div className="h-10"></div>
      <div>
        <Title title="Feedbacks"></Title>
        <div className="flex flex-col gap-4 md:flex-row">
          <Feedback
            desc="A Trip Valley superou minhas expectativas! Tudo foi muito bem planejado e organizado, o atendimento foi excelente e as opções de passeios foram incríveis. Recomendo muito!"
            image="/src/assets/feedback/profile-C.png"
            titleName="Carlos Alberto"
            city="Aparecida do Norte • SP"
          ></Feedback>
          <Feedback
            desc="Ótima experiência com a Trip Valley, tudo muito organizado e bem planejado. Atendimento excelente da equipe da Trip Valley, opções de passeios incríveis e preços justos"
            image="/src/assets/feedback/profile-A.png"
            titleName="Bruna Cristina"
            city="Cunha • SP"
          ></Feedback>
          <Feedback
            desc="Ameii viajar com a Trip Valley!! A agência é muito atenciosa e se preocupou em conhecer e meus interesses e necessidades para oferecer o melhor roteiro de viagem possível. "
            image="/src/assets/feedback/profile-B.png"
            titleName="Ana Maria"
            city="Ubatuba • SP"
          ></Feedback>
        </div>
      </div>
    </div>
  );
}
