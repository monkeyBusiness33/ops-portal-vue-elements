<template>
  <OScrollBar>
    <div :class="$style['ops-rooms-list']">
      <div v-if="rooms?.length" :class="$style['ops-rooms-list__items']">
        <TransitionGroup name="list">
          <RoomsItem
            v-for="(room, index) in rooms"
            :key="room.id"
            :room-data="room"
            :index="index"
            :is-selected-room="selectedRoom?.id === room.id"
            :first-participant="firstParticipant"
            @select-room="handleSelectRoom"
          />
        </TransitionGroup>
      </div>
      <RoomsEmpty v-else />
    </div>
  </OScrollBar>
</template>

<script lang="ts" setup>
import { PropType } from "vue";
import RoomsItem from "@/components/rooms/RoomsItem.vue";
import { IRoom } from "@/types/rooms.types";
import RoomsEmpty from "@/components/rooms/RoomsEmpty.vue";
import websocketService from "@/services/chat/websocket-chat";
import { useMainStore } from "@/store/useMainStore";
import OScrollBar from "@/components/ui/OScrollBar.vue";
import websocketNotification from "@/services/chat/websocket-notification";

const mainStore = useMainStore();
defineProps({
  rooms: {
    type: Array as PropType<IRoom[]>,
    default: () => [],
  },
  selectedRoom: {
    type: Object as PropType<IRoom>,
    default: null,
  },
  firstParticipant: {
    type: Object as PropType<IRoom>,
    default: null,
  },
});

const handleSelectRoom = async (room: IRoom) => {
  websocketNotification.closeNotification();
  websocketService.selectedRoom.value = room;
  websocketService.loadingOptions.value.isLoaded = false;
  websocketService.resetReconnectCounter();
  mainStore.getDeletedIdChat && mainStore.setDeletedIdChat(null);
  await websocketService.fetchRoom(room?.id);
  mainStore.toggleMobileVisible();
};
</script>
<style lang="scss" module>
.ops-rooms-list {
  @apply px-4;
  &__items {
    @apply mt-4 py-2;
  }
}
</style>
