import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Navbar, Content,Events,ToastController } from 'ionic-angular';
import { ChatProvider } from '../../providers/chat/chat';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable} from 'angularfire2/database';

import { OtherprofilePage } from '../otherprofile/otherprofile';
import { Details } from '../details/details';
import { ChatPage } from '../chat/chat';
import { RentPage } from '../../pages/rent/rent';
import { Storage } from '@ionic/storage';
import { ItemsProvider } from '../../providers/items/items';

@Component({
  selector: 'page-chatdetail',
  templateUrl: 'chatdetail.html'
})
export class ChatdetailPage {

  @ViewChild(Navbar) navBar: Navbar;
  @ViewChild(Content) content:Content;

	chatDetail: any;
	otherprofile=OtherprofilePage;
	details=Details;
	chat=ChatPage;
  showEmojiPicker:any;
  tabBarElement:any;
  interlocutor:string="22";
  message:string;
  messages: object[] = [];
  chatRef:any;
  //chats:FirebaseListObservable<any>;
  chats;
  //variable used in firebase chat
  status:boolean;//to chech whether user came from "I Rent" list of "I Own" List
  //below field are used in chat
  uid:any; //contain id of owner of item 
  reqUserId:string;  //containg id of requester to the item
  itemId:string; //contain the item id 
  req:any;
  oItemStatus:any;
  rItemStatus:any;
  btnSendMessage:boolean=false;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public af:AngularFireDatabase, 
    public chatprovider: ChatProvider,
    public storage:Storage,
    public ev:Events,
    public toastCtrl:ToastController,
    public itemprovider: ItemsProvider
    ) {

    // this.Chatdetail ={
    //   img: 'assets/img/11.png', ownerimage:'assets/img/profile-img.png', item_title:'house', price:'25'};

      this.chatDetail=JSON.parse(this.navParams.get('param'));
      console.log("chat details");
      console.log(this.chatDetail);

      this.uid=this.chatDetail.uid;
      this.reqUserId=this.chatDetail.reqUserId;
      this.itemId=this.chatDetail.itemId;
      this.oItemStatus=this.chatDetail.oItemStatus;
      this.rItemStatus=this.chatDetail.rItemStatus;
      this.status=this.chatDetail.status=="iown" ? true :false;
      this.req="request";
  }


  ionViewDidLoad(){

    console.log("ionViewDidEnter Chat Page");
    this.storage.set("USER_CHATTING_STATUS",1);

    
    this.markAllMessageAsRead();

    this.chatprovider.getChatRef(this.uid, this.reqUserId,this.itemId)
    .then((chatRef:any)=>{

      console.log(chatRef);
      this.chatRef=chatRef;
      
      this.chats = this.af.list(chatRef).subscribe( data => {
        this.messages = data;
        console.log(data);
        //this.chatprovider.DeleteAllChatItems(chatRef);
        if(data.length>0){ 
  
        }
      });
      
    });

  }

  ionViewDidLeave(){
    this.storage.set("USER_CHATTING_STATUS",0);
  }

  sendMessage() {
    if(this.message) {
      this.af.list(this.chatRef).push({
          from: this.uid,
          message: this.message,
          type: 'normal',
          time: Date()
      }).then( () => {
        // message is sent
        console.log(this.chatDetail.DeletedFromId);
        console.log(this.chatDetail.DeletedToId);
        if(this.chatDetail.status == 'iown'){
           if(this.chatDetail.DeletedFromId == "Yes"){
             console.log('delete from id is Yes');
              this.itemprovider.UpdateChatItemOwn(this.uid,this.chatDetail.reqUserId,this.chatDetail.itemId,'No','No').subscribe(data =>{
               if(data.json().msg=="success"){
                 //this.chatprovider.deleteChats(this.uid,renterId,itemId);
               }
             },
             err=>{
               console.log("error");
             });
          }
      }else{
        if(this.chatDetail.DeletedToId == "Yes"){
          console.log('delete from id is Yes');
           this.itemprovider.UpdateChatItemRent(this.uid,this.chatDetail.reqUserId,this.chatDetail.itemId,'No','No').subscribe(data =>{
            if(data.json().msg=="success"){
              //this.chatprovider.deleteChats(this.uid,renterId,itemId);
              
            }
          },
          err=>{
            console.log("error");
          });
       }
      }
       
        this.markMessageAsUnRead();
        this.notifyReceiver();   
      }).catch( () => {
        // some error. maybe firebase is unreachable
      });
      this.message = "";
    }
  }

  /**
   * Method to add message status as unread 
   */
  markMessageAsUnRead(){
    console.log("markMessageAsUnRead");
    this.chatprovider.markMessageAsUnread(this.uid,this.reqUserId,this.itemId).subscribe(
      data=>{
        console.log(data);
      },
      err=>{
        console.log(err);
      }
    )
  }

  /**
   * Method to update chat as read
   */
  markAllMessageAsRead(){
    console.log("Mark all messages as read");
    this.chatprovider.markReadMessage(this.reqUserId,this.uid,this.itemId).subscribe(
      data=>{
        console.log(data);
      },
      err=>{
        console.log(err);
      }
    )
  }
   
  /**
   * Method to used send notifcation
   */
  notifyReceiver(){
    console.log("Call is received to send message notification to user");
    this.chatprovider.sendMessageNotification(this.uid,this.reqUserId).subscribe(
      data=>{
        console.log(data);
      },
      err=>{
        console.log(err);
      }
    )
  }


  /**
   * 
   * @param msgKey contain message Id
   * @param id  can be
   * 0: rental request
   * 1: pick request
   * 2: return request
   */
  goToAcceptRejectPage(msgKey,id:number,msg:string){
    switch (id) {
      case 0:
        this.navCtrl.push(RentPage,{
          requesterId:this.reqUserId,
          requestedItemId:this.itemId,
          msgKey:msgKey,
          chatRef:this.chatRef
        });
        break;
      case 1:
        this.navCtrl.push("ReviewPickReturnPage",{
          requesterId:this.reqUserId,
          requestedItemId:this.itemId,
          msgKey:msgKey,
          chatRef:this.chatRef,

        });

        break;
      case 2: 
      var str =msg;
      if(str.includes("claim") ){
        //open claim page ClaimownerPage
        console.log("CLAIM PAGE");
        this.navCtrl.push("ClaimownerPage",{
          requesterId:this.reqUserId,
          requestedItemId:this.itemId,
          msgKey:msgKey,
          chatRef:this.chatRef
        });
        }else{
        //open return review page 
        console.log("RETURN REVIEW PAGE");  
        this.navCtrl.push("ReviewPickReturnPage",{
            requesterId:this.reqUserId,
            requestedItemId:this.itemId,
            msgKey:msgKey,
            chatRef:this.chatRef
          });
        }
        break;
      default:
        break;
    }
  }

  /**
   * Go to the feedback screen 
   * @param msgKey contain the msg unique key
   */
  goToFeedbackScreen(msgKey){
    this.navCtrl.push("FeedbackPage",{
      requestedItemId:this.itemId,
      itemOwnerId:this.reqUserId,
      msgKey:msgKey,
      chatRef:this.chatRef
    });
  }

  /**
   * reqUserId contain item owner id(in case of i rent)
   * uid contain renter id
   */
  respondToClaim(msgKey,id:number,msg:string){
    this.navCtrl.push("ClaimrenterPage",{
      requestedItemId:this.itemId,
      itemOwnerId:this.reqUserId,
      msgKey:msgKey,
      chatRef:this.chatRef
    });
  }

  number(){
    if(this.message){
        console.log("non empty");
        this.btnSendMessage=true;
    }else{
      console.log("empty");
      this.btnSendMessage=false;
    }
  }
  /**
   * if status true then iown 
   * if status false then irent
   */
  goToItemDetail(){

    if(this.status==true){

      if(this.oItemStatus == "available"){
          if(this.rItemStatus){
            this.navCtrl.push("OwnPostDetailPage",{
              itemId:this.chatDetail.itemId,
              renterId:this.chatDetail.reqUserId,
              amount:this.chatDetail.amount,
              rentalCostWithoutFee:this.chatDetail.rentalCostWithoutFee,
              rentableServiceFee:this.chatDetail.rentableServiceFee,
              itemOwnerFee:this.chatDetail.itemOwnerFee,
              fromDate:this.chatDetail.fromDate,
              toDate:this.chatDetail.toDate,
              status:this.chatDetail.rItemStatus
            });

          }else{
            console.log("item status null");
            this.navCtrl.push("OwnPostDetailPage",{
              status:'Available',
              itemId:this.itemId,
            });
          }
      }
      if(this.oItemStatus=="Deleted"){
        //item has been deleted by owner
        this.showToast("Item doesn't exist");
      }

    }

    if(this.status==false){

      console.log("I RENT");
      if(this.oItemStatus=="available"){
        if(this.rItemStatus){
          console.log("data="+this.rItemStatus);   
            if(this.rItemStatus =='Pending' || this.rItemStatus =='Rented' || this.rItemStatus =='PickedUp' || this.rItemStatus =='Returned'){
                this.navCtrl.push("DetailsRentPage",{
                  itemId:this.chatDetail.itemId,
                  amount:this.chatDetail.amount,
                  rentalCostWithoutFee:this.chatDetail.rentalCostWithoutFee,
                  rentableServiceFee:this.chatDetail.rentableServiceFee,
                  itemOwnerFee:this.chatDetail.itemOwnerFee,
                  fromDate:this.chatDetail.fromDate,
                  toDate:this.chatDetail.toDate,
                  status:this.chatDetail.rItemStatus
                });
            }else{
                //in cancel and rejected case open the details screen
                this.navCtrl.push(Details, {
                  itemId: this.chatDetail.itemId
                });
            }

        }else{
          console.log("item status null");
          this.navCtrl.push(Details, {
            itemId: this.chatDetail.itemId
          });

        }
    }

    if(this.oItemStatus=="Deleted"){
      //item has been deleted by owner
      this.showToast("Item doesn't exist");
    } 
    }
  }


  goToUserDetail(){

    this.navCtrl.push(OtherprofilePage,{
      userId:this.reqUserId
    });
  }

  switchEmojiPicker(){

  }


   scrollToBottom() {
     console.log("SCROLL TO BOTTOM");
    this.content.scrollToBottom();//300ms animation speed
  }

  onFocus(){
    
  }


  showToast(msg:string) {
    let toast = this.toastCtrl.create({
     message: msg,
     duration: 2000,
     position: "top"
   });

   toast.present(toast);
 }

}
