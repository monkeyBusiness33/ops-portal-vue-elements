<template>
  <div
    :class="[
      $style['ops-room-footer'],
      {
        [$style['ops-room-footer__disabled']]:
          websocketService.socketState.value !== WS_CONNECTION.OPEN,
      },
    ]"
  >
    <OButton
      v-if="0"
      :class="$style['ops-room-footer__action']"
      class="!mr-2"
      prefix-icon="microphone"
    />
    <OInput
      ref="inputSearch"
      v-model="messageQuery"
      :class="$style['ops-room-footer__input']"
      placeholder="Type..."
      @keydown.enter="onSend"
      @input="onTyping"
    />
    <div :class="$style['ops-room-footer__action-end']">
      <RoomEmojiPicker ref="emojiPicker" @select-emoji="onEmoji" />
      <OButton
        v-if="0"
        prefix-icon="file"
        class="ml-2"
        :class="$style['ops-room-footer__action']"
      />
      <OButton
        prefix-icon="send"
        class="!ml-2"
        :class="$style['ops-room-footer__action']"
        @click="onSend"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref, watch } from "vue";
import OInput from "@/components/ui/OInput.vue";
import OButton from "@/components/ui/OButton.vue";
import RoomEmojiPicker from "@/components/room/footer/RoomEmojiPicker.vue";
import { IEmoji } from "@/types/room/room.types";
import { IRoom } from "@/types/rooms.types";
import { WS_CONNECTION, WS_TYPES } from "@/types/general.types";
import { throttle } from "@/helpers/general";
import websocketService from "@/services/chat/websocket-chat";

defineProps({
  room: {
    type: Object as PropType<IRoom>,
    default: () => ({}),
  },
});
const inputSearch = ref<InstanceType<typeof OInput>>();
const emojiPicker = ref<InstanceType<typeof RoomEmojiPicker>>();
const messageQuery = ref("");
const typingOptions = ref({
  isBusy: false,
  timer: 0,
});

const onEmoji = (emoji: IEmoji) => {
  messageQuery.value += emoji.emoji;
  inputSearch.value?.inputRef.focus();
};

const onThrottle = throttle(() => {
  websocketService.sendMessage({
    type: WS_TYPES.TYPING,
    typing: true,
  });
}, 3000);

const onTyping = () => {
  onThrottle();
  clearTimeout(typingOptions.value.timer);
  typingOptions.value.timer = setTimeout(() => {
    onEndTyping();
    typingOptions.value.isBusy = false;
  }, 3000);
};

const onSend = async () => {
  if (
    messageQuery.value.trim() &&
    websocketService.socket.value.readyState === WS_CONNECTION.OPEN
  ) {
    const message = {
      type: WS_TYPES.CHAT_MESSAGES,
      message: messageQuery.value,
    };

    await websocketService.sendMessage(message);
    resetFooter();
    onEndTyping();
  }
};

const resetFooter = () => {
  messageQuery.value = "";
  emojiPicker.value?.closeEmoji();
};

const onEndTyping = () => {
  websocketService.sendMessage({
    type: WS_TYPES.TYPING,
    typing: false,
  });
  websocketService.userTyping.value = {};
};

watch(
  () => websocketService.socketState.value,
  (val) => {
    if (val === WS_CONNECTION.CLOSED) {
      inputSearch.value?.inputRef?.blur();
    }
  },
  { deep: true }
);
</script>
<style lang="scss" module>
.ops-room-footer {
  @apply bg-grey-50 w-full z-10 py-4 px-2 flex items-center  shadow-[0_2px_8px_0px_rgba(99,99,99,0.2)];

  &__action {
    @apply px-0 transition-all duration-200 rounded-full shrink-0;

    &:hover {
      img {
        @apply scale-[1.2];
      }
    }
  }

  &__input {
    @apply bg-white #{!important};
  }

  &__action-end {
    @apply flex items-center shrink-0 ml-2;
  }

  &__disabled {
    @apply pointer-events-none cursor-not-allowed #{!important};

    .ops-room-footer__input {
      @apply bg-grey-50 #{!important};
    }
  }
}
</style>
