import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useMainStore = defineStore("useMainStore", () => {
  // state
  const mobileVisible = ref(false);
  const deletedIdChat = ref<string | null>(null);

  // getters
  const isMobileVisible = computed(() => mobileVisible.value);
  const getDeletedIdChat = computed(() => deletedIdChat.value);
  //actions
  const toggleMobileVisible = () => {
    mobileVisible.value = !mobileVisible.value;
  };

  const setDeletedIdChat = (value: string | null) =>
    (deletedIdChat.value = value);

  return {
    mobileVisible,
    isMobileVisible,
    getDeletedIdChat,
    setDeletedIdChat,
    toggleMobileVisible,
  };
});
