import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar } from 'ionic-angular';
import { ItemsProvider } from '../../providers/items/items';
import { Profile } from '../profile/profile';
import { SearchPage } from '../search/search';
import { Details } from '../details/details';
import { AlertsPage } from '../alerts/alerts';


/**
 * Generated class for the OpportunityPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-opportunity',
  templateUrl: 'opportunity.html',
})
export class OpportunityPage {

  @ViewChild(Navbar) navBar: Navbar;


	profile=Profile;
	search=SearchPage;
  details=Details;
  categorylist:Array<any>;
  itemlist:Array<any>;
  oneopp:any;
  alert=AlertsPage;
  constructor(public navCtrl: NavController, public navParams: NavParams, public itemprovider: ItemsProvider) {
    this.itemlist = [
      {img: 'assets/img/01.png', title: 'apartment', icon: 'ios-home-outline', price:'20'},
      {img: 'assets/img/02.png', title: 'wedding hall', icon: 'ios-bowtie-outline',price:'22'},
      {img: 'assets/img/03.png', title: 'shop', icon: 'ios-shirt-outline', price:'30'},
      {img: 'assets/img/04.png', title: 'rent', icon: 'ios-headset-outline', price:'20'},
      {img: 'assets/img/01.png', title: 'apartment', icon: 'ios-home', price:'27'},
      {img: 'assets/img/02.png', title: 'wedding hall', icon: 'ios-bowtie', price:'60'},
      {img: 'assets/img/03.png', title: 'shop', icon: 'md-cart', price:'39'},
      {img: 'assets/img/04.png', title: 'rent', icon: 'md-headset', price:'43'},
      {img: 'assets/img/01.png', title: 'apartment', icon: 'ios-home', price:'31'},
      {img: 'assets/img/02.png', title: 'wedding hall', icon: 'ios-bowtie', price:'34'},
      {img: 'assets/img/03.png', title: 'shop', icon: 'md-cart', price:'13'},
      {img: 'assets/img/04.png', title: 'rent', icon: 'md-headset', price:'20'}
    ]
    this.categorylist = [
      {active_img: 'assets/icon/cat-nearyou.png', title: 'Nearby', inactive_img: 'assets/icon/cat-nearyou-grey.png', value:'nearby'},
      {active_img: 'assets/icon/cat-electronics.png', title: 'Electronics', inactive_img: 'assets/icon/cat-electronics-grey.png', value:'electronics'},
      {active_img: 'assets/icon/cat-cars.png', title: 'Cars and motors', inactive_img: 'assets/icon/cat-cars-grey.png', value:'cars'},
      {active_img: 'assets/icon/cat-sports.png', title: 'Sports and leisure', inactive_img: 'assets/icon/cat-sports-grey.png', value:'sports'},
      {active_img: 'assets/icon/cat-home.png', title: 'Home and garden', inactive_img: 'assets/icon/cat-home-grey.png', value:'home'},
      {active_img: 'assets/icon/cat-movies.png', title: 'Movies and music', inactive_img: 'assets/icon/cat-movies-grey.png', value:'movies'},
      {active_img: 'assets/icon/cat-fashion.png', title: 'Fashion and accessories', inactive_img: 'assets/icon/cat-fashion-grey.png', value:'fashion'},
      {active_img: 'assets/icon/cat-baby.png', title: 'Baby and child', inactive_img: 'assets/icon/cat-baby-grey.png', value:'baby'},
      {active_img: 'assets/icon/cat-tools.png', title: 'Tools and machines', inactive_img: 'assets/icon/cat-tools-grey.png', value:'tools'},
      {active_img: 'assets/icon/cat-party.png', title: 'Party and Events', inactive_img: 'assets/icon/cat-party-grey.png', value:'party'},
      {active_img: 'assets/icon/cat-other.png', title: 'Other', inactive_img: 'assets/icon/cat-other-grey.png', value:'other'},
    ]
    this.oneopp=false;
    this.itemprovider.Getcurrentopputunity(localStorage.getItem('uid')).subscribe(data => {
      console.log(data);
    }, err =>{
      console.log(err);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchresultPagePage');
    this.navBar.backButtonClick = () => {
      ///here you can do wathever you want to replace the backbutton event
      this.navCtrl.setRoot(AlertsPage);
    };

  }

   myFunction(event){
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var parent = event.srcElement.parentElement;
    var preparent = parent.parentElement;
    console.log(preparent);
    var children = preparent.children;
    var count = children.length;
    console.log(count);
    for (var i = 0; i < count; ++i) {
      if(parent==children[i]){
        var image=this.categorylist[i].active_img;
        console.log(i);
        console.log(children[i].getElementsByTagName('img')[0].getAttribute("data-inactive"));
        children[i].getElementsByTagName('img')[0].setAttribute("src", image);
      }
      else{
        var inactiveimage=this.categorylist[i].inactive_img;
        children[i].getElementsByTagName('img')[0].setAttribute("src", inactiveimage);
      }
    }
  }

}
