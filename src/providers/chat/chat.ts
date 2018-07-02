import { Injectable } from '@angular/core';
import { Http, Jsonp } from '@angular/http';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/map';

import { AppSetting } from '../api_route';
@Injectable()
export class ChatProvider {

  apiUrl=this.appsetting.getApiURL();

  constructor(public http: Http, public af:AngularFireDatabase,public appsetting: AppSetting) {
    console.log('Hello ChatProvider Provider');
  }

  getChats() {
    
  	var uid = localStorage.getItem(uid);
    let chats = this.af.list(`/users/${uid}/chats`);
    return chats;
     
  }
  
  // Add Chat References to Both users
  addChats(uid,interlocutor) {                                   
    // First User
    let endpoint = this.af.object(`/users/${uid}/chats/${interlocutor}`);
    endpoint.set(true);
    
    // Second User
    let endpoint2 = this.af.object(`/users/${interlocutor}/chats/${uid}`);
    endpoint2.set(true);
  }

  /** 
   * method used to delete chat 
  */
  deleteChats(uId,reqId,itemId){
    console.log("Call is received to delete chat");
    let deleteId=uId+","+itemId+","+reqId;
    console.log("Call is received to delete chat=",deleteId);
    this.af.object('chats/'+deleteId).remove();

  }

  getChatRef(uId,reqId,itemId) {

    console.log(reqId + " reqId");

    let firstRef = this.af.object(`/chats/${uId},${itemId},${reqId}`, {preserveSnapshot:true});
    let promise = new Promise((resolve, reject) => {
      firstRef.subscribe(snapshot => {
        let a = snapshot.exists();
        if(a) {
            resolve(`/chats/${uId},${itemId},${reqId}`);
        } else {
          let secondRef = this.af.object(`/chats/${reqId},${itemId},${uId}`, {preserveSnapshot:true});
          secondRef.subscribe(snapshot => {
            let b = snapshot.exists();
            if(!b) {
                //no need 
                //this.addChats(uid,interlocutor);
            }
          });
          resolve(`/chats/${reqId},${itemId},${uId}`);
        }
        });
    });

   /* let firstRef = this.af.object(`/chats/${uid},${interlocutor}`, {preserveSnapshot:true});
    let promise = new Promise((resolve, reject) => {
      firstRef.subscribe(snapshot => {
        let a = snapshot.exists();
        if(a) {
            resolve(`/chats/${uid},${interlocutor}`);
        } else {
          let secondRef = this.af.object(`/chats/${interlocutor},${uid}`, {preserveSnapshot:true});
          secondRef.subscribe(snapshot => {
            let b = snapshot.exists();
            if(!b) {
                //no need 
                 //this.addChats(uid,interlocutor);
            }
          });
          resolve(`/chats/${interlocutor},${uid}`);
        }
        });
    });*/
    
    return promise;
  }

    //for normal messages
    sendMessage(uid,interlocutor,itemid,message,type){
      console.log("sending messages");
      this.getChatRef(uid,interlocutor,itemid)
      .then((chatRef:any)=>{    
        console.log(chatRef);
          this.af.list(chatRef).push({
            from: uid, 
            message: message,
            type: type,
            time: Date()
          }).then( () => {
            // message is sent
            console.log("message has been sent successfully");
          }).catch( () => {
            // some error. maybe firebase is unreachable
            console.log("firebase unrechable");
          });

        });
    }

        //for normal messages
        sendMessageRental(uid,interlocutor,itemid,type,ownermsg,rentermsg){
          console.log("sending messages");
          this.getChatRef(uid,interlocutor,itemid)
          .then((chatRef:any)=>{    
            console.log(chatRef);
              this.af.list(chatRef).push({
                from: uid, 
                ownermsg:ownermsg,
                rentermsg:rentermsg,
                type: type,
                time: Date()
              }).then( () => {
                // message is sent
                console.log("message has been sent successfully");
              }).catch( () => {
                // some error. maybe firebase is unreachable
                console.log("firebase unrechable");
              });
    
            });
        }


        /**
         * Method to send notifcation on message success
         * {"action":"UserListPushNotifications","FromId":"93","ToId":"91"}
         */
        sendMessageNotification(fromId,toId){
          let body={
            action:'UserListPushNotifications',
            FromId:fromId,
            ToId:toId
          }
          console.log(JSON.stringify(body));
          return this.http.post(this.apiUrl,JSON.stringify(body));
        }

        /**
         * Method to update message as read 
         * {"action":"UpdateChatIsRead","FromId":"93","ToId":"91","PostId":"268","IsRead":"1"}
         */
        markReadMessage(fromId,toId,postId){
          console.log("Mark all messages as read");
          let body={
            action:'UpdateChatIsRead',
            FromId:fromId,
            ToId:toId,
            PostId:postId,
            IsRead:"1"
          }
          console.log(JSON.stringify(body));
          return this.http.post(this.apiUrl,JSON.stringify(body));
        }

        /**
         * Method to mark message as unread
         * {"action":"InsertChatIsRead","FromId":"93","ToId":"91","PostId":"268","IsRead":"0"}
         */
        markMessageAsUnread(fromId,toId,postId){
          let body={
            action:'InsertChatIsRead',
            FromId:fromId,
            ToId:toId,
            PostId:postId,
            IsRead:"0"
          }
          console.log(JSON.stringify(body));
          return this.http.post(this.apiUrl,JSON.stringify(body));
        }

}
