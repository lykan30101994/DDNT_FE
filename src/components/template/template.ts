export const Template = {
  TEST_CASE: '/TEST_CASES_TEMPLATE.xlsx'
}

export const getInfoTemplate = (key: string) => {
  let info: IInfoTemplate = {} as IInfoTemplate

  switch (key) {
    case Template.TEST_CASE:
      info = {
        start_row: 7,
        end_row: 13,
        category_write: ['validation', 'abnormal', 'normal'],
        skip_row: 1,
        row_available: 1,
        header_group: 1,
        cell_write_header: 'A'
      }
  }
  return info
}

export interface IInfoTemplate {
  start_row: number
  category_write: string[]
  skip_row: number
  row_available: number
  end_row: number
  header_group: number
  cell_write_header: string
}
