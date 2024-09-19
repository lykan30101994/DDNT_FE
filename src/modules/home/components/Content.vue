<template>
  <CardWrapper btn-body-class="col-lg-24">
    <div class="row justify-content-center p-3">
      <div class="d-flex  bg-white wapper">
        <div class="container" style="margin: un;">
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
            <button class="btn btn-primary">SELECT VIEW POINT</button>
          </div>
        </div>

      </div>
    </div>
  </CardWrapper>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
@import "../home.page.scss";
</style>
