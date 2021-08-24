
export class Partenaire {
  id : number;
  nom : string;
  address : string;
  product:string;
  image :string;
  reduction :number;
  expiration:number;
  dateCreation :Date;
  restant:number;
  scoreReduct:number;
  code :string;


  constructor(id:number,nom: string,address:string,product:string,image:string,reduction :number,expiration:number,dateCreation:Date, restant:number,scoreReduct:number,code:string){
      this.id=id;
      this.nom = nom;
      this.address = address;
      this.product = product;
      this.image = image;
      this.reduction = reduction;
      this.expiration=expiration;
      this.dateCreation=dateCreation;
      this.restant=restant;
      this.scoreReduct=scoreReduct;
      this.code=code;
    }
}
