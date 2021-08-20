import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { AdminLayoutRoutes } from "./admin-layout.routing";
<<<<<<< HEAD
import { HomeComponent } from "../../pages/home/home.component";
import { IconsComponent } from "../../pages/icons/icons.component";
=======
import { ChallengeComponent } from "../../pages/challenge/challenge.component";
import { PublicationComponent } from "../../pages/publications/publication.component";
>>>>>>> main
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { UserComponent } from "../../pages/user/user.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { TypographyComponent } from "../../pages/typography/typography.component";

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {MatIconModule} from '@angular/material/icon';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { CommunitiesModule } from "src/app/pages/communities/communities.module";
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    MDBBootstrapModule.forRoot(),
    MatIconModule,
    CommunitiesModule
  ],
  declarations: [
    HomeComponent,
    UserComponent,
    TablesComponent,
    PublicationComponent,
    TypographyComponent,
    NotificationsComponent
  ]
})
export class AdminLayoutModule {}
