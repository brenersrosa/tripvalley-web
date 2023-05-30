import { Buildings, Package, User } from 'phosphor-react'
// import { useContext } from 'react'

// import { AuthContext } from '../contexts/AuthContext'

import logo from '../assets/logo-short.svg'

export function NavBar() {
  // const { signOut } = useContext(AuthContext)

  // function handleSignOut() {
  //   signOut()
  // }

  return (
    <div className="w-20 h-full flex flex-col justify-between">
      <img src={logo} alt="TRIPvalley logo" className="w-20 h-20 bg-blue-500" />
      <div className="w-full h-full bg-zinc-900 flex flex-col justify-center gap-8">
        <div className="w-full py-4 flex items-center justify-center cursor-pointer hover:bg-zinc-800">
          <a href="/accommodations">
            <Buildings size={24} className="text-white" />
          </a>
        </div>
        <div className="w-full h-14 flex items-center justify-center cursor-pointer hover:bg-zinc-800">
          <a href="/packages">
            <Package size={24} className="text-white" />
          </a>
        </div>
        <div className="w-full h-14 flex items-center justify-center cursor-pointer hover:bg-zinc-800">
          <a href="/profile">
            <User size={24} className="text-white" />
          </a>
        </div>
        {/* <div className="w-full h-14 flex items-center justify-center cursor-pointer hover:bg-zinc-800">
          <a onClick={handleSignOut}>
            <SignOut size={24} className="text-white" />
          </a>
        </div> */}
      </div>
    </div>
  )
}
