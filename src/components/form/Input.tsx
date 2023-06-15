import clsx from 'clsx'
import {
  EnvelopeSimple,
  Eye,
  EyeSlash,
  Lock,
  User,
  MapPin,
  Calendar,
  Buildings,
  CurrencyDollar,
  Users,
  UsersFour,
} from 'phosphor-react'
import {
  FormEvent,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  ReactNode,
  forwardRef,
  useState,
} from 'react'
import { FieldError } from 'react-hook-form'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  inputType?:
    | 'user'
    | 'email'
    | 'password'
    | 'destiny'
    | 'dateGo'
    | 'accommodations'
    | 'price'
    | 'adults'
    | 'children'
  title?: string
  icon?: ReactNode
  error?: FieldError
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { inputType, title, icon, error = null, ...rest },
  ref,
) => {
  const [showPassword, setShowPassword] = useState(false)

  function handleShowPassword(e: FormEvent) {
    e.preventDefault()
    setShowPassword(!showPassword)
  }

  return (
    <div className="flex w-full flex-col gap-4">
      {title && <span className="text-gray-600">{title}</span>}
      <div
        className={clsx(
          'relative flex h-14 items-center rounded-lg border-[1px] border-gray-300 focus-within:border-blue-500',
          {
            'focus-within:border-red-500': error?.message,
          },
        )}
      >
        {inputType && (
          <div className="flex h-full w-[70px] items-center justify-center rounded-l-lg border-r border-gray-200 bg-gray-100">
            {inputType === 'user' && (
              <User size={24} className="text-gray-500" />
            )}
            {inputType === 'email' && (
              <EnvelopeSimple size={24} className="text-gray-500" />
            )}
            {inputType === 'password' && (
              <Lock size={24} className="text-gray-500" />
            )}
            {inputType === 'destiny' && (
              <MapPin size={24} className="text-gray-500" />
            )}
            {inputType === 'dateGo' && (
              <Calendar size={24} className="text-gray-500" />
            )}
            {inputType === 'accommodations' && (
              <Buildings size={24} className="text-gray-500" />
            )}
            {inputType === 'price' && (
              <CurrencyDollar size={24} className="text-gray-500" />
            )}
            {inputType === 'adults' && (
              <Users size={24} className="text-gray-500" />
            )}
            {inputType === 'children' && (
              <UsersFour size={24} className="text-gray-500" />
            )}
            {icon}
          </div>
        )}
        <input
          className={clsx(
            'h-full w-full bg-white px-4 py-3 text-gray-600 placeholder-gray-400 focus:outline-none',
            {
              'rounded-r-lg': inputType,
              'rounded-lg': !inputType,
            },
          )}
          type={inputType === 'password' && showPassword ? 'text' : inputType}
          ref={ref}
          {...rest}
        />

        {inputType === 'password' && (
          <a
            onClick={handleShowPassword}
            className="absolute right-6 cursor-pointer text-gray-500 transition-colors hover:text-gray-600"
          >
            {showPassword ? <EyeSlash size={24} /> : <Eye size={24} />}
          </a>
        )}
      </div>

      {!!error && <span className="text-red-500">{error.message}</span>}
    </div>
  )
}

export const Input = forwardRef(InputBase)
