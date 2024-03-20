<template>
  <div :class="$style['rooms-empty']">
    <p :class="$style['rooms-empty__text']">{{ text }}</p>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from "vue";

defineProps({
  text: {
    type: String as PropType<string>,
    default: "",
  },
});
</script>

<style lang="scss" module>
.rooms-empty {
  @apply bg-confetti-500 rounded-md py-2 px-4 w-fit absolute left-[40%] top-1/2;
  animation: emptyRooms 0.4s;

  &__text {
    @apply text-center text-grey-900;
  }
}

@keyframes emptyRooms {
  0% {
    transform: scale(0.95);
  }
  50% {
    transform: scale(1.1);
  }
  75% {
    transform: scale(1.05);
  }
  90% {
    transform: scale(1.07);
  }
  100% {
    transform: scale(1);
  }
}
</style>
