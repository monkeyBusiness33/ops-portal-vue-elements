<template>
  <VDropdown v-bind="$attrs" placement="top" class="mr-2">
    <div class="relative w-fit mx-auto">
      <img
        :style="{ width: iconSize, height: iconSize }"
        class="shrink-0 w-fit"
        :src="getImageUrl(`assets/icons/${icon}.svg`)"
        :alt="icon"
        @mouseover="isTooltipShow = true"
        @mouseleave="isTooltipShow = false"
      />
      <div
        v-if="isTooltipShow"
        class="absolute bg-white -top-10 left-1/2 -translate-x-1/2 rounded-md px-2 py-1 border-[1px] border-grey-900 border-solid text-grey-900 text-sm"
      >
        {{ tooltipText }}
      </div>
    </div>
    <template #popper>
      <slot name="dropdown-popper" />
    </template>
  </VDropdown>
</template>
<script setup lang="ts">
import { getImageUrl } from '@/helpers'
import { ref } from 'vue'

defineProps({
  icon: {
    type: String,
    default: ''
  },
  iconSize: {
    type: String,
    default: '20px'
  },
  tooltipText: {
    type: String,
    default: ''
  }
})
const isTooltipShow = ref(false)
</script>

<style scoped lang="scss">
img {
  filter: invert(17%) sepia(18%) saturate(1710%) hue-rotate(179deg) brightness(96%) contrast(95%);
}

.v-popper__popper {
  @apply z-[100000];
}
</style>
