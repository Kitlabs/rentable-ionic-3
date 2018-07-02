import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController,AlertController,App ,ToastController} from 'ionic-angular';
import { Postitemprovider } from '../../providers/items/postitem';
import { Geolocation, Toast} from 'ionic-native';
import { PostdetailPage } from '../postdetail/postdetail';
import { AddPage } from '../add/add';
import { Storage } from '@ionic/storage';
import { Home } from '../home/home';
@Component({
  selector: 'page-postcost',
  templateUrl: 'postcost.html',
})
export class PostcostPage {

	postdetail=PostdetailPage;
  addpage=AddPage;
  deliver:any;
  fee:any;
  itempost:any;
  dailyprice:any;
  fairprice:any;
  distance:any;
  uid:any;
  imageurl:any;
  userId:any;
  loading:any;
  lat:any;
  lng;
  nextStatus:number;
  editStatus:boolean;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, 
    public postitemprovider: Postitemprovider,
    public storage:Storage,
    public loadingCtrl:LoadingController,
    public alertCtrl:AlertController,
    public toastCtrl:ToastController,
    public app:App) {

    //variables initialization
    this.deliver=false;//status of deliver checkbox    
    this.dailyprice="5";
    this.fairprice="";//as security deposit
    this.distance=1;
    this.fee="";

    this.nextStatus=0;
    

    this.itempost=navParams.get("itempost");
    //get the useId from storage
    this.storage.get('userId').then((data)=>{
         this.userId=data;
      });


 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostcostPage');


  }



  nextEnable(){
    console.log("Next Enable");
    document.getElementById("next").style.color = "#ffffff";
  }

  nextDisable(){
    console.log("Next Disable");
    document.getElementById("next").style.color = "#ffffff66";
  }



  ionViewWillEnter(){

     this.checkEditOrNewPost();

     this.storage.get("status").then((res)=>{
        if(res=="true"){
          this.storage.get("dailyPrice").then((res)=>{
            if(res!=null){
              this.dailyprice=res;
              this.nextStatus=this.nextStatus+1;
            }
        });
        
        this.storage.get("fairPrice").then((res)=>{
            if(res){
              this.fairprice=res;
              console.log("FAIR PRICE=",this.fairprice);
              this.nextStatus=this.nextStatus+1;
            }
        });
          

         //checking deliver status
         this.storage.get("deliver").then((res)=>{
           if(res=="true"){
              this.deliver=true;
              this.storage.get("fee").then((res)=>{
              if(res!=null){
                this.fee=res;
                this.nextStatus=this.nextStatus+1;
              }
            });

             this.storage.get("distance").then((res)=>{

             if(res!=null && res>1){
                this.distance=res;
                this.nextStatus=this.nextStatus+1;               
              }

            });

            //if deliver checked
            if(this.nextStatus==5){
              this.nextEnable();
              console.log("5 if ");
            }else{
              this.nextDisable();
              
              console.log("5 else ");
            }
           
           }else{

             //if deliver not checked
             if(this.nextStatus==2){

              console.log("3 ifE ");
               this.nextEnable();
             }else{

              console.log("5 elseE ");
               this.nextDisable();
             }

           }

         });//end of storage deliver
       
      }else{
        this.nextDisable();
      }

      });


     //getting stored location and using while posting the items
     this.storage.get("location").then((location)=>{
         //current location
         this.itempost.lat=location.lat;
         this.itempost.lng=location.lng;  

     })
  }

  checkEditOrNewPost(){

    this.storage.get('postid').then((id)=>{
      if(id){
        this.editStatus=true;
      }

    });
  }

  number(){

    let isFairPriceNumber= /^\d+$/.test(this.fairprice);
    let isDailyPriceNumber= /^\d+$/.test(this.dailyprice);

    if(this.dailyprice.length==0 || this.dailyprice<5 ||  this.fairprice==null || this.fairprice=="" || !isFairPriceNumber || !isDailyPriceNumber){
      this.nextDisable();
    }else{

      if(this.deliver==true){

        if(this.fee.length==0){
            this.nextDisable();
           }else{
             this.nextEnable();
           } 
      }else{
        this.fee="";
        this.nextEnable();
      }

    }

    //document.getElementById('week').textContent=String(this.dailyprice*7);
  }


  securityDeposit(){

    let isFairPriceNumber= /^\d+$/.test(this.fairprice);
    let isDailyPriceNumber= /^\d+$/.test(this.dailyprice);

    if(!isFairPriceNumber){
      document.getElementById('securityDeposit').style.color="#FF0000";
    }else{
      document.getElementById('securityDeposit').style.color="#000000";
    }

    if(this.dailyprice.length==0 || this.dailyprice<5 || this.fairprice==null || this.fairprice=="" || !isFairPriceNumber || !isDailyPriceNumber ){

     this.nextDisable();

    }else{

      if(this.deliver==true){

        if(this.fee.length==0){
            this.nextDisable();
           }else{
             this.nextEnable();
           } 
      }else{
        this.fee="";
        this.nextEnable();
      }

    }

  }

  dailyPriceChange(){

    let isDailyPriceNumber= /^\d+$/.test(this.dailyprice);
    let isFairPriceNumber= /^\d+$/.test(this.fairprice);
    
    if(!isDailyPriceNumber){
      document.getElementById('dailyPrice').style.color="#FF0000";
    }else{
      document.getElementById('dailyPrice').style.color="#000000";
      if(this.dailyprice<5 && this.dailyprice>=0 ){
        document.getElementById('dailyPrice').style.color="#FF0000";
        this.showToast("Minimum Daily Rental Price Is $5");

      }else{
        document.getElementById('dailyPrice').style.color="#000000";
      }
    }

    if(this.dailyprice.length==0 || this.dailyprice<5 || this.fairprice==null || this.fairprice=="" || !isDailyPriceNumber || !isFairPriceNumber){

     this.nextDisable();

    }else{

      if(this.deliver==true){

        if(this.fee.length==0){
            this.nextDisable();
           }else{
             this.nextEnable();
           } 
      }else{
        this.fee="";
        this.nextEnable();
      }

    }

  }

  removefairprice(){
    this.fairprice="";
  }

 

  removedailyprice(){
    this.dailyprice="";
  }

  removefee(){
    this.fee="";
  }

  backadd(){

    if(this.deliver!=false){
      this.storage.set("deliver","true");
      this.storage.set("fee",this.fee);
    }else{
      this.storage.set("deliver","false");
      this.storage.set("fee","");
    }
    
    this.storage.set("status","true");
    this.storage.set("dailyPrice",this.dailyprice); 
    this.storage.set("fairPrice",this.fairprice);
    this.storage.set("distance",this.distance);
    this.navCtrl.setRoot(AddPage);
  }

  backdetail(){
    // this.navCtrl.push(PostdetailPage);
    if(this.deliver!=false){
      this.storage.set("deliver","true");
       this.storage.set("fee",this.fee);
    }else{
      this.storage.set("deliver","false");
      this.storage.set("fee","");
    }
    
    this.storage.set("status","true");
    this.storage.set("dailyPrice",this.dailyprice); 
    this.storage.set("fairPrice",this.fairprice);
    this.storage.set("distance",this.distance);
    this.navCtrl.setRoot(PostdetailPage);
  }

  Postitem(){

   //old code (current user locattion used when posting the item)

  //   Geolocation.getCurrentPosition().then((resp) => {
  //    // resp.coords.latitude
  //    // resp.coords.longitude
  //    this.lat=resp.coords.latitude;
  //    this.lng=resp.coords.longitude;
  //    //this.presentAlert(this.lat+","+this.lng);
     
  //   }).catch((error) => {

  //   console.log('Error getting location', error);
  // });  

    this.checkValidation();
  }

  checkValidation(){

    let isFairPriceNumber= /^\d+$/.test(this.fairprice);
    let isDailyPriceNumber= /^\d+$/.test(this.dailyprice);

    if(this.dailyprice.length==0 || this.dailyprice<5 || this.fairprice==null || this.fairprice=="" || !isDailyPriceNumber || !isFairPriceNumber){
         //this.nextDisable();
         //do nothing
        }else{

          if(this.deliver==true){

            if(this.fee.length==0){
                //this.nextDisable();
                //do nothing
               }else{
                this.postItemNew();
               } 
          }else{
            this.postItemNew();
          }

        }





  }

  closeScreen(){
    console.log(this.editStatus);
    if(this.editStatus){
			this.closeEditPrompt();
		}else{
      this.presentConfirm();
    }
    
  }

  postItemNew(){

        //creating the loading
        this.loading=this.loadingCtrl.create({
            spinner:'bubbles',
            content:`Please wait..`
          }); 

         this.loading.present();

         //fetching image from storage
         this.storage.get('image').then((data)=>{
         
         this.itempost.image=JSON.stringify(data);
         this.itempost.userId=this.userId;
         this.itempost.dailyPrice=this.dailyprice;
         this.itempost.deliver=this.deliver;
         this.itempost.distance=this.distance;
         this.itempost.deliveryOrPickUpFee=this.fee;
         this.itempost.securityDeposit=this.fairprice;


        
        
        //CHECKING OLD POST OR NEW POST  

        this.storage.get('postid').then((id)=>{

          console.log("POST COST ID=",id);
          if(id){
            // OLD POST
            this.itempost.PostId=id;
            console.log("TESTTT=",this.itempost);
            this.postitemprovider.updatePostDetail(this.itempost).subscribe(
              data=>{
                  console.log(data);
                  this.loading.dismiss();
                  if(data.json().msg=="success"){
                    this.clearPostDetailsFromStorage();
                    this.presentSuccessfullAlert("Updated Successfully",0);
                  }else{
                    this.presentAlert("Please try again later");
                  }
     
              },
              err=>{
                  this.loading.dismiss();
                  this.presentAlert("Please check your internet connection");
                  console.log(err);
              }
              );  

            console.log("OLD POST");

          }else{
            console.log("NEW POST");            
            //NEW POST
            this.postitemprovider.postItem(this.itempost).subscribe(
              data=>{
                  console.log(data);
                  this.loading.dismiss();
                  if(data.json().msg=="success"){
                    this.clearPostDetailsFromStorage();
                    this.presentSuccessfullAlert("Posted Successfully",1);
                  }else{
                    this.presentAlert("Please try again later");
                  }
     
              },
              err=>{
                  this.loading.dismiss();
                  this.presentAlert("Please check your internet connection");
                  console.log(err);
              }
              );  

          }

        }); 

         

      });//end of storage

  }

closeEditPrompt(){

  let alert = this.alertCtrl.create({
    title: 'Confirm ',
    message: 'Do you want to discontinue and information will not saved',
    buttons: [
      {
        text: 'No',
        role: 'cancel',
        handler: () => {
            //do nothing here
        }
      },
      {
        text: 'Yes',
        handler: () => {
        this.clearPostDetailsFromStorage();
        this.app.getRootNav().getActiveChildNav().select(1);         
        }
      }
    ]
  });
  alert.present();

}
presentConfirm() {
  let alert = this.alertCtrl.create({
    title: 'Confirm ',
    message: 'Do you want to save your information before closing?',
    buttons: [
      {
        text: 'No',
        handler: () => {
         this.clearPostDetailsFromStorage();
          this.navCtrl.setRoot(Home);
         this.app.getRootNav().getActiveChildNav().select(0);
        }
      },
      {
        text: 'Yes',
        handler: () => {
        
        if(this.dailyprice!=null){
          this.storage.set("status","true");
          this.storage.set("dailyPrice",this.dailyprice);
        }


        if(this.fairprice!=null){
          this.storage.set("status","true");
          this.storage.set("fairPrice",this.fairprice);
        } 

        if(this.deliver!=false){

            this.storage.set("deliver","true");
            if(this.fee!=null){
              this.storage.set("status","true");
              this.storage.set("fee",this.fee);
            }

          if(this.distance!=null){
              this.storage.set("status","true");
              this.storage.set("distance",this.distance);
            }

        }  

        this.navCtrl.setRoot(Home);
        this.app.getRootNav().getActiveChildNav().select(0);           
      
        }
      }
    ]
  });
  alert.present();
}
  

  /*
  Method to clear storage data
  */
  public clearPostDetailsFromStorage(){

         this.storage.set("status","false");
         this.storage.set("itemTitle",null);
         this.storage.set("itemCategory",null);
         this.storage.set("itemConditionMark",null);
         this.storage.set("itemConditionTitle",null);
         this.storage.set('image',null);

         this.storage.set('postid',null);

         this.storage.set('dailyPrice',null);
         this.storage.set('weeklyPrice',null);
         this.storage.set('fairPrice',null);
         this.storage.set('deliver',null);
         this.storage.set('fee',null);
         this.storage.set('distance',null);
  }

  //method used to present alert to user
  presentAlert(subTitle:any){
    let alert = this.alertCtrl.create({
    subTitle: subTitle,
    buttons: ['OK']
    });
    alert.present();
  
  }

presentSuccessfullAlert(subTitle:any,id){
    let alert = this.alertCtrl.create({
    subTitle: subTitle,
    buttons: [{
      text:'Ok',
      handler:()=>{
        if(id==1){
        //take to home tab
        this.app.getRootNav().getActiveChildNav().select(0);
        this.navCtrl.setRoot(Home);
        }else{
        //take to item tab
        this.app.getRootNav().getActiveChildNav().select(1);
        }
      }
    }]
    });
    
    alert.present();
  }

  showToast(msg:string) {
    const toast = this.toastCtrl.create({
     message: msg,
     position:"top",
     duration:2000
   });
    toast.onDidDismiss(()=>{
     
    });
   toast.present();
}
}
