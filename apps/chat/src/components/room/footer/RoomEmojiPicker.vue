<template>
  <div v-click-outside="closeEmoji" :class="$style['ops-emoji-picker']">
    <OButton
      prefix-icon="emoji"
      class="ml-2"
      :class="$style['ops-room-footer__action']"
      @click="togglePopup"
    />
    <transition name="ops-slide-left">
      <EmojiPicker
        v-if="isVisible"
        native
        :class="$style['ops-emoji-picker__component']"
        @select="onSelectEmoji"
      />
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import OButton from "@/components/ui/OButton.vue";
import EmojiPicker from "vue3-emoji-picker";
import { IEmoji } from "@/types/room/room.types";
import "vue3-emoji-picker/css";

const emit = defineEmits<{
  (e: "select-emoji", v: IEmoji): void;
}>();

const isVisible = ref(false);

const togglePopup = () => {
  isVisible.value = !isVisible.value;
};
const closeEmoji = () => {
  isVisible.value = false;
};
const onSelectEmoji = (event: any) => {
  const emojiData: IEmoji = { emoji: event.i, unicode: event.u };
  emit("select-emoji", emojiData);
};

defineExpose({
  closeEmoji,
});
</script>

<style lang="scss" module>
.ops-emoji-picker {
  @apply w-fit h-fit relative flex items-center justify-center;
  &__component {
    @apply absolute left-[-15rem] bottom-12;
  }
}

.ops-room-footer__action {
  @apply px-0 transition-all duration-200 rounded-full shrink-0;
  img {
    @apply w-6 h-6 block transition-all duration-200;
    filter: invert(33%) sepia(6%) saturate(3867%) hue-rotate(190deg)
      brightness(96%) contrast(75%) !important;
  }
}
</style>
