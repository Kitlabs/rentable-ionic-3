import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import { ItemsProvider } from '../../providers/items/items';

import { OtherprofilePage } from '../otherprofile/otherprofile';
import { Likes } from '../likes/likes';      //favourites screen
import { Details } from '../details/details';
import { Storage } from '@ionic/storage';
import { OwnPostDetailPage } from '../own-post-detail/own-post-detail'

@Component({
  selector: 'page-myrent',
  templateUrl: 'myrent.html'
})
export class Myrent {

  own_avaiablelist: any;;
  own_rentedlist: Array<any>;
  rent_currentlist: Array<any>;
  rent_historylist: Array<any>;

  own_like:any;
  rent_like:any;

  own_rent:string="own";
  date:string="current";
  isavailable:string="available";
  showdeleteicon:boolean;
  public ownshowwhite = false;
  public rentshowwhite = false;

  favourites=Likes;
  details=Details; 
  loading:any;
  basePath:any;
  rentedListNotFound:boolean;
  profileimage:any;
  userId:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public itemprovider: ItemsProvider,
    public storage:Storage,
    public loadingCtrl:LoadingController,
    public alertCtrl:AlertController) {
      this.showdeleteicon=true;

    this.rent_like = [];
    for (var i = 0; i < 4; ++i) {
      this.rent_like[i]=false;
    }

    this.own_like = [];
    for (var i = 0; i < 4; ++i) {
      this.own_like[i]=false;
    }

    this.itemprovider.Getownavailable(localStorage.getItem('uid')).subscribe(data=>{
      console.log(data.json().result);  
    }, err=>{
      console.log(err);
    });

    this.itemprovider.Getownrent(localStorage.getItem('uid')).subscribe(data=>{
      console.log(data.json().result);  
    }, err=>{
      console.log(err);
    });

    this.itemprovider.Getrentcurrent(localStorage.getItem('uid')).subscribe(data=>{
      console.log(data.json().result);  
    }, err=>{
      console.log(err);
    });

    this.itemprovider.Getrentcurrent(localStorage.getItem('uid')).subscribe(data=>{
      console.log(data.json().result);  
    }, err=>{
      console.log(err);
    });

    this.rentedListNotFound=true;
    this.rent_currentlist=[];
    this.profileimage='assets/img/profile-img.png';

    /*this.own_avaiablelist =
    [
      {img: 'assets/img/11.png', title: 'John', view:'10', favourity:'20', id:'0'},
      {img: 'assets/img/22.png', title: 'alex', view:'10', favourity:'20', id:'1'},
      {img: 'assets/img/33.png', title: 'eric', view:'10', favourity:'20', id:'2'},
      {img: 'assets/img/11.png', title: 'kevin', view:'10', favourity:'20' ,id:'3'},
    ]*/

    /*this.own_rentedlist =
    [
      {img: 'assets/img/11.png', title: 'apartment', profileimage:'assets/img/profile-img.png', profilename:'John', delete:'yes', rentday:'5'},
      {img: 'assets/img/22.png', title: 'wedding', profileimage:'assets/img/profile-img.png', profilename:'rascal', delete:'yes',  rentday:'2'},
      {img: 'assets/img/33.png', title: 'shop', profileimage:'assets/img/profile-img.png', profilename:'sizza', delete:'yes', rentday:'3' },
      {img: 'assets/img/22.png', title: 'wedding', profileimage:'assets/img/profile-img.png', profilename:'rascal', delete:'yes',  rentday:'2'},
      {img: 'assets/img/33.png', title: 'shop', profileimage:'assets/img/profile-img.png', profilename:'sizza', delete:'yes', rentday:'3' }
    ]*/

  /*  this.rent_currentlist =
    [
      {img: 'assets/img/11.png', title: 'John', view:'43', favourity:'40',unlike:'assets/icon/like.png',like:'assets/icon/like-full.png',islike:'false', id:'0'},
      {img: 'assets/img/22.png', title: 'jens', view:'234', favourity:'50',unlike:'assets/icon/like.png',like:'assets/icon/like-full.png',islike:'false', id:'1'},
      {img: 'assets/img/33.png', title: 'eric', view:'12', favourity:'26',unlike:'assets/icon/like.png',like:'assets/icon/like-full.png',islike:'false', id:'2'},
      {img: 'assets/img/11.png', title: 'daniel', view:'52', favourity:'23',unlike:'assets/icon/like.png',like:'assets/icon/like-full.png',islike:'false', id:'3'},
    ]
*/
   
    // this.rent_historylist =
    // [
    //   {img: 'assets/img/11.png', title: 'apartment', profileimage:'assets/img/profile-img.png', profilename:'John', delete:'yes', rentday:'5' },
    //   {img: 'assets/img/22.png', title: 'wedding', profileimage:'assets/img/profile-img.png', profilename:'rascal', delete:'yes',  rentday:'3'},
    //   {img: 'assets/img/33.png', title: 'shop', profileimage:'assets/img/profile-img.png', profilename:'sizza', delete:'yes', rentday:'2' }
    // ]

  }


  showdelete(){
    if (this.own_rent=="own") {  

        console.log("own");

      if (this.isavailable=="available") {
        console.log("available");
        this.showdeleteicon=true;
      }
      if(this.isavailable=="rented"){
        console.log("rented");
        this.showdeleteicon=false;
      }
    }

    if(this.own_rent=="rent"){
      console.log("rent");
      this.showdeleteicon=false;
    }
    
  }

  ownshowheart(i) {
   this.own_like[i]=!this.own_like[i];
  }
  
  rentshowheart(i) {
    this.rent_like[i] = !this.rent_like[i];
  }

  /*Get all available item */
  ionViewWillEnter(){
    
   this.own_avaiablelist=[];
    this.own_rentedlist=[];
    this.rent_currentlist=[];
    this.rent_historylist=[];
    localStorage.setItem('status','true');

    this.own_avaiablelist=null;    
    this.own_rentedlist=null;

    this.storage.get('userId').then((id)=>{ 
     this.userId=id;
    /**I OWN - AVAILABLE */
    this.itemprovider.getIOwnAvailableItemsSecond(id,"IownAvailable").subscribe(
      data=>{ 
        console.log("I OWN AVAILABEL");
        console.log(data.json());
         if(data.json().msg=="success"){
           this.own_avaiablelist=data.json().data;
         }    
      }
     );

    /**I OWN-RENTED */
    this.itemprovider.getIOwnRentedItems(id,"IownRented").subscribe(
      data=>{

          console.log("I OWN RENTED");
          console.log(data.json());
          if(data.json().msg=="success"){
            this.own_rentedlist=data.json().data; 
          }
          
      });

    /**I RENT-CURRENT */
    this.itemprovider.getIRentCurrentItems(id).subscribe(
      data=>{

          console.log("i rent current");
          console.log(data.json());
          if(data.json().msg=="success"){
            this.rent_currentlist=data.json().PostData;
            this.basePath= data.json().base_path;
          }
          
      });

      /**I RENT-HISTORY */  
      this.itemprovider.getIRentHistoryItems(id).subscribe(
        data=>{
            console.log("i rent history");
            console.log(data.json());
            if(data.json().msg=="success"){
              this.rent_historylist=data.json().PostData;
              this.basePath= data.json().base_path;
            }
        });
    });//end of storage
    
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
				console.log("adfadsfasdfasdf");
			}
    });
  }

  
  goToDetailsOwnAvailable(itemId){
    this.navCtrl.push("OwnPostDetailPage",{
      status:'Available',
      itemId:itemId,
    });
  }

  goToDetailsOwnRented(itemId,amount,fromDate,toDate,status,renterId,rentalCostWithoutFee,rentableServiceFee,itemOwnerFee){
    this.navCtrl.push("OwnPostDetailPage",{
      itemId:itemId,
      renterId:renterId,
      amount:amount,
      rentalCostWithoutFee:rentalCostWithoutFee,
      rentableServiceFee:rentableServiceFee,
      itemOwnerFee:itemOwnerFee,
      fromDate:fromDate,
      toDate:toDate,
      status:status,
    });
  }

  gotToDetails(itemId,amount,fromDate,toDate,status,rentalCostWithoutFee,rentableServiceFee,itemOwnerFee){
    this.navCtrl.push("DetailsRentPage",{
      itemId:itemId,
      amount:amount,
      rentalCostWithoutFee:rentalCostWithoutFee,
      rentableServiceFee:rentableServiceFee,
      itemOwnerFee:itemOwnerFee,
      fromDate:fromDate,
      toDate:toDate,
      status:status
    });
  }

  goToOtherProfile(id){
    this.navCtrl.push(OtherprofilePage,{
      userId:id
    });
  }  

/*
  Method to delete post
  */
  deleteItem(itemId,deleteId,status){
    console.log("Call is received to delete item "+itemId);
    this.loading=this.loadingCtrl.create({
        spinner:'bubbles',
        content:`Please wait..`
      });

      
    this.loading.present();
     
    if(status=="IOwnAvailable"){
        //data contain userid
    this.itemprovider.deleteItemById(itemId).subscribe(
      data=>{
          console.log(data);
          this.loading.dismiss();
         if(data.json().msg=="success"){
               //this.ionViewWillEnter();
               this.own_avaiablelist.splice(deleteId,1);
           }else{

           }      
      },
      err=>{
        this.loading.dismiss();
          console.log();
      },
      );

    }

    if(status=="IRentHistory"){

      this.itemprovider.deleteIRentHistoryItem(this.userId,itemId).subscribe(
        data=>{
            console.log(data);
            this.loading.dismiss();
           if(data.json().msg=="success"){
                 //this.ionViewWillEnter();
                 this.rent_historylist.splice(deleteId,1);
             }else{
  
             }      
        },
        err=>{
          this.loading.dismiss();
            console.log();
        },
        );

    }

  

  }

/**
 * 
 * @param itemId contain the id of item to delete
 * @param deleteId contain the index id of item showing on screen
 * @param status //distinguish among where it called from "IOwnAvailable" "IRentHistory"
 */
  presentConfirm(itemId,deleteId,status) {

    let alert = this.alertCtrl.create({
    title: 'Confirm delete',
    message: 'Do you want to delete this post?',
    buttons: [
      {
        text: 'No',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Yes',
        handler: () => {
          this.deleteItem(itemId,deleteId,status);
        }
      }
    ]
  });
  alert.present();
}
  
  

}
