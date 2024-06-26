import { defineStore } from "pinia";

export const useAuthStore = defineStore("authStore", {
  state: () => {
    return {
      user: {},
      newGroup: {},
      token: "",
    }
  },
  actions: {
    async register(user) {
      const { token } = await $fetch(
        "http://159.89.0.150:8080/api/v1/auth/register",
        {
          headers: { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*', },
          mode: "cors",
          method: "POST",
          body: user,
        }
      );

      console.log(token);
      const tokenCookie = useCookie('authToken');
      tokenCookie.value = token;
      this.token = token;
      return navigateTo('/')
    },
    async login(data) {
      const { token } = await $fetch(
        "http://159.89.0.150:8080/api/v1/auth/login",
        {
          headers: { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*', },
          method: "POST",
          body: data,
        }
      );
      const tokenCookie = useCookie('authToken');
      tokenCookie.value = token;

      this.token = token;
      return navigateTo('/')
    },
    async logout() {
      const { res } = await $fetch("http://159.89.0.150:8080/api/v1/auth/logout",
        {
          headers: { 'Authorization': useCookie('authToken').value },
          method: "GET",
        })
      const tokenCookie = useCookie('authToken');
      tokenCookie.value = undefined;
      return navigateTo('/Login')

    },

    async updateNewFirstName(newFirstName) {
      console.log("🚀 ~ updateNewFirstName ~ newFirstName:", newFirstName)
      this.user.firstName = newFirstName
    },
    updateNewLastName(newLastName) {
      this.user.lastName = newLastName
    },
    updateNewLastName(newPassword) {
      this.user.password = newPassword
    },
    updatenewEmail(newEmail) {
      this.user.email = newEmail
    },

  },
});
