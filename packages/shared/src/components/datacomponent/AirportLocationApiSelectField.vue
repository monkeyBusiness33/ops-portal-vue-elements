<template>
  <SelectField
    v-bind="$attrs"
    :filterable="false"
    :options="airportLocations"
    :reduce="
      (item) => ({
        id: item.id,
        full_repr: item.full_repr,
        tiny_repr: item.tiny_repr,
        is_lat_lon_available: item.is_lat_lon_available
      })
    "
    :loading="isLoadingAirportLocations"
    label="full_repr"
    @search="onSearchAirports"
    @update:model-value="onChange"
  >
    <template #no-options>Search location by Name/ICAO/IATA</template>
  </SelectField>
</template>

<script setup lang="ts">
import SelectField from '../fields/SelectField.vue'
import { useFetch } from '../../composables'
import type { IAirport } from '../../types'
import MissionReferences from '../../services/mission/mission-references'
import { useDebounceFunction } from '../../composables'
import { useAttrs } from 'vue'

const attrs = useAttrs()

const {
  loading: isLoadingAirportLocations,
  data: airportLocations,
  callFetch: fetchAirportLocations
} = useFetch<IAirport[], (search?: string) => void>(async (search?: string) => {
  return await MissionReferences.fetchAirportLocations(search)
})

const debounce = useDebounceFunction()

const onChange = async (event: number) => {
  if (event) return
  await fetchAirportLocations()
}

const onSearchAirports = (event: string) =>
  debounce(async () => {
    if (attrs.modelValue && !event) return
    await fetchAirportLocations(event as any)
  })
</script>
