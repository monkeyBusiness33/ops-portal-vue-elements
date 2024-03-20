import type { IEntryType } from '@/types/calendar'

export const mapEntryTypes = (newEntry: IEntryType[]) => {
  return newEntry.map((item: IEntryType) => [
    {
      id: item.id,
      name: item.name,
      requires_full_workday: item.requires_full_workday,
      requires_comment: item.requires_comment,
      is_specific_only: item.is_specific_only
    }
  ])
}
