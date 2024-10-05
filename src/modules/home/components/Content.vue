<template>
  <CardWrapper
    v-for="([key, value], index) in mapEvent.entries()"
    :key="index"
    :class="index === mapEvent.size - 1 ? 'mb-3' : ''"
  >
    <div class="my-input-page">
      <ButtonGroup
        :buttons="buttonFooters"
        @click="goToPage(index)"
      />
      <input
        type="text"
        class="input-page"
        :value="mapUrl?.get(key)"
        :id="`page${index}`"
        @input="onChangeURL(key, $event)"
      />
    </div>
    <TableEvent
      :title="key"
      :headers="headersForTable"
      :data="value"
      :field-table="fieldTable"
    />
  </CardWrapper>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import CardWrapper from '@/components/common/card/CardWrapper.vue'
import TableEvent from '@/modules/home/components/table/TableEvent.vue'
import { useTable } from '@/components/utils/table-utils'
import type { ITableEvent } from '@/modules/home/home.type'
import type { IHeaderTable } from '@/components/common/table/header/TableHeader.type'
import ButtonGroup from '@/components/common/button/ButtonGroup.vue'
import { CONSTANTS } from '@/components/constant'
import type { IButton } from '@/components/common/button/ButtonGroup.type'
import { localStorageUtil } from '@/components/utils/local-storage-ultil'

defineProps<{
  mapEvent: Map<string, ITableEvent[]>
}>()

const mapUrl = ref<Map<string, string>>(new Map())

const buttonFooters: IButton[] = [
  {
    label: 'Go page',
    btnClass: 'btn-secondary'
  }
]

const headersForTable: IHeaderTable[][] = [
  [
    {
      text: '#',
      value: 'serial',
      align: 'center',
      width: 60
    },
    {
      text: 'Category',
      value: 'category',
      align: 'start',
      width: 200
    },
    {
      text: 'Type',
      value: 'type',
      align: 'start',
      width: 200
    },
    {
      text: 'CElement',
      value: 'c_element',
      align: 'start',
      width: 200
    },
    {
      text: 'Id / Name / Class',
      value: 'selector',
      align: 'start',
      width: 200
    }
  ]
]

const fieldTable = useTable(headersForTable)
const urlStorage = localStorageUtil(CONSTANTS.KEY_URL_STORAGE)

/**
 * Check page url
 */
const goToPage = (index: number) => {
  const inputPage = document.getElementById(`page${index}`) as HTMLInputElement
  const url = getURLFromInput(inputPage.value)

  if (inputPage && inputPage.value) {
    window.open(url, 'newWindow', 'width=800,height=600,resizable=yes,scrollbars=yes')
  } else {
    console.error(`Element with id 'page${index}' not found or has no value.`)
  }
}

const getURLFromInput = (value: string) => {
  let url

  if (value) {
    url = value.startsWith('http://') || value.startsWith('https://') ? value : `https://${value}`
  } else {
    url = ''
  }

  return url
}

const onChangeURL = (key: string, event: Event) => {
  const inputValue = (event.target as HTMLInputElement).value
  mapUrl.value.set(key, inputValue)
  urlStorage.set(Object.fromEntries(mapUrl.value))
}

const setURLStorage = () => {
  const localStorage = urlStorage.get()

  if (localStorage && Object.keys(localStorage).length > 0) {
    mapUrl.value = new Map(Object.entries(localStorage))
  }
}

onMounted(() => {
  setURLStorage()
})
</script>

<style lang="scss" scoped>
@import '../home.page.scss';
</style>
