import { ref } from 'vue'

export const getDatesInRange = (start_date: string, end_date: string) => {
  const startDate = ref<string>(start_date)
  const endDate = ref<string>(end_date)
  const dates = ref<any>([])
  const start = new Date(startDate.value)
  const end = new Date(endDate.value)
  const newDates = []

  while (start <= end) {
    newDates.push(start.getDate())
    start.setDate(start.getDate() + 1)
  }

  dates.value = newDates
  return Object.values(dates.value)
}
