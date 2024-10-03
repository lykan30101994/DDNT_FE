interface IValidate {
  action_element?: string
  title?: string
  required: ICommonValidate
  max_length: ICommonValidate
  format: ICommonValidate[]
}

interface ICommonValidate {
  is_checked?: boolean
  value?: string
  data_check?: string
}

interface IField {
  data_check: string
  value: string
}
