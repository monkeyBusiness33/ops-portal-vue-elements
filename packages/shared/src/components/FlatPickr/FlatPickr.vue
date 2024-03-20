<template>
  <div>
    <flat-pickr
      v-bind="$attrs"
      ref="datePicker"
      v-model="modelValue"
      :placeholder="placeholder"
      class="leg-date-picker"
      :class="{ 'picker-error': errors?.length && isValidationDirty }"
    />
    <p v-if="errors?.length && isValidationDirty" class="picker-error-text">
      <span v-for="(error, index) in errors" :key="`${index}_${error.$property}`">
        {{ index === 0 ? error.$message : '' }}
      </span>
    </p>
  </div>
</template>
<script setup lang="ts">
//@ts-ignore
import flatPickr from 'vue-flatpickr-component'
import { PropType } from 'vue'
import { ErrorObject } from '@vuelidate/core'
import { computed, ref } from 'vue'
import './flat-pickr.scss'

const modelValue = defineModel()
defineProps({
  errors: {
    type: Array as PropType<ErrorObject[] | string>,
    default: () => []
  },
  placeholder: {
    type: String,
    default: 'Select a date'
  },
  isValidationDirty: {
    type: Boolean,
    default: false
  }
})
const datePicker = ref()

defineExpose({
  datePicker: computed(() => datePicker.value)
})
</script>

<style lang="scss">
.leg-date-picker {
  @apply pr-8 pl-4 leading-6 w-full border-grey-100 border-[0.0625rem] border-solid rounded-[0.5rem] h-[2.625rem] text-grey-950 text-[0.875rem] font-medium #{!important};
  &::placeholder {
    @apply text-grey-200 text-base font-light #{!important};
  }

  &.picker-error {
    @apply border-amaranth-900 #{!important};
  }
}

.picker-error + input {
  @apply border-amaranth-900 #{!important};
}

.picker-error-text {
  @apply text-amaranth-900  -bottom-8 lg:-bottom-4 text-xs;
}
</style>
