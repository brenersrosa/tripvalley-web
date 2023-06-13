import clsx from 'clsx'
import {
  ForwardRefRenderFunction,
  ReactNode,
  TextareaHTMLAttributes,
  forwardRef,
} from 'react'
import { FieldError } from 'react-hook-form'

interface MultilineInputProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  title?: string
  icon?: ReactNode
  error?: FieldError
}

const MultilineInputBase: ForwardRefRenderFunction<
  HTMLTextAreaElement,
  MultilineInputProps
> = ({ title, icon, error = null, ...rest }, ref) => {
  return (
    <div className="flex w-full flex-col gap-4">
      {title && <span className="text-gray-600">{title}</span>}
      <div
        className={clsx(
          'relative flex items-center rounded-lg border-[1px] border-gray-300 focus-within:border-blue-500',
          {
            'focus-within:border-red-500': error?.message,
          },
        )}
      >
        <textarea
          className="h-full w-full resize-none rounded-lg bg-white px-4 py-3 text-gray-600 placeholder-gray-400 focus:outline-none"
          rows={4}
          ref={ref}
          {...rest}
        />
      </div>

      {!!error && <span className="text-red-500">{error.message}</span>}
    </div>
  )
}

export const MultilineInput = forwardRef(MultilineInputBase)
