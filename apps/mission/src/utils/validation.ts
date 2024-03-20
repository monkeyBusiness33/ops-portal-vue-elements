import type { IMissionFormStructure, IMissionLeg } from '@/types/mission/mission.types'
import type { Nullable } from '@/types/generic.types'
import type { ILabeledEntity } from '@/types/general.types'

export const arrivalDateValidation = (
  value: Date,
  vm: Nullable<IMissionLeg>,
  formState: Nullable<IMissionFormStructure>
) => {
  // new Date(updatedMbl.terminalDispatchDate).getTime() !== new Date(oldMbl.terminalDispatchDate).getTime()

  if (formState.legs && formState.legs.length > 1) {
    const currentIndex = formState.legs.findIndex((leg: any) => leg === vm)
    const previousLeg = formState.legs[currentIndex - 1]
    if (previousLeg && previousLeg?.arrival_datetime) {
      return new Date(value) > new Date(previousLeg.arrival_datetime as string)
    }
  }
  return true
}

export const isNegativeNumber = (value: number) => {
  if (value < 0) return false
}

export const arrivalDepartureDateValidation = (value: Date, vm: Nullable<IMissionLeg>) => {
  if (value && vm?.departure_datetime) {
    return new Date(value) > new Date(vm?.departure_datetime)
  }
  return true
}

// Custom validation rule: arrival_location should be same as departure_location of previous element
export const departureLocationValidation = (
  value: ILabeledEntity,
  vm: Nullable<IMissionLeg>,
  formState: Nullable<IMissionFormStructure>
) => {
  if (formState?.legs && formState?.legs?.length > 1) {
    const currentIndex = formState.legs.findIndex((leg) => leg?.sequence_id === vm.sequence_id)
    const previousLeg = formState?.legs?.[currentIndex - 1]
    if (previousLeg) {
      return value?.id === previousLeg?.arrival_location?.id
    }
  }
  return true
}
