import {
  Envelope,
  FacebookLogo,
  InstagramLogo,
  Phone,
  TwitterLogo,
  WhatsappLogo,
  YoutubeLogo,
} from 'phosphor-react'
import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="border-t-2 px-5 py-6 sm:px-6 lg:mx-0">
      <div className="mx-5 grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-4 md:mx-10 md:grid-cols-12 lg:mx-40 lg:grid-cols-12">
        <div className="col-span-1 flex md:col-span-3 md:items-start lg:col-span-3 lg:items-center">
          <span className="text-2xl font-bold text-blue-500 md:text-4xl">
            TRIP
            <span className="text-lg font-bold text-gray-500 md:text-3xl">
              valley
            </span>
          </span>
        </div>
        <div className="col-span-1 md:col-span-3 lg:col-span-3">
          <h3 className="font-bold text-gray-800">TRIPvalley</h3>
          <ul className="mt-2 space-y-2">
            <li>
              <Link to="/" className="text-gray-800 hover:text-blue-500">
                Sobre nós
              </Link>
            </li>
            <li>
              <Link to="/" className="text-gray-800 hover:text-blue-500">
                Seja um parceiro
              </Link>
            </li>
            <li>
              <Link to="/" className="text-gray-800 hover:text-blue-500">
                Trabalhe conosco
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-span-1 md:col-span-3 lg:col-span-3">
          <h3 className="font-bold text-gray-800">Centrais de Atendimento</h3>
          <ul className="mt-2 space-y-2">
            <li className="flex items-center">
              <Phone
                className="mr-2 text-gray-800 md:h-6 md:w-8"
                weight="regular"
              />
              <span className="text-gray-800">+55 (11) 1234-5678</span>
            </li>
            <li className="flex items-center">
              <WhatsappLogo
                className="mr-2 text-gray-800  md:h-6 md:w-8"
                weight="regular"
              />
              <span className="text-gray-800">+55 (11) 98765-4321</span>
            </li>
            <li className="flex items-center">
              <Envelope
                className="mr-2 text-gray-800  md:h-6 md:w-8"
                weight="regular"
              />
              <span className="text-gray-800">contato@tripvalley.com</span>
            </li>
          </ul>
        </div>
        <div className="col-span-1 md:col-span-3 lg:col-span-3">
          <h3 className="font-bold text-gray-800">Siga nossas redes</h3>
          <div className="mt-2 flex">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mr-2 text-gray-800"
            >
              <InstagramLogo
                weight="regular"
                className="h-6 sm:h-8 md:h-10 md:w-8"
              />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mr-2 text-gray-800"
            >
              <FacebookLogo
                weight="regular"
                className="h-6 sm:h-8 md:h-10 md:w-8"
              />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mr-2 text-gray-800"
            >
              <TwitterLogo
                weight="regular"
                className="h-6 sm:h-8 md:h-10 md:w-8"
              />
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800"
            >
              <YoutubeLogo
                weight="regular"
                className="h-6 sm:h-8 md:h-10 md:w-8"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
