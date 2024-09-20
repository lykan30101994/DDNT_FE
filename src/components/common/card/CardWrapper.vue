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

withDefaults(
    defineProps<{
      title?: string;
      cardBodyClass: string;
      cardHeaderClass: string;
    }>(),
    {
      cardBodyClass: '',
      cardHeaderClass: '',
    }
);
</script>

<style lang="scss" scoped>
@import "./CardWrapper";
</style>