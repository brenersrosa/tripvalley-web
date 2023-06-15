import * as SwitchRadix from '@radix-ui/react-switch'
import {
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  forwardRef,
} from 'react'

interface SwitchProps extends InputHTMLAttributes<HTMLInputElement> {
  isActive: 'active' | 'inactive'
  onIsActiveChange: (isActive: 'active' | 'inactive') => void
}

const SwitchBase: ForwardRefRenderFunction<HTMLInputElement, SwitchProps> = (
  { isActive, onIsActiveChange, ...rest },
  ref,
) => {
  function handleChangeStatus() {
    const newStatus = isActive === 'active' ? 'inactive' : 'active'
    onIsActiveChange(newStatus)
  }

  return (
    <div className="flex items-center gap-4">
      <label className="text-gray-600" htmlFor="status-mode">
        Cadastro ativo
      </label>
      <SwitchRadix.Root
        className="h-6 w-12 rounded-full border-[1px] border-gray-300 bg-gray-50"
        id="status-mode"
        checked={isActive === 'active'}
        onCheckedChange={handleChangeStatus}
      >
        <SwitchRadix.Thumb
          ref={ref}
          {...rest}
          className="block h-[23px] w-[23px] translate-x-[1px] rounded-full bg-red-500 transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-full data-[state=checked]:bg-green-500"
        />
      </SwitchRadix.Root>
    </div>
  )
}

export const Switch = forwardRef(SwitchBase)
