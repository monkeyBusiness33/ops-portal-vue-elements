<template>
  <div
    v-click-outside="closeHeaderMenu"
    v-bind="$attrs"
    :class="$style['ops-room-header__button']"
    @click.stop="menuOpened = !menuOpened"
  >
    <img
      :src="getImageUrl(`assets/icons/${icon || 'header-chat-menu'}.svg`)"
      alt="menu"
    />
  </div>
  <transition name="ops-slide-left">
    <div v-if="menuOpened" :class="$style['ops-header-menu-options']">
      <div v-if="options" :class="$style['ops-header-menu-options__list']">
        <div
          v-for="action in options"
          :key="action.id"
          :class="$style['ops-header-menu-options__list-item']"
          @click.stop="onSelectOption(action)"
        >
          {{ action.title }}
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { getImageUrl } from "@/helpers/import-image";
import { PropType, ref } from "vue";
import { IMenuActions } from "@/types/room/room.types";

defineProps({
  options: {
    type: Array as PropType<IMenuActions[]>,
    default: () => {
      return [
        { id: "inviteUser", title: "Invite User", emitAction: "invite-user" },
        { id: "removeUser", title: "Remove User", emitAction: "remove-user" },
        { id: "deleteRoom", title: "Delete Room", emitAction: "delete-room" },
      ];
    },
  },
  icon: {
    type: String,
    default: "",
  },
});
const emit = defineEmits<{
  (e: "blur"): void;
  (e: "reply", v: IMenuActions): void;
  (e: "edit-message", v: IMenuActions): void;
  (e: "delete-message", v: IMenuActions): void;
  (e: "invite-user", v: IMenuActions): void;
  (e: "remove-user", v: IMenuActions): void;
  (e: "delete-user", v: IMenuActions): void;
  (e: "delete-room", v: IMenuActions): void;
}>();

const menuOpened = ref(false);

const onSelectOption = (action: IMenuActions) => {
  emit(action.emitAction as any, action);
  closeHeaderMenu();
};
const closeHeaderMenu = () => {
  menuOpened.value = false;
  emit("blur");
};
</script>

<style lang="scss" module>
.ops-header-menu-options {
  @apply inline-block text-[0.875rem] top-[2.5rem] text-grey-900 right-[0.5rem] min-w-[8.375rem] rounded absolute overflow-y-auto overflow-x-hidden z-[9999];
  contain: content;
  box-shadow: 0 2px 2px -4px rgba(0, 0, 0, 0.1),
    0 2px 2px 1px rgba(0, 0, 0, 0.12), 0 1px 8px 1px rgba(0, 0, 0, 0.12);

  &__list {
    @apply block rounded cursor-pointer px-0 py-0 bg-white;

    :hover {
      @apply bg-confetti-800;
      transition: background-color 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    }

    :not(:hover) {
      transition: background-color 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    }
  }

  &__list-item {
    @apply flex items-center relative leading-8 whitespace-nowrap py-[0.2rem] px-4;
  }
}
</style>
