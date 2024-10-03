<template>
  <CardWrapper>
    <div class="auto-resize align-items-center bg-white gap-3">
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
import type { IPattentLocalStorage, ITableEvent } from '@/modules/home/home.type'
import { useExcel } from '@/components/utils/excel-utils'
import { Template } from '@/components/template/template'

const { VALIDATTION, ABNORMAL, NORMAL } = CONSTANTS.TAB_PATTENT
const keyNormal = [ABNORMAL, NORMAL]

const file = ref<File | null>(null)
const headers = ref<string[]>([])
const tableData = ref<string[][]>([])
const selectedLanguage = ref<string | number | undefined>()
const dataMapTable = ref<Map<string, ITableEvent[]>>(new Map())
const translations = ref(jp)
const indexTC = ref<number>(1)
const pattentLocalStorage = localStorageUtil(CONSTANTS.KEY_PATTENT)

const { writeWithTemplate } = useExcel()

const optionLanguage: IOption[] = [
  {
    label: 'JP',
    value: LANGUAGE.JP
  },
  {
    label: 'EN',
    value: LANGUAGE.EN
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
  }
}

const uploadFile = () => {
  if (file.value) {
    console.log('File uploaded:', file.value.name)
  } else {
    alert('Please select a file to upload.')
  }
}

const loadData = () => {
  if (file.value) {
    pattentLocalStorage.remove()
    const reader = new FileReader()
    reader.onload = (event) => {
      const data = new Uint8Array(event.target?.result as ArrayBuffer)
      const workbook = XLSX.read(data, { type: 'array' })
      const firstSheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[firstSheetName]

      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 })
      if (jsonData.length > 0) {
        headers.value = jsonData[0] as string[]
        tableData.value = jsonData.slice(1) as string[][]
      }
    }

    reader.readAsArrayBuffer(file.value)
  } else {
    alert('Please select a file to load data from.')
  }
}

const autoFillData = () => {
  const pattents = pattentLocalStorage.get()

  for (const category in pattents) {
    const normalFirst = pattents[category][NORMAL]?.[0]
    pattents[category][ABNORMAL]?.forEach((item: ITestCaseItem) => {
      const { action, action_element, expected_result, test_description, ...input } = item
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
  const { test_description, expected_result, action, action_element, ...inputs } = input
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

  return [no, test_description, '', testSteps.trim(), expected_result]
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

    if (!item.required.is_checked) {
      validation.push([
        `TC${String(indexTC.value).padStart(5, '0')}`,
        translations.value.validateRequired(element),
        '',
        translations.value.testStepRequired(element, actionElement),
        translations.value.expectedResultRequired(element)
      ])
      increaseIndexTC()
    }

    if (!item.max_length.is_checked) {
      validation.push([
        `TC${String(indexTC.value).padStart(5, '0')}`,
        translations.value.validateMaxLength(element, valueMaxlength),
        '',
        translations.value.testStepMaxlenght(element, actionElement, dataMaxlength),
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
          '',
          translations.value.testStepFormat(element, dataFormat, actionElement),
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
})
</script>

<style lang="scss" scoped>
@import '../home.page.scss';
@import '../../../components/common/Common';
</style>
