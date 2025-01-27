<template>
  <div id="room-messages" class="room-content-scroller">
    <div v-if="messages?.length" class="room-content-scroller__messages">
      <OLoading v-if="loading" />
      <DynamicScroller
        ref="scroller"
        class="scroller"
        :items="messages"
        :min-item-size="54"
        :emit-update="true"
        :buffer="54"
        @update="onViewport"
      >
        <template #before>
          <div class="intersection-block w-full h-2" />
        </template>
        <template #default="{ item, index, active }">
          <DynamicScrollerItem
            v-if="item.id"
            :item="item"
            :active="active"
            :data-index="index"
            :data-active="active"
          >
            <RoomMessageWrapper
              :key="index"
              :message-index="index"
              :message-data="item"
              :messages="messages"
              :is-new-messages="getFirstUnreadMessageId === item.id"
              :room="room"
              class="room-message-wrapper"
            >
              <TextMessage :message-data="item" />
            </RoomMessageWrapper>
          </DynamicScrollerItem>
        </template>
      </DynamicScroller>
    </div>
    <RoomNoMessages
      v-else-if="
        !messages?.length && !websocketService.loadingOptions.value.isLoaded
      "
      text="There aren`t any messages"
    />
  </div>
</template>
<script lang="ts" setup>
//@ts-ignore
import { DynamicScroller, DynamicScrollerItem } from "vue-virtual-scroller";
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";
import { computed, nextTick, onMounted, PropType, ref } from "vue";
import { IRoom } from "@/types/rooms.types";
import { IMessage } from "@/types/room/room.types";
import TextMessage from "@/components/room/content/text-message/TextMessage.vue";
import RoomMessageWrapper from "@/components/room/content/RoomMessageWrapper.vue";
import OLoading from "@/components/ui/OLoading.vue";
import { WS_TYPES } from "@/types/general.types";
import { useIntersection } from "@/composables/useIntersection";
import { useUserStore } from "@/store/useUserStore";
import websocketService from "@/services/chat/websocket-chat";
import RoomNoMessages from "@/components/room/content/RoomNoMessages.vue";

const userStore = useUserStore();
const props = defineProps({
  room: {
    type: Object as PropType<IRoom>,
    default: () => ({}),
  },
  messages: {
    type: Array as PropType<IMessage[]>,
    default: () => [],
  },
});
const scroller = ref();
const { loading, intersectionBlock } = useIntersection(
  props.room?.id,
  ".intersection-block"
);

const getFirstUnreadMessageId = computed(
  () => websocketService.unreadMessages.value[0]
);
const onViewport = async (
  startIndex: number,
  endIndex: number,
  visibleStartIndex: number,
  visibleEndIndex: number
) => {
  if (
    !props.messages[visibleEndIndex - 1]?.is_read &&
    props.messages[visibleEndIndex - 1]?.author?.id !==
      userStore.getUser.person.id
  ) {
    websocketService.sendMessage({
      type: WS_TYPES.READ_MESSAGES,
    });
  }
};

onMounted(async () => {
  await nextTick();
  scroller.value?.scrollToBottom();
  if (websocketService.hasMoreMessages.value) {
    intersectionBlock();
  }
});
</script>
<style lang="scss" scoped>
.room-content-scroller,
.room-content-scroller__messages {
  @apply h-full;
}

.room-message-wrapper {
  @apply py-1;
}

.vue-recycle-scroller__item-wrapper,
.vue-recycle-scroller {
  @apply h-[calc(100%-0.5rem)] px-2;
}

.bottom-messages {
  @apply flex items-end transition-all;
}
</style>
