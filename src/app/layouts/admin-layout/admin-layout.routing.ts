import { Routes } from "@angular/router";

import { ChallengeComponent } from "../../pages/challenge/challenge.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { UserComponent } from "../../pages/user/user.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { TypographyComponent } from "../../pages/typography/typography.component";
import { CommunitieslistComponent } from "src/app/pages/communities/communitieslist/communitieslist.component";
// import { RtlComponent } from "../../pages/rtl/rtl.component";
import { CreateCommunityImageComponent } from "src/app/pages/communities/create-community-image/create-community-image.component";
import { CommunityupdateComponent } from "src/app/pages/communities/communityupdate/communityupdate.component";
import { CommunityaddComponent } from "src/app/pages/communities/communityadd/communityadd.component";
import { CommunitydetailsComponent } from "src/app/pages/communities/communitydetails/communitydetails.component";
import { AllCommunitiesComponent } from "src/app/pages/communities/all-communities/all-communities.component";

export const AdminLayoutRoutes: Routes = [
  { path: "challenge", component: ChallengeComponent },
 
  { path: "communities", component: CommunitieslistComponent },
  {path : 'communityadd' , component: CommunityaddComponent},
        {path : 'communitydetails/:id' , component: CommunitydetailsComponent},
        {path : "communityupdate/:id", component : CommunityupdateComponent},
        {path : 'CreateImage' , component: CreateCommunityImageComponent},
        {path : 'allcommunities' , component: AllCommunitiesComponent},
  
// import { RtlComponent } from "../../pages/rtl/rtl.component";

  { path: "icons", component: IconsComponent },
  { path: "notifications", component: NotificationsComponent },
  { path: "user", component: UserComponent },
  { path: "tables", component: TablesComponent },
  { path: "typography", component: TypographyComponent }
  // { path: "rtl", component: RtlComponent }
];
