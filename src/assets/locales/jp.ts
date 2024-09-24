export default {
  validateRequired: (item: string) => `必須項目${item}を確認してください`,
  validateMaxLength: (item: string, value: number) => `${item}の最大長 > ${value}を確認してください`,
  validateFormat: (item: string, value: string) => `${item}のフォーマット${value}を確認してください`,
  expectedResultRequired: (item: string) => `メッセージを表示: ${item}は必須入力です。`,
  expectedResultMaxLength: (value: string) => `メッセージを表示: ${value}文字以内で入力してください。`,
  expectedResultFormat: (value: string) => `メッセージを表示: 正しいフォーマット ${value} で入力してください。`
}
