export const TEMPLATE = {
  TEST_CASE: './TEST_CASES_TEMPLATE.xlsx'
}

export const getInfoExcel = (key: string) => {
  let info: IInfoExcel = {} as IInfoExcel

  switch (key) {
    case TEMPLATE.TEST_CASE:
      info = {
        number_header: 1,
        start_cell: 'A1'
      }
      break
    default:
      info = {
        number_header: 1,
        start_cell: 'A1'
      }
  }

  return info
}

export interface IInfoExcel {
  number_header: number
  start_cell: string
}
