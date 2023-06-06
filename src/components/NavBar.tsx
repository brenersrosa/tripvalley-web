import { Buildings, Package, User } from 'phosphor-react'

import logo from '../assets/logo-short.svg'

export function NavBar() {
  return (
    <div className="flex h-full w-20 flex-col justify-between">
      <img src={logo} alt="TRIPvalley logo" className="h-20 w-20 bg-blue-500" />
      <div className="flex h-full w-full flex-col justify-center gap-8 bg-zinc-900">
        <div className="flex w-full cursor-pointer items-center justify-center py-4 hover:bg-zinc-800">
          <a href="/accommodations">
            <Buildings size={24} className="text-white" />
          </a>
        </div>
        <div className="flex h-14 w-full cursor-pointer items-center justify-center hover:bg-zinc-800">
          <a href="/packages">
            <Package size={24} className="text-white" />
          </a>
        </div>
        <div className="flex h-14 w-full cursor-pointer items-center justify-center hover:bg-zinc-800">
          <a href="/profile">
            <User size={24} className="text-white" />
          </a>
        </div>
      </div>
    </div>
  )
}
