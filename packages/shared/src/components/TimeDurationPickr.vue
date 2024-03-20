<script setup lang="ts">
import { computed } from 'vue'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { Dropdown } from 'floating-vue'
import InputField from './fields/InputField.vue'
import { ErrorObject } from '@vuelidate/core'

dayjs.extend(duration)

interface Props {
  label?: string
  placeholder?: string
  renderDescription?: (value: number | null) => string
  modelValue: number | null
  disabled?: boolean
  isValidationDirty?: boolean
  errors?: ErrorObject[] | string
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  isValidationDirty: false,
  label: '',
  placeholder: 'Enter a value',
  renderDescription: undefined,
  errors: () => []
})
const emit = defineEmits(['update:modelValue'])

const hours = computed<number>(() => {
  return props.modelValue ? Math.trunc(dayjs.duration(props.modelValue).asHours()) : 0
})
const minutes = computed<number>(() => {
  return props.modelValue ? dayjs.duration(props.modelValue).minutes() : 0
})
const description = computed(() => {
  if (props.renderDescription) {
    return props.renderDescription(props.modelValue)
  }

  return props.modelValue ? `${hours.value} hours and ${minutes.value} minutes` : ''
})

const handleHourChange = (event: Event) => {
  const value = Number((event.target as HTMLInputElement).value)

  emit('update:modelValue', (value * 3600 + minutes.value * 60) * 1000)
}
const handleMinuteChange = (event: Event) => {
  const value = Number((event.target as HTMLInputElement).value)

  emit('update:modelValue', (hours.value * 3600 + value * 60) * 1000)
}
</script>

<template>
  <Dropdown placement="bottom-start" :disabled="disabled">
    <InputField
      :label-text="label"
      :model-value="description"
      :disabled="disabled"
      :placeholder="placeholder"
      :errors="errors"
      :is-validation-dirty="isValidationDirty"
      readonly
    />
    <template #popper>
      <div class="flex">
        <input type="number" :value="hours" class="time font-semibold" @input="handleHourChange" />
        <span class="flex items-center text-lg">:</span>
        <input type="number" :value="minutes" class="time" @input="handleMinuteChange" />
      </div>
    </template>
  </Dropdown>
</template>

<style scoped lang="scss">
.time {
  /* text-center text-sm h-10 w-36 outline-0 leading-10 #{!important}; */
  text-align: center;
  font-size: 14px; /* 14px */
  height: 37px;
  width: 145px;
  outline-width: 0px;
  line-height: 37px;
}
.time:hover {
  background-color: #eaeaea;
}
</style>

<style>
.v-popper__arrow-container {
  position: absolute;
  width: 10px;
  height: 10px;
  left: 10px !important;
}
</style>
