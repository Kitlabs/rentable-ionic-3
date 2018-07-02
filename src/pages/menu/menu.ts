import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Nav } from 'ionic-angular';

import { TabPage } from '../tab/tab';

import { Home } from '../home/home';
import { RentPage } from '../rent/rent';
import { Likes } from '../likes/likes';
import { Profile } from '../profile/profile';
import { PaymentsPage } from '../payments/payments';
import { About } from '../about/about';
import { ContactPage } from '../contact/contact';
import { TcPage } from '../tc/tc';


export interface PageInterface {
  title: string;
  icon: string;
  index?: number;
  tabName?: string;
  tabComponent?: any;
}

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {

	rootPage=TabPage;

	@ViewChild(Nav) nav:Nav;

	/*pages: PageInterface[] = [
    { title: 'Home', name: 'TabPage',  tabComponent: Home, index: 0, icon: 'home' },
    { title: 'Profile', name: 'TabPage',  tabComponent: Profile, index: 1, icon: 'home' },
    { title: 'Payments', name: 'TabPage',  tabComponent: Payments, index: 2, icon: 'home' },
    { title: 'About', name: 'TabPage',  tabComponent: About, index: 3, icon: 'home' },
    { title: 'T&C', name: 'TabPage',  tabComponent: TcPage, index: 4, icon: 'home' },
    { title: 'Contact US', name: 'TabPage',  tabComponent: ContactPage, index: 5, icon: 'home' }
  ];*/

  pages: PageInterface[] = [
    { title: 'Home',  tabComponent: Home, index: 0, icon: 'home' },
    { title: 'Profile', tabComponent: Profile,   icon: 'home' },
    { title: 'Payments', tabComponent: PaymentsPage,  icon: 'home' },
    { title: 'About', tabComponent: About,  icon: 'home' },
    { title: 'T&C',tabComponent: TcPage, icon: 'home' },
    { title: 'Contact US', tabComponent: ContactPage,   icon: 'home' }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPagePage');
  }

  openPage(page:PageInterface) {
    let params= {};

    if (page.index) {
    	params = {tabIndex:page.index};
    }
    console.log(page.title + " rascal page");
    console.log(this.nav + " rascal nav");
    if (this.nav.getActiveChildNav() && page.index != undefined) {
    	this.nav.getActiveChildNav().select(page.index);
    }
    else{
      console.log(page.tabComponent + "rascal name");
      this.navCtrl.setRoot(page.tabComponent);
    }
  }

  isActive(page:PageInterface) {

  }

}
