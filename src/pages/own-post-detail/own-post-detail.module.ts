import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OwnPostDetailPage } from './own-post-detail';
//For Tool Tip
import { TooltipsModule } from 'ionic-tooltips';
import { IonicImageViewerModule } from 'ionic-img-viewer';
@NgModule({
  declarations: [
    OwnPostDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(OwnPostDetailPage),
    IonicImageViewerModule,
    TooltipsModule,
    
  ],
})
export class OwnPostDetailPageModule {}
