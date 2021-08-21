import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { AdminLayoutRoutes } from "./admin-layout.routing";
import { ChallengeComponent } from "../../pages/challenge/challenge.component";
import { PublicationComponent } from "../../pages/publications/publication.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { UserComponent } from "../../pages/user/user.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { TypographyComponent } from "../../pages/typography/typography.component";

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {MatIconModule} from '@angular/material/icon';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { CommunitiesModule } from "src/app/pages/communities/communities.module";
import { HealthBotComponent } from "src/app/pages/chat-bot/health-bot/health-bot.component";

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
    ChallengeComponent,
    UserComponent,
    TablesComponent,
    PublicationComponent,
    TypographyComponent,
    NotificationsComponent
  ],
  providers: [HealthBotComponent]
})
export class AdminLayoutModule {}
