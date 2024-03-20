import Api from './index'
import { Tteam } from '@/types/teams'
import type { IPersonList } from '@/types/calendar'
class TeamsCalendarService extends Api {
  async getTeams() {
    try {
      const { data }: { data: Tteam[] } = await this.get(`api/v1/staff/calendar/teams/`)
      return data
    } catch (e: any) {
      throw new Error(e)
    }
  }

  async getStaffs() {
    try {
      const { data }: { data: IPersonList[] } = await this.get(`api/v1/staff/calendar/people_list/`)
      return data
    } catch (e: any) {
      throw new Error(e)
    }
  }
}

export default new TeamsCalendarService()
