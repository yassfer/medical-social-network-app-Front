import { User } from "./User";

export class Entreprise {
  id : number;
  nom : string;
  address : string;
  product:string;
  image? :File;
  pieceJoint : any;
  expiration:Date;
  point :number;
  reduction :number;
  datecreation :Date;
  restant:number;
  scoreReduct:number;
  code :string;
  user : User;


  constructor(id:number,nom: string,address:string,product:string,image:File,expiration:Date,point :number,dateCreation:Date, restant:number,scoreReduct:number,code:string){
      this.id=id;
      this.nom = nom;
      this.address = address;
      this.product = product;
      this.image = image;
      this.point = point;
      this.expiration=expiration;
      this.datecreation=dateCreation;
      this.restant=restant;
      this.scoreReduct=scoreReduct;
      this.code=code;
    }





}

