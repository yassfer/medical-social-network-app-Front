import { Publication } from "./publication";
import { User } from "./user";

export class Comments {
    id : number ;
    content : String ;
    date : Date ;
    publication : Publication;
    user : User;
}
