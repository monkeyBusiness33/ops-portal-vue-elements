import Api from '@/services'
import { IEntryType, IPersonList, ITeam } from '@/types/calendar'
import type { ITypeReference } from 'mission/src/types/general.types'

class TeamsCalendarService extends Api {
  async fetchTeamList(search?: string) {
    try {
      const { data } = await this.get<ITeam[]>('api/v1/staff/calendar/teams', {
        params: { search }
      })
      return data
    } catch (e: any) {
      throw new Error(e)
    }
  }

  async fetchPersonList(search?: string) {
    try {
      const { data } = await this.get<IPersonList[]>('api/v1/staff/calendar/people_list', {
        params: { search }
      })
      return data
    } catch (e: any) {
      throw new Error(e)
    }
  }

  async fetchEntryTypes() {
    try {
      const { data } = await this.get<IEntryType[]>('api/v1/staff/calendar/entry_types')
      return data
    } catch (e: any) {
      throw new Error(e)
    }
  }
}

export default new TeamsCalendarService()
