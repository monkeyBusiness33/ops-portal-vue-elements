import { defineStore, storeToRefs } from 'pinia'
import { useFetch } from '@/composables/useFetch'
import type { IAirport } from '@/types/mission/airport.types'
import MissionReferences from '@/services/mission/mission-references'
import type { IFuelUnit } from '@/types/mission/mission-reference.types'
import { ref } from 'vue'
import type { IService } from '@/types/mission/mission-reference.types'
import { legServiceOptions } from '@/constants/service.constants'
import mission from '@/services/mission/mission'
import { useMissionFormStore } from '@/stores/useMissionFormStore'

export const useMissionReferenceStore = defineStore('MissionReference', () => {
  const selectedDestinationAirportsLeg = ref([])
  const missionFormStore = useMissionFormStore()

  const { formModel } = storeToRefs(missionFormStore)
  const {
    loading: isLoadingAirportLocations,
    data: airportLocations,
    callFetch: fetchAirportLocations
  } = useFetch<IAirport[], (search?: string) => void>(async (search?: string) => {
    return await MissionReferences.fetchAirportLocations(search)
  })

  const {
    loading: isLoadingQuantityUnits,
    data: quantityUnits,
    callFetch: fetchFuelQuantityUnits
  } = useFetch<IFuelUnit[], () => void>(async () => {
    return await MissionReferences.fetchFuelQuantityUnits()
  })

  const {
    loading: isLoadingPassengerService,
    data: passengerService,
    callFetch: fetchPassengerService
  } = useFetch<IService, () => void>(async () => {
    const [passengerService] = await MissionReferences.fetchServices(
      undefined,
      undefined,
      legServiceOptions.passenger
    )
    return passengerService
  })
  const {
    loading: isLoadingCargoService,
    data: cargoService,
    callFetch: fetchCargoService
  } = useFetch<IService, () => void>(async () => {
    const [cargoService] = await MissionReferences.fetchServices(
      undefined,
      undefined,
      legServiceOptions.cargo
    )
    return cargoService
  })

  const initiateReferenceStore = async () => {
    await Promise.allSettled([
      fetchFuelQuantityUnits(),
      fetchPassengerService(),
      fetchCargoService()
    ])
  }

  return {
    isLoadingAirportLocations,
    isLoadingQuantityUnits,
    isLoadingPassengerService,
    isLoadingCargoService,
    cargoService,
    passengerService,
    quantityUnits,
    airportLocations,
    selectedDestinationAirportsLeg,
    initiateReferenceStore
  }
})
