import { defineStore } from 'pinia'
import { ref } from 'vue'
import { IEntryType } from '@/types/calendar'
import TeamsCalendarService from '@/services/calendar/team'
import { useFetch } from '@/composables/useFetch'

export const useEntryTypesStore = defineStore('EntryTypes', () => {
  // state
  const entryTypes = ref<IEntryType[]>([])

  const {
    data: entry,
    loading: isEntryTypesLoading,
    callFetch: fetchEntryTypes
  } = useFetch<IEntryType[], () => Promise<IEntryType[]>>(async () => {
    const data = await TeamsCalendarService.fetchEntryTypes()
    entryTypes.value = data
    return data
  })

  // watch(
  //   () => entry.value,
  //   () => {
  //     entryTypes.value = entry.value
  //   }
  // )
  fetchEntryTypes()
  return {
    entryTypes,
    isEntryTypesLoading,
    fetchEntryTypes
  }
})
