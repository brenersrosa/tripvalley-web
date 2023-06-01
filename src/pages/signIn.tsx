import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Balance from 'react-wrap-balancer'

import { Header } from '../components/Header'
import { FormController } from '../components/form/FormController'
import { AuthContext } from '../contexts/AuthContext'

import logo from '../assets/logo-short.svg'

export function SignIn() {
  const { isAuthenticated } = useContext(AuthContext)

  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/accommodations')
    }
  }, [isAuthenticated, navigate])

  return (
    <>
      <div className="flex">
        <img
          src={logo}
          alt="TRIPvalley logo"
          className="h-20 w-20 bg-blue-500"
        />
        <Header title="Login" />
      </div>

      <div className="md:flex md:h-[calc(100vh-5rem)] md:pb-0 md:pt-0 ">
        <div className="flex h-full w-full items-end bg-[url('../assets/hero.png')] bg-cover bg-no-repeat pb-52 md:pb-28 pl-28 brightness-95 shadow-xl md:shadow-none">
          <div className="md:flex md:max-w-md md:flex-col md:gap-4">
            <h2 className="md:font-title md:text-6xl md:font-bold md:uppercase md:leading-tight md:text-gray-50">
              <div className="hidden md:block">
                <Balance>Aproveite o mundo!</Balance>
              </div>
            </h2>
            <span className="md:leading-relaxed md:text-gray-100">
              <div className="hidden md:block">
                <Balance>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </Balance>
              </div>
            </span>
          </div>
        </div>

        <div className="mx-auto mt-5 flex items-center md:mt-0 md:h-full md:w-full">
          <div className="md:max-w-24 md:mt-none md:mb-none mx-auto mb-5 mt-5 flex flex-col gap-6 md:gap-8">
            <h3 className="text-center font-title text-3xl font-semibold leading-tight md:text-left md:text-4xl">
              <Balance>Estamos quase lá!</Balance>
            </h3>
            <span className="text-center font-title leading-relaxed text-gray-500">
              <Balance>
                Faça seu login para começar uma experiência incrível.
              </Balance>
            </span>
            <FormController page="signin" />
          </div>
        </div>
      </div>
    </>
  )
}
