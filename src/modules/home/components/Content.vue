<template>
  <CardWrapper
    v-for="([key, value], index) in mapEvent.entries()"
    :key="index"
    :class="index === mapEvent.size - 1 ? 'mb-3' : ''"
  >
    <TableEvent
      :title="key"
      :headers="headersForTable"
      :data="value"
      :field-table="fieldTable"
    />
  </CardWrapper>
</template>

<script setup lang="ts">
import CardWrapper from '@/components/common/card/CardWrapper.vue'
import TableEvent from '@/modules/home/components/table/TableEvent.vue'
import { useTable } from '@/components/utils/table-utils'
import type { ITableEvent } from '@/modules/home/home.type'
import type { IHeaderTable } from '@/components/common/table/header/TableHeader.type'

defineProps<{
  mapEvent: Map<string, ITableEvent[]>
}>()
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
</script>

<style lang="scss" scoped>
@import '../home.page.scss';
</style>
