import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Filter } from '../filter/filter';
import { Details } from '../details/details';


@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class List {

  list: Array<any>;
  details = Details;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    this.list=[{img: 'assets/img/11.png', title: 'Stylish house'}, {img: 'assets/img/22.png', title: 'Big Houses'}, {img: 'assets/img/33.png', title: 'Big Houses'}, {img: 'assets/img/11.png', title: 'Stylish house'},{img: 'assets/img/11.png', title: 'Stylish house'}, {img: 'assets/img/22.png', title: 'Big Houses'}, {img: 'assets/img/33.png', title: 'Big Houses'}, {img: 'assets/img/11.png', title: 'Stylish house'}]
  }

  presentFilterModal() {
   let FilterModal = this.modalCtrl.create(Filter, { userId: 8675309 });
   FilterModal.present();
 }

}