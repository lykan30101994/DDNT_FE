export default {
  validateRequired: (item: string) => `Check [${item}] is required`,
  validateMaxLength: (item: string, value: number) => `Check maxlength of [${item}] has maximum length is {${value}}`,
  validateFormat: (item: string, value: string) => `Check format of [${item}] is {${value}}`,
  //
  descriptionRequired: (item: string) =>
    `This test case is designed to verify that the ${item} field is marked as required.\nThe validation should trigger an error message if the user attempts to submit the form without providing a ${item}. `,
  descriptionMaxlength: (item: string) =>
    `This test case is designed to verify that the ${item} field enforces a maximum length restriction.\nWhen the user attempts to enter a ${item} that exceeds the defined maximum length, the system should trigger a validation error message.`,
  descriptionFormat: (item: string, format_name: string) =>
    `This test case aims to verify that the ${item} field accepts only valid ${format_name} formats.`,

  testStepRequired: (item: string, event: string, link: string, max_step: number) =>
    `STEP 1: Goto page ${link} \nSTEP 2: Not enter [${item}] \nSTEP ${max_step}: Click [${event}]`,
  testStepMaxlenght: (item: string, event: string, data_check: string, link: string, max_step: number) =>
    `STEP 1: Goto page ${link} \nSTEP 2: Enter [${item}]: ${data_check} \nSTEP ${max_step}: Click [${event}]`,
  testStepFormat: (item: string, data_check: string, event: string, link: string, max_step: number) =>
    `STEP 1: Goto page ${link} \nSTEP 2: Enter [${item}]: ${data_check}\nSTEP ${max_step}: Click [${event}]`,

  testStepGotoCommon: (link: string) =>  `STEP 1: Goto page ${link} \n`,
  testStepCommon: (step: number, item: string, data_check: string) => `STEP${step}: Enter [${item}]: ${data_check}\n`,
  testStepSubmit: (step: number, element: string) => `STEP ${step}: Click [${element}]\n`,
  
  expectedResultRequired: (item: string) => `Field ${item} is required`,
  expectedResultMaxLength: (value: string) => ` Please enter within ${value} characters.`,
  expectedResultFormat: (value: string) => `Please enter the correct format ${value}.`
}
