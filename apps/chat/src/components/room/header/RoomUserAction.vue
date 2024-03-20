<template>
  <div :class="$style['room-user-action']">
    <v-btn
      density="compact"
      icon="fas fa-cog fa-xs"
      class="me-2"
      @click="onOpenSettingModal"
    ></v-btn>
    <button
      v-if="websocketService.isUserInConversation.value"
      :class="$style['room-user-action__action']"
      @click="onLeaveConversation"
    >
      Leave Conversation
    </button>
    <button
      v-else
      :class="$style['room-user-action__action']"
      @click="onJoinConversation"
    >
      Join Conversation
    </button>
  </div>
  <SettingModal v-model:show="isOpenSettingModal" />
</template>

<script lang="ts" setup>
import { PropType, ref } from "vue";
import { IRoom } from "@/types/rooms.types";
import chatService from "@/services/chat/chat";
import websocketService from "@/services/chat/websocket-chat";
import { scrollToBottom } from "@/helpers/scroll";
import { useConversationDetails } from "@/composables/useConversationDetails";
import SettingModal from "@/components/modals/SettingModal.vue";

const props = defineProps({
  room: {
    type: Object as PropType<IRoom>,
    default: null,
  },
});

const isOpenSettingModal = ref(false);

const { updateRoomInList } = useConversationDetails(props.room);

const clearRoom = () => {
  websocketService.selectedRoom.value = {} as IRoom;
};
const onLeaveConversation = async () => {
  const { isConfirmed } = await window.Swal({
    title: "Leave Conversation",
    text: "Leaving conversation you’ll stop receiving notifications about new messages",
    icon: "info",
  });
  if (isConfirmed) {
    const data = await chatService.leaveConversation(props.room?.id);
    if (data.id) {
      await updateRoomInList(data);
      websocketService.isUserInConversation.value = false;
      clearRoom();
    }
  }
};

const onJoinConversation = async () => {
  const { isConfirmed } = await window.Swal({
    title: "Join Conversation",
    text: "Joining conversation you’ll start receiving notifications about new messages",
    icon: "info",
  });
  if (isConfirmed) {
    await chatService.joinConversation(props.room?.id);
    scrollToBottom(".vue-recycle-scroller");
  }
};

const onOpenSettingModal = () => {
  isOpenSettingModal.value = true;
};
</script>

<style lang="scss" module>
.room-user-action {
  @apply flex;
  &__action {
    @apply bg-grey-900 w-fit whitespace-nowrap text-white px-3 py-1 rounded-md text-sm #{!important};
  }
}
</style>
