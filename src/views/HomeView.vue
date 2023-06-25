<script setup>
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { usePostStore } from '@/stores/post';

import PostModal from '../components/Post/PostModal.vue';
import SelectedPostModal from '../components/Post/SelectedPostModal.vue';

const { posts, loading, error } = storeToRefs(usePostStore());
const { fetchPosts } = usePostStore();

fetchPosts();


const showSelectedModel = ref(false);

function handleSelect(id) {
  showSelectedModel.value = true;

  const { fetchPost } = usePostStore();
  fetchPost(id);
}

function handleClose() {
  showSelectedModel.value = false;
}

</script>

<template>
  <main class="container">
    <h1>Home view</h1>
    <PostModal
      :button-text="'launch posts modal'"
      :modal-title="'posts list'"
      :posts="posts"
      :loading="loading"
      :error="error"
      @select-post="handleSelect" />

    <SelectedPostModal
      :show="showSelectedModel"
      @close="handleClose" />
  </main>
</template>