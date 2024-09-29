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
          class="align-center align-middle"
          :key="index"
        >
          <td width="100px">
            <input
              v-model="modelCheckBox[getKeyInput(item)]"
              type="checkbox"
              class="size-checkbox cursor-pointer mt-1"
            />
          </td>
          <td class="text-start d-flex">
            <p>{{ getKeyInput(item) }}</p>
            <div
              v-if="hasRequired(item)"
              class="label-required"
            >
              <p>*</p>
            </div>
          </td>
          <td>
            <input
              v-model="pattentTestCase[getKeyInput(item)]"
              type="text"
              :class="['w-100 form-control', onDataRequired(item) ? 'input-required' : 'input-normal']"
              :disabled="!modelCheckBox[getKeyInput(item)]"
              @input="changeDataRequiredInput($event, item)"
            />
            <p
              v-if="onDataRequired(item)"
              class="text-required"
            >
              Vui lòng nhập vào input
            </p>
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
import { CONSTANTS } from '@/components/constant'

const props = defineProps<{
  data: ITableEvent[]
  type: string
  lsRequired: string[]
  requireKey: string[]
  index: number
  isClickSave: boolean
}>()

const { TAB_PATTENT } = CONSTANTS

const pattentTestCase = defineModel({ default: {} as ITestCaseItem })
const modelCheckBox = ref<ITestCaseItem>({})
const keyRequiredItem = ref<string[]>(props.requireKey || [])

const changeDataRequiredInput = (event: Event, item: ITableEvent) => {
  const target = event.target as HTMLInputElement
  const value = target.value
  const { lsRequired } = props
  const keyField = getKeyInput(item, true)

  let index = -1
  for (let i in lsRequired) {
    const idx = parseInt(i)
    const keyCompare = concatCaseIndex(lsRequired[idx])

    if (keyCompare.localeCompare(keyField) === 0) {
      index = idx
      break
    }
  }

  if (value) {
    keyRequiredItem.value[index] = ''
  } else {
    keyRequiredItem.value[index] = keyField
  }
}

const concatCaseIndex = (str: string) => {
  return `${str}_case_${props.index}`
}

const onDataRequired = (item: ITableEvent) => {
  const { type, isClickSave } = props
  const keyField = getKeyInput(item, true)

  return keyRequiredItem.value.includes(keyField) && type === TAB_PATTENT.NORMAL && isClickSave
}

const hasRequired = (item: ITableEvent) => {
  const { lsRequired, type } = props
  const keyField = getKeyInput(item)

  return lsRequired.includes(keyField) && type === TAB_PATTENT.NORMAL
}

const getKeyInput = (item: ITableEvent, hasCaseIndex: boolean = false) => {
  let key = `${item.type}::${item.c_element}::${item.selector}`

  if (hasCaseIndex) {
    key = concatCaseIndex(key)
  }

  return key
}

const initCheckBox = () => {
  props.data?.forEach((item) => {
    const key = getKeyInput(item)

    if (pattentTestCase.value[key] || pattentTestCase.value[key] === '' || hasRequired(item)) {
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

const convertKeyRequired = (keyRequire: string[]) => {
  return keyRequire.filter((key) => !pattentTestCase.value[key]).map((item) => `${item}_case_${props.index}`)
}

const initKeyRequired = () => {
  const { requireKey } = props

  if (requireKey?.length) {
    keyRequiredItem.value = [...convertKeyRequired(keyRequiredItem.value)]
  }
}

onMounted(() => {
  initCheckBox()
  initKeyRequired()
})
</script>

<style lang="scss" scoped>
@import './FormTestCase.scss';
</style>
