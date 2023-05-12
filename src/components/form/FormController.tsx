import { LoginForm } from './LoginForm'

type FormControllerProps = {
  page: string
}

export function FormController({ page }: FormControllerProps) {
  return (
    <>
      {page === 'signin' ? <LoginForm /> : null}
      {/* {page === 'register' ? <RegisterForm /> : null} */}
    </>
  )
}
