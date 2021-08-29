import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunitieslistComponent } from './communitieslist/communitieslist.component';
import { FormsModule }   from '@angular/forms';
import {RouterModule} from '@angular/router';
import { MDBBootstrapModule, ModalModule } from 'angular-bootstrap-md';
import { CommunitydetailsComponent } from './communitydetails/communitydetails.component';
import { CommunityServiceService } from './community-service.service';
import { CreateCommunityImageComponent } from './create-community-image/create-community-image.component';
import { CommunityupdateComponent } from './communityupdate/communityupdate.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AllCommunitiesComponent } from './all-communities/all-communities.component';
import { CommunityProfileComponent } from './community-profile/community-profile.component';


@NgModule({
  declarations: [
    CommunitieslistComponent,
    CommunitydetailsComponent,
    CreateCommunityImageComponent,
    CommunityupdateComponent,
    AllCommunitiesComponent,
    CommunityProfileComponent,
  ],
  imports: [
    CommonModule,
    FormsModule ,
    RouterModule,
    MDBBootstrapModule,
    MatDialogModule,
    ModalModule

  ],
  providers : [CommunityServiceService],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class CommunitiesModule { }
