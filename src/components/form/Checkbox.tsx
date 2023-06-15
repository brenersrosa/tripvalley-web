import * as CheckboxRadix from '@radix-ui/react-checkbox'
import { Check } from 'phosphor-react'

interface CheckboxProps extends CheckboxRadix.CheckboxProps {
  title: string
  checked: boolean
  onChange: () => void
}

export function Checkbox({ title, checked, onChange, ...rest }: CheckboxProps) {
  return (
    <div className="flex items-center gap-3">
      <CheckboxRadix.Root
        className="group focus:outline-none disabled:cursor-not-allowed"
        checked={checked}
        onCheckedChange={onChange}
        {...rest}
      >
        <div className="group-focus:ring-offset-background flex h-8 w-8 items-center justify-center rounded-lg border-2 border-gray-300 bg-white transition-colors group-focus:ring-2 group-focus:ring-blue-500 group-focus:ring-offset-2 group-data-[state=checked]:border-blue-500 group-data-[state=checked]:bg-blue-500">
          <CheckboxRadix.Indicator>
            <Check size={20} className="text-white" />
          </CheckboxRadix.Indicator>
        </div>
      </CheckboxRadix.Root>
      <span className="leading-tight text-gray-600">{title}</span>
    </div>
  )
}
