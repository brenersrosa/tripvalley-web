import clsx from 'clsx'
import {
  ButtonHTMLAttributes,
  ForwardRefRenderFunction,
  ReactNode,
  forwardRef,
} from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode
  title?: string
  variant?: 'default' | 'save'
  onClick?: () => void
}

const ButtonBase: ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (
  // @ts-ignore
  { icon, title, variant = 'default', onClick, ...rest },
  ref,
) => {
  return (
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
  )
}

export const Button = forwardRef(ButtonBase)
