import { useMissionFormStore } from '@/stores/useMissionFormStore'
import { storeToRefs } from 'pinia'

/**
 * Functtion to reduce payload of updated turnarounds
 * @param turnarounds
 */
export const mappedTurnarounds = (turnarounds: any[]) => {
  const copiedTurnarounds = [...turnarounds]
  return copiedTurnarounds.map((turnaround: any) => {
    return {
      ...turnaround,
      turnarounds: turnaround.turnarounds.map((item: any) => ({
        id: item.id,
        booking_quantity: item.booking_quantity,
        booking_text: item.booking_text,
        note: item.note,
        on_arrival: item.on_arrival,
        on_departure: item.on_departure
      }))
    }
  })
}
