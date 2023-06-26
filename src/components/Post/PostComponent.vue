<script setup>
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { usePostStore } from '@/stores/post';

import ListPostModal from './ListPostModal.vue';
import EditPostModal from './EditPostModal.vue';
import DeletePostModal from './DeletePostModal.vue';
import CreatePostModal from './CreatePostModal.vue';

const { posts, loading, error } = storeToRefs(usePostStore());
const { fetchPosts } = usePostStore();

fetchPosts();

const showSelectedModal = ref(false);
const showDeleteModal = ref(false);
const showCreateModal = ref(false);
const selectedPostId = ref(null);


function handleSelectPost (id) {
  showSelectedModal.value = true;
  selectedPostId.value = id;

  const { fetchPost } = usePostStore();
  fetchPost(id);
}

function handleDeletePost (id) {
  showDeleteModal.value = true;
  selectedPostId.value = id;

  const { fetchPost } = usePostStore();
  fetchPost(id);
}

function handleDeleteConfirmed () {
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

function handleCreatePost () {
  showCreateModal.value = true;
}

function handleCloseModal () {
  showSelectedModal.value = false;
  showDeleteModal.value = false;
  showCreateModal.value = false;
}


</script>

<template>
  <section>
    <ListPostModal
      :button-text="'launch posts modal'"
      :modal-title="'posts list'"
      :posts="posts"
      :loading="loading"
      :error="error"
      @select-post="handleSelectPost"
      @delete-post="handleDeletePost"
      @create-post="handleCreatePost" />

    <EditPostModal
      :show="showSelectedModal"
      @close="handleCloseModal" />

    <DeletePostModal
      :show="showDeleteModal"
      @delete-confirmed="handleDeleteConfirmed"
      @close="handleCloseModal" />

    <CreatePostModal 
      :show="showCreateModal"
      @close="handleCloseModal" />
  </section>
</template>

