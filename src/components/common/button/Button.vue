<template>
  <ButtonGroup :buttons="button" />
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import ButtonGroup from './ButtonGroup.vue'
import type { IButton } from './ButtonGroup.type'

const props = defineProps<{
  type?: string
  label: string
  btnClass?: string
  disabled?: boolean
  size?: string
}>()

const button = computed(() => {
  const { type, label, btnClass, disabled, size } = props
  const buttonObject: IButton = { type, label, btnClass, disabled, size, key: 'btn-1' }
  return [buttonObject]
})
</script>
