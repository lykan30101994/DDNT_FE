<template>
  <div
    v-for="(testCase, index) of listPattent"
    :key="index"
  >
    <TestCase
      v-model="listPattent[index]"
      :data="dataSource"
      :index="index + 1"
    />
  </div>
  <div class="text-end">
    <button
      class="btn btn-primary"
      @click="handleAddCase"
    >
      ADD CASE
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import TestCase from './TestCaseItem.vue'
import type { ITableEvent } from '../../home.type'

const props = withDefaults(
  defineProps<{
    type: string
    data?: ITableEvent[]
    pattents?: ITestCaseItem[]
  }>(),
  {
    data: () => [{} as ITableEvent]
  }
)

const emit = defineEmits<{
  updatePattent: [type: string, value: ITestCaseItem[]]
}>()

const dataSource = ref<ITableEvent[]>(props.data)
const listPattent = ref<ITestCaseItem[]>(props.pattents || ([{}] as ITestCaseItem[]))

const handleAddCase = () => {
  listPattent.value.push({} as ITestCaseItem)
}

watch(
  () => listPattent.value,
  () => {
    emit('updatePattent', props.type, listPattent.value)
  },
  { deep: true }
)
</script>

<style lang="scss" scoped>
@import './FormTestCase.scss';
</style>
