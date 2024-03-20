import type {
  ILegService,
  IMissionFormStructure,
  IMissionLeg,
  IMissionLegFormStructure,
  ServiceFuelingType
} from '@/types/mission/mission.types'
import type { Nullable } from '@/types/generic.types'
import type { ITurnaroundServiceDetails } from '@/types/mission-turnarounds/mission-turnarounds'
import { storeToRefs } from 'pinia'
import { useMissionReferenceStore } from '@/stores/useMissionReferenceStore'
import { useMissionFormStore } from '@/stores/useMissionFormStore'

export const FuelRequiredTypes: Readonly<{ value: ServiceFuelingType; label: string }[]> = [
  { value: 'ARRIVAL', label: 'On Arrival' },
  { value: 'DEPARTURE', label: 'On Departure' },
  { value: null, label: 'No Fuel' }
]

export const missionDefaultFormModel = (): Nullable<IMissionFormStructure> => {
  return {
    mission_number_prefix: '',
    mission_number: '',
    type: 1,
    callsign: '',
    organisation: null,
    requesting_person: null,
    aircraft_type: null,
    aircraft: null,
    apacs_number: '',
    apacs_url: '',
    mission_planner: null,
    legs: [missionLegDefaults(1), missionLegDefaults(2, false)]
  }
}

export const missionLegDefaults = (
  sequenceId: number | null = null,
  amlService = true
): Nullable<IMissionLegFormStructure> => {
  return {
    sequence_id: sequenceId,
    departure_location: null,
    departure_datetime: null,
    departure_aml_service: false,
    arrival_location: null,
    arrival_datetime: null,
    arrival_aml_service: amlService,
    pob_crew: 0,
    pob_pax: null,
    cob_lbs: null,
    callsign_override: '',
    departure_datetime_is_local: false,
    arrival_datetime_is_local: false,
    ...(amlService
      ? {
          servicing: missionLegServicingDefaults()
        }
      : {})
  }
}

// fuel_unit [5] - Pounds (LB) item in quantityUnits array
export const missionLegServicingDefaults = () => {
  const missionFormStore = useMissionFormStore()
  const { formModel: missionFormModel } = storeToRefs(missionFormStore)

  const missionReferenceStore = useMissionReferenceStore()
  const { quantityUnits } = storeToRefs(missionReferenceStore)

  const quantityUnit = quantityUnits.value?.find((unit) => unit.description.includes('Pound'))
  const lastActiveServicing = missionFormModel?.value?.legs?.slice(0, -1).reverse().find((leg) => leg?.arrival_aml_service)?.servicing;
  const lastFuelUnit = lastActiveServicing
    ? lastActiveServicing?.fuel_unit
    : quantityUnit

  return {
    fuel_required: FuelRequiredTypes[0].value,
    fuel_quantity: 0,
    fuel_unit: lastFuelUnit || null,
    fuel_prist_required: false,
    services: []
  }
}

export const missionLegServiceDefaults = (id: number): Partial<ILegService> => ({
  service: id,
  on_departure: false,
  on_arrival: false,
  note: '',
  booking_text: '',
  booking_quantity: null
})

export const missionTurnaroundServiceDefault = (id: number): ITurnaroundServiceDetails => ({
  id,
  name: '',
  codename: '',
  is_allowed_free_text: false,
  is_allowed_quantity_selection: false,
  quantity_selection_uom: null,
  is_dla: true,
  is_dla_visible_arrival: true,
  is_dla_visible_departure: true,
  is_spf_visible: false,
  is_passengers_handling: false,
  availability: [],
  availability_bool: []
})
