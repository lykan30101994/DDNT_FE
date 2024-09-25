export const Template = {
  TEST_CASE: './TEST_CASES_TEMPLATE.xlsx'
}

export const getInfoTemplate = (key: string) => {
  let info: IInfoTemplate = {} as IInfoTemplate

  switch (key) {
    case Template.TEST_CASE:
      info = {
        start_row: 7,
        category_write: ['validation', 'abnormal', 'normal'],
        skip_row: 1,
        row_available: 1
      }
  }
  return info
}

export interface IInfoTemplate {
  start_row: number
  category_write: string[]
  skip_row: number
  row_available: number
}
