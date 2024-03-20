<template>
  <div class="mission-itinerary__aml" :class="$style['mission-itinerary__aml']">
    <div :key="index" :class="[$style['mission-itinerary__item']]">
      <FormCard
        :form-errors="validationInfo?.legs?.$each?.$response?.$errors?.[index]?.arrival_aml_service"
        :is-loading="isLoading"
        class="relative"
      >
        <template #content>
          <AMLTurnaroundWrapper
            class="px-[1.5rem]"
            :errors="validationInfo?.legs?.$each?.$response?.$errors?.[index] as Record<string, ErrorObject[]>"
            :is-validation-dirty="validationInfo?.$dirty"
            :leg-sequence-id="leg?.sequence_id"
            :leg-index="index"
            :leg="leg"
          />
        </template>
      </FormCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BaseValidation, ErrorObject } from '@vuelidate/core'
import type { PropType } from 'vue'
import { FormCard } from 'shared/components'
import AMLTurnaroundWrapper from '@/components/forms/AMLTurnaroundWrapper.vue'
defineProps({
  validationInfo: {
    type: Object as PropType<BaseValidation>,
    default: () => ({})
  },
  isLoading: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  index: {
    type: Number,
    default: 0
  },
  leg: {
    type: Object,
    default: () => ({})
  }
})
</script>

<style module lang="scss">
.mission-itinerary {
  &__aml {
    @apply flex flex-col  w-full gap-[1.625rem];
    .ops-form-wrapper__header {
      height: 20px;
      background: red !important;
    }
  }
  &__item {
    @apply relative lg:w-full h-full;
    .add-new-mission {
      @apply transition-all opacity-0 duration-500 invisible mb-2;
    }
    &:hover {
      .add-new-mission {
        @apply opacity-100 mt-[0.3rem] transition-all duration-500 visible;
      }
    }
  }
  &__show-mobile-aml {
    @apply min-w-[30rem] w-full mt-4 bg-white block #{!important};
  }
  &__wrapper {
    @apply relative;
  }
}
</style>