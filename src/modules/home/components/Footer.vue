<template>
  <CardWrapper>
    <div class="pb-3">
      <div class="d-flex justify-content-end bg-white wapper footer">
        <DropdownComponent />
        <button type="button" class="btn btn-primary fw-bold ms-3">EXPORT TEST CASES</button>
      </div>
    </div>
  </CardWrapper>
</template>

<script setup lang="ts">
import DropdownComponent from "../../../components/common/DropdownComponent.vue"
</script>

<style lang="scss" scoped>
@import "../home.page.scss";
</style>
