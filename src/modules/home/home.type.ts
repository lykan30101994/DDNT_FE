export interface ITableEvent {
  serial: number
  category: string
  type: string
  c_element: string
  selector: string
  action: string
  action_element: string
  [key: string]: any
}

export interface IPattentTestCase {
  [key: string]: ITestCaseItem[]
}

export interface IPattentLocalStorage {
  [key: string]: any
}

export interface ITestCaseResult {
  purpose: string
  description?: string
  pre_condition?: string
  test_step: string
  expected_result: string
}
