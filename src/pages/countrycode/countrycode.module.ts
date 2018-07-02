import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CountrycodePage } from './countrycode';

@NgModule({
  declarations: [
    CountrycodePage,
  ],
  imports: [
    IonicPageModule.forChild(CountrycodePage),
  ],
})
export class CountrycodePageModule {}
