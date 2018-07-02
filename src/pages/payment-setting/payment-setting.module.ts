import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentSettingPage } from './payment-setting';

@NgModule({
  declarations: [
    PaymentSettingPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentSettingPage),
  ],
})
export class PaymentSettingPageModule {}
