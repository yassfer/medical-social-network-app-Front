import { Comments } from "./Comments";
import { Community } from "./Community";
import { Liking } from "./liking";
import { PieceJoint } from "./PieceJoint";
import { User } from "./user";

export class PublicationCommunity {
  id : number ;
  content : String;
  dateCreation : Date;
  pieceJoints : PieceJoint[];
  likes : Liking[];
  comments: Comments[];
  NbrLike: number;
  user: User;
  approuve: boolean;
  community: Community;
  images: any;
}
