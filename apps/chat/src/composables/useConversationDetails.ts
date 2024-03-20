import { IPeople, IRoom } from "@/types/rooms.types";
import websocketService from "@/services/chat/websocket-chat";
import { useUserStore } from "@/store/useUserStore";
import { computed } from "vue";
import chatService from "@/services/chat/chat";

export const useConversationDetails = (conversation: IRoom) => {
  /**
     Method set boolean value for "isUserInConversation" which is check if user is connected into current room
     **/
  const conversationAction = () => {
    const userStore = useUserStore();
    const getUserId = computed(() => userStore.getUser?.person?.id);
    websocketService.isUserInConversation.value = !!conversation.people.find(
      (el: IPeople) => el.id === getUserId.value
    );
    websocketService.peopleInRoom.value = conversation?.people;
  };

  /**
     Method update data for current room in rooms list
     **/
  const updateRoomInList = async (room: IRoom) => {
    const getCurrentRoomIndex = computed(() =>
      websocketService.rooms.value.findIndex((el) => el.id === room.id)
    );
    if (getCurrentRoomIndex.value !== -1) {
      websocketService.rooms.value[getCurrentRoomIndex.value] = room;
    } else {
      websocketService.rooms.value = await chatService.fetchConversations();
    }
  };

  return {
    updateRoomInList,
    conversationAction,
  };
};
