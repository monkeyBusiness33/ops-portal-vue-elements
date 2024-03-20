<template>
  <div :class="$style['ops-text-message']">
    {{ messageData?.content }}
  </div>
</template>

<script lang="ts" setup>
import { PropType } from "vue";
import { IMessage } from "@/types/room/room.types";

defineProps({
  messageData: {
    type: Object as PropType<IMessage>,
    default: () => ({}),
  },
});
</script>

<style lang="scss" module>
.ops-text-message {
  @apply text-sm w-full inline-block text-ellipsis overflow-hidden;
}
</style>
