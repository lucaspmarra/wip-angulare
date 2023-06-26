<script setup>
import { reactive } from 'vue';
import { usePostStore } from '@/stores/post';

const postStore = usePostStore();

defineEmits(['close']);

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
});

const state = reactive({
  id: '',
  userId: '',
  title: '',
  body: ''
});

async function handleCreatePost (event) {
  event.preventDefault();
  const postData = {
    id: state.id,
    userId: state.userId,
    title: state.title,
    body: state.body,
  };

  try {
    await postStore.createPost(postData);

    state.id = '';
    state.userId = '';
    state.title = '';
    state.body = '';

  }
  catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <Teleport to="body">
    <div
      v-show="props.show"
      class="modal custom-fade">
      <div class="modal__wrapper">
        <div class="modal__container">
          <form
            @submit.prevent="handleCreatePost"
            class="px-4 pt-4">
            <div class="mb-3">
              <label
                for="id"
                class="form-label">Id: </label>
              <input
                v-model="state.id"
                type="text"
                class="form-control"
                id="id">
            </div>


            <div class="mb-3">
              <label
                for="userId"
                class="form-label">userId: </label>
              <input
                v-model="state.userId"
                type="text"
                class="form-control"
                id="userId">
            </div>

            <div class="mb-3">
              <label
                for="title"
                class="form-label">Title: </label>
              <input
                v-model="state.title"
                type="text"
                class="form-control"
                id="title">
            </div>

            <div class="mb-3">
              <label
                for="body"
                class="form-label">Body: </label>
              <input
                v-model="state.body"
                type="text"
                class="form-control"
                id="body">
            </div>
            <div class="modal-footer">
              <button
                type="submit"
                class="btn btn-primary">
                Update
              </button>
              <button
                @click="$emit('close')"
                type="button"
                class="btn btn-danger"
                data-bs-dismiss="modal">
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </Teleport>
</template>
<style scoped lang='scss'>
.modal {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #6c757d80;
  display: flex;
  align-items: center;
  justify-content: center;

  &__wrapper {
    overflow-y: auto;
  }

  &__container {
    background-color: white;
    border-radius: .5rem;
    max-width: 30rem;

    ::first-letter {
      text-transform: capitalize;
    }

    header {
      background-color: #f7f7f7;
      padding: .75rem .9375rem;

      ::first-letter {
        text-transform: capitalize;
      }

      button {
        float: right;
        height: auto;
        width: auto;
      }
    }

    section {
      padding: 1.25rem 1.875rem;
    }
  }
}

.modal.custom-fade {
  opacity: 0;
  animation: fadeIn 0.5s ease-in-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-50px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>