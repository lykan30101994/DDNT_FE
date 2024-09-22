<template>
  <CardWrapper
      v-for="([key, value], index) in mapEvent.entries()"
      :key="index" :class="index === mapEvent.size - 1 ? 'mb-3' : ''"
  >
    <TableEvent
        :title="key"
        :headers="headersForTable"
        :data="value"
        :field-table="fieldTable"
    />
  </CardWrapper>

  <Button label="Write File" @click="writeToExcel"></Button>
</template>

<script setup lang="ts">
import CardWrapper from "@/components/common/card/CardWrapper.vue";
import TableEvent from "@/modules/home/components/table/TableEvent.vue";
import Button from "@/components/common/button/Button.vue";
import {useTable} from "@/components/utils/table-utils";
import {ExcelUtils} from "@/components/utils/excel-utils";
import {TEMPLATE} from "@/components/template/template";
import type {ITableEvent} from "@/modules/home/home.type";
import type {IHeaderTable} from "@/components/common/table/header/TableHeader.type";

defineProps<{
  mapEvent: Map<string, ITableEvent[]>
}>()

const headersForTable: IHeaderTable[][] = [
  [
    {
      text: '#',
      value: 'serial',
      align: 'center',
      width: 60
    },
    {
      text: 'Category',
      value: 'category',
      align: 'start',
      width: 200
    },
    {
      text: 'Type',
      value: 'type',
      align: 'start',
      width: 200
    },
    {
      text: 'CElement',
      value: 'c_element',
      align: 'start',
      width: 200
    },
    {
      text: 'Id / Name / Class',
      value: 'selector',
      align: 'start',
      width: 200
    }
  ]
]

const fieldTable = useTable(headersForTable)

const writeToExcel = () => {
  const dataToSave = [
    { Name: "John", Age: 30, Mark: 10, Phone: "09999" },
    { Name: "Jane", Age: 25, Mark: 10, Phone: "09999" },
    { Name: "Jane", Age: 25, Mark: 10, Phone: "09999" },
    { Name: "Jane", Age: 25, Mark: 10, Phone: "09999" },
    { Name: "Jane", Age: 25, Mark: 10, Phone: "09999" },
    { Name: "Jane", Age: 25, Mark: 10, Phone: "09999" },
    { Name: "Jane", Age: 25, Mark: 10, Phone: "09999" },
    { Name: "Jane", Age: 25, Mark: 10, Phone: "09999" },
    { Name: "Jane", Age: 25, Mark: 10, Phone: "09999" },
    { Name: "Jane", Age: 25, Mark: 10, Phone: "09999" },
    { Name: "Jane", Age: 25, Mark: 10, Phone: "09999" },
    { Name: "Jane", Age: 25, Mark: 10, Phone: "09999" },
    { Name: "Jane", Age: 25, Mark: 10, Phone: "09999" },
    { Name: "Jane", Age: 25, Mark: 10, Phone: "09999" },
    { Name: "Jane", Age: 25, Mark: 10, Phone: "09999" },
    { Name: "Jane", Age: 25, Mark: 10, Phone: "09999" },
    { Name: "Jane", Age: 25, Mark: 10, Phone: "09999" },
    { Name: "Jane", Age: 25, Mark: 10, Phone: "09999" },
    { Name: "Jane", Age: 25, Mark: 10, Phone: "09999" }
  ];

  ExcelUtils.writeWithTemplate(TEMPLATE.TEST_CASE,
      dataToSave, "excel-test.xlsx", "Sheet1", "*[A,B,C,D]")
}

</script>

<style lang="scss" scoped>
@import "../home.page.scss";
</style>
