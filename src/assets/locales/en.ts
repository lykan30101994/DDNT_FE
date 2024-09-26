export default {
  validateRequired: (item: string) => `Check required ${item}`,
  validateMaxLength: (item: string, value: number) => `Check max length > ${value} of item ${item}`,
  validateFormat: (item: string, value: string) => `Check format ${value} of item ${item}`,
  testStepRequired: (item: string, event: string) =>
    `Step 1: Do not enter data into item ${item} \n Step 2: Click button ${event}`,
  testStepMaxlenght: (item: string, event: string, data: string) =>
    `Step 1: Enter data into item ${item} is ${data} \n Step 2: Click button ${event}`,
  testStepFormat: (item: string, value: string, event: string) =>
    `Step 1: Enter data into item ${item}　is ${value}\n Step 2: Click button ${event}`,
  testStepCommon: (step: number, item: string, value: string) =>
    `Step${step}: Nhập data vào item ${item} với giá trị là: ${value}\n`,
  testStepSubmit: (step: number, element: string) => `Step ${step}: Click button ${element}\n`,
  expectedResultRequired: (item: string) => `Display message: Field ${item} is required`,
  expectedResultMaxLength: (value: string) => `Display message: Please enter within ${value} characters.`,
  expectedResultFormat: (value: string) => `Display message: Please enter the correct format ${value}.`
}
