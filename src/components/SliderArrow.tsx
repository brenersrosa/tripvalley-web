import clsx from 'clsx'
import { ReactNode } from 'react'

interface sliderArrowProps {
  icon: ReactNode
  direction: 'left' | 'right'
  onClick?: () => void
}

export function SliderArrow({ icon, direction, onClick }: sliderArrowProps) {
  return (
    <button
      className={clsx('absolute z-50 h-full', {
        '-left-16': direction === 'left',
        '-right-16': direction === 'right',
      })}
      onClick={onClick}
    >
      {icon}
    </button>
  )
}
