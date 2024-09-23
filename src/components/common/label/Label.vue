<template>
  <div class="my-label">
    <span>{{ title }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>
