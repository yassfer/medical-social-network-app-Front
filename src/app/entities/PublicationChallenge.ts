import { Challenge } from "./Challenge";
import { Liking } from "./liking";
import { PieceJoint } from "./PieceJoint";
import { User } from "./user";

export class PublicationChallenge {
  id : number ;
  content : String;
  dateCreation : Date;
  pieceJoints : PieceJoint[];
  likes : Liking[];
  NbrLike: number;
  user: User;
  approuve: boolean;
  challenge: Challenge;
  images: any;
  time: any;
}
