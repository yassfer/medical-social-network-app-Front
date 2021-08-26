import { User } from './User';
import { PublicationChallenge } from './PublicationChallenge';

export class Challenge {
    id: number;
    nom: string;
    objectif: string;
    adminChallenge: User;
    pieceJoint?: File;
    image: any;
    publicationChallenge: PublicationChallenge[];
    NbParticipant: number;
    createdAt: Date;
}
