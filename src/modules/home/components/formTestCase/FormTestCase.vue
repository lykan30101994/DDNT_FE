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
import { onMounted, ref, watch } from 'vue'
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
const listPattent = ref<ITestCaseItem[]>(props.pattents || [{}])

const handleAddCase = () => {
  listPattent.value.push({} as ITestCaseItem)
}

const initPattents = () => {
  if(!listPattent.value?.length) {
    listPattent.value =  [{}]
  }
}

watch(
  () => listPattent.value,
  () => {
    emit('updatePattent', props.type, listPattent.value)
  },
  { deep: true }
)

onMounted(() => {
  initPattents()
})
</script>

<style lang="scss" scoped>
@import './FormTestCase.scss';
</style>
