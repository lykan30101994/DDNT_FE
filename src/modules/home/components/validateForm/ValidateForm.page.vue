<template>
  <form
    class="row g-3 mt-2"
    v-for="(row, index) in data"
    :key="index"
  >
    <h5>{{ row.type }}::{{ row.c_element }}::{{ row.selector }}</h5>
    <div class="col-md-6">
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          id="invalidCheck1"
          @click="toggleInput(index, 'required')"
        />
        <label
          class="form-check-label"
          for="invalidCheck1"
        >
          REQUIRED
        </label>
      </div>
    </div>
    <div class="col-md-6">
      <label
        for="validationDefault02"
        class="form-label"
        >DATA CHECK</label
      >
      <input
        type="text"
        class="form-control"
        id="validationDefault02"
        :disabled="arrChecked[index].isRequiredChecked"
      />
    </div>
    <div class="col-md-2">
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          id="invalidCheck2"
          @click="toggleInput(index, 'maxlength')"
        />
        <label
          class="form-check-label"
          for="invalidCheck2"
        >
          MAXLENGTH
        </label>
      </div>
    </div>
    <div class="col-md-4">
      <label
        for="validationDefault01"
        class="form-label"
        >VALUE</label
      >
      <input
        type="text"
        class="form-control"
        id="validationDefault01"
        :disabled="arrChecked[index].isMaxLengthChecked"
      />
    </div>
    <div class="col-md-6">
      <label
        for="validationDefault02"
        class="form-label"
        >DATA CHECK</label
      >
      <input
        type="text"
        class="form-control"
        id="validationDefault02"
        :disabled="arrChecked[index].isMaxLengthChecked"
      />
    </div>
    <div class="col-md-2">
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          id="invalidCheck3"
          @click="toggleInput(index, 'format')"
        />
        <label
          class="form-check-label"
          for="invalidCheck3"
        >
          FORMAT
        </label>
      </div>
    </div>
    <div class="col-md-4">
      <label
        for="validationDefault01"
        class="form-label"
        >VALUE</label
      >
      <select
        id="dropdown"
        class="form-control"
        :disabled="arrChecked[index].isFormatChecked"
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
        type="text"
        class="form-control"
        id="validationDefault02"
        :disabled="arrChecked[index].isFormatChecked"
      />
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { ITableEvent } from '@/modules/home/home.type'

const props = defineProps<{
  data: ITableEvent[]
}>()

const options = ref([
  { value: 0, text: '' },
  { value: 1, text: 'N N N' },
  { value: 2, text: '999' },
  { value: 3, text: 'yyyy/mm/dd' }
])

const arrChecked = ref(
  props.data.map((_, index) => {
    return {
      isRequiredChecked: true,
      isMaxLengthChecked: true,
      isFormatChecked: true
    }
  })
)

const toggleInput = (index: number, type: string) => {
  const ischecked = arrChecked.value[index]

  if (type === 'required') {
    ischecked.isRequiredChecked = !ischecked.isRequiredChecked
  } else if (type === 'maxlength') {
    ischecked.isMaxLengthChecked = !ischecked.isMaxLengthChecked
  } else {
    ischecked.isFormatChecked = !ischecked.isFormatChecked
  }
}
</script>

<style></style>
