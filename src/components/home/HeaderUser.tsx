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
    <nav className="fixed left-0 top-0 z-10 flex h-[40px] w-full items-center justify-between bg-black bg-opacity-60 px-[100px] text-gray-50 md:h-[90px]">
      <div className="flex select-none items-center">
        <h1 className="text-xl font-bold text-blue-500 md:text-4xl">
          TRIP<span className="text-base text-white md:text-2xl">valley</span>
        </h1>
      </div>
      <div className="flex items-center md:hidden">
        <DropdownMenu onOpenChange={(open) => setIsMobileMenuOpen(open)}>
          <DropdownMenuTrigger
            className="cursor-pointer text-gray-50"
            onClick={toggleMobileMenu}
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
                >
                  <ThumbsUp className="my-auto mr-2" size={18} />
                  Vantagens
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() =>
                    (window.location.href = 'https://example.com')
                  }
                  className="flex flex-row text-gray-50"
                >
                  <Package className="my-auto mr-2" size={18} />
                  Pacotes
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() =>
                    (window.location.href = 'https://example.com')
                  }
                  className="flex flex-row text-gray-50"
                >
                  <Handbag className="my-auto mr-2" size={18} />
                  Serviços
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() =>
                    (window.location.href = 'https://example.com')
                  }
                  className="flex flex-row text-gray-50"
                >
                  <Phone className="my-auto mr-2" size={18} />
                  Contatos
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          )}
        </DropdownMenu>
      </div>
      <div className="hidden items-center md:flex">
        <Link to="#" className="px-4 py-2 font-semibold text-gray-50">
          Vantagens
        </Link>
        <Link to="" className="px-4 py-2 font-semibold text-gray-50">
          Pacotes
        </Link>
        <Link to="#" className="px-4 py-2 font-semibold text-gray-50">
          Serviços
        </Link>
        <Link to="#" className="px-4 py-2 font-semibold text-gray-50">
          Contatos
        </Link>
        <Link
          to="/signin"
          className="ml-4 rounded-lg bg-blue-500 px-12 py-3 font-semibold text-gray-50 transition hover:bg-blue-600"
        >
          Entrar
        </Link>
      </div>
    </nav>
  )
}
