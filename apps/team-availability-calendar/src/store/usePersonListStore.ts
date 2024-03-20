import { defineStore } from 'pinia'
import { ref } from 'vue'
import { IPersonList } from '@/types/calendar'
import TeamsCalendarService from '@/services/calendar/team'
import { useFetch } from '@/composables/useFetch'

export const usePersonListStore = defineStore('PersonList', () => {
  // state
  const personList = ref<IPersonList[]>()
  const personData: IPersonList[] = [
    {
      id: 1,
      name: 'Kristof Nemet - Development Team',
      staff_id: 46
    },
    {
      id: 2,
      name: 'Renata Agocs - Fuel Team',
      staff_id: 1000000005
    },
    {
      id: 6,
      name: 'Zsofia Matyas - Fuel Team',
      staff_id: 1000000002
    },
    {
      id: 7,
      name: 'Janos Csepes - Fuel Team',
      staff_id: 1000000005
    },
    {
      id: 8,
      name: 'Zsofia Szakaly - Fuel Team',
      staff_id: 1000000003
    },
    {
      id: 5,
      name: 'Tunde Nagy - Fuel Team',
      staff_id: 1000000007
    },
    {
      id: 3,
      name: 'Kristof Nemet - Fuel Team',
      staff_id: 46
    }
  ]

  const { loading: isPersonListLoading, callFetch: fetchPersonList } = useFetch<
    IPersonList[],
    () => Promise<IPersonList[]>
  >(async () => {
    //const data = await TeamsCalendarService.fetchPersonList()
    personList.value = personData
    return personData
  })
  fetchPersonList()
  return {
    personList,
    isPersonListLoading,
    fetchPersonList
  }
})
