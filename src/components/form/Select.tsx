import * as SelectRadix from '@radix-ui/react-select'
import { CaretDown, CaretUp } from 'phosphor-react'
import {
  ForwardRefRenderFunction,
  SelectHTMLAttributes,
  forwardRef,
} from 'react'

interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  placeholder: string
  data: string[]
  onChange?: (value: string) => void
}

const SelectBase: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> = (
  { placeholder, data, onChange, ...rest },
  ref,
) => {
  return (
    <SelectRadix.Root onValueChange={onChange}>
      <SelectRadix.Trigger
        className="flex h-14 w-full items-center justify-between rounded-lg border-[1px] border-gray-300 px-4 text-gray-600 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
        aria-label=""
      >
        <SelectRadix.Value placeholder={placeholder} />
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
              <SelectRadix.ItemText ref={ref} {...rest}>
                Todos
              </SelectRadix.ItemText>
            </SelectRadix.Item>
            {data.map((value, i) => (
              <SelectRadix.Item
                key={`${value}-${i}`}
                value={value}
                className="relative flex select-none items-center px-4 py-4 text-gray-600 hover:bg-gray-100 focus:outline-none"
              >
                <SelectRadix.ItemText ref={ref} {...rest}>
                  {value}
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
  )
}

export const Select = forwardRef(SelectBase)
