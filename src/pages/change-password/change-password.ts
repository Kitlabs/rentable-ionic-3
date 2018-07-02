import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ToastController } from 'ionic-angular';
import { FormBuilder, Validators,FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';
@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {

	 oldPass:any;
	 newPass:any;
	 conPass:any;
	 changeForm:FormGroup;
	 loading:any;
  	constructor(
		private navCtrl: NavController, 
		private navParams: NavParams,
		private formBuilder:FormBuilder,
		private loadingCtrl:LoadingController,
		private storage:Storage,
		private authProvider:AuthenticateProvider,
		private toastCtrl:ToastController) {

	let PASSWORD_REGEXP=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{1,}$/i;  

	this.changeForm = formBuilder.group({
	  oldPass: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(20), Validators.required])],
	  newpass: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(20), Validators.pattern(PASSWORD_REGEXP),Validators.required])],
	  conpass: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(20), Validators.required])],
	},{validator: this.matchingPasswords('newpass', 'conpass')});


  	//attached control with form
    this.oldPass=this.changeForm.controls['oldPass'];
    this.newPass=this.changeForm.controls['newpass'];
    this.conPass=this.changeForm.controls['conpass'];

  	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePasswordPage');
  }

  closeScreen(){
  	this.navCtrl.pop();
  }


  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    // TODO maybe use this https://github.com/yuyang041060120/ng2-validation#notequalto-1
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }


  changePassword(){

	this.loading=this.loadingCtrl.create({
        spinner:'bubbles',
        content:`Please wait..`
      });
  
  	this.loading.present();

  	this.storage.get('userId').then((data)=>{
      		
      	this.authProvider.changePassword(data,this.oldPass.value,this.newPass.value).subscribe(
      		data=>{
      			this.loading.dismiss();

      			if(data.json().msg=="error"){
      				this.presentToast(data.json().msg_details,0);
      				this.changeForm.reset();
      			}

      			if(data.json().msg=="success"){
      				this.presentToast(data.json().msg_details,1);
      				this.changeForm.reset();
      			}

      		},
      		err=>{
      			this.loading.dismiss();																															
      		}
      		);
      });

  }

  presentToast(msg,id) {

	  let toast = this.toastCtrl.create({
	    message: msg,
	    duration: 3000,
	    position: 'top'
	  });

	  if(id==1){	
		  toast.onDidDismiss(() => {
		  	this.navCtrl.pop();
		  });	
	  }

	  toast.present();
}


}
