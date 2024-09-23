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
              @change="handleFileChange"
              id="fileUpload"
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
  <Content :map-event="mapEvent" />
  <CardWrapper :is-fixed="true">
    <div class="d-flex group-item justify-content-end">
      <DropDown
        v-model="selectedLanguage"
        label="Select Language"
        size="lg"
        :options="optionLanguage"
      />
      <ButtonGroup
        align="end"
        :buttons="buttonFooters"
      />
    </div>
  </CardWrapper>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import * as XLSX from 'xlsx'
import CardWrapper from '@/components/common/card/CardWrapper.vue'
import Label from '@/components/common/label/Label.vue'
import ButtonGroup from '@/components/common/button/ButtonGroup.vue'
import DropDown from '@/components/common/dropdown/DropDown.vue'
import Content from '@/modules/home/components/Content.vue'
import { CONSTANTS, LANGUAGE } from '@/components/constant'
import { localStorageUtil } from '@/components/utils/local-storage-ultil'
import type { IButton } from '@/components/common/button/ButtonGroup.type'
import type { IOption } from '@/components/common/dropdown/DropDown.type'
import type { ITableEvent } from '@/modules/home/home.type'

const file = ref<File | null>(null)
const headers = ref<string[]>([])
const tableData = ref<string[][]>([])
const selectedLanguage = ref<string | number>()

const optionLanguage: IOption[] = [
  {
    label: 'Vietnam',
    value: LANGUAGE.VN
  },
  {
    label: 'Japan',
    value: LANGUAGE.JP
  },
  {
    label: 'English',
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
    const fileLocalStorage = localStorageUtil(CONSTANTS.KEY_CURRENT_FILE)
    fileLocalStorage.set(file.value.name)
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
</script>

<style lang="scss" scoped>
@import '../home.page.scss';
@import '../../../components/common/Common';
</style>
