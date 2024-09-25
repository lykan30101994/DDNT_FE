interface IValidateForm {
  title?: string;
  validation: IValidation
}

interface IValidation {
  required: IRequired
  max_length: IMaxLength
  format: IFormat
}
interface IRequired {
  required?: boolean;
  data_required?: string;
}

interface IMaxLength {
  max_length?: boolean;
  value_max_length?: string;
  data_max_length?: string;
}

interface IFormat {
  format?: boolean;
  value_format?: string;
  data_format?: string;
}