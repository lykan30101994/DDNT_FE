<template>
  <div v-for="(testCase, index) of listTestCase" :key="index">
    <TestCase
      v-model="listTestCase[index]"
      :data="dataSource"
      :index="index + 1"
    />
  </div>
  <div class="text-end">
    <button class="btn btn-primary" @click="handleAddCase">ADD CASE</button>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import TestCase from "./TestCase.vue";

const props = withDefaults(
  defineProps<{
    data?: IDataItem[];
  }>(),
  {
    data: () => [
      {
        event_name: "doLogin",
        action: "onclick",
        action_element: "id::btn_login",
        element_name: "text::id::user_id",
      },
      {
        event_name: "doLogin",
        action: "onclick",
        action_element: "id::btn_login",
        element_name: "password::id::password",
      },
    ],
  }
);

const emit = defineEmits<{
  updateTestCase: [value: ITestCaseItem[]];
}>();

const dataSource = ref<IDataItem[]>(props.data);
const listTestCase = ref<ITestCaseItem[]>([{}]);

const handleAddCase = () => {
  listTestCase.value.push({} as ITestCaseItem);
};

watch(
  () => listTestCase.value,
  () => {
    emit("updateTestCase", listTestCase.value);
  },
  { deep: true }
);
</script>

<style lang="scss" scoped>
@import "./abnormal.scss";
</style>