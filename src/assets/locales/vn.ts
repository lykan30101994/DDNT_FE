export default {
  // Validation scope
  // Purpose
  validateRequired: (item: string) => `Kiểm tra bắt buộc item ${item}`,
  validateMaxLength: (item: string, value: number) => `Kiểm tra độ dài tối đa > ${value} của mục ${item}`,
  validateFormat: (item: string, value: string) => `Kiểm tra định dạng (${value}) của mục ${item}`,
  // Test Step
  testStepRequired: (value: string, event: string) =>
    `Step1: Không nhập data vào item ${value} \n Step2: Click button ${event}`,
  testStepMaxlenght: (item: string, event: string, data: string) =>
    `Step1: Nhập data vào item ${item} là ${data}\n Step2: Click button ${event}`,
  testStepFormat: (item: string, value: string, event: string) =>
    `Step1: Nhập data vào item ${item} là ${value}\n Step2: Click button ${event}`,
  testStepCommon: (step: number, item: string, value: string) =>
    `Step${step}: Nhập data vào item ${item} với giá trị là: ${value}\n`,
  testStepSubmit: (step: number, element: string) => `Step ${step}: Click button ${element}\n`,
  // Expected Result
  expectedResultRequired: (item: string) => `Hiển thị message: Trường ${item} là trường bắt buộc`,
  expectedResultMaxLength: (value: string) => `Hiển thị message: Vui lòng nhập trong vòng ${value} ký tự`,
  expectedResultFormat: (value: string) => `Hiển thị message: Vui lòng nhập đúng format ${value}`
}
