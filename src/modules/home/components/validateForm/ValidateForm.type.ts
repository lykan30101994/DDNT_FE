interface IValidate {
  action_element: string
  title?: string
  required: IRequired
  max_length: IMaxLength
  format: IFormat
}

interface IRequired {
  required?: boolean
  data_check?: string
}

interface IMaxLength {
  max_length?: boolean
  value?: string
  data_check?: string
}

interface IFormat {
  format?: boolean
  value?: string
  data_check?: string
}

interface IField {
  data_check: string
  value: string
}
