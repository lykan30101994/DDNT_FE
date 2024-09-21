<template>
  <TableTitle :title="title"/>
  <div class="table-responsive mb-2">
    <table class="table table-bordered table-hover table-fixed">
      <TableHeader title="showHidePassword - onclick - class::icon icon-eye password-indictor" :headers="headers"/>
      <tbody>
      <tr
          v-for="(row, ind) in data"
          :key="ind"
      >
        <template v-for="(field, index) in Object.keys(fieldTable)" :key="index">
          <td
              v-if="index === 0"
              :class="fieldTable?.[field]"
          >
            {{ ind + 1 }}
          </td>
          <td
              v-else
              :class="fieldTable?.[field]"
          >
            {{ row?.[field] }}
          </td>
        </template>
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
  fieldTable: {[key: string] : string}
}>()
</script>

<style lang="scss" scoped>
@import "../../../home/home.page";
</style>