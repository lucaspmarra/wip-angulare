import { defineStore } from 'pinia';

export const useRegisterStore = defineStore('register', {
  state: () => ({
    userName: '',
    userEmail: '',
    userDOB: '',
    userGender: '',
    userShirt: '',
  }),
  actions: {
    registerUser(userData) {
      this.userName = userData.name;
      this.userEmail = userData.email;
      this.userDOB = userData.dob;
      this.userPhone = userData.phone;
      this.userGender = userData.gender;
      this.userShirt = userData.shirt;

      localStorage.setItem('userData', JSON.stringify(userData));
    }
  }
});
