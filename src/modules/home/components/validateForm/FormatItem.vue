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
  { value: 'N N N', text: 'N N N' },
  { value: '999', text: '999' },
  { value: 'yyyy/mm/dd', text: 'yyyy/mm/dd' }
])
</script>
