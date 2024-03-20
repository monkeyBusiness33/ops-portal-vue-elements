import type { IDetailsReference } from '../general'
import type { IAirportDetails } from './airport'

export interface IAircraft {
  id: number
  registration: string
  type: IAircraftType
  operator: IAircraftOperator
  homebase: IAircraftHomeBase
}

export interface IAircraftTypeEntity {
  id: number | string
  type: string
  attributes: Omit<IAircraftType, 'id'>
}

export interface IAircraftType {
  id: number
  designator: string
  manufacturer: string
  model: string
  category: string
}

export interface IAircraftOperator {
  id: number
  details: IDetailsReference
  operator_details: {
    contact_email: string
    contact_phone: string
  }
}

export interface IAircraftHomeBase {
  id: number
  details: IDetailsReference
  airport_details: IAirportDetails
  tiny_repr: string
  short_repr: string
  full_repr: string
}
