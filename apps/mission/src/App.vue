<template>
  <div :class="[(computedGroundServicingModal || computedAmendModal) ? $style['turnaround-wrapper'] : $style['mission-wrapper']]">
    <MissionTurnarounds v-if="computedGroundServicingModal" />
    <MissionAmendTiming v-else-if="computedAmendModal" />
    <MissionPage v-else />
  </div>
</template>

<script setup lang="ts">
import MissionPage from '@/pages/MissionPage.vue'
import MissionTurnarounds from '@/pages/MissionTurnarounds.vue'
import MissionAmendTiming from '@/pages/MissionAmendTiming.vue'
import { computed, onBeforeMount, onBeforeUnmount } from 'vue'

const computedGroundServicingModal = computed(() => window.vue_elements_mode === 'mission_ground_servicing_modal')
const computedAmendModal = computed(() => window.vue_elements_mode === 'mission_amend_timings_modal')

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
<style lang="scss" module>
.mission-wrapper {
  @apply bg-grey-50;
}
</style>
