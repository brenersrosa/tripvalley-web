import { Hero } from "../components/home/Hero";
import { HeaderUser } from "../components/home/HeaderUser";
import { Title } from "../components/Title";
import { Carousel } from "../components/Carousel";

export function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 ">
      <HeaderUser></HeaderUser>
      <Hero></Hero>
      <div>
      <Title title="Categorias"></Title>
      <Carousel></Carousel>
      </div>
      <div className="h-[200px]">

      </div>
    </div>
  );
}
