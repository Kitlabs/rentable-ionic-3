import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { ItemsProvider } from '../../providers/items/items';
import { AlertdetailPage } from '../alertdetail/alertdetail';
import { OpportunityPage } from '../opportunity/opportunity';


/*
  Generated class for the AlertsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-alerts',
  templateUrl: 'alerts.html'
})
export class AlertsPage {

	list: Array<any>;
	alertdetail=AlertdetailPage;
  opportunity=OpportunityPage;
  alertlist:Array<any>;
  alert_opportunity:String;
  alertview:any;
  itemdelete:any;
  categorylist:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private nativePageTransitions: NativePageTransitions,
    public itemprovider:ItemsProvider 
  ) {
  	this.list =
  	[
  		{alertname: 'John', history:'24', startprice:'20',lastprice:'30', distance: '10', startduration: 'July 1', lastduration:'July 10'},
			{alertname: 'name 2', history:'2', startprice:'40',lastprice:'50', distance: '20', startduration: 'July 6', lastduration:'July 14'},
			{alertname: 'name 3', history:'24',startprice:'24',lastprice:'32', distance: '30', startduration: 'July 14', lastduration:'July 23'},
  	]
    this.categorylist =
    [
      {alertname: 'John', history:'24', startprice:'20',lastprice:'30', distance: '10', startduration: 'July 1', lastduration:'July 10'},
      {alertname: 'name 2', history:'2', startprice:'40',lastprice:'50', distance: '20', startduration: 'July 6', lastduration:'July 14'},
      {alertname: 'name 3', history:'24',startprice:'24',lastprice:'32', distance: '30', startduration: 'July 14', lastduration:'July 23'},
    ]
    this.alert_opportunity="alert";
    this.itemprovider.Getalerthistory(localStorage.getItem('uid')).subscribe(data=>{

    }, err =>{

    });
    this.itemprovider.Getoppotunityhistory(localStorage.getItem('uid')).subscribe(data=>{

    }, err =>{

    });
    this.alertview=true;
    console.log("constructer");
    this.itemdelete=false
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlertsPagePage');
  }

  goalertview(){
    this.navCtrl.setRoot(AlertdetailPage);
  }

  goopportunityview(){
    this.navCtrl.setRoot(OpportunityPage);
  }

  showalert(){
    if(this.alert_opportunity=="alert"){
      this.alertview=true;
    }
    else this.alertview=false;
  }

  deletealert(n){
    for (var i = 0; i <this.list.length; i++) {
      if(this.list[i]==n){
        this.list.splice(i, 1);
      }
    }
  }

  deletecategory(n){
    for (var i = 0; i <this.categorylist.length; i++) {
      if(this.categorylist[i]==n){
        this.categorylist.splice(i, 1);
      }
    }
  }

}
