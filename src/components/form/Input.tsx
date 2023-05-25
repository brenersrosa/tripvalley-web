import clsx from 'clsx'
import { EnvelopeSimple, Eye, EyeSlash, Lock, User } from 'phosphor-react'
import {
  FormEvent,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  forwardRef,
  useState,
} from 'react'
import { FieldError } from 'react-hook-form'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  inputType: 'user' | 'email' | 'password'
  error?: FieldError
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { inputType, error = null, ...rest },
  ref,
) => {
  // const [inputValue, setInputValue] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  function handleShowPassword(e: FormEvent) {
    e.preventDefault()
    setShowPassword(!showPassword)
  }

  return (
    <div className="flex flex-col gap-2">
      <div
        className={clsx(
          'h-16 flex items-center border-[1px] border-gray-100 rounded-lg relative focus-within:border-blue-500',
          {
            'focus-within:border-red-500': error?.message,
          },
        )}
      >
        <div className="w-[70px] h-full flex items-center justify-center border-r-2 border-gray-100 bg-white rounded-l-lg">
          {inputType === 'user' && <User size={24} className="text-gray-500" />}
          {inputType === 'email' && (
            <EnvelopeSimple size={24} className="text-gray-500" />
          )}
          {inputType === 'password' && (
            <Lock size={24} className="text-gray-500" />
          )}
        </div>
        <input
          className="py-3 px-4 rounded text-sm text-gray-600 placeholder:text-zinc-500 focus:outline-none w-full h-full rounded-lg bg-white"
          // value={inputValue}
          // onChange={(e) => setInputValue(e.target.value)}
          type={inputType === 'password' && showPassword ? 'text' : inputType}
          ref={ref}
          {...rest}
        />

        {inputType === 'password' && (
          <button
            onClick={handleShowPassword}
            className="absolute right-6 text-gray-500"
          >
            {showPassword ? <EyeSlash size={24} /> : <Eye size={24} />}
          </button>
        )}
      </div>

      {!!error && <span className="text-red-500">{error.message}</span>}
    </div>
  )
}

export const Input = forwardRef(InputBase)
