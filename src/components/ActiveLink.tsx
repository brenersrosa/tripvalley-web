import clsx from 'clsx'
import { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

interface ActiveLinkProps {
  icon: ReactNode
  link: string
  active?: boolean
}

export function ActiveLink({ icon, link }: ActiveLinkProps) {
  const location = useLocation()

  const currentPage = location.pathname

  return (
    <a
      href={link}
      className={clsx(
        'justify-centers relative flex h-14 w-full cursor-pointer items-center justify-center before:absolute before:left-0 before:h-full before:w-[3px] before:rounded-r-lg hover:bg-zinc-800',
        { 'bg-black before:bg-blue-500': currentPage === link },
      )}
    >
      {icon}
    </a>
  )
}
