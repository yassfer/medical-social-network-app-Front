import { Liking } from "./liking";
import { Comments } from "./Comments";
import { PieceJoint } from "./PieceJoint";
import { User } from "./user";

export class Publication {
    id : number ;
    content : String;
    dateCreation : Date;
    pieceJoints : PieceJoint[];
    likes : Liking[];
    NbrLike: number;
    comment :Comments[] ;
    user: User;
    images: any;
}
