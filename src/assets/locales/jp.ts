export default {
  validateRequired: (item: string) => `[${item}] が必須であることを確認する`,
  validateMaxLength: (item: string, value: number) => `[${item}] の最大長を確認する`,
  validateFormat: (item: string, value: string) => `[${item}] の形式は ${value} であることを確認すする`,

  testStepRequired: (item: string, event: string) =>
    `ステップ 1: [${item}] を入力しない \n ステップ 2: [${event}] をクリックする`,
  testStepRequiredForText: (item: string, event: string) =>
    `ステップ 1: [${item}] を入力しなしない \n ステップ 2: [${event}] をクリックする`,
  testStepRequiredForCheckbox: (item: string, event: string) =>
    `ステップ 1: [${item}] をクリックしない \n ステップ 2: [${event}] をクリックする`,
  testStepRequiredForDropdown: (item: string, event: string) =>
    `ステップ 1: [${item}] を選択しない \n ステップ 2: [${event}] をクリックする`,

  testStepMaxlenght: (item: string, event: string, data: string) =>
    `ステップ 1: [${item}] に ${data} を入力する \n ステップ 2: [${event}] をクリックする`,
  testStepMaxlenghtText: (item: string, event: string, data: string) =>
    `ステップ 1: [${item}] に ${data} を入力する \n ステップ 2: [${event}] をクリックする`,
  testStepMaxlenghtCheckbox: (item: string, event: string, data: string) =>
    `ステップ 1: [${item}] をクリックする ${data} \n ステップ 2: [${event}] をクリックする`,
  testStepMaxlenghtDropdown: (item: string, event: string, data: string) =>
    `ステップ 1: [${item}] を選択する ${data} \n ステップ 2: [${event}] をクリックする`,

  testStepFormat: (item: string, value: string, event: string) =>
    `ステップ 1: [${item}] に ${value} を入力する\n ステップ 2: [${event}] をクリックする`,
  testStepFormatText: (item: string, value: string, event: string) =>
    `ステップ 1: [${item}] に ${value} を入力する\n ステップ 2: [${event}] をクリックする`,
  testStepFormatCheckbox: (item: string, value: string, event: string) =>
    `ステップ 1: [${item}] に ${value} を入力する\n ステップ 2: [${event}] をクリックする`,
  testStepFormatDropdown: (item: string, value: string, event: string) =>
    `ステップ 1: [${item}] に ${value} を入力する\n ステップ 2: [${event}] をクリックする`,

  testStepCommon: (STEP: number, item: string, value: string) => `ステップ ${STEP}: [${item}] に ${value} を入力する\n`,
  testStepSubmit: (STEP: number, element: string) => `ステップ ${STEP}: [${element}] をクリックする\n`,

  expectedResultRequired: (item: string) => `[${item}] は必須です`,
  expectedResultMaxLength: (value: string) => `最大 ${value} 文字以内で入力してください。`,
  expectedResultFormat: (value: string) => `正しい形式で ${value} を入力してください。`
}
