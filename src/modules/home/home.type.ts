export interface ITableEvent {
    serial: number | string
    category: string
    type: string
    c_element: string
    selector: string
    [key: string] : any
}