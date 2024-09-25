export default {
  validateRequired: (item: string) => `Kiểm tra bắt buộc cho mục ${item}`,
  validateMaxLength: (item: string, value: number) => `Check max length > ${value} of item ${item}`,
  validateFormat: (item: string, value: string) => `Check format ${value} of item ${item}`,
  testStepRequired: (value: string, event: string) =>
    `Step 1: Do not enter data into item ${value} \n Step 2: Click button ${event}`,
  testStepMaxlenght: (value: string, event: string, data: string) =>
    `Step 1: Enter data into item ${value} is ${data} \n Step 2: Click button ${event}`,
  testStepFormat: (value: string, event: string) =>
    `Step 1: Enter data into item ${value} \n Step 2: Click button ${event}`,
  expectedResultRequired: (item: string) => `Display message: Field ${item} is required`,
  expectedResultMaxLength: (value: string) => `Display message: Please enter within ${value} characters.`,
  expectedResultFormat: (value: string) => `Display message: Please enter the correct format ${value}.`
}
