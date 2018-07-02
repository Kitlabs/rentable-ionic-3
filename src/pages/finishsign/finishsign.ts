import { Component } from '@angular/core';
import { NavController, NavParams,ToastController,LoadingController,Platform,AlertController, Alert } from 'ionic-angular';
import { FormBuilder, Validators,FormGroup,FormControl } from '@angular/forms';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';
import { FCM } from "@ionic-native/fcm";
import { TabPage } from '../tab/tab';
import { SignupPage } from '../signup/signup';
import { Register } from '../register/register';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'page-finishsign',
  templateUrl: 'finishsign.html'
})
export class FinishsignPage {

	home=TabPage;
  signup=SignupPage;
  register=Register;
  Usersignup:any;
  finishsignupform:FormGroup;
  firstname:any;
  lastname:any;
  postalcode:any;
  dob:any;
  tabBarElement:any;
  termaccepted:any;
  loading:any;
  //fb data
  fbFirstName:any;
  fbLastName:any;
  comeFromFacebook:boolean;
  userInfo:any;
  fcmToken:any;
  location:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public authprovier: AuthenticateProvider,
    public toastCtrl:ToastController,
    public loadingCtrl:LoadingController,
    public storage:Storage,
    public alertCtrl:AlertController,
    public fcm:FCM,
    public platform:Platform
  ) {

    let POSTAL_REGEXP="[0-9]*";

    this.finishsignupform = formBuilder.group({
      firstname: ['', Validators.compose([Validators.maxLength(20), Validators.required])],
      lastname: ['', Validators.compose([Validators.maxLength(20), Validators.required])],
      postalcode: ['', Validators.compose([Validators.pattern(POSTAL_REGEXP),Validators.minLength(4), Validators.maxLength(4), Validators.required])],
      dob:['',Validators.required],
      termaccepted:[false,Validators.compose([this.isChecked,Validators.required])]
    });
    this.Usersignup=navParams.get("user");
    this.firstname=this.finishsignupform.controls['firstname'];
    this.lastname=this.finishsignupform.controls['lastname'];
    this.postalcode=this.finishsignupform.controls['postalcode'];
    this.termaccepted=this.finishsignupform.controls['termaccepted'];
    this.dob=this.finishsignupform.controls['dob'];
   
    if(this.platform.is('cordova')){
      //getting token
       this.fcm.getToken().then(token=>{
         this.Usersignup.fcmToken=token;
      })   
    }    
  }

  ionViewDidLoad() {

  

  }
  ionViewDidEnter(){
    
  }

  ionViewWillEnter() {
    if(this.tabBarElement){
      this.tabBarElement.style.display = 'none';
    }
    this.finishsignupform.get('firstname').setValue(this.Usersignup.firstName);
    this.finishsignupform.get('lastname').setValue(this.Usersignup.lastName);
  }
 
  ionViewWillLeave() {
    if(this.tabBarElement){
      this.tabBarElement.style.display = 'flex';
    }
  }

  //method go to sign up page
  goToSignUp(){
    //this.navCtrl.setRoot(SignupPage);
     this.navCtrl.pop();
  }

  finishsignup(){
    let dob=this.dob.value;
    let dobArr=dob.split("-");

    this.Usersignup.firstname=this.firstname.value;
    this.Usersignup.lastname=this.lastname.value;
    this.Usersignup.postalcode=this.postalcode.value;
    this.Usersignup.day=dobArr[2];
    this.Usersignup.month=dobArr[1];
    this.Usersignup.year=dobArr[0];
    
    this.loading=this.loadingCtrl.create({
      spinner:'bubbles',
      content:`Please wait..`
    });
    
    this.loading.present();
    //Get address from postal code
    this.authprovier.getAddressFromPostalCode(this.postalcode.value).subscribe(
      data=>{
      this.Usersignup.location=data.json().results[0].formatted_address;
      this.Usersignup.lat=data.json().results[0].geometry.location.lat;
      this.Usersignup.lng=data.json().results[0].geometry.location.lng
      this.location=data.json().results[0].geometry.location;
      
      //TO GET CITY AND COUNTRY
      for (let i in data.json().results[0].address_components) {
        //CITY
        if(data.json().results[0].address_components[i].types[0] == "administrative_area_level_1" ){
          this.Usersignup.City=data.json().results[0].address_components[i].short_name;
        }
        //COUNTRY
        if(data.json().results[0].address_components[i].types[0] == "country" ){
          this.Usersignup.Country= data.json().results[0].address_components[i].short_name; 
        }
      }

      this.authprovier.signup(this.Usersignup).subscribe(
        data=>{
        this.loading.dismiss();
        if(data.json().msg=="success"){
          this.storage.set("userId",data.json().userId);//saving userId
          this.storage.set('location',this.location);//saving location
          this.storage.set("CARD_STATUS",0);
          this.showToast("Registered Successfully");
        }else{
          if(data.json().msg=="error"){
            this.presentAlert(data.json().msg_details.replace("Stripe", "application"));
          }

        }
        },
        err => {
          this.loading.dimiss();
          this.showToastWithCloseButton("Please try again ");
        }
        );
    },
    err=>{
      //on error
      this.loading.dimiss();
      this.showToastWithCloseButton("Please try again");
    }
  );

  }


  presentAlert(msg) {
    let alert = this.alertCtrl.create({
      title: 'Message',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }


  /*
    Method to display toast message
  */
  showToastWithCloseButton(msg:string) {
     const toast = this.toastCtrl.create({
      message: msg,
      duration:2000,
      position: "top"
    });
    toast.present();
  }

   showToast(msg:string) {
     const toast = this.toastCtrl.create({
      message: msg,
      position:"top",
      duration:2000
    });
     toast.onDidDismiss(()=>{
      this.navCtrl.setRoot(TabPage);
     });
    toast.present();
  }


  //function to chek whether checkbox checked or not
  isChecked(control: FormControl) : any{

    if(control.value != true){
      return {
        "notChecked" : true
      };
    }
    return null;
  }
}
