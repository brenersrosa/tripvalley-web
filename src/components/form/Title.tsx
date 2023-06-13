interface titleProps {
  title: string
}

export function TitleForm({ title }: titleProps) {
  return (
    <div className="flex h-7 items-center gap-2">
      <div className="h-full w-1 rounded-r-lg bg-blue-500"></div>
      <h3 className="font-title text-2xl font-medium text-gray-800">{title}</h3>
    </div>
  )
}
