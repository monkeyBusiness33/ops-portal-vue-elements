import { defineStore } from 'pinia'
import { ref } from 'vue'
import { ITeam } from '@/types/calendar'
import TeamsCalendarService from '@/services/calendar/team'
import { useFetch } from '@/composables/useFetch'

export const useTeamListStore = defineStore('TeamList', () => {
  // state
  const teamData: ITeam[] = [
    {
      id: 1,
      name: 'Development Team'
    },
    {
      id: 2,
      name: 'Fuel Team'
    },
    {
      id: 3,
      name: 'Sales Team'
    }
  ]

  const teamsList = ref<ITeam[]>([])

  const { loading: isTeamListLoading, callFetch: fetchTeamList } = useFetch<any, () => any>(
    async () => {
      const data = await TeamsCalendarService.fetchTeamList()
      teamsList.value = data
      return data
    }
  )
  fetchTeamList()

  return {
    teamsList,
    isTeamListLoading,
    fetchTeamList
  }
})
