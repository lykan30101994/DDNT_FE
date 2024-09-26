import Excel from 'exceljs'
import type { Cell, Row, Worksheet } from 'exceljs/index'
import { BlobUtils } from '@/components/utils/blob-utils'
import { getInfoTemplate } from '@/components/template/template'
import { capitalizeFirstLetter } from '@/components/utils/text-utils'

export const useExcel = () => {
  let mergeCellRecaps = {}
  let currentRow = 0

  const getWorkBookWithTemplate = async (path: string) => {
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
  }

  const reCapMergeCell = async (worksheet: Worksheet) => {
    mergeCellRecaps = { ...worksheet._merges }
  }

  const unMergeAllSheet = async (worksheet: Worksheet) => {
    Object.entries(worksheet._merges).forEach(([key, value]) => {
      worksheet.unMergeCells(value)
    })
  }

  const setCurrentRow = (row: number) => {
    currentRow = row
  }

  const updateRowByIndex = async (worksheet: Worksheet, data: any[], index: number, cellInsert: number[]) => {
    const rowUpdate = worksheet.getRow(index)
    cellInsert.forEach((cell, index) => {
      rowUpdate.getCell(cell).value = data[index]
    })

    rowUpdate.commit()
  }

  const insertNewRowInSheetWithFormat = async (
    worksheet: Worksheet,
    index: number,
    data: object[] = [],
    cellInsert: number[]
  ) => {
    const newRow = await copyNewRowInSheet(worksheet, index, index - 1)

    cellInsert.forEach((cell, index) => {
      newRow.getCell(cell).value = data[index]
    })

    newRow.commit()
  }

  const copyNewRowInSheet = async (worksheet: Worksheet, indexNewRow: number, indexCopyRow: number) => {
    const isLastNewRow = currentRow <= indexNewRow
    let rowRef = indexCopyRow
    let functionMerge = mergeCellLastRow

    if (!isLastNewRow) {
      rowRef = 1
      await reCapMergeCell(worksheet)
      await unMergeAllSheet(worksheet)
      functionMerge = mergeAllCellByNewRow
    }

    const previousRow = worksheet.getRow(indexCopyRow)
    const newRow = await worksheet.insertRow(indexNewRow, [])
    await setStyleForRowByOldRow(newRow, previousRow)
    await functionMerge(worksheet, indexNewRow, rowRef)

    currentRow++

    return newRow
  }

  const setStyleForRowByOldRow = async (row: Row, oldRow: Row) => {
    oldRow._cells.forEach((cell: Cell, colNumber: number) => {
      if (cell.style) {
        const newCell = row.getCell(colNumber + 1)
        newCell.style = cell.style
      }
    })
  }

  const mergeCellLastRow = async (worksheet: Worksheet, indexNewRow: number, indexCopyRow: number) => {
    Object.entries(worksheet._merges)?.forEach(([key, value]) => {
      const index = value.top
      if (index === indexCopyRow) {
        const [start, end] = value.shortRange.split(':').map((cell: any) => {
          const col = cell.match(/[A-Z]+/)[0]
          return `${col}${indexNewRow}`
        })
        worksheet.mergeCells(`${start}:${end}`)
      }
    })
  }

  const mergeAllCellByNewRow = async (worksheet: Worksheet, indexNewRow: number, tag: number) => {
    const previousCellMerges: any[] = []

    Object.entries(mergeCellRecaps).forEach(([key, value]) => {
      const index = value.top
      if (index < indexNewRow) {
        // Save all merge cell of row previous
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
  }

  const cloneCategoryGroupTemplate = async (worksheet: Worksheet, rowStart: number, rowEnd: number, curRow: number) => {
    for (let i = rowStart; i <= rowEnd; i++) {
      await copyNewRowInSheet(worksheet, curRow++, i)
    }
  }

  const writeWithTemplate = async (template: string, data: ICategoryGroupTemplate, cellInsert: string) => {
    if (!template) {
      throw new Error('Template is empty...')
    }

    const { start_row, end_row, category_write, skip_row, row_available, header_group, cell_write_header } =
      getInfoTemplate(template)
    const workbook = await getWorkBookWithTemplate(template)
    const worksheet = workbook?.getWorksheet('テストケース')
    const patternColumn = /[\\,|\s+]/g
    const columns = cellInsert.split(patternColumn)
    const columnNumbers = columns.map((column) => columnToNumber(column))
    const columnHeaders = cell_write_header.split(patternColumn)
    const columnNumberHeaders = columnHeaders.map((column) => columnToNumber(column))

    if (!worksheet) {
      throw new Error('Worksheet not found...')
    }

    setCurrentRow(end_row + 1)

    // Clone template category group
    for (let i = 2; i <= Object.keys(data).length; i++) {
      const nextRowWrite = (end_row - start_row + 1) * i
      await cloneCategoryGroupTemplate(worksheet, start_row, end_row, nextRowWrite)
    }

    let startRowWrite = start_row

    for (const key in data) {
      const dataCategoryGroup = data[key]
      const categoryWrite = category_write
      let headerCategoryGroup = header_group

      if (categoryWrite) {
        for (let type in categoryWrite) {
          const category = categoryWrite[type]
          const dataWrites = dataCategoryGroup?.[category]
          let headerCategory = skip_row
          let rowAvailable = row_available

          for (let i = 0; i < dataWrites?.length; ) {
            const row = dataWrites?.[i]

            if (headerCategoryGroup > 0) {
              await updateRowByIndex(worksheet, [key], startRowWrite, columnNumberHeaders)
              headerCategoryGroup--
            } else if (headerCategory > 0) {
              await updateRowByIndex(
                worksheet,
                [Number(type) + 1 + '.' + capitalizeFirstLetter(category)],
                startRowWrite,
                columnNumberHeaders
              )
              headerCategory--
            } else {
              if (rowAvailable-- > 0) {
                await updateRowByIndex(worksheet, row, startRowWrite, columnNumbers)
              } else {
                await insertNewRowInSheetWithFormat(worksheet, startRowWrite, row, columnNumbers)
              }
              i++
            }

            startRowWrite++
          }

          while (headerCategoryGroup-- > 0) {
            await updateRowByIndex(worksheet, [key], startRowWrite++, columnNumberHeaders)
          }

          while (headerCategory-- > 0) {
            await updateRowByIndex(
              worksheet,
              [Number(type) + 1 + '.' + capitalizeFirstLetter(category)],
              startRowWrite++,
              columnNumberHeaders
            )
          }

          while (headerCategory-- > 0 || rowAvailable-- > 0 || headerCategoryGroup-- > 0) {
            startRowWrite++
          }
        }
      }
    }

    const buffer = await workbook?.xlsx.writeBuffer()
    if (buffer) {
      BlobUtils.downloadFile([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    }
  }

  return {
    writeWithTemplate
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

export interface ICategoryGroupTemplate {
  [key: string]: ICategoryTemplate
}
