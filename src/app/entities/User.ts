export class User {
  id : number ;
  firstName : String;
  lastName : String;
  mail :String;
  username :String;
  password:String;
  birthDate:Date;
  address:String;
  image? :File;
  imageProfile: string;
  profession:String;
  professionnalisme:String;
  recommander: User;
  score: number;
  connected: boolean;
}
