import axios from 'axios';
import { defineStore } from 'pinia';

export const usePostStore = defineStore({
  id: 'post',
  state: () => ({
    posts: [],
    post: null,
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
      this.post = null;
      this.loading = true;
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
        this.post = response.data;

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
    async patchPost(id, postData) {
      try {
        const response = await axios.patch(`https://jsonplaceholder.typicode.com/posts/${id}`, postData);
        const updatedPost = response.data;
    
        const index = this.posts.findIndex(post => post.id === updatedPost.id);
        this.posts[index] = updatedPost;
      }
      catch (error) {
        if (error.response) {
          const { data, status, headers } = error.response;
          console.log(data);
          console.log(status);
          console.log(headers);
        }
        else if (error.request) {
          console.log(error.request);
        }
        else {
          console.log('Error:', error.message);
        }
        console.log(error.config);
      }
    },
    async deletePost (id) {
      try {
        await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);

        this.posts = this.posts.filter(post => post.id !== id);
      }
      catch (error) {
        this.error = error;
      }
    },
  },
});
