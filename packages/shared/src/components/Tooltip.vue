<template>
  <Dropdown
    theme="ops-room-item__name"
    :triggers="['hover']"
    :placement="'top-start'"
    :distance="6"
  >
    <slot name="target" />
    <template #popper>
      <slot name="popper" />
    </template>
  </Dropdown>
</template>
<script setup lang="ts">
import { Dropdown } from 'floating-vue'
</script>

<style lang="scss">
.v-popper--theme-ops-room-item__name {
  .v-popper__inner {
    @apply bg-white rounded-md px-2 py-1 border-[1px] border-grey-900 border-solid text-grey-900 text-sm #{!important};
    h2 {
      @apply text-sm my-0 font-normal;
    }
  }

  .v-popper__arrow-container {
    .v-popper__arrow-outer {
      @apply border-grey-900 border-solid ml-[auto];
    }
  }
}
</style>
