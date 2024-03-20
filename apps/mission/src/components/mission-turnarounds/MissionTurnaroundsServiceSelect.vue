<template>
  <SelectField
    class="turnaround-services mb-0"
    required
    :get-option-label="generateServiceLabel"
    placeholder=""
    :reduce="(item) => item.id"
    :options="options"
    :loading="loading"
  />
</template>
<script setup lang="ts">
import type { PropType } from 'vue'
import { SelectField } from 'shared/components'
import type { IAirport } from '@/types/mission/airport.types'

const props = defineProps({
  locationData: {
    type: Object as PropType<IAirport>,
    default: () => ({})
  },
  options: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  }
})
const generateServiceLabel = (item) => {
  if (item?.attributes) return item?.attributes?.name
  return props.options.find((option) => option.id === item.service)?.attributes?.name
}
</script>
<style lang="scss">
.vs__dropdown-menu {
  @apply z-[2000] #{!important};
}
</style>