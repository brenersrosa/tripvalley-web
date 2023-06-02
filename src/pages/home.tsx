import { Hero } from "../components/home/Hero";
import { HeaderUser } from "../components/home/HeaderUser";
import { Title } from "../components/Title";
import { Carousel } from "../components/Carousel";
import { Feedback } from "../components/home/feedbackCards";
import { Input } from "../components/form/Input";
import Newsletter from "../assets/background/newsletter.svg";


export function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <HeaderUser />
        <Hero />

        <div className="mt-10">
          <Title title="Categorias" />
          <Carousel />
        </div>

        <div className="my-10">
          <div className="flex justify-center">
            <img
              className="w-full"
              src="/src/assets/background/backgroundPin.png"
              alt="imagem de uma van na esquerda e um caminho tracejado simulando uma rota e no final uma bolinha azul sinalizando o destino final"
            />
          </div>
        </div>

        <div className="my-10">
          <Title title="Feedbacks" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Feedback
              desc="A Trip Valley superou minhas expectativas! Tudo foi muito bem planejado e organizado, o atendimento foi excelente e as opções de passeios foram incríveis. Recomendo muito!"
              image="/src/assets/feedback/profile-C.png"
              titleName="Carlos Alberto"
              city="Aparecida do Norte • SP"
            />
            <Feedback
              desc="Ótima experiência com a Trip Valley, tudo muito organizado e bem planejado. Atendimento excelente da equipe da Trip Valley, opções de passeios incríveis e preços justos"
              image="/src/assets/feedback/profile-A.png"
              titleName="Bruna Cristina"
              city="Cunha • SP"
            />
            <Feedback
              desc="Ameii viajar com a Trip Valley!! A agência é muito atenciosa e se preocupou em conhecer e meus interesses e necessidades para oferecer o melhor roteiro de viagem possível. "
              image="/src/assets/feedback/profile-B.png"
              titleName="Ana Maria"
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
          <div className="absolute left-0 top-0 w-full p-4 text-white">
            <h2 className="text-sm font-bold">
              Inscreva-se e fique atualizado!
            </h2>
            <p className="text-xs font-normal">
              Receba atualizações e as melhores ofertas no seu e-mail.
            </p>
            <Input
              inputType="email"
              placeholder="Insira seu melhor e-mail"
              autoFocus
            />
          </div>
        </div>

        <div className="h-200" />
      </div>
    </>
  );
}
