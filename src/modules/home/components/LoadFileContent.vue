<template>
  <CardWrapper>
    <div class="auto-resize align-items-center bg-white gap-3">
      <Label title="EVENTS & ELEMENT FILE"/>
      <div class="flex-grow-1">
        <div class="auto-resize align-items-center flex-wrap justify-content-between gap-2">
          <div class="flex-grow-1">
            <input
                type="file"
                class="form-control"
                @change="handleFileChange"
                id="fileUpload"
            />
          </div>
          <div class="auto-resize justify-content-end gap-2">
            <button
                class="btn btn-primary fw-bold"
                @click="uploadFile"
            >
              CHOOSE FILE
            </button>
            <button
                class="btn btn-success fw-bold"
                @click="loadData"
            >
              LOAD
            </button>
          </div>
        </div>
      </div>
    </div>
  </CardWrapper>
  <CardWrapper>
    <Table title="sssss" :data="[]" :headers="[]"></Table>
  </CardWrapper>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import * as XLSX from "xlsx";
import CardWrapper from "@/components/common/card/CardWrapper.vue";
import Table from "@/components/common/table/Table.vue";
import Label from "@/components/common/label/Label.vue";

const file = ref<File | null>(null);
const headers = ref<string[]>([]);
const tableData = ref<string[][]>([]);

const contentEvents = computed(() => {
  return tableData.value.splice(1)
})

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    file.value = target.files[0];
  }
};

const uploadFile = () => {
  if (file.value) {
    console.log("File uploaded:", file.value.name);
  } else {
    alert("Please select a file to upload.");
  }
};

const loadData = () => {
  if (file.value) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];

      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      if (jsonData.length > 0) {
        headers.value = jsonData[0] as string[];
        tableData.value = jsonData.slice(1) as string[][];
        console.log(headers.value);
        console.log(tableData.value);
      }
    };

    reader.readAsArrayBuffer(file.value);
  } else {
    alert("Please select a file to load data from.");
  }
};

const parseData = (text: string) => {
  const rows = text.split("\n");
  if (rows.length > 0) {
    headers.value = rows[0].split(",").map((header) => header.trim());
    tableData.value = rows
      .slice(1)
      .map((row) => row.split(",").map((cell) => cell.trim()));
  }
};
</script>

<style lang="scss" scoped>
@import "../home.page.scss";
@import "../../../components/common/Common";
</style>
