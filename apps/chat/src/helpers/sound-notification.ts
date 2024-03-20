import newMessageAudio from "@/assets/audios/sound-notification.mp3";
import websocketService from "@/services/chat/websocket-chat";

const AUDIOS: {
  [key in string]: string;
} = {
  NEW_MESSAGE: newMessageAudio,
};

const audio = new Audio();
audio.autoplay = true;

export const soundNotify = (type = "NEW_MESSAGE") => {
  if (!websocketService.userSettings.value.chat_enable_sound_notification) {
    return;
  }

  audio.src = AUDIOS[type];
  audio.play();
};
