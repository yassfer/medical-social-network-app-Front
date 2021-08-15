export class SignUpInfo {
    
    ////
    firstName : String;
    lastName : String;
    mail :String;
    username :String;
    password:String;
    birthDate:Date;
    address:String;
    //image :Blob;
    profession:String;
    professionnalisme: boolean;
    role: string[];
    ///

    constructor(firstName: string, lastName: string, mail: string, username:string, password: string,
        birthDate: Date, address: string, profession: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.mail = mail;
        this.username = username;
        this.password = password;
        this.username = username;
        this.birthDate = birthDate;
        this.address = address;
        this.profession = profession;
        this.professionnalisme = false;
        this.role = ['USER'];
    }
}