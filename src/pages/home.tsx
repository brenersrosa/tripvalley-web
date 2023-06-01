import { Link } from 'react-router-dom'

export function Home() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
      <h1>home</h1>

      <Link to="/signin" className="rounded bg-blue-500 p-4 text-white">
        SignIn
      </Link>
    </div>
  )
}
