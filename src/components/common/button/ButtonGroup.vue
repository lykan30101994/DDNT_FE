<template>
  <div :class="['my-group-btn', getAlignClass(align)]">
    <div v-for="(button, index) in buttons" :key="index" class="btn-group">
      <span :disabled="button.disabled ?? false" :class="['btn btn-primary', getSizeClass(button.size)]">
        {{ button.label }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {IButton} from "./ButtonGroup.type.js";

defineProps<{
  buttons: IButton[]
  align?: string
}>()

const getAlignClass = (align: string) => {
  let alignClass = 'start'

  if (align === 'end') {
    alignClass = 'end'
  } else if (align === 'center') {
    alignClass = 'center'
  }

  return 'justify-content-' + alignClass
}

const getSizeClass = (size: string) => {
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