import type { IAirport } from '@/types/mission/airport.types'
import { getMissionId } from '@/helpers'
import { storeToRefs } from 'pinia'
import { useMissionFormStore } from '@/stores/useMissionFormStore'
import { computed } from 'vue'
import type { IMissionLeg } from '@/types/mission/mission.types'

export const useAirportLocation = (legIndex: number) => {
  const { formModel: missionFormModel } = storeToRefs(useMissionFormStore())

  const isLastLeg = computed(() => {
    return legIndex === (missionFormModel.value?.legs?.length as number) - 1
  })
  const isFirstLeg = computed(() => {
    return legIndex === 0
  })
  const onChangeDepartureLocation = (
    airport: Pick<IAirport, 'id' | 'full_repr' | 'tiny_repr' | 'is_lat_lon_available'>
  ) => {
    const prevLeg = missionFormModel.value?.legs?.[legIndex - 1]
    if (prevLeg && prevLeg.arrival_location?.id !== airport.id) {
      prevLeg.arrival_location = airport
    }
    if (!airport.is_lat_lon_available) {
      //@ts-ignore
      missionFormModel.value.legs[legIndex].departure_datetime_is_local =
        airport.is_lat_lon_available
    }
    getMissionId() && !isFirstLeg.value && resetFuelingSection(legIndex - 1)
  }

  const onChangeArrivalLocation = (
    airport: Pick<IAirport, 'id' | 'full_repr' | 'tiny_repr' | 'is_lat_lon_available'>
  ) => {
    const nextLeg = missionFormModel.value?.legs?.[legIndex + 1]
    if (nextLeg) {
      nextLeg.departure_location = airport
    }
    if (!airport.is_lat_lon_available) {
      //@ts-ignore
      missionFormModel.value.legs[legIndex].arrival_datetime_is_local = airport.is_lat_lon_available
    }
    getMissionId() && !isLastLeg.value && resetFuelingSection(legIndex)
  }

  const resetFuelingSection = (index: number) => {
    if (missionFormModel.value.legs?.[index]) {
      ;(missionFormModel.value.legs[index] as unknown as IMissionLeg).arrival_aml_service = false
      delete (missionFormModel.value.legs[index] as unknown as IMissionLeg).servicing
    }
  }
  return {
    onChangeDepartureLocation,
    onChangeArrivalLocation
  }
}
