<template>
  <div
    :class="[
      $style['ops-rooms-search'],
      { [$style['ops-rooms-search__focus']]: isFocused },
    ]"
  >
    <slot name="prefix" />
    <input
      ref="inputRef"
      :class="$style['ops-rooms-search__input']"
      :placeholder="placeholder || 'Type...'"
      :value="modelValue"
      type="text"
      @focus="isFocused = true"
      @blur="onBlur"
      @input="handleInput"
    />
    <slot name="suffix" />
  </div>
</template>

<script lang="ts" setup>
import { computed, PropType, ref } from "vue";

defineProps({
  modelValue: {
    type: String as PropType<string>,
    default: "",
  },
  placeholder: {
    type: String as PropType<string>,
    default: "",
  },
});
const inputRef = ref(null);
const emit = defineEmits<{
  (e: "update:modelValue", v: string): void;
  (e: "blur"): void;
}>();

const isFocused = ref(false);

const handleInput = (event: Event) => {
  const inputElement = event?.target as HTMLInputElement | null;

  if (inputElement) {
    const inputValue = inputElement.value;
    emit("update:modelValue", inputValue);
  }
};

const onBlur = () => {
  isFocused.value = false;
  emit("blur");
};

defineExpose({ inputRef: computed(() => inputRef.value) });
</script>

<style lang="scss" module>
.ops-rooms-search {
  @apply flex items-center focus:outline-none text-grey-700 w-full border-grey-100 border-[0.0625rem] border-solid rounded-[2.5rem] py-2 px-3;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.07);
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &__icon {
    @apply h-4 w-4 opacity-50 mr-2;
  }

  &__input {
    @apply w-full py-0 px-0 bg-transparent border-0 outline-none;
  }

  &__focus {
    @apply bg-white border-grey-300 outline-0;
  }
}
</style>
