type Text = {
  title: string
}

export function Title({ title }: Text) {
  return (
    <div className="hidden pb-14 md:flex">
      <span className="ml-10 mr-3 rounded-r-md border-l-8 border-r-2 border-blue-500 sm:ml-0"></span>
      <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
    </div>
  )
}
