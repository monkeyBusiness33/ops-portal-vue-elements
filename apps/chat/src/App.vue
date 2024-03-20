<template>
  <div class="relative ops-portal-chat">
    <div v-if="getUserMeta" class="chat-app aml-ops-chat-tw">
      <RoomsContainer />
    </div>
    <ONetworkError />
  </div>
</template>

<script lang="ts" setup>
import RoomsContainer from "@/components/rooms/RoomsContainer.vue";
import { computed, onMounted } from "vue";
import chatService from "@/services/chat/chat";
import { useUserStore } from "@/store/useUserStore";
import websocketService from "@/services/chat/websocket-chat";
import { getChatModeId } from "@/helpers/general";
import ONetworkError from "@/components/ui/ONetworkError.vue";
import websocketNotification from "@/services/chat/websocket-notification";

const userStore = useUserStore();
const getUserMeta = computed(() => userStore.getUser);

onMounted(async () => {
  websocketService.headlessModeId.value = getChatModeId();
  !websocketService.headlessModeId.value &&
    (await websocketNotification.openNotificationSocket());
  const data = await chatService.fetchChatMeta();
  userStore.setUser(data);
  websocketService.userSettings.value = data.settings;
});
</script>
<style lang="scss">
@import "@/assets/styles/tailwind.css";
@import "@/assets/reset";

.chat-app {
  @apply shadow-[0_2px_8px_0px_rgba(99,99,99,0.2)] rounded-md box-border;
}
</style>
