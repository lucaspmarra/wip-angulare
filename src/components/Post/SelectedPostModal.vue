<script setup>
import { computed } from 'vue';
import { usePostStore } from '@/stores/post';

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
});

defineEmits(['close']);

const postStore = usePostStore();
const selectedTitle = computed(() => postStore.selectedPost?.title);
const selectedBody = computed(() => postStore.selectedPost?.body);
const selectedUser = computed(() => postStore.selectedPost?.userId);
const isLoading = computed(() => postStore.loading);
const isErrored = computed(() => postStore.error);

</script>
  
<template>
  <Teleport to="body">
    <div
      v-show="props.show"
      class="modal custom-fade">
      <div class="modal__wrapper">
        <div class="modal__container">
          <header>
            <h4>{{ selectedTitle }}</h4>
          </header>

          <section v-if="isErrored">
            {{ isErrored }}
          </section>
          <section v-if="isLoading">
            <div
              class="spinner-border"
              role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </section>

          <section v-else>
            <p>{{ selectedBody }}</p>
            <p>Author ID: {{ selectedUser }}</p>
          </section>

          <div class="modal-footer">
            <button
              @click="$emit('close')"
              type="button"
              class="btn btn-danger"
              data-bs-dismiss="modal">
              Close
            </button>
          </div>
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