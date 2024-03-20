import { computed } from 'vue'
import { Tteam } from '@/types/teams'
import { ICalendarAll, ITeamRole } from '@/types/calendar'
import { useCalendarStore } from '@/store/useCalendarStore'
import { storeToRefs } from 'pinia'

export const useResourceGroup = () => {
  const calendarStore = useCalendarStore()
  const { calendar } = storeToRefs(calendarStore)
  // const calendarAll = ref<ICalendarAll[]>([])
  const resourceList = computed(() => {
    let teams: Tteam[] = []
    const calendarData = calendar.value
    if (calendarData.length === 0) {
      teams = []
      return teams
    }
    calendarData?.forEach((item: ICalendarAll) => {
      item.teams?.forEach((list: ITeamRole) => {
        teams.push({
          id: item.id + ' ' + list.team,
          groupId: list.team,
          title: item.name + ' (' + list.role + ')',
          role: list.role,
          staff_id: item.id
        })
      })
    })
    return teams
  })

  return { resourceList }
}
