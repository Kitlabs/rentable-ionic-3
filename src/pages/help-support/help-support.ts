import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'
 


@IonicPage()
@Component({
  selector: 'page-help-support',
  templateUrl: 'help-support.html',
})
export class HelpSupportPage {
  information: any[];

  constructor(private navCtrl: NavController, private navParams: NavParams,private http: Http) {
    let localData = http.get('assets/faq.json').map(res => res.json().items);
    localData.subscribe(data => {
      this.information = data;
      console.log(data);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HelpSupportPage');

  }

  toggleSection(i) {
    this.information[i].open = !this.information[i].open;
  }
 
  toggleItem(i, j) {
    this.information[i].children[j].open = !this.information[i].children[j].open;
  }

}
