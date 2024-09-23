import type { IOption } from '@/components/common/dropdown/DropDown.type'

export interface IButton {
  option?: IOption[]
  type?: string
  label: string
  disabled?: boolean
  key: string
  size?: string
  btnClass?: string
  isBold?: boolean
  isDropDown?: boolean
}
