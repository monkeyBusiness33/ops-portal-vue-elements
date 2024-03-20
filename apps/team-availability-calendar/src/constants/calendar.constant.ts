import { type IBlanketEntries, ISpecificEntries } from '@/types/entries'
import type { IEntryType } from '@/types/calendar'

export const formCreateDefault = (id: number): any => ({
  id: id || 0,
  start_hour: null,
  end_hour: null,
  start_date: null,
  end_date: null,
  comment: '',
  applied_on_dates: [],
  applied_on_days: '',
  applied_on_weeks: '',
  entry_type: null,
  person: null,
  team: null
})

// export const formCreateBlanketDefault = (id: number): IBlanketEntries => ({
//   id: id || 0,
//   start_hour: null,
//   end_hour: null,
//   start_date: null,
//   end_date: null,
//   comment: '',
//   applied_on_days: [],
//   applied_on_weeks: [],
//   entry_type: null,
//   person: null,
//   team: null
// })
export const entryTypesDefault = (): IEntryType => ({
  id: null,
  name: '',
  requires_full_workday: null,
  requires_comment: null,
  is_specific_only: null,
  background: null
})
