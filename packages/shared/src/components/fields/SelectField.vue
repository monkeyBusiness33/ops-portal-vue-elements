<template>
  <div
    :class="[$style['ops-select-wrapper'], { 'flex items-center flex-row': isHorizontalWrapper }]"
  >
    <Label v-if="!multiple && labelText" :required="required" :label-text="labelText" />
    <Select
      v-model="computedValue"
      :placeholder="placeholder"
      :has-errors="hasErrors && isValidationDirty && !disabled"
      v-bind="$attrs"
      :append-to-body="appendToBody"
      :position="position"
      :taggable="taggable"
      :hide-values="hideValues"
      :multiple="multiple"
      :disabled="disabled"
    >
      <template #select-option="item">
        <slot name="select-option" v-bind="item" />
      </template>
      <template v-for="(_, name) in $slots" #[name]="slotData">
        <slot :name="name" v-bind="slotData" />
      </template>
    </Select>
    <p v-if="typeof errors === 'string' && !disabled" :class="$style['ops-select__error']">
      <span>{{ errors }}</span>
    </p>
    <p v-else-if="hasErrors && isValidationDirty && !disabled" :class="$style['ops-select__error']">
      <span v-for="(error, index) in errors" :key="`${index}_${error.$property}`">
        {{ index === 0 ? error.$message : '' }}
      </span>
    </p>
  </div>
</template>

<script lang="ts" setup>
import Label from '../Label.vue'
import { computed, PropType } from 'vue'
import Select from '../Select.vue'
import type { ErrorObject } from '@vuelidate/core'

const props = defineProps({
  labelText: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  hideValues: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  },
  taggable: {
    type: Boolean,
    default: false
  },
  isHorizontalWrapper: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: [String, Number, Boolean, Object],
    default: () => null
  },
  multiple: {
    type: Boolean,
    default: false
  },
  errors: {
    type: [Array, String] as PropType<ErrorObject[] | string>,
    default: () => []
  },
  isValidationDirty: {
    type: Boolean,
    default: false
  },
  position: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Select an option'
  },
  appendToBody: {
    type: Boolean,
    default: true
  }
})
const emit = defineEmits<{
  (e: 'update:modelValue', v: any): void
}>()

const hasErrors = computed(() => {
  return !!props.errors?.length || typeof props.errors === 'string'
})

const computedValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    return emit('update:modelValue', value)
  }
})
</script>
<style lang="scss" module>
.ops-select-wrapper {
  @apply relative w-full flex flex-col break-words items-start justify-start rounded-[0.5rem] sm:mb-0 mb-4;
}

.ops-select-wrapper__error {
  @apply border border-red-800 #{!important};
}

.ops-select__error {
  @apply text-amaranth-900  -bottom-8 lg:-bottom-4 text-xs;
}
</style>
