import type { ITypeReference } from '@/types/general.types'

export interface IOrganisation {
  id: number
  full_repr: string
  details: {
    registered_name: string
    trading_name?: string
    type: ITypeReference
  }
}

export interface IPerson {
  id: number
  person: {
    id: number
    details: {
      contact_email: string
      contact_phone: any
      title: string
      first_name: string
      middle_name: any
      last_name: string
    }
    initials: string
  }
  role: ITypeReference
  job_title: string
}

export interface IFuelUnit {
  id: number
  description: string
  description_plural: string
  code: string
}

export interface IService {
  type: string
  id: number
  attributes: {
    name: string
    codename: ServiceCodeNames | null
    is_allowed_free_text: boolean
    is_allowed_quantity_selection: boolean
    quantity_selection_uom: unknown
    is_dla: boolean
    is_dla_visible_arrival: boolean
    is_dla_visible_departure: boolean
    is_spf_visible: boolean
    is_passengers_handling: boolean
    availability: unknown[]
    availability_bool: IServiceAvailability[]
  }
}

export interface IServiceAvailability {
  airport: number
  arrival: boolean
  departure: boolean
}

export type ServiceCodeNames = 'passengers_handling' | 'cargo_loading_unloading'
