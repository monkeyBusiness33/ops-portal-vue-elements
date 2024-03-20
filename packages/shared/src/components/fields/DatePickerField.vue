<template>
  <div :class="[$style['ops-input-wrapper']]">
    <Label :label-text="labelText">
      <DatePicker v-model="computedValue" v-bind="$attrs" />
    </Label>
  </div>
</template>

<script lang="ts" setup>
import DatePicker from '../DatePicker.vue'
import Label from '../Label.vue'
import { computed } from 'vue'

const props = defineProps({
  labelText: {
    type: String,
    default: ''
  },
  modelValue: {
    type: String,
    default: () => null
  },
  placeholder: {
    type: String,
    default: 'Select an date'
  }
})

const emit = defineEmits<{
  (e: 'update:modelValue', v: unknown): void
}>()

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
.ops-calendar-wrapper {
  @apply relative flex flex-col min-w-0 break-words bg-white items-start justify-start rounded-[0.5rem] mb-2;
}
</style>
