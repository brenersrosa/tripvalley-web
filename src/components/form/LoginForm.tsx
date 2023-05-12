import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import useAuthStore from '../../Contexts/useAuthStore'

import { Input } from './Input'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { signIn } = useAuthStore()

  const navigate = useNavigate()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    const data = {
      email,
      password,
    }

    signIn(data)

    navigate('/dashboard')
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <div className="flex flex-col gap-8">
        <Input
          inputType="email"
          name="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          inputType="password"
          name="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <a
          href="#"
          className="text-blue-500 transition-colors hover:text-blue-600"
        >
          Esqueci minha senha
        </a>
      </div>
      <button
        type="submit"
        className="w-full h-14 bg-blue-500 rounded-lg text-white font-title font-medium transition-colors hover:bg-blue-600"
      >
        Login
      </button>
      <span className="text-gray-500">
        Não possui uma conta?{' '}
        <a
          href="#"
          className="text-blue-500 transition-colors hover:text-blue-600"
        >
          Criar conta
        </a>
      </span>
    </form>
  )
}
