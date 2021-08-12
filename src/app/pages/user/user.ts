import { Byte } from "@angular/compiler/src/util";
import {  Community} from "../communities/community";

export class User 
{ public id :number;
    public firstname : String;
    public lastname : String;
    public username : String;
    public password: String;
    public mail :String;
    public birthdate : Date;
    public adresse : String;
    public image :Byte[];
    public profession : String;
    public professionalism : boolean;
    public communitiesParticipate : Set<Community>;


}
