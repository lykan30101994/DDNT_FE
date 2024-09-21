<template>
  <div :class="['my-dropdown dropdown', getSizeClass]">
    <button :class="['btn btn-info dropdown-toggle w-100', buttonClass]" type="button" data-bs-toggle="dropdown" aria-expanded="false">
      {{ selectedValue?.label ?? label ?? '' }}
    </button>
    <ul class="dropdown-menu">
      <template v-for="(opt, indOpt) in options"
                :key="indOpt">
        <li>
          <a class="dropdown-item" @click="selectOption(opt)">{{ opt.label }}</a>
        </li>
      </template>
    </ul>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, computed, watch} from "vue";
import type {IOption} from "./DropDown.type";

const props = defineProps<{
  modelValue: string | number | undefined
  label?: string
  options: IOption[]
  buttonClass?: string
  size?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
}>()

const getSizeClass = computed(() => {
  const { size } = props
  let sizeClass = 'my-btn-md'

  if (size === 'lg') {
    sizeClass = 'my-btn-lg'
  } else if (size === 'sm') {
    sizeClass = 'my-btn-sm'
  } else if (size === 'xl') {
    sizeClass = 'my-btn-xl'
  }

  return sizeClass
})

const selectedValue = ref<IOption>({} as IOption)

const selectOption = (opt: IOption) => {
  selectedValue.value = opt;
};

const setInitSelect = () => {
  const { options } = props
  options?.forEach(option => {
    if (option.checked) {
      selectedValue.value = option
    }
  })

  if (Object.keys(selectedValue.value).length === 0) {
    selectedValue.value = options[0]
  }

  emit('update:modelValue', selectedValue.value.value)
}

watch(() => selectedValue.value, () => {
  emit('update:modelValue', selectedValue.value.value)
})

onMounted(() => {
  setInitSelect()
})
</script>

<style scoped lang="scss">
@import "DropDown";
@import "../button/ButtonGroup";
</style>