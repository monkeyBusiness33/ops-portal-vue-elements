import { useMissionFormStore } from '@/stores/useMissionFormStore'
import { notify } from '@/helpers/toast'
import type { IMissionLeg } from '@/types/mission/mission.types'
import { getMissionId } from '@/helpers'
import { useMissionStore } from '@/stores/useMissionStore'

export const useMission = () => {
  const missionFormStore = useMissionFormStore()
  const missionStore = useMissionStore()
  const { cancelMissionLeg } = missionStore
  const { deleteMissionLeg, addNewMissionLeg } = missionFormStore

  const onDeleteMissionLeg = async (leg: IMissionLeg, text: string) => {
    const { isConfirmed } = await window.Swal({
      title: 'Delete Flight Leg',
      text: text || 'Please confirm you want to remove Flight Leg',
      icon: 'info',
      showCancelButton: true
    })
    if (isConfirmed) {
      // getMissionId() && leg?.id
      //   ? await cancelMissionLeg(leg.id as number)
      //   : deleteMissionLeg(leg.sequence_id)
      deleteMissionLeg(leg.sequence_id)

      notify('You successfully removed a mission leg!', 'success')
    }
    return isConfirmed
  }

  const createMissionLeg = (index: number) => {
    addNewMissionLeg(index)
    notify('You successfully added a new mission leg!', 'success')
  }

  return { onDeleteMissionLeg, createMissionLeg }
}
