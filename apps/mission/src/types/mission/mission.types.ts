import type { Nullable } from '@/types/generic.types'
import type { IAirport } from '@/types/mission/airport.types'
import type { IFuelUnit } from '@/types/mission/mission-reference.types'
import type { ILabeledEntity } from '@/types/general.types'

export interface IMissionFormStructure extends Omit<IMission, 'legs' | 'organisation'> {
  legs: IMissionLegFormStructure[]
  organisation: ILabeledEntity
}

export interface IMissionLegFormStructure
  extends Omit<IMissionLeg, 'arrival_location' | 'departure_location'> {
  arrival_location: ILabeledEntity
  departure_location: ILabeledEntity
}

export interface IMission {
  id?: number
  mission_number_prefix: string
  mission_number: string
  type: number
  callsign: string
  organisation: number
  requesting_person: number
  aircraft_type: number
  aircraft: number
  apacs_number: string
  apacs_url: any
  mission_planner: number
  legs: IMissionLeg[]
}

export interface IMissionLeg {
  id?: number
  sequence_id: number
  departure_location: number
  departure_datetime: string
  departure_diplomatic_clearance?: string
  departure_aml_service: boolean
  arrival_location: number
  arrival_datetime: string
  arrival_diplomatic_clearance?: string
  arrival_aml_service: boolean
  pob_crew: number
  pob_pax: number
  cob_lbs: number
  callsign_override: any
  departure_datetime_is_local: boolean
  arrival_datetime_is_local: boolean
  servicing?: Nullable<ILegServicing>
}

export type ServiceFuelingType = 'ARRIVAL' | 'DEPARTURE' | null

export interface ILegServicing {
  fuel_required: ServiceFuelingType
  fuel_quantity: number
  fuel_unit: number | null
  fuel_prist_required: boolean
  services: ILegService[]
}

export interface ILegService {
  service: number
  on_arrival: boolean
  on_departure: boolean
  note: string
  is_allowed_free_text: boolean
  is_allowed_quantity_selection: boolean
  booking_text: string
  booking_quantity: number | null
}

export interface IExtendedMission
  extends Omit<
    IMission,
    'organisation' | 'requesting_person' | 'aircraft_type' | 'aircraft' | 'legs' | 'id' | 'type'
  > {
  id: number
  start_date: string
  end_date: string
  type: {
    name: string
    id: number
  }
  organisation: {
    id: number
    full_repr: string
    details: {
      registered_name: string
      trading_name: string
      type: {
        id: number
        name: string
      }
    }
  }
  requesting_person: {
    id: number
    initials: string
    details: any
  }
  aircraft_type: {
    id: number
    designator: string
    manufacturer: string
    model: string
    category: string
  }
  aircraft: {
    id: number
    registration: string
    operator: any
    homebase: any
  }
  mission_planner: {
    id: number
    initials: string
    details: any
  }
  legs: IExtendedMissionLeg[]
}

export interface IExtendedMissionLeg
  extends Omit<IMissionLeg, 'departure_location' | 'arrival_location' | 'servicing' | 'id'> {
  id: number
  departure_location: IAirport
  arrival_location: IAirport
  servicing?: IExtendedLegServicing
}

export interface IExtendedLegServicing extends Omit<ILegServicing, 'fuel_unit' | 'services'> {
  fuel_unit: IFuelUnit
  services: IExtendedLegService[]
}

export interface IExtendedLegService extends Omit<ILegService, 'service'> {
  service: {
    name: string
    id: number
    is_allowed_quantity_selection: boolean
    is_allowed_free_text: boolean
    quantity_selection_uom: {
      id: number
      description: string
      description_plural: string
      code: string
    }
  }
}

export interface IAmendTiming {
  movement_direction?: string
  new_datetime: string
  roll_change_to_subsequent_legs: boolean
}
