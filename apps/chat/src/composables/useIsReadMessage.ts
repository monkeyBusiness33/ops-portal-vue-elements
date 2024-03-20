import { isInViewport } from "@/helpers/scroll";
import websocketService from "@/services/chat/websocket-chat";
import { WS_TYPES } from "@/types/general.types";
import { IMessage } from "@/types/room/room.types";
import { ComputedRef, onBeforeUnmount, onMounted } from "vue";

export const useIsReadMessage = (
  messageData: ComputedRef<IMessage>,
  targetId: string,
  userId: number
) => {
  const checkIntoView = () => {
    if (
      isInViewport(`message-${messageData.value.id}`) &&
      !messageData.value.is_read &&
      messageData.value.author.id !== userId
    ) {
      websocketService.sendMessage({
        type: WS_TYPES.READ_MESSAGES,
      });
    }
  };

  onMounted(() => {
    const contentMessages = document.getElementById(targetId) as HTMLElement;
    contentMessages.addEventListener("scroll", checkIntoView);
  });
  onBeforeUnmount(() => {
    const contentMessages = document.getElementById(targetId) as HTMLElement;
    contentMessages.removeEventListener("scroll", checkIntoView);
  });
};
