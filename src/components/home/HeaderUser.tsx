import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu'
import { Handbag, List, Package, Phone, ThumbsUp } from 'phosphor-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export function HeaderUser() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }
  return (
    <nav className="fixed right-0 top-0 z-50 flex h-[40px] w-full  items-center justify-between border-b bg-black bg-opacity-60 px-5 text-gray-50 shadow-lg md:h-[90px] md:border-b-0 md:px-10 lg:px-40">
      <div className="flex select-none items-center">
        <a href="/" className="text-xl font-bold text-blue-500 md:text-4xl">
          TRIP<span className="text-base text-white md:text-2xl">valley</span>
        </a>
      </div>
      <div className="flex items-center md:hidden">
        <DropdownMenu onOpenChange={(open) => setIsMobileMenuOpen(open)}>
          <DropdownMenuTrigger
            className="cursor-pointer text-gray-50"
            onClick={toggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
          >
            <List size={24} />
          </DropdownMenuTrigger>
          {isMobileMenuOpen && (
            <DropdownMenuContent className="relative top-2 flex  w-screen flex-col items-center bg-black bg-opacity-60 px-4 py-4 pb-4 text-gray-50 shadow-md">
              <div className="flex flex-col justify-center gap-2">
                <DropdownMenuItem
                  onSelect={() =>
                    (window.location.href = 'https://example.com')
                  }
                  className="flex flex-row text-gray-50"
                  aria-label="Botão para navegar até a página Vantagens"
                >
                  <ThumbsUp className="my-auto mr-2" size={18} />
                  Vantagens
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() =>
                    (window.location.href = 'https://example.com')
                  }
                  className="flex flex-row text-gray-50"
                  aria-label="Botão para navegar até a página Pacotes"
                >
                  <Package className="my-auto mr-2" size={18} />
                  Pacotes
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() =>
                    (window.location.href = 'https://example.com')
                  }
                  className="flex flex-row text-gray-50"
                  aria-label="Botão para navegar até a página Serviços"
                >
                  <Handbag className="my-auto mr-2" size={18} />
                  Serviços
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() =>
                    (window.location.href = 'https://example.com')
                  }
                  className="flex flex-row text-gray-50"
                  aria-label="Botão para navegar até a página Contatos"
                >
                  <Phone className="my-auto mr-2" size={18} />
                  Contatos
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          )}
        </DropdownMenu>
      </div>
      <div className="hidden items-center md:flex ">
        <a
          href="#vantagem"
          className="px-4 py-2 font-semibold text-gray-50 transition hover:text-blue-500"
          aria-label="Botão para navegar até a página Vantagens"
        >
          Vantagens
        </a>
        <a
          href="#pacotes"
          className="px-4 py-2 font-semibold text-gray-50 transition hover:text-blue-500"
          aria-label="Botão para navegar até a página Pacotes"
        >
          Pacotes
        </a>
        <a
          href="#"
          className="px-4 py-2 font-semibold text-gray-50 transition hover:text-blue-500"
          aria-label="Botão para navegar até a página Serviços"
        >
          Serviços
        </a>
        <a
          href="#contato"
          className="px-4 py-2 font-semibold text-gray-50 transition hover:text-blue-500"
          aria-label="Botão para navegar até a página Contatos"
        >
          Contatos
        </a>
        <Link
          to="/signin"
          className="ml-4 rounded-lg bg-blue-500 px-12 py-3 font-semibold text-gray-50 transition hover:bg-blue-600"
          aria-label="Botão para navegar até a página de Login"
        >
          Entrar
        </Link>
      </div>
    </nav>
  )
}
