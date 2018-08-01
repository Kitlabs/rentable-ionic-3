import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams,Tabs,Events } from 'ionic-angular';

import { ChatPage } from '../chat/chat';
import { Home } from '../home/home';
import { Myrent } from '../myrent/myrent';
import { AddPage } from '../add/add';
import { AlertsPage } from '../alerts/alerts';
import { Keyboard } from '@ionic-native/keyboard';
import { Storage } from '@ionic/storage';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';

@Component({
	selector: 'page-tab',
	templateUrl: 'tab.html'
})
export class TabPage {

	@ViewChild('tabs') tabRef: Tabs;
	tab1Root = Home;
	tab2Root = Myrent;
	tab3Root = AddPage;
	tab4Root = ChatPage;
	tab5Root = AlertsPage;
	myIndex:number;
	countCarItem:any;
	tabStatus:boolean=true;
	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public storage:Storage,
		public authprovier: AuthenticateProvider,
		public events: Events,
		public keyboard:Keyboard,
		private ev:Events) {
		this.myIndex = navParams.data.tabIndex || 0;
		this.countCarItem=null;
	}


	ionViewDidLoad(){
		console.log("ionViewDidLoad tab page");
	}

	ionViewDidEnter(){
		console.log("ionViewDidEnter tab page");
		this.ev.subscribe("messageCount",(count)=>{
			//alert('messageCount');
			if(count==0){
				this.countCarItem="1+";
			}else{
				this.countCarItem=null;
			}
			console.log("COUNT=",this.countCarItem);
		});	

		this.ev.subscribe("rentalCount",(count)=>{
			//alert('rentalCount');
			console.log('Count here ------'+count);
			if(count==0){
				this.countCarItem="1+";
			}else{
				this.countCarItem=null;
			}
			
			console.log("COUNT=",this.countCarItem);
		});

		this.ev.subscribe("counter",(count)=>{
			//alert('counter');
			if(count==0){
				this.countCarItem="1+";
			}else{
				this.countCarItem=null;
			}
			console.log("COUNT=",this.countCarItem);
		});


	}

	tabChanged($ev) {
		console.log("TAB CHANGED");

		this.events.subscribe('CARDSTATUS', (data) => {
			if(data==1){
				this.tabStatus=true;
			}else{
				this.tabStatus=false;
			}
		  });
		//  this.storage.set('CARD_STATUS',1);
		this.storage.get('CARD_STATUS').then((data)=>{
			console.log(data);
			if(data==0){
				console.log("CARDDdd");
				this.tabStatus=false;
			}
		});

		switch ($ev.tabTitle) {
			case "HOME":
				this.tabRef.select(0);
				break;
			case "ITEMS":
				this.tabRef.select(1);
				break;
			case "POST":
				this.tabRef.select(2);
				break;
			case "CHAT":
				this.countCarItem=null;
				this.tabRef.select(3);			
				break;
			default:
				break;
		}
		
	 }


}
