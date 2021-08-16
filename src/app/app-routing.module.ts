import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { CommunityaddComponent } from "./pages/communities/communityadd/communityadd.component";
import { CommunitydetailsComponent } from "./pages/communities/communitydetails/communitydetails.component";
import { CommunitieslistComponent } from "./pages/communities/communitieslist/communitieslist.component";
import { CreateCommunityImageComponent } from "./pages/communities/create-community-image/create-community-image.component";
import { CommunityupdateComponent } from "./pages/communities/communityupdate/communityupdate.component";

const routes: Routes = [
  //{path : 'communities', component : CommunitieslistComponent},
  
       
       

{
  
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full"
  },
  {
    path: "",
    component: AdminLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () => import ("./layouts/admin-layout/admin-layout.module").then(m => m.AdminLayoutModule)
      }
    ]
  }, 
  {
    path: "**",
    redirectTo: "dashboard"
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
