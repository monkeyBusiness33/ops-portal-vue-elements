<template>
  <div>
    <TeamCalendar />
  </div>
</template>

<script setup lang="ts">
import TeamCalendar from '@/pages/TeamCalendar.vue'
import { onBeforeMount, onBeforeUnmount } from 'vue'

const focusinHandler = (event: FocusEvent) => {
  event.stopImmediatePropagation()
}

onBeforeMount(() => {
  document.addEventListener('focusin', focusinHandler, true)
})
onBeforeUnmount(() => {
  document.removeEventListener('focusin', focusinHandler, true)
})
</script>
<style lang="scss"></style>
