import * as SelectRadix from '@radix-ui/react-select'
import { CaretDown, CaretUp } from 'phosphor-react'
import {
  ForwardRefRenderFunction,
  SelectHTMLAttributes,
  forwardRef,
  useState,
} from 'react'
import { FieldError } from 'react-hook-form'

interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  title?: string
  placeholder?: string
  data: string[] | { id?: string; name: string }[]
  error?: FieldError
  onChange?: (value: string) => void
}

const SelectBase: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> = (
  { title, placeholder, data, error = null, onChange, ...rest },
  ref,
) => {
  const [selectedValue, setSelectedValue] = useState('')

  const handleValueChange = (value: string) => {
    setSelectedValue(value)
    if (onChange) {
      onChange(value)
    }
  }

  return (
    <div className="flex w-full flex-col gap-4">
      {title && <span className="text-gray-600">{title}</span>}
      <SelectRadix.Root onValueChange={handleValueChange}>
        <SelectRadix.Trigger
          className="flex h-14 w-full items-center justify-between rounded-lg border-[1px] border-gray-300 px-4 text-gray-600 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
          aria-label=""
        >
          <SelectRadix.Value placeholder={placeholder} ref={ref} {...rest} />
          <SelectRadix.Icon>
            <CaretDown size={24} className="text-gray-400" />
          </SelectRadix.Icon>
        </SelectRadix.Trigger>
        <SelectRadix.Content>
          <SelectRadix.ScrollUpButton className="flex items-center justify-center text-gray-700">
            <CaretUp />
          </SelectRadix.ScrollUpButton>
          <SelectRadix.Viewport className="absolute rounded-lg border-[1px] border-gray-300 bg-white">
            <SelectRadix.Group>
              <SelectRadix.Item
                value="all"
                className="relative flex select-none items-center px-4 py-4 text-gray-600 hover:bg-gray-100 focus:outline-none"
                defaultChecked
              >
                <SelectRadix.ItemText>Selecione</SelectRadix.ItemText>
              </SelectRadix.Item>
              {data.map((value, i) => (
                <SelectRadix.Item
                  key={`${value}-${i}`}
                  value={typeof value === 'object' ? value.name : value}
                  className="relative flex cursor-pointer select-none items-center border border-transparent px-4 py-4 text-gray-600 hover:rounded-md hover:border hover:border-blue-500 hover:bg-gray-100 focus:outline-none"
                >
                  <SelectRadix.ItemText>
                    {typeof value === 'object' ? value.name : value}
                  </SelectRadix.ItemText>
                </SelectRadix.Item>
              ))}
            </SelectRadix.Group>
          </SelectRadix.Viewport>
          <SelectRadix.ScrollDownButton className="flex items-center justify-center text-gray-700 dark:text-gray-300">
            <CaretDown />
          </SelectRadix.ScrollDownButton>
        </SelectRadix.Content>
      </SelectRadix.Root>

      {!!error && <span className="text-red-500">{error.message}</span>}
    </div>
  )
}

export const Select = forwardRef(SelectBase)
