<template>
  <div class="main">
    <BreadCrumb>共通廃缶登録</BreadCrumb>
    <div class="container-fluid load-content">
      <LoadFileContent></LoadFileContent>
      <Content></Content>
    </div>
  </div>
</template>
<script setup lang="ts">
import BreadCrumb from "./components/BreadCrumb.vue"
import LoadFileContent from "./components/LoadFileContent.vue"
import Content from "./components/Content.vue";

</script>
<style lang="scss">
@import './home.page.scss';
</style>