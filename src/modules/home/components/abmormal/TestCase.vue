<template>
  <table class="table text-center table-borderless">
    <tbody>
      <tr class="align-center">
        <td width="100px">Case {{ index }}</td>
        <td colspan="2">
          <input
            v-model="formTestCase.test_description"
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
            v-model="formTestCase.expected_result"
            type="text"
            class="w-100 form-control"
          />
        </td>
        <td width="300px">* EXPECTED RESULT</td>
      </tr>
      <tr v-for="(item, index) of data" :key="index" class="align-center">
        <td width="100px">
          <input
            v-model="modelCheckBox[`${item?.element_name}`]"
            type="checkbox"
            class="size-checkbox"
          />
        </td>
        <td class="text-start">
          <p>{{ item?.element_name }}</p>
        </td>
        <td>
          <input
            v-model="formTestCase[item?.element_name]"
            :disabled="!!modelCheckBox[`${item?.element_name}`]"
            type="text"
            class="w-100 form-control"
          />
        </td>
        <td width="300px"></td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";

defineProps<{
  data: IDataItem[];
  index: number;
}>();

const formTestCase = defineModel({ default: {} as ITestCaseItem });
const modelCheckBox = ref<ITestCaseItem>({});

watch(
  () => modelCheckBox.value,
  (newVal) => {
    Object.keys(newVal).forEach((key) => {
      if (newVal[key]) {
        formTestCase.value[key] = "";
      }
    });
  },
  { deep: true }
);
</script>

<style lang="scss" scoped>
@import "./abnormal.scss";
</style>