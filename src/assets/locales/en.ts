export default {
  validateRequired: (item: string) => `Check [${item}] is required`,
  validateMaxLength: (item: string, value: number) => `Check max length of [${item}]`,
  validateFormat: (item: string, value: string) => `Check format of [${item}] is ${value} `,
  // Purpose for case required
  testStepRequired: (item: string, event: string) => `STEP 1: Not enter [${item}] \n STEP 2: Click [${event}]`,
  testStepRequiredForText: (item: string, event: string) => `STEP 1: Not enter [${item}] \n STEP 2: Click [${event}]`,
  testStepRequiredForCheckbox: (item: string, event: string) =>
    `STEP 1: Not click [${item}] \n STEP 2: Click [${event}]`,
  testStepRequiredForDropdown: (item: string, event: string) =>
    `STEP 1: Not select [${item}] \n STEP 2: Click [${event}]`,
  //
  testStepMaxlenght: (item: string, event: string, data: string) =>
    `STEP 1: Enter [${item}] is ${data} \n STEP 2: Click [${event}]`,
  testStepMaxlenghtText: (item: string, event: string, data: string) =>
    `STEP 1: Enter [${item}] is ${data} \n STEP 2: Click [${event}]`,
  testStepMaxlenghtCheckbox: (item: string, event: string, data: string) =>
    `STEP 1: Click [${item}] is ${data} \n STEP 2: Click [${event}]`,
  testStepMaxlenghtDropdown: (item: string, event: string, data: string) =>
    `STEP 1: Select [${item}] is ${data} \n STEP 2: Click [${event}]`,

  testStepFormat: (item: string, value: string, event: string) =>
    `STEP 1: Enter [${item}]　is ${value}\n STEP 2: Click [${event}]`,
  testStepFormatText: (item: string, value: string, event: string) =>
    `STEP 1: Enter [${item}]　is ${value}\n STEP 2: Click [${event}]`,
  testStepFormatCheckbox: (item: string, value: string, event: string) =>
    `STEP 1: Enter [${item}]　is ${value}\n STEP 2: Click [${event}]`,
  testStepFormatDropdown: (item: string, value: string, event: string) =>
    `STEP 1: Enter [${item}]　is ${value}\n STEP 2: Click [${event}]`,

  testStepCommon: (STEP: number, item: string, value: string) => `STEP${STEP}: Enter [${item}] is ${value}\n`,
  testStepSubmit: (STEP: number, element: string) => `STEP ${STEP}: Click [${element}]\n`,

  expectedResultRequired: (item: string) => `Field [${item}] is required`,
  expectedResultMaxLength: (value: string) => `Please enter within ${value} characters.`,
  expectedResultFormat: (value: string) => `Please enter the correct format ${value}.`
}
