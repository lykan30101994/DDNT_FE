<template>
  <div
    class="breadcrumb d-flex justify-content-between align-items-center"
    :class="breadcrumbClass"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  breadcrumbClass?: string
}>()
</script>
<style lang="scss">
@import '../home.page.scss';
</style>
