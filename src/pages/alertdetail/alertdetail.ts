import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ModalController, Navbar } from 'ionic-angular';
import { ItemsProvider } from '../../providers/items/items';

import { FormGroup, FormControl } from '@angular/forms';
import { MapModal } from '../modal-page/modal-page';
import { AlertsPage } from '../alerts/alerts';
/*
  Generated class for the AlertdetailPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-alertdetail',
  templateUrl: 'alertdetail.html'
})
export class AlertdetailPage {
  @ViewChild(Navbar) navBar: Navbar;
  
  alertlist:Array<any>;
	map=MapModal;
	datePeriod:any;
  alert=AlertsPage;
  within:any;
  alerttitle:any;
  titlenumber:any;
  showfromprice: boolean = false;
  showtoprice: boolean=false;
  category:any;
  sortby:any;
  pricefrom:any;
  priceto:any;
  distance:any;
  location:any;
  date:any;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams, public itemprovider: ItemsProvider) {
  	this.alertlist = [
      {active_img: 'assets/icon/cat-nearyou-red.png', title: 'Nearby', inactive_img: 'assets/icon/cat-nearyou-grey.png', value:'nearby',radionumber:'alertradio1'},
      {active_img: 'assets/icon/cat-electronics-red.png', title: 'Electronics', inactive_img: 'assets/icon/cat-electronics-grey.png', value:'electronics',radionumber:'alertradio2'},
      {active_img: 'assets/icon/cat-cars-red.png', title: 'Cars and motors', inactive_img: 'assets/icon/cat-cars-grey.png', value:'cars',radionumber:'alertradio3'},
      {active_img: 'assets/icon/cat-sports-red.png', title: 'Sports and leisure', inactive_img: 'assets/icon/cat-sports-grey.png', value:'sports',radionumber:'alertradio4'},
      {active_img: 'assets/icon/cat-home-red.png', title: 'Home and garden', inactive_img: 'assets/icon/cat-home-grey.png', value:'home',radionumber:'alertradio5'},
      {active_img: 'assets/icon/cat-movies-red.png', title: 'Movies and music', inactive_img: 'assets/icon/cat-movies-grey.png', value:'movies',radionumber:'alertradio6'},
      {active_img: 'assets/icon/cat-fashion-red.png', title: 'Fashion and accessories', inactive_img: 'assets/icon/cat-fashion-grey.png', value:'fashion',radionumber:'alertradio7'},
      {active_img: 'assets/icon/cat-baby-red.png', title: 'Baby and child', inactive_img: 'assets/icon/cat-baby-grey.png', value:'baby',radionumber:'alertradio8'},
      {active_img: 'assets/icon/cat-tools-red.png', title: 'Tools and machines', inactive_img: 'assets/icon/cat-tools-grey.png', value:'tools',radionumber:'alertradio9'},
      {active_img: 'assets/icon/cat-party-red.png', title: 'Party and Events', inactive_img: 'assets/icon/cat-party-grey.png', value:'party',radionumber:'alertradio10'}
    ]

    this.alerttitle="";
    this.titlenumber=50;
	}

	ionViewDidLoad() {
    this.navBar.backButtonClick = () => {
      this.navCtrl.setRoot(AlertsPage);
    };
  }

  presentModal() {
    let modal = this.modalCtrl.create(MapModal);
    modal.present();
  }

  fromprice(){

  }

  toprice(){

  }

  number(){
    var n=this.alerttitle.length;
    this.titlenumber=50-n;
  }

 myFunction(event){
    var target = event.target || event.srcElement || event.currentTarget;
    console.log(event.srcElement + " event.srcElement");
    var parent = event.srcElement.parentElement;
    console.log(parent + " parent");
    var preparent = parent.parentElement;
    var divparent = preparent.parentElement;
    var children = divparent.children;
    console.log(preparent + " preparent");
    var count = children.length;
    console.log(count + "count");
    for (var i = 0; i < count; ++i) {
      if(preparent==children[i]){
        var image=this.alertlist[i].active_img;
        this.category=this.alertlist[i].value;
        console.log(children[i].getElementsByTagName('label')[0].getElementsByTagName('img')[0] + "children[i]");
        children[i].getElementsByTagName('label')[0].getElementsByTagName('img')[0].setAttribute("src", image);
      }
      else{
        var inactiveimage=this.alertlist[i].inactive_img;
        children[i].getElementsByTagName('label')[0].getElementsByTagName('img')[0].setAttribute("src", inactiveimage);
      }
    }
  }

  alertsave(){
    console.log(this.within);
     this.itemprovider.Alertsave(this.alerttitle, this.category, this.location, this.date, this.fromprice, this.toprice, this.distance, this.within, this.sortby);
  }

}
