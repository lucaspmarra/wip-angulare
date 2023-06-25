import axios from 'axios';
import { defineStore } from 'pinia';

export const usePostStore = defineStore({
  id: 'post',
  state: () => ({
    posts: [],
    post: null,
    selectedPost: null,
    loading: false,
    error: null,
  }),
  actions: {
    async fetchPosts () {
      this.posts = [];
      this.loading = true;
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        this.posts = response.data;
      }
      catch (error) {
        this.error = error;
      }
      finally {
        this.loading = false;
      }
    },
    async fetchPost (id) {
      this.selectedPost = null;
      this.loading = true;
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
        this.selectedPost = response.data;

      }
      catch (error) {
        this.error = error;
      }
      finally {
        this.loading = false;
      }
    },
    async createPost (postData) {
      try {
        const response = await axios.post('https://jsonplaceholder.typicode.com/posts', postData);
        const newPost = response.data;

        this.posts.push(newPost);
      }
      catch (error) {
        this.error = error;
      }
    },
    async updatePost (postData) {
      try {
        const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${postData.id}`, postData);
        const updatedPost = response.data;

        this.posts = this.posts.map(post => post.id === updatedPost.id ? updatedPost : post);
      }
      catch (error) {
        this.error = error;
      }
    },
    async patchPost (postId, updatedFields) {
      try {
        const response = await axios.patch(`https://jsonplaceholder.typicode.com/posts/${postId}`, updatedFields);
        const updatedPost = response.data;

        const index = this.posts.findIndex(post => post.id === updatedPost.id);
        if (index !== -1) {
          this.posts[index] = updatedPost;
        }
      }
      catch (error) {
        this.error = error;
      }
    },
    async deletePost (postId) {
      try {
        await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);

        this.posts = this.posts.filter(post => post.id !== postId);
      }
      catch (error) {
        this.error = error;
      }
    },
  },
});
