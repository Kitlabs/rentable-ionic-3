import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController ,ModalController,AlertController, Alert,LoadingController} from 'ionic-angular';
import { ProfileProvider } from '../../providers/payment/profile';

import { EditprofilePage } from '../editprofile/editprofile';
import { Storage } from '@ionic/storage';

import { AuthenticateProvider } from '../../providers/authenticate/authenticate';
@IonicPage()
@Component({
  selector: 'page-profileinput',
  templateUrl: 'profileinput.html',
})
export class ProfileinputPage {

	editprofile=EditprofilePage;
	data:any;
  formtype:any;
  firstname:any;
  lastname:any;
  email:any;
  phonenumber:any;
  password:any;
  postalcode:any;
  type:any;
  imageURI:any;
  imageFileName:any;
  uuid:any;
  Profiledata:any;
  photourl:any;
  forgetPassField:boolean;
  postalFieldStatus:boolean;
  lat:any;
  lng:any;
  location:any;
  locToSave:any;
  btnUpdate:boolean;
  option:any;
  countrycode:any;
  userId:any;
  loading:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public profileprovier: ProfileProvider,
    public storage:Storage,
    public loadingCtrl:LoadingController,
    public modalCtrl:ModalController,
    public alertCtrl:AlertController,
    public authprovier:AuthenticateProvider,
    public toastCtrl:ToastController) {

    this.formtype=navParams.get("type");
    this.data=navParams.get("data");  
    this.option=navParams.get("option");
    this.countrycode="+"+this.navParams.get("code");
    
    console.log(this.countrycode);
  
    console.log(this.data);  

    this.btnUpdate=this.data? true:false;
   
    if(this.formtype=="POSTAL CODE"){
      this.postalFieldStatus=true;
    }else{
      this.postalFieldStatus=false;
    }
    this.storage.get('userId').then((data)=>{
      this.userId=data;
    });
    

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileinputPage');
  }

  removetext(){
  	this.data="";
  }

  change(){
    this.btnUpdate= this.data ? true:false;
  }

  emailChange(){
    let EMAIL_REGEXP=/^[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    this.btnUpdate=EMAIL_REGEXP.test(this.data) ? true :false;
    console.log("EMAIL_STATUS=",this.btnUpdate);
  }

  mobileChange(){
    var number=this.data;
    console.log("LENGTH=",number.toString().length);
    this.btnUpdate=number.toString().length >7 ? true:false;
  }

  takeMe(){
    console.log("sadfadf asdf alsdkfj a ");
    // this.navCtrl.setRoot("CountrycodePage",{
    //   type:"updatenumber"
    // });

    let shareModel = this.modalCtrl.create('CountrycodePage',{type:'updatenumber'});
    shareModel.onDidDismiss(data=>{
      console.log("DATA==",data);
      this.countrycode=data;
    });
    shareModel.present();
    

  }


  save(){
    // this.profileprovier.ChangeProfile(this.formtype, this.data).subscribe(data =>{
    //   console.log(data);
    // })
    if(this.formtype =="FIRST NAME"){
      this.firstname=this.data;
    }

    if(this.formtype =="LAST NAME"){
      this.lastname=this.data;
    }

    

    if(this.formtype =="EMAIL"){
      this.email=this.data;
    }

    if(this.formtype =="PASSWORD"){
      this.password=this.data;
    }

    if(this.formtype =="POSTAL CODE"){
        this.postalcode=this.data;
        this.authprovier.getAddressFromPostalCode(this.postalcode).subscribe(
          data=>{
          console.log(data.json());
          this.location=data.json().results[0].formatted_address;
          this.lat=data.json().results[0].geometry.location.lat;
          this.lng=data.json().results[0].geometry.location.lng
          this.locToSave=data.json().results[0].geometry.location;  
          this.updateUserProfile();
        }
      );

    }else if(this.formtype =="MOBILE NUMBER"){
      this.phonenumber=this.data;
      this.getVerificationCode();
      //this.presentVerificationPrompt();
    }
    else{
      this.updateUserProfile();
    }
  }

  getVerificationCode(){

    this.loading=this.loadingCtrl.create({
      spinner:'bubbles',
      content:`Please wait..`
    }); 

   this.loading.present();

    let number=this.countrycode+"0"+this.phonenumber;
    this.profileprovier.getVerificationCode(number,this.userId).subscribe(
      data=>{
        
        this.loading.dismiss();
        console.log(data.json());
       
        if(data.json().msg=="success"){
            this.presentVerificationPrompt();
        }

        if(data.json().msg=="error"){
          this.showToast("Try again later");
        }

      },
      err =>{
        this.loading.dismiss();
      });


  }

  presentVerificationPrompt() {

    let shareModel = this.modalCtrl.create('UpdateMobileNumberPage');
    shareModel.onDidDismiss(data=>{
      this.updateMobileNumber(data);
    });

    shareModel.present();

    // let alert = this.alertCtrl.create({
    //   title: 'Enter Verification Code',
    //   inputs: [
    //     {
    //       name: 'code',
    //       placeholder: 'Enter code'
    //     }
    //   ],
    //   buttons: [
    //     {
    //       text: 'Cancel',
    //       role: 'cancel',
    //       handler: data => {
    //         console.log('Cancel clicked');
    //       }
    //     },
    //     {
    //       text: 'Update',
    //       handler: data => {
    //         console.log(data.code);
    //       }
    //     }
    //   ]
    // });
    // alert.present();
  }

  updateMobileNumber(code){

    console.log("asdfadsf=",code);
    console.log("Call is received to update mobile number");
    this.loading=this.loadingCtrl.create({
      spinner:'bubbles',
      content:`Please wait..`
    }); 

    this.loading.present();
    let number=this.countrycode+"0"+this.phonenumber;
    this.profileprovier.updateMobileNumber(number,this.userId,code).subscribe(
      data=>{
        
        this.loading.dismiss();
        console.log(data.json());
       
        if(data.json().msg=="success"){
          this.showToast(data.json().msg_details);
        }

        if(data.json().msg=="error"){
          
          this.showToast(data.json().msg_details);
        }

      },
      err =>{
        this.loading.dismiss();
      });
  }


  updateUserProfile(){

    this.storage.get('userId').then((userId)=>{
      if(userId!=null){

          this.profileprovier.ChangeProfile(this.email, this.phonenumber, this.password, this.firstname, this.lastname, this.photourl, this.postalcode,userId,this.lat,this.lng,this.location).subscribe(
          data=>{
            console.log(data.json());
            if(data.json().msg=="success"){
              if(this.formtype =="POSTAL CODE"){
                this.storage.set('location',this.locToSave);
              }
              this.showToast(data.json().msg_details);
            }

            if(data.json().msg=="error"){
              this.showToast("Try again later");
            }
            
          },err =>{
            alert("error");
          });

      }else{          
     }
    });

  }

  numberFill(){
    if(this.formtype =="POSTAL CODE"){
        console.log("postal code");
       //this.status=true;
    }
  }

  showToast(msg:string) {
    const toast = this.toastCtrl.create({
      message: msg,
      position:"top",
      duration:2000
    });

     toast.onDidDismiss(()=>{
      this.navCtrl.popTo(EditprofilePage);
     });

    toast.present();
  }


}
