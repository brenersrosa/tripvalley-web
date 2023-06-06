import { Buildings, Package, User } from 'phosphor-react'

import logo from '../assets/logo-short.svg'
import { ActiveLink } from './ActiveLink'

export function NavBar() {
  return (
    <div className="flex h-full w-20 flex-col justify-between">
      <img src={logo} alt="TRIPvalley logo" className="h-20 w-20 bg-blue-500" />
      <div className="flex h-full w-full flex-col justify-center gap-8 bg-zinc-900">
        <ActiveLink
          icon={<Buildings size={24} className="text-white" />}
          link="/accommodations"
          active
        />

        <ActiveLink
          icon={<Package size={24} className="text-white" />}
          link="/packages"
        />

        <ActiveLink
          icon={<User size={24} className="text-white" />}
          link="/profile"
        />
      </div>
    </div>
  )
}
