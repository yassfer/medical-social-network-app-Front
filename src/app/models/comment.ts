import { Publication } from "./publication";
import { User } from "./user";

export class Comment {
    id : number ;
    content : String ;
    date : Date ;
    publication : Publication;
    user : User;
}
