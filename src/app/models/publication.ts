import { Liking } from "./liking";
import { Comment } from "./comment";

export class Publication {
    id : number ;
    content : String;
    dateCreation : Date;
    pieceJoint : Blob;
    likes : Liking
    comments :Comment ;
}
