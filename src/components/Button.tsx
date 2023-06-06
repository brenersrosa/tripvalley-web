import clsx from 'clsx'
import { ReactNode } from 'react'

interface ButtonProps {
  icon?: ReactNode
  title?: string
  onClick?: () => void
}
export function Button({ icon, title, onClick }: ButtonProps) {
  return (
    <>
      <button
        className={clsx(
          'flex h-14 items-center justify-center gap-2 rounded-lg bg-blue-500 text-white transition-colors hover:bg-blue-600',
          {
            'w-14': !title,
            'w-full': title,
          },
        )}
        onClick={onClick}
      >
        {icon}
        {title}
      </button>
    </>
  )
}
