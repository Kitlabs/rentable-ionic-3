import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ModalController, Content,LoadingController,App,Events,ToastController  } from 'ionic-angular';
import { List } from '../list/list';
import { MapModal } from '../modal-page/modal-page';
import { ItemsProvider } from '../../providers/items/items';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';


import { Profile } from '../profile/profile';
import { SearchPage } from '../search/search';
import { Details } from '../details/details';
import { Storage } from '@ionic/storage';
import { mobiscroll } from '@mobiscroll/angular';
// mobiscroll.settings = {
//   theme: 'ios',
//   display: 'bottom'
// };

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class Home {
  @ViewChild(Content) content: Content;

  expanded: Boolean;
  grid: Array<any>;
  categorygrid: Array<any>;
  categorylist:Array<any>;
  like: any;
  itemlist:Array<any>;
  favouritlist:any;
  searchtext:string;
  itemid:any;
  profile=Profile;
  search=SearchPage;
  details=Details;
  searchcategory:Array<any>;
  userId:any;
  loading:any;
  listOfItems:any;

  test:string;
  url:string;
  message:string;
  dataNotFound:boolean;
  basePath:any;
  categorySelected:any;
  catSelectedNumber:any;
  notificationMessage:any;
  
  //time to hide and show add card message to user
  maxTime: any=5
  hideTipMessage:boolean;
  timer:any;

  // date: any = [new Date(2018,6,18), new Date(2018,6,30)];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController,
    public itemprovider: ItemsProvider,
    public authProvider:AuthenticateProvider,
    public storage:Storage,
    public app:App,
    public ev:Events,
    public toastCtrl: ToastController,
    public loadingCtrl:LoadingController) {
    //alert('HOme dd');
  
    console.log("it is constructor");
    this.expanded = true;
    this.itemlist=[];
    this.like = [];

    // for (var i = 0; i < 12; ++i) {
    //   this.like[i]=false;
    // }

    this.favouritlist=[];

    // this.itemprovider.Getitems().subscribe(data=>{
    //   for (var j=0;j<data.json().result.length;j++) {
    //     this.itemlist[j]=data.json().result[j];
    //     console.log(this.itemlist[j]);
    //   }
    //   this.itemlist=data.json().result;
    // }, err =>{
    //   console.log(err);
    // })
     
     this.url="54.79.124.187/api/uploads/";
     this.searchcategory=this.itemlist;
     this.dataNotFound=true;
     this.message="There is no data available";

    this.categorylist = [
      // {active_img: 'assets/icon/cat-nearyou.png', title: 'Nearby', inactive_img: 'assets/icon/cat-nearyou-grey.png', value:'nearby'},
      {active_img: 'assets/icon/cat-electronics.png', title: 'Electronics', inactive_img: 'assets/icon/cat-electronics-grey.png', value:'electronics',tempimage:'assets/icon/cat-electronics-grey.png',class:'deactive'},
      {active_img: 'assets/icon/cat-cars.png', title: 'Cars and motors', inactive_img: 'assets/icon/cat-cars-grey.png', value:'cars',tempimage:'assets/icon/cat-cars-grey.png',class:'deactive'},
      {active_img: 'assets/icon/cat-sports.png', title: 'Sports and leisure', inactive_img: 'assets/icon/cat-sports-grey.png', value:'sports',tempimage:'assets/icon/cat-sports-grey.png',class:'deactive'},
      {active_img: 'assets/icon/cat-home.png', title: 'Home and garden', inactive_img: 'assets/icon/cat-home-grey.png', value:'home',tempimage:'assets/icon/cat-home-grey.png',class:'deactive'},
      {active_img: 'assets/icon/cat-movies.png', title: 'Movies and music', inactive_img: 'assets/icon/cat-movies-grey.png', value:'movies',tempimage:'assets/icon/cat-movies-grey.png',class:'deactive'},
      {active_img: 'assets/icon/cat-fashion.png', title: 'Fashion and accessories', inactive_img: 'assets/icon/cat-fashion-grey.png', value:'fashion',tempimage:'assets/icon/cat-fashion-grey.png',class:'deactive'},
      {active_img: 'assets/icon/cat-baby.png', title: 'Baby and child', inactive_img: 'assets/icon/cat-baby-grey.png', value:'baby',tempimage:'assets/icon/cat-baby-grey.png',class:'deactive'},
      {active_img: 'assets/icon/cat-tools.png', title: 'Tools and machines', inactive_img: 'assets/icon/cat-tools-grey.png', value:'tools',tempimage:'assets/icon/cat-tools-grey.png',class:'deactive'},
      {active_img: 'assets/icon/cat-party.png', title: 'Party and Events', inactive_img: 'assets/icon/cat-party-grey.png', value:'party',tempimage:'assets/icon/cat-party-grey.png',class:'deactive'},
      {active_img: 'assets/icon/cat-other.png', title: 'Other', inactive_img: 'assets/icon/cat-other-grey.png', value:'other',tempimage:'assets/icon/cat-other-grey.png',class:'deactive'},
    ]
    
    this.categorygrid = [
      {img: 'assets/img/01.png', price:'21',id:'0'},
      {img: 'assets/img/02.png', price:'56',id:'1'},
      {img: 'assets/img/03.png', price:'34',id:'2'},
      {img: 'assets/img/04.png', price:'21',id:'3'},
      {img: 'assets/img/01.png', price:'15',id:'4'},
      {img: 'assets/img/02.png', price:'65',id:'5'},
      {img: 'assets/img/03.png', price:'64',id:'6'},
      {img: 'assets/img/04.png', price:'123',id:'7'},
      {img: 'assets/img/01.png', price:'21',id:'8'},
      {img: 'assets/img/02.png', price:'12',id:'9'},
      {img: 'assets/img/03.png', price:'52',id:'10'},
      {img: 'assets/img/04.png', price:'212',id:'11'}
    ]

    var imagelist=[];
    
    this.categorySelected="Nearby";

  } 

  ionViewDidLoad(){

    console.log("it is last");
    this.ev.subscribe("messageCountt",(count)=>{
        //this.ev.publish('messageCount',0);
        this.presentToast();
    });

    this.ev.subscribe("rentalCountt",(count)=>{
      //this.ev.publish('rentalCount',0);
      this.presentToast();
    });

    this.storage.get('counter').then((data)=>{
      if(data!=null){
          this.ev.publish('counter');
      }

    });
    this.totalCount();

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

  presentToast() {
    let toast = this.toastCtrl.create({
      duration: 3000,
      position: 'top',
      cssClass: "toast-success"
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
  }

  increaseBadge(){
    this.ev.publish('messageCount',1);
    this.presentToast();
  }

  ionViewDidEnter(){
    this.storage.remove("categorySelectedHome");
    this.storage.get('CARD_STATUS').then((data)=>{
        if(data==0){
          console.log("Card Status=",data);
          this.showCardAttachedPrompt()
        }else{
          this.hideTipMessage=true;
          console.log("Hide Tip Message");
        }
    });

    this.storage.get('userId').then((data)=>{
    this.userId=data;
    
    this.clearPostDetails();  
    this.totalCount();
    this.cardAttachedStatus();

    if(this.searchtext){
        this.searchItems();
    }else{
      this.storage.get("categorySelectedHome").then((res)=>{
        if(res){

          if(res.catStatus=="true"){
            console.log("category already selected");
            this.categorylist[parseInt(res.catId)].tempimage = this.categorylist[parseInt(res.catId)].active_img;
            this.categorylist[parseInt(res.catId)].class = 'active';
            // document.getElementById(res.catValue).setAttribute("src",this.categorylist[parseInt(res.catId)].active_img);//image item.value
            // document.getElementById(res.catTitle).style.color="#ffffff";//item.title
            this.getItemsByCategoryName(res.catTitle);
            let selected={"catStatus":"false"}
            //this.storage.set("categorySelectedHome",selected);
            this.cardAttachedStatus();
          }else{
            console.log("Hey we are calling nearby people to get");
            this.getNearbyItem();
          }  
        }else{
          //called when app installed first time
          this.getNearbyItem();
        }
                            
        });
      }
    });
    

  }

  cardAttachedStatus(){
    this.authProvider.getUserDetail(this.userId).subscribe(
      data=>{
       if(data.json().msg== 'success'){
          this.storage.set("CARD_STATUS",data.json().cardstatus);
          this.storage.set("USER_CHATTING_STATUS",0);
          this.ev.publish('CARDSTATUS',data.json().cardstatus);
        }
      },
    );
  }

  totalCount(){


    this.itemprovider.getChatListOwn(this.userId).subscribe(data =>{
      console.log("DATA=",data);
      console.log(data.json().IsRead);
      if(data.json().IsRead != undefined){
          this.ev.publish('messageCount',0);
          this.ev.publish('rentalCount',0);
          //this.presentToast();
        }else{
          //this.ev.publish('messageCount',1);
          //this.presentToast();
        }
      },
    err=>{
      console.log("error");
    });
    
    this.itemprovider.getChatListRent(this.userId).subscribe(data =>{
      console.log("DATA=",data);
      console.log(data.json().IsRead);
      if(data.json().IsRead != undefined){
        this.ev.publish('messageCount',0);
        this.ev.publish('rentalCount',0);
        //this.presentToast();
      }else{
        //this.ev.publish('messageCount',1);
      }
    },
    err=>{
      console.log("error");
    }); 

  }

  ionViewCanLeave() {
    console.log("It is finished");
  }

  convertImageUrlToBase64(URL){
  // var canvas = document.createElement("canvas");
  // canvas.width = img.width;
  // canvas.height = img.height;
  // var ctx = canvas.getContext("2d");
  // ctx.drawImage(img, 0, 0);
  // var dataURL = canvas.toDataURL("image/png");
  // return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");

  // var img = new Image();
  //   img.src = URL;
  //   img.onload = function() {

  //       var canvas = document.createElement("canvas");
  //       canvas.width = 500;
  //       canvas.height = 500;
  //       var ctx = canvas.getContext("2d");
  //       ctx.drawImage(, 0, 0);
  //       var dataURL = canvas.toDataURL("image/png");
  //       alert(dataURL.replace(/^data:image\/(png|jpg);base64,/, ""));
  //   };

}

  showCardAttachedPrompt(){ 
    this.timer = setTimeout(x => 
      {
          if(this.maxTime <= 0) { }
          this.maxTime -= 1;

          if(this.maxTime>0){
            this.hideTipMessage = false;
            this.showCardAttachedPrompt();
          }
          else{
              this.hideTipMessage = true;
          }

      }, 1000);
  }

  godetails(itemId){     
    this.navCtrl.push(Details, {
      itemId: itemId
    });
  }

  presentModal() {
    let modal = this.modalCtrl.create(MapModal);
    modal.present();
  }

  ActiveFavourite(itemId){
    this.like[itemId] = true;
    this.itemprovider.addRemoveFavourite(this.userId,itemId,1).subscribe(
      data=>{
          console.log(data);
          //this.getItemsByCategoryName(this.categorySelected);
      },
      );
  }

  DeactiveFavourite(itemId){
    console.log("dislike");
    //this.favouritlist[itemId]=false;
    this.like[itemId] = false;
    this.itemprovider.addRemoveFavourite(this.userId,itemId,0).subscribe(
      data=>{
          console.log(data);
          //this.getItemsByCategoryName(this.categorySelected);
      },
      );
  }

 
  removeSelectedCategory(){
    this.catSelectedNumber=-1;
    this.storage.get("categorySelectedHome").then((res)=>{
      console.log("storage data"); 
      console.log(res);
      if(res){
        if(res.catStatus=="true"){
          document.getElementById(res.catValue).setAttribute("src",this.categorylist[parseInt(res.catId)].inactive_img);//image item.value
          document.getElementById(res.catTitle).style.color="#666a71";//item.title
          let selected={"catStatus":"false"}
          this.storage.set("categorySelectedHome",selected);
        }
      }
                         
      });

  }


  goToProfile(){
    this.navCtrl.setRoot(this.profile);
  }


  goToFilter(){
    this.navCtrl.setRoot(this.search);
  }

  searchItems(){

    console.log(this.categorySelected);
    if(this.searchtext!=""){

      //this.removeSelectedCategory();
      this.categorySelected = this.categorySelected == "Nearby" ? "" : this.categorySelected;
       this.itemprovider.getItemsBySearch(this.searchtext,this.userId,this.categorySelected).subscribe(
        data=>{

            if(data.json().msg=="success"){
             this.listOfItems=data.json().data;
             this.addFavUnFav();
             this.dataNotFound=false;
             console.log("success");
           }else{
             this.listOfItems=[];
             this.dataNotFound=true;
             console.log("failure");
           }      
        }

        ); 
    }else{
      this.listOfItems=[];
      let selected={"catStatus":"false"}
      this.storage.set("categorySelectedHome",selected); 
      if(this.categorySelected){
        this.getItemsByCategoryName(this.categorySelected);
      } else{
        this.getNearbyItem();
      }
    }


    
  }

  onCancel(){
    console.log("cacenl");
    this.getNearbyItem();
    let selected={"catStatus":"false"}
    this.storage.set("categorySelectedHome",selected);
  }
  /*
    Method used to highlight the selected category
  */ 

  myFunction(event){
    let loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });
    loading.present().then(Element=>{
    this.searchtext="";
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var parent = event.srcElement.parentElement;
    var preparent = parent.parentElement;
    var children = preparent.children;
    var count = children.length;
    var categoryid;

    for (var i = 0; i < count; ++i) {
      if(parent==children[i]){
        if(this.catSelectedNumber==i){
            //means user selecting the category second time ,in this case remove that category and call the nearbyitem method
            console.log("SELECTED SECOND TIME");
            this.categorylist[i].tempimage = this.categorylist[i].active_img;
            this.categorylist[i].class = 'active';

            this.catSelectedNumber=-1;
            var inactiveimage=this.categorylist[i].inactive_img;
            children[i].getElementsByTagName('img')[0].setAttribute("src", inactiveimage);
            children[i].getElementsByTagName('p')[0].setAttribute("style", "color: #6d7178;");
            let selected={"catStatus":"false"}
            this.storage.set("categorySelectedHome",selected);
            this.categorySelected="";
            this.getNearbyItem();
        }else{
            console.log("SELECTED FIRST TIME");
            //category selected first time
            this.categorylist[i].tempimage = this.categorylist[i].active_img;
            this.categorylist[i].class = 'active';
            var image=this.categorylist[i].active_img;
            categoryid = this.categorylist[i].title;
            this.categorySelected=categoryid;
            this.getItemsByCategoryName(categoryid);
            // children[i].getElementsByTagName('img')[0].setAttribute("src", image);//make selected category image active
            // children[i].getElementsByTagName('p')[0].setAttribute("style", "color: #ffffff;");//make selected category title active
            this.catSelectedNumber=i;
            //localStorage.setItem('status','true');
            //Saving category selected 
            let selected={"catStatus":"true","catTitle":this.categorylist[i].title,"catValue":this.categorylist[i].value,"catId":i}
            this.storage.set("categorySelectedHome",selected);
        }
      }else{
        this.categorylist[i].tempimage = this.categorylist[i].inactive_img;
        this.categorylist[i].class = 'deactive';
        // var inactiveimage=this.categorylist[i].inactive_img;
        // children[i].getElementsByTagName('img')[0].setAttribute("src", inactiveimage);
        // children[i].getElementsByTagName('p')[0].setAttribute("style", "color: #666a71;");
      }
    }

    var n=0;
    this.searchcategory=[];
    
    for (var i = 0; i<this.itemlist.length; i++) {
      if (this.itemlist[i].category==categoryid) {
        this.searchcategory[n]=this.itemlist[i];
        n++;
      }
    }
   // setTimeout(() => {
    loading.dismiss();
   // }, 2000);
    this.content.resize();
     })
  }




  /*
  Method to get all items by category name
  */
  getItemsByCategoryName(categoryName){

    this.categorySelected=categoryName;
    this.listOfItems=null;
    console.log(this.categorySelected);

    if(categoryName=="Nearby"){
      this.getNearbyItem();
    }else{

    this.storage.get('userId').then((data)=>{
    this.userId=data;
    this.storage.get('location').then((location) => {
      console.log(location.lat);
      console.log(location.lng);
    this.itemprovider.getItemByCategoryName(categoryName,this.userId,"available",location.lat,location.lng).subscribe(
      data=>{

         console.log(data);
         if(data.json().msg=="success"){
           this.dataNotFound=false;
           this.listOfItems=data.json().data;
           this.basePath=this.listOfItems.base_path;
           this.addFavUnFav();
         }else{
           this.dataNotFound=true;
           //no response
         }         
      },
      err=>{
        //this.loading.dismiss();
          console.log();
      });
    })

    });//end of storage

    }
  }

  /*
  Method to which items user make fav or unfav 
  */ 
 addFavUnFav(){
    console.log("favourite and unfavourite");
    for (var i = 0; i < this.listOfItems.length; ++i) {
                
      if(this.listOfItems[i].favourites==0){
        this.like[parseInt(this.listOfItems[i].id)]=false; 
        console.log("IF="+this.listOfItems[i].id);
      }else{
        this.like[parseInt(this.listOfItems[i].id)]=true;
        console.log("ELSE="+this.listOfItems[i].id);
      }
    
    }
 }

  /*
  Method to get nearby item
  */
  getNearbyItem(){
   //{"action":"NearByItems", "user_lat":"30.709315", "user_lng":"76.690514","userId":"3"}

      this.storage.get('location').then((location) => {
      this.itemprovider.getNearbyItems(this.userId,location.lat,location.lng).subscribe(
        data=>{

            console.log(data.json());
            if(data.json().msg=="success"){
             this.listOfItems=data.json().post_data;
             this.addFavUnFav();
           }else{
             console.log("No item around you");
             this.listOfItems=[];
             
           }  
        },
        err=>{

        },

        );
    });
  }

 

}
