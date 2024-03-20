import { IBlanketEntriesExtend, ISpecificEntriesExtend } from '@/types/entries'

export interface ITeam {
  id: number
  name: string
}

export interface IEntryType {
  id: number | null
  name: string
  requires_full_workday: boolean
  requires_comment: boolean
  is_specific_only: boolean
  background: string
}

export interface IPersonList {
  id: number
  name: string
  staff_id: number
}

export interface ICountry {
  name: string
  code: string
  regions: IRegion[]
}

export interface ICountryDetail {
  name: string
  code: string
  holidays: any
  regions: IRegion[]
}

export interface IRegion {
  name: string
  code: string
}

export interface ICalendarAll {
  id: number
  name: string
  teams: ITeamRole[]
  country: string
  region: string
  is_general_admin: boolean
  is_hun_admin: boolean
  specific_entries: ISpecificEntriesExtend[]
  blanket_entries: IBlanketEntriesExtend[]
}

export interface ITeamRole {
  team: string
  role: string
  is_primary_assignment: boolean
  manages_own_schedule: boolean
  is_team_admin: boolean
}

export interface IValidEntry {
  start_date: string
  end_date: string
  teams: string[]
}
