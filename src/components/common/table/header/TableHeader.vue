<template>
  <thead class="my-header">
  <tr v-for="(header, index) in headers" :key="index">
    <template v-for="(item, ind) in header" :key="ind">
      <th :colspan="item.colSpan ?? 1" :rowspan="item.rowSpan ?? 1">{{ item.text }}</th>
    </template>
  </tr>
  </thead>
</template>

<script setup lang="ts">
import type { IHeaderTable } from "./TableHeader.type";

defineProps<{
  headers: IHeaderTable[][]
}>();
</script>

<style lang="scss" scoped>
@import "./TableHeader";
</style>