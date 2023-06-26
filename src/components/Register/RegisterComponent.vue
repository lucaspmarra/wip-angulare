<script setup>
import { reactive } from 'vue';
import FormModal from './FormModal.vue';

const state = reactive({
  buttonTitle: 'launch register modal',
  modalTitle: 'register'
});
</script>

<template>
  <main>
    <FormModal
      :button-title="state.buttonTitle"
      :modal-title="state.modalTitle" />
  </main>
</template>

<style lang="scss" scoped>

</style>