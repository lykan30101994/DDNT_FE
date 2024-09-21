<template>
  <div class="main">
    <BreadCrumb>TOOL GEN TESTCASE UT</BreadCrumb>
    <div class="container-fluid load-content pa-5">
      <LoadFileContent></LoadFileContent>
    </div>
  </div>
</template>

<script setup lang="ts">
import BreadCrumb from "./components/BreadCrumb.vue";
import LoadFileContent from "./components/LoadFileContent.vue";
</script>

<style lang="scss">
@import "./home.page.scss";
</style>
