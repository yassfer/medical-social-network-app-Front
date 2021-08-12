import {User} from "../user/user";
export class Community {
    public id : number;
    public nom : String;
    public domaine : String;
    //public amid_comm : User;
    public piecejointe : any;
    public Image? : File;
    public participants : Set<User>;
    public type : String;
}
