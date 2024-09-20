<template>
  <div class="table-responsive">
    <span v-if="title">
      {{ title }}
    </span>
    <table class="table">
      <TableHeader :headers></TableHeader>
    </table>
    <TableFooter>
      <h3>ssss</h3>
    </TableFooter>
  </div>
</template>

<script setup lang="ts">
import TableHeader from "./header/TableHeader.vue";
import TableFooter from "./footer/TableFooter.vue";
import type {IHeaderTable} from "./header/TableHeader.type";

defineProps<{
  data: []
  headers: IHeaderTable[][]
  title?: string
}>()
</script>