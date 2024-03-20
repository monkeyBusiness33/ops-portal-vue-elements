<template>
  <div :class="$style['ops-room-chat-deleted']">
    <span :class="$style['ops-room-chat-deleted__text']">Chat deleted</span>
  </div>
</template>

<style lang="scss" module>
.ops-room-chat-deleted {
  @apply w-full h-full absolute bg-grey-300/30 top-0 left-0 z-50 flex items-center justify-center backdrop-blur-sm;

  &__text {
    @apply bg-grey-800 text-white px-3 rounded-md;
  }
}
</style>
