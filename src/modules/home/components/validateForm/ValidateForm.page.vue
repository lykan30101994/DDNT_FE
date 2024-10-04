<template>
  <form class="row g-3 mt-2">
    <h5>{{ validateForm.title }}</h5>
    <div class="col-md-6">
      <div class="form-check">
        <input
          :checked="!validateForm.required.is_checked"
          class="form-check-input"
          type="checkbox"
          :id="`invalidRequired${index}`"
          @click="toggleInput('required')"
        />
        <label
          class="form-check-label"
          :for="`invalidRequired${index}`"
        >
          REQUIRED
        </label>
      </div>
    </div>
    <div class="col-md-6">
      <label
        :for="`dataCheckRequired${index}`"
        class="form-label"
        >DATA CHECK</label
      >
      <input
        v-model="validateForm.required.data_check"
        type="text"
        class="form-control"
        :id="`dataCheckRequired${index}`"
        :disabled="arrChecked.isRequiredChecked"
      />
    </div>
    <div class="col-md-2">
      <div class="form-check">
        <input
          :checked="!validateForm.max_length.is_checked"
          class="form-check-input"
          type="checkbox"
          :id="`invalidMaxLength${index}`"
          @click="toggleInput('maxlength')"
        />
        <label
          class="form-check-label"
          :for="`invalidMaxLength${index}`"
        >
          MAXLENGTH
        </label>
      </div>
    </div>
    <div class="col-md-4">
      <label
        :for="`valueMaxLength${index}`"
        class="form-label"
        >VALUE</label
      >
      <input
        v-model="validateForm.max_length.value"
        type="number"
        class="form-control"
        :id="`valueMaxLength${index}`"
        :disabled="arrChecked.isMaxLengthChecked"
      />
    </div>
    <div class="col-md-6">
      <label
        :for="`dataCheckMaxLength${index}`"
        class="form-label"
        >DATA CHECK</label
      >
      <input
        v-model="validateForm.max_length.data_check"
        type="text"
        class="form-control"
        :id="`dataCheckMaxLength${index}`"
        :disabled="arrChecked.isMaxLengthChecked"
      />
    </div>
    <div class="col-md-2">
      <div class="form-check">
        <input
          :checked="!validateForm.format[0].is_checked"
          class="form-check-input"
          type="checkbox"
          :id="`invalidFormat${index}`"
          @click="toggleInput('format')"
        />
        <label
          class="form-check-label"
          :for="`invalidFormat${index}`"
        >
          FORMAT
        </label>
      </div>
    </div>
    <template
      v-for="(testCase, index) of validateForm.format"
      :key="index"
    >
      <FormatItem
        v-model="validateForm.format[index]"
        :index="index"
        :arr-checked="validateForm.format[0].is_checked"
      >
      </FormatItem>
    </template>
    <div class="text-end">
      <button
        type="button"
        class="btn btn-primary"
        @click="handleAddCase"
      >
        ADD FORMAT
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FormatItem from './FormatItem.vue'

defineProps<{
  index: number
}>()

const validateForm = defineModel<IValidate>({
  default: {} as IValidate
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

const valid = validateForm.value

const arrChecked = ref({
  isRequiredChecked: valid.required.is_checked,
  isMaxLengthChecked: valid.max_length.is_checked,
  isFormatChecked: valid.format[0].is_checked
})

const toggleInput = (type: string) => {
  const ischecked = arrChecked.value

  if (type === 'required') {
    ischecked.isRequiredChecked = !ischecked.isRequiredChecked
    setDefaultValue('required', ischecked.isRequiredChecked)
  } else if (type === 'maxlength') {
    ischecked.isMaxLengthChecked = !ischecked.isMaxLengthChecked
    setDefaultValue('maxlength', ischecked.isMaxLengthChecked)
  } else {
    ischecked.isFormatChecked = !ischecked.isFormatChecked
    setDefaultValue('format', ischecked.isFormatChecked)
  }
}

const setDefaultValue = (title: string, value: boolean) => {
  const valid = validateForm.value

  if (title === 'required') {
    valid.required.is_checked = value
    valid.required.data_check = !value ? 'blank' : ''
  } else if (title === 'maxlength') {
    valid.max_length.is_checked = value
    valid.max_length.data_check = ''
    valid.max_length.value = ''
  } else {
    valid.format.forEach((element) => {
      element.is_checked = value
      element.data_check = ''
      element.value = ''
    })
  }
}

const handleAddCase = () => {
  validateForm.value.format.push({ is_checked: arrChecked.value.isFormatChecked } as ICommonValidate)
}
</script>

<style></style>
