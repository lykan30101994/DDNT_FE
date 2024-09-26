<template>
  <div>
    <hr v-if="index > 1" />
    <table class="table text-center table-borderless">
      <tbody>
        <tr class="align-center">
          <td width="100px">Case {{ index }}</td>
          <td colspan="2">
            <input
              v-model="pattentTestCase.test_description"
              type="text"
              class="w-100 form-control"
            />
          </td>
          <td width="300px">* TEST DESCRIPTION</td>
        </tr>
        <tr class="align-center">
          <td width="100px"></td>
          <td colspan="2">
            <input
              v-model="pattentTestCase.expected_result"
              type="text"
              class="w-100 form-control"
            />
          </td>
          <td width="300px">* EXPECTED RESULT</td>
        </tr>
        <tr
          v-for="(item, index) of data"
          class="align-center"
          :key="index"
        >
          <td width="100px">
            <input
              v-model="modelCheckBox[getKeyInput(item)]"
              type="checkbox"
              class="size-checkbox cursor-pointer mt-1"
            />
          </td>
          <td class="text-start">
            <p>{{ getKeyInput(item) }}</p>
          </td>
          <td>
            <input
              v-model="pattentTestCase[getKeyInput(item)]"
              type="text"
              class="w-100 form-control"
              :disabled="!modelCheckBox[getKeyInput(item)]"
            />
          </td>
          <td width="300px"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import type { ITableEvent } from '../../home.type'

const props = defineProps<{
  data: ITableEvent[]
  index: number
}>()

const pattentTestCase = defineModel({ default: {} as ITestCaseItem })

const modelCheckBox = ref<ITestCaseItem>({})

const getKeyInput = (item: ITableEvent) => {
  return `${item.type}::${item.c_element}::${item.selector}`
}

const initCheckBox = () => {
  props.data?.forEach((item) => {
    const key = getKeyInput(item)

    if (pattentTestCase.value[key] || pattentTestCase.value[key] === '') {
      modelCheckBox.value[key] = true
    }
  })
}

watch(
  () => modelCheckBox.value,
  (newVal) => {
    Object.keys(newVal).forEach((key) => {
      const valuePattent = pattentTestCase.value[key]

      if (!newVal[key]) {
        delete pattentTestCase.value[key]
      } else if (!valuePattent) {
        pattentTestCase.value[key] = ''
      }
    })
  },
  { deep: true }
)

onMounted(() => {
  initCheckBox()
})
</script>

<style lang="scss" scoped>
@import './FormTestCase.scss';
</style>
