<template>
  <CardWrapper>
    <div class="bg-white">
      <div class="auto-resize align-items-center gap-3 mb-4">
        <Label title="EVENTS & ELEMENT FILE" />
        <div class="flex-grow-1">
          <div class="auto-resize align-items-center flex-wrap justify-content-between gap-2">
            <div class="flex-grow-1">
              <input
                type="file"
                class="form-control"
                id="fileUpload"
                @change="handleFileChange"
              />
            </div>
            <div class="auto-resize justify-content-end gap-2">
              <button
                class="btn btn-primary fw-bold"
                @click="uploadFile"
              >
                CHOOSE FILE
              </button>
              <button
                class="btn btn-success fw-bold"
                @click="loadData"
              >
                LOAD
              </button>
              <button
                class="btn btn-primary fw-bold"
                @click="loadExcelToObject"
              >
                LOAD-EXCEL
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="auto-resize align-items-center gap-3">
        <Label title="GO TO PAGE" />
        <div class="flex-grow-1">
          <div class="auto-resize align-items-center flex-wrap justify-content-between gap-2">
            <div class="flex-grow-1 position-relative">
              <input
                v-model="url"
                type="text"
                class="form-control"
                id="link"
                placeholder="Enter your link"
                @input="handleChangeURL"
              />
              <font-awesome-icon
                id="icon-check"
                class="tick-check"
                :icon="faCircleCheck"
              />
            </div>
            <div class="auto-resize justify-content-end gap-2">
              <button
                class="btn btn-secondary fw-bold"
                @click="handleCheckPage"
              >
                CHECK PAGE
              </button>
              <button
                class="btn btn-outline-success fw-bold"
                @click="handleSaveURL"
              >
                SAVE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </CardWrapper>
  <Content :map-event="dataMapTable" />
  <CardWrapper :is-fixed="true">
    <div class="d-flex group-item justify-content-end">
      <DropDown
        v-model="selectedLanguage"
        label="Select Language"
        size="lg"
        :options="optionLanguage"
        @update:model-value="() => changeLanguage(selectedLanguage?.toString() || '0')"
      />
      <ButtonGroup
        align="end"
        :buttons="buttonFooters"
        @on-click="handleExportTestCase"
      />
    </div>
  </CardWrapper>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import * as XLSX from 'xlsx'
import CardWrapper from '@/components/common/card/CardWrapper.vue'
import Label from '@/components/common/label/Label.vue'
import ButtonGroup from '@/components/common/button/ButtonGroup.vue'
import DropDown from '@/components/common/dropdown/DropDown.vue'
import Content from '@/modules/home/components/Content.vue'
import { CONSTANTS, LANGUAGE } from '@/components/constant'
import { localStorageUtil } from '@/components/utils/local-storage-ultil'
import vn from '../../../assets/locales/vn'
import en from '../../../assets/locales/en'
import jp from '../../../assets/locales/jp'
import type { IButton } from '@/components/common/button/ButtonGroup.type'
import type { IOption } from '@/components/common/dropdown/DropDown.type'
import type { IObjectType, IPattentLocalStorage, ITableEvent } from '@/modules/home/home.type'
import { useExcel } from '@/components/utils/excel-utils'
import { Template } from '@/components/template/template'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'

const { VALIDATTION, ABNORMAL, NORMAL } = CONSTANTS.TAB_PATTENT
const { FIRST, PURPOSE, DESCRIPTION, TEST_STEP, EXPECT_RESULT } = CONSTANTS.COLUMN_EXCEL
const { REQUIRED, FORMAT, MAXLENGTH } = CONSTANTS.KEY_VALIDATION
const { REGEX } = CONSTANTS
const keyNormal = [ABNORMAL, NORMAL]

const file = ref<File | null>(null)
const tableData = ref<string[][]>([])
const selectedLanguage = ref<string | number | undefined>()
const dataMapTable = ref<Map<string, ITableEvent[]>>(new Map())
const translations = ref(en)
const url = ref<string>('')
const indexTC = ref<number>(1)
const pattentLocalStorage = localStorageUtil(CONSTANTS.KEY_PATTENT)
const dataEventLocalStorage = localStorageUtil(CONSTANTS.KEY_LOCAL_STORAGE_DATA)
const urlStorage = localStorageUtil(CONSTANTS.KEY_STORAGE_URL)

const { writeWithTemplate } = useExcel()

const optionLanguage: IOption[] = [
  {
    label: 'EN',
    value: LANGUAGE.EN
  },
  {
    label: 'JP',
    value: LANGUAGE.JP
  }
]
const buttonFooters: IButton[] = [
  {
    type: 'cancel',
    label: 'Export Test cases',
    size: 'lg',
    btnClass: 'btn-primary',
    isBold: true,
    key: 'btn-2'
  }
]

const contentEvents = computed(() => {
  return tableData.value.splice(1)
})

const handleCheckPage = () => {
  const inputValue = document.getElementById('link') as HTMLInputElement
  const url = getURL(inputValue.value)

  if (url) {
    const windowFeatures = 'width=800,height=600,menubar=no,resizable=yes,scrollbars=yes,status=no'
    const newWindow = window.open(url, '_blank', windowFeatures)

    if (newWindow) {
      newWindow.focus()
    } else {
      alert('Please allow popups for this site')
    }
  }
}

const getURL = (link: string) => {
  let url = ''

  if (link) {
    url = link.startsWith('http://') || link.startsWith('https://') ? link : `https://${link}`
  }

  return url
}

const handleSaveURL = () => {
  setIconCheckDisplay(true)
  const inputURL = document.getElementById('link') as HTMLInputElement

  urlStorage.set(inputURL.value)
}

const resetData = () => {
  dataEventLocalStorage.remove()
  pattentLocalStorage.remove()
  tableData.value = []
}

const mapEvent = computed(() => {
  const map: Map<string, ITableEvent[]> = new Map()
  contentEvents.value?.forEach((event) => {
    if (event && event.length >= 5) {
      const key = `${event[1]} - ${event[2]} - ${event[3]}`
      const records = map.get(key) || []
      const selectors = event[4].split('::')
      records.push({
        serial: Number.parseInt(event[0]),
        category: event[1],
        type: selectors?.[0],
        c_element: selectors?.[1],
        selector: selectors?.[2],
        action: event?.[2],
        action_element: event?.[3]
      } as ITableEvent)

      map.set(key, records)
    }
  })

  return map
})

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement

  if (target.files && target.files.length > 0) {
    file.value = target.files[0]
    resetData()
  }
}

const handleChangeURL = () => {
  setIconCheckDisplay(false)
}

const setIconCheckDisplay = (show: boolean) => {
  const iconCheck = document.getElementById('icon-check')

  if (iconCheck) {
    iconCheck.style.opacity = show ? '1' : '0'
  }
}

const uploadFile = () => {
  if (file.value) {
    console.log('File uploaded:', file.value.name)
  } else {
    alert('Please select a file to upload.')
  }
}

const readExcelToArray = (indexSheet: number, indexReadData: number, header: 'A' | number | string[]) => {
  return new Promise((resolve, reject) => {
    if (file.value) {
      const reader = new FileReader()

      reader.onload = async (event) => {
        try {
          const data = new Uint8Array(event.target?.result as ArrayBuffer)
          const workbook = XLSX.read(data, { type: 'array' })
          const firstSheetName = workbook.SheetNames[indexSheet]
          const worksheet = workbook.Sheets[firstSheetName]
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header }).slice(indexReadData)

          resolve(jsonData)
        } catch (error) {
          reject(error)
        }
      }

      reader.onerror = (error) => {
        reject(error)
      }

      reader.readAsArrayBuffer(file.value)
    } else {
      alert('Please select a file to load data from.')
      reject(new Error('No file selected.'))
    }
  })
}

const loadData = () => {
  const indexSheet = 0
  const indexReadData = 1
  const header = 1

  readExcelToArray(indexSheet, indexReadData, header)
    .then((data: any) => {
      tableData.value = data
    })
    .catch((err) => {
      console.log(err)
    })
}

const loadExcelToObject = () => {
  const indexSheet = 2
  const indexReadData = 5
  const header = 'A'

  readExcelToArray(indexSheet, indexReadData, header)
    .then((data: any) => {
      const dataEvent = convertExcelToDateEvent(data)
      const pattents = converExcelToPattents(data)
      dataEventLocalStorage.set(dataEvent)
      pattentLocalStorage.set(pattents)
      setDataFromLocalStorage()
    })
    .catch((err) => {
      console.log(err)
    })
}

const convertExcelToDateEvent = (data: any[]) => {
  const output = {} as IObjectType
  let categoryCurrent = ''

  data.forEach((row) => {
    if (row[FIRST].includes('-')) {
      categoryCurrent = row[FIRST]
      output[categoryCurrent] = []
    } else if (row[PURPOSE]) {
      const element = getElementByRegex(row[PURPOSE])
      if (element) {
        const categorySplit = categoryCurrent.split(' - ')
        const elementSplit = element.split('::')

        if (categorySplit.length === 3 && elementSplit.length === 3) {
          const dataNew = {
            category: categorySplit[0],
            type: elementSplit[0],
            c_element: elementSplit[1],
            selector: elementSplit[2],
            action: categorySplit[1],
            action_element: categorySplit[2]
          }

          if (!isExistDataEvent(output[categoryCurrent], dataNew))
            output[categoryCurrent] = [...output[categoryCurrent], dataNew]
        }
      }
    }
  })

  return output
}

const converExcelToPattents = (data: any[]) => {
  const output = {} as IObjectType
  let categoryCurrent = ''
  let tabCurrent = ''

  data.forEach((row) => {
    if (row[FIRST].includes(' - ')) {
      categoryCurrent = row[FIRST]
      output[categoryCurrent] = {}
    } else if (row[FIRST] === '1.Validation') {
      tabCurrent = VALIDATTION
      output[categoryCurrent][VALIDATTION] = []
    } else if (row[FIRST] === '2.Abnormal') {
      tabCurrent = ABNORMAL
      output[categoryCurrent][ABNORMAL] = []
    } else if (row[FIRST] === '3.Normal') {
      tabCurrent = NORMAL
      output[categoryCurrent][NORMAL] = []
    } else {
      if (tabCurrent === VALIDATTION) {
        renderValidationFromExcel(row, output, categoryCurrent, tabCurrent)
      } else {
        renderPattentFromExcel(row, output, categoryCurrent, tabCurrent)
      }
    }
  })

  fillValidateProperties(output)

  return output
}

const renderValidationFromExcel = (row: any, output: any, categoryCurrent: string, tabCurrent: string) => {
  const categorySplit = categoryCurrent.split(' - ')
  let isCheckRequired = true

  let isCheckMaxlength = true
  let valueMaxLength = ''
  let dataCheckMaxLength = ''

  let isCheckFormat = true
  let valueFormat = ''
  let dataCheckFormat = ''

  let element = getElementByRegex(row[PURPOSE])

  if (isValidateRequied(row[PURPOSE])) {
    isCheckRequired = false
  }

  if (isValidateMaxlength(row[PURPOSE])) {
    const splitStep = row[TEST_STEP]?.split('\n')
    isCheckMaxlength = false
    valueMaxLength = getValueByRegex(row[PURPOSE])
    dataCheckMaxLength = getDataCheck(splitStep[0] || '')
  }

  if (isValidateFormat(row[PURPOSE])) {
    const splitStep = row[TEST_STEP]?.split('\n')
    isCheckFormat = false
    valueFormat = getValueByRegex(row[PURPOSE])
    dataCheckFormat = getDataCheck(splitStep[0] || '')
  }

  if (!isCheckRequired || !isCheckMaxlength || !isCheckFormat) {
    const indexValidate = findValidateByTitle(output[categoryCurrent][tabCurrent], element)

    const objectPattent: IObjectType = {
      title: element,
      action_element: categorySplit[2],
      action: 'onclick'
    }

    if (!isCheckRequired) {
      objectPattent[REQUIRED] = {
        data_check: 'blank',
        value: '',
        is_checked: false
      }
    }

    if (!isCheckMaxlength) {
      objectPattent[MAXLENGTH] = {
        data_check: dataCheckMaxLength,
        value: valueMaxLength,
        is_checked: false
      }
    }

    if (!isCheckFormat) {
      if (indexValidate === -1) {
        objectPattent[FORMAT] = []
      } else if (!objectPattent[FORMAT]) {
        objectPattent[FORMAT] = output[categoryCurrent][tabCurrent][indexValidate][FORMAT] || []
      }

      objectPattent[FORMAT] = [
        ...objectPattent[FORMAT],
        {
          data_check: dataCheckFormat,
          value: valueFormat,
          is_checked: false
        }
      ]
    }

    if (indexValidate === -1) {
      output[categoryCurrent][tabCurrent] = [...output[categoryCurrent][tabCurrent], objectPattent]
    } else {
      output[categoryCurrent][tabCurrent][indexValidate] = {
        ...output[categoryCurrent][tabCurrent][indexValidate],
        ...objectPattent
      }
    }
  }
}

const renderPattentFromExcel = (row: any, output: any, categoryCurrent: string, tabCurrent: string) => {
  if (!output[categoryCurrent][tabCurrent]) {
    output[categoryCurrent][tabCurrent] = []
  }

  const splitStep = row[TEST_STEP]?.split('\n')

  let objectPattent = {
    test_description: row[PURPOSE],
    description: row[DESCRIPTION],
    expected_result: row[EXPECT_RESULT]
  }

  if (splitStep && splitStep?.length) {
    splitStep.pop()
    splitStep.forEach((item: string) => {
      const element = getElementByRegex(item)
      const value = getDataCheck(item)

      objectPattent = {
        ...objectPattent,
        [element]: value
      }
    })
  }

  output[categoryCurrent][tabCurrent] = [...output[categoryCurrent][tabCurrent], objectPattent]
}

const fillValidateProperties = (output: any) => {
  const itemFill = {
    data_check: '',
    value: '',
    is_checked: true
  }

  for (const categoryCurrent in output) {
    output[categoryCurrent]?.[VALIDATTION]?.forEach((item: any) => {
      ;[REQUIRED, MAXLENGTH, FORMAT].forEach((type) => {
        if (type === FORMAT) {
          if (!item[type] && !item[type]?.length) {
            item[type] = [itemFill]
          }
        } else {
          if (!item[type]) {
            item[type] = itemFill
          }
        }
      })
    })
  }
}

const checkTypeValidate = (str: string, regex: RegExp) => {
  return regex.test(str)
}

const isValidateRequied = (str: string) => {
  return checkTypeValidate(str, REGEX.TYPE_VALIDATION_REQUIRED)
}

const isValidateMaxlength = (str: string) => {
  return checkTypeValidate(str, REGEX.TYPE_VALIDATION_MAX_LENGTH)
}

const isValidateFormat = (str: string) => {
  return checkTypeValidate(str, REGEX.TYPE_VALIDATION_FORMAT)
}

const isExistDataEvent = (data: any, obj: any) => {
  return data.some((item: IObjectType) => JSON.stringify(item) === JSON.stringify(obj))
}

const getElementByRegex = (str: string) => {
  const regexElement = /\[([^\]]+)\]/
  return str?.match(regexElement)?.[1] || ''
}

const getValueByRegex = (str: string) => {
  const regexElement = /\{([^\]]+)\}/
  return str?.match(regexElement)?.[1] || ''
}

const getDataCheck = (str: string) => {
  const spit = str.split(': ')
  return spit?.[2] || ''
}

const findValidateByTitle = (valdidations: any[], title: string) => {
  for (let i = 0; i < valdidations.length; i++) {
    if (valdidations[i].title === title) {
      return i
    }
  }

  return -1
}

const autoFillData = () => {
  const pattents = pattentLocalStorage.get()

  for (const category in pattents) {
    const normalFirst = pattents[category][NORMAL]?.[0]
    pattents[category][ABNORMAL]?.forEach((item: ITestCaseItem) => {
      const { action, action_element, expected_result, description, test_description, ...input } = item
      const keyMissing = getKeyRequiredMising(Object.keys(input), category)

      keyMissing.forEach((key) => {
        item[key] = normalFirst?.[key]
      })
    })
  }

  return pattents
}

const getKeyRequired = () => {
  const keyRequired = {} as IPattentLocalStorage
  const pattents = pattentLocalStorage.get()

  for (const category in pattents) {
    pattents[category][VALIDATTION]?.forEach(({ title, required }: IValidate) => {
      if (!required.is_checked) {
        if (!keyRequired[category]) {
          keyRequired[category] = [] as string[]
        }

        keyRequired[category].push(title as string)
      }
    })
  }

  return keyRequired
}

const getKeyRequiredMising = (keys: string[], category: string) => {
  const keyMissing = [] as string[]
  const keyRequireds = getKeyRequired()?.[category] || []

  keyRequireds?.forEach((keyRequired: string) => {
    if (!keys.includes(keyRequired)) {
      keyMissing.push(keyRequired)
    }
  })

  return keyMissing
}

const handleExportTestCase = () => {
  const pattents = autoFillData()
  if (pattents) {
    const testCase = converTestCase(pattents)
    resetIndexTC()

    writeWithTemplate(Template.TEST_CASE, testCase, 'A,E,N,AC,AM')
  }
}

const converTestCase = (pattents: IPattentLocalStorage) => {
  const arrTestCase = {} as IPattentLocalStorage
  for (const category in pattents) {
    arrTestCase[category] = convertTestCaseByCategory(pattents[category])
  }

  return arrTestCase
}

const convertTestCaseByCategory = (pattentsCategory: any) => {
  const objTestcase = {} as IPattentLocalStorage

  for (const key in pattentsCategory) {
    if (keyNormal.includes(key)) {
      objTestcase[key] = pattentsCategory[key]?.map((item: ITestCaseItem) => {
        return renderTestCaseNormal(item)
      })
    } else {
      objTestcase[key] = renderTestCaseValidation(pattentsCategory[key])
    }
  }

  return objTestcase
}

const renderTestCaseNormal = (input: any) => {
  const { test_description, description, expected_result, action, action_element, ...inputs } = input
  const no = `TC${String(indexTC.value).padStart(5, '0')}`
  let stepCounter = 1
  let testSteps = ''

  for (const [key, value] of Object.entries(inputs)) {
    const itemName = key.split('::')?.[2] ?? ''
    testSteps += translations.value.testStepCommon(stepCounter, key, value as string)
    stepCounter++
  }

  testSteps += translations.value.testStepSubmit(stepCounter, action_element)
  stepCounter++
  increaseIndexTC()

  return [no, test_description, description, testSteps.trim(), expected_result]
}

const increaseIndexTC = () => {
  indexTC.value++
}

const resetIndexTC = () => {
  indexTC.value = 1
}

const setDataFromLocalStorage = () => {
  const dataFromStore = localStorage.getItem(CONSTANTS.KEY_LOCAL_STORAGE_DATA)
  if (dataFromStore) {
    const obj = JSON.parse(dataFromStore)
    dataMapTable.value = new Map(Object.entries(obj))
  }
}

const renderTestCaseValidation = (inputData: any): string[][] => {
  const validation: string[][] = []

  inputData?.forEach((item: any) => {
    const element = item.title.trim()
    const actionElement = item.action_element
    const valueMaxlength = item?.max_length?.value
    const dataMaxlength = item?.max_length?.data_check
    // TODO
    const link = 'http://localhost:5173/home' // get value from varible url_storage
    const max_step = 3 // caculator max step (maybe = count item required - 1)

    if (!item.required.is_checked) {
      validation.push([
        `TC${String(indexTC.value).padStart(5, '0')}`,
        translations.value.validateRequired(element),
        translations.value.descriptionRequired(element),
        translations.value.testStepRequired(element, actionElement, link, max_step),
        translations.value.expectedResultRequired(element)
      ])
      increaseIndexTC()
    }

    if (!item.max_length.is_checked) {
      validation.push([
        `TC${String(indexTC.value).padStart(5, '0')}`,
        translations.value.validateMaxLength(element, valueMaxlength),
        translations.value.descriptionMaxlength(element),
        translations.value.testStepMaxlenght(element, actionElement, dataMaxlength, link, max_step),
        translations.value.expectedResultMaxLength(valueMaxlength)
      ])

      increaseIndexTC()
    }

    item.format.forEach((elements: any) => {
      if (!elements.is_checked) {
        const dataFormat = elements.data_check
        const valueFormat = elements.value
        validation.push([
          `TC${String(indexTC.value).padStart(5, '0')}`,
          translations.value.validateFormat(element, valueFormat),
          translations.value.descriptionFormat(element, valueFormat),
          translations.value.testStepFormat(element, dataFormat, actionElement, link, max_step),
          translations.value.expectedResultFormat(valueFormat)
        ])

        increaseIndexTC()
      }
    })
  })
  return validation
}

const changeLanguage = (lang: string) => {
  switch (lang.toString()) {
    case '0':
      translations.value = jp
      break
    case '1':
      translations.value = en
      break
  }
}

const setURLFromStorage = () => {
  const store = urlStorage.get()

  if (store && Object.keys(store).length > 0) {
    url.value = store
    setIconCheckDisplay(true)
  }
}

watch(
  () => mapEvent.value,
  (newValue) => {
    if (newValue) {
      const obj = Object.fromEntries(newValue)
      localStorage.setItem(CONSTANTS.KEY_LOCAL_STORAGE_DATA, JSON.stringify(obj))
      dataMapTable.value = newValue
    }
  },
  { deep: true }
)

onMounted(() => {
  setDataFromLocalStorage()
  setURLFromStorage()
})
</script>

<style lang="scss" scoped>
@import '../home.page.scss';
@import '../../../components/common/Common';
</style>
