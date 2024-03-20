<template>
  <label :class="[$style['ops-form-label__wrapper']]">
    <span
      v-bind="$attrs"
      :class="[
        $style['ops-form-label__text'],
        { [$style['ops-form-label__required']]: required },
        textClass
      ]"
    >
      {{ labelText }}
    </span>
    <slot />
  </label>
</template>

<script lang="ts" setup>
defineProps({
  labelText: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: true
  },
  textClass: {
    type: String,
    default: ''
  }
})
</script>

<style lang="scss" module>
.ops-form-label {
  &__wrapper {
    @apply flex justify-start relative w-full flex-col break-words gap-y-0.5 mb-0;
  }

  &__required::after {
    content: ' *';
    @apply text-[1.1rem] relative top-[1.5px] left-[-2.5px];
    color: red;
  }

  &__text {
    @apply cursor-pointer font-medium break-words text-grey-950 leading-6 text-[1rem] mb-2;
    font-family: Inter, sans-serif;
  }
}
</style>
