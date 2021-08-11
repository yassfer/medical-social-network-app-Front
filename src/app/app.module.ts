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
import { ChatBotComponent } from './pages/chat-bot/chat-bot.component';
import { ModalComponent } from './pages/icons/modal/modal.component';

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
  declarations: [AppComponent, AdminLayoutComponent, CreateChallengeComponent, CreateChallengeImageComponent, CheckMyChallengeComponent, ChatBotComponent, ModalComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
