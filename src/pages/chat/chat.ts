import { Component } from '@angular/core';
import { NavController, NavParams,Events,AlertController } from 'ionic-angular';
import { ItemsProvider } from '../../providers/items/items';
import { Observable } from 'rxjs/Observable';
import { ChatdetailPage } from '../chatdetail/chatdetail';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';
import { ChatProvider } from '../../providers/chat/chat';
import { AngularFireDatabase } from 'angularfire2/database';
import { RentPage } from '../../pages/rent/rent';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})
export class ChatPage {

  ownlist: Array<any>;
  rentlist: Array<any>;
	rentalRequestList:Array<any>;
  chatdetails=ChatdetailPage;
  own_rent:string="own";
  itemdelete:any;
  chatlist:Array<any>;
  uid:any;
  availableListNotFound:boolean;
  basePath:string;
  postId:any;
  dataToSend:any;
  NotAgree: any = null;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public itemprovider: ItemsProvider,
              public alertCtrl:AlertController,
              public authprovider: AuthenticateProvider,
              public chatprovider: ChatProvider,
              public af:AngularFireDatabase,
              public ev:Events,
              public storage:Storage) {
              // alert('chat ggj');
              
    this.rentalRequestList=[];
    this.ownlist=[];
    this.rentlist=[];
    
   /* this.onelist =
  	[
  		{img: 'assets/img/11.png', title: 'John', item_title:'house', history:'2 days ago'},
  	 	{img: 'assets/img/22.png', title: 'sizza', item_title:'apple', history:'3 days ago'},
  	 	{img: 'assets/img/33.png', title: 'jonathan', item_title:'nut', history:'3 days ago'},
  	 	{img: 'assets/img/11.png', title: 'Josh', item_title:'pear', history:'5 days ago'},
  	 	{img: 'assets/img/11.png', title: 'Joseph', item_title:'TV', history:'9 days ago'}
  	]

    this.chatlist=[];

    this.uid=localStorage.getItem('uid');
    this.chatprovider.getChats()
    .subscribe(chats => {
      this.chatlist = chats.map(users => {
        return users.map(user => {
          user.info = this.af.object(`/users/${user.$key}`);
          console.log(" user infor ",user );
          return user;
        });
      });
    });

    this.rentlist =
    [
      {img: 'assets/img/22.png', title: 'John', item_title:'house', history:'2 days ago'},
      {img: 'assets/img/33.png', title: 'Jane', item_title:'apple', history:'4 days ago'},
      {img: 'assets/img/11.png', title: 'Eric', item_title:'nut', history:'6 days ago'},
      {img: 'assets/img/22.png', title: 'Joseph', item_title:'pear', history:'7 days ago'},
      {img: 'assets/img/33.png', title: 'Joans', item_title:'TV', history:'8 days ago'}
    ]
    
    this.itemprovider.Getchatitems(localStorage.getItem('uid')).subscribe(data =>{
      console.log();
    },err=>{
      console.log();
    })

    this.itemdelete=false;*/

    this.availableListNotFound=false;
  }

  ionViewDidEnter() {
    this.rentalRequestList=[];
    this.ev.publish("message","");
    //this.ev.publish("rentalCount",0)

    this.getUserId().then(
      uid=>{
        this.uid=uid;
        this.getChatListOwn();
        this.getChatListRent();
      }
      );
      if(localStorage.getItem('bothNotAgree')){
        console.log(localStorage.getItem('bothNotAgree'));
        this.NotAgree = JSON.parse(localStorage.getItem('bothNotAgree'));
     }else{
      this.NotAgree = null;
     }
      this.clearPostDetails();
  }

  clearPostDetails(){
    console.log("clearPostDetails");
    this.storage.get('postid').then((id)=>{
			if(id){
				this.storage.set('postid',null);
				this.storage.set('image',null);
				this.storage.set("status","false");
				this.storage.set("itemTitle",null);
				this.storage.set("itemCategory",null);
				this.storage.set("itemConditionMark",null);
				this.storage.set("itemConditionTitle",null);
				this.storage.set("dailyPrice",null); 
				this.storage.set("fairPrice",null);
				this.storage.set("distance",null);
				//console.log("adfadsfasdfasdf");
			}
    });
  }

  getChatListOwn(){
    console.log("Call is received to get list of chat list i own");
    this.itemprovider.getChatListOwn(this.uid).subscribe(data =>{
      if(data.json().msg=="success"){
          console.log(data.json());
          console.log(data.json().IsRead);
          if(data.json().IsRead != undefined){
            this.ev.publish("messageCount",0);
           }else{
            this.ev.publish("messageCount",1);
           }
          this.basePath=data.json().base_path;
          this.ownlist = null;
          this.ownlist = [];
          data.json().PostData.forEach(element => {
            console.log(element);
            console.log(element.IsDeletedFromId);
            if(element.IsDeletedToId == "No"){
              this.ownlist.push(element);
            }
          });
         // this.ownlist=data.json().PostData;
       }else{
        this.ownlist = null;
        this.ownlist = [];
        console.log(this.ownlist.length);
       }
    },
    err=>{
      console.log("error");
    });
  }

  getChatListRent(){
    console.log("Call is received to get list of chat list i rent");
    this.itemprovider.getChatListRent(this.uid).subscribe(data =>{
      if(data.json().msg=="success"){
          console.log(data.json());
          console.log(data.json().IsRead);
           if(data.json().IsRead != undefined){
            this.ev.publish("rentalCount",0);
           }else{
            this.ev.publish("rentalCount",1);
           }
          this.basePath=data.json().base_path;
          console.log(data.json().PostData);
          this.rentlist = null;
          this.rentlist = [];
          data.json().PostData.forEach(element => {
            console.log(element);
            console.log(element.IsDeletedFromId);
            if(element.IsDeletedFromId == "No"){
              
              this.rentlist.push(element);
            }
          });
          //this.rentlist=data.json().PostData;
        }else{
          this.rentlist = null;
          this.rentlist = [];
        }
    },
    err=>{
      console.log("error");
    });
  }


  deleteIownChatList(renterId,itemStatus,itemId,fromid,toid,ReturnAgreeWithRating){
    console.log(fromid);
    console.log(toid);
    console.log(itemStatus);
    console.log(ReturnAgreeWithRating);
    console.log("Call is received to delete item from own chat list"+renterId+"|"+itemStatus);
    if(ReturnAgreeWithRating == "none"){
      let alert = this.alertCtrl.create({
        title: 'Sorry',
        message: "You can not delete the chat list at this stage, as the product might be rented or there is a pending action",
        buttons: [
          {
            text: 'OK',
            role: 'cancel',
            handler: () => {
            }
          }
        ]
      });
      alert.present();
    }else{
// if(itemStatus == '' || itemStatus =="Pending" || itemStatus =='Rejected' || itemStatus == 'Returned' || itemStatus == 'Cancel'){
    if(itemStatus =='Rejected' || itemStatus == 'Returned' || itemStatus == 'Cancel'){
      //can delete item
      let alert = this.alertCtrl.create({
        title: 'Confirm',
        message: "Do you want to delete",
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            handler: () => {
            }
          },
          {
            text: 'Yes',
            handler: () => {
               this.itemprovider.DeleteChatItem(renterId,this.uid,itemId,fromid,toid).subscribe(data =>{
               if(data.json().msg=="success"){
                 //this.DeletePreviousChat(this.uid,renterId,itemId);
                 this.getChatListOwn();
               }
             },
             err=>{
               console.log("error");
             });
            }
          }
        ]
      });
      alert.present();

    }else{
      let alert = this.alertCtrl.create({
        title: 'Sorry',
        message: "You can not delete the chat list at this stage, as the product might be rented or there is a pending action",
        buttons: [
          {
            text: 'OK',
            role: 'cancel',
            handler: () => {
            }
          }
        ]
      });
      alert.present();
    }
  }
   
  }

  deleteIrentChatList(ownerId,itemStatus,itemId,fromid,toid,ReturnAgreeWithRating){
    console.log(fromid);
    console.log(toid);
   console.log(ReturnAgreeWithRating);
    console.log("Call is received to delete item from rent chat list"+ownerId+"|"+itemStatus);
    if(ReturnAgreeWithRating == "none"){
      let alert = this.alertCtrl.create({
        title: 'Sorry',
        message: "You can not delete the chat list at this stage, as the product might be rented or there is a pending action",
        buttons: [
          {
            text: 'OK',
            role: 'cancel',
            handler: () => {
            }
          }
        ]
      });
      alert.present();
    }else{
//if(itemStatus == '' || itemStatus =='Pending' || itemStatus =='Rejected' || itemStatus == 'Returned' || itemStatus == 'Cancel'){
    if(itemStatus =='Rejected' || itemStatus == 'Returned' || itemStatus == 'Cancel'){
      //can delete item
      let alert = this.alertCtrl.create({
        title: 'Confirm',
        message: "Do you want to delete",
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            handler: () => {
   
            }
          },
          {
            text: 'Yes',
            handler: () => {
               this.itemprovider.DeleteChatItemRent(this.uid,ownerId,itemId,fromid,toid).subscribe(data =>{
               if(data.json().msg=="success"){
                //this.DeletePreviousChat(this.uid,ownerId,itemId);
                 this.getChatListRent();
               }
             },
             err=>{
               console.log("error");
             });
            }
          }
        ]
      });
      alert.present();
      
    }else{
      let alert = this.alertCtrl.create({
        title: 'Sorry',
        message: "You can not delete the chat list at this stage, as the product might be rented or there is a pending action",
        buttons: [
          {
            text: 'OK',
            role: 'cancel',
            handler: () => {
            }
          }
        ]
      });
      alert.present();
    }
  }
  }

  getUserId():any{
    return this.storage.get('userId').then((uid)=>{
        return uid;
    });
  }

  goToAcceptRejectPage(requesterId,requestedItemId){
    // this.navCtrl.push(RentPage,{
    //   requesterId:requesterId,
    //   requestedItemId:requestedItemId
    // });
    
    //this.chatdetail(requesterId);
  }

  delete(){
    this.itemdelete=!this.itemdelete;
  }

  deleteown(n){

    for (var i = 0; i <this.ownlist.length; i++) {

        console.log(this.ownlist[i]);
      if(this.ownlist[i].PostId==n){
          this.ownlist.splice(i, 1);
        }
    }

  }

  deleterent(n){
    console.log('n ++', n);
    for (var i = 0; i <this.rentlist.length; i++) {
      if(this.rentlist[i]==n){
        this.rentlist.splice(i, 1);
      }
    }
  }

  //item.FromDate,item.ToDate,item.Amount,item.itemOwnerFee,item.AdminFee,item.rentableServiceFee,item.needDelivery
  goToIOwnChatDetails(reqUserId,itemId,itemTitle,itemImage,reqUserImage,dailyRentPrice,oItemStatus,rItemStatus,fromDate,toDate,amount,itemOwnerFee,adminFee,rentableServiceFee,rentalCostWithoutFee,needDelivery,IsDeletedFromId,IsDeletedToId){
    console.log("Call is received to switch to own chat details");

    this.dataToSend={
      uid:this.uid,
      reqUserId:reqUserId,
      itemId:itemId,
      itemTitle:itemTitle,
      itemImage:itemImage,
      reqUserImage:reqUserImage,
      basePath:this.basePath,
      rentPrice:dailyRentPrice,
      status:'iown',
      oItemStatus:oItemStatus,
      rItemStatus:rItemStatus,
      fromDate:fromDate,
      toDate:toDate,
      amount:amount,
      itemOwnerFee:itemOwnerFee,
      adminFee:adminFee,
      rentableServiceFee:rentableServiceFee,
      rentalCostWithoutFee:rentalCostWithoutFee,
      needDelivery:needDelivery,
      DeletedFromId:IsDeletedFromId,
      DeletedToId:IsDeletedToId
    };    
    this.navCtrl.push(ChatdetailPage,{param:JSON.stringify(this.dataToSend)});
  }


  goToIRentChatDetails(reqUserId,itemId,itemTitle,itemImage,reqUserImage,dailyRentPrice,oItemStatus,rItemStatus,fromDate,toDate,amount,itemOwnerFee,adminFee,rentableServiceFee,rentalCostWithoutFee,needDelivery,IsDeletedFromId,IsDeletedToId){
    console.log("Call is received to switch to rent chat details");
    this.dataToSend={
      uid:this.uid,
      reqUserId:reqUserId,
      itemId:itemId,
      itemTitle:itemTitle,
      itemImage:itemImage,
      reqUserImage:reqUserImage,
      basePath:this.basePath,
      rentPrice:dailyRentPrice,
      status:'irent',
      oItemStatus:oItemStatus,
      rItemStatus:rItemStatus,
      fromDate:fromDate,
      toDate:toDate,
      amount:amount,
      itemOwnerFee:itemOwnerFee,
      adminFee:adminFee,
      rentableServiceFee:rentableServiceFee,
      rentalCostWithoutFee:rentalCostWithoutFee,
      needDelivery:needDelivery,
      DeletedFromId:IsDeletedFromId,
      DeletedToId:IsDeletedToId

  };    
    this.navCtrl.push(ChatdetailPage,{param:JSON.stringify(this.dataToSend)});
  }

  chatdetail(key){
    let param = {uid: this.uid, interlocutor: key}; 
    this.navCtrl.push(ChatdetailPage, param);
  }
    DeletePreviousChat(userId,renterid,itemid){
     console.log(userId+','+renterid+','+itemid);
     
     this.chatprovider.getChatRef(userId, renterid,itemid)
    .then((chatRef:any)=>{
      console.log(chatRef);
      //return false;
      this.chatprovider.DeleteAllChatItems(chatRef);
    });
   }

}
