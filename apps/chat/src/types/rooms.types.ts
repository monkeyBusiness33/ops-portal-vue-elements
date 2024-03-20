export interface IRoom {
  handling_request?: number;
  handling_request_url?: string;
  id: string;
  name: string;
  people: IPeople[];
  last_message: ILastMessage;
  latest_message_text: string;
  latest_message_timestamp: string;
  unread_messages: number;
  is_person_participant: boolean;
  is_deletable: boolean;
}

export interface IPeople {
  id: number;
  details: IDetails;
  initials: string;
}

export interface IDetails {
  contact_email: string;
  contact_phone: any;
  title: string;
  first_name: string;
  middle_name: any;
  last_name: string;
}

export interface ILastMessage {
  id: string;
  conversation: string;
  timestamp: string;
  author: IAuthor;
  content: string;
}

export interface IAuthor {
  id: number;
  details: IDetailsAuthor;
  initials: string;
  is_staff: boolean;
}

export interface IDetailsAuthor {
  contact_email: string;
  contact_phone: any;
  title: string;
  first_name: string;
  middle_name: any;
  last_name: string;
}
