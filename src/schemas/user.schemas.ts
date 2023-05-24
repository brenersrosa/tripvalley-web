import { z } from 'zod'

export const registerSchema = z
  .object({
    name: z.string().min(3, 'Nome obrigatório'),
    email: z.string().email().min(1, 'E-mail obrigatório'),
    password: z.string().min(4, 'Senha obrigatória'),
    passwordConfirmation: z.string({
      required_error: 'Confirmação de senha obrigatória',
    }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'As senhas são diferentes',
    path: ['passwordConfirmation'],
  })

export type RegisterInputProps = z.infer<typeof registerSchema>

export const signInSchema = z.object({
  email: z.string().min(1, 'E-mail obrigatório').email('E-mail inválido'),
  password: z.string().min(4, 'Senha obrigatória'),
})

export type SignInInputProps = z.infer<typeof signInSchema>
