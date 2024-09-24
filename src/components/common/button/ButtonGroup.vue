<template>
  <div :class="['my-group-btn', getAlignClass(align)]">
    <div
      v-for="(button, index) in buttons"
      class="btn-group"
      :key="index"
      @click="handleClick"
    >
      <span
        :disabled="button.disabled ?? false"
        :class="['btn', getSizeClass(button.size), button.btnClass ?? 'btn-primary', button.isBold ? 'fw-bold' : '']"
      >
        {{ button.label }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IButton } from './ButtonGroup.type.js'

defineProps<{
  buttons: IButton[]
  align?: string
}>()

const emit = defineEmits<{
  onClick: [e: Event]
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

const handleClick = (e: Event) => {
  emit('onClick', e)
}
</script>

<style lang="scss" scoped>
@import 'ButtonGroup';
</style>
