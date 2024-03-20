import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { IExtendedMission, IMissionFormStructure } from '@/types/mission/mission.types'
import { useFetch } from '@/composables/useFetch'
import Mission from '@/services/mission/mission'
import type { Nullable } from '@/types/generic.types'
import { notify } from '@/helpers/toast'
import { mapFormMission } from '@/helpers/mission'
import { redirectToURL } from '@/helpers'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

export const useMissionStore = defineStore('Mission', () => {
  const mission = ref<IExtendedMission>()

  const { loading: isFetchingMission, callFetch: fetchMission } = useFetch<
    IExtendedMission,
    (missionId: number) => Promise<IExtendedMission>
  >(async (missionId: number) => {
    const { data } = await Mission.getMission(missionId)

    const modifiedLegs = data.legs.map((el) => {
      return {
        ...el,
        departure_datetime_is_local: false,
        arrival_datetime_is_local: false,
        arrival_datetime: dayjs(new Date(el.arrival_datetime)).tz('UTC').$d,
        departure_datetime: dayjs(new Date(el.departure_datetime)).tz('UTC').$d
      }
    })
    mission.value = { ...data, legs: modifiedLegs }
    return data
  })
  const { loading: isUpdatingMission, callFetch: updateMission } = useFetch<
    IExtendedMission,
    (missionId: number, payload: Nullable<IMissionFormStructure>) => Promise<IExtendedMission>
  >(async (missionId: number, payload: Nullable<IMissionFormStructure>) => {
    const mappedPayload = mapFormMission(payload)
    const { data } = await Mission.update(missionId, mappedPayload)
    mission.value = data
    redirectToURL(mission.value.id)
    notify('Mission updated successfully!', 'success')
    return data
  })
  const { loading: isCancelingMissionLeg, callFetch: cancelMissionLeg } = useFetch<
    IExtendedMission,
    (legId: number) => Promise<IExtendedMission>
  >(async (legId: number) => {
    const { data } = await Mission.deleteMissionLeg(legId)
    mission.value = data
    return data
  })

  return {
    mission,
    isFetchingMission,
    isUpdatingMission,
    isCancelingMissionLeg,
    fetchMission,
    updateMission,
    cancelMissionLeg
  }
})
