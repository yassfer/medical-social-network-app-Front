import { User } from "./User";

export class Community {
    public id : number;
    public nom : String;
    public domaine : String;
    public amid_comm : User;
    public piecejointe : any;
    public image? : File;
    public participants : Set<User>;
    public type : String;
    public description : String;
    public followed : boolean;
}
