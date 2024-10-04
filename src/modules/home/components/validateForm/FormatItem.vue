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
      />
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
  { value: 'halfwidth_number', text: 'Haftwidth Numbers' },
  { value: 'halfwidth_alphabet', text: 'Haftwidth Alphabet Characters' },
  { value: 'halfwidth _katakana', text: 'Haftwidth Katakana' },
  { value: 'falfwidth _hiragana', text: 'Haftwidth Hiragana' },
  { value: 'fullwidth_halfwidth', text: 'Fullwidth/ Halfwidth Symbol' },
  { value: 'special_characters', text: 'Special Characters' },
  { value: 'yyyy/mm/dd hh:mm:ss', text: 'Incorrect date format (YYYY/MM/DD hh:mm:ss)' },
  { value: 'yyyy/mm/dd', text: 'Incorrect date format (YYYY/MM/DD)' },
  { value: 'yyyy/mm', text: 'Incorrect date format (YYYY/MM)' },
  { value: 'mm/dd', text: 'Incorrect date format (MM/DD)' },
  { value: 'past_date', text: 'Past Date' },
  { value: 'non_leap_years', text: 'The date for non-leap years.' }
])
</script>
