<script setup>
import { reactive } from 'vue';
import { useRegisterStore } from '@/stores/register.js';

defineProps(['buttonTitle', 'modalTitle']);


const state = reactive({
  name: '',
  email: '',
  dob: '',
  phone: '',
  gender: '',
  shirt: ''
});

const store = useRegisterStore();

const handleRegister = () => {
  const userData = {
    name: state.name,
    email: state.email,
    dob: state.dob,
    phone: state.phone,
    gender: state.gender,
    shirt: state.shirt
  };
  store.registerUser(userData);

  state.name = '';
  state.email = '';
  state.dob = '';
  state.phone = '';
  state.gender = '';
  state.shirt = '';
};
</script>



<template>
  <!-- Button trigger modal -->
  <button
    type="button"
    class="btn btn-primary"
    data-bs-toggle="modal"
    data-bs-target="#registerModal">
    {{ buttonTitle }}
  </button>
  
  <!-- Modal -->
  <div
    class="modal fade"
    id="registerModal"
    tabindex="-1"
    aria-labelledby="registerModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1
            class="modal-title fs-5"
            id="registerModalLabel">
            {{ modalTitle }}
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close" />
        </div>

        <div class="modal-body">
          <form @submit.prevent="handleRegister">
            <div class="mb-3">
              <label
                for="nameInput"
                class="form-label">Full Name</label>
              <input
                v-model="state.name"
                type="text"
                class="form-control"
                id="nameInput">
            </div>
            
            <div class="mb-3">
              <label
                for="emailInput"
                class="form-label">Email</label>
              <input
                v-model="state.email"
                type="email"
                class="form-control"
                id="emailInput">
            </div>
            
            <div class="mb-3">
              <label
                for="dobInput"
                class="form-label">Date of Birth</label>
              <input
                v-model="state.dob"
                type="text"
                class="form-control"
                id="dobInput"
                placeholder="DD/MM/YYYY">
            </div>
            
            <div class="mb-3">
              <label
                for="phoneInput"
                class="form-label">Phone</label>
              <input
                v-model="state.phone"
                type="text"
                class="form-control"
                id="phoneInput"
                placeholder="(99) 99999-9999">
            </div>
            
            <div class="mb-3">
              <label
                for="genderSelect"
                class="form-label">Gender</label>
              <select
                v-model="state.gender"
                class="form-select"
                id="genderSelect">
                <option
                  value=""
                  disabled
                  selected>
                  Select gender
                </option>
                <option value="Male">
                  Male
                </option>
                <option value="Female">
                  Female
                </option>
              </select>
            </div>
            
            <div
              class="mb-3"
              v-if="state.gender === 'Male' || state.gender === 'Female'">
              <label
                for="shirtSelect"
                class="form-label">T-Shirt</label>
              <select
                v-model="state.shirt"
                class="form-select"
                id="shirtSelect">
                <option
                  value=""
                  disabled
                  selected>
                  Select shirt type
                </option>
                <option
                  v-if="state.gender === 'Male'"
                  value="Men's">
                  Men's
                </option>
                <option
                  v-if="state.gender === 'Female'"
                  value="Women's">
                  Women's
                </option>
              </select>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-danger"
                data-bs-dismiss="modal">
                Close
              </button>
              <button
                type="submit"
                class="btn btn-primary">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>