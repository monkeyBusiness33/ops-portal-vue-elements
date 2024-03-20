import { computed } from 'vue'
import { ICalendarAll, IEntryType, ITeam } from '@/types/calendar'
import { IBlanketEntriesExtend, ISpecificEntriesExtend } from '@/types/entries'
import { storeToRefs } from 'pinia'
import { useCalendarStore } from '@/store/useCalendarStore'
import { useEntryTypesStore } from '@/store/useEntryTypesStore'
import { useTeamListStore } from '@/store/useTeamListStore'
// @ts-ignore
import moment from 'moment'

export const useFilterEvents = () => {
  const calendarStore = useCalendarStore()
  const entryTypesStore = useEntryTypesStore()
  const teamsListStore = useTeamListStore()
  const { calendar: calendarAll } = storeToRefs(calendarStore)
  const { entryTypes } = storeToRefs(entryTypesStore)
  const { teamsList } = storeToRefs(teamsListStore)
  const convertTeamName = (team: number) => {
    if (!team) return ''
    return teamsList?.value?.find((item: ITeam) => item.id === team)?.name
  }
  const convertEntryTypeName = (entry_type: number) => {
    if (!entry_type) return ''
    return entryTypes?.value?.find((item: IEntryType) => item.id === entry_type)?.name
  }

  const convertBackgroundColor = (entry_type: number) => {
    return entryTypes?.value?.find((item: IEntryType) => item.id === entry_type)?.background
  }

  const convertDate = (applied_on_days: number[]) => {
    return applied_on_days.map(
      (number: number) => ['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su'][number - 1] || ''
    )
  }

  const durationTime = (end: any, start: any) => {
    const startTime = moment(start, 'hh:mm:ss')
    const endTime = moment(end, 'hh:mm:ss')
    //const duration = moment.duration(end.diff(start))
    const hours = endTime.diff(startTime, 'hours').toString()
    const minutes = moment
      .utc(moment(endTime, 'HH:mm:ss').diff(moment(startTime, 'HH:mm:ss')))
      .format('mm')
    return String(String(Number(hours) < 10 ? '0' : '') + hours + ':' + minutes)
  }
  const entryEvents = computed(() => {
    let event: any[] = []
    if (calendarAll.value.length === 0) {
      event = []
      return
    }
    calendarAll.value.map((item: ICalendarAll) => {
      item.specific_entries.map((list: ISpecificEntriesExtend) => {
        event.push({
          resourceId: item.id + ' ' + convertTeamName(list.team),
          groupId: convertTeamName(list.team),
          title: convertEntryTypeName(list.entry_type),
          rrule: {
            freq: 'monthly',
            bymonthday: Object.values(list.applied_on_dates),
            dtstart: list.start_date + 'T' + list.start_hour, // will also accept '20120201T103000'
            until: list.end_date + 'T' + list.end_hour // will also accept '20120201'
          },
          extendedProps: {
            comment: list.comment,
            team_id: list.team,
            person_id: list.person,
            entry_id: list.entry_type,
            id: list.id
          },
          duration: durationTime(list.end_hour, list.start_hour),
          backgroundColor: convertBackgroundColor(list.entry_type)
        })
      })
      item.blanket_entries.map((list: IBlanketEntriesExtend) => {
        if (list.applied_on_weeks[0] === 0 && list.applied_on_weeks.length < 2) {
          event.push({
            resourceId: item.id + ' ' + convertTeamName(list.team),
            groupId: convertTeamName(list.team),
            title: convertEntryTypeName(list.entry_type),
            rrule: {
              freq: 'weekly',
              byweekday: convertDate(list.applied_on_days),
              dtstart: list.start_date + 'T' + list.start_hour, // will also accept '20120201T103000'
              until: list.end_date + 'T' + list.end_hour // will also accept '20120201'
            },
            duration: durationTime(list.end_hour, list.start_hour),
            exrule: {
              freq: 'weekly',
              bymonthday: Object.values(
                item.specific_entries.find(
                  (special: ISpecificEntriesExtend) => special.id === list.id
                ).applied_on_dates
              ),
              dtstart:
                item.specific_entries.find(
                  (special: ISpecificEntriesExtend) => special.id === list.id
                ).start_date +
                'T' +
                list.start_hour,
              until:
                item.specific_entries.find(
                  (special: ISpecificEntriesExtend) => special.id === list.id
                ).end_date +
                'T' +
                list.end_hour
            },
            extendedProps: {
              comment: list.comment,
              team_id: list.team,
              person_id: list.person,
              entry_id: list.entry_type,
              id: list.id
            },
            backgroundColor: convertBackgroundColor(list.entry_type)
          })
        } else {
          if (item.specific_entries.length > 0) {
            event.push({
              resourceId: item.id + ' ' + convertTeamName(list.team),
              groupId: convertTeamName(list.team),
              title: convertEntryTypeName(list.entry_type),
              rrule: {
                freq: 'weekly',
                byweekday: convertDate(list.applied_on_days),
                byweekno: Object.values(list.applied_on_weeks),
                dtstart: list.start_date + 'T' + list.start_hour, // will also accept '20120201T103000'
                until: list.end_date + 'T' + list.end_hour // will also accept '20120201'
              },
              exrule: {
                freq: 'weekly',
                bymonthday: Object.values(
                  item.specific_entries.find(
                    (special: ISpecificEntriesExtend) => special.id === list.id
                  ).applied_on_dates
                ),
                dtstart:
                  item.specific_entries?.find(
                    (special: ISpecificEntriesExtend) => special.id === list.id
                  )?.start_date +
                  'T' +
                  list.start_hour,
                until:
                  item.specific_entries?.find(
                    (special: ISpecificEntriesExtend) => special.id === list.id
                  )?.end_date +
                  'T' +
                  list.end_hour
              },
              extendedProps: {
                comment: list.comment,
                team_id: list.team,
                person_id: list.person,
                entry_id: list.entry_type,
                id: list.id
              },
              duration: durationTime(list.end_hour, list.start_hour),
              backgroundColor: convertBackgroundColor(list.entry_type)
            })
          } else {
            event.push({
              resourceId: item.id + ' ' + convertTeamName(list.team),
              groupId: convertTeamName(list.team),
              title: convertEntryTypeName(list.entry_type),
              rrule: {
                freq: 'weekly',
                byweekday: convertDate(list.applied_on_days),
                byweekno: Object.values(list.applied_on_weeks),
                dtstart: list.start_date + 'T' + list.start_hour, // will also accept '20120201T103000'
                until: list.end_date + 'T' + list.end_hour // will also accept '20120201'
              },
              duration: durationTime(list.end_hour, list.start_hour),
              extendedProps: {
                comment: list.comment,
                team_id: list.team,
                person_id: list.person,
                entry_id: list.entry_type,
                id: list.id
              },
              backgroundColor: convertBackgroundColor(list.entry_type)
            })
          }
        }
      })
    })
    console.log(event, 'event')
    return event
  })
  return {
    entryEvents
  }
}
