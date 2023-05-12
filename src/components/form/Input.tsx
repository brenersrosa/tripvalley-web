'use client'
import { EnvelopeSimple, Eye, EyeSlash, Lock, User } from 'phosphor-react'
import { FormEvent, InputHTMLAttributes, useState } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  inputType: 'user' | 'email' | 'password'
}

export function Input({ inputType, ...rest }: InputProps) {
  const [inputValue, setInputValue] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  function handleShowPassword(e: FormEvent) {
    e.preventDefault()
    setShowPassword(!showPassword)
  }

  return (
    <div className="h-16 flex items-center border-[1px] border-gray-100 rounded-lg focus-within:border-blue-500 relative">
      <div className="w-[70px] h-full flex items-center justify-center border-r-2 border-gray-100">
        {inputType === 'user' && <User size={24} className="text-gray-500" />}
        {inputType === 'email' && (
          <EnvelopeSimple size={24} className="text-gray-500" />
        )}
        {inputType === 'password' && (
          <Lock size={24} className="text-gray-500" />
        )}
      </div>
      <input
        className="py-3 px-4 rounded text-sm text-gray-600 placeholder:text-zinc-500 focus:outline-none w-full"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        type={inputType === 'password' && showPassword ? 'text' : inputType}
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
  )
}
