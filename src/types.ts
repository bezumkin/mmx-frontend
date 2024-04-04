import type {ButtonVariant, Size} from 'bootstrap-vue-next'

export type MmxTableAction = {
  size?: Size
  variant?: ButtonVariant
  class?: String | Array<string> | Object
  route?: any
  function?: Function
  icon?: String | Array<string>
  title?: String
  map?: Record<string, string>
  key?: string
  isActive?: Function
}

export type MmxTableOnLoad = (data: {total: number; rows: any[]; [key: string]: any}) => {
  total: number
  rows: any[]
  [key: string]: any
}

export type MmxFile = {
  id?: number
  uuid?: string
  updated_at?: string
  [key: string]: any
}

export type MmxFileOptions = {
  w?: string | number
  h?: string | number
  fit?: string
  fm?: string
  t?: string | number
  [key: string]: any
}
