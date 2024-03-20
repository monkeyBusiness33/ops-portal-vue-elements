export const EMenuActions = {
  REPLY: "reply",
  EDIT_MESSAGE: "edit-message",
  DELETE_MESSAGE: "delete-message",
  INVITE_USER: "invite-user",
  REMOVE_USER: "remove-user",
  DELETE_USER: "delete-user",
  DELETE_ROOM: "delete-room",
} as const;

export enum WS_TYPES {
  PEOPLE_ONLINE = "people_online",
  CHAT_MESSAGE_UPDATE = "chat_message_update",
  READ_MESSAGES = "read_messages",
  CONVERSATION_DETAILS = "conversation_details",
  RECENT_MESSAGES = "recent_messages",
  CHAT_MESSAGES = "chat_message",
  TYPING = "typing",
  CONVERSATION_DELETE = "conversation_delete",
  USER_SETTINGS = "user_settings",
}

export enum WS_CONNECTION {
  CONNECTING = 0,
  OPEN = 1,
  CLOSING = 2,
  CLOSED = 3,
}
