import { User } from "./User";

export class Message {
  id :number;
  sender : number;
  receiver :number;
  content:string;
  timestamp : Date;
  senderUser: User;
}
