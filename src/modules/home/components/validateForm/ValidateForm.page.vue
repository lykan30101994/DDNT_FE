<template>
  <form class="row g-3 mt-2">
    <h5>{{ validateForm.title }}</h5>
    <div class="col-md-6">
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          id="invalidCheck1"
          @click="toggleInput('required')"
        />
        <label class="form-check-label" for="invalidCheck1"> REQUIRED </label>
      </div>
    </div>
    <div class="col-md-6">
      <label for="validationDefault02" class="form-label">DATA CHECK</label>
      <input
        v-model="validateForm.validation.required.data_required"
        type="text"
        class="form-control"
        id="validationDefault02"
        :disabled="arrChecked.isRequiredChecked"
      />
    </div>
    <div class="col-md-2">
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          id="invalidCheck2"
          @click="toggleInput('maxlength')"
        />
        <label class="form-check-label" for="invalidCheck2"> MAXLENGTH </label>
      </div>
    </div>
    <div class="col-md-4">
      <label for="validationDefault01" class="form-label">VALUE</label>
      <input
        v-model="validateForm.validation.max_length.value_max_length"
        type="text"
        class="form-control"
        id="validationDefault01"
        :disabled="arrChecked.isMaxLengthChecked"
      />
    </div>
    <div class="col-md-6">
      <label for="validationDefault02" class="form-label">DATA CHECK</label>
      <input
        v-model="validateForm.validation.max_length.data_max_length"
        type="text"
        class="form-control"
        id="validationDefault02"
        :disabled="arrChecked.isMaxLengthChecked"
      />
    </div>
    <div class="col-md-2">
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          id="invalidCheck3"
          @click="toggleInput('format')"
        />
        <label class="form-check-label" for="invalidCheck3"> FORMAT </label>
      </div>
    </div>
    <div class="col-md-4">
      <label for="validationDefault01" class="form-label">VALUE</label>
      <select
        v-model="validateForm.validation.format.value_format"
        id="dropdown"
        class="form-control"
        :disabled="arrChecked.isFormatChecked"
      >
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.text"
        >
          {{ option.text }}
        </option>
      </select>
    </div>
    <div class="col-md-6">
      <label for="validationDefault02" class="form-label">DATA CHECK</label>
      <input
        v-model="validateForm.validation.format.data_format"
        type="text"
        class="form-control"
        id="validationDefault02"
        :disabled="arrChecked.isFormatChecked"
      />
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";

const validateForm = defineModel<IValidateForm>({
  
  default: {} as IValidateForm,
});

const options = ref([
  { value: 0, text: "" },
  { value: 1, text: "N N N" },
  { value: 2, text: "999" },
  { value: 3, text: "yyyy/mm/dd" },
]);

const arrChecked = ref({
  isRequiredChecked: true,
  isMaxLengthChecked: true,
  isFormatChecked: true,
});

const toggleInput = (type: string) => {
  const ischecked = arrChecked.value;
  validateForm;
  if (type === "required") {
    ischecked.isRequiredChecked = !ischecked.isRequiredChecked;
    setDefaultValue("required", ischecked.isRequiredChecked);
  } else if (type === "maxlength") {
    ischecked.isMaxLengthChecked = !ischecked.isMaxLengthChecked;
    setDefaultValue("maxlength", ischecked.isMaxLengthChecked);
  } else {
    ischecked.isFormatChecked = !ischecked.isFormatChecked;
    setDefaultValue("format", ischecked.isFormatChecked);
  }
};

const setDefaultValue = (title: string, value: boolean) => {
  const validate = validateForm.value.validation
  if (title === "required") {
    validate.required.required = value;
    validate.required.data_required = "";
  } else if (title === "maxlength") {
    validate.max_length.max_length = value;
    validate.max_length.data_max_length = "";
    validate.max_length.value_max_length = "";
  } else {
    validate.format.format = value;
    validate.format.data_format = "";
    validate.format.value_format = "";
  }
};
</script>

<style></style>
