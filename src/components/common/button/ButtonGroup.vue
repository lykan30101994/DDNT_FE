<template>
  <div :class="['my-group-btn', getAlignClass(align)]">
    <div
        v-for="(button, index) in buttons"
        :key="index" class="btn-group">
      <span v-if="button.isDropDown">
        <DropDown :label="button.label" :options="button.option" :size="button.size"/>
      </span>
      <span
          v-else
          :disabled="button.disabled ?? false"
          :class="['btn', getSizeClass(button.size), button.btnClass ?? 'btn-primary', button.isBold ? 'fw-bold' : '']">
        {{ button.label }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {IButton} from "./ButtonGroup.type.js";
import DropDown from "@/components/common/dropdown/DropDown.vue";

defineProps<{
  buttons: IButton[]
  align?: string
}>()

const getAlignClass = (align: string | undefined) => {
  let alignClass = 'start'

  if (align === 'end') {
    alignClass = 'end'
  } else if (align === 'center') {
    alignClass = 'center'
  }

  return 'justify-content-' + alignClass
}

const getSizeClass = (size: string | undefined) => {
  let sizeClass = 'my-btn-md'

  if (size === 'lg') {
    sizeClass = 'my-btn-lg'
  } else if (size === 'sm') {
    sizeClass = 'my-btn-sm'
  } else if (size === 'xl') {
    sizeClass = 'my-btn-xl'
  }

  return sizeClass
}

</script>

<style lang="scss" scoped>
@import "ButtonGroup";
</style>