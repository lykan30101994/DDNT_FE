export default {
  validateRequired: (item: string) => `Check [${item}] is required`,
  validateMaxLength: (item: string, value: number) => `Check [${item}] has maximum length :${value}`,
  validateFormat: (item: string, value: string) => `Check format of [${item}] is ${value}`,
  testStepRequired: (item: string, event: string) =>
    `STEP 1: Not enter [${item}] \n STEP 2: Click [${event}]`,
  testStepMaxlenght: (item: string, event: string, data: string) =>
    `STEP 1: Enter [${item}] is ${data} \n STEP 2: Click [${event}]`,
  testStepFormat: (item: string, value: string, event: string) =>
    `STEP 1: Enter [${item}] is ${value}\n STEP 2: Click [${event}]`,
  testStepCommon: (step: number, item: string, value: string) =>
    `STEP${step}: Enter [${item}] is ${value}\n`,
  testStepSubmit: (step: number, element: string) => `STEP ${step}: Click [${element}]\n`,
  expectedResultRequired: (item: string) => `Field ${item} is required`,
  expectedResultMaxLength: (value: string) => ` Please enter within ${value} characters.`,
  expectedResultFormat: (value: string) => `Please enter the correct format ${value}.`
}
