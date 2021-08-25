import { Routes } from "@angular/router";

import { ChallengeComponent } from "../../pages/challenge/challenge.component";
import { PublicationComponent } from "../../pages/publications/publication.component";
import { DonationsComponent } from "../../pages/donations/donations.component";
import { UserComponent } from "../../pages/user/user.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { TypographyComponent } from "../../pages/typography/typography.component";
import { CheckMyChallengeComponent } from "src/app/pages/challenge/check-my-challenge/check-my-challenge.component";
import { ChatBotComponent } from "src/app/pages/chat-bot/chat-bot.component";
import { PublicationChallengeComponent } from "src/app/pages/challenge/publication-challenge/publication-challenge.component";
import { CreatePublicationChallengeComponent } from "src/app/pages/challenge/create-publication-challenge/create-publication-challenge.component";
import { ApprouvePubChallengeComponent } from "src/app/pages/challenge/approuve-pub-challenge/approuve-pub-challenge.component";
//Communities
import { CommunitieslistComponent } from "src/app/pages/communities/communitieslist/communitieslist.component";
import { CreateCommunityImageComponent } from "src/app/pages/communities/create-community-image/create-community-image.component";
import { CommunityupdateComponent } from "src/app/pages/communities/communityupdate/communityupdate.component";
import { CommunitydetailsComponent } from "src/app/pages/communities/communitydetails/communitydetails.component";
import { AllCommunitiesComponent } from "src/app/pages/communities/all-communities/all-communities.component";
import { AuthGuard } from "src/app/auth/auth.guard";
import { HealthBotComponent } from "src/app/pages/chat-bot/health-bot/health-bot.component";
import { WorkoutBotComponent } from "src/app/pages/chat-bot/workout-bot/workout-bot.component";
import { AboutUsComponent } from "src/app/pages/about-us/about-us.component";
import { InvitationComponent } from "src/app/pages/invitation/invitation.component";
import { MessagerieComponent } from "src/app/pages/messagerie/messagerie/messagerie.component";
import { PartenaireComponent } from "src/app/pages/partenaires/partenaire.component";
import { ProfileComponent } from "src/app/pages/profile/profile.component";
import { UserProfileComponent } from "src/app/pages/user-profile/user-profile.component";
import { SponsoringComponent } from "src/app/pages/sponsoring/sponsoring.component";


export const AdminLayoutRoutes: Routes = [
  { path: "challenge", component: ChallengeComponent, canActivate: [AuthGuard]},
  { path: "challenge/myChallenges", component: CheckMyChallengeComponent, canActivate: [AuthGuard] },
  { path: "challenge/publications", component: PublicationChallengeComponent, canActivate: [AuthGuard] },
  { path: "challenge/create/publication", component: CreatePublicationChallengeComponent, canActivate: [AuthGuard] },
  { path: "challengePublications", component: ApprouvePubChallengeComponent, canActivate: [AuthGuard] },
  { path: "publications", component: PublicationComponent, canActivate: [AuthGuard] },
  { path: "user", component: UserComponent, canActivate: [AuthGuard] },
  { path: "tables", component: TablesComponent, canActivate: [AuthGuard] },
  { path: "typography", component: TypographyComponent, canActivate: [AuthGuard] },
  { path: "chatbot", component: ChatBotComponent, canActivate: [AuthGuard] },
  { path: "healthBot", component: HealthBotComponent, canActivate: [AuthGuard] },
  { path: "workoutBot", component: WorkoutBotComponent, canActivate: [AuthGuard] },
  { path: "invitations", component: InvitationComponent},
  { path: "about-us", component: AboutUsComponent},
  { path: "donations", component: DonationsComponent, canActivate: [AuthGuard]},
  { path: "partenaires", component: PartenaireComponent, canActivate: [AuthGuard]},
  { path: "sponsoring", component: SponsoringComponent, canActivate: [AuthGuard] },

  //Communities
  { path: "communities", component: CommunitieslistComponent, canActivate: [AuthGuard] },
  { path: 'communitydetails/:id', component: CommunitydetailsComponent, canActivate: [AuthGuard] },
  { path: "communityupdate/:id", component: CommunityupdateComponent, canActivate: [AuthGuard] },
  { path: 'CreateImage', component: CreateCommunityImageComponent, canActivate: [AuthGuard] },
  { path: 'allcommunities', component: AllCommunitiesComponent, canActivate: [AuthGuard] },
  //messagerie
  { path: 'messagerie', component: MessagerieComponent, canActivate: [AuthGuard] },
  //
  { path: "profile/:id", component: ProfileComponent, canActivate: [AuthGuard] },
  { path: "user-profile", component: UserProfileComponent, canActivate: [AuthGuard] }
];
