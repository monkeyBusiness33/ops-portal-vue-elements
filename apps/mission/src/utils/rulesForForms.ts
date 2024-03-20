import { helpers, required, url } from '@vuelidate/validators'
import {
  arrivalDateValidation,
  arrivalDepartureDateValidation,
  departureLocationValidation
} from '@/utils/validation'
import type { Nullable } from '@/types/generic.types'
import type {
  ILegServicing,
  IMissionFormStructure,
  IMissionLeg,
  IMissionLegFormStructure
} from '@/types/mission/mission.types'
import type { Ref } from 'vue'
import type { ILabeledEntity } from '@/types/general.types'

export const rules = (formModel: Ref<Nullable<IMissionFormStructure>>) => {
  return {
    form: {
      callsign: { required },
      aircraft_type: { required },
      organisation: { required },
      requesting_person: { required },
      apacs_url: { url },
      type: { required },
      mission_planner: { required },
      legs: {
        $each: helpers.forEach({
          arrival_datetime: {
            required,
            arrivalLocationValidation: helpers.withMessage(
              'Arrival Date inconsistency between Arrival and Departure Date',
              (value: Date, vm: any) => {
                return arrivalDepartureDateValidation(value, vm)
              }
            )
          },
          arrival_aml_service: {
            destinationAirportRequired: helpers.withMessage(
              'Destination Airport  required',
              (value: boolean, vm: any) => {
                return value ? !!vm.arrival_location : true
              }
            )
          },
          departure_datetime: {
            required,
            arrivalDateValidation: helpers.withMessage(
              'Arrival Date inconsistency between legs',
              (value: Date, vm: any) => {
                return arrivalDateValidation(value, vm, formModel.value)
              }
            )
          },
          arrival_location: {
            required,
            notEqual: helpers.withMessage(
              "Destination location can't be same as Departure location",
              (value: ILabeledEntity, vm: IMissionLegFormStructure) => {
                return value?.id !== vm.departure_location?.id
              }
            )
          },

          departure_location: {
            required,
            arrivalLocationValidation: helpers.withMessage(
              'Departure Location inconsistency between legs',
              (value: ILabeledEntity, vm: any) => {
                return departureLocationValidation(value, vm, formModel.value)
              }
            )
          },
          pob_crew: {
            required,
            pob_crew: helpers.withMessage('Number must be greater than 0', (value: number) => {
              return value > 0
            })
          },
          servicing: {
            fuel_unit: helpers.withMessage(
              'Value is required',
              (value: ILegServicing, vm: IMissionLeg) => {
                if (!value || !vm.arrival_aml_service || value.fuel_required === null) return true
                return !!value?.fuel_unit
              }
            ),
            servicesDescriptionValidator: helpers.withMessage(
              'Service Description is required',
              (value: ILegServicing) => {
                const services = value?.services?.map((service) => {
                  const booking_text =
                    service?.is_allowed_free_text && !service?.booking_text?.length
                  const quantity_selection =
                    service?.is_allowed_quantity_selection &&
                    !service?.is_allowed_quantity_selection
                  return {
                    booking_text,
                    quantity_selection,
                    error: booking_text || quantity_selection
                  }
                })
                return {
                  extraParams: { services },
                  $valid: !services?.some((service) => service.error)
                }
              }
            )
          }
        })
      }
    }
  }
}
