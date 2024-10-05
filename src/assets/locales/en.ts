export default {
  validateRequired: (item: string) => `Check [${item}] is required`,
  validateMaxLength: (item: string, value: number) => `Check maxlength of [${item}] has maximum length is {${value}}`,
  validateFormat: (item: string, value: string) => `Check format of [${item}] is {${value}}`,
  testStepRequired: (item: string, event: string, step: number = 1) =>
    `STEP ${step}: Not enter [${item}] \n STEP ${++step}: Click [${event}]`,
  testStepMaxlenght: (item: string, event: string, data_check: string, step: number = 1) =>
    `STEP ${step}: Enter [${item}]: ${data_check} \n STEP ${++step}: Click [${event}]`,
  testStepFormat: (item: string, data_check: string, event: string, step: number = 1) =>
    `STEP ${step}: Enter [${item}]: ${data_check}\n STEP ${++step}: Click [${event}]`,
  testStepCommon: (step: number, item: string, data_check: string) => `STEP${step}: Enter [${item}]: ${data_check}\n`,
  testStepSubmit: (step: number, element: string) => `STEP ${step}: Click [${element}]\n`,
  expectedResultRequired: (item: string) => `Field ${item} is required`,
  expectedResultMaxLength: (value: string) => ` Please enter within ${value} characters.`,
  expectedResultFormat: (value: string) => `Please enter the correct format ${value}.`
}
