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
                v-for="(item, idx) in validateForm"
                :key="idx"
              >
                <ValidateFrom v-model="validateForm[idx]" />
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
const validateLocalStorage = localStorageUtil(CONSTANTS.TAB_PATTENT.VALIDATTION)
const pattentLocalStorage = localStorageUtil(CONSTANTS.KEY_PATTENT)
const fileLocalStorage = localStorageUtil(CONSTANTS.KEY_CURRENT_FILE)

const category = props.dataForm?.[0]?.category
const { ABNORMAL, NORMAL } = CONSTANTS.TAB_PATTENT

const pattentTestCase = ref<IPattentTestCase>({})
const validateForm = ref<IValidate[]>(props.dataValidateForm as IValidate[])

const handleUpdatePattent = (type: string, pattent: ITestCaseItem[]) => {
  pattentTestCase.value = {
    ...pattentTestCase.value,
    [type]: pattent
  }
}

const save = () => {
  console.log(JSON.stringify(props.dataValidateForm, null, 2))
  const dataSave = convertBeforeSaveLocalStorage(pattentTestCase.value)
  validateLocalStorage.set(validateForm.value)
  pattentLocalStorage.set(dataSave)
  toggleModal()
}

const toggleModal = () => {
  emit('toggleModal')
}

const convertBeforeSaveLocalStorage = (pattents: IPattentTestCase) => {
  const data = pattentLocalStorage.get() || {}

  Object.keys(pattents).forEach((key) => {
    pattents[key] = pattents[key].filter((item) => {
      return Object.values(item).some((value) => value)
    })
  })

  return {
    ...data,
    [category]: {
      ...pattents
    }
  }
}

const convertFromLocalStorageToPattent = (pattents: any) => {
  return pattents?.[category]
}

const initializeField = (field: ICommonValidate) => {
  return {
    data_check: '',
    value: '',
    ...field
  }
}

const setDefaultValidate = () => {
  validateForm.value.forEach((item) => {
    const valid = item || (item = {} as IValidate)

    valid.required = initializeField(valid.required) as ICommonValidate
    valid.required.is_checked = true

    valid.max_length = initializeField(valid.max_length) as ICommonValidate
    valid.max_length.is_checked = true

    valid.format = initializeField(valid.format) as ICommonValidate
    valid.format.is_checked = true
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

const initvalidate = async() => {
  const validate = await validateLocalStorage.get()
  console.log('validate', validate)

  if (validate) {
    validateForm.value.forEach((item, index) => {
      validateForm.value[index] = {
        ...item,
        ...validate
      }
    })
  }
}

onMounted(() => {
  initValue()
  initvalidate()
  console.log('validateForm', validateForm.value)

  setDefaultValidate()
})
</script>

<style scoped>
.modal {
  display: block;
  background: rgba(0, 0, 0, 0.5);
}
</style>
