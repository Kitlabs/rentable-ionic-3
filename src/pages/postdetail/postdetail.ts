import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Navbar,AlertController,App,Tabs,ViewController } from 'ionic-angular';

import { PostcostPage } from '../postcost/postcost';
import { AddPage } from '../add/add';
import { Storage } from '@ionic/storage';

import { Home } from '../home/home';
@Component({
  selector: 'page-postdetail',
  templateUrl: 'postdetail.html',
})
export class PostdetailPage {
  @ViewChild(Navbar) navBar: Navbar;
  @ViewChild('tabs') tabRef: Tabs;
	postcost=PostcostPage;
	addpage=AddPage;
  condition:number[] = [0,1, 2, 3, 4];
  badcondition:any;
  goodcondition:any;
  categorylist:Array<any>;
  itemtitle:any;
  titlenumber:any;
  conditionnumber:any;
  conditiontitle:any;
  conditionmark:any;
  Postitem:any;
  category:any;
  data:any;
  isNextEnabled:boolean;
  //to remember category
  nextStatus:number;
  categoryEvent:any;
  categorySelected:any;
  conditionn:boolean;
  count:any;
  selectedCatTitle:any;
  editStatus:boolean;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage:Storage,
    public app:App,
    public tab:Tabs,
    public alertCtrl:AlertController,
    public viewCtrl:ViewController) {

    this.categorylist = [
      // {active_img: 'assets/icon/cat-nearyou-red.png', title: 'Nearby', inactive_img: 'assets/icon/cat-nearyou-grey.png', value:'nearby',radionumber:'postradio1'},
      {active_img: 'assets/icon/cat-electronics-red.png', title: 'Electronics', inactive_img: 'assets/icon/cat-electronics-grey.png',tempimage:'assets/icon/cat-electronics-grey.png', value:'electronicss',radionumber:'postradio2',titleSecond:'a',class:'deactive'},
      {active_img: 'assets/icon/cat-cars-red.png', title: 'Cars and motors', inactive_img: 'assets/icon/cat-cars-grey.png',tempimage:'assets/icon/cat-cars-grey.png', value:'carss',radionumber:'postradio3',titleSecond:'b',class:'deactive'},
      {active_img: 'assets/icon/cat-sports-red.png', title: 'Sports and leisure', inactive_img: 'assets/icon/cat-sports-grey.png',tempimage:'assets/icon/cat-sports-grey.png', value:'sports',radionumber:'postradio4',titleSecond:'c',class:'deactive'},
      {active_img: 'assets/icon/cat-home-red.png', title: 'Home and garden', inactive_img: 'assets/icon/cat-home-grey.png',tempimage:'assets/icon/cat-home-grey.png', value:'homes',radionumber:'postradio5',titleSecond:'d',class:'deactive'},
      {active_img: 'assets/icon/cat-movies-red.png', title: 'Movies and music', inactive_img: 'assets/icon/cat-movies-grey.png',tempimage:'assets/icon/cat-movies-grey.png', value:'moviess',radionumber:'postradio6',titleSecond:'e',class:'deactive'},
      {active_img: 'assets/icon/cat-fashion-red.png', title: 'Fashion and accessories', inactive_img: 'assets/icon/cat-fashion-grey.png',tempimage:'assets/icon/cat-fashion-grey.png', value:'fashion',radionumber:'postradio7',titleSecond:'f',class:'deactive'},
      {active_img: 'assets/icon/cat-baby-red.png', title: 'Baby and child', inactive_img: 'assets/icon/cat-baby-grey.png',tempimage:'assets/icon/cat-baby-grey.png', value:'babys',radionumber:'postradio8',titleSecond:'g',class:'deactive'},
      {active_img: 'assets/icon/cat-tools-red.png', title: 'Tools and machines', inactive_img: 'assets/icon/cat-tools-grey.png',tempimage:'assets/icon/cat-tools-grey.png', value:'toolss',radionumber:'postradio9',titleSecond:'h',class:'deactive'},
      {active_img: 'assets/icon/cat-party-red.png', title: 'Party and Events', inactive_img: 'assets/icon/cat-party-grey.png',tempimage:'assets/icon/cat-party-grey.png.png', value:'partys',radionumber:'postradio10',titleSecond:'i',class:'deactive'},
      {active_img: 'assets/icon/cat-other-red.png', title: 'Other', inactive_img: 'assets/icon/cat-other-grey.png',tempimage:'assets/icon/cat-other-grey.png', value:'others',radionumber:'postradio11',titleSecond:'j',class:'deactive'}
    ];

    this.tab = tab;   
    this.itemtitle="";
    this.titlenumber=25;
    this.conditiontitle="";
    this.conditionnumber=200;
    this.goodcondition=[];
    this.Postitem=[];
    this.categorySelected=[];
    this.conditionmark=0;
    this.conditionn=false;

    for (var i = 0; i < 5; ++i) {
      this.goodcondition[i]=false;
    }
    
    this.isNextEnabled=false;
    this.nextStatus=0;
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad PostdetailPage');
  }

  ionViewWillEnter(){

    console.log("will enterrrr");
    this.count=0;
    this.checkEditOrNewPost();

    this.storage.get("status").then((res)=>{
        if(res=="true"){
          this.storage.get("itemTitle").then((res)=>{
            if(res!=null){
                this.itemtitle=res;
                this.nextStatus=this.nextStatus+1;
            }else{
            }
          
        });
        
          this.storage.get("itemCategory").then((res)=>{
            if(res!=null){

              console.log(res);
              this.category=res;
              this.nextStatus=this.nextStatus+1;
              this.storage.get("categorySelectedd").then((res)=>{
                if(res){   
                  if(res.catStatus=="true"){
                    this.categorylist[parseInt(res.catId)].tempimage = this.categorylist[parseInt(res.catId)].active_img;
                    this.categorylist[parseInt(res.catId)].class = 'active';

                    // var imageTest=document.getElementById(res.catValue);
                    // imageTest.setAttribute('src',this.categorylist[parseInt(res.catId)].active_img);
                    // console.log("TESTING=",document.getElementById(res.catValue));
                    // document.getElementById(res.catValue).setAttribute("src",this.categorylist[parseInt(res.catId)].active_img) ;//image item.value
                    // document.getElementById(res.catTitle).style.color="#f55349";//item.title
                    //document.getElementById("electronicss").setAttribute('src',this.categorylist[parseInt(res.catId)].active_img)021 
                  }
                }                      
                });
            }
        });
        
        this.storage.get("itemConditionMark").then((res)=>{
          if(res!=null){
            this.conditionmark=res;
            this.showSelectedCondition(res);
            this.nextStatus=this.nextStatus+1;
          }else{
            
          }
      });
        
      this.storage.get("itemConditionTitle").then((res)=>{
        if(res!=null){
            this.conditiontitle=res;
            this.nextStatus=this.nextStatus+1;
            //enable/disable next button
            if(this.nextStatus==4){
              //enable
              this.nextEnable();
            }else{
              //disable
              this.nextDisable();
            }

        }
    }); 
      }else{
        this.nextDisable();
      }

      });
  }

  checkEditOrNewPost(){

    this.storage.get('postid').then((id)=>{
      if(id){
        this.editStatus=true;
      }

    });
  }

  ionViewWillLeave(){
    console.log("ionVionViewWillLeaveiew");
  }
  
  ionViewDidLeave(){
    console.log("ionViewDidLeave");
    //this.navCtrl.setRoot(Home);
  }
  
  ionViewWillUnLoad(){
    console.log("ionViewWillUnLoad");
  }



  nextEnable(){
    document.getElementById("next").style.color = "#ffffff";
  }

  nextDisable(){
    document.getElementById("next").style.color = "#ffffff66";
  }

  myFunction(event){

      /*Code to remove previous selected category*/

        var target = event.target || event.srcElement || event.currentTarget;
        var parent = event.srcElement.parentElement;
        var preparent = parent.parentElement;
        var divparent = preparent.parentElement;
        var children = divparent.children;
        var count = children.length;

        
        for (var i = 0; i < count; ++i) {
          if(preparent==children[i]){
            this.categorylist[i].tempimage = this.categorylist[i].active_img;
            this.categorylist[i].class = 'active';

            this.category=this.categorylist[i].title;
           // var image=this.categorylist[i].active_img;
            //save category info
            let selected={"catStatus":"true","catTitle":this.categorylist[i].titleSecond,"catValue":this.categorylist[i].value,"catId":i};
            this.storage.set("categorySelectedd",selected);
            //highlight selected category
            //console.log(children[i].getElementsByTagName('label')[0].getElementsByTagName('img')[0] + "children[i]");
            // children[i].getElementsByTagName('label')[0].getElementsByTagName('img')[0].setAttribute("src", image);
            // children[i].getElementsByTagName('label')[0].getElementsByTagName('span')[0].setAttribute("style", "color: #f55349;");
            //check the validation
            if(this.itemtitle.length==0  || this.conditionmark==0 || this.conditiontitle=="" ){
                this.nextDisable();
              }else{
                this.nextEnable();  
              }

          }//end of if
          else{
            this.categorylist[i].tempimage = this.categorylist[i].inactive_img;
             this.categorylist[i].class = 'deactive';
            // var inactiveimage=this.categorylist[i].inactive_img;
            // children[i].getElementsByTagName('label')[0].getElementsByTagName('img')[0].setAttribute("src", inactiveimage);
            // children[i].getElementsByTagName('label')[0].getElementsByTagName('span')[0].setAttribute("style", "color: #6d7178;");
          }
        }




  }

  myFocus(id){
    //0 means user has focus field
    //1 means user not have focust 


    //hide the bottom tabs
    if(id==0){
      var tabbars = document.getElementsByClassName('tabbar');
      for(var i=0; i<tabbars.length; i++) {
      var node = <HTMLElement>tabbars[i];
      node.style.display ='none';
      // document.getElementById("conditiontitle").style.marginBottom="250px";
      //document.getElementById("conditiontitle").scrollIntoView();
      } 

    }

    //unhide the bottom tabs
    if(id==1){
      var tabbars = document.getElementsByClassName('tabbar');
      for(var i=0; i<tabbars.length; i++) {
      var node = <HTMLElement>tabbars[i];
      node.style.display = 'flex';
      }
    }
 
  }

  number(){
    //ng model field
    //itemtitle
    //category
    //condition
    //conditiontitle

    var n=this.itemtitle.length;
    this.titlenumber=25-n;

     if(this.itemtitle.length==0  || this.category==null || this.conditionmark==0 || this.conditiontitle=="" ){
        this.nextDisable();
      }
      else{
        this.nextEnable();  
      }



  }

  focus(){
        document.getElementById("conditiontitle").style.marginBottom="250px";
        // document.getElementById("conditiontitle").scrollIntoView();
  }

  conditionnum(){
    
    
    var n=this.conditiontitle.length;
    this.conditionnumber=200-n;


    if(this.itemtitle.length==0 ||  this.category==null ||  this.conditionmark==0 || this.conditiontitle=="" ){
          this.nextDisable();
        }else{
          this.nextEnable();  
      }

  }

  showSelectedCondition(i){


    console.log("Rating="+i);
    for (var j = 0; j <= i-1; ++j) {
      this.goodcondition[j]=true;
    }

    for (var l = i+1; l <= 5; ++l) {
      this.goodcondition[l]=false;
    }

    this.conditionmark=i;

    if(this.itemtitle.length==0 ||   this.category==null || this.conditionmark==0 || this.conditiontitle=="" ){
        this.nextDisable();
      }else{
        this.nextEnable();  
      }

  }

  changecondition(i){

    for (var j = 0; j <= i; ++j) {
      this.goodcondition[j]=true;
    }

    for (var l = i+1; l <= 5; ++l) {
      this.goodcondition[l]=false;
    }

    this.conditionmark=i+1;

    if(this.itemtitle.length==0 ||   this.conditionmark==0 || this.category==null || this.conditiontitle=="" ){
        this.nextDisable();
      }else{
        this.nextEnable();  
      }

  }

  goaddpage(){
      
      this.storage.set("status","true");
      this.storage.set("itemTitle",this.itemtitle);
      this.storage.set("itemCategory",this.category);
      this.storage.set("itemConditionMark",this.conditionmark);
      this.storage.set("itemConditionTitle",this.conditiontitle);
      
      this.navCtrl.setRoot(AddPage);
   
  }

  closeScreen(){
   
    if(this.editStatus){
			this.closeEditPrompt();
		}else{
      this.presentConfirm();
		}
  }
  gopostcost(){
    
    if(this.itemtitle.length==0  || this.category==null  || this.conditionmark==0 || this.conditiontitle=="" ){
      //this.presentAlert("All fields are mandatory");
    }
    else{
        
      this.Postitem.itemtitle=this.itemtitle;
      this.Postitem.category=this.category;
      this.Postitem.conditionmark=this.conditionmark;
      this.Postitem.conditiontitle=this.conditiontitle;
      
      this.storage.set("status","true");
      this.storage.set("itemTitle",this.itemtitle);
      this.storage.set("itemCategory",this.category);
      this.storage.set("itemConditionMark",this.conditionmark);
      this.storage.set("itemConditionTitle",this.conditiontitle);

      console.log(this.Postitem);
      this.navCtrl.setRoot   (PostcostPage,{
        itempost: this.Postitem
      });      
      }


  }

  removeItemItems(){
    this.itemtitle="";
  }

  removeItemDetails(){
    this.conditiontitle="";
  }

  //method used to present alert to user
  presentAlert(subTitle:any){
    let alert = this.alertCtrl.create({
    subTitle: subTitle,
    buttons: ['OK']
    });
    alert.present();
  
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

          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.storage.set("status","false");
            this.storage.set("itemTitle",null);
            this.storage.set("itemCategory",null);
            this.storage.set("itemConditionMark",null);
            this.storage.set("itemConditionTitle",null);
            this.storage.set('image',null);
            this.tab.select(1);     
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
         this.storage.set("status","false");
         this.storage.set("itemTitle",null);
         this.storage.set("itemCategory",null);
         this.storage.set("itemConditionMark",null);
         this.storage.set("itemConditionTitle",null);
         this.storage.set('image',null);
         this.tab.select(0);
        }
      },
      {
        text: 'Yes',
        handler: () => {

        if(this.itemtitle!=null){

          this.storage.set("status","true");
          this.storage.set("itemTitle",this.itemtitle);

        } 
        
        if(this.category!=null){

          this.storage.set("status","true");
          this.storage.set("itemCategory",this.category);

        } 

        if(this.conditionmark!=0){

          this.storage.set("status","true");
          this.storage.set("itemConditionMark",this.conditionmark);

        } 
        
        if(this.conditiontitle!="" ){
          this.storage.set("status","true");
          this.storage.set("itemConditionTitle",this.conditiontitle);
        }

        this.tab.select(0);     
        }
      }
    ]
  });
  alert.present();

}

}
