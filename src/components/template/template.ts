export const TEMPLATE = {
    TEST_CASE: './excel-utils.xlsx'
}

export const getInfoExcel = (key: string) => {
    let info: { number_header: number, start_cell: string } = {}

    switch (key) {
        case TEMPLATE.TEST_CASE:
            info = {
                number_header: 1,
                start_cell: "A1"
            }
            break;
    }

    return info
}