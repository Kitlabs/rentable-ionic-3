import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailsRentPage } from './details-rent';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { TooltipsModule } from 'ionic-tooltips';
@NgModule({
  declarations: [
    DetailsRentPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailsRentPage),
    IonicImageViewerModule,
    TooltipsModule,
  ],
})
export class DetailsRentPageModule {}
