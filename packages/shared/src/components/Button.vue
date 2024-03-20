<template>
  <button :class="[$style['ops-button']]">
    <slot></slot>
  </button>
</template>

<style lang="scss" module>
.ops-button {
  @apply duration-500 bg-transparent border-[0.0625rem] text-center leading-[1.5rem] inline-block bg-grey-900 border-grey-900 font-medium text-white rounded-[0.5rem] text-center cursor-pointer py-[0.5rem] px-[1rem] text-[0.875rem];
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 1px 1px rgba(17, 24, 39, 0.075);

  &:focus {
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 1px 1px rgba(17, 24, 39, 0.075),
      0 0 0 0.18rem rgba(107, 117, 156, 0.5);
  }
}
</style>
