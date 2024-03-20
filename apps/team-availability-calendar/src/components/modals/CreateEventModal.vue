<script lang="ts" setup>
import { computed, reactive, watchEffect, watch, ref } from 'vue'
import { SelectField, InputField, FlatPickr, Label, TextArea } from 'shared/components'
import { IEntryType, IPersonList, ICalendarAll } from '@/types/calendar'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { getDatesInRange } from '@/composables/useDateArray'
import { formCreateDefault } from '@/constants/calendar.constant'
import { useTeamListStore } from '@/store/useTeamListStore'
import { useEntryTypesStore } from '@/store/useEntryTypesStore'
import { usePersonListStore } from '@/store/usePersonListStore'
import { useCalendarStore } from '@/store/useCalendarStore'
import { storeToRefs } from 'pinia'
import CalendarService from '@/services/calendar/calendar'

interface Props {
  show?: boolean
  modalType?: string
  isExtendedProps?: object
}

const props = withDefaults(defineProps<Props>(), {
  show: false,
  modalType: null,
  isExtendedProps: null
})
//Load store
const teamListStore = useTeamListStore()
const entryTypeStore = useEntryTypesStore()
const personListStore = usePersonListStore()
const calendarStore = useCalendarStore()
const { teamsList, isTeamListLoading } = storeToRefs(teamListStore)
const { entryTypes, isEntryTypesLoading } = storeToRefs(entryTypeStore)
const { personList, isPersonListLoading } = storeToRefs(personListStore)
const { calendar } = storeToRefs(calendarStore)

const emit = defineEmits<{
  (e: 'update:show', v: string | boolean): void
}>()

const show = computed({
  get() {
    return props.show
  },
  set() {
    // emit('update:show', value)
  }
})

const closeModal = () => {
  emit('update:show', !props.show)
  document.documentElement.classList.remove('v-overlay-scroll-blocked')
  if (props.modalType === 'Add') {
    resetState()
    v$?.value?.$reset()
  }
  //document.body.classList.remove('body-class')
}
const resetState = () => {
  Object.keys(state).forEach((key) => {
    state[key] = null
  })
}
const convertEntryTypeIsSpecific = (entry_type: number) => {
  if (!entry_type) return ''
  return entryTypes?.value?.find((item: IEntryType) => item.id === entry_type)?.is_specific_only
}

const convertEntryTypeName = (entry_type: number) => {
  if (!entry_type) return ''
  return entryTypes?.value?.find((item: IEntryType) => item.id === entry_type)?.name
}

const convertPersonName = (person: number) => {
  if (!person) return
  return calendar?.value?.find((item: ICalendarAll) => item.id === person)?.name
}

const convertPersonStaffId = (person: number) => {
  if (!person) return
  return personList?.value?.find((item: IPersonList) => item.id === person)?.staff_id
}

const selectPersonId = (person: number, team: number) => {
  if (!person) return
  return personList?.value?.find(
    (item: IPersonList) =>
      item.name === convertPersonName(person) + ' - ' + convertTeamListName(team)
  )?.id
}

const changeTitle = computed(() => {
  if (state.entry_type === 3 || state.entry_type === 4) {
    return props.modalType + ' Specific'
  } else if (!state.entry_type) {
    return props.modalType
  } else {
    return props.modalType + ' Blanket'
  }
})

const convertTeamListName = (team_id: number) => {
  if (!team_id) return
  return teamsList?.value?.find((item) => item.id === team_id)?.name
}

const convertComment = (entry_type: number) => {
  if (!entry_type) return ''
  return entryTypes?.value?.find((item: IEntryType) => item.id === entry_type)?.requires_comment
}

const convertStringToArray = (value: string) => {
  if (!value) return ''
  return value.split(',').map(Number)
}

const convertArrayToString = (value: any) => {
  if (!value) return ''
  return value.join(',')
}

//********* when the entry_types = 'On Leave', startDate and endDate value is filled **********//
const selectedStartDate = computed(() => {
  return convertEntryTypeName(state.entry_type) === 'On Leave' ? '00:00' : ''
})
const selectedEndDate = computed(() => {
  return convertEntryTypeName(state.entry_type) === 'On Leave' ? '23:00' : ''
})
//*************************************************//

const state = reactive<any>(formCreateDefault(0))

const onCloseCalendar = (date: Array<Date>, value: string, instance: Record<string, any>) => {
  value && instance.setDate(value, true)
}

const rules = computed(() => ({
  start_hour: { required },
  end_hour: { required },
  start_date: { required },
  end_date: convertEntryTypeName(state.entry_type) !== 'Sick Absence' ? { required } : {},
  entry_type: props.modalType === 'Add' ? { required } : {},
  person: { required },
  team: { required },
  comment:
    convertEntryTypeName(state.entry_type) === 'Sick Absence' ? { required, maxLength: 500 } : {}
}))

const v$ = useVuelidate(rules, state)

const onSubmit = async () => {
  const isValid = await v$?.value?.$validate()
  const SpecialFormData: any = {
    id: 0,
    start_hour: state.start_hour,
    end_hour: state.end_hour,
    start_date: state.start_date,
    end_date: state.end_date,
    comment: state.comment,
    applied_on_dates: getDatesInRange(state.start_date, state.end_date),
    entry_type: state.entry_type,
    person: convertPersonStaffId(state.person),
    team: state.team
  }
  const BlanketFormData: any = {
    id: 0,
    start_hour: state.start_hour,
    end_hour: state.end_hour,
    start_date: state.start_date,
    end_date: state.end_date,
    comment: '',
    applied_on_days: convertStringToArray(state.applied_on_days),
    applied_on_weeks: convertStringToArray(state.applied_on_weeks),
    entry_type: state.entry_type,
    person: convertPersonStaffId(state.person),
    team: state.team
  }
  const EditSpecialFormData: any = {
    id: state.id,
    start_hour: state.start_hour,
    end_hour: state.end_hour,
    start_date: state.start_date,
    end_date: state.end_date,
    comment: state.comment,
    applied_on_dates: getDatesInRange(state.start_date, state.end_date),
    entry_type: state.entry_type,
    person: convertPersonStaffId(state.person),
    team: state.team,
    flagged_for_edit: true,
    flagged_For_delete: false
  }
  const EditBlanketFormData: any = {
    id: state.id,
    start_hour: state.start_hour,
    end_hour: state.end_hour,
    start_date: state.start_date,
    end_date: state.end_date,
    comment: '',
    applied_on_days: convertStringToArray(state.applied_on_days),
    applied_on_weeks: convertStringToArray(state.applied_on_weeks),
    entry_type: state.entry_type,
    person: convertPersonStaffId(state.person),
    team: state.team,
    flagged_for_edit: true,
    flagged_For_delete: false
  }
  const DeleteSpecialFormData: any = {
    id: state.id,
    start_hour: state.start_hour,
    end_hour: state.end_hour,
    start_date: state.start_date,
    end_date: state.end_date,
    comment: state.comment,
    applied_on_dates: getDatesInRange(state.start_date, state.end_date),
    entry_type: state.entry_type,
    person: convertPersonStaffId(state.person),
    team: state.team,
    flagged_for_edit: false,
    flagged_For_delete: true
  }
  const DeleteBlanketFormData: any = {
    id: state.id,
    start_hour: state.start_hour,
    end_hour: state.end_hour,
    start_date: state.start_date,
    end_date: state.end_date,
    comment: '',
    applied_on_days: convertStringToArray(state.applied_on_days),
    applied_on_weeks: convertStringToArray(state.applied_on_weeks),
    entry_type: state.entry_type,
    person: convertPersonStaffId(state.person),
    team: state.team,
    flagged_for_edit: false,
    flagged_For_delete: true
  }
  if (!isValid) {
    console.log('entry_types', state.entry_type)
    if (state.entry_type === 3 || state.entry_type === 4) {
      console.log('submit1', SpecialFormData)
    } else {
      console.log('submit2', BlanketFormData)
    }
    return
  }
  if (props.modalType === 'Add') {
    if (state.entry_type === 3 || state.entry_type === 4) {
      try {
        await CalendarService.createSpecialEvent(SpecialFormData)
      } catch (error: any) {
        /*empty*/
      }
    } else {
      try {
        await CalendarService.createBlanketEvent(BlanketFormData)
      } catch (error: any) {
        /*empty*/
      }
    }
  } else if (props.modalType === 'Edit') {
    if (state.entry_type === 3 || state.entry_type === 4) {
      try {
        await CalendarService.editSpecialEvent(EditSpecialFormData)
      } catch (error: any) {
        /*empty*/
      }
    } else {
      try {
        await CalendarService.editBlanketEvent(EditBlanketFormData)
      } catch (error: any) {
        /*empty*/
      }
    }
  } else if (props.modalType === 'Delete') {
    if (state.entry_type === 3 || state.entry_type === 4) {
      try {
        await CalendarService.deleteSpecialEvent(DeleteSpecialFormData)
      } catch (error: any) {
        /*empty*/
      }
    } else {
      try {
        await CalendarService.deleteBlanketEvent(DeleteBlanketFormData)
      } catch (error: any) {
        /*empty*/
      }
    }
  } else {
    /* empty */
  }
}

// *************** Functions for edit ******************** //

// ******* To get data according to selected field value(team, person, entryType field) ******* //
const selectedEventFieldsValue = (extendsProps: any) => {
  calendar?.value?.map((item) => {
    if (item.id === extendsProps.person_id) {
      item.blanket_entries?.map((list) => {
        if (
          list.id === extendsProps.id &&
          list.team === extendsProps.team_id &&
          list.entry_type === extendsProps.entry_id &&
          list.person === extendsProps.person_id
        ) {
          state.id = list.id
          state.team = list.team
          state.person = selectPersonId(list.person, list.team)
          state.entry_type = list.entry_type
          state.start_hour = list.start_hour
          state.end_hour = list.end_hour
          state.start_date = list.start_date
          state.end_date = list.end_date
          state.applied_on_days = convertArrayToString(list.applied_on_days)
          state.applied_on_weeks = convertArrayToString(list.applied_on_weeks)
          return
        }
      })
      item.specific_entries?.map((list) => {
        if (
          list.id === extendsProps.id &&
          list.team === extendsProps.team_id &&
          list.entry_type === extendsProps.entry_id &&
          list.person === extendsProps.person_id
        ) {
          state.id = list.id
          state.team = list.team
          state.person = selectPersonId(list.person, list.team)
          state.entry_type = list.entry_type
          state.start_hour = list.start_hour
          state.end_hour = list.end_hour
          state.start_date = list.start_date
          state.end_date = list.end_date
          state.comment = list.comment
          return
        }
      })
    }
  })
}

//to get person list according to selected teamList
const selectedTeamPersonList = ref<any>([])
watch(
  () => state.team,
  () => {
    selectedTeamPersonList.value = []
    personList.value.map((person) => {
      if (person.name.includes(convertTeamListName(state.team))) {
        selectedTeamPersonList.value.push(person)
        return selectedTeamPersonList
      }
    })
  }
)

watchEffect(() => {
  if (props.modalType === 'Edit') {
    if (props.isExtendedProps) {
      selectedEventFieldsValue(props.isExtendedProps)
    }
  }
  if (props.modalType === 'Add') {
    v$?.value?.$reset()
  }
  if (props.modalType === 'Delete') {
    if (props.isExtendedProps) {
      selectedEventFieldsValue(props.isExtendedProps)
    }
  }
})
</script>
<template>
  <v-dialog v-model="show" max-width="700" height="auto">
    <template #default="{}">
      <form>
        <v-card>
          <v-card-title class="modal-header h-[70px] !flex !items-center">
            <v-icon
              v-if="props.modalType === 'Add'"
              icon="fas fa-calendar-plus !mr-[5px] text-[15px]"
              class="text-xl"
            ></v-icon>
            <v-icon
              v-else-if="props.modalType === 'Edit'"
              icon="fas fa-calendar-edit !mr-[5px] text-[15px]"
              class="text-xl"
            ></v-icon>
            <v-icon
              v-else
              icon="fas fa-calendar-minus !mr-[5px] text-[15px]"
              class="text-xl"
            ></v-icon>
            <span> &nbsp;{{ changeTitle }} Calendar Event </span>
            <v-spacer></v-spacer>
            <button
              type="button"
              class="btn-close text-[16px]"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="closeModal"
            ></button>
          </v-card-title>
          <v-card-text class="text-[#374151] !p-[1.5rem] overflow-y-auto">
            <div class="flex items-start gap-x-4 w-full">
              <div class="w-6/12">
                <SelectField
                  v-model="state.team"
                  label="name"
                  label-text="Team Selection"
                  placeholder="Please select Team Selection"
                  :selectable="(item: any) => !item.disabled"
                  :clearable="false"
                  :append-to-body="false"
                  :reduce="(item) => item.id"
                  :options="teamsList"
                  :loading="isTeamListLoading"
                  required
                  :errors="v$.team.$errors"
                  :is-validation-dirty="v$.team.$dirty"
                />
              </div>
              <div class="w-6/12">
                <SelectField
                  v-model="state.person"
                  label="name"
                  label-text="AML Person"
                  placeholder="Please select AML Person"
                  :selectable="(item: any) => !item.disabled"
                  :clearable="false"
                  :append-to-body="false"
                  :reduce="(item) => item.id"
                  :options="selectedTeamPersonList"
                  :loading="isPersonListLoading"
                  required
                  :errors="v$.person.$errors"
                  :is-validation-dirty="v$.person.$dirty"
                />
              </div>
            </div>
            <SelectField
              v-model="state.entry_type"
              label="name"
              label-text="Entry types"
              placeholder="Please select Entry types"
              :selectable="(item: any) => !item.disabled"
              :clearable="false"
              :append-to-body="false"
              :reduce="(item) => item.id"
              :options="entryTypes"
              :loading="isEntryTypesLoading"
              required
              :errors="v$.entry_type.$errors"
              :is-validation-dirty="v$.entry_type.$dirty"
            />
            <div class="flex items-start gap-x-4 w-full">
              <div class="w-6/12">
                <Label required label-text="Start Hour" />
                <FlatPickr
                  v-model="state.start_hour"
                  placeholder="Please enter Start Hour"
                  :config="{
                    altFormat: 'H:i',
                    altInput: true,
                    allowInput: true,
                    noCalendar: true,
                    enableTime: true,
                    time_24hr: true,
                    minuteIncrement: 1
                  }"
                  class="mb-[0.5rem]"
                  :value="selectedStartDate"
                  required
                  :disabled="!state.entry_type"
                  :errors="v$.start_hour.$errors"
                  :is-validation-dirty="v$.start_hour.$dirty"
                />
              </div>
              <div class="w-6/12">
                <Label required label-text="End Hour" />
                <FlatPickr
                  v-model="state.end_hour"
                  placeholder="Please enter End Hour"
                  :config="{
                    altFormat: 'H:i',
                    altInput: true,
                    allowInput: true,
                    noCalendar: true,
                    enableTime: true,
                    time_24hr: true,
                    minuteIncrement: 1
                  }"
                  :value="selectedEndDate"
                  class="mb-[0.5rem]"
                  required
                  :disabled="!state.entry_type"
                  :errors="v$.end_hour.$errors"
                  :is-validation-dirty="v$.end_hour.$dirty"
                />
              </div>
            </div>
            <div class="flex items-start gap-x-4 w-full">
              <div class="w-6/12">
                <Label required label-text="Start Date" />
                <FlatPickr
                  v-model="state.start_date"
                  placeholder="Please enter Start Date"
                  :config="{
                    allowInput: true,
                    altInput: true,
                    altFormat: 'Y-m-d',
                    dateFormat: 'Y-m-d',
                    minuteIncrement: 1
                  }"
                  class="mb-[0.5rem]"
                  required
                  :disabled="!state.entry_type"
                  :errors="v$.start_date.$errors"
                  :is-validation-dirty="v$.start_date.$dirty"
                />
              </div>
              <div class="w-6/12">
                <Label required label-text="End Date" />
                <FlatPickr
                  v-model="state.end_date"
                  placeholder="Please enter End Date"
                  :config="{
                    allowInput: true,
                    altInput: true,
                    altFormat: 'Y-m-d',
                    dateFormat: 'Y-m-d',
                    minuteIncrement: 1
                  }"
                  class="mb-[0.5rem]"
                  required
                  :disabled="!state.entry_type"
                  :errors="v$.end_date.$errors"
                  :is-validation-dirty="v$.end_date.$dirty"
                />
              </div>
            </div>
            <TextArea
              v-if="convertComment(state.entry_type)"
              v-model="state.comment"
              :disabled="!state.entry_type"
              label-text="Reason for Sickness Absence"
              required
              placeholder="Please enter Reason for sickness absence"
              :errors="v$.comment.$errors"
              :is-validation-dirty="v$.comment.$dirty"
            />
            <div class="flex items-start gap-x-4 w-full">
              <div class="w-6/12">
                <InputField
                  v-if="!convertEntryTypeIsSpecific(state.entry_type)"
                  v-model="state.applied_on_days"
                  :disabled="!state.entry_type"
                  label-text="Apply days"
                  placeholder="Please enter Apply days"
                />
              </div>
              <div class="w-6/12">
                <InputField
                  v-if="!convertEntryTypeIsSpecific(state.entry_type)"
                  v-model="state.applied_on_weeks"
                  :disabled="!state.entry_type"
                  label-text="Apply weeks"
                  placeholder="Please enter Apply weeks"
                />
              </div>
            </div>
          </v-card-text>
          <v-card-actions class="h-[70px]">
            <v-spacer></v-spacer>
            <v-btn
              text="Close"
              class="bg-gray-200 text-grey-900 border border-solid"
              @click="closeModal"
            ></v-btn>
            <v-btn
              text="Save"
              class="!bg-[#10b981] text-black-400 border border-solid"
              @click="onSubmit"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </form>
    </template>
  </v-dialog>
</template>

<style lang="scss">
.v-card-title {
  display: flex;
  padding: 1rem 1rem;
  justify-content: space-between;
  align-items: center;
  font-size: 1.25rem;
  line-height: 1.5;
  border-bottom: 0.0625rem solid #e5e7eb;
}
.v-card-actions {
  padding: 0.75rem;
  border-top: 0.0625rem solid #e5e7eb;

  .v-btn {
    margin: 0.25rem !important;
    padding: 0.5rem 1rem;
    letter-spacing: normal;
  }
}
.flex-reverse {
  flex-direction: row-reverse;
  justify-content: flex-end;
  align-items: flex-start;
  margin-top: 2px;
  column-gap: 8px;
}
.vs__dropdown-option {
  margin: 0;
}
html.v-overlay-scroll-blocked {
  position: fixed;
  top: var(--v-body-scroll-y);
  left: var(--v-body-scroll-x);
  width: 100%;
  height: 100%;
}
.v-icon--size-default {
  font-size: calc(var(--v-icon-size-multiplier) * 1.25em) !important;
}
</style>
