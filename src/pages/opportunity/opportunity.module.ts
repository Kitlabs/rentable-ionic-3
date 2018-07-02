import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OpportunityPage } from './opportunity';

@NgModule({
  declarations: [
    OpportunityPage,
  ],
  imports: [
    IonicPageModule.forChild(OpportunityPage),
  ],
})
export class OpportunityPageModule {}
