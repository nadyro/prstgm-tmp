import {Users} from "./Users";

export class ChatRequests {
  _id: string;
  roomId: string;
  clientIds: [];
  requester: Users;
  recipient: Users;
  creationDate: Date;
  fulfilled: boolean;
}
