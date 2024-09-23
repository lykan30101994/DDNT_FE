<template>
    <div class="dropdown" ref="dropdown">
      <button
        class="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        :aria-expanded="isOpen"
        @click="toggleDropdown"
      >
        {{ selectedItem || 'Dropdown button' }}
      </button>
      <ul  class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <li v-for="(item, index) in items" :key="index">
          <a class="dropdown-item" href="#" @click.prevent="selectItem(item)">
            {{ item }}
          </a>
        </li>
      </ul>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
  
  export default defineComponent({
    name: 'DropdownComponent',
    setup() {
      const isOpen = ref(false);
      const selectedItem = ref<string | null>(null);
      const items = ref(['Action 1', 'Action 2', 'Action 3']);
      const dropdown = ref<HTMLElement | null>(null);
  
      const toggleDropdown = () => {
        isOpen.value = !isOpen.value;
        console.log(isOpen.value)
      };
  
      const selectItem = (item: string) => {
        console.log
        selectedItem.value = item;
        console.log(selectedItem.value)
        isOpen.value = false; // Close the dropdown after selection
      };
  
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (dropdown.value && !dropdown.value.contains(target)) {
          isOpen.value = false; // Close the dropdown if clicked outside
        }
      };
  
      onMounted(() => {
        document.addEventListener('click', handleClickOutside);
      });
  
      onUnmounted(() => {
        document.removeEventListener('click', handleClickOutside);
      });
  
      return {
        isOpen,
        selectedItem,
        items,
        toggleDropdown,
        selectItem,
        dropdown,
      };
    },
  });
  </script>
  
  <style scoped>
  /* Add custom styles if needed */
  </style>
  