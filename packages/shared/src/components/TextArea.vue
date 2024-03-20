<template>
  <div :class="[$style['ops-input-wrapper'], props.class]">
    <Label v-if="labelText" :required="required" :label-text="labelText" />
    <div
      class="u-input-wrapper"
      :class="[
        $style['ops-input'],
        {
          [$style['ops-input__focus']]: isFocused,
          [$style['ops-input__disabled']]: disabled,
          [$style['ops-input__error']]: hasErrors && isValidationDirty && !disabled
        }
      ]"
    >
      <slot name="prefix" />
      <textarea
        v-bind="$attrs"
        :class="$style['ops-input__input']"
        :value="valueText"
        :placeholder="placeholder"
        :disabled="disabled"
        @focus="toggleFocus(true)"
        @blur="toggleFocus(false)"
        @input="onInput"
      />
      <slot name="suffix" />
    </div>
    <p v-if="typeof errors === 'string' && !disabled" :class="$style['ops-input-text__error']">
      <span>{{ errors }}</span>
    </p>
    <p
      v-else-if="hasErrors && isValidationDirty && !disabled"
      :class="$style['ops-input-text__error']"
    >
      <span v-for="(error, index) in errors" :key="`${index}_${error.$property}`">
        {{ index === 0 ? error.$message : '' }}
      </span>
    </p>
  </div>
</template>

<script lang="ts" setup>
import Label from './Label.vue'
import { computed, PropType, ref } from 'vue'
import { ErrorObject } from '@vuelidate/core'

const props = defineProps({
  labelText: {
    type: String,
    default: ''
  },
  class: {
    type: String,
    default: ''
  },
  isValidationDirty: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: [String, Number],
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default: 'Enter a value'
  },
  errors: {
    type: [Array, String] as PropType<ErrorObject[] | string>,
    default: () => []
  },
  modelModifiers: {
    type: Object,
    default: () => ({})
  }
})
const emit = defineEmits<{
  (e: 'update:modelValue', v: string | boolean): void
}>()

const valueText = computed(() => {
  return props.modelValue
})

const hasErrors = computed(() => {
  return !!props.errors?.length || typeof props.errors === 'string'
})

const isFocused = ref<boolean>(false)
const toggleFocus = (flag: boolean) => (isFocused.value = flag)

const onInput = (event: Event) => {
  const inputElement = event?.target as HTMLInputElement | null

  if (inputElement) {
    let inputValue = inputElement.value
    if (props.modelModifiers.uppercase) {
      inputValue = inputValue.toUpperCase()
    }
    emit('update:modelValue', inputValue)
  }
}
</script>
<style lang="scss" module>
.ops-input {
  @apply flex items-center appearance-none text-[0.875rem] bg-clip-padding leading-6 bg-white font-normal focus:outline-none text-grey-700 w-full border-grey-100 border-[0.0625rem] border-solid rounded-[0.5rem] py-[0.5rem] px-[1rem] pl-[0.6875rem] pl-[1.0625rem];
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.07);
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &-text__error {
    @apply text-amaranth-900  -bottom-8 lg:-bottom-4 text-xs;
  }

  &:has(&__input:disabled) {
    @apply bg-grey-disabled text-grey-400;
  }

  &__error {
    @apply border-red-500 #{!important};
  }

  &__icon {
    @apply h-4 w-4 opacity-50 mr-2;
  }

  &__input {
    @apply w-full h-[60px] text-grey-950 text-[0.875rem] font-medium py-0 px-0 bg-transparent border-0 outline-none #{!important};
    &::placeholder {
      @apply text-grey-200 text-base tracking-tighter font-light #{!important};
    }

    &:disabled {
      @apply bg-grey-disabled text-grey-400;
    }
  }

  &__focus {
    @apply border-grey-300 bg-white text-grey-700 outline-0;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.07), 0 0 0 0.18rem rgba(81, 93, 138, 0.25);
  }

  &-wrapper {
    @apply relative w-full flex flex-col break-words items-start justify-start rounded-[0.5rem] mb-4;
  }
}
</style>
