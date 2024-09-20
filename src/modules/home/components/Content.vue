<template>
  <CardWrapper btn-body-class="col-lg-24">
    <div class="content">
      {{data}}
      <div class="row justify-content-center p-3">
        <div class="d-flex container bg-white wapper">
          <div class="flex-grow-1" style="margin: unset">
            <h5 class="text-left">doLogin - onclick - id::btn_login</h5>
            <!-- Title for the table -->
            <table class="table table-bordered mt-3">
              <thead class="table-dark">
                <tr>
                  <th>#</th>
                  <th>Category</th>
                  <th>Type</th>
                  <th>CElement</th>
                  <th>Id / Name / Class</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>input</td>
                  <td>text</td>
                  <td>id</td>
                  <td>user_id</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>input</td>
                  <td>password</td>
                  <td>id</td>
                  <td>password</td>
                </tr>
              </tbody>
            </table>
            <div class="text-left mt-3">
              <button class="btn btn-primary" @click="toggleModal">SELECT VIEW POINT</button>
              <Modal :showModal="showModal" :toggleModal="toggleModal" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Block Footer-->
    <Footer></Footer>
  </CardWrapper>
</template>

<script setup lang="ts">
import { ref, defineProps  } from 'vue';
import Footer from "./Footer.vue";
import Modal from "./Modal.vue";
const showModal = ref(false);

const props = defineProps<{
  data: any[];
}>();

const toggleModal = () => {
    showModal.value = !showModal.value;
};

</script>

<style lang="scss" scoped>
@import "../home.page.scss";
</style>
