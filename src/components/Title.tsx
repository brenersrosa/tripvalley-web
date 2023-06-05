interface titleProps {
  title: string
}

export function Title({ title }: titleProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="h-8 w-2 rounded-r-lg bg-blue-500 md:h-12"></div>
      <h2 className="font-title text-2xl font-bold text-gray-800 md:text-4xl">
        {title}
      </h2>
    </div>
  )
}
