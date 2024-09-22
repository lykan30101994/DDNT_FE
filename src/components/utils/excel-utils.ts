import * as XLSX from "xlsx";
import {getInfoExcel} from "@/components/template/template";

export const ExcelUtils = {

    write: (data: object[], fileName: string, sheetName: string = 'Sheet1') => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
        XLSX.writeFile(workbook, fileName);
    },

    getWorkBookWithTemplate: (path: string) => {
        return fetch(path)
            .then(response => {
                if (!response.ok) {
                    console.error('Đã xảy ra lỗi mạng');
                }
                return response.arrayBuffer(); // Đọc dữ liệu dưới dạng ArrayBuffer
            })
            .then(data => {
                return XLSX.read(data, {type: 'array'});
            })
            .catch(error => {
                console.error('Đã xảy ra lỗi khi tải file:', error);
            });
    },

    writeWithTemplate: async (template: string, data: object[], fileName: string, sheetName: string = 'Sheet1', cellToWrites?: string) => {
        const workBook = await ExcelUtils.getWorkBookWithTemplate(template)

        if (workBook) {
            const { number_header, start_cell} = getInfoExcel(template)
            const worksheet = workBook.Sheets[sheetName];

            if (cellToWrites) {
                const cellRefForEachRow = handleDataSave(data, cellToWrites)
                const lengthCellRef = cellRefForEachRow.length
                if (lengthCellRef === data.length) {
                    const cellRefFinal = cellRefForEachRow[lengthCellRef - 1]
                    const endCellRef = `${cellRefFinal[cellRefFinal.length - 1]}${lengthCellRef + number_header}`
                    worksheet["!ref"] = `${start_cell}:${endCellRef}`

                    data.forEach((row, index) => {
                        Object.entries(row).forEach(([key, value], rowIndex) => {

                            if (cellRefForEachRow[index][rowIndex]) {
                                const rowInExcel = index + 1
                                worksheet[`${cellRefForEachRow[index][rowIndex]}${rowInExcel + number_header}`] = {
                                    t: typeof value === 'number' ? 'n' : 's',
                                    v: value
                                }
                            }
                        })
                    })
                }
            } else {
                XLSX.utils.sheet_add_json(worksheet, data, {origin: -1});
            }
            console.log(worksheet)
            XLSX.writeFile(workBook, fileName)
        }
    }
}

/**
 * handleDataSave
 * @param data data
 * @param cellToWrites syntax :
 *      *: apply for all record
 *      1 | 2... | N : apply for record {0}
 *      If not have * and num of apply for record {0} < length data => cancel write
 *      Example:
 *        '*[A,B,C]'
 */
const handleDataSave = (data: object[], cellToWrites: string) => {
    const cellWithEachRow: any[] = []
    const pattern = /[\]\[]/g
    const cellOptions = cellToWrites.split(pattern)

    if (cellOptions.includes("*") || cellOptions.length / 2 === data.length) {
        const cellForAll: string[] = cellOptions.splice(0, 2)
        const cellForAny: string[] = cellOptions.splice(0, cellOptions.length - 1)

        data.forEach((value, index) => {
            if (cellForAny.includes(String(index + 1))) {
                cellWithEachRow[index] = cellForAny[cellForAny.indexOf(String(index + 1) + 2)].split(",")
            } else {
                cellWithEachRow[index] = cellForAll[1].split(",")
            }
        })
    }

    return cellWithEachRow
}