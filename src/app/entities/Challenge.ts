import { User } from './User';

export class Challenge {
    id: number;
    nom: string;
    objectif: string;
    adminChallenge: User;
    pieceJoint?: File;
    image: any
}
