<template>
  <div>
    <div
      class="modal"
      tabindex="-1"
      v-if="showModal"
    >
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
              <template
                v-for="(item, idx) in dataValidateForm"
                :key="idx"
              >
                <ValidateFrom v-model="dataValidateForm[idx]" />
              </template>
            </div>
            <div v-else-if="activeTab === 'tab2'">
              <FormTestCase
                :type="ABNORMAL"
                :data="dataForm"
                :pattents="pattentTestCase[ABNORMAL]"
                @update-pattent="handleUpdatePattent"
              />
            </div>
            <div v-else-if="activeTab === 'tab3'">
              <FormTestCase
                :type="NORMAL"
                :data="dataForm"
                :pattents="pattentTestCase[NORMAL]"
                @update-pattent="handleUpdatePattent"
              />
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
            <button
              class="btn btn-primary"
              @click="save"
            >
              SAVE
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import FormTestCase from './formTestCase/FormTestCase.vue'
import ValidateFrom from './validateForm/ValidateForm.page.vue'
import { CONSTANTS } from '@/components/constant'
import { localStorageUtil } from '@/components/utils/local-storage-ultil'
import type { IPattentTestCase, ITableEvent } from '@/modules/home/home.type'

const props = defineProps<{
  showModal: Boolean
  dataForm: ITableEvent[]
  dataValidateForm: IValidate[]
}>()

const emit = defineEmits<{
  toggleModal: []
}>()

const activeTab = ref('tab1')
const switchTab = (tab: string) => {
  activeTab.value = tab
}

const pattentLocalStorage = localStorageUtil(CONSTANTS.KEY_PATTENT)
const fileLocalStorage = localStorageUtil(CONSTANTS.KEY_CURRENT_FILE)

const category = props.dataForm?.[0]?.category
const { ABNORMAL, NORMAL } = CONSTANTS.TAB_PATTENT

const fileCurrent = ref<string>(fileLocalStorage.get())
const pattentTestCase = ref<IPattentTestCase>({})

const handleUpdatePattent = (type: string, pattent: ITestCaseItem[]) => {
  pattentTestCase.value = {
    ...pattentTestCase.value,
    [type]: pattent
  }
}

const save = () => {
  console.log(JSON.stringify(props.dataValidateForm, null, 2))
  const dataSave = convertBeforeSaveLocalStorage(pattentTestCase.value)
  pattentLocalStorage.set(dataSave)
  toggleModal()
}

const toggleModal = () => {
  emit('toggleModal')
}

const convertBeforeSaveLocalStorage = (pattents: IPattentTestCase) => {
  const data = pattentLocalStorage.get()?.[fileCurrent.value] || {}

  Object.keys(pattents).forEach((key) => {
    pattents[key] = pattents[key].filter((item) => {
      return Object.values(item).some((value) => value)
    })
  })

  return {
    [fileCurrent.value]: {
      ...data,
      [category]: {
        ...pattents
      }
    }
  }
}

const convertFromLocalStorageToPattent = (pattents: any) => {
  return pattents?.[fileCurrent.value]?.[category]
}

const initializeField = (field: IRequired | IMaxLength | IFormat) => {
  return {
    data_check: '',
    value: '',
    ...field
  }
}

const setDefaultValidate = () => {
  props.dataValidateForm.forEach((item) => {
    const valid = item || (item = {} as IValidate)

    valid.required = initializeField(valid.required) as IRequired
    valid.required.required = true

    valid.max_length = initializeField(valid.max_length) as IMaxLength
    valid.max_length.max_length = true

    valid.format = initializeField(valid.format) as IFormat
    valid.format.format = true
  })
}

const initValue = () => {
  const pattents = pattentLocalStorage.get()

  if (pattents) {
    pattentTestCase.value = {
      ...convertFromLocalStorageToPattent(pattents)
    }
  }
}

watch(
  () => props.showModal,
  () => {
    fileCurrent.value = fileLocalStorage.get()
    initValue()
  }
)

onMounted(() => {
  initValue()
  setDefaultValidate()
  console.log(props.dataValidateForm)
})
</script>

<style scoped>
.modal {
  display: block;
  background: rgba(0, 0, 0, 0.5);
}
</style>
