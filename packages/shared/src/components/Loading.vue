<template>
  <div :class="$style['loader']" />
</template>

<style lang="scss" module>
.loader {
  animation: rotate 1s linear infinite;
  @apply w-[24px] h-[24px] mx-auto rounded-full block relative;

  &::before {
    content: '';
    animation: prixClipFix 2s linear infinite;
    @apply absolute rounded-full border-[3px] border-grey-900 border-solid box-border inset-0 #{!important};
  }
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes prixClipFix {
  0% {
    clip-path: polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0);
  }
  25% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0);
  }
  50% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%);
  }
  75% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 100%);
  }
  100% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 0);
  }
}
</style>
