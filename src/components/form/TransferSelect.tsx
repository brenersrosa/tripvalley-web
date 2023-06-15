import { useState } from 'react'
import { CaretDown, CaretUp } from 'phosphor-react'
import * as SelectRadix from '@radix-ui/react-select'

interface TransferSelectProps {
  placeholder: string
  onChange: (value: string) => void
  transferShared: boolean
  transferExclusive: boolean
}

export function TransferSelect({
  placeholder,
  onChange,
  transferShared,
  transferExclusive,
}: TransferSelectProps) {
  const [, setSelectedValue] = useState('')
  const [focusedItem, setFocusedItem] = useState('')

  const handleSelectChange = (value: string) => {
    setSelectedValue(value)
    onChange(value)
  }

  const handleItemFocus = (value: string) => {
    setFocusedItem(value)
  }

  return (
    <SelectRadix.Root onValueChange={handleSelectChange}>
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
        <SelectRadix.Viewport className="absolute overflow-y-auto rounded-lg border-[1px] border-gray-300 bg-white">
          <SelectRadix.Group>
            <SelectRadix.Item
              value=""
              className={`relative flex select-none items-center px-4 py-4 text-gray-600 hover:bg-gray-100 focus:outline-none ${
                focusedItem === '' ? 'focus:border-blue-500' : ''
              }`}
              disabled
            >
              <SelectRadix.ItemText>{placeholder}</SelectRadix.ItemText>
            </SelectRadix.Item>
            {transferShared && (
              <SelectRadix.Item
                value="Comunitário"
                className={`relative flex select-none items-center px-4 py-4 text-gray-600 hover:bg-gray-100 focus:outline-none ${
                  focusedItem === 'Comunitário' ? 'focus:border-blue-500' : ''
                }`}
                onFocus={() => handleItemFocus('Comunitário')}
              >
                <SelectRadix.ItemText>Comunitário</SelectRadix.ItemText>
              </SelectRadix.Item>
            )}
            {transferExclusive && (
              <SelectRadix.Item
                value="Particular"
                className={`relative flex select-none items-center px-4 py-4 text-gray-600 hover:bg-gray-100 focus:outline-none ${
                  focusedItem === 'Particular' ? 'focus:border-blue-500' : ''
                }`}
                onFocus={() => handleItemFocus('Particular')}
              >
                <SelectRadix.ItemText>Particular</SelectRadix.ItemText>
              </SelectRadix.Item>
            )}
          </SelectRadix.Group>
        </SelectRadix.Viewport>
        <SelectRadix.ScrollDownButton className="flex items-center justify-center text-gray-700 dark:text-gray-300">
          <CaretDown />
        </SelectRadix.ScrollDownButton>
      </SelectRadix.Content>
    </SelectRadix.Root>
  )
}
