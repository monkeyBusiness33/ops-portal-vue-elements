<template>
  <div id="room-messages" :class="$style['ops-room-content']">
    <div v-if="messages?.length" class="pb-2 px-2">
      <div class="intersection-block w-full h-2" />
      <!--   Time when conversation was started   -->
      <div v-if="0" :class="$style['ops-room-content__start-conversation']">
        Conversation started at 3 April 2023
      </div>
      <OLoading v-if="loading" />

      <!--   Text box   -->
      <RoomMessageWrapper
        v-for="(message, index) in messages"
        :key="index"
        :message-index="index"
        :message-data="message"
        :messages="messages"
        :is-new-messages="getFirstUnreadMessageId === message.id"
        :room="room"
      >
        <TextMessage :message-data="message" />
      </RoomMessageWrapper>
    </div>
    <RoomNoMessages
      v-else-if="
        !messages?.length && websocketService.loadingOptions.value.isLoaded
      "
    />
  </div>
</template>
<script lang="ts" setup>
import { computed, nextTick, onMounted, PropType } from "vue";
import OLoading from "@/components/ui/OLoading.vue";
import RoomMessageWrapper from "@/components/room/content/RoomMessageWrapper.vue";
import TextMessage from "@/components/room/content/text-message/TextMessage.vue";
import { IRoom } from "@/types/rooms.types";
import { useIntersection } from "@/composables/useIntersection";
import { IMessage } from "@/types/room/room.types";
import websocketService from "@/services/chat/websocket-chat";
import { scrollToBottom } from "@/helpers/scroll";
import RoomNoMessages from "@/components/room/content/RoomNoMessages.vue";

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
const { loading, intersectionBlock } = useIntersection(
  props.room?.id,
  ".intersection-block"
);

const getFirstUnreadMessageId = computed(
  () => websocketService.unreadMessages.value[0]
);

onMounted(async () => {
  await nextTick();
  scrollToBottom("room-messages");
  if (websocketService.hasMoreMessages.value) {
    intersectionBlock();
  }
});
</script>
<style lang="scss" module>
.ops-room-content {
  @apply flex-1 overflow-auto h-full;
  &__start-conversation {
    @apply text-xs text-center mb-5 text-grey-200;
  }
}
</style>
