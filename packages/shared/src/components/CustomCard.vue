<template>
  <div>
    <div
      class="ops-form-wrapper"
      :class="[$style['ops-form-wrapper'], { 'opacity-30 min-h-[33rem]': formErrors?.length }]"
    >
      <div
        class="ops-form-wrapper__content"
        :class="[
          {
            [$style['ops-form-wrapper__content']]: addDefaultClasses,
            [$style['ops-form-wrapper__opacity']]: isLoading
          }
        ]"
      >
        <slot name="content" />
      </div>
      <Loading v-if="isLoading" :class="[$style['ops-form-wrapper__loader']]" />
    </div>
    <div v-if="formErrors?.length" :class="[[$style['ops-form-wrapper__error']]]">
      {{ formErrors?.[0]?.$message }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import Loading from '../components/Loading.vue'

defineProps({
  addDefaultClasses: {
    type: Boolean,
    default: false
  },
  formErrors: {
    type: Array,
    default: () => []
  },
  isLoading: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss" module>
.ops-form-wrapper {
  @apply relative flex border border-grey-opacity-800/25 flex-col bg-white min-w-0 rounded-[0.5rem];

  &__opacity {
    @apply opacity-50;
  }

  &__content {
    @apply grid px-6 gap-x-[1.5rem] gap-y-[6px] mt-4 mb-[1rem];
  }

  &__error {
    @apply absolute z-50 opacity-100 text-[14px] text-[#97650e] w-[95%] text-center p-4 rounded-[0.5rem] top-[48%] left-1/2 -translate-y-[50%] -translate-x-[50%] border-[#fee5ba] bg-[#feeed1];
  }

  &__loader {
    @apply absolute top-1/2 left-1/2;
  }
}
</style>
