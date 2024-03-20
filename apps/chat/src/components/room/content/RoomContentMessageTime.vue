<template>
  <div class="ops-message-time">
    <span class="ops-message-time__time">{{ timeFormat }}</span>
    <img
      v-if="messageData?.is_read"
      class="ops-message-time__read"
      :src="getImageUrl('assets/icons/read-message.svg')"
      alt="read-message"
    />
    <img
      v-else
      class="ops-message-time__read"
      :src="getImageUrl('assets/icons/unread-message.svg')"
      alt="read-message"
    />
  </div>
</template>

<script lang="ts" setup>
import { getImageUrl } from "@/helpers/import-image.js";
import { computed, PropType } from "vue";
import dayjs from "dayjs";
import { IMessage } from "@/types/room/room.types";

const props = defineProps({
  messageData: {
    type: Object as PropType<IMessage>,
    default: null,
  },
});
const timeFormat = computed(() =>
  dayjs(props.messageData?.timestamp).format("HH:mm")
);
</script>

<style lang="scss">
.own-message {
  .ops-message-time__read {
    @apply block #{!important};
  }
}

.ops-message-time {
  @apply self-end flex items-center;

  &__time {
    @apply text-[0.62rem] leading-5 truncate text-grey-200;
  }

  &__read {
    @apply w-3 h-3 ml-1 hidden;
    filter: invert(76%) sepia(6%) saturate(564%) hue-rotate(165deg)
      brightness(92%) contrast(85%);
  }
}
</style>
