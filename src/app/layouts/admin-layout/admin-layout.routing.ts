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

export const AdminLayoutRoutes: Routes = [
  { path: "challenge", component: ChallengeComponent },
  {path : 'CreateImage' , component: CreateCommunityImageComponent},
  { path: "communities", component: CommunitieslistComponent },
// import { RtlComponent } from "../../pages/rtl/rtl.component";

  { path: "icons", component: IconsComponent },
  { path: "notifications", component: NotificationsComponent },
  { path: "user", component: UserComponent },
  { path: "tables", component: TablesComponent },
  { path: "typography", component: TypographyComponent }
  // { path: "rtl", component: RtlComponent }
];
