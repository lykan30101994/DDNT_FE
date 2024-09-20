<template>
  <div class="main">
    <BreadCrumb>TOOL GEN TESTCASE UT</BreadCrumb>
    <div class="container-fluid load-content">
      <LoadFileContent @data-uploaded="updateData"></LoadFileContent>
      <Content :data="data"></Content>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import BreadCrumb from "./components/BreadCrumb.vue";
import LoadFileContent from "./components/LoadFileContent.vue";
import Content from "./components/Content.vue";
import { TaskData } from '../types/TaskData.ts';

const data = ref<TaskData[]>([]);

const updateData = (newData: TaskData[]) => {
  data.value = newData;
};
</script>
<style lang="scss">
@import "./home.page.scss";
</style>
