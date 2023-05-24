import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { AuthContext } from '../../contexts/AuthContext'
import { signInSchema } from '../../schemas/user.schemas'

import { Input } from './Input'

interface SignInFormData {
  email: string
  password: string
}

export function LoginForm() {
  const { register, handleSubmit, formState } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  })

  const { errors } = formState

  const { signIn } = useContext(AuthContext)

  const handleSignIn: SubmitHandler<SignInFormData> = async (data) => {
    await signIn(data)
  }

  return (
    <form onSubmit={handleSubmit(handleSignIn)} className="flex flex-col gap-8">
      <div className="flex flex-col gap-8">
        <Input
          inputType="email"
          placeholder="E-mail"
          {...register('email')}
          error={errors.email}
          autoFocus
        />
        <Input
          inputType="password"
          placeholder="Senha"
          {...register('password')}
          error={errors.password}
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
