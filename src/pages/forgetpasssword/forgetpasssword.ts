import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController,LoadingController } from 'ionic-angular';
import { FormBuilder, Validators,FormGroup } from '@angular/forms';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';
import { LandingPage } from '../landing/landing'
/**
 * Generated class for the ForgetpassswordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgetpasssword',
  templateUrl: 'forgetpasssword.html',
})
export class ForgetpassswordPage {

	email:any;
	code:any;
	newpass:any;
	conpass:any;
	forgetForm:FormGroup;
  codee:any;
  loading:any;
  constructor(public navCtrl: NavController, 
  	public navParams: NavParams,
    public formBuilder: FormBuilder,
    public authprovier: AuthenticateProvider,
    public loadingCtrl:LoadingController,
    public toastCtrl:ToastController) {

    this.code="6465";
    let PASSWORD_REGEXP=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{1,}$/i;  

  	this.forgetForm = formBuilder.group({
      code: ['', Validators.compose([Validators.maxLength(4), Validators.minLength(4), Validators.required])],
      newpass: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(20), Validators.pattern(PASSWORD_REGEXP),Validators.required])],
      conpass: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(20), Validators.required])],
    },{validator: this.matchingPasswords('newpass', 'conpass')});


  	this.email=this.navParams.get("email");
    this.code=this.forgetForm.controls['code'];
    this.newpass=this.forgetForm.controls['newpass'];
    this.conpass=this.forgetForm.controls['conpass'];
    
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetpassswordPage');
    
  }

forgetPassword(){
  
  this.loading=this.loadingCtrl.create({
        spinner:'bubbles',
        content:`Please wait..`
      });
  
  this.loading.present();
	this.authprovier.resetForgetPassword(this.email,this.code.value,this.newpass.value,this.conpass.value).subscribe(data=>{
      this.loading.dismiss();
			console.log(data);
			if(data.json().msg=="success"){
					this.showToast(data.json().msg_details);
					this.navCtrl.push(LandingPage);
			}

			if(data.json().msg=="error"){
				this.showToast(data.json().msg_details);
			}
	},
	err=>{
      this.loading.dismiss();
      this.showToast("Please try again later");
	});

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


showToast(msg:string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: "top"
    });

    toast.present(toast);
  }
}
