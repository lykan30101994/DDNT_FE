<template>
  <div class="d-flex justify-content-end">
    <div class="col-md-4 me-1">
      <label
        for="validationDefault01"
        class="form-label"
        >VALUE</label
      >
      <select
        v-model="validateForm.value"
        id="dropdown"
        class="form-control"
        :disabled="arrChecked"
      >
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.text }}
        </option>
      </select>
    </div>
    <div class="col-md-6">
      <label
        for="validationDefault02"
        class="form-label"
        >DATA CHECK</label
      >
      <input
        v-model="validateForm.data_check"
        type="text"
        class="form-control"
        id="validationDefault02"
        :disabled="arrChecked"
        @blur="validateInput"
      />
      <span
        v-if="errorMessage"
        class="text-danger"
        >{{ errorMessage }}</span
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const props = defineProps<{
  index: number
  arrChecked: boolean
}>()

const validateForm = defineModel<ICommonValidate>({
  default: {} as ICommonValidate
})

const options = ref([
  { value: '', text: '' },
  { value: 'email', text: 'Email' },
  { value: 'phone', text: 'Phone Numbers' },
  { value: 'fullwidth_number', text: 'Fullwidth Numbers' },
  { value: 'fullwidth_alphabet', text: 'Fullwidth Alphabet Characters' },
  { value: 'fullwidth_katakana', text: 'Fullwidth Katakana' },
  { value: 'fullwidth_hiragana', text: 'Fullwidth Hiragana' },
  { value: 'halfwidth_number', text: 'Halfwidth Numbers' },
  { value: 'halfwidth_alphabet', text: 'Halfwidth Alphabet Characters' },
  { value: 'halfwidth_katakana', text: 'Halfwidth Katakana' },
  { value: 'special_characters', text: 'Special Characters' },
  { value: 'yyyy/mm/dd hh:mm:ss', text: 'Incorrect date format (YYYY/MM/DD hh:mm:ss)' },
  { value: 'yyyy/mm/dd', text: 'Incorrect date format (YYYY/MM/DD)' },
  { value: 'yyyy/mm', text: 'Incorrect date format (YYYY/MM)' },
  { value: 'mm/dd', text: 'Incorrect date format (MM/DD)' }
])

const errorMessage = ref<string | null>(null)

const validateInput = () => {
  errorMessage.value = null
  const data_check = validateForm.value.data_check
  const { value } = validateForm.value

  switch (value) {
    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (emailRegex.test(data_check)) {
        errorMessage.value = 'Invalid format check data email'
      }
      break

    case 'phone':
      const phoneRegex = /^\+?[0-9\s\-]{7,15}$/
      if (phoneRegex.test(data_check)) {
        errorMessage.value = 'Invalid format check data phone number'
      }
      break

    case 'fullwidth_number':
      const fullwidthNumberRegex = /^[０-９]+$/
      if (fullwidthNumberRegex.test(data_check)) {
        errorMessage.value = 'Invalid format check data fullwidth number'
      }
      break

    case 'fullwidth_alphabet':
      const fullwidthAlphabetRegex = /^[Ａ-Ｚａ-ｚ]+$/
      if (fullwidthAlphabetRegex.test(data_check)) {
        errorMessage.value = 'Invalid format check data fullwidth alphabet'
      }
      break

    case 'fullwidth_katakana':
      const fullwidthKatakanaRegex = /^[ァ-ヶ]+$/
      if (fullwidthKatakanaRegex.test(data_check)) {
        errorMessage.value = 'Invalid format check data fullwidth katakana'
      }
      break

    case 'fullwidth_hiragana':
      const fullwidthHiraganaRegex = /^[ぁ-ん]+$/
      if (fullwidthHiraganaRegex.test(data_check)) {
        errorMessage.value = 'Invalid format check data fullwidth hiragana'
      }
      break

    case 'halfwidth_number':
      const halfwidthNumberRegex = /^[0-9]+$/
      if (halfwidthNumberRegex.test(data_check)) {
        errorMessage.value = 'Invalid format check data halfwidth number'
      }
      break

    case 'halfwidth_alphabet':
      const halfwidthAlphabetRegex = /^[A-Za-z]+$/
      if (halfwidthAlphabetRegex.test(data_check)) {
        errorMessage.value = 'Invalid format check data halfwidth alphabet'
      }
      break

    case 'halfwidth_katakana':
      const halfwidthKatakanaRegex = /^[ｦ-ﾝ]+$/
      if (halfwidthKatakanaRegex.test(data_check)) {
        errorMessage.value = 'Invalid format check data halfwidth katakana'
      }
      break

    case 'yyyy/mm/dd hh:mm:ss':
      const halfwidthDateTimeRegex =
        /^(19|20)\d{2}\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01]) (0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/
      if (halfwidthDateTimeRegex.test(data_check)) {
        errorMessage.value = 'Invalid format check data yyyy/mm/dd hh:mm:ss'
      }
      break
    case 'yyyy/mm/dd':
      const yearMonthDateRegex = /^(19|20)\d{2}\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/
      if (yearMonthDateRegex.test(data_check)) {
        errorMessage.value = 'Invalid format check data yyyy/mm/dd'
      }
      break

    case 'yyyy/mm':
      const yearMonthRegex = /^(19|20)\d{2}\/(0[1-9]|1[0-2])$/
      if (yearMonthRegex.test(data_check)) {
        errorMessage.value = 'Invalid format check data yyyy/mm'
      }
      break

    case 'mm/dd':
      const monthDateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/
      if (monthDateRegex.test(data_check)) {
        errorMessage.value = 'Invalid format check data mm/dd'
      }
      break

    case 'special_characters':
      const specialCharactersRegex = /^[!@#$%^&*(),.?":{}|<>]+$/
      if (specialCharactersRegex.test(data_check)) {
        errorMessage.value = 'Invalid format check data special_characters'
      }
      break

    default:
      errorMessage.value = 'Invalid format'
      break
  }
}
</script>

<style scoped>
.text-danger {
  color: red;
}
</style>
