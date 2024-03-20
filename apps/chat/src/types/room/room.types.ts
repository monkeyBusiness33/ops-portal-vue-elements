import { EMenuActions } from "@/types/general.types";
import { IAuthor } from "@/types/rooms.types";

type TypeUnion = (typeof EMenuActions)[keyof typeof EMenuActions];

export interface IMenuActions {
  id: string;
  title: string;
  emitAction: TypeUnion;
}

export interface IMessageRoom {
  type: string;
  data: IDataMessageRoom;
  time: Date;
  isOwn: boolean;
  messageReactions: IMessageReaction[];
  showTimeLabel: boolean;
}

export interface IDataMessageRoom {
  text: string;
}

export interface IEmoji {
  emoji: string;
  unicode: string;
}

export interface IMessageReaction {
  reaction: string;
  count: number;
  user_id: string | number | undefined;
  reaction_id: string;
}

export interface IRecentMessages {
  type: string;
  messages: IMessage[];
  has_more: boolean;
}

export interface IMessage {
  id: string;
  conversation: string;
  timestamp: string;
  author: IAuthor;
  content: string;
  is_read: boolean;
  seen_by: number[];
}
