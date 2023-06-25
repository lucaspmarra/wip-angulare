<script setup>
import { storeToRefs } from 'pinia';
import { usePostStore } from '@/stores/post';

const { posts, loading, error } = storeToRefs(usePostStore());
const { fetchPosts } = usePostStore();

fetchPosts();
</script>

<template>
  <main>
    <!-- Button trigger modal -->
    <button
      type="button"
      class="btn btn-primary modal__button"
      data-bs-toggle="modal"
      data-bs-target="#postModal">
      Posts modal
    </button>

    <!-- Modal -->
    <div
      class="modal fade"
      id="postModal"
      tabindex="-1"
      aria-labelledby="postModalLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h1
              class="modal-title fs-5"
              id="postModalLabel">
              posts modal
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close" />
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
              <h4 @click="selectPost(post.id)">
                {{ post.title }}
              </h4>
              <p>{{ post.body }}</p>
              <p>user id: {{ post.userId }}</p>
              <hr>
            </div>
          </div>

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal">
              Close
            </button>
            <button
              type="submit"
              class="btn btn-primary">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>