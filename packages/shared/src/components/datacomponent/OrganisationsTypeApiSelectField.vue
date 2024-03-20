<template>
  <SelectField
    v-bind="$attrs"
    :filterable="false"
    :options="OrganisationsTypeData"
    :reduce="
      (item) => ({
        id: item.id,
        full_repr: item.full_repr,
        tiny_repr: item.tiny_repr
      })
    "
    :loading="isLoadingOrganisationsType"
    label="full_repr"
    @search="onSearchOrganisation"
    @update:model-value="onChange"
  >
    <template #no-options>Organisation Type Data</template>
  </SelectField>
</template>

<script setup lang="ts">
import SelectField from '../fields/SelectField.vue'
import { useFetch } from '../../composables/'
import type { IOrganisationTypeData } from '../../types'
import MissionReferences from '../../services/mission/mission-references'
import { useDebounceFunction } from '../../composables/'
import { useAttrs, ref } from 'vue'

const attrs = useAttrs()

const {
  loading: isLoadingOrganisationsType,
  data: OrganisationsTypeData,
  callFetch: fetchOrganisationsType
} = useFetch<IOrganisationTypeData[], (search?: string, type?: any) => void>(
  async (search?: string, type?: any) => {
    return await MissionReferences.fetchOrganisationsType(search, type)
  }
)

const debounce = useDebounceFunction()

const onChange = async (event: number) => {
  if (event) return
  await fetchOrganisationsType()
}

const onSearchOrganisation = (event: string) =>
  debounce(async () => {
    const type: any = ref<number[]>([3, 8])
    if (attrs.modelValue && !event) return
    await fetchOrganisationsType(event as any, type.value)
  })
</script>
