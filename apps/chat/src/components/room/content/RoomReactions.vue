<template>
  <!--    TODO: will change when I can get an api data-->
  <div class="ops-room-reactions-wrapper">
    <div
      v-if="messageData?.messageReactions"
      class="ops-room-reactions-wrapper__reactions"
    >
      <div
        v-for="(reaction, index) in messageData?.messageReactions"
        :key="index"
        class="ops-room-reactions-wrapper__reaction"
        @click="voteReaction(reaction)"
      >
        <span>{{ reaction.reaction }}</span>
        <span>{{ reaction.count }}</span>
      </div>
    </div>
    <transition name="ops-slide-left">
      <EmojiPicker
        v-show="isEmojiVisible"
        id="emoji-picker"
        native
        class="absolute z-10 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
        :class="{
          'left-[10rem]': !messageData?.isOwn,
          'right-[10rem]': messageData?.isOwn,
        }"
        @select="onSelectEmoji"
      />
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { IMessage, IMessageReaction } from "@/types/room/room.types";
import { onMounted, PropType } from "vue";
import { useUserStore } from "@/store/useUserStore";
import EmojiPicker from "vue3-emoji-picker";
import "vue3-emoji-picker/css";
import { generateID } from "@/helpers/general";

const userStore = useUserStore();

const emit = defineEmits<{
  (e: "close-emoji"): void;
}>();

const props = defineProps({
  messageData: {
    type: Object as PropType<IMessage>,
    default: () => ({}),
  },
  isEmojiVisible: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
});

const onSelectEmoji = (event: any) => {
  const findAddOn = props.messageData?.messageReactions.find(
    (el: IMessageReaction) => el.reaction === event.i
  );
  !findAddOn &&
    props.messageData?.messageReactions.push({
      reaction: event.i,
      count: 1,
      user_id: userStore.getUser?.user_id,
      reaction_id: generateID(),
    });
  emit("close-emoji");
};

const voteReaction = (reaction: IMessageReaction) => {
  reaction.user_id === userStore.getUser?.user_id
    ? reaction.count--
    : reaction.count++;

  if (!reaction.count) {
    const findDelIndex = props.messageData?.messageReactions.findIndex(
      (el: IMessageReaction) => el.reaction_id === reaction.reaction_id
    );
    props.messageData?.messageReactions.splice(findDelIndex, 1);
  }
};

onMounted(() => {
  const emojiPicker = document.getElementById("emoji-picker") as HTMLElement;
  const roomContent = document.getElementById("room-messages") as HTMLElement;
  roomContent.appendChild(emojiPicker);
});
</script>

<style lang="scss">
.own-message {
  .ops-room-reactions-wrapper {
    @apply flex justify-end #{!important};
  }
}

.ops-room-reactions-wrapper {
  &__reactions {
    @apply inline-flex flex-wrap items-center gap-1 mt-1 relative;
  }

  &__reaction {
    @apply cursor-pointer flex items-center flex-nowrap bg-confetti-800 border border-confetti-500 border-solid rounded-md px-1;

    span:last-child {
      @apply text-grey-900 text-xs ml-1;
    }
  }
}
</style>
