export function Home() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-4">
      <h1>home</h1>

      <a href="/signin" className="p-4 rounded bg-blue-500 text-white">
        SignIn
      </a>
    </div>
  )
}
