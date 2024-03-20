<template>
  <div :class="$style['ops-form__checkbox-wrapper']">
    <input
      v-if="!name"
      :class="[
        $style['ops-form__checkbox'],
        {
          [$style['ops-form__checkbox-error']]: isErrorClass,
          [$style['ops-form__checkbox-checked']]: modelValue
        }
      ]"
      :value="modelValue"
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      @change="$emit('update:modelValue', $event.target.checked)"
    />
    <input
      v-if="name"
      :class="[$style['ops-form__radio'], { [$style['ops-form__radio-error']]: isErrorClass }]"
      :value="modelValue"
      :name="name"
      :checked="modelValue"
      :width="size"
      :height="size"
      type="radio"
      :disabled="disabled"
      :style="{ width: size, height: size }"
      @change="$emit('update:modelValue', $event.target.checked)"
    />
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'

defineProps({
  modelValue: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  name: {
    type: String as PropType<string>,
    default: ''
  },
  disabled: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  size: {
    type: String as PropType<string>,
    default: '13px'
  },
  isErrorClass: {
    type: Boolean as PropType<boolean>,
    default: false
  }
})

defineEmits<{
  (e: 'update:modelValue', v: boolean): void
}>()
</script>

<style lang="scss" module>
.ops-form {
  &__checkbox-error,
  &__radio-error {
    @apply bg-amaranth-900;
  }

  &__checkbox-wrapper {
    @apply flex;
  }

  &__checkbox,
  &__radio {
    @apply w-[1.125em] cursor-pointer h-[1.125em]  appearance-none border border-grey-100 bg-grey-50 bg-contain bg-center align-top bg-no-repeat bg-grey-50;
    transition: background-color 0.2s ease-in-out, background-position 0.2s ease-in-out,
      border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

    &-checked {
      @apply bg-grey-900 border-grey-900;
    }

    &:disabled {
      @apply opacity-90 border-transparent  #{!important};
    }

    &:focus {
      @apply border-gray-300 outline-none;
      box-shadow: 0 0 0 0.18rem rgba(81, 93, 138, 0.25);
    }
  }

  &__checkbox {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10l3 3l6-6'/%3e%3c/svg%3e");

    &[type='checkbox'] {
      @apply rounded-[0.25em];
    }
  }

  &__radio {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3ccircle cx='10' cy='10' r='6' fill='%23ffffff'/%3e%3c/svg%3e");

    &[type='radio'] {
      @apply rounded-full;
    }
  }
}
</style>
