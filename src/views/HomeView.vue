<script setup>
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { usePostStore } from '@/stores/post';

import PostModal from '../components/Post/PostModal.vue';
import SelectedPostModal from '../components/Post/SelectedPostModal.vue';
import DeletePostModal from '../components/Post/DeletePostModal.vue';

const { posts, loading, error } = storeToRefs(usePostStore());
const { fetchPosts } = usePostStore();

fetchPosts();

const showSelectedModel = ref(false);
const showDeleteModal = ref(false);
const selectedPostId = ref(null);


function handleSelect(id) {
  showSelectedModel.value = true;
  selectedPostId.value = id;

  const { fetchPost } = usePostStore();
  fetchPost(id);
}

function handleDelete(id) {
  showDeleteModal.value = true;
  selectedPostId.value = id;

  const { fetchPost } = usePostStore();
  fetchPost(id);
}

function handleClose () {
  showSelectedModel.value = false;
  showDeleteModal.value = false;
}

function handleDeleteConfirmed() {
  const { deletePost } = usePostStore();
  deletePost(selectedPostId.value)
    .then(() => {
      showDeleteModal.value = false;
      selectedPostId.value = null;
    })
    .catch((error) => {
      console.log(error);
    });
}
</script>

<template>
  <main>
    <PostModal
      :button-text="'launch posts modal'"
      :modal-title="'posts list'"
      :posts="posts"
      :loading="loading"
      :error="error"
      @select-post="handleSelect"
      @delete-post="handleDelete" />

    <SelectedPostModal
      :show="showSelectedModel"
      @close="handleClose" />

    <DeletePostModal
      :show="showDeleteModal"
      @delete-confirmed="handleDeleteConfirmed"
      @close="handleClose" />
  </main>
</template>
