<template>
  <button :class="$style['ops-button']" v-bind="$attrs">
    <img
      v-if="prefixIcon"
      :class="$style['ops-button__img']"
      :src="getImageUrl(`assets/icons/${prefixIcon}.svg`)"
      alt="icon"
    />
    <slot />
    <img
      v-if="suffixIcon"
      :class="$style['ops-button__img']"
      :src="getImageUrl(`assets/icons/${suffixIcon}.svg`)"
      alt="icon"
    />
  </button>
</template>

<script lang="ts" setup>
import { PropType } from "vue";
import { getImageUrl } from "@/helpers/import-image";

defineProps({
  prefixIcon: {
    type: String as PropType<string>,
    default: "",
  },
  suffixIcon: {
    type: String as PropType<string>,
    default: "",
  },
});
</script>
<style lang="scss" module>
.ops-button {
  &__img {
    @apply w-6 h-6 block transition-all duration-200;
    filter: invert(33%) sepia(6%) saturate(3867%) hue-rotate(190deg)
      brightness(96%) contrast(75%) !important;
  }
}
</style>
