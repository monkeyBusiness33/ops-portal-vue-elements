<template>
  <v-dialog v-model="show" max-width="500" scroll-strategy="none">
    <template #default="{ isActive }">
      <form>
        <v-card>
          <v-card-title class="modal-header !flex">
            <v-icon icon="fas fa-calendar-alt !mr-[5px] text-[20px]"></v-icon>
            <span> &nbsp; Schedule details and edit/delete</span>
            <v-spacer></v-spacer>
            <v-icon icon="fas fa-pen !mr-[5px] text-[20px]" @click="onOpenEditModal()"></v-icon>
            <v-icon icon="fas fa-trash !mr-[5px] text-[20px]" @click="onOpenDeleteModal()"></v-icon>
          </v-card-title>
          <v-card-text class="text-[#374151] !p-[1rem]">
            <div>{{ convertPersonName + ' - ' + convertTeamListName }}</div>
            <div>{{ props.isEventDetail.title }}</div>
            <div>{{ eventDurationTime(props.isEventDetail.start, props.isEventDetail.end) }}</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              text="Close"
              class="bg-gray-200 text-grey-900 border border-solid"
              @click="isActive.value = false"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </form>
    </template>
  </v-dialog>
  <CreateModal
    v-model:show="isOpenSettingModal"
    :is-extended-props="isExtendedProps"
    :modal-type="isModalType"
  />
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import CreateModal from '@/components/modals/CreateEventModal.vue'
import { ICalendarAll } from '@/types/calendar'
import { useCalendarStore } from '@/store/useCalendarStore'
import { storeToRefs } from 'pinia'
import { useTeamListStore } from '@/store/useTeamListStore'

interface Props {
  show?: boolean
  isExtendedProps?: object
  isEventDetail?: object
}

const props = withDefaults(defineProps<Props>(), {
  show: false,
  isExtendedProps: null,
  isEventDetail: null
})

const emit = defineEmits<{
  (e: 'update:show', v: string | boolean): void
}>()

const show = computed({
  get() {
    return props.show
  },
  set(value) {
    emit('update:show', value)
  }
})

const calendarStore = useCalendarStore()
const { calendar } = storeToRefs(calendarStore)
const teamListStore = useTeamListStore()
const { teamsList } = storeToRefs(teamListStore)
const isOpenSettingModal = ref<boolean>(false)
const isModalType = ref<string>(null)
const isExtendProps = ref<object>(null)

const onOpenEditModal = () => {
  isOpenSettingModal.value = !isOpenSettingModal.value
  isExtendProps.value = props.isExtendedProps
  isModalType.value = 'Edit'
}

const onOpenDeleteModal = () => {
  isOpenSettingModal.value = !isOpenSettingModal.value
  isExtendProps.value = props.isExtendedProps
  isModalType.value = 'Delete'
}

const eventDurationTime = (arg_start: string, arg_end: string) => {
  const diff = Number(arg_end) - Number(arg_start)
  return (
    String(new Date(arg_start).getUTCHours() < 10 ? '0' : '') +
    String(new Date(arg_start).getUTCHours()) +
    ':' +
    String(new Date(arg_start).getUTCMinutes() < 10 ? '0' : '') +
    new Date(arg_start).getUTCMinutes() +
    ' - ' +
    String(new Date(arg_end).getUTCHours() < 10 ? '0' : '') +
    new Date(arg_end).getUTCHours() +
    ':' +
    String(new Date(arg_end).getUTCMinutes() < 10 ? '0' : '') +
    new Date(arg_end).getUTCMinutes() +
    ' UTC ' +
    new Date(diff).getUTCHours() +
    'h ' +
    (new Date(diff).getUTCMinutes() || '') +
    String(new Date(diff).getUTCMinutes() ? 'min' : '')
  )
}

const convertPersonName = computed(() => {
  return calendar?.value?.find((item: ICalendarAll) => item.id === props.isExtendedProps.person_id)
    ?.name
})
const convertTeamListName = computed(() => {
  return teamsList?.value?.find((item) => item.id === props.isExtendedProps.team_id)?.name
})
</script>

<style lang="scss">
.v-icon--size-default {
  font-size: calc(var(--v-icon-size-multiplier) * 1.25em) !important;
}
</style>
