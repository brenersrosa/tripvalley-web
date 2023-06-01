import { Hero } from '../components/home/Hero'
import { HeaderUser } from "../components/home/HeaderUser";
export function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 ">
      <HeaderUser></HeaderUser>
      <Hero></Hero>
    </div>
  )
}
