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
  <Button label="SELECT VIEW POINT" size="lg" btn-class="btn-danger"/>
</template>

<script setup lang="ts">

import type {IHeaderTable} from "../../../../components/common/table/header/TableHeader.type";
import TableHeader from "../../../../components/common/table/header/TableHeader.vue";
import TableTitle from "../../../../components/common/table/title/TableTitle.vue";
import Button from "@/components/common/button/Button.vue";
import type {ITableEvent} from "@/modules/home/home.type";

defineProps<{
  headers: IHeaderTable[][]
  data: ITableEvent[]
  title?: string
}>()
</script>