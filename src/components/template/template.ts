export const Template = {
  TEST_CASE: './test-template.xlsx'
}

export const getInfoTemplate = (key: string) => {
  let info: IInfoTemplate = {} as IInfoTemplate

  switch (key) {
    case Template.TEST_CASE:
      info = {
        validate: 7,
        abnormal: 13,
        normal: 19
      }
  }
  return info
}

export interface IInfoTemplate {
  [key: string]: any
}
