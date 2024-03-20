<template>
  <div :class="$style['error-box']">
    <div v-for="(error, index) in formErrors" :key="index" :class="$style['error-box__item']">
      <img
        :src="getImageUrl('assets/icons/triangle-exclamation.svg')"
        :class="$style['error-box__icon']"
        alt="alert"
      />
      <div v-if="error" v-html="error" />
      <span v-else>Something went wrong</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useMissionFormStore } from '@/stores/useMissionFormStore'
import { getImageUrl } from '@/helpers'
const missionFormStore = useMissionFormStore()

const { formErrors } = storeToRefs(missionFormStore)
</script>

<style lang="scss" module>
.error-box {
  @apply border border-amaranth-900 p-3 rounded-md bg-red-500/20 text-amaranth-900;

  &__item {
    @apply flex mb-1;
  }
  &__icon {
    @apply mr-2 w-5;
    filter: invert(19%) sepia(72%) saturate(5769%) hue-rotate(338deg) brightness(93%) contrast(90%);
  }
}
</style>
