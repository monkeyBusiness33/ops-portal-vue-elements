<template>
  <FVMenu
    :open-delay="100"
    :close-delay="200"
    :distance="6"
    popper-class="ops-room-header-status"
    :disabled="!totalUsersInRoom.length"
  >
    <slot name="trigger" />

    <template #popper>
      <div
        v-if="totalUsersInRoom.length"
        :class="$style['ops-room-header-status__container']"
      >
        <div
          v-for="(user, index) in totalUsersInRoom"
          :key="index"
          :class="$style['ops-room-header-status__item']"
        >
          <div
            :class="[
              $style['ops-room-header-status__network'],
              {
                [$style['ops-room-header-status__network--online']]:
                  checkIfOnline(user),
              },
            ]"
          />
          <p :class="$style['ops-room-header-status__info']">
            {{ user.details.first_name }} {{ user.details.last_name }}
          </p>
        </div>
      </div>
    </template>
  </FVMenu>
</template>

<script lang="ts" setup>
import { onMounted, PropType, ref } from "vue";
import { IPeople } from "@/types/rooms.types";
import { useUserStore } from "@/store/useUserStore";

const userStore = useUserStore();
const props = defineProps({
  totalUsers: {
    type: Array as PropType<IPeople[]>,
    default: () => [],
  },
  onlineUsers: {
    type: Array as PropType<number[]>,
    default: () => [],
  },
});
const totalUsersInRoom = ref<IPeople[]>([]);

const checkIfOnline = (user: IPeople) => {
  return props.onlineUsers?.includes(user.id);
};

onMounted(() => {
  const currentUserID = userStore?.getUser?.person?.id;
  const findIndexInRoom = props.totalUsers?.findIndex(
    (el) => el.id === currentUserID
  );
  totalUsersInRoom.value = [...props.totalUsers];
  findIndexInRoom >= 0 && totalUsersInRoom.value.splice(findIndexInRoom, 1);
});
</script>

<style lang="scss" module>
.ops-room-header-status {
  &__item {
    @apply text-sm text-grey-800 flex items-center;
    &--firstname {
      @apply mr-1 inline-block;
    }
  }

  &__info {
    @apply max-w-[10rem] truncate my-1;
  }

  &__network {
    @apply w-1.5 h-1.5 rounded-full bg-grey-100 mr-1;

    &--online {
      @apply bg-green-700;
    }
  }
}
</style>
<style lang="scss">
.v-popper--theme-menu {
  width: fit-content;
}

.ops-room-header-status {
  .v-popper__inner {
    @apply rounded-md px-3 py-2 bg-white border-[1px] border-grey-900 border-solid shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)];
  }

  .v-popper__arrow-container {
    .v-popper__arrow-outer {
      @apply border-grey-900 border-solid;
    }
  }
}
</style>
