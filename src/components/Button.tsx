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
  disabled?: boolean
  onClick?: () => void
}

const ButtonBase: ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (
  { icon, title, variant = 'default', disabled = false, onClick, ...rest },
  ref,
) => {
  return (
    <button
      className={clsx(
        'flex h-14 items-center justify-center gap-2 rounded-lg text-white transition-colors',
        {
          'w-14': !title,
          'w-full': title,
          'bg-blue-500 hover:bg-blue-600': variant === 'default',
          'bg-green-500 hover:bg-green-600': variant === 'save',
          'cursor-not-allowed opacity-75': disabled === true,
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
