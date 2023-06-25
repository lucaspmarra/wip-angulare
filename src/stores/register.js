import { defineStore } from 'pinia';

export const useRegisterStore = defineStore('register', {
  state: () => ({
    userName: '',
    userEmail: '',
    userDOB: null,
    userGender: [],
    userShirt: [],
  }),
  
});