<script setup lang="ts">
import { computed, reactive, ref, watch, watchEffect, onMounted } from 'vue'
import { SelectField, CustomCard, Tooltip } from 'shared/components'
import CreateModal from '@/components/modals/CreateEventModal.vue'
import AddSicknessModal from '@/components/modals/AddSicknessModal.vue'
import { IValidEntry } from '@/types/calendar'
import { IExtendedProps } from '@/types/modal'
import { DateSelectArg, EventApi, EventClickArg } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/vue3'
import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import rrulePlugin from '@fullcalendar/rrule'
import momentPlugin from '@fullcalendar/moment'
import momentTimezonePlugin from '@fullcalendar/moment-timezone'
import { useFilterEvents } from '@/composables/useFilterEvents'
import { useResourceGroup } from '@/composables/useResourceGroup'
import { useTeamListStore } from '@/store/useTeamListStore'
import CalendarService from '@/services/calendar/calendar'
import { storeToRefs } from 'pinia'
import moment from 'moment/moment'
import DisplayEventModal from '@/components/modals/DisplayEventModal.vue'

const teamListStore = useTeamListStore()
const { teamsList } = storeToRefs(teamListStore)
const { entryEvents } = useFilterEvents()
const { resourceList } = useResourceGroup()
const now = ref(new Date())
//Modal types
const isOpenSettingModal = ref<boolean>(false)
const isOpenSicknessModal = ref<boolean>(false)
const isOpenDisplayEventModal = ref<boolean>(false)
const isModalType = ref<string>(null)
const isExtendedProps = ref<object>(null)
const isEventDetail = ref<object>(null)
const currentEvents = ref<EventApi[]>()
const selectedTimeZone = ref<string>('UTC')
const validEntryState = reactive<any>({ teams: '' })

const handleDateSelect = (selectInfo: DateSelectArg) => {
  const calendarApi = selectInfo.view.calendar
}
const handleEventClick = (clickInfo: EventClickArg) => {
  console.log(clickInfo.event)
  const events = clickInfo.event.extendedProps
  const eventDetail = {
    title: clickInfo.event.title,
    start: clickInfo.event.start,
    end: clickInfo.event.end
  }
  onOpenDisplayModal(events, eventDetail)
}
const handleEventDelete = (clickInfo: EventClickArg) => {
  if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
    clickInfo.event.remove()
  }
}
const handleEvents = (events: EventApi[]) => {
  console.log('calendar_events', events)
  currentEvents.value = events
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
const onOpenAddModal = () => {
  isOpenSettingModal.value = !isOpenSettingModal.value
  isModalType.value = 'Add'
  document.documentElement.classList.add('v-overlay-scroll-blocked')
  //document.body.classList.add('body-class')
}

const onOpenDisplayModal = (events: any, eventDetail: any) => {
  isOpenDisplayEventModal.value = !isOpenDisplayEventModal.value
  isEventDetail.value = eventDetail
  isExtendedProps.value = events
}

const onOpenSicknessModal = () => {
  isOpenSicknessModal.value = !isOpenSicknessModal.value
}

const handleTimeZoneChange = () => {
  if (selectedTimeZone.value) {
    calendarOptions.timeZone = selectedTimeZone.value
  }
}

//customTeamList Button
const customTeamList = computed<any>(() => {
  const teamListArray = teamsList.value.map((item: any) => ({
    id: item.id,
    label: item.name,
    value: item.name
  }))
  teamListArray.push({ id: -1, label: 'All Teams', value: '' })
  return teamListArray
})
const getFirstDate = () => {
  return moment().startOf('year').format('YYYY-MM-DD')
}
const getLastDate = () => {
  return moment().endOf('year').format('YYYY-MM-DD')
}

const onValidEntry = async () => {
  const validEntryPayload: IValidEntry = {
    start_date: getFirstDate(),
    end_date: getLastDate(),
    teams: [validEntryState.teams]
  }
  try {
    await CalendarService.getFilterCalendar(validEntryPayload)
  } catch (error: any) {
    console.log('error')
  }
}

const timezoneOptions = computed(() => {
  return [
    {
      label: 'UTC',
      value: 'UTC'
    },
    {
      label: 'Thailand (Indochina Time, UTC +7)',
      value: 'Asia/Bangkok'
    },
    {
      label: 'Hungary (CET, UTC +1)',
      value: 'Europe/Budapest'
    },
    {
      label: 'United Kingdom (UTC/BST, UTC)',
      value: 'Europe/London'
    },
    {
      label: 'North America - EST/EDT (UTC -5)',
      value: 'America/New_York'
    },
    {
      label: 'Mexico - CST (UTC -6)',
      value: 'America/Mexico_City'
    }
  ]
})
// resourceHeaderTitle Custom

const calendarOptions = reactive<any>({
  schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
  timeZone: selectedTimeZone,
  locale: 'en-GB',
  plugins: [
    rrulePlugin,
    dayGridPlugin,
    timeGridPlugin,
    interactionPlugin,
    momentPlugin,
    momentTimezonePlugin,
    // interactionPlugin, // needed for dateClick
    resourceTimelinePlugin
  ],
  customButtons: {
    createCalendarButton: {
      text: 'Add Calendar Event',
      click: onOpenAddModal
    },
    AddSicknessAbsenceButton: {
      text: 'Add Sickness Absence',
      click: onOpenSicknessModal
    }
    // SelectField: {
    //   text: 'Timezone selector',
    //   click: function () {
    //     const d = document.querySelector('.fc-SelectField-button')
    //     console.log('zzzz', d)
    //   }
    // }
  },
  headerToolbar: {
    left: 'title',
    right:
      'AddSicknessAbsenceButton createCalendarButton resourceTimelineMonth,resourceTimelineWeek,resourceTimelineDay prev,today,next'
  },
  initialView: 'resourceTimeline',
  initialDate: now.value,
  events: [],
  editable: false,
  resourceAreaHeaderContent: 'Team Availability Calendar',
  resourceGroupField: 'groupId',
  resources: [],
  selectable: true,
  selectMirror: true,
  dayMaxEvents: true,
  weekends: true,
  //allDaySlot: false,
  select: handleDateSelect,
  eventClick: handleEventClick,
  eventsSet: handleEvents,
  // eventContent: function (info) {
  //   return { html: info.event.title }
  // },
  /* you can update a remote database when these fire:
        eventAdd:
        eventChange:
        eventRemove:
        */
  eventRemove: handleEventDelete
})

watchEffect(() => {
  calendarOptions.resources = resourceList
})
watchEffect(() => {
  calendarOptions.events = entryEvents
})
watchEffect(() => {
  onValidEntry()
})
</script>

<template>
  <CustomCard add-default-classes>
    <template #content>
      <div class="demo-app">
        <div class="demo-app-main">
          <div class="flex gap-2 sm:flex-col">
            <SelectField
              v-model="selectedTimeZone"
              label="label"
              :reduce="(item) => item.value"
              class="!w-[215px]"
              :options="timezoneOptions"
              :append-to-body="false"
              placeholder="Timezone Selection"
              @update:model-value="handleTimeZoneChange"
            />
            <SelectField
              v-model="validEntryState.teams"
              placeholder="Team Selection"
              :options="customTeamList"
              label="label"
              :reduce="(item) => item.value"
              class="!w-[215px]"
              :append-to-body="false"
            />
          </div>
          <CreateModal
            v-model:show="isOpenSettingModal"
            :is-extended-props="isExtendedProps"
            :modal-type="isModalType"
          />
          <AddSicknessModal v-model:show="isOpenSicknessModal" />
          <DisplayEventModal
            v-model:show="isOpenDisplayEventModal"
            :is-extended-props="isExtendedProps"
            :is-event-detail="isEventDetail"
          />
          <FullCalendar class="demo-app-calendar" :options="calendarOptions" :events="handleEvents">
            <template #eventContent="arg">
              <div>
                <b>{{ arg.timeText }}</b>
                <div class="event-css">{{ arg.event.title }}</div>
                <div class="event-css">
                  {{ eventDurationTime(arg.event.start, arg.event.end) }}
                </div>
              </div>
            </template>
          </FullCalendar>
        </div>
      </div>
    </template>
  </CustomCard>
</template>

<style lang="scss">
h2 {
  margin: 0;
  font-size: 16px;
}
ul {
  margin: 0;
  padding: 0 0 0 1.5em;
}
li {
  padding: 0;
}
b {
  /* used for event dates/times */
  margin-right: 3px;
}
.demo-app {
  display: flex;
  min-height: 100%;
  max-width: 100%;
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
}
.demo-app-sidebar {
  width: calc(250px);
  line-height: 1.5;
  background: #eaf9ff;
  border-right: 1px solid #d3e2e8;
}
.demo-app-sidebar-section {
  padding: 1em;
}
.demo-app-main {
  flex-grow: 1;
}
.fc {
  /* the calendar root */
  max-width: 100vw;
  max-height: 79vh;
  margin: 0 auto;
}
.fc .fc-resource-timeline .fc-resource-group:not([rowspan]) {
  background: #515d8a;
  position: relative;
  z-index: 1;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  padding-top: 0;
}
.event-css {
  padding: 5px;
}
.add-btn-css {
  color: #fff;
  cursor: pointer;
  background-color: #515d8a;
  border-color: #515d8a;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 1px 1px rgba(17, 24, 39, 0.075);
}
.body-class {
  overflow: hidden;
}
.v-overlay,
.v-dialog {
  overflow-x: hidden;
  overflow-y: auto;
}
.fc-event-draggable {
  height: 40px;
  font-family: Inter, sans-serif !important;
  font-size: 13.6px;
  font-weight: 500;
  overflow: hidden;
  text-wrap: nowrap;
}
.fc-timeline-lane,
.fc-resource {
  display: flex;
  align-items: center;
  text-align: center;
}
.fc .fc-button-primary {
  margin-left: 0;
  color: #fff;
  background-color: #515d8a;
  border-color: #515d8a;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 1px 1px rgba(17, 24, 39, 0.075);
}
.fc .fc-button {
  display: inline-block;
  font-weight: 500;
  line-height: 1.5;
  color: #fff;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  -webkit-user-select: none;
  user-select: none;
  background-color: #515d8a;
  border: 0.0625rem solid transparent;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  border-radius: 0.5rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
@media screen and (max-width: 600px) {
  .fc .fc-button {
    display: inline-block;
    font-weight: 500;
    line-height: 1.5;
    color: #fff;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    -webkit-user-select: none;
    user-select: none;
    background-color: #515d8a;
    border: 0.0625rem solid transparent;
    padding: 5px 6px;
    margin-bottom: 3px;
    font-size: 0.675rem;
    border-radius: 0.5rem;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
}
.fc-datagrid-cell-frame {
  display: flex;
  align-items: center;
}
.fc-timeline-event-harness {
  color: #fff;
  top: 4px !important;
}
.fc-timeline-lane-frame {
  height: 190px;
}
.fc .fc-button-primary:not(:disabled).fc-button-active,
.fc .fc-button-primary:not(:disabled):active,
.fc .fc-button-primary:not(:disabled):hover {
  color: #fff;
  background-color: #414a6e;
  border-color: #3d4668;
}
.fc-resourceTimelineMonth-view
  > table
  > tbody
  > tr
  > td:last-child
  .fc-event.fc-event-start.fc-event-end.fc-timeline-event.fc-h-event {
  height: 190px;
}
.fc-direction-ltr .fc-timeline-event.fc-event-end,
.fc-direction-ltr .fc-timeline-more-link {
  border-color: unset;
}
.v-popper__popper.v-popper--theme-tooltip.v-popper__popper--shown.v-popper__popper--show-to
  > div.v-popper__wrapper
  > div.v-popper__inner {
  background-color: #939393;
  display: flex;
}
.v-popper__popper.v-popper--theme-tooltip.v-popper__popper--shown.v-popper__popper--show-to
  > div.v-popper__wrapper
  > div.v-popper__arrow-container
  > div {
  border-color: #939393;
}
.vs__clear {
  display: none;
}
.fc .fc-datagrid-cell-cushion {
  overflow: hidden;
  padding: 8px;
}
</style>
