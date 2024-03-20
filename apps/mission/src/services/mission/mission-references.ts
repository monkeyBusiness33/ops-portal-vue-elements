import Api from '@/services'
import type { IPaginatedResponse, ITypeReference } from '@/types/general.types'
import type {
  IFuelUnit,
  IOrganisation,
  IPerson,
  IService
} from '@/types/mission/mission-reference.types'
import type { IAircraft, IAircraftTypeEntity } from '@/types/mission/aircraft.types'
import type { IAirport } from '@/types/mission/airport.types'
import { getIsAdmin } from '@/helpers'

class MissionReferenceService extends Api {
  async fetchHandlingRequestTypes() {
    try {
      const { data } = await this.get<ITypeReference[]>(`api/v1/handling_requests/types/`)
      return data
    } catch (e: any) {
      throw new Error(e)
    }
  }

  async fetchOrganisations(search?: string) {
    try {
      const {
        data: { results: organisations }
      } = await this.get<IPaginatedResponse<IOrganisation[]>>('api/v1/admin/organisations/', {
        params: { search }
      })
      return organisations
    } catch (e: any) {
      throw new Error(e)
    }
  }

  async fetchOrganisationPeople(organisationId: number) {
    try {
      if (getIsAdmin() && !organisationId) return []
      const url = getIsAdmin()
        ? `api/v1/admin/organisation/${organisationId}/people/`
        : `api/v1/organisation/people/`
      const { data } = await this.get<IPerson[]>(url)
      return data
    } catch (e: any) {
      throw new Error(e)
    }
  }

  async fetchAircraftTypes(organisationId: number) {
    try {
      if (getIsAdmin() && !organisationId) return []
      const url = getIsAdmin()
        ? `api/v1/admin/organisation/${organisationId}/aircraft_types/`
        : `api/v1/organisation/aircraft_types/`
      const {
        data: { data }
      } = await this.get<{ data: IAircraftTypeEntity[] }>(url)
      return data
    } catch (e: any) {
      throw new Error(e)
    }
  }

  async fetchAircrafts(organisationId: number) {
    try {
      if (getIsAdmin() && !organisationId) return []
      const url = getIsAdmin()
        ? `api/v1/admin/organisation/${organisationId}/fleet/`
        : `api/v1/organisation/fleet/`
      const { data } = await this.get<IAircraft[]>(url)
      return data
    } catch (e: any) {
      throw new Error(e)
    }
  }

  async fetchAirportLocations(search?: string | number) {
    try {
      const {
        data: { results: airports }
      } = await this.get<IPaginatedResponse<IAirport[]>>('api/v1/locations/', {
        params: { search }
      })
      return airports
    } catch (e: any) {
      throw new Error(e)
    }
  }

  async fetchFuelQuantityUnits() {
    try {
      const { data } = await this.get<IFuelUnit[]>('api/v1/uom/')
      return data
    } catch (e: any) {
      throw new Error(e)
    }
  }

  async fetchServices(
    locationId?: string | number,
    organisationId?: string | number,
    codeName?: string
  ) {
    try {
      const { data } = await this.get<{ data: IService[] }>('api/v1/handling_services/', {
        params: { organisation_id: organisationId, location_id: locationId, codename: codeName }
      })
      // Filter for unusable services
      const filteredServices = data.data
        ?.filter((service) => {
          return !(
            service.attributes.is_dla &&
            !service.attributes.is_dla_visible_arrival &&
            !service.attributes.is_dla_visible_departure
          )
        })
        .map((service) => {
          return { ...service, id: Number(service.id) }
        })
      return filteredServices
    } catch (e: any) {
      throw new Error(e)
    }
  }
  async fetchMeta() {
    try {
      const { data } = await this.get('api/v1/meta/')
      return data
    } catch (e: any) {
      throw new Error(e)
    }
  }
}

export default new MissionReferenceService()
