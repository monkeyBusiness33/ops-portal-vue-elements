<template>
  <perfect-scrollbar ref="scroll" v-bind="props" always>
    <slot />
  </perfect-scrollbar>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";

const props = withDefaults(
  defineProps<{
    height?: string;
    always?: boolean;
  }>(),
  {
    height: "100%",
    always: false,
  }
);
const scroll = ref();
defineExpose({ scroll: computed(() => scroll.value) });
</script>
<style lang="scss">
.ps {
  &__rail-y {
    &:hover,
    &:focus {
      @apply bg-transparent #{!important};
    }
  }

  &__thumb-y {
    @apply bg-grey-900 w-[5px] #{!important};
  }

  &__view {
    @apply h-full;
  }
}
</style>
