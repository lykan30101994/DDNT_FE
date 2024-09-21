<template>
  <form class="row g-3 mt-2" v-for="(row, index) in rows" :key="index">
    <h5>{{ row.type }}::{{ row.c_element }}::{{ row.name }}</h5>
    <div class="col-md-6">
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          @click="toggleInput(index, 'required')"
        />
        <label class="form-check-label" for="invalidCheck2"> REQUIRED </label>
      </div>
    </div>
    <div class="col-md-6">
      <label for="validationDefault02" class="form-label">DATA CHECK</label>
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
        <label class="form-check-label" for="invalidCheck2"> MAXLENGTH </label>
      </div>
    </div>
    <div class="col-md-4">
      <label for="validationDefault01" class="form-label">VALUE</label>
      <input
        type="text"
        class="form-control"
        id="validationDefault01"
        :disabled="arrChecked[index].isMaxLengthChecked"
      />
    </div>
    <div class="col-md-6">
      <label for="validationDefault02" class="form-label">DATA CHECK</label>
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
          id="invalidCheck2"
          @click="toggleInput(index, 'format')"
        />
        <label class="form-check-label" for="invalidCheck2"> FORMAT </label>
      </div>
    </div>
    <div class="col-md-4">
      <label for="validationDefault01" class="form-label">VALUE</label>
      <input
        type="text"
        class="form-control"
        id="validationDefault01"
        value="50"
        :disabled="arrChecked[index].isFormatChecked"
      />
    </div>
    <div class="col-md-6">
      <label for="validationDefault02" class="form-label">DATA CHECK</label>
      <input
        type="text"
        class="form-control"
        id="validationDefault02"
        value="Test0001"
        :disabled="arrChecked[index].isFormatChecked"
      />
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
    rows: Record<string, any>[];
}>();

const arrChecked = ref(
    props.rows.map((_, index) => {
    return {
      isRequiredChecked: false,
      isMaxLengthChecked: false,
      isFormatChecked: false,
    };
  })
);

const toggleInput = (index: number, type: string) => {
  const ischecked = arrChecked.value[index];

  if (type === "required") {
    ischecked.isRequiredChecked = !ischecked.isRequiredChecked;
  } else if (type === "maxlength") {
    ischecked.isMaxLengthChecked = !ischecked.isMaxLengthChecked;
  } else {
    ischecked.isFormatChecked = !ischecked.isFormatChecked;
  }
};
</script>

<style></style>
