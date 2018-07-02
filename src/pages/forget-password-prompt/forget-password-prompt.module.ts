import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForgetPasswordPromptPage } from './forget-password-prompt';

@NgModule({
  declarations: [
    ForgetPasswordPromptPage,
  ],
  imports: [
    IonicPageModule.forChild(ForgetPasswordPromptPage),
  ],
})
export class ForgetPasswordPromptPageModule {}
