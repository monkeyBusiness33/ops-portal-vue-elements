<template>
  <transition name="ops-slide-left">
    <div
      v-if="websocketService.onErrorSocket.value"
      :class="$style['failed-connection']"
    >
      <p>No connection to the server,</p>
      please wait for reconnect or refresh the page
    </div>
  </transition>
</template>

<script lang="ts" setup>
import websocketService from "@/services/chat/websocket-chat";
</script>

<style lang="scss" module>
.failed-connection {
  @apply absolute z-50 right-0 top-0 bg-amaranth-900 px-3 py-1 rounded-bl-md text-white text-sm;
}
</style>
