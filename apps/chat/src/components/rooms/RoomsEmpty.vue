<template>
  <div :class="$style['rooms-empty']">
    <p>There aren`t any rooms</p>
  </div>
</template>

<style lang="scss" module>
.rooms-empty {
  animation: emptyRooms 0.4s;
  @apply mt-10 bg-confetti-500 rounded-md py-2;
  p {
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
