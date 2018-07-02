import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReviewPickReturnPage } from './review-pick-return';

import { TooltipsModule } from 'ionic-tooltips';
@NgModule({
  declarations: [
    ReviewPickReturnPage
  ],
  imports: [
    IonicPageModule.forChild(ReviewPickReturnPage),
    TooltipsModule
  ],
})
export class ReviewPickReturnPageModule {}
