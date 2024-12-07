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
    async register(user, dataGroup) {
      if (dataGroup.type === "Famille") {
        dataGroup.type = "Familly"
      }
      if (dataGroup.type === "Amis") {
        dataGroup.type = "Friends"
      }
      if (dataGroup.type === "Entreprise") {
        dataGroup.type = "Company"
      }
      const { token } = await $fetch(
        "http://207.154.214.80:8080/api/v1/auth/register",
        {
          headers: { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*', },
          mode: "cors",
          method: "POST",
          body: { user, group: dataGroup },
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
        "http://207.154.214.80:8080/api/v1/auth/login",
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
      const { res } = await $fetch("http://207.154.214.80:8080/api/v1/auth/logout",
        {
          headers: { 'Authorization': useCookie('authToken').value },
          method: "POST",
        })
      const tokenCookie = useCookie('authToken');
      tokenCookie.value = undefined;
      this.token = undefined
      return navigateTo('/Login')

    },


  },
});
