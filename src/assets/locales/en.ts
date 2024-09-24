export default {
  validateRequired: (item: string) => `Kiểm tra bắt buộc cho mục ${item}`,
  validateMaxLength: (item: string, value: number) => `Check max length > ${value} of item ${item}`,
  validateFormat: (item: string, value: string) => `Check format ${value} of item ${item}`,
  expectedResultRequired: (item: string) => `Display message: Field ${item} is required`,
  expectedResultMaxLength: (value: string) => `Display message: Please enter within ${value} characters.`,
  expectedResultFormat: (value: string) => `Display message: Please enter the correct format ${value}.`
}
