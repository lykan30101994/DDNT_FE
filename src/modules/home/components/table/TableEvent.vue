<template>
  <TableTitle :title="title"/>
  <div class="table-responsive">
    <table class="table table-bordered table-hover">
      <TableHeader title="showHidePassword - onclick - class::icon icon-eye password-indictor" :headers="headers"/>
      <tbody>
      <tr>
        <td v-for="(item, index) in data" :key="index">
          {{ item }}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">

import type {IHeaderTable} from "../../../../components/common/table/header/TableHeader.type";
import TableHeader from "../../../../components/common/table/header/TableHeader.vue";
import TableTitle from "../../../../components/common/table/title/TableTitle.vue";

defineProps<{
  headers: IHeaderTable[][]
  data: object[]
  title?: string
}>()
</script>