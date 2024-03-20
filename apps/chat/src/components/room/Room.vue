<template>
  <div
    v-if="selectedRoom && websocketService.loadingOptions.value.isLoaded"
    :key="selectedRoom?.id"
    :class="$style['ops-room-chat']"
  >
    <transition name="fade">
      <RoomDeleted v-if="mainStore.getDeletedIdChat === roomId" />
    </transition>
    <RoomHeader
      :show-rooms-list="showRoomsList"
      :room="selectedRoom"
      @toggle-rooms-list="$emit('toggleRoomsList')"
    />
    <div :class="$style['ops-room-chat__box']">
      <RoomContentScroller
        v-if="selectedRoom?.id && !isLoading"
        :messages="websocketService.messages.value"
        :room="selectedRoom"
      />
    </div>
    <RoomFooter :room="selectedRoom" />
  </div>
  <OLoading v-else-if="isLoading" :class="$style['ops-room-chat__loading']" />
</template>

<script lang="ts" setup>
import { computed, onMounted, PropType } from "vue";
import OLoading from "@/components/ui/OLoading.vue";
import RoomHeader from "@/components/room/header/RoomHeader.vue";
import RoomFooter from "@/components/room/footer/RoomFooter.vue";
import websocketService from "@/services/chat/websocket-chat";
import RoomContentScroller from "@/components/room/content/RoomContentScroller.vue";
import { useMainStore } from "@/store/useMainStore";
import RoomDeleted from "@/components/room/RoomDeleted.vue";

const mainStore = useMainStore();
const props = defineProps({
  showRoomsList: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  roomId: {
    type: String as PropType<string>,
    default: "",
  },
});

defineEmits<{
  (e: "toggleRoomsList"): void;
}>();

const isLoading = computed(() => websocketService.loadingOptions.value.loading);
const selectedRoom = computed(() => websocketService.selectedRoom.value);

onMounted(() => {
  if (websocketService.headlessModeId.value) {
    websocketService.fetchRoom(props.roomId);
  }
});
</script>

<style lang="scss" module>
.ops-room-chat {
  @apply flex relative flex-col flex-nowrap h-full overflow-hidden flex-1;

  &__box {
    @apply bg-grey-50 flex-1 overflow-auto relative;
  }

  &__loading {
    @apply absolute top-[50%] left-[50%] #{!important};
  }
}
</style>
