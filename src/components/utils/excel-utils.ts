import Excel from 'exceljs'
import type { Cell, Row, Worksheet } from 'exceljs/index'
import { BlobUtils } from '@/components/utils/blob-utils'
import { getInfoTemplate } from '@/components/template/template'
export const ExcelUtils = {
  mergeCellRecaps: {},

  infoTemplate: {},

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

  insertNewRowInSheetWithFormat: async (
    worksheet: Worksheet,
    index: number,
    data: object[] = [],
    cellInsert: string[]
  ) => {
    await ExcelUtils.reCapMergeCell(worksheet)
    await ExcelUtils.unMergeAllSheet(worksheet)
    const previousRow = worksheet.getRow(index - 1)
    const newRow = await worksheet.insertRow(index, [])
    cellInsert.forEach((cell, index) => {
      newRow.getCell(cell).value = data[index]
    })
    await ExcelUtils.setStyleForRowByOldRow(newRow, previousRow)
    await ExcelUtils.mergeCellByNewRow(worksheet, index)
  },

  setStyleForRowByOldRow: async (row: Row, oldRow: Row) => {
    oldRow._cells.forEach((cell: Cell, colNumber: number) => {
      if (cell.style) {
        const newCell = row.getCell(colNumber + 1)
        newCell.style = cell.style
      }
    })
  },

  mergeCellByNewRow: async (worksheet: Worksheet, indexNewRow: number) => {
    Object.entries(ExcelUtils.mergeCellRecaps).forEach(([key, value]) => {
      const index = value.top
      if (index < indexNewRow) {
        worksheet.mergeCells(value)
      } else if (index >= indexNewRow) {
        if (index === indexNewRow) {
          worksheet.mergeCells(value)
        }
        const [start, end] = value.shortRange.split(':').map((cell) => {
          const col = cell.match(/[A-Z]+/)[0]
          const row = parseInt(cell.match(/\d+/)[0])
          return `${col}${row + 1}`
        })
        worksheet.mergeCells(`${start}:${end}`)
      }
    })
  },

  setInfoTemplate: (key: string) => {
    ExcelUtils.infoTemplate = getInfoTemplate(key)
  },

  writeWithTemplate: async (template: string, cellInsert: string) => {
    if (!template) {
      throw new Error('Template is empty...')
    }

    ExcelUtils.setInfoTemplate(template)
    const workbook = await ExcelUtils.getWorkBookWithTemplate(template)
    const worksheet = workbook?.worksheets[0]
    if (!worksheet) {
      throw new Error('Worksheet not found...')
    }

    const columns = 'A,E,AC,AM'.split(',')

    const columnNumbers = columns.map((column) => columnToNumber(column))

    await ExcelUtils.insertNewRowInSheetWithFormat(
      worksheet,
      9,
      [
        'TC00001',
        111,
        'Step 1: Nhập item password là 1111\nStep 2: Click button class::icon icon-eye password-indictor',
        1111
      ],
      columnNumbers
    )

    const data = await workbook.xlsx.writeBuffer()
    BlobUtils.downloadFile([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
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
