import { defineStore } from 'pinia'
import { ref } from 'vue'
import { ICalendarAll, IValidEntry } from '@/types/calendar'
import CalendarService from '@/services/calendar/calendar'
import { useFetch } from '@/composables/useFetch'
import moment from 'moment'

export const useCalendarStore = defineStore('Calendar', () => {
  // state
  const jsonData: ICalendarAll[] = [
    {
      id: 46,
      name: 'Kristof Nemet',
      teams: [
        {
          team: 'Development Team',
          role: 'Developer',
          is_primary_assignment: true,
          manages_own_schedule: true,
          is_team_admin: false
        },
        {
          team: 'Fuel Team',
          role: 'Fuel Team Member',
          is_primary_assignment: true,
          manages_own_schedule: false,
          is_team_admin: false
        }
      ],
      country: 'Hungary',
      region: 'Szeged',
      is_general_admin: false,
      is_hun_admin: false,
      specific_entries: [
        {
          id: 1,
          action_by: 'Kristof Nemet',
          start_hour: '08:00:00',
          end_hour: '16:30:00',
          start_date: '2023-12-27',
          end_date: '2023-12-29',
          comment: '',
          created_on: '2023-11-30T23:00:00Z',
          updated_on: '2023-11-30T23:00:00Z',
          is_approved: true,
          is_disapproved: false,
          flagged_for_delete: false,
          flagged_for_edit: false,
          action_on: null,
          applied_on_dates: [27, 28, 29],
          entry_type: 3,
          updated_by: null,
          original_entry: null,
          person: 46,
          created_by: 46,
          team: 1,
          replaces_other_entry: null,
          replaces_own_entry: null
        },
        {
          id: 3,
          action_by: 'HUN Admin',
          start_hour: '08:00:00',
          end_hour: '16:30:00',
          start_date: '2023-01-04',
          end_date: '2023-12-07',
          comment: '',
          created_on: '2023-12-11T12:19:52.673597Z',
          updated_on: '2023-12-11T13:36:53.944190Z',
          is_approved: true,
          is_disapproved: false,
          flagged_for_delete: false,
          flagged_for_edit: false,
          action_on: '2023-12-11T15:14:49.114040Z',
          applied_on_dates: [4, 5, 6, 7, 8],
          entry_type: 4,
          updated_by: 1000000014,
          original_entry: null,
          person: 46,
          created_by: 1000000014,
          team: 2,
          replaces_other_entry: null,
          replaces_own_entry: null
        }
      ],
      blanket_entries: [
        {
          id: 1,
          action_by: 'HUN Admin',
          start_hour: '08:00:00',
          end_hour: '16:30:00',
          start_date: '2023-01-01',
          end_date: '2023-12-31',
          comment: '',
          created_on: '2023-12-11T15:12:39.832588Z',
          updated_on: null,
          is_approved: true,
          is_disapproved: false,
          flagged_for_delete: false,
          flagged_for_edit: false,
          action_on: '2023-12-11T15:12:39.832588Z',
          applied_on_days: [1, 2, 3, 4, 5, 6],
          applied_on_weeks: [0],
          entry_type: 1,
          updated_by: null,
          original_entry: null,
          person: 46,
          created_by: 1000000014,
          team: 1
        },
        {
          id: 3,
          action_by: 'HUN Admin',
          start_hour: '12:00:00',
          end_hour: '16:30:00',
          start_date: '2023-01-01',
          end_date: '2023-12-31',
          comment: '',
          created_on: '2023-12-11T12:19:18.182419Z',
          updated_on: null,
          is_approved: false,
          is_disapproved: false,
          flagged_for_delete: false,
          flagged_for_edit: false,
          action_on: '2023-12-11T12:19:18.182419Z',
          applied_on_days: [3, 4, 5],
          applied_on_weeks: [3, 9, 15, 21, 27, 33, 39, 45, 51],
          entry_type: 1,
          updated_by: null,
          original_entry: null,
          person: 46,
          created_by: 1000000014,
          team: 2
        }
      ]
    },
    {
      id: 1000000002,
      name: 'Zsofia Szakaly',
      teams: [
        {
          team: 'Fuel Team',
          role: 'Fuel Team Member',
          is_primary_assignment: true,
          manages_own_schedule: false,
          is_team_admin: false
        }
      ],
      country: null,
      region: null,
      is_general_admin: false,
      is_hun_admin: false,
      specific_entries: [],
      blanket_entries: [
        {
          id: 6,
          action_by: 'HUN Admin',
          start_hour: '08:00:00',
          end_hour: '16:30:00',
          start_date: '2023-01-01',
          end_date: '2023-12-31',
          comment: '',
          created_on: '2023-12-11T12:19:18.231668Z',
          updated_on: null,
          is_approved: true,
          is_disapproved: false,
          flagged_for_delete: false,
          flagged_for_edit: false,
          action_on: '2023-12-11T12:19:18.231668Z',
          applied_on_days: [3, 4, 5],
          applied_on_weeks: [6, 12, 18, 24, 30, 36, 42, 48],
          entry_type: 1,
          updated_by: null,
          original_entry: null,
          person: 1000000002,
          created_by: 1000000014,
          team: 2
        },
        {
          id: 7,
          action_by: 'HUN Admin',
          start_hour: '08:00:00',
          end_hour: '16:30:00',
          start_date: '2023-01-01',
          end_date: '2023-12-31',
          comment: '',
          created_on: '2023-12-11T12:19:18.231668Z',
          updated_on: null,
          is_approved: true,
          is_disapproved: false,
          flagged_for_delete: false,
          flagged_for_edit: false,
          action_on: '2023-12-11T12:19:18.231668Z',
          applied_on_days: [3, 4, 5],
          applied_on_weeks: [51, 52],
          entry_type: 1,
          updated_by: null,
          original_entry: null,
          person: 1000000002,
          created_by: 1000000014,
          team: 2
        }
      ]
    },
    {
      id: 1000000003,
      name: 'Zsofia Matyas',
      teams: [
        {
          team: 'Fuel Team',
          role: 'Fuel Team Member',
          is_primary_assignment: true,
          manages_own_schedule: false,
          is_team_admin: false
        }
      ],
      country: null,
      region: null,
      is_general_admin: false,
      is_hun_admin: false,
      specific_entries: [],
      blanket_entries: [
        {
          id: 4,
          action_by: 'HUN Admin',
          start_hour: '08:00:00',
          end_hour: '16:30:00',
          start_date: '2023-01-01',
          end_date: '2023-12-31',
          comment: '',
          created_on: '2023-12-11T12:19:18.198690Z',
          updated_on: null,
          is_approved: true,
          is_disapproved: false,
          flagged_for_delete: false,
          flagged_for_edit: false,
          action_on: '2023-12-11T12:19:18.198690Z',
          applied_on_days: [3, 4, 5],
          applied_on_weeks: [4, 10, 16, 22, 28, 34, 40, 46, 52],
          entry_type: 1,
          updated_by: null,
          original_entry: null,
          person: 1000000003,
          created_by: 1000000014,
          team: 2
        }
      ]
    },
    {
      id: 1000000005,
      name: 'Janos Csepes',
      teams: [
        {
          team: 'Fuel Team',
          role: 'Fuel Team Member',
          is_primary_assignment: true,
          manages_own_schedule: false,
          is_team_admin: false
        }
      ],
      country: null,
      region: null,
      is_general_admin: false,
      is_hun_admin: false,
      specific_entries: [],
      blanket_entries: [
        {
          id: 5,
          action_by: 'HUN Admin',
          start_hour: '08:00:00',
          end_hour: '16:30:00',
          start_date: '2023-01-01',
          end_date: '2023-12-31',
          comment: '',
          created_on: '2023-12-11T12:19:18.214483Z',
          updated_on: null,
          is_approved: true,
          is_disapproved: false,
          flagged_for_delete: false,
          flagged_for_edit: false,
          action_on: '2023-12-11T12:19:18.214483Z',
          applied_on_days: [3, 4, 5],
          applied_on_weeks: [5, 11, 17, 23, 29, 35, 41, 47, 53],
          entry_type: 1,
          updated_by: null,
          original_entry: null,
          person: 1000000005,
          created_by: 1000000014,
          team: 2
        }
      ]
    }
  ]
  const calendar = ref<ICalendarAll[]>(jsonData)

  const getFirstDate = () => {
    return moment().startOf('year').format('YYYY-MM-DD')
  }
  const getLastDate = () => {
    return moment().endOf('year').format('YYYY-MM-DD')
  }

  const validEntryPayload: IValidEntry = {
    start_date: getFirstDate(),
    end_date: getLastDate(),
    teams: []
  }

  const { loading: isFetchingCalendar, callFetch: fetchCalendar } = useFetch<
    ICalendarAll[],
    () => Promise<ICalendarAll[]>
  >(async () => {
    const { data } = await CalendarService.getCalendar()
    //calendar.value = data
    return data
  })

  const { loading: isFetchingFilterCalendar, callFetch: fetchFilterCalendar } = useFetch<
    ICalendarAll[],
    () => Promise<ICalendarAll[]>
  >(async () => {
    const { data } = await CalendarService.getFilterCalendar(validEntryPayload)
    //calendar.value = data
    console.log('bbbbbb', data)
    return data
  })

  // watch(
  //   () => entry.value,
  //   () => {
  //     entryTypes.value = entry.value
  //   }
  // )
  fetchFilterCalendar()

  return {
    calendar,
    isFetchingCalendar,
    isFetchingFilterCalendar,
    fetchCalendar,
    fetchFilterCalendar
  }
})
