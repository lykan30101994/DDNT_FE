<template>
  <div>
    <!-- Header -->
    <header class="bg-primary text-white text-center p-4">
      <h1>Tool gen testcase UT</h1>
    </header>

    <!-- Body -->
    <div class="container mt-4">
      <div class="row form-row align-items-end mb-3">
        <h4>EVENTS & ELEMENT FILE</h4>
        <div class="col-8">
          <input type="file" @change="handleFileUpload" class="form-control" />
        </div>
        <div class="col-4">
          <button class="btn btn-primary" style="margin-right: 5px" @click="uploadFile">
            Upload
          </button>
          <button class="btn btn-success" @click="loadData">Load Data</button>
        </div>
      </div>

      <div class="container mt-4">
        <h5 class="text-left">doLogin - onclick - id::btn_login</h5>
        <!-- Title for the table -->
        <table class="table table-striped mt-3">
          <thead class="thead-dark">
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
          <button class="btn btn-primary" @click="showModal">SELECT VIEW POINT</button>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal"
      :class="{ show: isModalVisible }"
      style="display: block"
      v-if="isModalVisible"
      @click.self="closeModal"
      role="dialog"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Create Data</h5>
            <button type="button" class="close" @click="closeModal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item" v-for="(tab, index) in tabs" :key="index">
                <a
                  class="nav-link"
                  :class="{ active: activeTab === tab.name }"
                  @click.prevent="activeTab = tab.name"
                  >{{ tab.label }}</a
                >
              </li>
            </ul>
            <div class="tab-content mt-3">
              <div
                class="tab-pane fade"
                :class="{ show: activeTab === 'tab1', active: activeTab === 'tab1' }"
                role="tabpanel"
              >
                <h5 class="text-left">text::id::user_id</h5>
                <form @submit.prevent="submitForm('tab1')">
                  <div class="row mb-3">
                    <div class="col-8">
                      <div class="form-group">
                        <div class="form-check">
                          <input type="checkbox" class="form-check-input" />
                          <label class="form-check-label">REQUIRED</label>
                        </div>
                      </div>
                    </div>
                    <div class="col-4">
                      <div class="form-group">
                        <label for="input3">DATA CHECK</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="formData.tab3Input"
                          id="input3"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row mn-3">
                    <div class="col-4">
                      <div class="form-group">
                        <div class="form-check">
                          <input type="checkbox" class="form-check-input" />
                          <label class="form-check-label">MAXLENGTH</label>
                        </div>
                      </div>
                    </div>
                    <div class="col-4">
                      <div class="form-group">
                        <label for="input3">VALUE</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="formData.tab3Input"
                          id="input3"
                          required
                        />
                      </div>
                    </div>
                    <div class="col-4">
                      <div class="form-group">
                        <label for="input3">DATA CHECK</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="formData.tab3Input"
                          id="input3"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div class="text-end mt-3">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      style="margin-right: 10px"
                      data-dismiss="modal"
                      @click="closeModal"
                    >
                      Cancel
                    </button>
                    <button type="submit" class="btn btn-primary">Save</button>
                  </div>
                </form>
              </div>
              <div
                class="tab-pane fade"
                :class="{ show: activeTab === 'tab2', active: activeTab === 'tab2' }"
                role="tabpanel"
              >
                <form @submit.prevent="submitForm('tab2')">
                  <div class="row">
                    <div class="col-4">
                      <div class="form-group">
                        <div class="form-check">
                          <input type="checkbox" class="form-check-input" />
                          <label class="form-check-label">Checkbox</label>
                        </div>
                      </div>
                    </div>
                    <div class="col-4">
                      <div class="form-group">
                        <label>Input</label>
                        <input type="text" class="form-control" required />
                      </div>
                    </div>
                  </div>
                  <button type="submit" class="btn btn-primary">Submit Tab 2</button>
                </form>
              </div>
              <div
                class="tab-pane fade"
                :class="{ show: activeTab === 'tab3', active: activeTab === 'tab3' }"
                role="tabpanel"
              >
                <form @submit.prevent="submitForm('tab3')">
                  <div class="form-group">
                    <label for="input3">Input for Tab 3</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="formData.tab3Input"
                      id="input3"
                      required
                    />
                  </div>
                  <button type="submit" class="btn btn-primary">Submit Tab 3</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal-backdrop fade" v-if="isModalVisible" style="display: block"></div>

    <!-- Footer -->
    <footer class="bg-light text-center p-4 mt-4">
      <p>&copy; 2024 Copyright belongs to DDNT Team.</p>
    </footer>
  </div>
</template>

<script>
import * as XLSX from "xlsx";

export default {
  data() {
    return {
      file: null,
      data: [],
      headers: [],
      isModalVisible: false,
      activeTab: "tab1",
      tabs: [
        { name: "tab1", label: "Validation" },
        { name: "tab2", label: "Abnormal" },
        { name: "tab3", label: "Normal" },
      ],
      formData: {
        tab1Input: "",
        tab2Input: "",
        tab3Input: "",
      },
    };
  },
  methods: {
    handleFileUpload(event) {
      this.file = event.target.files[0];
    },

    uploadFile() {
      if (!this.file) {
        alert("Please select an Excel file to upload.");
        return;
      }
      alert("File has been uploaded: " + this.file.name);
    },

    loadData() {
      if (!this.file) {
        alert("Please select an Excel file to upload.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        this.data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        this.headers = this.data[0];
        this.data = this.data.slice(1);
      };
      reader.readAsArrayBuffer(this.file);
    },

    // handle modal
    showModal() {
      this.isModalVisible = true;
    },

    closeModal() {
      this.isModalVisible = false;
    },

    submitForm(tab) {
      alert(`Submitted ${tab}: ${this.formData[`${tab}Input`]}`);
      // Reset form data if needed
      this.formData[`${tab}Input`] = "";
    },
  },
};
</script>
<style>
.container {
  max-width: 800px;
}
.modal-backdrop {
  opacity: 0.5 !important;
}
.modal-content {
  border-radius: 10px;
}
.nav-tabs .nav-link {
  border: none;
  border-radius: 0;
  margin: 0 5px;
}
.nav-tabs .nav-link.active {
  background-color: #007bff;
  color: white;
}
</style>
