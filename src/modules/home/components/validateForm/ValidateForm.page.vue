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
          :checked="!validateForm.format.is_checked"
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
    <div class="col-md-4">
      <label
        :for="`valueFormat${index}`"
        class="form-label"
        >VALUE</label
      >
      <select
        v-model="validateForm.format.value"
        class="form-control"
        :id="`valueFormat${index}`"
        :disabled="arrChecked.isFormatChecked"
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
        :for="`dataCheckFormat${index}`"
        class="form-label"
        >DATA CHECK</label
      >
      <input
        v-model="validateForm.format.data_check"
        type="text"
        class="form-control"
        :id="`dataCheckFormat${index}`"
        :disabled="arrChecked.isFormatChecked"
      />
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  index: number
}>()

const validateForm = defineModel<IValidate>({
  default: {} as IValidate
})

const options = ref([
  { value: '', text: '' },
  { value: 'N N N', text: 'N N N' },
  { value: '999', text: '999' },
  { value: 'yyyy/mm/dd', text: 'yyyy/mm/dd' }
])

const valid = validateForm.value

const arrChecked = ref({
  isRequiredChecked: valid.required.is_checked,
  isMaxLengthChecked: valid.max_length.is_checked,
  isFormatChecked: valid.format.is_checked
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
    valid.format.is_checked = value
    valid.format.data_check = ''
    valid.format.value = ''
  }
}
</script>

<style></style>
