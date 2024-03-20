import { computed } from "vue";
import websocketService from "@/services/chat/websocket-chat";
import { IMessage } from "@/types/room/room.types";
import { useUserStore } from "@/store/useUserStore";
import { checkIfBottomScroll, scrollToBottom } from "@/helpers/scroll";
import { generateID } from "@/helpers/general";

export const useSendMessage = (message: IMessage) => {
  const userStore = useUserStore();
  const ownMessage = computed(
    () => message?.author?.id === userStore.getUser.person.id
  );

  /**
     method will add an unread message into pull of unread messages
     **/
  const pushUnreadMessage = () => {
    if (!checkIfBottomScroll(".vue-recycle-scroller")) {
      websocketService.unreadMessages.value.push(message.id);
    }
  };

  /**
     Method will add a message into current user room which is selected before
     **/
  const pushMessagesIntoCurrentRoom = () => {
    websocketService.messages.value.push(message);
  };

  /**
     Method checks if user scroll position is gained the bottom
     **/
  const scrollOnMessage = () => {
    if (checkIfBottomScroll(".vue-recycle-scroller")) {
      scrollToBottom(".vue-recycle-scroller");
    }
  };

  /**
     Method add delay for message based on message affiliation
     **/
  const setDelayOnMessage = () => {
    const delay = ownMessage.value ? 0 : 500;
    setTimeout(() => {
      scrollOnMessage();
    }, delay);
  };

  /**
     FIX - for updating scroll (empty blocks)
     **/
  const addFakeMessageForRerender = () => {
    websocketService.messages.value.push({ ...message, id: generateID() });
    setTimeout(() => {
      websocketService.messages.value.splice(-1, 1); // timeouted remove of last item
    }, 0);
  };

  return {
    ownMessage,
    pushUnreadMessage,
    setDelayOnMessage,
    addFakeMessageForRerender,
    pushMessagesIntoCurrentRoom,
  };
};
