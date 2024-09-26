export default {
  validateRequired: (item: string) => `必須項目${item}を確認する`,
  validateMaxLength: (item: string, value: number) => `${item}の最大長 > ${value}を確認すする`,
  validateFormat: (item: string, value: string) => `${item}のフォーマット${value}を確認する`,
  testStepRequired: (value: string, event: string) =>
    `ステップ1: ア${value} にデータを入力しない \n ステップ2: ボタン ${event} をクリックする`,
  testStepMaxlenght: (value: string, event: string, data: string) =>
    `ステップ1:  ${value} にデータを入力するのは ${data}\n ステップ2: ボタン ${event} をクリックする`,
  testStepFormat: (item: string, value: string, event: string) =>
    `ステップ1: ${item} にデータを入力するのは ${value}\n ステップ2: ボタン ${event} をクリックする`,
  testStepCommon: (step: number, item: string, value: string) =>
    `Step${step}: Nhập data vào item ${item} với giá trị là: ${value}\n`,
  testStepSubmit: (step: number, element: string) => `Step ${step}: Click button ${element}\n`,
  expectedResultRequired: (item: string) => `メッセージを表示: ${item}は必須入力です。`,
  expectedResultMaxLength: (value: string) => `メッセージを表示: ${value}文字以内で入力してください。`,
  expectedResultFormat: (value: string) => `メッセージを表示: 正しいフォーマット ${value} で入力してください。`
}
