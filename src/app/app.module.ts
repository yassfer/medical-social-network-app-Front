import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from "./app-routing.module";
import { ComponentsModule } from "./components/components.module";
import { CheckMyChallengeComponent } from './pages/challenge/check-my-challenge/check-my-challenge.component';
import { ChatBotComponent } from './pages/chat-bot/chat-bot.component';
import { PublicationChallengeComponent } from './pages/challenge/publication-challenge/publication-challenge.component';
import { CreatePublicationChallengeComponent } from './pages/challenge/create-publication-challenge/create-publication-challenge.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ApprouvePubChallengeComponent } from './pages/challenge/approuve-pub-challenge/approuve-pub-challenge.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { HealthBotComponent } from './pages/chat-bot/health-bot/health-bot.component';
import { WorkoutBotComponent } from './pages/chat-bot/workout-bot/workout-bot.component';
import { httpInterceptorProviders } from "./auth/auth-interceptor";
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { InvitationComponent } from './pages/invitation/invitation.component';
import { DiscussionComponent } from './pages/messagerie/discussion/discussion.component';
import { MessagerieComponent } from './pages/messagerie/messagerie/messagerie.component';
import { PartenaireComponent } from './pages/partenaires/partenaire.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SponsoringComponent } from './pages/sponsoring/sponsoring.component';
import { RoutinesBotComponent } from './pages/chat-bot/routines-bot/routines-bot.component';
import { DietBotComponent } from './pages/chat-bot/diet-bot/diet-bot.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    Ng2SearchPipeModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    CheckMyChallengeComponent,
    ChatBotComponent,
    PublicationChallengeComponent,
    CreatePublicationChallengeComponent,
    LoginComponent,
    RegisterComponent,
    ApprouvePubChallengeComponent,
    UserProfileComponent,
    HealthBotComponent,
    WorkoutBotComponent,
    AboutUsComponent,
    InvitationComponent,
    DiscussionComponent,
    MessagerieComponent,
    PartenaireComponent,
    ProfileComponent,
    SponsoringComponent,
    RoutinesBotComponent,
    DietBotComponent
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {}
