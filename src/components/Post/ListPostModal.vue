<script setup>
defineProps(['posts', 'loading', 'error', 'buttonText', 'modalTitle']);
defineEmits(['close', 'create-post', 'select-post', 'delete-post']);

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
      aria-labelledby="postsModalLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
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
                @click="$emit('create-post')"
                type="button"
                class="btn btn-outline-primary"
                data-bs-dismiss="modal"
                aria-label="Add">
                <i class="bi bi-file-earmark-plus" />
              </button>
              <button
                type="button"
                class="btn btn-outline-primary"
                data-bs-dismiss="modal"
                aria-label="Close">
                <i class="bi bi-x-lg" />
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
            <table class="table">
              <thead>
                <tr v-if="posts && posts.length > 0">
                  <th 
                    v-for="field in Object.keys(posts[0])"
                    :key="field">
                    {{ field }} 
                  </th>
                  <th colspan="2">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="post in posts"
                  :key="post.id">
                  <td>{{ post.userId }}</td>
                  <td>{{ post.id }}</td>
                  <td>{{ post.title }}</td>
                  <td>{{ post.body }}</td>
                  <td @click="$emit('select-post', post.id)">
                    <i class="bi bi-pencil-square" />
                  </td>
                  <td @click="$emit('delete-post', post.id)">
                    <i class="bi bi-trash" />
                  </td>
                </tr>
              </tbody>
            </table>
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

.modal__button {
  &::first-letter {
    text-transform: capitalize;
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