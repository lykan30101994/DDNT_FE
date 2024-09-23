<template>
  <div class="my-table-title">
    <span v-if="title">{{ title }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>

<style lang="scss" scoped>
@import './TableTitle';
</style>
