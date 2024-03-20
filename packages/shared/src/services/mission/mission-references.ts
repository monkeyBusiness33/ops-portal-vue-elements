import Api from '../index'
import type { IPaginatedResponse } from '../../types'
import type { IAirport, IOrganisationTypeData } from '../../types'

class MissionReferenceService extends Api {
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

  async fetchOrganisationsType(search?: string | number, type?: any) {
    try {
      const {
        data: { results: organisationTypeData }
      } = await this.get<IPaginatedResponse<IOrganisationTypeData[]>>('api/v1/organisations/', {
        params: { search, type }
      })
      return organisationTypeData
    } catch (e: any) {
      throw new Error(e)
    }
  }
}

export default new MissionReferenceService()
