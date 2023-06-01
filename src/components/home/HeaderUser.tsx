import { useState } from 'react';
import { Link } from 'react-router-dom'
import { List, Package, Handbag, Phone, ThumbsUp } from 'phosphor-react';
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent } from '@radix-ui/react-dropdown-menu';

export function HeaderUser() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="fixed h-[40px] md:h-[90px] px-[100px] top-0 left-0 w-full bg-black bg-opacity-60 flex items-center justify-between text-gray-50 z-10">
            <div className="flex items-center select-none">
                <h1 className="text-xl md:text-4xl font-bold text-blue-500">TRIP<span className='text-white text-base md:text-2xl'>valley</span></h1>
            </div>
            <div className="flex items-center md:hidden">
                <DropdownMenu onOpenChange={(open) => setIsMobileMenuOpen(open)}>
                    <DropdownMenuTrigger className="text-gray-50 cursor-pointer" onClick={toggleMobileMenu}>
                        <List size={24} />
                    </DropdownMenuTrigger>
                    {isMobileMenuOpen && (
                        <DropdownMenuContent className="relative top-2 shadow-md  w-screen items-center flex flex-col bg-black bg-opacity-60 px-4 py-4 pb-4 text-gray-50">
                            <div className='gap-2 flex flex-col justify-center'>
                                <DropdownMenuItem onSelect={() => window.location.href = 'https://example.com'} className="text-gray-50 flex flex-row">
                                    <ThumbsUp className="mr-2 my-auto" size={18} />
                                    Vantagens
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => window.location.href = 'https://example.com'} className="text-gray-50 flex flex-row">
                                    <Package className="mr-2 my-auto" size={18} />
                                    Pacotes
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => window.location.href = 'https://example.com'} className="text-gray-50 flex flex-row">
                                    <Handbag className="mr-2 my-auto" size={18} />
                                    Serviços
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => window.location.href = 'https://example.com'} className="text-gray-50 flex flex-row">
                                    <Phone className="mr-2 my-auto" size={18} />
                                    Contatos
                                </DropdownMenuItem>
                            </div>
                        </DropdownMenuContent>
                    )}
                </DropdownMenu>
            </div>
            <div className="hidden md:flex items-center">
                <Link to="#" className="text-gray-50 px-4 py-2 font-semibold">
                    Vantagens
                </Link>
                <Link to="" className="text-gray-50 px-4 py-2 font-semibold">
                    Pacotes
                </Link>
                <Link to="#" className="text-gray-50 px-4 py-2 font-semibold">
                    Serviços
                </Link>
                <Link to="#" className="text-gray-50 px-4 py-2 font-semibold">
                    Contatos
                </Link>
                <Link to="/signin" className="px-12 py-3 ml-4 rounded-lg bg-blue-500 text-gray-50 font-semibold hover:bg-blue-600 transition">
                    Entrar
                </Link>
            </div>
        </nav>
    );
}
