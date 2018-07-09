 
 import { Component } from '@angular/core';
import { NavController, NavParams,AlertController,App,LoadingController  } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { PostdetailPage } from '../postdetail/postdetail';
import { Crop } from '@ionic-native/crop';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { storage } from 'firebase';
import firebase from 'firebase';
import { Postitemprovider } from '../../providers/items/postitem';
import { Storage } from '@ionic/storage';
import { Home } from '../home/home';
import { Base64 } from '@ionic-native/base64';
import { ImageResizer, ImageResizerOptions } from '@ionic-native/image-resizer';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';
@Component({
	selector: 'page-add',
	templateUrl: 'add.html'
})
export class AddPage {

	postdetail=PostdetailPage;
	categorygrid: Array<any>;
	categorylist: Array<any>;
	imagelist:Array<any>;
	photos:Array<any>
	options:any;
	photourlname:any;
	thumname:any;
	filename:any;
	takeimage:any;
	base64Image: string;
	nextDisabled:boolean;
	test:any;
	userId:any;
	//select image from gallery
	imageurlfrompicker: string = "";
	imageurlfromresizer: string = "";
	imagebase64: string = "";
	testImage:string="";
	loading:any;
	editStatus:boolean;
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public imagepicker: ImagePicker,
		public cropservice: Crop,
		public camera: Camera,
		public alertCtrl:AlertController,
		public storage:Storage,
		public loadingCtrl:LoadingController,
		public authProvider:AuthenticateProvider,
		public base64:Base64,
		public postitemprovider: Postitemprovider,
		public imageResizer: ImageResizer,
		public app:App
	) {

		//not used
		this.categorygrid = [
		 {img: 'assets/icon/camera.png', title: 'apartment', icon: 'ios-home-outline', price:'20', favourity:'21'}, 
		 {img: 'assets/img/02.png', title: 'wedding hall', icon: 'ios-bowtie-outline',price:'12', favourity:'11'},
		 {img: 'assets/img/03.png', title: 'shop', icon: 'ios-shirt-outline',price:'12', favourity:'34'}, 
		 {img: 'assets/img/04.png', title: 'rent', icon: 'ios-headset-outline', price:'32', favourity:'21'},
		 {img: 'assets/img/01.png', title: 'apartment', icon: 'ios-home',price:'31', favourity:'15'}, 
		 {img: 'assets/img/02.png', title: 'wedding hall', icon: 'ios-bowtie',price:'34', favourity:'65'}, 
		 {img: 'assets/img/03.png', title: 'shop', icon: 'md-cart',price:'42', favourity:'23'},
		 {img: 'assets/img/04.png', title: 'rent', icon: 'md-headset',price:'20', favourity:'21'},
		 {img: 'assets/img/01.png', title: 'apartment', icon: 'ios-home',price:'20', favourity:'21'}, 
		 {img: 'assets/img/02.png', title: 'wedding hall', icon: 'ios-bowtie',price:'20', favourity:'21'}, 
		 {img: 'assets/img/03.png', title: 'shop', icon: 'md-cart',price:'20', favourity:'21'},
		 {img: 'assets/img/04.png', title: 'rent', icon: 'md-headset',price:'20', favourity:'21'}]

		 
	this.categorylist = [
		{active_img: 'assets/icon/cat-electronics-red.png', title: 'Electronics', inactive_img: 'assets/icon/cat-electronics-grey.png', value:'electronicss',radionumber:'postradio2',titleSecond:'a'},
		{active_img: 'assets/icon/cat-cars-red.png', title: 'Cars and motors', inactive_img: 'assets/icon/cat-cars-grey.png', value:'carss',radionumber:'postradio3',titleSecond:'b'},
		{active_img: 'assets/icon/cat-sports-red.png', title: 'Sports and leisure', inactive_img: 'assets/icon/cat-sports-grey.png', value:'sports',radionumber:'postradio4',titleSecond:'c'},
		{active_img: 'assets/icon/cat-home-red.png', title: 'Home and garden', inactive_img: 'assets/icon/cat-home-grey.png', value:'homes',radionumber:'postradio5',titleSecond:'d'},
		{active_img: 'assets/icon/cat-movies-red.png', title: 'Movies and music', inactive_img: 'assets/icon/cat-movies-grey.png', value:'moviess',radionumber:'postradio6',titleSecond:'e'},
		{active_img: 'assets/icon/cat-fashion-red.png', title: 'Fashion and accessories', inactive_img: 'assets/icon/cat-fashion-grey.png', value:'fashion',radionumber:'postradio7',titleSecond:'f'},
		{active_img: 'assets/icon/cat-baby-red.png', title: 'Baby and child', inactive_img: 'assets/icon/cat-baby-grey.png', value:'babys',radionumber:'postradio8',titleSecond:'g'},
		{active_img: 'assets/icon/cat-tools-red.png', title: 'Tools and machines', inactive_img: 'assets/icon/cat-tools-grey.png', value:'toolss',radionumber:'postradio9',titleSecond:'h'},
		{active_img: 'assets/icon/cat-party-red.png', title: 'Party and Events', inactive_img: 'assets/icon/cat-party-grey.png', value:'partys',radionumber:'postradio10',titleSecond:'i'},
		{active_img: 'assets/icon/cat-other-red.png', title: 'Other', inactive_img: 'assets/icon/cat-other-grey.png', value:'others',radionumber:'postradio11',titleSecond:'j'}
	  ];

	}


	/*
	Function to take image from camera
	*/
	takephoto(){
	 	const options: CameraOptions = {
			quality: 40,
			targetHeight:1280,
			targetWidth:1280,
			destinationType: this.camera.DestinationType.DATA_URL,
			sourceType: this.camera.PictureSourceType.CAMERA
		}

		this.camera.getPicture(options).then((imageData) => {
				this.base64Image = "data:image/jpeg;base64," + imageData;
				this.imagelist.push(this.base64Image);
				this.imagelist.reverse();
				this.photos.push(imageData);
				document.getElementById("next").style.color = "#ffffff";
		});
		
	}


	/*
	function to get image from gallery using camera picker
	*/

	getImageFromGalleryUsingCamera(){
	 	const options: CameraOptions = {
			quality: 40,
			targetHeight:1280,
			targetWidth:1280,
			destinationType: this.camera.DestinationType.DATA_URL,
			sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
		}

		this.camera.getPicture(options).then((imageData) => {
				this.base64Image = "data:image/jpeg;base64," + imageData;
				this.imagelist.push(this.base64Image);
				this.imagelist.reverse();
				this.photos.push(imageData);
				document.getElementById("next").style.color = "#ffffff";
		});
		
		
	}
	/*
	Function to get image from gallery
	*/
	getimage(){

		this.options = {
		  maximumImagesCount: 5,
		  quality: 50,
		  width:800,
		  height:800,
		  outputType: 1
		}

		this.imagepicker.getPictures(this.options).then(
		  imageData => {

		    console.log(imageData.length);

		    for(var i=0;i<imageData.length;i++){

		    	console.log('here is base64 string: ', imageData);
                //encoded base64 string
                this.testImage=imageData;
                this.imagelist.push(imageData);
				this.imagelist.reverse();
				this.photos.push(imageData);
				document.getElementById("next").style.color = "#ffffff";


		    }
					 
		  },
		  err => console.log('uh oh')
		);

		//new try

		

	}

	//26feb 
	openImagePicker(){

		    let options= {
		      maximumImagesCount: 5,
		      quality: 50,
			  width:800,
			  height:800,
		    }
		    
		    this.photos = new Array<string>();
		    this.imagepicker.getPictures(options)
		    .then((results) => {
		      this.reduceImagess(results).then(() => {
		        console.log('all images cropped!!');
		      });
		    }, (err) => { console.log(err) });
	}

	reduceImagess(selected_pictures: any) : any{
		
		/*let options = {
			 uri: selected_pictures,
			 quality: 50,
			 width: 800,
			 height: 800
			} as ImageResizerOptions;*/

	    return selected_pictures.reduce((promise:any, item:any) => {
	    return promise.then((result) => {

	    /*return this.imageResizer.resize(options).then((filePath:string)=>{

	      		this.base64.encodeFile(filePath)
	       				.then(base64File => {
					        this.testImage=base64File;
					        this.imagelist.push(base64File);
					        this.imagelist.reverse();
					        var strImage = base64File.replace(/^data:image\/[a-z]+;base64,/, "");
					        this.photos.push(strImage);
					        document.getElementById("next").style.color = "#ffffff";
			        })	


	      });*/

	        return this.cropservice.crop(item)
					.then(filePath => {

					this.base64.encodeFile(filePath)
	       				.then(base64File => {
					        this.testImage=base64File;
					        this.imagelist.push(base64File);
					        this.imagelist.reverse();
					        var strImage = base64File.replace(/^data:image\/[a-z]+;base64,/, "");
					        this.photos.push(strImage);
					        document.getElementById("next").style.color = "#ffffff";
			        })	

					});
	      });
	    }, Promise.resolve());
	}


	saveUserImageFromGallery() {
 	    
 	    

		this.options = {
		  maximumImagesCount: 5,
		  quality: 50,
		  width:800,
		  height:800,
		  outputType: 0
		}

		this.imagepicker.getPictures(this.options).then((results)=>{

			for (var i = 0; i < results.length; i++) {
					this.resizeAndSave(results[i]);
			}
		});

        // return this.imagepicker.getPictures(this.options)
        //     .then((results) => {
        //         return this.resizeAndSave(results[0]);
        //     }, () => {
        //         console.log('Error picking image');
        //     });
    }


	resizeAndSave(imageUri) {


		this.cropservice.crop(imageUri)
		  .then(
		    filePath =>{
		    console.log('new image path is: ' + filePath);
		    
		    this.base64.encodeFile(filePath)
                            .then(base64File => {
                                console.log('here is base64 string: ', base64File);
                                //encoded base64 string
                                this.testImage=base64File;
                                this.imagelist.push(base64File);
								this.imagelist.reverse();
								this.photos.push(base64File);
                            })	
		}, 

		    error => console.error('Error cropping image', error)
		  );

        // this.cropservice.crop(imageUri).then((croppedUri) => {
        //          this.imageResizer
        //             .resize({
        //                 folderName: 'image',
        //                 uri: croppedUri,
        //                 quality: 50,
        //                 width: 300,
        //                 height: 300,
        //                 fileName: Date.now() + '.jpg'
        //             })
        //             .then((filePath: string) => {
        //                  this.base64.encodeFile(filePath)
        //                     .then(base64File => {
        //                         console.log('here is base64 string: ', base64File);
        //                         //encoded base64 string
        //                         this.testImage=base64File;
        //                         this.imagelist.push(base64File);
								// this.imagelist.reverse();
								// this.photos.push(base64File);
        //                     })
        //             })
        //             .catch(() => {
        //                 console.log('Error resizing image');
        //             });
        //     },
        //     () => {
        //          console.log('Error cropping image');
        //     })
	}








	//Not used
	reduceImages(selected_pictures: any) : any{
		return selected_pictures.reduce((promise:any, item:any) => {
			return promise.then((result) => {
				return this.cropservice.crop(item)
				.then(cropped_image => this.imagelist.push(cropped_image));
			});
		}, Promise.resolve());
	}

	gopostdetail(){
		console.log("go to post details");
		if(this.photos.length>0){
			this.storage.set('image',this.photos);
			this.navCtrl.setRoot(PostdetailPage); 
		}else{
			//this.navCtrl.setRoot(PostdetailPage); 
			//this.presentAlert("Atleast 1 photo is required");
		}
	}

	ionViewDidEnter(){
		this.imagelist = [];
		this.photos=[];

		// this.base64Image = "data:image/jpeg;base64," + this.test;
		// this.imagelist.push(this.base64Image);
		// this.photos.push(this.test);

		// this.base64Image = "data:image/jpeg;base64," + this.test;
		// this.imagelist.push(this.base64Image);
		// this.photos.push(this.test);

		if(this.navParams.get("type") == "edit" ){
			this.getPostDetails(this.navParams.get("itemId"));
			this.editStatus=true;
		}else{

			this.storage.get('postid').then((id)=>{
				if(id){
					this.editStatus=true;
					this.getPostDetails(id);
				}else{
					this.getSavedImages();
				}
			});
		}
	}


	getPostDetails(postid){

		this.loading=this.loadingCtrl.create({
            spinner:'bubbles',
            content:`Please wait..`
          }); 

		 this.loading.present();
		 
		this.postitemprovider.getPostDetail(postid).subscribe(
			data=>{
				console.log(data);
				this.loading.dismiss();
				if(data.json().msg=="success"){
					console.log("LENGTH==",data.json().data[0].image.image.length);
					//ADD POST IMAGE
					for(var i=0;i<data.json().data[0].image.image.length;i++){
						this.base64Image = "data:image/jpeg;base64," + data.json().data[0].image.image[i];
						this.imagelist.push(this.base64Image);
						this.imagelist.reverse();
						this.photos.push(data.json().data[0].image.image[i]);
						
					}
					//ADD POST DETAILS
					this.storage.set("status","true");
					this.storage.set("postid",data.json().data[0].id);
					this.storage.set("itemTitle",data.json().data[0].title);
					this.storage.set("itemCategory",data.json().data[0].category);
					this.storage.set("itemConditionMark",data.json().data[0].currentcondition);
					this.storage.set("itemConditionTitle",data.json().data[0].details);
					//CATEGORY DETAILS
					for(var i=0;i<this.categorylist.length;++i){
						if(this.categorylist[i].title == data.json().data[0].category){
							console.log("MATCHED");
							let selected={
								"catStatus":"true",
								"catTitle":this.categorylist[i].titleSecond,
								"catValue":this.categorylist[i].value,
								"catId":i};
								console.log("SELECTED_CATEGORY=",selected);
								this.storage.set("categorySelectedd",selected);
						}else{
							console.log("DIDN'T MATCH");
						}
					}

					//ADD POST COST
					this.storage.set("dailyPrice",Math.floor(data.json().data[0].dailyrentalPrice)); 
					this.storage.set("fairPrice",Math.floor(data.json().data[0].securityDeposit));
					this.storage.set("distance",Math.floor(data.json().data[0].distance));
					document.getElementById("next").style.color = "#ffffff";
				}else{
				  this.presentAlert("Please try again later");
				}
   
			},
			
			err=>{
				this.loading.dismiss();
				this.presentAlert("Please check your internet connection");
				console.log(err);
			},
			  
			()=>{
			   console.log("complete");
			}
   
			);  

	}

	getSavedImages(){
		console.log("Call is received to get saved images");
		
		document.getElementById("next").style.color = "#ffffff66";
		this.nextDisabled=false;
		//GETTING PREVOUSLY SAVE IMAGE
		this.storage.get('image').then((data)=>{
			if(data!=null){
				for(var i=0;i<data.length;i++){
					this.base64Image = "data:image/jpeg;base64," + data[i];
					this.imagelist.push(this.base64Image);
					this.imagelist.reverse();
					this.photos.push(data[i]);
				}
				document.getElementById("next").style.color = "#ffffff";
				this.storage.set('image',null);
			}else{
				document.getElementById("next").style.color = "#ffffff66";
				
			}
		});


		//GETTING USER ID
		this.storage.get('userId').then(
			(id)=>{

			this.authProvider.getUserDetail(id).subscribe(
				data=>{
				//TO PROCEED FURTHER, USER NEED TO BANK ACCOUNT TO RECEIVE MONEY			 	
				if(data.json().msg== 'success' && data.json().bankstatus==0){
					this.presentBankAttachPrompt("You need to add a bank account to your profile so you can receive rental payments. Please add this before posting an item for rent");
					console.log("bank not  attached");
				}else{
					console.log("bank attached");
				}
				},
				err=>{
					this.presentBankAttachPrompt("Please try again later")
				},
			);
		});

	}




	presentBankAttachPrompt(subTitle:any){
		console.log("Call is received to show bank attach prompt");
		let alert = this.alertCtrl.create({
		subTitle: subTitle,
		enableBackdropDismiss:false,
		buttons: [
			{
				text:'OK',
				handler:()=>{
					this.app.getRootNav().getActiveChildNav().select(0);
				}
			}
		]
		
	});

		alert.present();
	
	}



	ionViewWillLeave(){
		console.log("ionViewWillLeave");
	}


	/*
	Method to delete image
	*/
	deleteImage(index){
		
			let confirm = this.alertCtrl.create({
			title: "Sure you want to delete this photo? There is NO undo!",
			message: "",
			buttons: [
				{
					text: "No",
					handler: () => {
						console.log("Disagree clicked");
					}
				},
				{
					text: "Yes",
					handler: () => {
						console.log("Agree clicked");
						this.imagelist.splice(index,1);
						this.photos.splice(index,1);
						console.log("DeleteCount=",this.imagelist.length);
						if(this.imagelist.length>0){
							console.log("greater");
							document.getElementById("next").style.color = "#ffffff";
						}else{
							console.log("lower");
							document.getElementById("next").style.color = "#ffffff66";
						}
					}
				}
			]
		});

		confirm.present();

	}


	closeScreen(){
		console.log("Call is received to close ");
		if(this.editStatus){
			this.closeEditPrompt();
		}else{
			this.closeNewPostPrompt();
		}
	}

	closeEditPrompt(){

		if(this.photos.length>0){
			let alert = this.alertCtrl.create({
			title: 'Confirm',
			message: 'Do you want to discontinue and information will not saved',
			buttons: [
				{
					text: 'No',
					role: 'cancel',
					handler: () => {
						console.log("clicked cancel");
						//this.storage.set('image',null);
					}
				},
				{
					text: 'Yes',
					handler: () => { 
							console.log("clicked yes");        
							this.storage.set('image',null);
							this.app.getRootNav().getActiveChildNav().select(1);
					}
				}
			]
		});
		alert.present();

		}else{
			this.app.getRootNav().getActiveChildNav().select(0);
			//this.navCtrl.setRoot(Home);
		}

	}

	closeNewPostPrompt(){

		if(this.photos.length>0){

			let alert = this.alertCtrl.create({
			title: 'Confirm',
			message: 'Do you want to save your information before closing?',
			buttons: [
				{
					text: 'No',
					handler: () => {
						console.log("clicked cancel");
						this.storage.set('image',null);
						this.app.getRootNav().getActiveChildNav().select(0);
					}
				},
				{
					text: 'Yes',
					handler: () => { 
							console.log("clicked yes");        
							this.storage.set('image',this.photos);
							this.app.getRootNav().getActiveChildNav().select(0);
					}
				}
			]
		});
		alert.present();

		}else{
			this.app.getRootNav().getActiveChildNav().select(0);
			//this.navCtrl.setRoot(Home);
		}

	}

	//method used to present alert to user
	presentAlert(subTitle:any){
		let alert = this.alertCtrl.create({
		subTitle: subTitle,
		buttons: ['OK']
		});
		alert.present();
	
	}

}
