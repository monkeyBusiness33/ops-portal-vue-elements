import type { IDetailsReference } from '@/types/general.types'

export interface IAirport {
  id: number
  details: IDetailsReference
  airport_details: IAirportDetails
  tiny_repr: string
  short_repr: string
  full_repr: string
  is_lat_lon_available: boolean
}

export interface IAirportDetails {
  icao_code: string
  iata_code: string
}
