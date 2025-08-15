import { useCheckboxStore } from '@/store'
import type { CheckboxPropsT } from '@/types/checkbox'

export default function Checkbox({ id, label }: CheckboxPropsT) {
  const checkboxStore = useCheckboxStore()

  return (
    <div className='flex items-center justify-center gap-2'>
      <input
        type='checkbox'
        id={id}
        onChange={() => checkboxStore.setCheckbox(id, !checkboxStore[id])}
        checked={checkboxStore[id]}
      />
      <label
        htmlFor={id}
        className='whitespace-nowrap'
      >
        {label}
      </label>
    </div>
  )
}
