export class Notification {
    id :number;
    content : string;
    idu :number;
    timestamp : Date;
    constructor( content : string,idu :number,timestamp : Date){
        this.content = content;
        this.idu = idu;
        this.timestamp = timestamp;
      }

}
