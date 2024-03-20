import Api from '@/services'
import { ICalendarAll } from '@/types/calendar'

class CalendarService extends Api {
  async getCalendar() {
    return await this.get<ICalendarAll[]>('api/v1/staff/calendar')
  }

  async getFilterCalendar(payload: any) {
    return await this.post<ICalendarAll[]>('api/v1/staff/calendar/valid_entries', payload)
  }

  async createSpecialEvent(payload: any) {
    return await this.post<any>('api/v1/staff/calendar/specific_entries', payload)
  }

  async createBlanketEvent(payload: any) {
    return await this.post<any>('api/v1/staff/calendar/blanket_entries', payload)
  }

  async editSpecialEvent(payload: any) {
    return await this.patch<any>('api/v1/staff/calendar/specific_entries/edit', payload)
  }

  async editBlanketEvent(payload: any) {
    return await this.patch<any>('api/v1/staff/calendar/blanket_entries/edit', payload)
  }

  async deleteSpecialEvent(payload: any) {
    return await this.delete<any>('api/v1/staff/calendar/specific_entries/delete', payload)
  }

  async deleteBlanketEvent(payload: any) {
    return await this.delete<any>('api/v1/staff/calendar/blanket_entries/delete', payload)
  }
}

export default new CalendarService()
