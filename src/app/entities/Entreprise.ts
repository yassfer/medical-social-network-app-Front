import { User } from "./User";

export class Entreprise {
    id : number;
    nom : string;
    address : string;
    product : string;
    image?: File;
    pieceJoint : any;
    expiration : Date;
    code : string;
    reduction : number;
    user : User;
    datecreation : Date;

}
