export default {
  validateRequired: (item: string) => `[${item}] が必要であることを確認する` ,
  validateMaxLength: (item: string, value: number) => `[${item}] の最大長さが ${value} 文字であることを確認する` ,
  validateFormat: (item: string, value: string) => `[${item}] のフォーマットが ${value} であることを確認する` ,
  testStepRequired: (item: string, event: string) =>
    `ステップ 1: [${item}] を入力しない \n ステップ 2: [${event}] をクリック` ,
  testStepMaxlenght: (item: string, event: string, data: string) =>
    `ステップ 1: [${item}] に ${data} を入力 \n ステップ 2: [${event}] をクリック` ,
  testStepFormat: (item: string, value: string, event: string) =>
    `ステップ 1: [${item}] に ${value} を入力 \n ステップ 2: [${event}] をクリック` ,
  testStepCommon: (step: number, item: string, value: string) =>
    `ステップ ${step}: [${item}] に ${value} を入力 \n` ,
  testStepSubmit: (step: number, element: string) => `ステップ ${step}: [${element}] をクリック \n` ,
  expectedResultRequired: (item: string) => `${item} は必須入力です` ,
  expectedResultMaxLength: (value: string) => ` ${value} 文字以内で入力してください。` ,
  expectedResultFormat: (value: string) => `正しいフォーマットで入力してください: ${value}。`
}
