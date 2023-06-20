import { Plus, TrashSimple } from 'phosphor-react'
import {
  ChangeEvent,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  forwardRef,
  useState,
} from 'react'
import { Input } from './Input'

interface MultipleInputProps extends InputHTMLAttributes<HTMLInputElement> {
  title?: string
  content: string
  onChangeContent: (position: number, value: string) => void
  onChangePosition: (position: number, field: string) => void
}

const MultipleInputBase: ForwardRefRenderFunction<
  HTMLInputElement,
  MultipleInputProps
> = ({ title, content, onChangeContent, onChangePosition }, ref) => {
  const [contentItems, setContentItems] = useState([{ content: '' }])

  function addNewContentItem() {
    setContentItems([...contentItems, { content: '' }])
  }

  function deleteContentItem(position: number) {
    const updatedContentItems = contentItems.filter(
      (_, index) => index !== position,
    )
    setContentItems(updatedContentItems)
  }

  return (
    <div className="flex w-full flex-col gap-4">
      {title && <span className="text-gray-600">{title}</span>}
      <div className="flex flex-col gap-4 rounded-lg border-[1px] border-gray-300 p-4">
        {contentItems.map((contentItem, index) => {
          return (
            <div key={index} className="flex items-center gap-4">
              <Input
                name={content}
                placeholder={`${index + 1}˚ conteúdo`}
                value={contentItem.content}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  onChangeContent(index, e.target.value)
                }
                ref={ref}
              />
              <a
                onClick={() => deleteContentItem(index)}
                className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-lg border-[1px] border-gray-300 transition-colors hover:border-red-500 hover:bg-red-500 hover:text-white"
              >
                <TrashSimple size={16} />
              </a>
            </div>
          )
        })}
        <a
          onClick={addNewContentItem}
          className="flex h-14 w-full items-center justify-center gap-2 rounded-lg bg-blue-500 text-white transition-colors hover:bg-blue-600"
        >
          <Plus size={16} /> Adicionar
        </a>
      </div>
    </div>
  )
}

export const MultipleInput = forwardRef(MultipleInputBase)
