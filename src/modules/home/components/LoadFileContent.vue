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
  <Content :map-event="dataMapTable"/>
  <CardWrapper :is-fixed="true">
    <div class="d-flex group-item justify-content-end">
      <DropDown
          v-model="selectedLanguage"
          label="Select Language"
          size="lg"
          :options="optionLanguage"
      />
      <ButtonGroup
          align="end"
          :buttons="buttonFooters"
      />
    </div>
  </CardWrapper>
</template>

<script setup lang="ts">
import {computed, onMounted, ref, watch} from "vue";
import * as XLSX from "xlsx";
import CardWrapper from "@/components/common/card/CardWrapper.vue";
import Label from "@/components/common/label/Label.vue";
import ButtonGroup from "@/components/common/button/ButtonGroup.vue";
import DropDown from "@/components/common/dropdown/DropDown.vue";
import {LANGUAGE} from "@/components/enum";
import {CONSTANT} from "@/components/constant";
import type {IButton} from "@/components/common/button/ButtonGroup.type";
import type {IOption} from "@/components/common/dropdown/DropDown.type";
import type {ITableEvent} from "@/modules/home/home.type";
import Content from "@/modules/home/components/Content.vue";

const file = ref<File | null>(null);
const headers = ref<string[]>([]);
const tableData = ref<string[][]>([]);
const selectedLanguage = ref<string | number>();
const dataMapTable = ref<Map<string, ITableEvent[]>>(new Map())

const optionLanguage: IOption[] = [
  {
    label: 'Vietnam',
    value: LANGUAGE.VN
  },
  {
    label: 'Japan',
    value: LANGUAGE.JP
  },
  {
    label: 'English',
    value: LANGUAGE.EN
  },
]
const buttonFooters: IButton[] = [
    {
      type: 'cancel',
      label: 'Export Test cases',
      size: 'lg',
      btnClass: 'btn-primary',
      isBold: true,
      key: 'btn-2'
    }
]

const contentEvents = computed(() => {
  return tableData.value.splice(1)
})

const mapEvent = computed(() => {
  const map: Map<string, ITableEvent[]> = new Map()

  contentEvents.value?.forEach(event => {
    if (event && event.length >= 5) {
      const key = `${event[1]} - ${event[2]} - ${event[3]}`
      const records = map.get(key) || []
      const selectors = event[4].split("::")
      records.push({
        serial: event[0],
        category: event[1],
        type: selectors?.[0],
        c_element: selectors?.[1],
        selector: selectors?.[2]
      } as ITableEvent)

      map.set(key, records)
    }
  })

  return map
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
      console.log(workbook)
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];

      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      if (jsonData.length > 0) {
        headers.value = jsonData[0] as string[];
        tableData.value = jsonData.slice(1) as string[][];
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

const setDataFromLocalStorage = () => {
  const dataFromStore =  localStorage.getItem(CONSTANT.KEY_LOCAL_STORAGE_DATA)
  if (dataFromStore) {
    const obj = JSON.parse(dataFromStore)
    dataMapTable.value = new Map(Object.entries(obj))
  }
}

watch(() => mapEvent.value, (newValue) => {
  if (newValue) {
    const obj = Object.fromEntries(newValue);
    localStorage.setItem(CONSTANT.KEY_LOCAL_STORAGE_DATA, JSON.stringify(obj))
    dataMapTable.value = newValue
  }
}, { deep: true })

onMounted(() => {
  setDataFromLocalStorage()
})
</script>

<style lang="scss" scoped>
@import "../home.page.scss";
@import "../../../components/common/Common";
</style>
