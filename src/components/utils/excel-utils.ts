import Excel from 'exceljs'
import type { Cell, Row, Worksheet } from 'exceljs/index'
import { BlobUtils } from '@/components/utils/blob-utils'
import { getInfoTemplate } from '@/components/template/template'
import { auto } from '@popperjs/core'
export const ExcelUtils = {
  mergeCellRecaps: {},

  getWorkBookWithTemplate: async (path: string) => {
    try {
      const response = await fetch(path)
      if (!response.ok) {
        throw new Error('Đã xảy ra lỗi mạng')
      }
      const data = await response.arrayBuffer()
      const workbook = new Excel.Workbook()
      await workbook.xlsx.load(data)
      return workbook
    } catch (error) {
      console.error('Đã xảy ra lỗi khi tải file:', error)
    }
  },

  reCapMergeCell: async (worksheet: Worksheet) => {
    ExcelUtils.mergeCellRecaps = { ...worksheet._merges }
  },

  unMergeAllSheet: async (worksheet: Worksheet) => {
    Object.entries(worksheet._merges).forEach(([key, value]) => {
      worksheet.unMergeCells(value)
    })
  },

  updateRowByIndex: async (worksheet: Worksheet, data: object[], index: number, cellInsert: number[]) => {
    const rowUpdate = worksheet.getRow(index)
    cellInsert.forEach((cell, index) => {
      rowUpdate.getCell(cell).value = data[index]
    })

    rowUpdate.commit()
  },

  insertNewRowInSheetWithFormat: async (
    worksheet: Worksheet,
    index: number,
    data: object[] = [],
    cellInsert: number[]
  ) => {
    await ExcelUtils.reCapMergeCell(worksheet)
    await ExcelUtils.unMergeAllSheet(worksheet)
    const previousRow = worksheet.getRow(index - 1)
    const newRow = await worksheet.insertRow(index, [])
    cellInsert.forEach((cell, index) => {
      newRow.getCell(cell).value = data[index]
    })
    await ExcelUtils.setStyleForRowByOldRow(newRow, previousRow)
    await ExcelUtils.mergeCellByNewRow(worksheet, index, 1)

    newRow.commit()
  },

  setStyleForRowByOldRow: async (row: Row, oldRow: Row) => {
    oldRow._cells.forEach((cell: Cell, colNumber: number) => {
      if (cell.style) {
        const newCell = row.getCell(colNumber + 1)
        newCell.style = cell.style
      }
    })
  },

  mergeCellByNewRow: async (worksheet: Worksheet, indexNewRow: number, tag: number) => {
    const previousCellMerges: any[] = []

    Object.entries(ExcelUtils.mergeCellRecaps).forEach(([key, value]) => {
      const index = value.top
      if (index < indexNewRow) {
        if (index === indexNewRow - 1) {
          previousCellMerges.push(value)
        }
        worksheet.mergeCells(value)
      } else if (index >= indexNewRow) {
        if (index === indexNewRow && tag === -1) {
          return
        }

        const [start, end] = value.shortRange.split(':').map((cell: any) => {
          const col = cell.match(/[A-Z]+/)[0]
          const row = parseInt(cell.match(/\d+/)[0])
          return `${col}${row + tag}`
        })
        worksheet.mergeCells(`${start}:${end}`)
      }
    })

    if (tag > 0) {
      previousCellMerges?.forEach((mergeValue) => {
        const [start, end] = mergeValue.shortRange.split(':').map((cell: string) => {
          const col = cell?.match(/[A-Z]+/)?.[0]
          const row = parseInt(cell?.match(/\d+/)?.[0] ?? '')
          return `${col}${row + 1}`
        })
        worksheet.mergeCells(`${start}:${end}`)
      })
    }
  },

  writeWithTemplate: async (template: string, data: ICategoryTemplate, cellInsert: string) => {
    if (!template) {
      throw new Error('Template is empty...')
    }

    const infoTemplate = getInfoTemplate(template)
    const workbook = await ExcelUtils.getWorkBookWithTemplate(template)
    const worksheet = workbook?.getWorksheet('テストケース')

    if (!worksheet) {
      throw new Error('Worksheet not found...')
    }

    const columns = cellInsert.split(/[\\,|\s+]/g)
    const columnNumbers = columns.map((column) => columnToNumber(column))
    const categoryWrite = infoTemplate.category_write
    let startRowWrite = infoTemplate.start_row

    if (categoryWrite) {
      for (let i in categoryWrite) {
        const category = categoryWrite[i]
        const dataWrites = data?.[category]
        let skip = infoTemplate.skip_row
        let rowAvailable = infoTemplate.row_available

        for (let i = 0; i < dataWrites?.length; ) {
          const row = dataWrites?.[i]

          if (skip) {
            skip--
          } else {
            if (rowAvailable-- > 0) {
              await ExcelUtils.updateRowByIndex(worksheet, row, startRowWrite, columnNumbers)
            } else {
              await ExcelUtils.insertNewRowInSheetWithFormat(worksheet, startRowWrite, row, columnNumbers)
            }
            i++
          }

          startRowWrite++
        }
      }
    }

    const buffer = await workbook?.xlsx.writeBuffer()
    if (buffer) {
      BlobUtils.downloadFile([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    }
  }
}

export const columnToNumber = (column: string) => {
  let number = 0
  const length = column.length

  for (let i = 0; i < length; i++) {
    number *= 26
    number += column.charCodeAt(i) - 'A'.charCodeAt(0) + 1
  }

  return number
}

export interface ICategoryTemplate {
  validation: any[][]
  abnormal: any[][]
  normal: any[][]
  [key: string]: any[][]
}
