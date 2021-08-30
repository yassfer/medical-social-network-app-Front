export class User {
  id : number ;
  firstName : String;
  lastName : String;
  mail :String;
  username :String;
  password:String;
  birthDate:Date;
  address:String;
  logo? :File;
  imageProfile: any;
  profession:String;
  professionnalisme:String;
  recommander: User;
  score: number;
  connected: boolean;
  myFriend: boolean;
  waiting: boolean;
  invited: boolean;
  nom: String;
  prenom: String;
  verified: boolean;
  type: boolean = false;
}
