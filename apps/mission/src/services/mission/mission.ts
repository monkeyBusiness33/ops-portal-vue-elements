import Api from '@/services'
import type { IExtendedMission, IMission, IAmendTiming } from '@/types/mission/mission.types'
import type { Nullable } from '@/types/generic.types'

class MissionService extends Api {
  async getMission(missionId: string | number) {
    return await this.get<IExtendedMission>(`api/v1/missions/${missionId}/`)
  }
  async create(payload: Nullable<IMission>) {
    return await this.post<IExtendedMission>(`api/v1/missions/create/`, payload)
  }
  async update(missionId: number, payload: Nullable<IMission>) {
    return await this.put<IExtendedMission>(`api/v1/missions/${missionId}/update/`, payload)
  }

  async deleteMissionLeg(missionLegId: string | number) {
    return await this.put<IExtendedMission>(`api/v1/missions/leg/${missionLegId}/cancel/`)
  }

  async putMissionAmendTiming(flightLegId: string | number, payload: IAmendTiming) {
    return await this.put(`api/v1/missions/leg/${flightLegId}/amend_timings/`, payload)
  }
}

export default new MissionService()
