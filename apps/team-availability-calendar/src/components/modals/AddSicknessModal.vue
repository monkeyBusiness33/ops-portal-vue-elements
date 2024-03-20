<template>
  <v-dialog v-model="show" max-width="700" height="auto" width="auto">
    <template #default="{}">
      <v-card>
        <v-card-title class="modal-header h-[70px] !flex !items-center">
          <v-icon icon="fas fa-cog !mr-[5px] text-[20px]"></v-icon>
          <span> &nbsp; Add Sickness Absence </span>
          <v-spacer></v-spacer>
          <button
            type="button"
            class="btn-close text-[16px]"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="closeModal"
          ></button>
        </v-card-title>
        <v-card-text>
          <div class="flex items-start gap-x-4 w-full">
            <div class="w-6/12">
              <Label required label-text="Start Date" />
              <FlatPickr
                v-model="state.start_time"
                placeholder="Please enter Start time"
                :config="{
                  allowInput: true,
                  altInput: true,
                  altFormat: 'Y-m-d H:i',
                  dateFormat: 'Y-m-d H:i',
                  enableTime: true,
                  time_24hr: true,
                  minuteIncrement: 1
                }"
                class="mb-[0.5rem]"
                required
                :errors="v$.start_time.$errors"
                :is-validation-dirty="v$.start_time.$dirty"
              />
            </div>
            <div class="w-6/12">
              <Label label-text="End Date" :required="false" />
              <FlatPickr
                v-model="state.end_time"
                placeholder="Please enter End time"
                :config="{
                  allowInput: true,
                  altInput: true,
                  altFormat: 'Y-m-d H:i',
                  dateFormat: 'Y-m-d H:i',
                  enableTime: true,
                  time_24hr: true,
                  minuteIncrement: 1
                }"
                class="mb-[0.5rem]"
              />
            </div>
          </div>
          <TextArea
            v-model="state.comment"
            label-text="Reason for Sickness Absence"
            required
            placeholder="Please enter Reason for sickness absence"
            :errors="v$.comment.$errors"
            :is-validation-dirty="v$.comment.$dirty"
          />
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
            class="bg-green-700 text-black-400 border border-solid"
            @click="onSubmit"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script lang="ts" setup>
import { computed, reactive, watchEffect } from 'vue'
import { FlatPickr, Label, TextArea } from 'shared/components'
import { useEntryTypesStore } from '@/store/useEntryTypesStore'
import { storeToRefs } from 'pinia'
import { required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import CalendarService from '@/services/calendar/calendar'
import { getDatesInRange } from '@/composables/useDateArray'
import moment from 'moment'
import { IEntryType } from '@/types/calendar'

interface Props {
  show?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  show: false
})

const emit = defineEmits<{
  (e: 'update:show', v: string | boolean): void
}>()

const entryTypeStore = useEntryTypesStore()
const { entryTypes } = storeToRefs(entryTypeStore)
const state = reactive<any>({
  start_time: null,
  end_time: null,
  comment: null
})
const rules = computed(() => ({
  start_time: { required },
  comment: { required }
}))

const show = computed({
  get() {
    return props.show
  },
  set() {
    //emit('update:show', value)
  }
})

const closeModal = () => {
  emit('update:show', !props.show)
  state.start_time = null
  state.end_time = null
  state.comment = null
  v$?.value?.$reset()
}

const entryTypeId = () => {
  return entryTypes?.value?.find((item: IEntryType) => item.name === 'Sick Absence')?.id
}

const v$ = useVuelidate(rules, state)

const onSubmit = async () => {
  const isValid = await v$?.value?.$validate()
  const SpecialFormData: any = {
    id: 0,
    start_hour: state.start_time ? moment(state.start_time).format('HH-mm-ss') : null,
    end_hour: state.end_time ? moment(state.end_time).format('HH-mm-ss') : null,
    start_date: state.start_time ? moment(state.start_time).format('YYYY-MM-DD') : null,
    end_date: state.end_time ? moment(state.end_time).format('YYYY-MM-DD') : null,
    comment: state.comment,
    applied_on_dates: getDatesInRange(state.start_time, state.end_time),
    entry_type: entryTypeId(),
    person: null,
    team: null
  }
  if (!isValid) {
    console.log('submit')
    return
  }
  try {
    console.log('submit', SpecialFormData)
    //await CalendarService.createSpecialEvent(SpecialFormData)
  } catch (error: any) {
    /*empty*/
  }
}
</script>

<style></style>
