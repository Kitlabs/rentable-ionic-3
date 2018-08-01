import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams,Tabs,Events,Platform } from 'ionic-angular';

import { ChatPage } from '../chat/chat';
import { Home } from '../home/home';
import { Myrent } from '../myrent/myrent';
import { AddPage } from '../add/add';
import { AlertsPage } from '../alerts/alerts';
import { Keyboard } from '@ionic-native/keyboard';
import { Storage } from '@ionic/storage';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';
import { ItemsProvider } from '../../providers/items/items';
import {FCM, NotificationData} from "@ionic-native/fcm";
import { Details } from '../details/details';
import { Badge } from '@ionic-native/badge';

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
	countCarItem:any = null;
	tabStatus:boolean=true;

	userId: any;
	messagenotify: number;
	rentalnotify: number;
	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		private platform: Platform, 
		public storage:Storage,
		public authprovier: AuthenticateProvider,
		public events: Events,
		public keyboard:Keyboard,
		public itemprovider: ItemsProvider,
		private ev:Events,
		private fcm: FCM,
		private badge:Badge) {
		this.myIndex = navParams.data.tabIndex || 0;
	}


	ionViewDidLoad(){
		console.log("ionViewDidLoad tab page");
		//alert('here tabs');
		if(localStorage.getItem('redirection')){
			this.navCtrl.push(Details,{
              itemId:parseInt(localStorage.getItem('redirection'))
            })
		}
		
	}

	ionViewDidEnter(){
		console.log("ionViewDidEnter tab page");
		this.ev.subscribe("messageCount",(count)=>{
			//alert('messageCount');
			//console.log(count);
			this.storage.get('userId').then((data)=>{
				this.userId=data;
				//console.log(this.userId)
				this.itemprovider.getChatListOwn(this.userId).subscribe(data =>{
					// console.log("DATA=",data);
					// console.log(data.json().IsRead);
					// console.log(this.countCarItem);
					if(data.json().IsRead != undefined){
						//console.log('messageCount if');
						this.messagenotify = 0;
						this.countCarItem="1+";
						//this.presentToast();
					}else{
							// console.log('messageCount else');
							// console.log(this.rentalnotify);
							
							this.messagenotify = 1;
							if(this.rentalnotify == 0){
								this.rentalnotify = 1;
								this.countCarItem="1+";
							}else{
								this.countCarItem=null;
							}
							//console.log(this.countCarItem);
					}
					},err=>{
					//console.log("error");
				});
			})
		})

		this.ev.subscribe("rentalCount",(count)=>{
			//alert('rentalCount');
			this.storage.get('userId').then((data)=>{
				this.userId=data;
			this.itemprovider.getChatListRent(this.userId).subscribe(data =>{
				// console.log("DATA=",data);
				// console.log(data.json().IsRead);
				// console.log(this.countCarItem);
				if(data.json().IsRead != undefined){
					this.rentalnotify = 0;
					//console.log('rentalCount if');
					this.countCarItem="1+";
				}else{
					//console.log('rentalCount else');
					this.badge.clear();
					// console.log(this.messagenotify);
					// console.log(this.countCarItem);
					this.rentalnotify = 1;
					if(this.messagenotify == 0){
						this.messagenotify = 1;
						this.countCarItem="1+";
					}else{
						this.countCarItem=null;
					}
					
				}
			  },
			  err=>{
				console.log("error");
			  });
			})
		})
		// this.ev.subscribe("messageCount",(count)=>{
		// 	console.log(this.rentalnotify);
		// 	if(count==0){
		// 		if(this.rentalnotify == 1){
		// 			this.messagenotify = 0;
		// 			this.countCarItem="1+";
		// 		}
		// 	}else{
		// 		this.messagenotify = 1;
		// 		this.countCarItem=null;
		// 	}
		// 	console.log("COUNT=",this.countCarItem);
		// });	

		// this.ev.subscribe("rentalCount",(count)=>{
		// 	console.log(this.messagenotify);
		// 	console.log('Count here ------'+count);
		// 	if(count==0){
		// 		if(this.messagenotify == 1){
		// 			this.rentalnotify = 0;
		// 		this.countCarItem="1+";
		// 		}
		// 	}else{
		// 		this.rentalnotify = 1;
		// 			this.countCarItem=null;
		// 	}
		// 	console.log("COUNT=",this.countCarItem);
		// });
		// this.ev.subscribe("counter",(count)=>{
		// 	//alert('counter');
		// 	if(count==0){
		// 		this.countCarItem="1+";
		// 	}else{
		// 		this.countCarItem=null;
		// 	}
		// 	console.log("COUNT=",this.countCarItem);
		// });
 

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
				// this.ev.publish('messageCount',0);
				// this.ev.publish('rentalCount',0);
				break;
			case "ITEMS":
				this.tabRef.select(1);
				this.ev.publish('messageCount',0);
				this.ev.publish('rentalCount',0);
				break;
			case "POST":
				this.tabRef.select(2);
				this.ev.publish('messageCount',0);
				this.ev.publish('rentalCount',0);
				break;
			case "CHAT":
				this.countCarItem=null;
				this.tabRef.select(3);			
				break;
			default:
				break;
		}
		
	 }

// registerNotification(){
// 	alert('registerNotification')
//     if (this.platform.is('cordova')) {
//       this.fcm.onNotification().subscribe(data=>{
//        // this.displayToast("message outside");
// 	       alert('tabs');
// 	       alert('postid'+data.PostId);  
//            alert(JSON.stringify(data));
//          console.log('datat'+data);
//         if(data.wasTapped){
//           console.log("Received in background");
//           this.navCtrl.push(Details,{
//           	itemId:data.PostId
//           })
          
//         }else {
//           console.log("Received in foreground");
//         };

//       });

//    }
//   }


}
