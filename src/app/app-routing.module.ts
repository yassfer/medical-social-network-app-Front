import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { CommunityaddComponent } from "./pages/communities/communityadd/communityadd.component";
import { CommunitydetailsComponent } from "./pages/communities/communitydetails/communitydetails.component";
import { CommunitieslistComponent } from "./pages/communities/communitieslist/communitieslist.component";
import { CreateCommunityImageComponent } from "./pages/communities/create-community-image/create-community-image.component";
import { CommunitypageComponent } from "./pages/communities/communitypage/communitypage.component";

const routes: Routes = [
  //{path : 'communities', component : CommunitieslistComponent},
  {path : 'communityadd' , component: CommunityaddComponent},
        {path : 'communitydetails/:id' , component: CommunitydetailsComponent},
        {path : 'Communitypage' , component: CommunitypageComponent},
       
       

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
