import type { IServiceAvailability } from '@/types/mission/mission-reference.types'
import type { Nullable } from '@/types/generic.types'

export interface ITurnaroundModel {
  id: number
  is_deleted: boolean
  turnarounds: Nullable<ITurnaroundService>[]
}
export interface ITurnarounds {
  id: number
  is_servicing_requested: boolean
  location: ITurnaroundLocation
  services: ITurnaroundService[]
}

export interface ITurnaroundLocation {
  id: number
  details: ITurnaroundDetails
  airport_details: ITurnaroundAirportDetails
  tiny_repr: string
  short_repr: string
  full_repr: string
  is_lat_lon_available: boolean
}

export interface ITurnaroundDetails {
  registered_name: string
  trading_name: any
}

export interface ITurnaroundAirportDetails {
  icao_code: string
  iata_code: string
}

export interface ITurnaroundService {
  id: number
  on_arrival: boolean
  on_departure: boolean
  booking_text?: string
  booking_quantity?: string
  note?: string
  service: ITurnaroundServiceDetails
}

export interface ITurnaroundServiceDetails {
  id: number
  name: string
  codename: string
  is_allowed_free_text: boolean
  is_allowed_quantity_selection: boolean
  quantity_selection_uom: any
  is_dla: boolean
  is_dla_visible_arrival: boolean
  is_dla_visible_departure: boolean
  is_spf_visible: boolean
  is_passengers_handling: boolean
  availability: unknown[]
  availability_bool: IServiceAvailability[]
}
