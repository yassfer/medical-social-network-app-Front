import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from "./app-routing.module";
import { ComponentsModule } from "./components/components.module";
import { CreateChallengeComponent } from './pages/challenge/create-challenge/create-challenge.component';
import { CreateChallengeImageComponent } from './pages/challenge/create-challenge-image/create-challenge-image.component';
import { CheckMyChallengeComponent } from './pages/challenge/check-my-challenge/check-my-challenge.component';
import { ChatBot1Component } from './pages/chat-bot/chat-bot.component';
import { ModalComponent } from './pages/publications/modal/modal.component';
import { PublicationChallengeComponent } from './pages/challenge/publication-challenge/publication-challenge.component';
import { CreatePublicationChallengeComponent } from './pages/challenge/create-publication-challenge/create-publication-challenge.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ApprouvePubChallengeComponent } from './pages/challenge/approuve-pub-challenge/approuve-pub-challenge.component';
import { ChatbotComponent } from './pages/chatbot/chatbot/chatbot.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    ToastrModule.forRoot()
  ],
  declarations: [AppComponent, AdminLayoutComponent, CreateChallengeComponent, CreateChallengeImageComponent, CheckMyChallengeComponent, ChatBot1Component,ChatbotComponent, ModalComponent, PublicationChallengeComponent, CreatePublicationChallengeComponent, LoginComponent, RegisterComponent, ApprouvePubChallengeComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
