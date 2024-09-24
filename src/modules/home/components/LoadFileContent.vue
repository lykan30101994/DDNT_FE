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

const { VALIDATTION, ABNORMAL, NORMAL } = CONSTANTS.TAB_PATTENT

const file = ref<File | null>(null)
const headers = ref<string[]>([])
const tableData = ref<string[][]>([])
const selectedLanguage = ref<string | number | undefined>()
const dataMapTable = ref<Map<string, ITableEvent[]>>(new Map())
const translations = ref(jp)
const pattentLocalStorage = localStorageUtil(CONSTANTS.KEY_PATTENT)

const optionLanguage: IOption[] = [
  {
    label: 'VN',
    value: LANGUAGE.VN
  },
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

const handleExportTestCase = () => {
  const pattents = pattentLocalStorage.get()

  if (pattents) {
    const dataExport = convertLocalStorageToTestCase(pattents)
    console.log(dataExport)
  }
}

const convertLocalStorageToTestCase = (pattents: IPattentLocalStorage) => {
  const arrTestCase = {} as IPattentLocalStorage
  const pattentCombined = combine(pattents)
  let index = 0
  for (const key in pattentCombined) {
    arrTestCase[key] = pattentCombined[key]?.map((item: ITestCaseItem) => {
      index++
      return renderTestCase(item, index)
    })
  }

  return arrTestCase
}

const combine = (pattents: IPattentLocalStorage) => {
  const arrResult = { [ABNORMAL]: [], [NORMAL]: [] } as IPattentLocalStorage

  for (const key in pattents) {
    if (pattents[key][ABNORMAL]) {
      arrResult[ABNORMAL].push(...pattents[key][ABNORMAL])
    }
    if (pattents[key][NORMAL]) {
      arrResult[NORMAL].push(...pattents[key][NORMAL])
    }
  }

  return arrResult
}

const renderTestCase = (input: any, index: number) => {
  const { test_description, expected_result, action, action_element, ...inputs } = input
  const no = 'TC0000' + index
  let stepCounter = 1
  let testSteps = ''

  for (const [key, value] of Object.entries(inputs)) {
    const itemName = key.split('::')?.[2] ?? ''
    testSteps += `Step ${stepCounter}: Nhập item ${itemName} là ${value}\n`
    stepCounter++
  }

  testSteps += `Step ${stepCounter}: Click button ${action_element}\n`
  stepCounter++
  const result = {
    no: no,
    purpose: test_description,
    description: null,
    pre_condition: null,
    test_step: testSteps.trim(),
    expected_result,
    actual_result: null,
    status: null,
    comments: null
  }

  return result
}
const setDataFromLocalStorage = () => {
  const dataFromStore = localStorage.getItem(CONSTANTS.KEY_LOCAL_STORAGE_DATA)
  if (dataFromStore) {
    const obj = JSON.parse(dataFromStore)
    dataMapTable.value = new Map(Object.entries(obj))
  }
}

const changeLanguage = (lang: string) => {
  switch (lang.toString()) {
    case '0':
      translations.value = vn
      break
    case '1':
      translations.value = jp
      break
    case '2':
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
