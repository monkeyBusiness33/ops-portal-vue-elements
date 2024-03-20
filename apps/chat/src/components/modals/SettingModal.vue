<template>
  <v-dialog v-model="show" max-width="500" scroll-strategy="none">
    <template #default="{ isActive }">
      <form>
        <v-card>
          <v-card-title class="modal-header">
            <v-icon icon="fas fa-cog !mr-[5px] text-[20px]"></v-icon>
            <span> &nbsp; Notification Setting </span>
            <v-spacer></v-spacer>
            <button
              type="button"
              class="btn-close text-[16px]"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="isActive.value = false"
            ></button>
          </v-card-title>
          <v-card-text class="text-[#374151] !p-[1rem]">
            <v-checkbox
              v-model="state.chat_enable_sound_notification"
              label="Enable Sound Notification"
              color="primary"
              density="default"
              class="!ml-[-0.5rem]"
            ></v-checkbox>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              text="Close"
              class="bg-gray-200 text-grey-900 border border-solid"
              @click="isActive.value = false"
            ></v-btn>
            <v-btn
              text="Save"
              class="bg-green-700 text-black-400 border border-solid"
              @click="onSubmit"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </form>
    </template>
  </v-dialog>
</template>
<script lang="ts" setup>
import { ref, reactive, computed, watchEffect } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import chatService from "@/services/chat/chat";
import websocketService from "@/services/chat/websocket-chat";

interface Props {
  show?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  show: false,
});

const emit = defineEmits<{
  (e: "update:show", v: string | boolean): void;
}>();

const show = computed({
  get() {
    return props.show;
  },
  set(value) {
    emit("update:show", value);
  },
});

const state = reactive<any>({
  chat_enable_sound_notification:
    websocketService.userSettings.value.chat_enable_sound_notification,
});

const rules = computed(() => ({
  chat_enable_sound_notification: { required },
}));

const error_messages = ref<string>("");
const $externalResults = ref({});

const v$ = useVuelidate(rules, state, { $externalResults });

const onSubmit = async () => {
  const user_settings: any = {
    chat_enable_sound_notification: state.chat_enable_sound_notification,
  };
  try {
    await chatService.putUserSettings(user_settings);
    show.value = false;
  } catch (error: any) {
    if (error.response) {
      const { errors } = error.response.data;

      if (errors.length > 0 && typeof errors[0] === "string") {
        error_messages.value = errors;
      }
    }
  }
};

watchEffect(() => {
  state.chat_enable_sound_notification =
    websocketService.userSettings.value.chat_enable_sound_notification;
});
</script>
<style lang="scss">
.v-card-title {
  display: flex;
  padding: 1rem 1rem;
  justify-content: space-between;
  align-items: center;
  font-size: 1.25rem;
  line-height: 1.5;
  border-bottom: 0.0625rem solid #e5e7eb;
}
.v-card-actions {
  padding: 0.75rem;
  border-top: 0.0625rem solid #e5e7eb;

  .v-btn {
    margin: 0.25rem !important;
    padding: 0.5rem 1rem;
    letter-spacing: normal;
  }
}
</style>
