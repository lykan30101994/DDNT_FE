<template>
  <div>
    <div class="modal" tabindex="-1" v-if="showModal">
      <div class="modal-dialog modal-dialog-scrollable modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Form fill pattent testcase</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="toggleModal"
            ></button>
          </div>
          <div class="modal-body">
            <ul class="nav nav-tabs">
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: activeTab === 'tab1' }"
                  @click="switchTab('tab1')"
                  >Validation</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: activeTab === 'tab2' }"
                  @click="switchTab('tab2')"
                  >Abnormal</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: activeTab === 'tab3' }"
                  @click="switchTab('tab3')"
                  >Normal</a
                >
              </li>
            </ul>

            <div v-if="activeTab === 'tab1'">
              <ValidateFrom :data="dataForm"/>
            </div>
            <div v-else-if="activeTab === 'tab2'">
              <FormTestCase />
            </div>
            <div v-else-if="activeTab === 'tab3'">
              <FormTestCase />
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click="toggleModal"
            >
              CANCEL
            </button>
            <button type="submit" class="btn btn-primary">SAVE</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import FormTestCase from "./formTestCase/FormTestCase.vue";
import ValidateFrom from "./validateForm/ValidateForm.page.vue"
import type {ITableEvent} from "@/modules/home/home.type";

const props = defineProps<{
  showModal: Boolean;
  toggleModal: () => void;
  dataForm: ITableEvent[];
}>();

const activeTab = ref("tab1");
const switchTab = (tab: string) => {
  activeTab.value = tab;
};

const rows = ref([
  { type: "text", c_element: "id", name: "user_id" },
  { type: "password", c_element: "id", name: "password" },
]);
</script>

<style scoped>
.modal {
  display: block;
  background: rgba(0, 0, 0, 0.5);
}
</style>
