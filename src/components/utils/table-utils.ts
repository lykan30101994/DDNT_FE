import type {IHeaderTable} from "@/components/common/table/header/TableHeader.type";

export const useTable = (headers: IHeaderTable[][]) => {
    const mapFieldTable : {[key: string]: any} = {}
    headers?.forEach(header => {
        header?.forEach(column => {
            if (column.value) {
                mapFieldTable[column.value] = getAlignOfHeader(column.align)
            }
        })
    })

    return mapFieldTable
}

const getAlignOfHeader = (text: string | undefined) => {
    let classAlign = 'text-end'
    let index = -1

    if (text) {
        if (text.endsWith("end") || text.endsWith("left")) {
            index = text.lastIndexOf("end") ?? text.lastIndexOf("left")
        } else if (text.endsWith("center")) {
            index = text.lastIndexOf("center")
        } else if (text.endsWith("start") ?? text.endsWith("right")) {
            index = text.lastIndexOf("start") ?? text.lastIndexOf("right")
        }
    }

    if (index === -1) {
        return classAlign
    } else {
        return 'text-' + text?.substring(index)
    }
}