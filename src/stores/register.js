import { defineStore } from 'pinia';

export const useRegisterStore = defineStore('register', {
  state: () => ({
    userName: '',
    userEmail: '',
    userDOB: '',
    userGender: '',
    userShirt: '',
  }),

  getters: {
    getUserData() {
      return {
        name: this.userName,
        email: this.userEmail,
        dob: this.userDOB,
        gender: this.userGender,
        shirt: this.userShirt,
      };
    },
  },

  actions: {
    loadUserData() {
      const userData = JSON.parse(localStorage.getItem('userData'));
      if (userData) {
        this.userName = userData.name;
        this.userEmail = userData.email;
        this.userDOB = userData.dob;
        this.userGender = userData.gender;
        this.userShirt = userData.shirt;
      }
    },

    saveUserData() {
      const userData = this.getUserData;
      localStorage.setItem('userData', JSON.stringify(userData));
    },

    clearUserData() {
      localStorage.removeItem('userData');
      this.userName = '';
      this.userEmail = '';
      this.userDOB = '';
      this.userGender = '';
      this.userShirt = '';
    },
  },
});
