export default {
  validateRequired: (item: string) => `[${item}] が必要であることを確認する`,
  validateMaxLength: (item: string, value: number) => `[${item}] の最大長さ {${value}} 文字であることを確認する`,
  validateFormat: (item: string, value: string) => `[${item}] のフォーマットが {${value}} であることを確認する`,
  testStepRequired: (item: string, event: string, step: number = 1) =>
    `ステップ ${step}: [${item}] を入力しない \n ステップ ${++step}: [${event}] をクリック`,
  testStepMaxlenght: (item: string, event: string, data_check: string, step: number = 1) =>
    `ステップ ${step}: [${item}] にのデータを入力: ${data_check} \n ステップ ${++step}: [${event}] をクリック`,
  testStepFormat: (item: string, data_check: string, event: string, step: number = 1) =>
    `ステップ ${step}: [${item}] にのデータを入力: ${data_check} \n ステップ ${++step}: [${event}] をクリック`,
  testStepCommon: (step: number, item: string, data_check: string) =>
    `ステップ ${step}: [${item}]にのデータを入力: ${data_check} \n`,
  testStepSubmit: (step: number, element: string) => `ステップ ${step}: [${element}] をクリック \n`,
  expectedResultRequired: (item: string) => `${item} は必須入力です`,
  expectedResultMaxLength: (value: string) => ` ${value} 文字以内で入力してください。`,
  expectedResultFormat: (value: string) => `正しいフォーマットで入力してください: ${value}。`
}
