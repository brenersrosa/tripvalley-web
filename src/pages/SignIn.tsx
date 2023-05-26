import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Balance from 'react-wrap-balancer'

import { Header } from '../components/Header'
import { FormController } from '../components/form/FormController'
import { AuthContext } from '../contexts/AuthContext'

export function SignIn() {
  const { isAuthenticated } = useContext(AuthContext)

  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard')
    }
  }, [isAuthenticated, navigate])

  return (
    <>
      <Header />

      <div className="md:bg-gray-500 md:flex md:h-[calc(100vh-5rem)] pb-10 pt-10 md:pb-0 md:pt-0">
        <div className="md:w-full md:h-full md:bg-[url('../assets/hero.png')] md:bg-no-repeat md:bg-cover md:brightness-95 md:flex md:items-end md:pl-28 md:pb-28">
          <div className="md:max-w-md md:flex md:flex-col md:gap-4">
            <h2 className="md:font-title md:font-bold md:leading-tight md:text-6xl md:text-gray-50 md:uppercase">
              <div className='md:block hidden'>
              <Balance>Aproveite o mundo!</Balance>
              </div>
            </h2>
            <span className="md:text-gray-100 md:leading-relaxed">
            <div className='md:block hidden'>
              <Balance>
              Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </Balance>
              </div>     
            </span>
          </div>
        </div>

        <div className="md:w-full md:h-full mt-5 md:mt-0 bg-zinc-50 flex items-center w-11/12 mx-auto border border-gray-200 rounded-xl md:border-none md:rounded-none">
          <div className="md:max-w-24 flex flex-col gap-6 mt-5 mb-5 md:mt-none md:mb-none md:gap-8 mx-auto">
            <h3 className="font-title font-semibold text-3xl md:text-4xl text-center md:text-left leading-tight">
              <Balance>Estamos quase lá!</Balance>
            </h3>
            <span className="font-title leading-relaxed text-gray-500">
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
