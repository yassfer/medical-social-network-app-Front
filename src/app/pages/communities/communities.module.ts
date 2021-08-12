import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunitieslistComponent } from './communitieslist/communitieslist.component';
import { CommunityaddComponent } from './communityadd/communityadd.component';
import { FormsModule }   from '@angular/forms';
import {RouterModule} from '@angular/router';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CommunitydetailsComponent } from './communitydetails/communitydetails.component';
import { CommunityServiceService } from './community-service.service';
import { CreateCommunityImageComponent } from './create-community-image/create-community-image.component';
import { CommunitypageComponent } from './communitypage/communitypage.component';


@NgModule({
  declarations: [
    CommunitieslistComponent,
    CommunityaddComponent,
    CommunitydetailsComponent,
    CreateCommunityImageComponent,
    CommunitypageComponent
  ],
  imports: [
    CommonModule,
    FormsModule ,
    RouterModule,
    MDBBootstrapModule

  ],
  providers : [CommunityServiceService],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class CommunitiesModule { }
