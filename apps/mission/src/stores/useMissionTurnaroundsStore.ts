import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useFetch } from '@/composables/useFetch'
import MissionTurnarounds from '@/services/mission/mission-turnarounds'
import { watch } from 'vue'
import type {
  ITurnaroundModel,
  ITurnarounds,
  ITurnaroundService
} from '@/types/mission-turnarounds/mission-turnarounds'
import type { IExtendedMission } from '@/types/mission/mission.types'
import { missionTurnaroundServiceDefault } from '@/constants/mission.constants'
import type { Nullable } from '@/types/generic.types'

export const useTurnaroundsStore = defineStore('TurnaroundsStore', () => {
  const groundServicing = ref<ITurnarounds[]>([])
  const turnaroundsModel = ref<ITurnaroundModel[]>([])
  const missionForm = ref<IExtendedMission>()

  const generateServices = computed<ITurnaroundModel[]>(() => {
    const defaultService = (turnaroundId: number, id: number) => ({
      booking_quantity: null,
      booking_text: null,
      id: turnaroundId,
      note: null,
      on_arrival: false,
      on_departure: false,
      service: { ...missionTurnaroundServiceDefault(id) }
    })
    const serviceMap = new Map<number, Nullable<ITurnaroundService>[]>()
    const airportsLength = groundServicing.value ? groundServicing.value.length + 1 : 0
    const airportIds = groundServicing.value.map((item) => item.id)
    const services = groundServicing.value.flatMap((item) =>
      item.services.map((service) => ({ ...service, id: item.id }))
    )

    for (const service of services) {
      const servicesServices = serviceMap.get(service.service.id) || [{ service: service.service }]

      const index = airportIds.findIndex((id: number) => id === service.id) + 1
      servicesServices[index] = service
      serviceMap.set(service.service.id, servicesServices as ITurnaroundService[])
    }
    const groupedMap = Array.from(serviceMap.values()).map((el) => {
      return {
        id: el[0]?.service?.id,
        is_deleted: false,
        turnarounds: el.slice(1)
      }
    })
    return groupedMap.map((service) => {
      for (let j = 0; j < airportsLength - 1; j++) {
        if (!service.turnarounds[j]) {
          service.turnarounds[j] = defaultService(groundServicing.value[j].id, service.id as number)
        }
      }
      return service
    })
  })

  const { loading: isFetchingTurnarounds, callFetch: fetchTurnarounds } = useFetch<
    any,
    (missionId: number) => any
  >(async (missionId: number) => {
    const data = await MissionTurnarounds.fetchTurnarounds(missionId)
    groundServicing.value = data
    return data
  })

  const { loading: isFetchingMissionTurnarounds, callFetch: fetchMissionTurnarounds } = useFetch<
    IExtendedMission,
    (missionId: number) => Promise<IExtendedMission>
  >(async (missionId: number) => {
    const data = await MissionTurnarounds.fetchMissionTurnarounds(missionId)
    missionForm.value = data
    return data
  })

  watch(
    () => generateServices.value,
    () => {
      turnaroundsModel.value = [...generateServices.value]
    }
  )

  return {
    missionForm,
    groundServicing,
    generateServices,
    turnaroundsModel,
    isFetchingTurnarounds,
    isFetchingMissionTurnarounds,
    fetchTurnarounds,
    fetchMissionTurnarounds
  }
})
