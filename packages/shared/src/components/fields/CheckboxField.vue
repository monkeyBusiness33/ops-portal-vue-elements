<template>
  <div :class="[$style['ops-checkbox-wrapper']]">
    <Label
      v-if="labelText"
      :required="required"
      class="checkbox-label flex flex-row w-fit gap-2 items-center mb-0"
      :label-text="labelText"
    />
    <slot v-else name="label" />
    <Checkbox
      v-model="computedValue"
      :is-error-class="isErrorClass"
      :disabled="disabled"
      v-bind="$attrs"
    />
    <p v-if="typeof errors === 'string'" :class="$style['ops-checkbox__error']">
      <span>{{ errors }}</span>
    </p>
    <p v-else-if="errors?.length" :class="$style['ops-checkbox__error']">
      <span v-for="(error, index) in errors" :key="`${index}_${error.$property}`">
        {{ error.$message }}
      </span>
    </p>
  </div>
</template>

<script lang="ts" setup>
import Label from '../Label.vue'
import { computed, PropType } from 'vue'
import Checkbox from '../Checkbox.vue'
import { ErrorObject } from '@vuelidate/core'

const props = defineProps({
  labelText: {
    type: String,
    default: ''
  },
  errors: {
    type: [Array, String] as PropType<ErrorObject[] | string>,
    default: () => []
  },
  disabled: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: Boolean,
    default: () => null
  }
})
const emit = defineEmits<{
  (e: 'update:modelValue', v: boolean): void
}>()

const isErrorClass = computed(() => {
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
.ops-checkbox {
  &-wrapper {
    @apply relative gap-[1.25rem] flex items-center min-w-0 break-words bg-white justify-start mb-2;
  }

  &__error {
    @apply text-amaranth-900 absolute -bottom-[15px] text-xs;
  }
}
</style>
