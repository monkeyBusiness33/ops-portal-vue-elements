export interface ISpecificEntries {
  id: number
  start_hour: string
  end_hour: string
  start_date: string
  end_date: string
  comment: string
  applied_on_dates: Array<number>
  entry_type: number
  person: number
  team: number
}

export interface IBlanketEntries {
  id: number
  start_hour: string
  end_hour: string
  start_date: string
  end_date: string
  comment: string
  applied_on_days: Array<number>
  applied_on_weeks: Array<number>
  entry_type: number
  person: number
  team: number
}

export interface ISpecificEntriesModify extends ISpecificEntries {
  flagged_for_edit: boolean
  flagged_for_delete: boolean
}

export interface ISpecificEntriesExtend extends ISpecificEntriesModify {
  action_by: string
  created_on: string
  updated_on: string
  is_approved: boolean
  is_disapproved: boolean
  action_on: string
  updated_by: number
  original_entry: string
  created_by: number
  replaces_other_entry: number
  replaces_own_entry: number
}

export interface IBlanketEntriesModify extends IBlanketEntries {
  flagged_for_edit: boolean
  flagged_for_delete: boolean
}

export interface IBlanketEntriesExtend extends IBlanketEntriesModify {
  action_by: string
  created_on: string
  updated_on: string
  is_approved: boolean
  is_disapproved: boolean
  action_on: string
  updated_by: number
  original_entry: string
  created_by: number
}
