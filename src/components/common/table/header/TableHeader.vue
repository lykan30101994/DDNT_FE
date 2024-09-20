<template>
  <thead>
  <th>
    <td>ss</td>
    <td>ss</td>
    <td>ss</td>
    <td>ss</td>
    <td>ss</td>
    <td>ss</td>
  </th>
  </thead>
</template>

<script setup lang="ts">
import type { IHeaderTable } from "./TableHeader.type";

defineProps<{
  headers: IHeaderTable[][]
}>();
</script>