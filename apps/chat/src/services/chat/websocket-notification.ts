import { ref } from "vue";
import { getChatApiToken, getWebSocketBaseUrl } from "@/helpers/general";
import { websocketMessages } from "@/helpers/websocket-messages";

class websocketNotification {
  public socket = ref<any>();

  openNotificationSocket = async () => {
    this.socket.value = new WebSocket(
      `${getWebSocketBaseUrl()}/chat/ws/notifications/`
    );
    this.socket.value.onopen = (event: any): void => {
      console.log("SOCKET NOTIFICATION IS OPEN WITH MESSAGE", event);
    };

    this.socket.value.onmessage = (event: MessageEvent) => {
      console.log("SOCKET NOTIFICATION MESSAGE", JSON.parse(event.data));
      const currentTick = JSON.parse(event.data);
      websocketMessages(currentTick);
    };

    this.socket.value.onclose = (event: MessageEvent) => {
      console.log("SOCKET NOTIFICATION MESSAGE", event);
    };
  };
  closeNotification = () => {
    this.socket.value?.close();
  };
}

export default new websocketNotification();
