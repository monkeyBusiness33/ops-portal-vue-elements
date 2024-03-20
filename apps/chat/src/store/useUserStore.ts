import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { IUser } from "@/types/user.types";

export const useUserStore = defineStore("useUserStore", () => {
  // state
  const user = ref();

  // getters
  const getUser = computed(() => user.value);

  //actions
  const setUser = (currentUser: IUser) => {
    user.value = currentUser;
  };

  return {
    user,
    getUser,
    setUser,
  };
});
