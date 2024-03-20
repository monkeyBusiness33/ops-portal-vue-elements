import Api from '@/services'
import type { ITurnarounds } from '@/types/mission-turnarounds/mission-turnarounds'
import type { IExtendedMission } from '@/types/mission/mission.types'

class MissionTurnaroundsService extends Api {
  async fetchMissionTurnarounds(missionId: number) {
    try {
      const { data } = await this.get<IExtendedMission>(`api/v1/missions/${missionId}/`, {})
      return data
    } catch (e: any) {
      throw new Error(e)
    }
  }
  async fetchTurnarounds(missionId: number) {
    try {
      const { data } = await this.get<ITurnarounds[]>(
        `api/v1/missions/${missionId}/ground_servicing/`,
        {}
      )
      return data
    } catch (e: any) {
      throw new Error(e)
    }
  }
  async updateGroundServicing(missionId: number, payload: any) {
    try {
      return await this.put(`api/v1/missions/${missionId}/ground_servicing/`, {
        updated_services: payload
      })
    } catch (e: any) {
      throw new Error(e)
    }
  }
}

export default new MissionTurnaroundsService()
