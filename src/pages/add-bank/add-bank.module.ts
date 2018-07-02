import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddBankPage } from './add-bank';

@NgModule({
  declarations: [
    AddBankPage,
  ],
  imports: [
    IonicPageModule.forChild(AddBankPage),
  ],
})
export class AddBankPageModule {}
