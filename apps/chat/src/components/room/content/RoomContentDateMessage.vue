<template>
  <div :class="$style['ops-date-message']">{{ dateFormat }}</div>
</template>

<script lang="ts" setup>
import { computed, PropType } from "vue";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";

dayjs.extend(isToday);

const props = defineProps({
  messageTime: {
    type: [String, Date] as PropType<string | Date>,
    default: "",
  },
});
const dateFormat = computed(() =>
  dayjs(props.messageTime).isToday()
    ? "Today"
    : dayjs(props.messageTime).format("D MMMM YYYY")
);
</script>

<style lang="scss" module>
.ops-date-message {
  @apply mx-auto w-fit bg-grey-800 text-white rounded-md px-4 py-1 text-xs mb-4;
}
</style>
