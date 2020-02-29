import {Users} from "./Users";

export class Message {
  _id: string;
  content: string;
  sender: Users;
  receptionDate: Date;
}
