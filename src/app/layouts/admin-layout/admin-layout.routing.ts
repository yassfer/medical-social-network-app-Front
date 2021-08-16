import { Routes } from "@angular/router";

import { ChallengeComponent } from "../../pages/challenge/challenge.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { UserComponent } from "../../pages/user/user.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { TypographyComponent } from "../../pages/typography/typography.component";
import { CreateChallengeComponent } from "src/app/pages/challenge/create-challenge/create-challenge.component";
import { CreateChallengeImageComponent } from "src/app/pages/challenge/create-challenge-image/create-challenge-image.component";
import { CheckMyChallengeComponent } from "src/app/pages/challenge/check-my-challenge/check-my-challenge.component";
import { ChatBotComponent } from "src/app/pages/chat-bot/chat-bot.component";
import { ModalComponent } from "src/app/pages/icons/modal/modal.component";
import { PublicationChallengeComponent } from "src/app/pages/challenge/publication-challenge/publication-challenge.component";
import { CreatePublicationChallengeComponent } from "src/app/pages/challenge/create-publication-challenge/create-publication-challenge.component";
import { ApprouvePubChallengeComponent } from "src/app/pages/challenge/approuve-pub-challenge/approuve-pub-challenge.component";

export const AdminLayoutRoutes: Routes = [
  { path: "challenge", component: ChallengeComponent },
  { path: "challenge/create", component: CreateChallengeComponent },
  { path: "challenge/create/image", component: CreateChallengeImageComponent },
  { path: "challenge/myChallenges", component: CheckMyChallengeComponent },
  { path: "challenge/publications", component: PublicationChallengeComponent },
  { path: "challengePublications", component: ApprouvePubChallengeComponent },
  { path: "challenge/create/publication", component: CreatePublicationChallengeComponent },
  { path: "icons", component: IconsComponent },
  { path: "publication/create/image", component: ModalComponent },
  { path: "notifications", component: NotificationsComponent },
  { path: "user", component: UserComponent },
  { path: "tables", component: TablesComponent },
  { path: "typography", component: TypographyComponent },
  { path: "chat", component: ChatBotComponent }
];
