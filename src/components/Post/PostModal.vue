<script setup>
defineProps(['posts', 'loading', 'error', 'buttonText', 'modalTitle']);

defineEmits('select-post');
</script>

<template>
  <main>
    <!-- Button trigger modal -->
    <button
      type="button"
      class="btn btn-primary modal__button"
      data-bs-toggle="modal"
      data-bs-target="#postsModal">
      {{ buttonText }}
    </button>

    <!-- Modal -->
    <div
      class="modal fade"
      id="postsModal"
      tabindex="-2"
      aria-labelledby="postsModalLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h1
              class="modal-title fs-5"
              id="postsModalLabel">
              {{ modalTitle }}
            </h1>
            <div
              class="btn-group"
              role="group">
              <button
                type="button"
                class="btn btn-outline-primary"
                data-bs-dismiss="modal"
                aria-label="Add">
                +
              </button>
              <button
                type="button"
                class="btn btn-outline-primary"
                data-bs-dismiss="modal"
                aria-label="Close">
                X
              </button>
            </div>
          </div>
          <div class="modal-body">
            <p v-if="error">
              {{ error }}
            </p>
            <p v-if="loading">
              Loading posts...
            </p>
            <div
              v-for="post in posts"
              :key="post.id">
              <span
                class="modal__custom"
                @click="$emit('select-post', post.id)">
                <h4 class="modal__custom__title">
                  {{ post.title }}
                </h4>
                <p class="modal__custom__content">{{ post.body }}</p>
                <p>user id: {{ post.userId }}</p>
                <hr>
              </span>
            </div>
          </div>

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-danger"
              data-bs-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<style scoped lang="scss">
.modal {

  .modal-title {
    &::first-letter {
      text-transform: capitalize;
    }
  }
}

.modal__custom {
  :hover {
    cursor: pointer;
  }

  &__title,
  &__content {
    &::first-letter {
      text-transform: capitalize;
    }
  }
}
</style>