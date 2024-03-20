export interface IUser {
  token: string;
  user_id: number;
  email: string;
  username: string;
  title: any;
  fname: string;
  lname: string;
  person: IPerson;
  organisation: any;
  user_app_mode: string;
  user_app_perms: any;
}

export interface IPerson {
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
