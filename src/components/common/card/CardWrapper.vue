<template>
  <div class="card-wrapper">

    <div v-if="title" :class="['card-header', cardHeaderClass]">
      <span>{{ title }}</span>
    </div>
    <div :class="['card-body', cardBodyClass]">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>

defineProps({
  title: {
    type: String,
    required: false
  },
  cardBodyClass: {
    type: String,
    default: ''
  },
  cardHeaderClass: {
    type: String,
    default: ''
  }
});
</script>

<style lang="scss" scoped>
@import "./CardWrapper";
</style>